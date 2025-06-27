// src/app/_components/PropertyCard.tsx - Enhanced with image slider and property type
'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, MapPin, Bed, Bath, Maximize, Home, Play } from 'lucide-react'
import { Property } from '@/types/property'
import { useTranslations } from '@/translations/translations'
import { useLanguage } from '@/context/LanguageContext'
import {
	getTranslatedCityName,
	getTranslatedField,
	getTranslatedStateName,
} from '@/services/propertyService'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

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
	const t = useTranslations()
	const { language } = useLanguage()

	// State for image slider
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [isHovering, setIsHovering] = useState(false)
	const [showImageIndicators, setShowImageIndicators] = useState(false)
	const intervalRef = useRef<NodeJS.Timeout | null>(null)

	// Function to get full image URL
	const getImageUrl = (path?: string) => {
		if (!path) return '/api/placeholder/400/300'
		if (path.startsWith('http')) return path
		return `${API_BASE_URL}${path}`
	}

	// Get property type in current language
	const getPropertyTypeLabel = (type: string) => {
		switch (type) {
			case 'house':
				return language === 'hy' ? 'Տուն' : language === 'ru' ? 'Дом' : 'House'
			case 'apartment':
				return language === 'hy'
					? 'Բնակարան'
					: language === 'ru'
					? 'Квартира'
					: 'Apartment'
			case 'commercial':
				return language === 'hy'
					? 'Կոմերցիոն'
					: language === 'ru'
					? 'Коммерческая'
					: 'Commercial'
			case 'land':
				return language === 'hy'
					? 'Հողատարածք'
					: language === 'ru'
					? 'Земельный участок'
					: 'Land'
			default:
				return type
		}
	}

	// Auto-slide function for images when hovering
	const startImageSlider = () => {
		if (!property.images || property.images.length <= 1) return

		intervalRef.current = setInterval(() => {
			setCurrentImageIndex(prev => (prev + 1) % property.images!.length)
		}, 800) // Change image every 800ms
	}

	const stopImageSlider = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current)
			intervalRef.current = null
		}
	}

	// Handle mouse enter/leave
	const handleMouseEnter = () => {
		setIsHovering(true)
		setShowImageIndicators(true)
		if (property.images && property.images.length > 1) {
			startImageSlider()
		}
	}

	const handleMouseLeave = () => {
		setIsHovering(false)
		setShowImageIndicators(false)
		stopImageSlider()
		setCurrentImageIndex(0) // Reset to first image
	}

	// Cleanup interval on unmount
	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}
	}, [])

	// Function to format price based on listing type
	const formatPrice = (price: number, listingType: string) => {
		const formatted = new Intl.NumberFormat(
			language === 'ru' ? 'ru-RU' : language === 'en' ? 'en-US' : 'hy-AM',
			{
				style: 'currency',
				currency: property.currency || 'USD',
				maximumFractionDigits: 0,
			}
		).format(price)

		switch (listingType) {
			case 'rent':
				return `${formatted}${t.month}`
			case 'daily_rent':
				return `${formatted}${t.day}`
			default:
				return formatted
		}
	}

	// Get listing type label
	const getListingTypeLabel = (type: string) => {
		switch (type) {
			case 'sale':
				return t.forSale
			case 'rent':
				return t.forRent
			case 'daily_rent':
				return t.forDailyRent
			default:
				return type.toUpperCase()
		}
	}

	// Get property attributes display
	const renderPropertyAttributes = () => {
		const attributeClass = variant === 'compact' ? 'text-xs' : 'text-sm'

		switch (property.property_type) {
			case 'house':
			case 'apartment':
				if ('attributes' in property) {
					return (
						<div
							className={`flex items-center space-x-4 text-gray-600 ${attributeClass}`}
						>
							{property.attributes.bedrooms && (
								<div className='flex items-center'>
									🛏️
									<span className='ml-1'>
										{property.attributes.bedrooms} {t.bedrooms}
									</span>
								</div>
							)}
							{property.attributes.bathrooms && (
								<div className='flex items-center'>
									🚿
									<span className='ml-1'>
										{property.attributes.bathrooms} {t.bathrooms}
									</span>
								</div>
							)}
							{property.attributes.area_sqft && (
								<div className='flex items-center'>
									📐
									<span className='ml-1'>
										{property.attributes.area_sqft.toLocaleString()} {t.sqft}
									</span>
								</div>
							)}
						</div>
					)
				}
				break

			case 'land':
				if ('attributes' in property && property.attributes.area_acres) {
					return (
						<div
							className={`flex items-center space-x-4 text-gray-600 ${attributeClass}`}
						>
							<div className='flex items-center'>
								📐
								<span className='ml-1'>
									{property.attributes.area_acres} {t.acres}
								</span>
							</div>
						</div>
					)
				}
				break
		}
		return null
	}

	return (
		<Link href={`/${language}/properties/${property.custom_id}`}>
			<div
				className={`group bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-500 transform hover:-translate-y-2`}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				{/* Image Section with Slider */}
				<div className='relative h-64 overflow-hidden'>
					{property.images && property.images.length > 0 ? (
						<>
							<Image
								src={getImageUrl(property.images[currentImageIndex]?.url)}
								alt={property.title}
								fill
								className='object-cover transition-all duration-500 group-hover:scale-110'
								priority={variant === 'featured'}
							/>

							{/* Image/Video Type Indicator */}
							{property.images[currentImageIndex]?.type === 'video' && (
								<div className='absolute inset-0 flex items-center justify-center bg-black/20'>
									<div className='w-16 h-16 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm'>
										<Play className='w-8 h-8 text-white ml-1' />
									</div>
								</div>
							)}

							{/* Image Indicators */}
							{showImageIndicators && property.images.length > 1 && (
								<div className='absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2'>
									{property.images.map((_, index) => (
										<div
											key={index}
											className={`w-2 h-2 rounded-full transition-all duration-300 ${
												index === currentImageIndex
													? 'bg-white scale-125'
													: 'bg-white/50'
											}`}
										/>
									))}
								</div>
							)}

							{/* Media Count Badge */}
							{property.images.length > 1 && (
								<div className='absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm'>
									{currentImageIndex + 1}/{property.images.length}
								</div>
							)}
						</>
					) : (
						<div className='w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center'>
							<div className='text-center'>
								<Home className='w-12 h-12 text-gray-400 mx-auto mb-2' />
								<span className='text-gray-500 text-sm'>{t.noImage}</span>
							</div>
						</div>
					)}

					{/* Property Type and Listing Type Badges */}
					<div className='absolute top-3 left-3 flex flex-col gap-2'>
						{/* Property Type Badge */}
						<span className='px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600'>
							{getPropertyTypeLabel(property.property_type)}
						</span>

						{/* Listing Type Badge */}
						<span
							className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
								property.listing_type === 'sale'
									? 'bg-gradient-to-r from-green-500 to-emerald-600'
									: property.listing_type === 'rent'
									? 'bg-gradient-to-r from-blue-500 to-blue-600'
									: 'bg-gradient-to-r from-purple-500 to-purple-600'
							}`}
						>
							{getListingTypeLabel(property.listing_type)}
						</span>
					</div>

					{/* Action Buttons */}
					<div className='absolute top-3 right-3'>
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
					</div>
				</div>

				{/* Content Section */}
				<div className='p-6'>
					{/* Title */}
					<h3 className='font-bold text-gray-900 mb-3 text-lg group-hover:text-blue-600 transition-colors'>
						{property.title.length > 25
							? property.title.slice(0, 25) + '...'
							: property.title}
					</h3>

					{/* Location */}
					<div className='flex items-center text-gray-600 mb-4'>
						<MapPin className='w-4 h-4 mr-2 text-blue-500 flex-shrink-0' />
						<div className='text-sm truncate'>
							{property.state
								? property.district
									? `${getTranslatedField(
											property.district,
											'name',
											language
									  )}, ${getTranslatedStateName(
											property.state.name,
											language
									  )}`
									: property.city
									? `${getTranslatedCityName(
											property.city.name,
											language
									  )}, ${getTranslatedStateName(
											property.state.name,
											language
									  )}`
									: getTranslatedStateName(property.state.name, language)
								: ''}
						</div>
					</div>

					{/* Price */}
					<div className='text-2xl font-bold text-blue-600 mb-4'>
						{formatPrice(property.price, property.listing_type)}
					</div>

					{/* Property Attributes */}
					<div className='mb-4'>{renderPropertyAttributes()}</div>

					{/* Property ID and Stats */}
					<div className='flex justify-between items-center pt-4 border-t border-gray-100'>
						<span className='text-xs text-gray-500'>
							ID: {property.custom_id}
						</span>
						<div className='flex items-center space-x-4 text-xs text-gray-500'>
							<span>👁 {property.views}</span>
							<span>
								📅 {new Date(property.created_at).toLocaleDateString()}
							</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}
