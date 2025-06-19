// // src/app/[locale]/properties/[id]/PropertyDetailClient.tsx
// 'use client'

// import { useState, useEffect, useCallback, useMemo } from 'react'
// import { useParams } from 'next/navigation'
// import Image from 'next/image'
// import { Property, PropertyStatus } from '@/types/property'
// import { getPropertyByCustomId } from '@/services/propertyService'
// import { useCurrencyConversion } from '@/hooks/useCurrencyConversion'
// import {
// 	MapPin,
// 	Bed,
// 	Bath,
// 	Maximize,
// 	Calendar,
// 	Home,
// 	Building2,
// 	Landmark,
// 	Trees,
// 	Check,
// 	X,
// 	Share2,
// 	Heart,
// 	Loader2,
// 	Mail,
// 	ChevronLeft,
// 	ChevronRight,
// 	Tag,
// 	Eye,
// 	Info,
// 	Copy,
// 	Printer,
// 	FileText,
// 	Play,
// 	ArrowUp,
// 	RefreshCw,
// 	Globe,
// 	TrendingUp,
// 	Navigation,
// 	MapIcon,
// } from 'lucide-react'

// import Link from 'next/link'

// interface PropertyDetailClientProps {
// 	property: any // Replace 'any' with the actual property type if available
// }

// const YandexMap = ({
// 	latitude,
// 	longitude,
// 	address,
// 	title,
// }: {
// 	latitude: number
// 	longitude: number
// 	address: string
// 	title: string
// }) => {
// 	const [mapLoaded, setMapLoaded] = useState(false)
// 	const [mapError, setMapError] = useState(false)

// 	useEffect(() => {
// 		// Load Yandex Maps API
// 		const loadYandexMaps = () => {
// 			if (window.ymaps) {
// 				initMap()
// 				return
// 			}

// 			const script = document.createElement('script')
// 			script.src = `https://api-maps.yandex.ru/2.1/?apikey=${
// 				process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY || ''
// 			}&lang=en_US`
// 			script.onload = () => {
// 				window.ymaps.ready(initMap)
// 			}
// 			script.onerror = () => {
// 				setMapError(true)
// 			}
// 			document.head.appendChild(script)
// 		}

// 		const initMap = () => {
// 			try {
// 				const map = new window.ymaps.Map('yandex-map', {
// 					center: [latitude, longitude],
// 					zoom: 16,
// 					controls: ['zoomControl', 'fullscreenControl', 'typeSelector'],
// 				})

// 				// Add placemark
// 				const placemark = new window.ymaps.Placemark(
// 					[latitude, longitude],
// 					{
// 						balloonContent: `
// 							<div style="padding: 10px; max-width: 300px;">
// 								<h3 style="margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">${title}</h3>
// 								<p style="margin: 0; color: #666; font-size: 14px;">${address}</p>
// 								<div style="margin-top: 10px;">
// 									<a href="https://yandex.com/maps/?pt=${longitude},${latitude}&z=16&l=map" 
// 									   target="_blank" 
// 									   style="color: #007bff; text-decoration: none; font-size: 14px;">
// 										Open in Yandex Maps
// 									</a>
// 								</div>
// 							</div>
// 						`,
// 						hintContent: title,
// 					},
// 					{
// 						preset: 'islands#redDotIcon',
// 						iconColor: '#ff0000',
// 					}
// 				)

// 				map.geoObjects.add(placemark)
// 				setMapLoaded(true)
// 			} catch (error) {
// 				console.error('Error initializing Yandex Map:', error)
// 				setMapError(true)
// 			}
// 		}

// 		loadYandexMaps()
// 	}, [latitude, longitude, address, title])

// 	if (mapError) {
// 		return (
// 			<div className='w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center'>
// 				<div className='text-center'>
// 					<MapIcon className='w-8 h-8 text-gray-400 mx-auto mb-2' />
// 					<p className='text-gray-500 text-sm'>Map could not be loaded</p>
// 					<a
// 						href={`https://yandex.com/maps/?pt=${longitude},${latitude}&z=16&l=map`}
// 						target='_blank'
// 						rel='noopener noreferrer'
// 						className='text-blue-600 hover:text-blue-700 text-sm underline mt-2 inline-block'
// 					>
// 						View on Yandex Maps
// 					</a>
// 				</div>
// 			</div>
// 		)
// 	}

// 	return (
// 		<div className='relative'>
// 			<div
// 				id='yandex-map'
// 				className='w-full h-64 rounded-xl overflow-hidden'
// 				style={{ display: mapLoaded ? 'block' : 'none' }}
// 			/>
// 			{!mapLoaded && (
// 				<div className='w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center'>
// 					<div className='text-center'>
// 						<Loader2 className='w-8 h-8 text-blue-600 animate-spin mx-auto mb-2' />
// 						<p className='text-gray-500 text-sm'>Loading map...</p>
// 					</div>
// 				</div>
// 			)}

// 			{/* Map controls overlay */}
// 			<div className='absolute bottom-4 right-4 flex gap-2'>
// 				<button
// 					onClick={() => {
// 						const url = `https://yandex.com/maps/?pt=${longitude},${latitude}&z=16&l=map`
// 						window.open(url, '_blank')
// 					}}
// 					className='bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg hover:bg-white transition-colors text-sm font-medium'
// 				>
// 					<Navigation className='w-4 h-4 mr-1 inline' />
// 					Directions
// 				</button>
// 				<button
// 					onClick={() => {
// 						const url = `https://yandex.com/maps/?pt=${longitude},${latitude}&z=16&l=map`
// 						window.open(url, '_blank')
// 					}}
// 					className='bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg hover:bg-white transition-colors text-sm font-medium'
// 				>
// 					<Globe className='w-4 h-4 mr-1 inline' />
// 					View Larger
// 				</button>
// 			</div>
// 		</div>
// 	)
// }


// const API_BASE_URL = 'http://localhost:3000'

// function CurrencyDisplay({
// 	amount,
// 	originalCurrency,
// 	listingType,
// }: {
// 	amount: number
// 	originalCurrency: string
// 	listingType: string
// }) {
// 	// ✅ FIX: Memoize the options object to prevent infinite loops
// 	const conversionOptions = useMemo(() => ({
// 		autoFetch: true,
// 		refreshInterval: 30 * 60 * 1000, // 30 minutes
// 		targetCurrencies: ['RUB', 'AMD'],
// 	}), []) // Empty dependency array since these values never change

// 	const { original, conversions, loading, error, refresh, isStale } =
// 		useCurrencyConversion(amount, originalCurrency, conversionOptions)

// 	// ✅ FIX: Memoize functions to prevent recreating them on every render
// 	const formatPriceWithSuffix = useCallback((formattedAmount: string, currency: string) => {
// 		switch (listingType) {
// 			case 'rent':
// 				return currency === 'USD'
// 					? `${formattedAmount}/month`
// 					: currency === 'RUB'
// 					? `${formattedAmount}/месяц`
// 					: `${formattedAmount}/ամիս`
// 			case 'daily_rent':
// 				return currency === 'USD'
// 					? `${formattedAmount}/day`
// 					: currency === 'RUB'
// 					? `${formattedAmount}/день`
// 					: `${formattedAmount}/օր`
// 			default:
// 				return formattedAmount
// 		}
// 	}, [listingType])

// 	const getCurrencyFlag = useCallback((currency: string) => {
// 		const flags: Record<string, string> = {
// 			USD: '🇺🇸',
// 			RUB: '🇷🇺',
// 			AMD: '🇦🇲',
// 		}
// 		return flags[currency] || '💰'
// 	}, [])

// 	if (loading && !original.formattedAmount) {
// 		return (
// 			<div className='flex items-center space-x-2'>
// 				<Loader2 className='w-5 h-5 animate-spin text-blue-600' />
// 				<span className='text-gray-500'>Loading exchange rates...</span>
// 			</div>
// 		)
// 	}

// 	return (
// 		<div className='space-y-4'>
// 			{/* Primary Price */}
// 			<div className='flex items-center justify-between'>
// 				<div className='text-3xl font-bold text-blue-600 flex items-center'>
// 					{formatPriceWithSuffix(original.formattedAmount, original.currency)}
// 				</div>

// 				{/* Refresh Button */}
// 				<button
// 					onClick={refresh}
// 					disabled={loading}
// 					className={`p-2 rounded-full transition-colors ${
// 						isStale
// 							? 'bg-orange-100 text-orange-600 hover:bg-orange-200'
// 							: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
// 					}`}
// 					title={
// 						isStale
// 							? 'Exchange rates may be outdated - click to refresh'
// 							: 'Refresh exchange rates'
// 					}
// 				>
// 					<RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
// 				</button>
// 			</div>

// 			{/* Converted Prices */}
// 			{conversions.length > 0 && (
// 				<div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100'>
// 					<div className='flex items-center justify-between mb-3'>
// 						{error && (
// 							<span className='text-xs text-red-500 flex items-center'>
// 								<X className='w-3 h-3 mr-1' />
// 								Failed to load rates
// 							</span>
// 						)}
// 					</div>

// 					<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
// 						{conversions.map(conversion => (
// 							<div
// 								key={conversion.currency}
// 								className='bg-white rounded-lg p-3 border border-gray-200 hover:border-blue-300 transition-colors'
// 							>
// 								<div className='flex items-center justify-between'>
// 									<div className='flex items-center'>
// 										<span className='text-lg mr-2'>
// 											{getCurrencyFlag(conversion.currency)}
// 										</span>
// 										<div>
// 											<div className='font-semibold text-gray-900'>
// 												{formatPriceWithSuffix(
// 													conversion.formattedAmount,
// 													conversion.currency
// 												)}
// 											</div>
// 											{conversion.rate && (
// 												<div className='text-xs text-gray-500'>
// 													1 {original.currency} = {conversion.rate.toFixed(2)}{' '}
// 													{conversion.currency}
// 												</div>
// 											)}
// 										</div>
// 									</div>
// 									{listingType === 'sale' && (
// 										<TrendingUp className='w-4 h-4 text-green-500' />
// 									)}
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	)
// }

// export default function PropertyDetailClient({}: PropertyDetailClientProps) {
// 	const params = useParams()
// 	const [property, setProperty] = useState<Property | null>(null)
// 	const [loading, setLoading] = useState(true)
// 	const [error, setError] = useState<string | null>(null)
// 	const [selectedImage, setSelectedImage] = useState(0)
// 	const [showFullGallery, setShowFullGallery] = useState(false)
// 	const [saved, setSaved] = useState(false)
// 	const [showShareOptions, setShowShareOptions] = useState(false)

// 	// ✅ FIX: Memoize the getImageUrl function to prevent recreation
// 	const getImageUrl = useCallback((path: string) => {
// 		// If it's already a full URL, return it as is
// 		if (path?.startsWith('http')) return path

// 		// Otherwise, prepend the API base URL
// 		return `${API_BASE_URL}${path}`
// 	}, [])

// 	useEffect(() => {
// 		const fetchProperty = async () => {
// 			if (!params.id) return

// 			try {
// 				setLoading(true)
// 				const data = await getPropertyByCustomId(params.id as string)
// 				setProperty(data)
// 			} catch (err) {
// 				setError('Failed to load property details')
// 				console.error('Error fetching property:', err)
// 			} finally {
// 				setLoading(false)
// 			}
// 		}

// 		fetchProperty()
// 	}, [params.id]) // ✅ FIX: Only depend on params.id

// 	// ✅ FIX: Memoize navigation functions to prevent recreation
// 	const nextImage = useCallback(() => {
// 		if (!property?.images) return
// 		setSelectedImage(prev => (prev + 1) % (property.images?.length ?? 1))
// 	}, [property?.images])

// 	const prevImage = useCallback(() => {
// 		if (!property?.images) return
// 		setSelectedImage(
// 			prev =>
// 				(prev - 1 + (property.images?.length ?? 0)) %
// 				(property.images?.length ?? 1)
// 		)
// 	}, [property?.images])

// 	const toggleSaved = useCallback(() => {
// 		setSaved(prev => !prev)
// 	}, [])

// 	const copyLinkToClipboard = useCallback(() => {
// 		navigator.clipboard.writeText(window.location.href)
// 		alert('Link copied to clipboard!')
// 		setShowShareOptions(false)
// 	}, [])

// 	const printPage = useCallback(() => {
// 		window.print()
// 		setShowShareOptions(false)
// 	}, [])

// 	// ✅ FIX: Move getPropertyAttributes hook BEFORE any early returns
// 	const getPropertyAttributes = useCallback(() => {
// 		if (!property) return null

// 		switch (property.property_type) {
// 			case 'house':
// 				return (
// 					<div className='grid grid-cols-2 gap-4 mb-6 border-b border-gray-100 pb-6'>
// 						{'attributes' in property && property.attributes && (
// 							<>
// 								<div className='flex items-center'>
// 									<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
// 										<Bed className='w-6 h-6 text-blue-600' />
// 									</div>
// 									<div>
// 										<p className='text-xs text-gray-500'>Bedrooms</p>
// 										<p className='font-medium text-gray-700'>
// 											{property.attributes.bedrooms}
// 										</p>
// 									</div>
// 								</div>

// 								<div className='flex items-center'>
// 									<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
// 										<Bath className='w-6 h-6 text-blue-600' />
// 									</div>
// 									<div>
// 										<p className='text-xs text-gray-500'>Bathrooms</p>
// 										<p className='font-medium text-gray-700'>
// 											{property.attributes.bathrooms}
// 										</p>
// 									</div>
// 								</div>

// 								<div className='flex items-center'>
// 									<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
// 										<Maximize className='w-6 h-6 text-blue-600' />
// 									</div>
// 									<div>
// 										<p className='text-xs text-gray-500'>Area</p>
// 										<p className='font-medium text-gray-700'>
// 											{property.attributes.area_sqft.toLocaleString()} sq ft
// 										</p>
// 									</div>
// 								</div>

// 								{property.attributes.lot_size_sqft && (
// 									<div className='flex items-center'>
// 										<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
// 											<MapPin className='w-6 h-6 text-blue-600' />
// 										</div>
// 										<div>
// 											<p className='text-xs text-gray-500'>Lot Size</p>
// 											<p className='font-medium text-gray-700'>
// 												{property.attributes.lot_size_sqft.toLocaleString()} sq
// 												ft
// 											</p>
// 										</div>
// 									</div>
// 								)}

// 								{property.attributes.floors && (
// 									<div className='flex items-center'>
// 										<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
// 											<Building2 className='w-6 h-6 text-blue-600' />
// 										</div>
// 										<div>
// 											<p className='text-xs text-gray-500'>Floors</p>
// 											<p className='font-medium text-gray-700'>
// 												{property.attributes.floors}
// 											</p>
// 										</div>
// 									</div>
// 								)}
// 							</>
// 						)}
// 					</div>
// 				)

// 			case 'apartment':
// 				return (
// 					<div className='grid grid-cols-2 gap-4 mb-6 border-b border-gray-100 pb-6'>
// 						{'attributes' in property && property.attributes && (
// 							<>
// 								<div className='flex items-center'>
// 									<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
// 										<Bed className='w-6 h-6 text-blue-600' />
// 									</div>
// 									<div>
// 										<p className='text-xs text-gray-500'>Bedrooms</p>
// 										<p className='font-medium text-gray-700'>
// 											{property.attributes.bedrooms}
// 										</p>
// 									</div>
// 								</div>

// 								<div className='flex items-center'>
// 									<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
// 										<Bath className='w-6 h-6 text-blue-600' />
// 									</div>
// 									<div>
// 										<p className='text-xs text-gray-500'>Bathrooms</p>
// 										<p className='font-medium text-gray-700'>
// 											{property.attributes.bathrooms}
// 										</p>
// 									</div>
// 								</div>

// 								<div className='flex items-center'>
// 									<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
// 										<Maximize className='w-6 h-6 text-blue-600' />
// 									</div>
// 									<div>
// 										<p className='text-xs text-gray-500'>Area</p>
// 										<p className='font-medium text-gray-700'>
// 											{property.attributes.area_sqft.toLocaleString()} sq ft
// 										</p>
// 									</div>
// 								</div>

// 								<div className='flex items-center'>
// 									<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
// 										<Building2 className='w-6 h-6 text-blue-600' />
// 									</div>
// 									<div>
// 										<p className='text-xs text-gray-500'>Floor</p>
// 										<p className='font-medium text-gray-700'>
// 											{property.attributes.floor} /{' '}
// 											{property.attributes.total_floors}
// 										</p>
// 									</div>
// 								</div>
// 							</>
// 						)}
// 					</div>
// 				)

// 			case 'commercial':
// 				return (
// 					<div className='grid grid-cols-2 gap-4 mb-6 border-b border-gray-100 pb-6'>
// 						{'attributes' in property && property.attributes && (
// 							<>
// 								<div className='flex items-center'>
// 									<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
// 										<Maximize className='w-6 h-6 text-blue-600' />
// 									</div>
// 									<div>
// 										<p className='text-xs text-gray-500'>Area</p>
// 										<p className='font-medium text-gray-700'>
// 											{property.attributes.area_sqft.toLocaleString()} sq ft
// 										</p>
// 									</div>
// 								</div>

// 								{property.attributes.business_type && (
// 									<div className='flex items-center'>
// 										<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
// 											<Landmark className='w-6 h-6 text-blue-600' />
// 										</div>
// 										<div>
// 											<p className='text-xs text-gray-500'>Business Type</p>
// 											<p className='font-medium text-gray-700'>
// 												{property.attributes.business_type}
// 											</p>
// 										</div>
// 									</div>
// 								)}

// 								{property.attributes.floors && (
// 									<div className='flex items-center'>
// 										<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
// 											<Building2 className='w-6 h-6 text-blue-600' />
// 										</div>
// 										<div>
// 											<p className='text-xs text-gray-500'>Floors</p>
// 											<p className='font-medium text-gray-700'>
// 												{property.attributes.floors}
// 											</p>
// 										</div>
// 									</div>
// 								)}

// 								{property.attributes.ceiling_height && (
// 									<div className='flex items-center'>
// 										<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
// 											<ArrowUp className='w-6 h-6 text-blue-600' />
// 										</div>
// 										<div>
// 											<p className='text-xs text-gray-500'>Ceiling Height</p>
// 											<p className='font-medium text-gray-700'>
// 												{property.attributes.ceiling_height.toLocaleString()} ft
// 											</p>
// 										</div>
// 									</div>
// 								)}
// 							</>
// 						)}
// 					</div>
// 				)

// 			case 'land':
// 				return (
// 					<div className='grid grid-cols-2 gap-4 mb-6 border-b border-gray-100 pb-6'>
// 						{'attributes' in property && property.attributes && (
// 							<div className='flex items-center'>
// 								<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
// 									<Maximize className='w-6 h-6 text-blue-600' />
// 								</div>
// 								<div>
// 									<p className='text-xs text-gray-500'>Area</p>
// 									<p className='font-medium text-gray-700'>
// 										{property.attributes.area_acres.toLocaleString()} acres
// 									</p>
// 								</div>
// 							</div>
// 						)}
// 					</div>
// 				)

// 			default:
// 				return null
// 		}
// 	}, [property])

// 	if (loading) {
// 		return (
// 			<div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50'>
// 				<div className='text-center'>
// 					<Loader2 className='w-12 h-12 animate-spin text-blue-600 mx-auto mb-4' />
// 					<p className='text-blue-800 font-medium'>
// 						Loading property details...
// 					</p>
// 				</div>
// 			</div>
// 		)
// 	}

// 	if (error || !property) {
// 		return (
// 			<div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-red-50 to-orange-50'>
// 				<div className='text-center max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg'>
// 					<div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
// 						<Info className='w-8 h-8 text-red-600' />
// 					</div>
// 					<p className='text-red-600 text-lg font-medium mb-4'>
// 						{error || 'Property not found'}
// 					</p>
// 					<Link
// 						href='/properties'
// 						className='mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
// 					>
// 						<ChevronLeft className='w-4 h-4 mr-2' />
// 						Back to properties
// 					</Link>
// 				</div>
// 			</div>
// 		)
// 	}

// 	const propertyTypeIcons: Record<string, any> = {
// 		house: Home,
// 		apartment: Building2,
// 		commercial: Landmark,
// 		land: Trees,
// 	}

// 	const PropertyIcon = propertyTypeIcons[property.property_type] || Home

// 	const statusColors: Record<string, string> = {
// 		active: 'bg-green-100 text-green-800',
// 		pending: 'bg-yellow-100 text-yellow-800',
// 		sold: 'bg-red-100 text-red-800',
// 		rented: 'bg-purple-100 text-purple-800',
// 		default: 'bg-blue-100 text-blue-800',
// 	}

// 	const getStatusColor = (status: PropertyStatus | string) => {
// 		return statusColors[status as string] || statusColors.default
// 	}

// 	// Rest of your component remains the same...
// 	return (
// 		<div className='min-h-screen bg-gray-50'>
// 			{/* Navigation */}
// 			<div className='bg-white shadow-sm z-10 print:hidden'>
// 				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
// 					<div className='flex justify-between items-center py-4'>
// 						<Link
// 							href='/properties'
// 							className='inline-flex items-center text-gray-700 hover:text-blue-600 transition-colors'
// 						>
// 							<ChevronLeft className='w-5 h-5 mr-1' />
// 							<span>Back to listings</span>
// 						</Link>
// 						<div className='flex items-center space-x-3'>
// 							<button
// 								onClick={() => setShowShareOptions(!showShareOptions)}
// 								className='p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors relative'
// 								aria-label='Share property'
// 							>
// 								<Share2 className='w-5 h-5' />

// 								{/* Share options dropdown */}
// 								{showShareOptions && (
// 									<div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20 border border-gray-100'>
// 										<div className='py-1'>
// 											<button
// 												onClick={copyLinkToClipboard}
// 												className='w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center'
// 											>
// 												<Copy className='w-4 h-4 mr-2' />
// 												Copy link
// 											</button>
// 										</div>
// 									</div>
// 								)}
// 							</button>
// 						</div>
// 					</div>
// 				</div>
// 			</div>

// 			{/* Main Content - Split Layout */}
// 			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
// 				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
// 					{/* Left Column (Images and Details) */}
// 					<div className='lg:col-span-2'>
// 						{/* Image Gallery */}
// 						<div className='bg-gray-900 rounded-lg overflow-hidden mb-6'>
// 							<div className='relative h-[50vh] md:h-[60vh]'>
// 								{property.images && property.images.length > 0 ? (
// 									<>
// 										{property.images[selectedImage].type === 'image' ? (
// 											<Image
// 												src={getImageUrl(property.images[selectedImage].url)}
// 												alt={property.title}
// 												fill
// 												className='object-cover'
// 												priority
// 											/>
// 										) : property.images[selectedImage].type === 'video' ? (
// 											<div className='w-full h-full bg-black flex items-center justify-center'>
// 												<video
// 													src={getImageUrl(property.images[selectedImage].url)}
// 													controls
// 													className='max-h-full max-w-full'
// 													poster={
// 														property.images[selectedImage].thumbnail_url
// 															? getImageUrl(
// 																	property.images[selectedImage].thumbnail_url
// 															  )
// 															: undefined
// 													}
// 												>
// 													Your browser does not support the video tag.
// 												</video>
// 											</div>
// 										) : (
// 											<div className='w-full h-full bg-gray-300 flex items-center justify-center'>
// 												<span className='text-gray-500'>
// 													Unsupported media type
// 												</span>
// 											</div>
// 										)}
// 										<div className='absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30'></div>

// 										{/* Navigation arrows */}
// 										<button
// 											onClick={prevImage}
// 											className='absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-lg transition-all'
// 											aria-label='Previous image'
// 										>
// 											<ChevronLeft className='w-6 h-6' />
// 										</button>
// 										<button
// 											onClick={nextImage}
// 											className='absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-lg transition-all'
// 											aria-label='Next image'
// 										>
// 											<ChevronRight className='w-6 h-6' />
// 										</button>

// 										{/* Image counter */}
// 										<div className='absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm'>
// 											{selectedImage + 1} / {property.images.length}
// 										</div>

// 										{/* View all button */}
// 										{property.images.length > 1 && (
// 											<button
// 												onClick={() => setShowFullGallery(true)}
// 												className='absolute bottom-4 left-4 bg-white text-gray-800 px-4 py-2 rounded-lg font-medium shadow-lg hover:bg-blue-50 transition-colors'
// 											>
// 												View all media
// 											</button>
// 										)}
// 									</>
// 								) : (
// 									<div className='w-full h-full bg-gray-300 flex items-center justify-center'>
// 										<span className='text-gray-500'>No images available</span>
// 									</div>
// 								)}
// 							</div>

// 							{property.images && property.images.length > 1 && (
// 								<div className='hidden md:flex overflow-x-auto py-4 px-4 gap-2 bg-white'>
// 									{property.images.map((media, index) => (
// 										<button
// 											key={media.id}
// 											onClick={() => setSelectedImage(index)}
// 											className={`relative w-24 h-16 flex-shrink-0 rounded-md overflow-hidden transition-all ${
// 												selectedImage === index
// 													? 'ring-2 ring-blue-500 scale-105'
// 													: 'opacity-70 hover:opacity-100'
// 											}`}
// 										>
// 											{media.type === 'image' ? (
// 												<Image
// 													src={getImageUrl(media.url)}
// 													alt={`${property.title} - ${index + 1}`}
// 													fill
// 													className='object-cover'
// 												/>
// 											) : media.type === 'video' ? (
// 												<div className='w-full h-full bg-gray-800 flex items-center justify-center'>
// 													<Play className='w-8 h-8 text-white' />
// 													{media.thumbnail_url && (
// 														<Image
// 															src={getImageUrl(media.thumbnail_url)}
// 															alt={`Video thumbnail ${index + 1}`}
// 															fill
// 															className='object-cover opacity-50'
// 														/>
// 													)}
// 												</div>
// 											) : (
// 												<div className='w-full h-full bg-gray-300 flex items-center justify-center'>
// 													<span className='text-xs text-gray-500'>File</span>
// 												</div>
// 											)}
// 										</button>
// 									))}
// 								</div>
// 							)}
// 						</div>

// 						{/* Title and Address Bar (Mobile Only) */}
// 						<div className='block lg:hidden mb-6'>
// 							<div className='bg-white rounded-xl shadow-sm p-4 border border-gray-100'>
// 								<div className='flex items-center gap-2 mb-2'>
// 									<span
// 										className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
// 											property.status
// 										)}`}
// 									>
// 										{String(property.status).charAt(0).toUpperCase() +
// 											String(property.status).slice(1)}
// 									</span>
// 									<span className='px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium capitalize'>
// 										{property.listing_type.replace('_', ' ')}
// 									</span>
// 								</div>
// 								<h1 className='text-2xl font-bold text-gray-900 mb-2'>
// 									{property.title}
// 								</h1>
// 								<div className='flex items-center text-gray-600'>
// 									<MapPin className='w-5 h-5 mr-2 flex-shrink-0 text-blue-600' />
// 									<span>
// 										{property.address}, {property.city?.name},{' '}
// 										{property.state?.name}
// 									</span>
// 								</div>

// 								<div className='mt-4'>
// 									<CurrencyDisplay
// 										amount={property.price}
// 										originalCurrency={property.currency || 'USD'}
// 										listingType={property.listing_type}
// 									/>
// 								</div>
// 							</div>
// 						</div>

// 						{/* Property Description */}
// 						<div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6 mt-6'>
// 							<h2 className='text-xl font-semibold mb-4 text-gray-900'>
// 								Overview
// 							</h2>
// 							<div>
// 								{property.description ? (
// 									<p className='text-sm text-gray-700 text-muted-foreground'>
// 										{property.description}
// 									</p>
// 								) : (
// 									<div className='flex items-center gap-2 text-sm text-muted-foreground italic'>
// 										<FileText className='w-4 h-4 text-gray-600' />
// 										<span className='text-gray-600'>No description available</span>
// 									</div>
// 								)}
// 							</div>
// 						</div>

// 						{/* Features Section */}
// 						{property.features && property.features.length > 0 && (
// 							<div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6'>
// 								<h2 className='text-xl font-semibold mb-4 text-gray-900'>
// 									Features & Amenities
// 								</h2>
// 								<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
// 									{property.features.map(feature => (
// 										<div
// 											key={feature.id}
// 											className='flex items-center bg-gray-50 p-4 rounded-lg'
// 										>
// 											<div className='w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0'>
// 												<Check className='w-5 h-5 text-green-600' />
// 											</div>
// 											<span className='text-gray-700'>{feature.name}</span>
// 										</div>
// 									))}
// 								</div>
// 							</div>
// 						)}
// 					</div>

// 					{/* Right Column (Price and Contact) */}
// 					<div className='lg:col-span-1'>
// 						{/* Title and Address (Desktop Only) */}
// 						<div className='hidden lg:block mb-6'>
// 							<div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
// 								<div className='flex items-center gap-2 mb-2'>
// 									<span
// 										className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
// 											property.status
// 										)}`}
// 									>
// 										{String(property.status).charAt(0).toUpperCase() +
// 											String(property.status).slice(1)}
// 									</span>
// 									<span className='px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium capitalize'>
// 										{property.listing_type.replace('_', ' ')}
// 									</span>
// 								</div>
// 								<h1 className='text-2xl font-bold text-gray-900 mb-2'>
// 									{property.title}
// 								</h1>
// 								<div className='flex items-center text-gray-600'>
// 									<MapPin className='w-5 h-5 mr-2 flex-shrink-0 text-blue-600' />
// 									<span>
// 										{property.address}, {property.city?.name},{' '}
// 										{property.state?.name}
// 									</span>
// 								</div>
// 							</div>
// 						</div>

// 						{/* Price Card with Currency Conversion */}
// 						<div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6'>
// 							<CurrencyDisplay
// 								amount={property.price}
// 								originalCurrency={property.currency || 'USD'}
// 								listingType={property.listing_type}
// 							/>

// 							{/* Property Tags */}
// 							<div className='flex flex-wrap items-center gap-2 mt-6 mb-6'>
// 								<div className='flex items-center px-3 py-2 bg-gray-100 rounded-lg'>
// 									<PropertyIcon className='w-5 h-5 text-gray-700 mr-2' />
// 									<span className='font-medium text-gray-700 capitalize'>
// 										{property.property_type.replace('_', ' ')}
// 									</span>
// 								</div>

// 								<div className='flex items-center px-3 py-2 bg-gray-100 rounded-lg'>
// 									<Tag className='w-5 h-5 text-gray-700 mr-2' />
// 									<span className='font-medium text-gray-700'>
// 										ID: {property.custom_id}
// 									</span>
// 								</div>
// 							</div>

// 							{getPropertyAttributes()}

// 							{/* Contact Buttons */}
// 							<div className='space-y-3 mb-6'>
// 								<button className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center'>
// 									<Mail className='w-5 h-5 mr-2' />
// 									Contact Agent
// 								</button>
// 							</div>

// 							{/* Property Stats */}
// 							<div className='pt-4 mt-4 border-t border-gray-100'>
// 								<div className='flex justify-between items-center py-2'>
// 									<span className='text-gray-600 flex items-center'>
// 										<Eye className='w-4 h-4 mr-2' /> Views
// 									</span>
// 									<span className='font-medium text-gray-700'>
// 										{property.views}
// 									</span>
// 								</div>
// 								<div className='flex justify-between items-center py-2'>
// 									<span className='text-gray-600 flex items-center'>
// 										<Calendar className='w-4 h-4 mr-2' /> Listed
// 									</span>
// 									<span className='font-medium text-gray-700'>
// 										{new Date(property.created_at).toLocaleDateString(
// 											'en-US',
// 											{
// 												year: 'numeric',
// 												month: 'short',
// 												day: 'numeric',
// 											}
// 										)}
// 									</span>
// 								</div>
// 							</div>
// 						</div>

// 						{/* Map Preview */}
// 						<div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100 hidden md:block'>
// 							<h3 className='text-lg font-semibold mb-4 text-gray-900 flex items-center'>
// 								<MapPin className='w-5 h-5 mr-2 text-blue-600' />
// 								Location
// 							</h3>
// 							<div className='bg-gray-200 h-48 rounded-lg flex items-center justify-center text-gray-500 mb-4'>
// 								<div className='text-center'>
// 									<MapPin className='w-12 h-12 mx-auto mb-2 text-gray-400' />
// 									<p className='text-sm'>Interactive map would be displayed here</p>
// 									<p className='text-xs text-gray-400'>Google Maps, Mapbox, etc.</p>
// 								</div>
// 							</div>
// 							<div className='space-y-2'>
// 								<p className='text-gray-900 font-medium'>{property.address}</p>
// 								<p className='text-gray-600'>
// 									{property.city?.name}, {property.state?.name}
// 								</p>
// 								{property.postal_code && (
// 									<p className='text-gray-500 text-sm'>{property.postal_code}</p>
// 								)}
// 							</div>
							
// 							<button className='w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center'>
// 								<Globe className='w-4 h-4 mr-2' />
// 								View on Map
// 							</button>
// 						</div>
// 					</div>
// 				</div>
// 			</div>

// 			{/* Full Gallery Modal */}
// 			{showFullGallery && property.images && (
// 				<div className='fixed inset-0 bg-black z-50 overflow-y-auto'>
// 					<div className='flex items-center justify-between p-4 bg-black bg-opacity-75 sticky top-0 z-10'>
// 						<h3 className='text-xl font-medium text-white'>
// 							All Media ({property.images.length})
// 						</h3>
// 						<button
// 							onClick={() => setShowFullGallery(false)}
// 							className='text-white hover:text-gray-300 p-2'
// 							aria-label='Close gallery'
// 						>
// 							<X className='w-6 h-6' />
// 						</button>
// 					</div>

// 					<div className='max-w-5xl mx-auto p-4 space-y-4'>
// 						{property.images.map((media, index) => (
// 							<div
// 								key={media.id}
// 								className='bg-gray-900 rounded-lg overflow-hidden'
// 							>
// 								<div className='relative h-[70vh]'>
// 									{media.type === 'image' ? (
// 										<Image
// 											src={getImageUrl(media.url)}
// 											alt={`${property.title} - ${index + 1}`}
// 											fill
// 											className='object-contain'
// 											priority={index === 0}
// 										/>
// 									) : media.type === 'video' ? (
// 										<div className='w-full h-full flex items-center justify-center'>
// 											<video
// 												src={getImageUrl(media.url)}
// 												controls
// 												className='max-h-full max-w-full'
// 												poster={media.thumbnail_url ? getImageUrl(media.thumbnail_url) : undefined}
// 											>
// 												Your browser does not support the video tag.
// 											</video>
// 										</div>
// 									) : (
// 										<div className='w-full h-full bg-gray-300 flex items-center justify-center'>
// 											<span className='text-gray-500'>
// 												Unsupported media type
// 											</span>
// 										</div>
// 									)}
// 								</div>
// 								{media.caption && (
// 									<div className='p-3 bg-black bg-opacity-75 text-white'>
// 										<p>{media.caption}</p>
// 									</div>
// 								)}
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	)
// }


// src/app/[locale]/properties/[id]/PropertyDetailClient.tsx
'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Property, PropertyStatus } from '@/types/property'
import { getPropertyByCustomId } from '@/services/propertyService'
import { useCurrencyConversion } from '@/hooks/useCurrencyConversion'
import {
	MapPin,
	Bed,
	Bath,
	Maximize,
	Calendar,
	Home,
	Building2,
	Landmark,
	Trees,
	Check,
	X,
	Share2,
	Heart,
	Loader2,
	Mail,
	ChevronLeft,
	ChevronRight,
	Tag,
	Eye,
	Info,
	Copy,
	Printer,
	FileText,
	Play,
	ArrowUp,
	RefreshCw,
	Globe,
	TrendingUp,
	Navigation,
	MapIcon,
	Maximize2,
} from 'lucide-react'

import Link from 'next/link'

interface PropertyDetailClientProps {
	property: any
}

const YandexMap = ({
	latitude,
	longitude,
	address,
	title,
	isPopup = false,
	onClose,
}: {
	latitude: number
	longitude: number
	address: string
	title: string
	isPopup?: boolean
	onClose?: () => void
}) => {
	const [mapLoaded, setMapLoaded] = useState(false)
	const [mapError, setMapError] = useState(false)
	const [mapInstance, setMapInstance] = useState<any>(null)

	const mapId = isPopup ? 'yandex-map-popup' : 'yandex-map'
	const mapHeight = isPopup ? 'h-[500px]' : 'h-64'

	useEffect(() => {
		const loadYandexMaps = () => {
			if (window.ymaps) {
				initMap()
				return
			}

			const script = document.createElement('script')
			script.src = `https://api-maps.yandex.ru/2.1/?apikey=${
				process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY || ''
			}&lang=en_US`
			script.onload = () => {
				window.ymaps.ready(initMap)
			}
			script.onerror = () => {
				console.error('Failed to load Yandex Maps API')
				setMapError(true)
			}
			document.head.appendChild(script)
		}

		const initMap = () => {
			try {
				// Clean up existing map if it exists
				if (mapInstance) {
					mapInstance.destroy()
				}

				const mapElement = document.getElementById(mapId)
				if (!mapElement) {
					console.error(`Map container ${mapId} not found`)
					return
				}

				const zoom = isPopup ? 17 : 16
				const controls = isPopup 
					? ['zoomControl', 'fullscreenControl', 'typeSelector', 'geolocationControl', 'routeButtonControl']
					: ['zoomControl', 'fullscreenControl', 'typeSelector']

				const map = new window.ymaps.Map(mapId, {
					center: [latitude, longitude],
					zoom: zoom,
					controls: controls,
				}, {
					searchControlProvider: 'yandex#search',
					suppressMapOpenBlock: true,
					yandexMapDisablePoiInteractivity: false,
				})

				// Add placemark with custom balloon
				const placemark = new window.ymaps.Placemark(
					[latitude, longitude],
					{
						balloonContent: `
							<div style="padding: 12px; max-width: 300px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
								<h3 style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600; color: #1f2937;">${title}</h3>
								<p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px; line-height: 1.4;">${address}</p>
								<div style="display: flex; gap: 8px; flex-wrap: wrap;">
									<a href="https://yandex.com/maps/?pt=${longitude},${latitude}&z=16&l=map" 
									   target="_blank" 
									   rel="noopener noreferrer"
									   style="display: inline-flex; align-items: center; gap: 4px; color: #2563eb; text-decoration: none; font-size: 13px; font-weight: 500; padding: 4px 8px; background: #eff6ff; border-radius: 4px; transition: background-color 0.2s;">
										🗺️ Open in Yandex Maps
									</a>
									<a href="https://maps.google.com/?q=${latitude},${longitude}" 
									   target="_blank" 
									   rel="noopener noreferrer"
									   style="display: inline-flex; align-items: center; gap: 4px; color: #059669; text-decoration: none; font-size: 13px; font-weight: 500; padding: 4px 8px; background: #ecfdf5; border-radius: 4px; transition: background-color 0.2s;">
										🌍 Open in Google Maps
									</a>
								</div>
							</div>
						`,
						hintContent: title,
						iconCaption: title,
					},
					{
						preset: 'islands#redDotIconWithCaption',
						iconColor: '#dc2626',
						iconCaptionMaxWidth: 200,
						balloonCloseButton: true,
						balloonMaxWidth: 350,
						balloonOffset: [3, -40],
						balloonShadow: true,
						hideIconOnBalloonOpen: false,
						openBalloonOnClick: true,
					}
				)

				map.geoObjects.add(placemark)

				// Auto-open balloon in popup mode
				if (isPopup) {
					setTimeout(() => {
						placemark.balloon.open()
					}, 500)
				}

				// Add traffic layer control if in popup mode
				if (isPopup) {
					const trafficControl = new window.ymaps.control.TrafficControl({
						providerKey: 'traffic#actual',
						trafficShown: false
					})
					map.controls.add(trafficControl)
				}

				setMapInstance(map)
				setMapLoaded(true)
			} catch (error) {
				console.error('Error initializing Yandex Map:', error)
				setMapError(true)
			}
		}

		loadYandexMaps()

		// Cleanup function
		return () => {
			if (mapInstance) {
				try {
					mapInstance.destroy()
				} catch (error) {
					console.error('Error destroying map:', error)
				}
			}
		}
	}, [latitude, longitude, address, title, isPopup, mapId])

	const handleGetDirections = () => {
		const yandexUrl = `https://yandex.com/maps/?rtext=~${latitude},${longitude}&rtt=auto`
		window.open(yandexUrl, '_blank', 'noopener,noreferrer')
	}

	const handleViewLarger = () => {
		const yandexUrl = `https://yandex.com/maps/?pt=${longitude},${latitude}&z=16&l=map`
		window.open(yandexUrl, '_blank', 'noopener,noreferrer')
	}

	if (mapError) {
		return (
			<div className={`w-full ${mapHeight} bg-gray-100 rounded-xl flex items-center justify-center`}>
				<div className='text-center p-6'>
					<MapIcon className='w-12 h-12 text-gray-400 mx-auto mb-3' />
					<p className='text-gray-500 text-sm mb-3'>Map could not be loaded</p>
					<div className='flex flex-col sm:flex-row gap-2 justify-center'>
						<a
							href={`https://yandex.com/maps/?pt=${longitude},${latitude}&z=16&l=map`}
							target='_blank'
							rel='noopener noreferrer'
							className='inline-flex items-center px-3 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors'
						>
							<Globe className='w-3 h-3 mr-1' />
							Yandex Maps
						</a>
						<a
							href={`https://maps.google.com/?q=${latitude},${longitude}`}
							target='_blank'
							rel='noopener noreferrer'
							className='inline-flex items-center px-3 py-2 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors'
						>
							<Globe className='w-3 h-3 mr-1' />
							Google Maps
						</a>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='relative'>
			<div
				id={mapId}
				className={`w-full ${mapHeight} rounded-xl overflow-hidden ${!mapLoaded ? 'hidden' : 'block'}`}
			/>
			
			{!mapLoaded && (
				<div className={`w-full ${mapHeight} bg-gray-100 rounded-xl flex items-center justify-center`}>
					<div className='text-center'>
						<Loader2 className='w-8 h-8 text-blue-600 animate-spin mx-auto mb-2' />
						<p className='text-gray-500 text-sm'>Loading map...</p>
					</div>
				</div>
			)}

			{/* Map controls overlay */}
			{mapLoaded && !isPopup && (
				<div className='absolute bottom-3 right-3 flex gap-2'>
					<button
						onClick={handleGetDirections}
						className='bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg hover:bg-white transition-colors text-xs font-medium border border-gray-200'
						title='Get directions'
					>
						<Navigation className='w-4 h-4 mr-1 inline' />
						Directions
					</button>
					<button
						onClick={handleViewLarger}
						className='bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg hover:bg-white transition-colors text-xs font-medium border border-gray-200'
						title='View larger map'
					>
						<Maximize2 className='w-4 h-4 mr-1 inline' />
						Expand
					</button>
				</div>
			)}

			{/* Popup close button */}
			{isPopup && onClose && (
				<button
					onClick={onClose}
					className='absolute top-3 right-3 z-10 bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors border border-gray-200'
					title='Close map'
				>
					<X className='w-4 h-4 text-gray-600' />
				</button>
			)}

			{/* Enhanced controls for popup mode */}
			{isPopup && mapLoaded && (
				<div className='absolute bottom-3 left-3 right-3 flex justify-between items-end'>
					<div className='bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-gray-200'>
						<p className='text-xs font-medium text-gray-800 mb-1'>{title}</p>
						<p className='text-xs text-gray-600'>{address}</p>
					</div>
					<div className='flex gap-2'>
						<button
							onClick={handleGetDirections}
							className='bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-xs font-medium'
						>
							<Navigation className='w-4 h-4 mr-1 inline' />
							Directions
						</button>
						<button
							onClick={handleViewLarger}
							className='bg-green-600 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-green-700 transition-colors text-xs font-medium'
						>
							<Globe className='w-4 h-4 mr-1 inline' />
							Yandex Maps
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

const API_BASE_URL = 'http://localhost:3000'

function CurrencyDisplay({
	amount,
	originalCurrency,
	listingType,
}: {
	amount: number
	originalCurrency: string
	listingType: string
}) {
	const conversionOptions = useMemo(() => ({
		autoFetch: true,
		refreshInterval: 30 * 60 * 1000,
		targetCurrencies: ['RUB', 'AMD'],
	}), [])

	const { original, conversions, loading, error, refresh, isStale } =
		useCurrencyConversion(amount, originalCurrency, conversionOptions)

	const formatPriceWithSuffix = useCallback((formattedAmount: string, currency: string) => {
		switch (listingType) {
			case 'rent':
				return currency === 'USD'
					? `${formattedAmount}/month`
					: currency === 'RUB'
					? `${formattedAmount}/месяц`
					: `${formattedAmount}/ամիս`
			case 'daily_rent':
				return currency === 'USD'
					? `${formattedAmount}/day`
					: currency === 'RUB'
					? `${formattedAmount}/день`
					: `${formattedAmount}/օր`
			default:
				return formattedAmount
		}
	}, [listingType])

	const getCurrencyFlag = useCallback((currency: string) => {
		const flags: Record<string, string> = {
			USD: '🇺🇸',
			RUB: '🇷🇺',
			AMD: '🇦🇲',
		}
		return flags[currency] || '💰'
	}, [])

	if (loading && !original.formattedAmount) {
		return (
			<div className='flex items-center space-x-2'>
				<Loader2 className='w-5 h-5 animate-spin text-blue-600' />
				<span className='text-gray-500'>Loading exchange rates...</span>
			</div>
		)
	}

	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-between'>
				<div className='text-3xl font-bold text-blue-600 flex items-center'>
					{formatPriceWithSuffix(original.formattedAmount, original.currency)}
				</div>
				<button
					onClick={refresh}
					disabled={loading}
					className={`p-2 rounded-full transition-colors ${
						isStale
							? 'bg-orange-100 text-orange-600 hover:bg-orange-200'
							: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
					}`}
					title={
						isStale
							? 'Exchange rates may be outdated - click to refresh'
							: 'Refresh exchange rates'
					}
				>
					<RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
				</button>
			</div>

			{conversions.length > 0 && (
				<div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100'>
					<div className='flex items-center justify-between mb-3'>
						{error && (
							<span className='text-xs text-red-500 flex items-center'>
								<X className='w-3 h-3 mr-1' />
								Failed to load rates
							</span>
						)}
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
						{conversions.map(conversion => (
							<div
								key={conversion.currency}
								className='bg-white rounded-lg p-3 border border-gray-200 hover:border-blue-300 transition-colors'
							>
								<div className='flex items-center justify-between'>
									<div className='flex items-center'>
										<span className='text-lg mr-2'>
											{getCurrencyFlag(conversion.currency)}
										</span>
										<div>
											<div className='font-semibold text-gray-900'>
												{formatPriceWithSuffix(
													conversion.formattedAmount,
													conversion.currency
												)}
											</div>
											{conversion.rate && (
												<div className='text-xs text-gray-500'>
													1 {original.currency} = {conversion.rate.toFixed(2)}{' '}
													{conversion.currency}
												</div>
											)}
										</div>
									</div>
									{listingType === 'sale' && (
										<TrendingUp className='w-4 h-4 text-green-500' />
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default function PropertyDetailClient({}: PropertyDetailClientProps) {
	const params = useParams()
	const [property, setProperty] = useState<Property | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [selectedImage, setSelectedImage] = useState(0)
	const [showFullGallery, setShowFullGallery] = useState(false)
	const [showMapPopup, setShowMapPopup] = useState(false)
	const [saved, setSaved] = useState(false)
	const [showShareOptions, setShowShareOptions] = useState(false)

	const getImageUrl = useCallback((path: string) => {
		if (path?.startsWith('http')) return path
		return `${API_BASE_URL}${path}`
	}, [])

	useEffect(() => {
		const fetchProperty = async () => {
			if (!params.id) return

			try {
				setLoading(true)
				const data = await getPropertyByCustomId(params.id as string)
				setProperty(data)
			} catch (err) {
				setError('Failed to load property details')
				console.error('Error fetching property:', err)
			} finally {
				setLoading(false)
			}
		}

		fetchProperty()
	}, [params.id])

	const nextImage = useCallback(() => {
		if (!property?.images) return
		setSelectedImage(prev => (prev + 1) % (property.images?.length ?? 1))
	}, [property?.images])

	const prevImage = useCallback(() => {
		if (!property?.images) return
		setSelectedImage(
			prev =>
				(prev - 1 + (property.images?.length ?? 0)) %
				(property.images?.length ?? 1)
		)
	}, [property?.images])

	const toggleSaved = useCallback(() => {
		setSaved(prev => !prev)
	}, [])

	const copyLinkToClipboard = useCallback(() => {
		navigator.clipboard.writeText(window.location.href)
		alert('Link copied to clipboard!')
		setShowShareOptions(false)
	}, [])

	const printPage = useCallback(() => {
		window.print()
		setShowShareOptions(false)
	}, [])

	const getPropertyAttributes = useCallback(() => {
		if (!property) return null

		switch (property.property_type) {
			case 'house':
				return (
					<div className='grid grid-cols-2 gap-4 mb-6 border-b border-gray-100 pb-6'>
						{'attributes' in property && property.attributes && (
							<>
								<div className='flex items-center'>
									<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
										<Bed className='w-6 h-6 text-blue-600' />
									</div>
									<div>
										<p className='text-xs text-gray-500'>Bedrooms</p>
										<p className='font-medium text-gray-700'>
											{property.attributes.bedrooms}
										</p>
									</div>
								</div>

								<div className='flex items-center'>
									<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
										<Bath className='w-6 h-6 text-blue-600' />
									</div>
									<div>
										<p className='text-xs text-gray-500'>Bathrooms</p>
										<p className='font-medium text-gray-700'>
											{property.attributes.bathrooms}
										</p>
									</div>
								</div>

								<div className='flex items-center'>
									<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
										<Maximize className='w-6 h-6 text-blue-600' />
									</div>
									<div>
										<p className='text-xs text-gray-500'>Area</p>
										<p className='font-medium text-gray-700'>
											{property.attributes.area_sqft.toLocaleString()} sq ft
										</p>
									</div>
								</div>

								{property.attributes.lot_size_sqft && (
									<div className='flex items-center'>
										<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
											<MapPin className='w-6 h-6 text-blue-600' />
										</div>
										<div>
											<p className='text-xs text-gray-500'>Lot Size</p>
											<p className='font-medium text-gray-700'>
												{property.attributes.lot_size_sqft.toLocaleString()} sq
												ft
											</p>
										</div>
									</div>
								)}

								{property.attributes.floors && (
									<div className='flex items-center'>
										<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
											<Building2 className='w-6 h-6 text-blue-600' />
										</div>
										<div>
											<p className='text-xs text-gray-500'>Floors</p>
											<p className='font-medium text-gray-700'>
												{property.attributes.floors}
											</p>
										</div>
									</div>
								)}
							</>
						)}
					</div>
				)

			case 'apartment':
				return (
					<div className='grid grid-cols-2 gap-4 mb-6 border-b border-gray-100 pb-6'>
						{'attributes' in property && property.attributes && (
							<>
								<div className='flex items-center'>
									<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
										<Bed className='w-6 h-6 text-blue-600' />
									</div>
									<div>
										<p className='text-xs text-gray-500'>Bedrooms</p>
										<p className='font-medium text-gray-700'>
											{property.attributes.bedrooms}
										</p>
									</div>
								</div>

								<div className='flex items-center'>
									<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
										<Bath className='w-6 h-6 text-blue-600' />
									</div>
									<div>
										<p className='text-xs text-gray-500'>Bathrooms</p>
										<p className='font-medium text-gray-700'>
											{property.attributes.bathrooms}
										</p>
									</div>
								</div>

								<div className='flex items-center'>
									<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
										<Maximize className='w-6 h-6 text-blue-600' />
									</div>
									<div>
										<p className='text-xs text-gray-500'>Area</p>
										<p className='font-medium text-gray-700'>
											{property.attributes.area_sqft.toLocaleString()} sq ft
										</p>
									</div>
								</div>

								<div className='flex items-center'>
									<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
										<Building2 className='w-6 h-6 text-blue-600' />
									</div>
									<div>
										<p className='text-xs text-gray-500'>Floor</p>
										<p className='font-medium text-gray-700'>
											{property.attributes.floor} /{' '}
											{property.attributes.total_floors}
										</p>
									</div>
								</div>
							</>
						)}
					</div>
				)

			case 'commercial':
				return (
					<div className='grid grid-cols-2 gap-4 mb-6 border-b border-gray-100 pb-6'>
						{'attributes' in property && property.attributes && (
							<>
								<div className='flex items-center'>
									<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
										<Maximize className='w-6 h-6 text-blue-600' />
									</div>
									<div>
										<p className='text-xs text-gray-500'>Area</p>
										<p className='font-medium text-gray-700'>
											{property.attributes.area_sqft.toLocaleString()} sq ft
										</p>
									</div>
								</div>

								{property.attributes.business_type && (
									<div className='flex items-center'>
										<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
											<Landmark className='w-6 h-6 text-blue-600' />
										</div>
										<div>
											<p className='text-xs text-gray-500'>Business Type</p>
											<p className='font-medium text-gray-700'>
												{property.attributes.business_type}
											</p>
										</div>
									</div>
								)}

								{property.attributes.floors && (
									<div className='flex items-center'>
										<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
											<Building2 className='w-6 h-6 text-blue-600' />
										</div>
										<div>
											<p className='text-xs text-gray-500'>Floors</p>
											<p className='font-medium text-gray-700'>
												{property.attributes.floors}
											</p>
										</div>
									</div>
								)}

								{property.attributes.ceiling_height && (
									<div className='flex items-center'>
										<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
											<ArrowUp className='w-6 h-6 text-blue-600' />
										</div>
										<div>
											<p className='text-xs text-gray-500'>Ceiling Height</p>
											<p className='font-medium text-gray-700'>
												{property.attributes.ceiling_height.toLocaleString()} ft
											</p>
										</div>
									</div>
								)}
							</>
						)}
					</div>
				)

			case 'land':
				return (
					<div className='grid grid-cols-2 gap-4 mb-6 border-b border-gray-100 pb-6'>
						{'attributes' in property && property.attributes && (
							<div className='flex items-center'>
								<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2'>
									<Maximize className='w-6 h-6 text-blue-600' />
								</div>
								<div>
									<p className='text-xs text-gray-500'>Area</p>
									<p className='font-medium text-gray-700'>
										{property.attributes.area_acres.toLocaleString()} acres
									</p>
								</div>
							</div>
						)}
					</div>
				)

			default:
				return null
		}
	}, [property])

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50'>
				<div className='text-center'>
					<Loader2 className='w-12 h-12 animate-spin text-blue-600 mx-auto mb-4' />
					<p className='text-blue-800 font-medium'>
						Loading property details...
					</p>
				</div>
			</div>
		)
	}

	if (error || !property) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-red-50 to-orange-50'>
				<div className='text-center max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg'>
					<div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
						<Info className='w-8 h-8 text-red-600' />
					</div>
					<p className='text-red-600 text-lg font-medium mb-4'>
						{error || 'Property not found'}
					</p>
					<Link
						href='/properties'
						className='mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
					>
						<ChevronLeft className='w-4 h-4 mr-2' />
						Back to properties
					</Link>
				</div>
			</div>
		)
	}

	const propertyTypeIcons: Record<string, any> = {
		house: Home,
		apartment: Building2,
		commercial: Landmark,
		land: Trees,
	}

	const PropertyIcon = propertyTypeIcons[property.property_type] || Home

	const statusColors: Record<string, string> = {
		active: 'bg-green-100 text-green-800',
		pending: 'bg-yellow-100 text-yellow-800',
		sold: 'bg-red-100 text-red-800',
		rented: 'bg-purple-100 text-purple-800',
		default: 'bg-blue-100 text-blue-800',
	}

	const getStatusColor = (status: PropertyStatus | string) => {
		return statusColors[status as string] || statusColors.default
	}

	// Check if property has valid coordinates for map
	const hasValidCoordinates = property.latitude && property.longitude && 
		property.latitude !== 0 && property.longitude !== 0

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Navigation */}
			<div className='bg-white shadow-sm z-10 print:hidden'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between items-center py-4'>
						<Link
							href='/properties'
							className='inline-flex items-center text-gray-700 hover:text-blue-600 transition-colors'
						>
							<ChevronLeft className='w-5 h-5 mr-1' />
							<span>Back to listings</span>
						</Link>
						<div className='flex items-center space-x-3'>
							<button
								onClick={() => setShowShareOptions(!showShareOptions)}
								className='p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors relative'
								aria-label='Share property'
							>
								<Share2 className='w-5 h-5' />

								{showShareOptions && (
									<div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20 border border-gray-100'>
										<div className='py-1'>
											<button
												onClick={copyLinkToClipboard}
												className='w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center'
											>
												<Copy className='w-4 h-4 mr-2' />
												Copy link
											</button>
											<button
												onClick={printPage}
												className='w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center'
											>
												<Printer className='w-4 h-4 mr-2' />
												Print
											</button>
										</div>
									</div>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Map Popup Modal */}
			{showMapPopup && hasValidCoordinates && (
				<div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
					<div className='bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden'>
						<div className='p-4 border-b border-gray-200 flex items-center justify-between'>
							<div>
								<h3 className='text-lg font-semibold text-gray-900'>Property Location</h3>
								<p className='text-sm text-gray-600'>{property.address}</p>
							</div>
							<button
								onClick={() => setShowMapPopup(false)}
								className='p-2 hover:bg-gray-100 rounded-full transition-colors'
							>
								<X className='w-5 h-5 text-gray-500' />
							</button>
						</div>
						<div className='h-[500px]'>
							<YandexMap
								latitude={property.latitude!}
								longitude={property.longitude!}
								address={`${property.address}, ${property.city?.name}, ${property.state?.name}`}
								title={property.title}
								isPopup={true}
								onClose={() => setShowMapPopup(false)}
							/>
						</div>
					</div>
				</div>
			)}

			{/* Main Content */}
			<div className='max-w-7xl mx-auto py-8 sm:px-6 lg:px-8'>
				<div className='px-4 sm:px-0'>
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
						{/* Left Column (Images and Details) */}
						<div className='lg:col-span-2'>
							{/* Image Gallery */}
							<div className='bg-gray-900 rounded-lg overflow-hidden mb-6'>
								<div className='relative h-[50vh] md:h-[60vh]'>
									{property.images && property.images.length > 0 ? (
										<>
											{property.images[selectedImage].type === 'image' ? (
												<Image
													src={getImageUrl(property.images[selectedImage].url)}
													alt={property.title}
													fill
													className='object-cover'
													priority
												/>
											) : property.images[selectedImage].type === 'video' ? (
												<div className='w-full h-full bg-black flex items-center justify-center'>
													<video
														src={getImageUrl(property.images[selectedImage].url)}
														controls
														className='max-h-full max-w-full'
														poster={
															property.images[selectedImage].thumbnail_url
																? getImageUrl(
																		property.images[selectedImage].thumbnail_url
																  )
																: undefined
														}
													>
														Your browser does not support the video tag.
													</video>
												</div>
											) : (
												<div className='w-full h-full bg-gray-300 flex items-center justify-center'>
													<span className='text-gray-500'>
														Unsupported media type
													</span>
												</div>
											)}
											<div className='absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30'></div>

											{/* Navigation arrows */}
											<button
												onClick={prevImage}
												className='absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-lg transition-all'
												aria-label='Previous image'
											>
												<ChevronLeft className='w-6 h-6' />
											</button>
											<button
												onClick={nextImage}
												className='absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-lg transition-all'
												aria-label='Next image'
											>
												<ChevronRight className='w-6 h-6' />
											</button>

											{/* Image counter */}
											<div className='absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm'>
												{selectedImage + 1} / {property.images.length}
											</div>

											{/* View all button */}
											{property.images.length > 1 && (
												<button
													onClick={() => setShowFullGallery(true)}
													className='absolute bottom-4 left-4 bg-white text-gray-800 px-4 py-2 rounded-lg font-medium shadow-lg hover:bg-blue-50 transition-colors'
												>
													View all media
												</button>
											)}
										</>
									) : (
										<div className='w-full h-full bg-gray-300 flex items-center justify-center'>
											<span className='text-gray-500'>No images available</span>
										</div>
									)}
								</div>

								{property.images && property.images.length > 1 && (
									<div className='hidden md:flex overflow-x-auto py-4 px-4 gap-2 bg-white'>
										{property.images.map((media, index) => (
											<button
												key={media.id}
												onClick={() => setSelectedImage(index)}
												className={`relative w-24 h-16 flex-shrink-0 rounded-md overflow-hidden transition-all ${
													selectedImage === index
														? 'ring-2 ring-blue-500 scale-105'
														: 'opacity-70 hover:opacity-100'
												}`}
											>
												{media.type === 'image' ? (
													<Image
														src={getImageUrl(media.url)}
														alt={`${property.title} - ${index + 1}`}
														fill
														className='object-cover'
													/>
												) : media.type === 'video' ? (
													<div className='w-full h-full bg-gray-800 flex items-center justify-center'>
														<Play className='w-8 h-8 text-white' />
														{media.thumbnail_url && (
															<Image
																src={getImageUrl(media.thumbnail_url)}
																alt={`Video thumbnail ${index + 1}`}
																fill
																className='object-cover opacity-50'
															/>
														)}
													</div>
												) : (
													<div className='w-full h-full bg-gray-300 flex items-center justify-center'>
														<span className='text-xs text-gray-500'>File</span>
													</div>
												)}
											</button>
										))}
									</div>
								)}
							</div>

							{/* Title and Address Bar (Mobile Only) */}
							<div className='block lg:hidden mb-6'>
								<div className='bg-white rounded-xl shadow-sm p-4 border border-gray-100'>
									<div className='flex items-center gap-2 mb-2'>
										<span
											className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
												property.status
											)}`}
										>
											{String(property.status).charAt(0).toUpperCase() +
												String(property.status).slice(1)}
										</span>
										<span className='px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium capitalize'>
											{property.listing_type.replace('_', ' ')}
										</span>
									</div>
									<h1 className='text-2xl font-bold text-gray-900 mb-2'>
										{property.title}
									</h1>
									<div className='flex items-center text-gray-600'>
										<MapPin className='w-5 h-5 mr-2 flex-shrink-0 text-blue-600' />
										<span>
											{property.city?.name},{' '}
											{property.state?.name}
										</span>
									</div>

									<div className='mt-4'>
										<CurrencyDisplay
											amount={property.price}
											originalCurrency={property.currency || 'USD'}
											listingType={property.listing_type}
										/>
									</div>
								</div>
							</div>

							{/* Property Description */}
							<div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6 mt-6'>
								<h2 className='text-xl font-semibold mb-4 text-gray-900'>
									Overview
								</h2>
								<div>
									{property.description ? (
										<p className='text-sm text-gray-700 leading-relaxed'>
											{property.description}
										</p>
									) : (
										<div className='flex items-center gap-2 text-sm text-muted-foreground italic'>
											<FileText className='w-4 h-4 text-gray-600' />
											<span className='text-gray-600'>No description available</span>
										</div>
									)}
								</div>
							</div>

							{/* Features Section */}
							{property.features && property.features.length > 0 && (
								<div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6'>
									<h2 className='text-xl font-semibold mb-4 text-gray-900'>
										Features & Amenities
									</h2>
									<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
										{property.features.map(feature => (
											<div
												key={feature.id}
												className='flex items-center bg-gray-50 p-4 rounded-lg'
											>
												<div className='w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0'>
													<Check className='w-5 h-5 text-green-600' />
												</div>
												<span className='text-gray-700'>{feature.name}</span>
											</div>
										))}
									</div>
								</div>
							)}
						</div>

						{/* Right Column (Price and Contact) */}
						<div className='lg:col-span-1'>
							{/* Title and Address (Desktop Only) */}
							<div className='hidden lg:block mb-6'>
								<div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
									<div className='flex items-center gap-2 mb-2'>
										<span
											className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
												property.status
											)}`}
										>
											{String(property.status).charAt(0).toUpperCase() +
												String(property.status).slice(1)}
										</span>
										<span className='px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium capitalize'>
											{property.listing_type.replace('_', ' ')}
										</span>
									</div>
									<h1 className='text-2xl font-bold text-gray-900 mb-2'>
										{property.title}
									</h1>
									<div className='flex items-center text-gray-600'>
										<MapPin className='w-5 h-5 mr-2 flex-shrink-0 text-blue-600' />
										<span>
											{property.city?.name},{' '}
											{property.state?.name}
										</span>
									</div>
								</div>
							</div>

							{/* Price Card with Currency Conversion */}
							<div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6'>
								<CurrencyDisplay
									amount={property.price}
									originalCurrency={property.currency || 'USD'}
									listingType={property.listing_type}
								/>

								{/* Property Tags */}
								<div className='flex flex-wrap items-center gap-2 mt-6 mb-6'>
									<div className='flex items-center px-3 py-2 bg-gray-100 rounded-lg'>
										<PropertyIcon className='w-5 h-5 text-gray-700 mr-2' />
										<span className='font-medium text-gray-700 capitalize'>
											{property.property_type.replace('_', ' ')}
										</span>
									</div>

									<div className='flex items-center px-3 py-2 bg-gray-100 rounded-lg'>
										<Tag className='w-5 h-5 text-gray-700 mr-2' />
										<span className='font-medium text-gray-700'>
											ID: {property.custom_id}
										</span>
									</div>
								</div>

								{getPropertyAttributes()}

								{/* Contact Buttons */}
								<div className='space-y-3 mb-6'>
									<button className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center'>
										<Mail className='w-5 h-5 mr-2' />
										Contact Agent
									</button>
								</div>

								{/* Property Stats */}
								<div className='pt-4 mt-4 border-t border-gray-100'>
									<div className='flex justify-between items-center py-2'>
										<span className='text-gray-600 flex items-center'>
											<Eye className='w-4 h-4 mr-2' /> Views
										</span>
										<span className='font-medium text-gray-700'>
											{property.views}
										</span>
									</div>
									<div className='flex justify-between items-center py-2'>
										<span className='text-gray-600 flex items-center'>
											<Calendar className='w-4 h-4 mr-2' /> Listed
										</span>
										<span className='font-medium text-gray-700'>
											{new Date(property.created_at).toLocaleDateString(
												'en-US',
												{
													year: 'numeric',
													month: 'short',
													day: 'numeric',
												}
											)}
										</span>
									</div>
								</div>
							</div>

							{/* Enhanced Map Preview */}
							<div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100 hidden md:block'>
								<h3 className='text-lg font-semibold mb-4 text-gray-900 flex items-center'>
									<MapPin className='w-5 h-5 mr-2 text-blue-600' />
									Location
								</h3>
								
								{hasValidCoordinates ? (
									<>
										<YandexMap
											latitude={property.latitude!}
											longitude={property.longitude!}
											address={`${property.address}, ${property.city?.name}, ${property.state?.name}`}
											title={property.title}
										/>
										<div className='mt-4 space-y-2'>
											<p className='text-gray-900 font-medium'>{property.address}</p>
										</div>
										
										<button 
											onClick={() => setShowMapPopup(true)}
											className='w-full mt-4 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center font-medium'
										>
											<Maximize2 className='w-4 h-4 mr-2' />
											View on Map
										</button>
									</>
								) : (
									<>
										<div className='bg-gray-100 h-48 rounded-lg flex items-center justify-center text-gray-500 mb-4'>
											<div className='text-center'>
												<MapPin className='w-12 h-12 mx-auto mb-2 text-gray-400' />
												<p className='text-sm'>Location coordinates not available</p>
											</div>
										</div>
										<div className='space-y-2'>
											<p className='text-gray-900 font-medium'>{property.address}</p>
											<p className='text-gray-600'>
												{property.city?.name}, {property.state?.name}
											</p>
											{property.postal_code && (
												<p className='text-gray-500 text-sm'>{property.postal_code}</p>
											)}
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Full Gallery Modal */}
			{showFullGallery && property.images && (
				<div className='fixed inset-0 bg-black z-50 overflow-y-auto'>
					<div className='flex items-center justify-between p-4 bg-black bg-opacity-75 sticky top-0 z-10'>
						<h3 className='text-xl font-medium text-white'>
							All Media ({property.images.length})
						</h3>
						<button
							onClick={() => setShowFullGallery(false)}
							className='text-white hover:text-gray-300 p-2'
							aria-label='Close gallery'
						>
							<X className='w-6 h-6' />
						</button>
					</div>

					<div className='max-w-5xl mx-auto p-4 space-y-4'>
						{property.images.map((media, index) => (
							<div
								key={media.id}
								className='bg-gray-900 rounded-lg overflow-hidden'
							>
								<div className='relative h-[70vh]'>
									{media.type === 'image' ? (
										<Image
											src={getImageUrl(media.url)}
											alt={`${property.title} - ${index + 1}`}
											fill
											className='object-contain'
											priority={index === 0}
										/>
									) : media.type === 'video' ? (
										<div className='w-full h-full flex items-center justify-center'>
											<video
												src={getImageUrl(media.url)}
												controls
												className='max-h-full max-w-full'
												poster={media.thumbnail_url ? getImageUrl(media.thumbnail_url) : undefined}
											>
												Your browser does not support the video tag.
											</video>
										</div>
									) : (
										<div className='w-full h-full bg-gray-300 flex items-center justify-center'>
											<span className='text-gray-500'>
												Unsupported media type
											</span>
										</div>
									)}
								</div>
								{media.caption && (
									<div className='p-3 bg-black bg-opacity-75 text-white'>
										<p>{media.caption}</p>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
