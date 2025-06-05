import { PropertyFilter } from '../types/property'

const API_BASE_URL = 'http://localhost:3000'

export async function getProperties(filter: PropertyFilter = {}) {
	try {
		const params = new URLSearchParams()

		// Add filter parameters to URL
		if (filter.property_type)
			params.append('property_type', filter.property_type)
		if (filter.listing_type) params.append('listing_type', filter.listing_type)
		if (filter.state_id) params.append('state_id', filter.state_id.toString())
		if (filter.city_id) params.append('city_id', filter.city_id.toString())
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
			`Fetching from: ${API_BASE_URL}/api/public/properties?${params.toString()}`
		)

		// ✅ Use PUBLIC endpoint
		const response = await fetch(
			`${API_BASE_URL}/api/properties?${params.toString()}`
		)

		if (!response.ok) {
			throw new Error(
				`Failed to fetch properties: ${response.status} ${response.statusText}`
			)
		}

		const data = await response.json()
		return data
	} catch (error) {
		console.error('Error fetching properties:', error)
		throw error
	}
}

export async function getPropertyByCustomId(customId: string) {
	try {
		// ✅ Use PUBLIC endpoint
		const response = await fetch(
			`${API_BASE_URL}/api/properties/${customId}`
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
		// ✅ Use PUBLIC endpoint
		const response = await fetch(`${API_BASE_URL}/api/public/properties/states`)

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
		// ✅ Use PUBLIC endpoint
		const response = await fetch(
			`${API_BASE_URL}/api/public/properties/cities/${stateId}`
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

export async function getPropertyFeatures() {
	try {
		// ✅ Use PUBLIC endpoint
		const response = await fetch(
			`${API_BASE_URL}/api/public/properties/features`
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
		console.log('Fetching featured properties...')
		// ✅ Use PUBLIC endpoint with featured filter
		const response = await fetch(
			`${API_BASE_URL}/api/public/properties?featured=true&limit=6`
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
		console.log(`Received ${data.length} featured properties`)
		return data
	} catch (error) {
		console.error('Error fetching featured properties:', error)
		return []
	}
}

export async function getRecentProperties(limit: number = 8) {
	try {
		console.log(`Fetching recent properties with limit ${limit}...`)
		// ✅ Use PUBLIC endpoint
		const response = await fetch(
			`${API_BASE_URL}/api/public/properties?sort_by=created_at&sort_order=desc&limit=${limit}`
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
		console.log(`Received ${data.length} recent properties`)
		return data
	} catch (error) {
		console.error('Error fetching recent properties:', error)
		return []
	}
}
