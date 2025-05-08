// src/services/propertyService.ts (for the public real estate website)
import {
	Property,
	PropertyFilter,
	State,
	City,
	PropertyFeature,
} from '../types/property'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'localhost:3001'

export async function getProperties(
	filter: PropertyFilter = {}
): Promise<Property[]> {
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
		if (filter.min_area) params.append('min_area', filter.min_area.toString())
		if (filter.max_area) params.append('max_area', filter.max_area.toString())
		if (filter.features?.length)
			params.append('features', filter.features.join(','))
		if (filter.sort_by) params.append('sort_by', filter.sort_by)
		if (filter.sort_order) params.append('sort_order', filter.sort_order)
		if (filter.page) params.append('page', filter.page.toString())
		if (filter.limit) params.append('limit', filter.limit.toString())

		const response = await fetch(
			`${API_BASE_URL}/api/properties?${params.toString()}`
		)
		if (!response.ok) {
			throw new Error('Failed to fetch properties')
		}

		const data = await response.json()

		// Transform property images to match the updated format
		return data.map((property: any) => {
			// If property already has the new media format, just return it
			if (
				property.images &&
				property.images.length > 0 &&
				'type' in property.images[0]
			) {
				return property
			}

			// Otherwise transform the old image format to the new media format
			if (property.images) {
				property.images = property.images.map((image: any, index: number) => ({
					...image,
					type: 'image',
					// If thumbnailUrl is not present, use the main url
					thumbnail_url: image.thumbnail_url || image.url,
					// Keep compatibility with camelCase and snake_case
					thumbnailUrl: image.thumbnail_url || image.url,
					is_primary: image.is_primary || false,
					isPrimary: image.is_primary || false,
					display_order: image.display_order || index,
					displayOrder: image.display_order || index,
				}))
			}

			return property
		})
	} catch (error) {
		console.error('Error fetching properties:', error)
		throw error
	}
}

export async function getPropertyByCustomId(
	customId: string
): Promise<Property | null> {
	try {
		const response = await fetch(`${API_BASE_URL}/api/properties/${customId}`)
		if (!response.ok) {
			if (response.status === 404) {
				return null
			}
			throw new Error('Failed to fetch property')
		}

		const property = await response.json()

		// Transform property images to match the updated format
		if (property.images) {
			// If property already has the new media format, just return it
			if (property.images.length > 0 && 'type' in property.images[0]) {
				return property
			}

			// Otherwise transform the old image format to the new media format
			property.images = property.images.map((image: any, index: number) => ({
				...image,
				type: 'image',
				// If thumbnailUrl is not present, use the main url
				thumbnail_url: image.thumbnail_url || image.url,
				thumbnailUrl: image.thumbnail_url || image.url,
				is_primary: image.is_primary || false,
				isPrimary: image.is_primary || false,
				display_order: image.display_order || index,
				displayOrder: image.display_order || index,
			}))
		}

		return property
	} catch (error) {
		console.error('Error fetching property:', error)
		throw error
	}
}

export async function getPropertyById(id: number): Promise<Property | null> {
	console.warn(
		'getPropertyById is deprecated. Use getPropertyByCustomId instead.'
	)

	try {
		const response = await fetch(`${API_BASE_URL}/api/properties/${id}`)
		if (!response.ok) {
			if (response.status === 404) {
				return null
			}
			throw new Error('Failed to fetch property')
		}

		const property = await response.json()

		// Transform property images to match the updated format
		if (property.images) {
			// If property already has the new media format, just return it
			if (property.images.length > 0 && 'type' in property.images[0]) {
				return property
			}

			// Otherwise transform the old image format to the new media format
			property.images = property.images.map((image: any, index: number) => ({
				...image,
				type: 'image',
				// If thumbnailUrl is not present, use the main url
				thumbnail_url: image.thumbnail_url || image.url,
				thumbnailUrl: image.thumbnail_url || image.url,
				is_primary: image.is_primary || false,
				isPrimary: image.is_primary || false,
				display_order: image.display_order || index,
				displayOrder: image.display_order || index,
			}))
		}

		return property
	} catch (error) {
		console.error('Error fetching property:', error)
		throw error
	}
}

export async function getStates(): Promise<State[]> {
	try {
		const response = await fetch(`${API_BASE_URL}/api/properties/states`)
		if (!response.ok) {
			throw new Error('Failed to fetch states')
		}

		return await response.json()
	} catch (error) {
		console.error('Error fetching states:', error)
		throw error
	}
}

export async function getCitiesByState(stateId: number): Promise<City[]> {
	try {
		const response = await fetch(
			`${API_BASE_URL}/api/properties/cities/${stateId}`
		)
		if (!response.ok) {
			throw new Error('Failed to fetch cities')
		}

		return await response.json()
	} catch (error) {
		console.error('Error fetching cities:', error)
		throw error
	}
}

export async function getPropertyFeatures(): Promise<PropertyFeature[]> {
	try {
		const response = await fetch(`${API_BASE_URL}/api/properties/features`)
		if (!response.ok) {
			throw new Error('Failed to fetch features')
		}

		return await response.json()
	} catch (error) {
		console.error('Error fetching features:', error)
		throw error
	}
}

export async function submitInquiry(inquiryData: {
	propertyId: number
	name: string
	email: string
	phone?: string
	message: string
}): Promise<{ success: boolean; inquiryId?: number }> {
	try {
		const response = await fetch(`${API_BASE_URL}/api/properties/inquiries`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(inquiryData),
		})

		if (!response.ok) {
			throw new Error('Failed to submit inquiry')
		}

		return await response.json()
	} catch (error) {
		console.error('Error submitting inquiry:', error)
		throw error
	}
}

export async function getFeaturedProperties(): Promise<Property[]> {
	try {
		const response = await fetch(
			`${API_BASE_URL}/api/properties?featured=true&limit=6`
		)
		if (!response.ok) {
			throw new Error('Failed to fetch featured properties')
		}

		const data = await response.json()

		// Transform property images to match the updated format
		return data.map((property: any) => {
			// If property already has the new media format, just return it
			if (
				property.images &&
				property.images.length > 0 &&
				'type' in property.images[0]
			) {
				return property
			}

			// Otherwise transform the old image format to the new media format
			if (property.images) {
				property.images = property.images.map((image: any, index: number) => ({
					...image,
					type: 'image',
					// If thumbnailUrl is not present, use the main url
					thumbnail_url: image.thumbnail_url || image.url,
					thumbnailUrl: image.thumbnail_url || image.url,
					is_primary: image.is_primary || false,
					isPrimary: image.is_primary || false,
					display_order: image.display_order || index,
					displayOrder: image.display_order || index,
				}))
			}

			return property
		})
	} catch (error) {
		console.error('Error fetching featured properties:', error)
		throw error
	}
}

export async function getRecentProperties(
	limit: number = 8
): Promise<Property[]> {
	try {
		const response = await fetch(
			`${API_BASE_URL}/api/properties?sort_by=created_at&sort_order=desc&limit=${limit}`
		)
		if (!response.ok) {
			throw new Error('Failed to fetch recent properties')
		}

		const data = await response.json()

		// Transform property images to match the updated format
		return data.map((property: any) => {
			// If property already has the new media format, just return it
			if (
				property.images &&
				property.images.length > 0 &&
				'type' in property.images[0]
			) {
				return property
			}

			// Otherwise transform the old image format to the new media format
			if (property.images) {
				property.images = property.images.map((image: any, index: number) => ({
					...image,
					type: 'image',
					// If thumbnailUrl is not present, use the main url
					thumbnail_url: image.thumbnail_url || image.url,
					thumbnailUrl: image.thumbnail_url || image.url,
					is_primary: image.is_primary || false,
					isPrimary: image.is_primary || false,
					display_order: image.display_order || index,
					displayOrder: image.display_order || index,
				}))
			}

			return property
		})
	} catch (error) {
		console.error('Error fetching recent properties:', error)
		throw error
	}
}
