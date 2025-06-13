// src/app/api/translate/languages/route.ts
import { NextRequest, NextResponse } from 'next/server'
import AzureTranslateService from '@/lib/azureTranslate'

export async function GET(request: NextRequest) {
	try {
		const supportedLanguages =
			await AzureTranslateService.getSupportedLanguages()

		return NextResponse.json({
			success: true,
			languages: supportedLanguages,
			ourLanguages: ['hy', 'en', 'ru'],
			service: 'Azure Translator',
		})
	} catch (error) {
		console.error('❌ Failed to get supported languages:', error)
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to get supported languages',
				service: 'Azure Translator',
			},
			{ status: 500 }
		)
	}
}
