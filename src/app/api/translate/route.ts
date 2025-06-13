// src/app/api/translate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import AzureTranslateService, { Language } from '@/lib/azureTranslate'

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { text, texts, targetLanguage, sourceLanguage = 'hy' } = body

		// Validate target language
		if (!targetLanguage || !['hy', 'en', 'ru'].includes(targetLanguage)) {
			return NextResponse.json(
				{ error: 'Valid target language (hy, en, ru) is required' },
				{ status: 400 }
			)
		}

		// Single text translation
		if (text) {
			const translation = await AzureTranslateService.translateText(
				text,
				targetLanguage as Language,
				sourceLanguage as Language
			)

			return NextResponse.json({
				success: true,
				translation,
				originalText: text,
				targetLanguage,
				service: 'Azure Translator',
			})
		}

		// Batch translation
		if (texts && Array.isArray(texts)) {
			const translations = await AzureTranslateService.translateBatch(
				texts,
				targetLanguage as Language,
				sourceLanguage as Language
			)

			return NextResponse.json({
				success: true,
				translations,
				originalTexts: texts,
				targetLanguage,
				service: 'Azure Translator',
			})
		}

		return NextResponse.json(
			{ error: 'Either "text" or "texts" array is required' },
			{ status: 400 }
		)
	} catch (error) {
		console.error('❌ Azure Translation API error:', error)
		return NextResponse.json(
			{
				success: false,
				error: 'Translation failed',
				details: error instanceof Error ? error.message : 'Unknown error',
				service: 'Azure Translator',
			},
			{ status: 500 }
		)
	}
}
