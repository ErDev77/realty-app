// src/hooks/useCurrencyConversion.ts
import { useState, useEffect, useCallback } from 'react'

interface ConversionResult {
	amount: number
	currency: string
	formattedAmount: string
	rate?: number
}

interface CurrencyConversionData {
	original: ConversionResult
	conversions: ConversionResult[]
	timestamp: number
	loading: boolean
	error: string | null
}

interface UseCurrencyConversionOptions {
	autoFetch?: boolean
	refreshInterval?: number // in milliseconds
	targetCurrencies?: string[]
}

export function useCurrencyConversion(
	amount: number,
	fromCurrency = 'USD',
	options: UseCurrencyConversionOptions = {}
) {
	const {
		autoFetch = true,
		refreshInterval = 30 * 60 * 1000, // 30 minutes
		targetCurrencies = ['RUB', 'AMD'],
	} = options

	const [data, setData] = useState<CurrencyConversionData>({
		original: {
			amount,
			currency: fromCurrency,
			formattedAmount: formatCurrency(amount, fromCurrency),
		},
		conversions: targetCurrencies.map(currency => ({
			amount,
			currency,
			formattedAmount: formatCurrency(amount, currency),
		})),
		timestamp: Date.now(),
		loading: false,
		error: null,
	})

	const convertCurrency = useCallback(
		async (convertAmount?: number, convertFromCurrency?: string) => {
			const finalAmount = convertAmount ?? amount
			const finalFromCurrency = convertFromCurrency ?? fromCurrency

			if (finalAmount <= 0) {
				setData(prev => ({
					...prev,
					error: 'Invalid amount',
				}))
				return
			}

			setData(prev => ({ ...prev, loading: true, error: null }))

			try {
				const response = await fetch(
					`/api/currency/convert?amount=${finalAmount}&from=${finalFromCurrency}&to=${targetCurrencies.join(
						','
					)}`
				)

				if (!response.ok) {
					throw new Error(`Failed to convert currency: ${response.status}`)
				}

				const result = await response.json()

				if (!result.success) {
					throw new Error(result.error || 'Currency conversion failed')
				}

				setData({
					original: result.original,
					conversions: result.conversions,
					timestamp: result.timestamp,
					loading: false,
					error: null,
				})
			} catch (error) {
				console.error('Currency conversion error:', error)
				setData(prev => ({
					...prev,
					loading: false,
					error:
						error instanceof Error ? error.message : 'Unknown error occurred',
				}))
			}
		},
		[amount, fromCurrency, targetCurrencies]
	)

	// Auto-fetch on mount and when dependencies change
	useEffect(() => {
		if (autoFetch && amount > 0) {
			convertCurrency()
		}
	}, [autoFetch, convertCurrency])

	// Auto-refresh at specified intervals
	useEffect(() => {
		if (!refreshInterval || refreshInterval <= 0) return

		const interval = setInterval(() => {
			if (amount > 0) {
				convertCurrency()
			}
		}, refreshInterval)

		return () => clearInterval(interval)
	}, [refreshInterval, convertCurrency])

	// Manual refresh function
	const refresh = useCallback(() => {
		convertCurrency()
	}, [convertCurrency])

	// Format currency helper
	const formatCurrencyValue = useCallback((value: number, currency: string) => {
		return formatCurrency(value, currency)
	}, [])

	// Get currency symbol
	const getCurrencySymbol = useCallback((currency: string) => {
		const symbols: Record<string, string> = {
			USD: '$',
			RUB: '₽',
			AMD: '֏',
		}
		return symbols[currency] || currency
	}, [])

	return {
		...data,
		convertCurrency,
		refresh,
		formatCurrency: formatCurrencyValue,
		getCurrencySymbol,
		// Helper getters
		usdAmount: data.original,
		rubAmount: data.conversions.find(c => c.currency === 'RUB'),
		amdAmount: data.conversions.find(c => c.currency === 'AMD'),
		isStale: Date.now() - data.timestamp > refreshInterval,
	}
}

// Standalone currency formatting function
function formatCurrency(amount: number, currency: string): string {
	const currencyConfig: Record<
		string,
		{ locale: string; options: Intl.NumberFormatOptions }
	> = {
		USD: {
			locale: 'en-US',
			options: { style: 'currency', currency: 'USD', maximumFractionDigits: 0 },
		},
		RUB: {
			locale: 'ru-RU',
			options: { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 },
		},
		AMD: {
			locale: 'hy-AM',
			options: { style: 'currency', currency: 'AMD', maximumFractionDigits: 0 },
		},
	}

	const config = currencyConfig[currency] || currencyConfig['USD']

	try {
		return new Intl.NumberFormat(config.locale, config.options).format(amount)
	} catch (error) {
		// Fallback formatting if Intl fails
		const symbols: Record<string, string> = {
			USD: '$',
			RUB: '₽',
			AMD: '֏',
		}
		const symbol = symbols[currency] || currency
		return `${symbol}${amount.toLocaleString()}`
	}
}

// Export the formatting function for standalone use
export { formatCurrency }
