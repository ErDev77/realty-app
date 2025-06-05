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
	Eye,
	Calendar,
	Star,
	TrendingUp,
	Share2,
	ExternalLink,
} from 'lucide-react'
import { Property } from '@/types/property'

const API_BASE_URL = 'http://localhost:3000'

interface PropertyCardProps {
	property: Property
	onFavoriteClick?: (propertyId: number) => void
	isFavorited?: boolean
	variant?: 'default' | 'featured' | 'compact'
}

export default function PropertyCard({
	property,
	onFavoriteClick,
	isFavorited = false,
	variant = 'default',
}: PropertyCardProps) {
	// State for image slider
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [isHovering, setIsHovering] = useState(false)
	const [isImageLoaded, setIsImageLoaded] = useState(false)
	const [showShareMenu, setShowShareMenu] = useState(false)
	const sliderIntervalRef = useRef<NodeJS.Timeout | null>(null)

	// Function to get full image URL
	const getImageUrl = (path?: string) => {
		if (!path) return '/api/placeholder/400/300'
		if (path.startsWith('http')) return path
		return `${API_BASE_URL}${path}`
	}

	// Set up auto-slider effect
	useEffect(() => {
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
			sliderIntervalRef.current = setInterval(() => {
				setCurrentImageIndex(
					prev => (prev + 1) % (property.images?.length || 1)
				)
			}, 2000)
		} else {
			if (sliderIntervalRef.current) {
				clearInterval(sliderIntervalRef.current)
				sliderIntervalRef.current = null
			}
		}

		return () => {
			if (sliderIntervalRef.current) {
				clearInterval(sliderIntervalRef.current)
			}
		}
	}, [isHovering, property.images])

	// Check if we have any images
	const hasImages = property.images && property.images.length > 0
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

	// Handle share functionality
	const handleShare = () => {
		if (navigator.share) {
			navigator.share({
				title: property.title,
				text: `Check out this property: ${property.title}`,
				url: `/properties/${property.custom_id}`,
			})
		} else {
			setShowShareMenu(!showShareMenu)
		}
	}

	// Get property attributes based on property type
	const renderPropertyAttributes = () => {
		const attributeClass = variant === 'compact' ? 'text-xs' : 'text-sm'

		switch (property.property_type) {
			case 'house':
				if ('attributes' in property) {
					return (
						<div
							className={`flex items-center space-x-4 text-gray-600 ${attributeClass}`}
						>
							{property.attributes.bedrooms && (
								<div className='flex items-center'>
									🛏️
									<span>{property.attributes.bedrooms}</span>
								</div>
							)}
							{property.attributes.bathrooms && (
								<div className='flex items-center'>
									🚿
									<span>{property.attributes.bathrooms}</span>
								</div>
							)}
							{property.attributes.area_sqft && (
								<div className='flex items-center'>
									📐
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
						<div
							className={`flex items-center space-x-4 text-gray-600 ${attributeClass}`}
						>
							{property.attributes.bedrooms && (
								<div className='flex items-center'>
									🛏️
									<span>{property.attributes.bedrooms}</span>
								</div>
							)}
							{property.attributes.bathrooms && (
								<div className='flex items-center'>
									🚿
									<span>{property.attributes.bathrooms}</span>
								</div>
							)}
							{property.attributes.area_sqft && (
								<div className='flex items-center'>
									📐
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
						<div
							className={`flex items-center space-x-4 text-gray-600 ${attributeClass}`}
						>
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
						<div
							className={`flex items-center space-x-4 text-gray-600 ${attributeClass}`}
						>
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

	// Card size variants
	const getCardClasses = () => {
		switch (variant) {
			case 'featured':
				return 'bg-white rounded-2xl shadow-xl hover:shadow-2xl border-2 border-gray-100 hover:border-blue-200'
			case 'compact':
				return 'bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-100 hover:border-gray-200'
			default:
				return 'bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-100 hover:border-gray-200'
		}
	}

	const getImageHeight = () => {
		switch (variant) {
			case 'featured':
				return 'h-80'
			case 'compact':
				return 'h-48'
			default:
				return 'h-64'
		}
	}

	return (
		<div
			className={`group ${getCardClasses()} overflow-hidden transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 relative`}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			{/* Featured Badge */}
			{property.featured && (
				<div className='absolute top-4 left-4 z-20'>
					<div className='flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse'>
						<Star className='w-3 h-3 mr-1' />
						FEATURED
					</div>
				</div>
			)}

			{/* Image Section */}
			<div className={`relative ${getImageHeight()} overflow-hidden`}>
				{hasImages ? (
					<>
						<div className='relative w-full h-full'>
							<Image
								src={getCurrentImageUrl()}
								alt={property.title}
								fill
								className={`object-cover transition-all duration-700 group-hover:scale-110 ${
									isImageLoaded ? 'opacity-100' : 'opacity-0'
								}`}
								onLoad={() => setIsImageLoaded(true)}
								priority={variant === 'featured'}
							/>

							{/* Gradient overlay */}
							<div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
						</div>

						{/* Image slider indicator */}
						{property.images && property.images.length > 1 && (
							<div className='absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1'>
								{property.images.map((_, i) => (
									<div
										key={i}
										className={`w-2 h-2 rounded-full transition-all duration-300 ${
											i === currentImageIndex
												? 'bg-white scale-125'
												: 'bg-white/50'
										}`}
									/>
								))}
							</div>
						)}

						{/* Video indicator */}
						{hasVideos && (
							<div className='absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg flex items-center backdrop-blur-sm'>
								<Play className='w-3 h-3 mr-1' />
								<span className='text-xs font-medium'>Video</span>
							</div>
						)}
					</>
				) : (
					<div className='w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center'>
						<div className='text-center'>
							<Home className='w-12 h-12 text-gray-400 mx-auto mb-2' />
							<span className='text-gray-500 text-sm'>No image available</span>
						</div>
					</div>
				)}

				{/* Property Type and Listing Type Badges */}
				<div className='absolute top-3 left-3 flex flex-col gap-2'>
					<span
						className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
							property.listing_type === 'sale'
								? 'bg-gradient-to-r from-green-500 to-emerald-600'
								: property.listing_type === 'rent'
								? 'bg-gradient-to-r from-blue-500 to-blue-600'
								: 'bg-gradient-to-r from-purple-500 to-purple-600'
						}`}
					>
						{property.listing_type.replace('_', ' ').toUpperCase()}
					</span>
					<span className='bg-gray-900/80 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center backdrop-blur-sm'>
						<Home className='w-3 h-3 mr-1' />
						{formatPropertyType(property.property_type)}
					</span>
				</div>

				{/* Action Buttons */}
				<div className='absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0'>
					{/* Favorite Button */}
					{onFavoriteClick && (
						<button
							onClick={e => {
								e.preventDefault()
								e.stopPropagation()
								onFavoriteClick(property.id)
							}}
							className={`p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 transform hover:scale-110 ${
								isFavorited
									? 'bg-red-500 text-white'
									: 'bg-white/90 text-gray-700 hover:bg-red-50 hover:text-red-500'
							}`}
						>
							<Heart
								className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`}
							/>
						</button>
					)}

					{/* Share Button */}
					<div className='relative'>
						<button
							onClick={e => {
								e.preventDefault()
								e.stopPropagation()
								handleShare()
							}}
							className='p-2 bg-white/90 rounded-full shadow-lg backdrop-blur-sm text-gray-700 hover:bg-blue-50 hover:text-blue-500 transition-all duration-200 transform hover:scale-110'
						>
							<Share2 className='w-4 h-4' />
						</button>

						{/* Share Menu */}
						{showShareMenu && (
							<div className='absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-30'>
								<button
									onClick={() => {
										navigator.clipboard.writeText(
											`${window.location.origin}/properties/${property.custom_id}`
										)
										setShowShareMenu(false)
									}}
									className='w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center text-sm'
								>
									Copy Link
								</button>
							</div>
						)}
					</div>

					{/* External Link */}
					<Link
						href={`/properties/${property.custom_id}`}
						className='p-2 bg-white/90 rounded-full shadow-lg backdrop-blur-sm text-gray-700 hover:bg-green-50 hover:text-green-500 transition-all duration-200 transform hover:scale-110'
						onClick={e => e.stopPropagation()}
					>
						<ExternalLink className='w-4 h-4' />
					</Link>
				</div>

				{/* Quick Stats Overlay */}
				<div className='absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300'>
					<div className='bg-black/70 text-white px-2 py-1 rounded-lg flex items-center backdrop-blur-sm'>
						<Eye className='w-3 h-3 mr-1' />
						<span className='text-xs'>{property.views}</span>
					</div>
				</div>
			</div>

			{/* Content Section */}
			<Link href={`/properties/${property.custom_id}`}>
				<div className={`p-6 ${variant === 'compact' ? 'p-4' : ''}`}>
					{/* Header */}
					<div className='flex justify-between items-start mb-3'>
						<h3
							className={`font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors ${
								variant === 'featured'
									? 'text-xl'
									: variant === 'compact'
									? 'text-base'
									: 'text-lg'
							}`}
						>
							{property.title}
						</h3>
						<span className='text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600 ml-2 flex-shrink-0'>
							ID: {property.custom_id}
						</span>
					</div>

					{/* Location */}
					<div className='flex items-center text-gray-600 mb-4'>
						<MapPin className='w-4 h-4 mr-2 text-blue-500 flex-shrink-0' />
						<span
							className={`${
								variant === 'compact' ? 'text-sm' : 'text-sm'
							} truncate text-black`}
						>
							{property.city?.name},{' '}
							{property.state?.name}
						</span>
					</div>

					{/* Price */}
					<div className='flex items-center justify-between mb-4'>
						<div
							className={`font-bold text-blue-600 ${
								variant === 'featured'
									? 'text-3xl'
									: variant === 'compact'
									? 'text-xl'
									: 'text-2xl'
							}`}
						>
							{formatPrice(property.price, property.listing_type)}
						</div>
						{property.listing_type === 'sale' && (
							<div className='flex items-center text-green-600 text-sm'>
								<TrendingUp className='w-4 h-4 mr-1' />
								<span className='font-medium'>For Sale</span>
							</div>
						)}
					</div>

					{/* Property Attributes */}
					<div className='mb-4'>{renderPropertyAttributes()}</div>

					{/* Footer Stats */}
					<div className='flex items-center justify-between pt-4 border-t border-gray-100'>
						<div className='flex items-center text-gray-500 text-xs'>
							<Calendar className='w-3 h-3 mr-1' />
							<span>
								{new Date(property.created_at).toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric',
								})}
							</span>
						</div>

						<div className='flex items-center space-x-3 text-xs text-gray-500'>
							<div className='flex items-center'>
								<Eye className='w-3 h-3 mr-1' />
								<span>{property.views}</span>
							</div>
							{property.featured && (
								<div className='flex items-center text-yellow-600'>
									<Star className='w-3 h-3 mr-1 fill-current' />
									<span>Featured</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</Link>
		</div>
	)
}
