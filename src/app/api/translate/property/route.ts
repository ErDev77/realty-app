// src/app/api/translate/property/route.ts
import { NextRequest, NextResponse } from 'next/server'
import AzureTranslateService, { Language } from '@/lib/azureTranslate'

export async function POST(request: NextRequest) {
	try {
		const { property, targetLanguage } = await request.json()

		if (!property) {
			return NextResponse.json(
				{ error: 'Property object is required' },
				{ status: 400 }
			)
		}

		if (!targetLanguage || !['hy', 'en', 'ru'].includes(targetLanguage)) {
			return NextResponse.json(
				{ error: 'Valid target language (hy, en, ru) is required' },
				{ status: 400 }
			)
		}

		const translatedProperty = await AzureTranslateService.translateProperty(
			property,
			targetLanguage as Language
		)

		return NextResponse.json({
			success: true,
			property: translatedProperty,
			targetLanguage,
			service: 'Azure Translator',
		})
	} catch (error) {
		console.error('❌ Azure Property translation API error:', error)
		return NextResponse.json(
			{
				success: false,
				error: 'Property translation failed',
				details: error instanceof Error ? error.message : 'Unknown error',
				service: 'Azure Translator',
			},
			{ status: 500 }
		)
	}
}
