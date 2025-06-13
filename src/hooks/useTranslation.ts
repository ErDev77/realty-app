// src/hooks/useTranslation.ts
'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'

export type Language = 'hy' | 'en' | 'ru'

interface TranslationCache {
	[key: string]: string
}

export function useTranslation() {
	const pathname = usePathname()
	const [language, setLanguage] = useState<Language>('hy')
	const [cache, setCache] = useState<TranslationCache>({})
	const [loading, setLoading] = useState(false)

	// Extract language from URL
	useEffect(() => {
		const pathParts = pathname.split('/')
		const langFromUrl = pathParts[1] as Language

		if (['hy', 'en', 'ru'].includes(langFromUrl)) {
			setLanguage(langFromUrl)
		} else {
			setLanguage('hy') // Default to Armenian
		}
	}, [pathname])

	const translate = useCallback(
		async (text: string, sourceLanguage: Language = 'hy'): Promise<string> => {
			// Return original if same language or empty text
			if (language === sourceLanguage || !text?.trim()) {
				return text
			}

			// Check cache first
			const cacheKey = `${text}_${sourceLanguage}_${language}`
			if (cache[cacheKey]) {
				return cache[cacheKey]
			}

			setLoading(true)
			try {
				const response = await fetch('/api/translate', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						text,
						sourceLanguage,
						targetLanguage: language,
					}),
				})

				if (!response.ok) {
					throw new Error(`Translation failed: ${response.statusText}`)
				}

				const data = await response.json()

				if (data.success) {
					// Update cache
					setCache(prev => ({ ...prev, [cacheKey]: data.translation }))
					return data.translation
				} else {
					throw new Error(data.error || 'Translation failed')
				}
			} catch (error) {
				console.error('❌ Translation error:', error)
				return text // Return original text on error
			} finally {
				setLoading(false)
			}
		},
		[language, cache]
	)

	const translateProperty = useCallback(
		async (property: any): Promise<any> => {
			if (language === 'hy') {
				return property // Return original if Armenian
			}

			setLoading(true)
			try {
				const response = await fetch('/api/translate/property', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						property,
						targetLanguage: language,
					}),
				})

				if (!response.ok) {
					throw new Error(`Property translation failed: ${response.statusText}`)
				}

				const data = await response.json()

				if (data.success) {
					return data.property
				} else {
					throw new Error(data.error || 'Property translation failed')
				}
			} catch (error) {
				console.error('❌ Property translation error:', error)
				return property // Return original property on error
			} finally {
				setLoading(false)
			}
		},
		[language]
	)

	return {
		language,
		translate,
		translateProperty,
		loading,
		isArmenian: language === 'hy',
		isEnglish: language === 'en',
		isRussian: language === 'ru',
	}
}
