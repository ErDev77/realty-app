// src/app/api/translate/health/route.ts
import { NextRequest, NextResponse } from 'next/server'
import AzureTranslateService from '@/lib/azureTranslate'

export async function GET(request: NextRequest) {
	try {
		// Test translation to verify API is working
		const testTranslation = await AzureTranslateService.translateText(
			'Բարև',
			'en',
			'hy'
		)

		const isConnected = await AzureTranslateService.testConnection()

		return NextResponse.json({
			success: true,
			status: 'Azure Translator API is working',
			testTranslation,
			connected: isConnected,
			cacheSize: AzureTranslateService.getCacheSize(),
			service: 'Azure Translator',
			timestamp: new Date().toISOString(),
			config: {
				endpoint: process.env.AZURE_TRANSLATOR_ENDPOINT,
				region: process.env.AZURE_TRANSLATOR_REGION,
				hasKey: !!process.env.AZURE_TRANSLATOR_KEY,
			},
		})
	} catch (error) {
		console.error('❌ Azure Translation health check failed:', error)
		return NextResponse.json(
			{
				success: false,
				status: 'Azure Translator API is not working',
				error: error instanceof Error ? error.message : 'Unknown error',
				service: 'Azure Translator',
				timestamp: new Date().toISOString(),
				config: {
					endpoint: process.env.AZURE_TRANSLATOR_ENDPOINT,
					region: process.env.AZURE_TRANSLATOR_REGION,
					hasKey: !!process.env.AZURE_TRANSLATOR_KEY,
				},
			},
			{ status: 500 }
		)
	}
}
