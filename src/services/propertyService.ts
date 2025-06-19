import { PropertyFilter } from '../types/property'

const API_BASE_URL = 'https://realty-app-admin.vercel.app'

export function getCurrentLanguage(): 'hy' | 'en' | 'ru' {
	if (typeof window !== 'undefined') {
		// Check URL path
		const pathParts = window.location.pathname.split('/')
		const urlLang = pathParts[1]
		if (['hy', 'en', 'ru'].includes(urlLang)) {
			return urlLang as 'hy' | 'en' | 'ru'
		}

		// Check localStorage
		const savedLang = localStorage.getItem('preferred-language')
		if (savedLang && ['hy', 'en', 'ru'].includes(savedLang)) {
			return savedLang as 'hy' | 'en' | 'ru'
		}
	}

	return 'hy' // Default to Armenian
}
  

export async function getProperties(filter: PropertyFilter = {}) {
	try {
		const params = new URLSearchParams()
		const language = getCurrentLanguage()
		params.append('lang', language)

		// Add filter parameters to URL
		if (filter.property_type)
			params.append('property_type', filter.property_type)
		if (filter.listing_type) params.append('listing_type', filter.listing_type)
		if (filter.state_id) params.append('state_id', filter.state_id.toString())
		if (filter.city_id) params.append('city_id', filter.city_id.toString())
		if (filter.district_id)
			params.append('district_id', filter.district_id.toString())
		if (filter.min_price)
			params.append('min_price', filter.min_price.toString())
		if (filter.max_price)
			params.append('max_price', filter.max_price.toString())
		if (filter.bedrooms) params.append('bedrooms', filter.bedrooms.toString())
		if (filter.bathrooms)
			params.append('bathrooms', filter.bathrooms.toString())
		if (filter.sort_by) params.append('sort_by', filter.sort_by)
		if (filter.sort_order) params.append('sort_order', filter.sort_order)
		if (filter.page) params.append('page', filter.page.toString())
		if (filter.limit) params.append('limit', filter.limit.toString())

		// Set default pagination
		if (!filter.page) params.append('page', '1')
		if (!filter.limit) params.append('limit', '20')

		console.log(
			`✅ Fetching from PUBLIC endpoint: ${API_BASE_URL}/api/public/properties?${params.toString()}`
		)

		const response = await fetch(
			`${API_BASE_URL}/api/public/properties?${params.toString()}`
		)

		if (!response.ok) {
			throw new Error(
				`Failed to fetch properties: ${response.status} ${response.statusText}`
			)
		}

		const data = await response.json()

		// 🔧 FIX: Handle different API response formats
		let properties = []
		if (Array.isArray(data)) {
			properties = data
		} else if (data && Array.isArray(data.properties)) {
			properties = data.properties
		} else if (data && Array.isArray(data.data)) {
			properties = data.data
		} else {
			console.warn('Unexpected API response format for properties:', data)
			properties = []
		}

		return properties
	} catch (error) {
		console.error('Error fetching properties:', error)
		throw error
	}
}

export async function getPropertyByCustomId(customId: string) {
	try {
		const language = getCurrentLanguage()
		console.log(
			`✅ Fetching property from PUBLIC endpoint: ${API_BASE_URL}/api/public/properties/${customId}`
		)

		const response = await fetch(
			`${API_BASE_URL}/api/public/properties/${customId}?lang=${language}`
		)

		if (!response.ok) {
			if (response.status === 404) {
				return null
			}
			throw new Error(
				`Failed to fetch property: ${response.status} ${response.statusText}`
			)
		}

		const property = await response.json()
		return property
	} catch (error) {
		console.error('Error fetching property by custom ID:', error)
		throw error
	}
}

export async function getStates() {
	try {
		const language = getCurrentLanguage()

		const response = await fetch(
			`${API_BASE_URL}/api/public/properties/states?lang=${language}`
		)
		if (!response.ok) {
			throw new Error(
				`Failed to fetch states: ${response.status} ${response.statusText}`
			)
		}

		const states = await response.json()
		return states
	} catch (error) {
		console.error('Error fetching states:', error)
		throw error
	}
}

export async function getCitiesByState(stateId: number) {
	try {
		const language = getCurrentLanguage()

		const response = await fetch(
			`${API_BASE_URL}/api/public/properties/cities/${stateId}?lang=${language}`
		)

		if (!response.ok) {
			throw new Error(
				`Failed to fetch cities: ${response.status} ${response.statusText}`
			)
		}

		const cities = await response.json()
		return cities
	} catch (error) {
		console.error('Error fetching cities:', error)
		throw error
	}
}

export async function getDistrictsByState(stateId: number) {
	try {
		const language = getCurrentLanguage()

		const response = await fetch(
			`${API_BASE_URL}/api/public/properties/districts/${stateId}?lang=${language}`
		)

		if (!response.ok) {
			throw new Error(
				`Failed to fetch districts: ${response.status} ${response.statusText}`
			)
		}

		const districts = await response.json()
		return districts
	} catch (error) {
		console.error('Error fetching districts:', error)
		throw error
	}
}

export async function getPropertyFeatures() {
	try {
		const language = getCurrentLanguage()

		const response = await fetch(
			`${API_BASE_URL}/api/public/properties/features?lang=${language}`
		)

		if (!response.ok) {
			throw new Error(
				`Failed to fetch features: ${response.status} ${response.statusText}`
			)
		}

		const features = await response.json()
		return features
	} catch (error) {
		console.error('Error fetching property features:', error)
		throw error
	}
}

export async function getFeaturedProperties() {
	try {
		const language = getCurrentLanguage()

		const response = await fetch(
			`${API_BASE_URL}/api/public/properties?featured=true&limit=6&lang=${language}`
		)

		console.log(`Featured properties response status: ${response.status}`)

		if (!response.ok) {
			console.error(
				'Failed to fetch featured properties:',
				response.status,
				response.statusText
			)
			return []
		}

		const data = await response.json()

		// 🔧 FIX: Handle different API response formats
		let properties = []
		if (Array.isArray(data)) {
			properties = data
		} else if (data && Array.isArray(data.properties)) {
			properties = data.properties
		} else if (data && Array.isArray(data.data)) {
			properties = data.data
		} else {
			console.warn(
				'Unexpected API response format for featured properties:',
				data
			)
			properties = []
		}

		console.log(`✅ Received ${properties.length} featured properties`)
		return properties
	} catch (error) {
		console.error('Error fetching featured properties:', error)
		return []
	}
}

export async function getRecentProperties(limit: number = 8) {
	try {
		const language = getCurrentLanguage()

		const response = await fetch(
			`${API_BASE_URL}/api/public/properties?sort_by=created_at&sort_order=desc&limit=${limit}&lang=${language}`
		)

		console.log(`Recent properties response status: ${response.status}`)

		if (!response.ok) {
			console.error(
				'Failed to fetch recent properties:',
				response.status,
				response.statusText
			)
			return []
		}

		const data = await response.json()

		// 🔧 FIX: Handle different API response formats
		let properties = []
		if (Array.isArray(data)) {
			properties = data
		} else if (data && Array.isArray(data.properties)) {
			properties = data.properties
		} else if (data && Array.isArray(data.data)) {
			properties = data.data
		} else {
			console.warn(
				'Unexpected API response format for recent properties:',
				data
			)
			properties = []
		}

		console.log(`✅ Received ${properties.length} recent properties`)
		return properties
	} catch (error) {
		console.error('Error fetching recent properties:', error)
		return []
	}
}

export async function getPropertyStatuses() {
	try {
		const language = getCurrentLanguage()

		const response = await fetch(
			`${API_BASE_URL}/api/public/properties/statuses?lang=${language}`
		)

		if (!response.ok) {
			throw new Error(
				`Failed to fetch statuses: ${response.status} ${response.statusText}`
			)
		}

		const statuses = await response.json()
		return statuses
	} catch (error) {
		console.error('Error fetching property statuses:', error)
		throw error
	}
}


export function getTranslatedField(
	obj: any,
	fieldName: string,
	language: 'hy' | 'en' | 'ru' = 'hy'
): string {
	if (!obj) return ''

	// For Armenian, return the original field
	if (language === 'hy') {
		return obj[fieldName] || ''
	}

	// For other languages, check for translated fields
	const translatedFieldName = `${fieldName}_${language}`
	return obj[translatedFieldName] || obj[fieldName] || ''
}

// Export helper to check if translation exists
export function hasTranslation(
	obj: any,
	fieldName: string,
	language: 'hy' | 'en' | 'ru'
): boolean {
	if (!obj) return false

	if (language === 'hy') {
		return !!obj[fieldName]
	}

	const translatedFieldName = `${fieldName}_${language}`
	return !!obj[translatedFieldName]
}