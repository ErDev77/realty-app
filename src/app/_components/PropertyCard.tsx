'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
	Heart,
	MapPin,
	Bed,
	Bath,
	Maximize,
	Home,
	Play,
	Building2,
	ArrowUp,
	Warehouse,
} from 'lucide-react'
import { Property } from '@/types/property'

const API_BASE_URL = 'https://realty-app-admin.vercel.app'

interface PropertyCardProps {
	property: Property
	onFavoriteClick?: (propertyId: number) => void
	isFavorited?: boolean
}

export default function PropertyCard({
	property,
	onFavoriteClick,
	isFavorited = false,
}: PropertyCardProps) {
	// State for image slider
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [isHovering, setIsHovering] = useState(false)
	const sliderIntervalRef = useRef<NodeJS.Timeout | null>(null)

	// Function to get full image URL
	const getImageUrl = (path?: string) => {
		// If path is null or undefined, return a placeholder
		if (!path) return '/api/placeholder/400/300'

		// If it's already a full URL, return it as is
		if (path.startsWith('http')) return path

		// Otherwise, prepend the API base URL
		return `${API_BASE_URL}${path}`
	}

	// Set up auto-slider effect
	useEffect(() => {
		// Clear any existing interval when component unmounts or dependencies change
		return () => {
			if (sliderIntervalRef.current) {
				clearInterval(sliderIntervalRef.current)
			}
		}
	}, [])

	// Start/stop the slider based on hover state
	useEffect(() => {
		if (!property.images || property.images.length <= 1) return

		if (isHovering) {
			// Start the slider when hovering
			sliderIntervalRef.current = setInterval(() => {
				setCurrentImageIndex(
					prev => (prev + 1) % (property.images?.length || 1)
				)
			}, 2000) // Change image every 2 seconds
		} else {
			// Stop the slider when not hovering
			if (sliderIntervalRef.current) {
				clearInterval(sliderIntervalRef.current)
				sliderIntervalRef.current = null
			}
		}

		// Clean up on unmount or when dependencies change
		return () => {
			if (sliderIntervalRef.current) {
				clearInterval(sliderIntervalRef.current)
			}
		}
	}, [isHovering, property.images])

	// Check if we have any images
	const hasImages = property.images && property.images.length > 0

	// Check if we have any videos
	const hasVideos = property.images?.some(media => media.type === 'video')

	// Function to format price based on listing type
	const formatPrice = (price: number, listingType: string) => {
		const formatted = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: property.currency || 'USD',
			maximumFractionDigits: 0,
		}).format(price)

		switch (listingType) {
			case 'rent':
				return `${formatted}/month`
			case 'daily_rent':
				return `${formatted}/day`
			default:
				return formatted
		}
	}

	// Function to get area information based on property type
	const getAreaInfo = () => {
		if ('attributes' in property) {
			if (property.property_type === 'land') {
				return `${property.attributes.area_acres} acres`
			} else if ('area_sqft' in property.attributes) {
				return `${property.attributes.area_sqft} sq ft`
			}
		}
		return null
	}

	// Function to format property type
	const formatPropertyType = (type: string) => {
		return type
			.split('_')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ')
	}

	// Get current image URL safely
	const getCurrentImageUrl = () => {
		if (property.images && property.images.length > 0) {
			return getImageUrl(property.images[currentImageIndex]?.url)
		}
		return getImageUrl()
	}

	// Get property attributes based on property type
	const renderPropertyAttributes = () => {
		switch (property.property_type) {
			case 'house':
				if ('attributes' in property) {
					return (
						<div className='flex items-center space-x-4 text-gray-600'>
							{property.attributes.bedrooms && (
								<div className='flex items-center'>
									<Bed className='w-4 h-4 mr-1' />
									<span>{property.attributes.bedrooms}</span>
								</div>
							)}

							{property.attributes.bathrooms && (
								<div className='flex items-center'>
									<Bath className='w-4 h-4 mr-1' />
									<span>{property.attributes.bathrooms}</span>
								</div>
							)}

							{property.attributes.area_sqft && (
								<div className='flex items-center'>
									<Maximize className='w-4 h-4 mr-1' />
									<span>{property.attributes.area_sqft} sq ft</span>
								</div>
							)}

							{property.attributes.floors && (
								<div className='flex items-center'>
									<Building2 className='w-4 h-4 mr-1' />
									<span>{property.attributes.floors} fl</span>
								</div>
							)}
						</div>
					)
				}
				break

			case 'apartment':
				if ('attributes' in property) {
					return (
						<div className='flex items-center space-x-4 text-gray-600'>
							{property.attributes.bedrooms && (
								<div className='flex items-center'>
									<Bed className='w-4 h-4 mr-1' />
									<span>{property.attributes.bedrooms}</span>
								</div>
							)}

							{property.attributes.bathrooms && (
								<div className='flex items-center'>
									<Bath className='w-4 h-4 mr-1' />
									<span>{property.attributes.bathrooms}</span>
								</div>
							)}

							{property.attributes.area_sqft && (
								<div className='flex items-center'>
									<Maximize className='w-4 h-4 mr-1' />
									<span>{property.attributes.area_sqft} sq ft</span>
								</div>
							)}

							{(property.attributes.floor ||
								property.attributes.total_floors) && (
								<div className='flex items-center'>
									<Building2 className='w-4 h-4 mr-1' />
									<span>
										{property.attributes.floor}/
										{property.attributes.total_floors}
									</span>
								</div>
							)}
						</div>
					)
				}
				break

			case 'commercial':
				if ('attributes' in property) {
					return (
						<div className='flex items-center space-x-4 text-gray-600'>
							{property.attributes.area_sqft && (
								<div className='flex items-center'>
									<Maximize className='w-4 h-4 mr-1' />
									<span>{property.attributes.area_sqft} sq ft</span>
								</div>
							)}

							{property.attributes.business_type && (
								<div className='flex items-center'>
									<Warehouse className='w-4 h-4 mr-1' />
									<span>{property.attributes.business_type}</span>
								</div>
							)}

							{property.attributes.floors && (
								<div className='flex items-center'>
									<Building2 className='w-4 h-4 mr-1' />
									<span>{property.attributes.floors} fl</span>
								</div>
							)}

							{property.attributes.ceiling_height && (
								<div className='flex items-center'>
									<ArrowUp className='w-4 h-4 mr-1' />
									<span>{property.attributes.ceiling_height}′</span>
								</div>
							)}
						</div>
					)
				}
				break

			case 'land':
				if ('attributes' in property) {
					return (
						<div className='flex items-center space-x-4 text-gray-600'>
							{property.attributes.area_acres && (
								<div className='flex items-center'>
									<Maximize className='w-4 h-4 mr-1' />
									<span>{property.attributes.area_acres} acres</span>
								</div>
							)}
						</div>
					)
				}
				break
		}

		return null
	}

	return (
		<div
			className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow'
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			<div className='relative h-64'>
				{hasImages ? (
					<>
						<Image
							src={getCurrentImageUrl()}
							alt={property.title}
							fill
							className='object-cover transition-opacity duration-500'
						/>

						{/* Image slider indicator - only show if more than one image */}
						{property.images && property.images.length > 1 && (
							<div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1'>
								{property.images.map((_, i) => (
									<div
										key={i}
										className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
											i === currentImageIndex ? 'bg-white' : 'bg-white/50'
										}`}
									/>
								))}
							</div>
						)}

						{hasVideos && (
							<div className='absolute top-4 right-4 bg-black bg-opacity-60 text-white px-2 py-1 rounded-md flex items-center'>
								<Play className='w-4 h-4 mr-1' />
								<span className='text-xs'>Video</span>
							</div>
						)}
					</>
				) : (
					<div className='w-full h-full bg-gray-200 flex items-center justify-center'>
						<span className='text-gray-400'>No image available</span>
					</div>
				)}

				<div className='absolute top-4 left-4 flex gap-2'>
					<span className='bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium'>
						{property.listing_type.replace('_', ' ').toUpperCase()}
					</span>
					<span className='bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center'>
						<Home className='w-3 h-3 mr-1' />
						{formatPropertyType(property.property_type)}
					</span>
				</div>

				{onFavoriteClick && (
					<button
						onClick={e => {
							e.preventDefault()
							e.stopPropagation()
							onFavoriteClick(property.id)
						}}
						className='absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow'
					>
						<Heart
							className={`w-5 h-5 ${
								isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'
							}`}
						/>
					</button>
				)}
			</div>

			<Link href={`/properties/${property.custom_id}`}>
				<div className='p-6'>
					<div className='flex justify-between items-start mb-2'>
						<h3 className='text-xl font-semibold line-clamp-1'>
							{property.title}
						</h3>
						<span className='text-sm bg-gray-100 px-2 py-1 rounded text-gray-600'>
							ID: {property.custom_id}
						</span>
					</div>

					<div className='flex items-center text-gray-600 mb-4'>
						<MapPin className='w-4 h-4 mr-1' />
						<span className='text-sm'>
							{property.city?.name},{' '}
							{property.state?.code || property.state?.name}
						</span>
					</div>

					<div className='flex items-center justify-between mb-4'>
						<div className='text-2xl font-bold text-blue-600'>
							{formatPrice(property.price, property.listing_type)}
						</div>
					</div>

					{/* Render all property attributes based on property type */}
					{renderPropertyAttributes()}
				</div>
			</Link>
		</div>
	)
}
