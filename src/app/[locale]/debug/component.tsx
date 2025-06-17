// Test component to debug currency API
'use client'

import { useState } from 'react'

export default function CurrencyAPITest() {
	const [result, setResult] = useState<any>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const testAPI = async () => {
		setLoading(true)
		setError(null)

		try {
			console.log('🧪 Testing currency API...')

			const response = await fetch(
				'/api/currency/convert?amount=100&from=USD&to=AMD,RUB'
			)
			const data = await response.json()

			console.log('📦 API Response:', data)
			setResult(data)
		} catch (err) {
			console.error('💥 Test failed:', err)
			setError(err instanceof Error ? err.message : 'Unknown error')
		} finally {
			setLoading(false)
		}
	}

	// Test individual APIs directly
	const testFawazAPI = async () => {
		setLoading(true)
		try {
			console.log('🧪 Testing Fawaz API directly...')
			const response = await fetch(
				'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json'
			)
			const data = await response.json()
			console.log('📦 Fawaz API Response:', data)

			// Extract AMD and RUB rates
			const usdRates = data.usd
			setResult({
				source: 'Fawaz API Direct',
				amd: usdRates.amd,
				rub: usdRates.rub,
				fullData: usdRates,
			})
		} catch (err) {
			console.error('💥 Fawaz API test failed:', err)
			setError(err instanceof Error ? err.message : 'Unknown error')
		} finally {
			setLoading(false)
		}
	}

	const testExchangeRateAPI = async () => {
		setLoading(true)
		try {
			console.log('🧪 Testing ExchangeRate-API directly...')
			const response = await fetch(
				'https://api.exchangerate-api.com/v4/latest/USD'
			)
			const data = await response.json()
			console.log('📦 ExchangeRate-API Response:', data)

			setResult({
				source: 'ExchangeRate-API Direct',
				amd: data.rates.AMD,
				rub: data.rates.RUB,
				fullRates: data.rates,
			})
		} catch (err) {
			console.error('💥 ExchangeRate-API test failed:', err)
			setError(err instanceof Error ? err.message : 'Unknown error')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='max-w-4xl mx-auto p-8 space-y-6'>
			<h1 className='text-3xl font-bold text-center mb-8'>
				Currency API Debug Tool
			</h1>

			{/* Test Buttons */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				<button
					onClick={testAPI}
					disabled={loading}
					className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50'
				>
					{loading ? 'Testing...' : 'Test Your API Route'}
				</button>

				<button
					onClick={testFawazAPI}
					disabled={loading}
					className='px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50'
				>
					{loading ? 'Testing...' : 'Test Fawaz API Direct'}
				</button>

				<button
					onClick={testExchangeRateAPI}
					disabled={loading}
					className='px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50'
				>
					{loading ? 'Testing...' : 'Test ExchangeRate-API Direct'}
				</button>
			</div>

			{/* Loading */}
			{loading && (
				<div className='text-center py-8'>
					<div className='animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4'></div>
					<p className='text-gray-600'>Testing API...</p>
				</div>
			)}

			{/* Error */}
			{error && (
				<div className='bg-red-50 border border-red-200 rounded-lg p-4'>
					<h3 className='font-semibold text-red-800 mb-2'>Error</h3>
					<p className='text-red-600'>{error}</p>
				</div>
			)}

			{/* Results */}
			{result && (
				<div className='bg-white border border-gray-200 rounded-lg p-6'>
					<h3 className='font-semibold text-gray-800 mb-4'>API Test Results</h3>

					{/* Quick Summary */}
					{result.conversions && (
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
							{result.conversions.map((conversion: any) => (
								<div
									key={conversion.currency}
									className='bg-gray-50 p-4 rounded-lg'
								>
									<div className='text-lg font-semibold text-gray-800'>
										{conversion.currency}: {conversion.formattedAmount}
									</div>
									<div className='text-sm text-gray-600'>
										Rate: {conversion.rate}
									</div>
								</div>
							))}
						</div>
					)}

					{/* Direct API Results */}
					{result.source && (
						<div className='space-y-2 mb-6'>
							<h4 className='font-medium text-gray-700'>
								Source: {result.source}
							</h4>
							{result.amd && (
								<p className='text-sm'>
									<span className='font-medium'>AMD Rate:</span> {result.amd}
									<span className='ml-4 text-gray-500'>
										(100 USD = {(100 * result.amd).toFixed(2)} AMD)
									</span>
								</p>
							)}
							{result.rub && (
								<p className='text-sm'>
									<span className='font-medium'>RUB Rate:</span> {result.rub}
									<span className='ml-4 text-gray-500'>
										(100 USD = {(100 * result.rub).toFixed(2)} RUB)
									</span>
								</p>
							)}
						</div>
					)}

					{/* Raw Response */}
					<details className='mt-4'>
						<summary className='cursor-pointer font-medium text-gray-700 hover:text-gray-900'>
							View Raw Response
						</summary>
						<pre className='mt-2 bg-gray-100 p-4 rounded-lg text-xs overflow-auto'>
							{JSON.stringify(result, null, 2)}
						</pre>
					</details>
				</div>
			)}

			{/* Instructions */}
			<div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
				<h3 className='font-semibold text-blue-800 mb-2'>Debug Instructions</h3>
				<ul className='text-blue-700 text-sm space-y-1'>
					<li>
						1. <strong>Test Your API Route</strong> - Tests your
						/api/currency/convert endpoint
					</li>
					<li>
						2. <strong>Test Direct APIs</strong> - Tests external APIs directly
						to see if they work
					</li>
					<li>
						3. <strong>Check Console</strong> - Open browser dev tools to see
						detailed logs
					</li>
					<li>
						4. <strong>Compare Rates</strong> - Check if you're getting live
						rates vs fallback
					</li>
				</ul>
			</div>
		</div>
	)
}
