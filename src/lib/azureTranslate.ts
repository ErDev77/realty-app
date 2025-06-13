// src/lib/azureTranslate.ts
import {
	TextTranslationClient,
	TranslatorCredential,
} from '@azure/ai-translation-text'

export type Language = 'hy' | 'en' | 'ru'

interface TranslationCache {
	[key: string]: string
}

// In-memory cache (in production, use Redis or database)
const cache: TranslationCache = {}

// Initialize Azure Translator
let translatorClient: TextTranslationClient | null = null

function getTranslatorClient() {
	if (!translatorClient) {
		const credential = new TranslatorCredential(
			process.env.AZURE_TRANSLATOR_KEY!,
			process.env.AZURE_TRANSLATOR_REGION!
		)

		translatorClient = new TextTranslationClient(
			process.env.AZURE_TRANSLATOR_ENDPOINT!,
			credential
		)
	}
	return translatorClient
}

export class AzureTranslateService {
	/**
	 * Translate single text
	 */
	static async translateText(
		text: string,
		targetLanguage: Language,
		sourceLanguage: Language = 'hy'
	): Promise<string> {
		// Return original if same language
		if (sourceLanguage === targetLanguage || !text.trim()) {
			return text
		}

		// Check cache first
		const cacheKey = `${text}_${sourceLanguage}_${targetLanguage}`
		if (cache[cacheKey]) {
			return cache[cacheKey]
		}

		try {
			const translator = getTranslatorClient()

			const response = await translator.translate(
				[
					{
						text: text,
					},
				],
				{
					to: [targetLanguage],
					from: sourceLanguage,
				}
			)

			if (
				response &&
				response[0]?.translations &&
				response[0].translations.length > 0
			) {
				const translation = response[0].translations[0].text

				// Cache the result
				cache[cacheKey] = translation

				console.log(
					`✅ Azure translated: "${text}" → "${translation}" (${sourceLanguage} → ${targetLanguage})`
				)

				return translation
			}

			throw new Error('No translation received')
		} catch (error) {
			console.error('❌ Azure translation failed:', error)
			return text // Return original text on error
		}
	}

	/**
	 * Translate multiple texts in batch (more efficient)
	 */
	static async translateBatch(
		texts: string[],
		targetLanguage: Language,
		sourceLanguage: Language = 'hy'
	): Promise<string[]> {
		if (sourceLanguage === targetLanguage) {
			return texts
		}

		// Filter out empty texts and check cache
		const textsToTranslate: { index: number; text: string }[] = []
		const results: string[] = new Array(texts.length)

		texts.forEach((text, index) => {
			if (!text.trim()) {
				results[index] = text
				return
			}

			const cacheKey = `${text}_${sourceLanguage}_${targetLanguage}`
			if (cache[cacheKey]) {
				results[index] = cache[cacheKey]
			} else {
				textsToTranslate.push({ index, text })
			}
		})

		// Translate uncached texts
		if (textsToTranslate.length > 0) {
			try {
				const translator = getTranslatorClient()

				// Prepare texts for Azure API
				const inputTexts = textsToTranslate.map(item => ({ text: item.text }))

				const response = await translator.translate(inputTexts, {
					to: [targetLanguage],
					from: sourceLanguage,
				})

				// Process results
				response.forEach((translationResult, i) => {
					const item = textsToTranslate[i]

					if (
						translationResult.translations &&
						translationResult.translations.length > 0
					) {
						const translation = translationResult.translations[0].text
						results[item.index] = translation

						// Cache the result
						const cacheKey = `${item.text}_${sourceLanguage}_${targetLanguage}`
						cache[cacheKey] = translation
					} else {
						results[item.index] = item.text // Fallback to original
					}
				})

				console.log(
					`✅ Azure batch translated ${textsToTranslate.length} texts to ${targetLanguage}`
				)
			} catch (error) {
				console.error('❌ Azure batch translation failed:', error)

				// Fill remaining with original texts
				textsToTranslate.forEach(item => {
					results[item.index] = item.text
				})
			}
		}

		return results
	}

	/**
	 * Translate property object
	 */
	static async translateProperty(
		property: any,
		targetLanguage: Language
	): Promise<any> {
		if (targetLanguage === 'hy') {
			return property // Return original if Armenian
		}

		try {
			const fieldsToTranslate = ['title', 'description', 'address']
			const translated = { ...property }

			// Collect all texts to translate
			const textsToTranslate: string[] = []
			const textMapping: { field: string; index: number }[] = []

			fieldsToTranslate.forEach(field => {
				if (property[field]) {
					textMapping.push({ field, index: textsToTranslate.length })
					textsToTranslate.push(property[field])
				}
			})

			// Add city and state names
			if (property.city?.name) {
				textMapping.push({ field: 'city.name', index: textsToTranslate.length })
				textsToTranslate.push(property.city.name)
			}

			if (property.state?.name) {
				textMapping.push({
					field: 'state.name',
					index: textsToTranslate.length,
				})
				textsToTranslate.push(property.state.name)
			}

			// Add feature names
			if (property.features?.length > 0) {
				property.features.forEach((feature: any, featureIndex: number) => {
					if (feature.name) {
						textMapping.push({
							field: `features.${featureIndex}.name`,
							index: textsToTranslate.length,
						})
						textsToTranslate.push(feature.name)
					}
				})
			}

			// Translate all texts in batch
			if (textsToTranslate.length > 0) {
				const translations = await this.translateBatch(
					textsToTranslate,
					targetLanguage,
					'hy'
				)

				// Apply translations back to object
				textMapping.forEach(({ field, index }) => {
					const translation = translations[index]

					if (field.includes('.')) {
						const parts = field.split('.')
						if (parts[0] === 'city') {
							translated.city = { ...translated.city, name: translation }
						} else if (parts[0] === 'state') {
							translated.state = { ...translated.state, name: translation }
						} else if (parts[0] === 'features') {
							const featureIndex = parseInt(parts[1])
							if (translated.features?.[featureIndex]) {
								translated.features[featureIndex] = {
									...translated.features[featureIndex],
									name: translation,
								}
							}
						}
					} else {
						translated[field] = translation
					}
				})
			}

			return translated
		} catch (error) {
			console.error('❌ Azure property translation failed:', error)
			return property
		}
	}

	/**
	 * Get supported languages
	 */
	static async getSupportedLanguages(): Promise<string[]> {
		try {
			const translator = getTranslatorClient()
			const languages = await translator.getLanguages()
			return Object.keys(languages.translation || {})
		} catch (error) {
			console.error('❌ Failed to get supported languages:', error)
			return ['hy', 'en', 'ru'] // Fallback to our supported languages
		}
	}

	/**
	 * Get cached translation count (for monitoring)
	 */
	static getCacheSize(): number {
		return Object.keys(cache).length
	}

	/**
	 * Clear cache (for memory management)
	 */
	static clearCache(): void {
		Object.keys(cache).forEach(key => delete cache[key])
		console.log('🗑️ Azure translation cache cleared')
	}

	/**
	 * Test Azure connection
	 */
	static async testConnection(): Promise<boolean> {
		try {
			await this.translateText('Hello', 'hy', 'en')
			return true
		} catch (error) {
			console.error('❌ Azure connection test failed:', error)
			return false
		}
	}
}

// Export for use in API routes
export default AzureTranslateService
