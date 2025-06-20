import { PropertyFilter } from '../types/property'

const API_BASE_URL = 'https://localhost:3000' // Update with your actual API base URL

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

		// Set default pagination with higher limits
		if (!filter.page) params.append('page', '1')
		if (!filter.limit) params.append('limit', '50') // Increased from 20 to 50

		console.log(
			`✅ Fetching from PUBLIC endpoint: ${API_BASE_URL}/api/public/properties?${params.toString()}`
		)

		const response = await fetch(
			`${API_BASE_URL}/api/public/properties?${params.toString()}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}
		)

		if (!response.ok) {
			console.error(`API Error: ${response.status} ${response.statusText}`)
			const errorText = await response.text()
			console.error('Error response:', errorText)
			throw new Error(
				`Failed to fetch properties: ${response.status} ${response.statusText}`
			)
		}

		const data = await response.json()
		console.log('Raw API Response:', data)

		// 🔧 FIX: Handle different API response formats more robustly
		let properties = []

		if (Array.isArray(data)) {
			properties = data
		} else if (data && typeof data === 'object') {
			// Try different possible property arrays
			if (Array.isArray(data.properties)) {
				properties = data.properties
			} else if (Array.isArray(data.data)) {
				properties = data.data
			} else if (Array.isArray(data.results)) {
				properties = data.results
			} else if (Array.isArray(data.items)) {
				properties = data.items
			} else {
				console.warn('Unexpected API response format:', data)
				// If it's a single property object, wrap it in an array
				if (data.id || data.custom_id) {
					properties = [data]
				} else {
					properties = []
				}
			}
		} else {
			console.warn('Unexpected API response format:', data)
			properties = []
		}

		console.log(`✅ Processed ${properties.length} properties`)
		return properties
	} catch (error) {
		console.error('Error fetching properties:', error)
		// Return empty array instead of throwing to prevent crashes
		return []
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
		console.log('Fetching states...')

		const response = await fetch(
			`${API_BASE_URL}/api/public/properties/states?lang=${language}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}
		)

		if (!response.ok) {
			console.error(
				`Failed to fetch states: ${response.status} ${response.statusText}`
			)
			return []
		}

		const states = await response.json()
		console.log('States fetched:', states)
		return Array.isArray(states) ? states : []
	} catch (error) {
		console.error('Error fetching states:', error)
		return []
	}
}

export async function getCitiesByState(stateId: number) {
	try {
		const language = getCurrentLanguage()
		console.log(`Fetching cities for state ${stateId}...`)

		const response = await fetch(
			`${API_BASE_URL}/api/public/properties/cities/${stateId}?lang=${language}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}
		)

		if (!response.ok) {
			console.error(
				`Failed to fetch cities: ${response.status} ${response.statusText}`
			)
			return []
		}

		const cities = await response.json()
		console.log('Cities fetched:', cities)
		return Array.isArray(cities) ? cities : []
	} catch (error) {
		console.error('Error fetching cities:', error)
		return []
	}
}

export async function getDistrictsByState(stateId: number) {
	try {
		const language = getCurrentLanguage()
		console.log(`Fetching districts for state ${stateId}...`)

		const response = await fetch(
			`${API_BASE_URL}/api/public/properties/districts/${stateId}?lang=${language}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}
		)

		if (!response.ok) {
			console.error(
				`Failed to fetch districts: ${response.status} ${response.statusText}`
			)
			return []
		}

		const districts = await response.json()
		console.log('Districts fetched:', districts)
		return Array.isArray(districts) ? districts : []
	} catch (error) {
		console.error('Error fetching districts:', error)
		return []
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

		console.log('Fetching featured properties...')
		const response = await fetch(
			`${API_BASE_URL}/api/public/properties?featured=true&limit=20&lang=${language}`, // Increased limit
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}
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
		console.log('Featured properties raw response:', data)

		// 🔧 FIX: Handle different API response formats
		let properties = []
		if (Array.isArray(data)) {
			properties = data
		} else if (data && typeof data === 'object') {
			if (Array.isArray(data.properties)) {
				properties = data.properties
			} else if (Array.isArray(data.data)) {
				properties = data.data
			} else if (Array.isArray(data.results)) {
				properties = data.results
			} else {
				console.warn(
					'Unexpected API response format for featured properties:',
					data
				)
				properties = []
			}
		}

		console.log(`✅ Received ${properties.length} featured properties`)
		return properties
	} catch (error) {
		console.error('Error fetching featured properties:', error)
		return []
	}
}

export async function getRecentProperties(limit: number = 12) {
	try {
		const language = getCurrentLanguage()

		console.log('Fetching recent properties...')
		const response = await fetch(
			`${API_BASE_URL}/api/public/properties?sort_by=created_at&sort_order=desc&limit=${limit}&lang=${language}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}
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
		console.log('Recent properties raw response:', data)

		// 🔧 FIX: Handle different API response formats
		let properties = []
		if (Array.isArray(data)) {
			properties = data
		} else if (data && typeof data === 'object') {
			if (Array.isArray(data.properties)) {
				properties = data.properties
			} else if (Array.isArray(data.data)) {
				properties = data.data
			} else if (Array.isArray(data.results)) {
				properties = data.results
			} else {
				console.warn(
					'Unexpected API response format for recent properties:',
					data
				)
				properties = []
			}
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

export function getTranslatedCityName(
	cityName: string,
	language: 'hy' | 'en' | 'ru'
): string {
	const cityTranslations: Record<string, Record<string, string>> = {
		Yerevan: { hy: 'Երևան', en: 'Yerevan', ru: 'Ереван' },
		Gyumri: { hy: 'Գյումրի', en: 'Gyumri', ru: 'Гюмри' },
		Vanadzor: { hy: 'Վանաձոր', en: 'Vanadzor', ru: 'Ванадзор' },
		Abovyan: { hy: 'Աբովյան', en: 'Abovyan', ru: 'Абовян' },
		Kapan: { hy: 'Կապան', en: 'Kapan', ru: 'Капан' },
		Armavir: { hy: 'Արմավիր', en: 'Armavir', ru: 'Армавир' },
		Gavar: { hy: 'Գավառ', en: 'Gavar', ru: 'Гавар' },
		Artashat: { hy: 'Արտաշատ', en: 'Artashat', ru: 'Арташат' },
		Goris: { hy: 'Գորիս', en: 'Goris', ru: 'Горис' },
		Ashtarak: { hy: 'Աշտարակ', en: 'Ashtarak', ru: 'Аштарак' },
		Sevan: { hy: 'Սևան', en: 'Sevan', ru: 'Севан' },
		Razdan: { hy: 'Ռազդան', en: 'Razdan', ru: 'Раздан' },
		Ejmiadzin: { hy: 'Էջմիածին', en: 'Ejmiadzin', ru: 'Эчмиадзин' },
		Charentsavan: { hy: 'Չարենցավան', en: 'Charentsavan', ru: 'Чаренцаван' },
		Masis: { hy: 'Մասիս', en: 'Masis', ru: 'Масис' },
		Alaverdi: { hy: 'Ալավերդի', en: 'Alaverdi', ru: 'Алаверди' },
		Sisian: { hy: 'Սիսիան', en: 'Sisian', ru: 'Сисиан' },
		Kajaran: { hy: 'Քաջարան', en: 'Kajaran', ru: 'Каджаран' },
		Yeghegnadzor: { hy: 'Եղեգնաձոր', en: 'Yeghegnadzor', ru: 'Егегнадзор' },
		Tashir: { hy: 'Տաշիր', en: 'Tashir', ru: 'Ташир' },
		Akhtala: { hy: 'Ախթալա', en: 'Akhtala', ru: 'Ахтала' },
		Metsamor: { hy: 'Մեծամոր', en: 'Metsamor', ru: 'Мецамор' },
		Spitak: { hy: 'Սպիտակ', en: 'Spitak', ru: 'Спитак' },
		Shamlugh: { hy: 'Շամլուղ', en: 'Shamlugh', ru: 'Шамлуг' },
		Martuni: { hy: 'Մարտունի', en: 'Martuni', ru: 'Мартуни' },
		Jermuk: { hy: 'Ջերմուկ', en: 'Jermuk', ru: 'Джермук' },
		Byureghavan: { hy: 'Բյուրեղավան', en: 'Byureghavan', ru: 'Бюрегаван' },
		'Nor Hachn': { hy: 'Նոր Հաճն', en: 'Nor Hachn', ru: 'Нор Ачн' },
		Chambarak: { hy: 'Ճամբարակ', en: 'Chambarak', ru: 'Чамбарак' },
		Aparan: { hy: 'Ապարան', en: 'Aparan', ru: 'Апаран' },
		Artik: { hy: 'Արթիկ', en: 'Artik', ru: 'Артик' },
		Maralik: { hy: 'Մարալիկ', en: 'Maralik', ru: 'Маралик' },
		Ijevan: { hy: 'Իջևան', en: 'Ijevan', ru: 'Иджеван' },
		Berd: { hy: 'Բերդ', en: 'Berd', ru: 'Берд' },
		Dilijan: { hy: 'Դիլիջան', en: 'Dilijan', ru: 'Дилижан' },
		Noyemberyan: { hy: 'Նոյեմբերյան', en: 'Noyemberyan', ru: 'Ноемберян' },
		Ayrum: { hy: 'Այրում', en: 'Ayrum', ru: 'Айрум' },
		Vardenis: { hy: 'Վարդենիս', en: 'Vardenis', ru: 'Варденис' },
		Meghri: { hy: 'Մեղրի', en: 'Meghri', ru: 'Мегри' },
		Agarak: { hy: 'Ագարակ', en: 'Agarak', ru: 'Агарак' },
		Dastakert: { hy: 'Դաստակերտ', en: 'Dastakert', ru: 'Дастакерт' },
		Akhuryan: { hy: 'Ախուրյան', en: 'Akhuryan', ru: 'Ахурян' },
		Amasia: { hy: 'Ամասիա', en: 'Amasia', ru: 'Амасия' },
		Ashotsk: { hy: 'Աշոցք', en: 'Ashotsk', ru: 'Ашоцк' },
		// Add more as needed
	}

	return cityTranslations[cityName]?.[language] || cityName
}

export function getTranslatedStateName(
	stateName: string,
	language: 'hy' | 'en' | 'ru'
): string {
	const stateTranslations: Record<string, Record<string, string>> = {
		Yerevan: { hy: 'Երևան', en: 'Yerevan', ru: 'Ереван' },
		Shirak: { hy: 'Շիրակ', en: 'Shirak', ru: 'Ширак' },
		Lori: { hy: 'Լոռի', en: 'Lori', ru: 'Лори' },
		Kotayk: { hy: 'Կոտայք', en: 'Kotayk', ru: 'Котайк' },
		Gegharkunik: { hy: 'Գեղարքունիք', en: 'Gegharkunik', ru: 'Гегаркуник' },
		Ararat: { hy: 'Արարատ', en: 'Ararat', ru: 'Арарат' },
		'Vayots Dzor': { hy: 'Վայոց Ձոր', en: 'Vayots Dzor', ru: 'Вайоц Дзор' },
		Syunik: { hy: 'Սյունիք', en: 'Syunik', ru: 'Сюник' },
		Armavir: { hy: 'Արմավիր', en: 'Armavir', ru: 'Армавир' },
		Aragatsotn: { hy: 'Արագածոտն', en: 'Aragatsotn', ru: 'Арагацотн' },
		Tavush: { hy: 'Տավուշ', en: 'Tavush', ru: 'Тавуш' },
	}

	return stateTranslations[stateName]?.[language] || stateName
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