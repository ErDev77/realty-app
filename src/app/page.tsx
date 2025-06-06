// src/app/page.tsx
"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import PropertyCard from './_components/PropertyCard'
import { Property, PropertyType, ListingType } from '@/types/property'
import {
	getFeaturedProperties,
	getRecentProperties,
} from '@/services/propertyService'
import {
	generateOrganizationSchema,
	generateWebsiteSchema,
	generateBreadcrumbSchema,
} from '@/utils/structuredData'
import {
	Search,
	Home,
	Building2,
	Landmark,
	Trees,
	ArrowRight,
	MapPin,
	DollarSign,
	Bed,
	Bath,
	Square,
	ChevronDown,
	ChevronUp,
	Filter,
	X,
	SlidersHorizontal,
} from 'lucide-react'

export const metadata: Metadata = {
	title: 'Chance Realty - Find Your Dream Property in Armenia',
	description:
		'Discover premium real estate in Armenia. Houses, apartments, commercial properties, and land for sale or rent. Professional real estate services in Yerevan and surrounding areas.',
	keywords: [
		'real estate Armenia',
		'property Armenia',
		'houses for sale Yerevan',
		'apartments for rent Armenia',
		'commercial property Armenia',
		'land for sale Armenia',
		'Chance Realty',
	],
	openGraph: {
		title: 'Chance Realty - Find Your Dream Property in Armenia',
		description:
			'Discover premium real estate in Armenia. Professional real estate services with verified listings.',
		images: ['/images/og-home.jpg'],
		url: 'https://chancerealty.am',
	},
	alternates: {
		canonical: 'https://chancerealty.am',
	},
}


export default function HomePage() {
	const [featuredProperties, setFeaturedProperties] = useState<Property[]>([])
	const [recentProperties, setRecentProperties] = useState<Property[]>([])
	const [loading, setLoading] = useState(true)
	const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)

	// Simple search state (custom_id only)
	const [customId, setCustomId] = useState('')

	// Advanced search state
	const [selectedPropertyType, setSelectedPropertyType] = useState<
		PropertyType | ''
	>('')
	const [advancedSearch, setAdvancedSearch] = useState({
		listing_type: '' as ListingType | '',
		location: '',
		min_price: '',
		max_price: '',
		bedrooms: '',
		bathrooms: '',
		min_area: '',
		max_area: '',
	})

	useEffect(() => {
		const fetchProperties = async () => {
			try {
				const [featured, recent] = await Promise.all([
					getFeaturedProperties(),
					getRecentProperties(8),
				])

				setFeaturedProperties(featured || [])
				setRecentProperties(recent || [])
			} catch (error) {
				console.error('Error fetching properties:', error)
				setFeaturedProperties([])
				setRecentProperties([])
			} finally {
				setLoading(false)
			}
		}

		fetchProperties()
	}, [])

	const handleSimpleSearch = (e: React.FormEvent) => {
		e.preventDefault()
		if (customId.trim()) {
			window.location.href = `/properties/${customId.trim()}`
		}
	}

	const handleAdvancedSearch = (e: React.FormEvent) => {
		e.preventDefault()
		const params = new URLSearchParams()

		if (selectedPropertyType)
			params.append('property_type', selectedPropertyType)
		if (advancedSearch.listing_type)
			params.append('listing_type', advancedSearch.listing_type)
		if (advancedSearch.location)
			params.append('location', advancedSearch.location)
		if (advancedSearch.min_price)
			params.append('min_price', advancedSearch.min_price)
		if (advancedSearch.max_price)
			params.append('max_price', advancedSearch.max_price)
		if (advancedSearch.bedrooms)
			params.append('bedrooms', advancedSearch.bedrooms)
		if (advancedSearch.bathrooms)
			params.append('bathrooms', advancedSearch.bathrooms)
		if (advancedSearch.min_area)
			params.append('min_area', advancedSearch.min_area)
		if (advancedSearch.max_area)
			params.append('max_area', advancedSearch.max_area)

		window.location.href = `/properties?${params.toString()}`
	}

	const clearAdvancedSearch = () => {
		setSelectedPropertyType('')
		setAdvancedSearch({
			listing_type: '',
			location: '',
			min_price: '',
			max_price: '',
			bedrooms: '',
			bathrooms: '',
			min_area: '',
			max_area: '',
		})
	}

	const hasActiveFilters = () => {
		return (
			selectedPropertyType ||
			advancedSearch.listing_type ||
			advancedSearch.location ||
			advancedSearch.min_price ||
			advancedSearch.max_price ||
			advancedSearch.bedrooms ||
			advancedSearch.bathrooms ||
			advancedSearch.min_area ||
			advancedSearch.max_area
		)
	}

	// Get specific fields based on property type
	const getPropertyTypeFields = () => {
		switch (selectedPropertyType) {
			case 'house':
			case 'apartment':
				return (
					<>
						<div className='relative group'>
							<label className='block text-sm font-semibold text-gray-700 mb-3'>
								Bedrooms
							</label>
							<div className='relative'>
								<Bed className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors' />
								<input
									type='number'
									placeholder='Any'
									value={advancedSearch.bedrooms}
									onChange={e =>
										setAdvancedSearch({
											...advancedSearch,
											bedrooms: e.target.value,
										})
									}
									className='w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-all duration-200 bg-white shadow-sm'
								/>
							</div>
						</div>
						<div className='relative group'>
							<label className='block text-sm font-semibold text-gray-700 mb-3'>
								Bathrooms
							</label>
							<div className='relative'>
								<Bath className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors' />
								<input
									type='number'
									placeholder='Any'
									value={advancedSearch.bathrooms}
									onChange={e =>
										setAdvancedSearch({
											...advancedSearch,
											bathrooms: e.target.value,
										})
									}
									className='w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-all duration-200 bg-white shadow-sm'
								/>
							</div>
						</div>
					</>
				)
			case 'commercial':
			case 'land':
				return null
			default:
				return null
		}
	}

	const organizationSchema = generateOrganizationSchema()
	const websiteSchema = generateWebsiteSchema()

	return (
		<div className='min-h-screen'>
			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(organizationSchema),
				}}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(websiteSchema),
				}}
			/>
			<div className='relative h-[600px] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800'>
				<div className='absolute inset-0 bg-black opacity-40'></div>
				<div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
				<div className='relative h-full flex items-center'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
						<div className='text-center text-white'>
							<h1 className='text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg'>
								Գտեք ձեր երազանքի անշարժ գույքը
							</h1>
							<p className='text-xl md:text-2xl mb-10 opacity-90 drop-shadow-md'>
								Բացահայտեք կատարյալ տունը մեր լայն հավաքածուից{' '}
							</p>

							{/* Simple Search Form */}
							<div className='max-w-3xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20'>
								<form onSubmit={handleSimpleSearch} className='flex gap-4'>
									<div className='relative flex-1'>
										<Search className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
										<input
											type='text'
											placeholder='Enter Property ID (e.g., PROP-001)'
											value={customId}
											onChange={e => setCustomId(e.target.value)}
											className='w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-all duration-200 text-lg shadow-sm'
										/>
									</div>
									<button
										type='submit'
										className='bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl px-8 py-4 hover:from-blue-700 hover:to-blue-800 flex items-center justify-center whitespace-nowrap font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200'
									>
										<Search className='w-5 h-5 mr-2' />
										Search
									</button>
								</form>

								{/* Advanced Search Toggle */}
								<button
									onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
									className='mt-6 text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center justify-center mx-auto group transition-colors'
								>
									<SlidersHorizontal className='w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-300' />
									{showAdvancedSearch
										? 'Hide Advanced Search'
										: 'Show Advanced Search'}
									{showAdvancedSearch ? (
										<ChevronUp className='w-4 h-4 ml-2' />
									) : (
										<ChevronDown className='w-4 h-4 ml-2' />
									)}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Advanced Search Section */}
			<div
				className={`bg-gradient-to-b from-gray-50 to-white border-b border-gray-200 transition-all duration-500 ease-in-out ${
					showAdvancedSearch
						? 'max-h-none opacity-100'
						: 'max-h-0 opacity-0 overflow-hidden'
				}`}
			>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center mb-12'>
						<div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg'>
							<Filter className='w-8 h-8 text-white' />
						</div>
						<h2 className='text-3xl font-bold text-gray-900 mb-3'>
							Advanced Search
						</h2>
						<p className='text-gray-600 text-lg'>
							Refine your search with detailed filters to find exactly what
							you're looking for
						</p>
					</div>

					{/* Property Type Selection */}
					<div className='mb-12'>
						<div className='flex items-center justify-center mb-8'>
							<label className='text-lg font-semibold text-gray-800 mr-4'>
								Select Property Type
							</label>
							{hasActiveFilters() && (
								<button
									onClick={clearAdvancedSearch}
									className='inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium'
								>
									<X className='w-4 h-4 mr-1' />
									Clear All
								</button>
							)}
						</div>
						<div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto'>
							{[
								{
									type: 'house' as PropertyType,
									icon: Home,
									label: 'House',
									color: 'blue',
									gradient: 'from-blue-500 to-blue-600',
								},
								{
									type: 'apartment' as PropertyType,
									icon: Building2,
									label: 'Apartment',
									color: 'emerald',
									gradient: 'from-emerald-500 to-emerald-600',
								},
								{
									type: 'commercial' as PropertyType,
									icon: Landmark,
									label: 'Commercial',
									color: 'violet',
									gradient: 'from-violet-500 to-violet-600',
								},
								{
									type: 'land' as PropertyType,
									icon: Trees,
									label: 'Land',
									color: 'amber',
									gradient: 'from-amber-500 to-amber-600',
								},
							].map(({ type, icon: Icon, label, color, gradient }) => (
								<button
									key={type}
									type='button'
									onClick={() =>
										setSelectedPropertyType(
											selectedPropertyType === type ? '' : type
										)
									}
									className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${
										selectedPropertyType === type
											? `border-${color}-300 bg-gradient-to-br ${gradient} text-white shadow-xl scale-105`
											: 'border-gray-200 hover:border-gray-300 hover:shadow-md bg-white'
									}`}
								>
									<div
										className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
											selectedPropertyType === type
												? 'bg-white/20 backdrop-blur-sm'
												: `bg-${color}-100 group-hover:bg-${color}-200`
										}`}
									>
										<Icon
											className={`w-7 h-7 transition-all duration-300 ${
												selectedPropertyType === type
													? 'text-white'
													: `text-${color}-600`
											}`}
										/>
									</div>
									<span
										className={`text-sm font-semibold block transition-colors ${
											selectedPropertyType === type
												? 'text-white'
												: 'text-gray-700'
										}`}
									>
										{label}
									</span>
									{selectedPropertyType === type && (
										<div className='absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg'>
											<div
												className={`w-3 h-3 bg-${color}-500 rounded-full`}
											></div>
										</div>
									)}
								</button>
							))}
						</div>
					</div>

					<form onSubmit={handleAdvancedSearch} className='max-w-7xl mx-auto'>
						<div className='bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8'>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
								{/* Listing Type */}
								<div className='relative group'>
									<label className='block text-sm font-semibold text-gray-700 mb-3'>
										Listing Type
									</label>
									<div className='relative'>
										<DollarSign className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors' />
										<select
											value={advancedSearch.listing_type}
											onChange={e =>
												setAdvancedSearch({
													...advancedSearch,
													listing_type: e.target.value as ListingType | '',
												})
											}
											className='w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-all duration-200 bg-white shadow-sm appearance-none cursor-pointer'
										>
											<option value=''>Any Type</option>
											<option value='sale'>For Sale</option>
											<option value='rent'>For Rent</option>
											<option value='daily_rent'>Daily Rent</option>
										</select>
										<ChevronDown className='absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none' />
									</div>
								</div>

								{/* Location */}
								<div className='relative group'>
									<label className='block text-sm font-semibold text-gray-700 mb-3'>
										Location
									</label>
									<div className='relative'>
										<MapPin className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors' />
										<input
											type='text'
											placeholder='Enter location'
											value={advancedSearch.location}
											onChange={e =>
												setAdvancedSearch({
													...advancedSearch,
													location: e.target.value,
												})
											}
											className='w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-all duration-200 bg-white shadow-sm'
										/>
									</div>
								</div>

								{/* Min Price */}
								<div className='relative group'>
									<label className='block text-sm font-semibold text-gray-700 mb-3'>
										Min Price
									</label>
									<div className='relative'>
										<DollarSign className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors' />
										<input
											type='number'
											placeholder='0'
											value={advancedSearch.min_price}
											onChange={e =>
												setAdvancedSearch({
													...advancedSearch,
													min_price: e.target.value,
												})
											}
											className='w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-gray-300 transition-all duration-200 bg-white shadow-sm'
										/>
									</div>
								</div>

								{/* Max Price */}
								<div className='relative group'>
									<label className='block text-sm font-semibold text-gray-700 mb-3'>
										Max Price
									</label>
									<div className='relative'>
										<DollarSign className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors' />
										<input
											type='number'
											placeholder='No limit'
											value={advancedSearch.max_price}
											onChange={e =>
												setAdvancedSearch({
													...advancedSearch,
													max_price: e.target.value,
												})
											}
											className='w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 hover:border-gray-300 transition-all duration-200 bg-white shadow-sm'
										/>
									</div>
								</div>

								{/* Property Type Specific Fields */}
								{getPropertyTypeFields()}

								{/* Area Range - Show for house, apartment, commercial */}
								{(selectedPropertyType === 'house' ||
									selectedPropertyType === 'apartment' ||
									selectedPropertyType === 'commercial') && (
									<>
										<div className='relative group'>
											<label className='block text-sm font-semibold text-gray-700 mb-3'>
												Min Area (sqft)
											</label>
											<div className='relative'>
												<Square className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors' />
												<input
													type='number'
													placeholder='0'
													value={advancedSearch.min_area}
													onChange={e =>
														setAdvancedSearch({
															...advancedSearch,
															min_area: e.target.value,
														})
													}
													className='w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-gray-300 transition-all duration-200 bg-white shadow-sm'
												/>
											</div>
										</div>
										<div className='relative group'>
											<label className='block text-sm font-semibold text-gray-700 mb-3'>
												Max Area (sqft)
											</label>
											<div className='relative'>
												<Square className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors' />
												<input
													type='number'
													placeholder='No limit'
													value={advancedSearch.max_area}
													onChange={e =>
														setAdvancedSearch({
															...advancedSearch,
															max_area: e.target.value,
														})
													}
													className='w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-gray-300 transition-all duration-200 bg-white shadow-sm'
												/>
											</div>
										</div>
									</>
								)}
							</div>
						</div>

						<div className='flex justify-center space-x-4'>
							<button
								type='button'
								onClick={clearAdvancedSearch}
								className='bg-gray-100 text-gray-700 rounded-xl px-8 py-4 hover:bg-gray-200 transition-all duration-200 flex items-center justify-center font-semibold border-2 border-gray-200 hover:border-gray-300'
							>
								<X className='w-5 h-5 mr-2' />
								Clear Filters
							</button>
							<button
								type='submit'
								className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl px-12 py-4 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5'
							>
								<Search className='w-5 h-5 mr-2' />
								Search Properties
							</button>
						</div>
					</form>
				</div>
			</div>

			{/* Featured Properties */}
			<section className='py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden'>
				{/* Background decoration */}
				<div className='absolute inset-0 opacity-40'>
					<div className='absolute top-0 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse'></div>
					<div className='absolute top-0 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000'></div>
					<div className='absolute bottom-0 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000'></div>
				</div>

				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
					<div className='text-center mb-16'>
						<div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl mb-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300'>
							<div className='w-10 h-10 bg-white rounded-xl flex items-center justify-center'>
								<span className='text-2xl'>⭐</span>
							</div>
						</div>
						<h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
							Featured Properties
						</h2>
						<p className='mt-4 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
							Handpicked premium properties curated by our experts for the most
							discerning buyers
						</p>
						<div className='mt-6 flex items-center justify-center space-x-1'>
							{[...Array(5)].map((_, i) => (
								<div
									key={i}
									className='w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse'
									style={{ animationDelay: `${i * 200}ms` }}
								></div>
							))}
						</div>
					</div>

					{loading ? (
						<div className='flex justify-center items-center h-64'>
							<div className='relative'>
								<div className='animate-spin rounded-full h-16 w-16 border-4 border-blue-200'></div>
								<div className='animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 absolute top-0 left-0'></div>
							</div>
						</div>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
							{featuredProperties.map((property, index) => (
								<div
									key={property.id}
									className='transform hover:-translate-y-2 transition-all duration-300'
									style={{ animationDelay: `${index * 100}ms` }}
								>
									<PropertyCard property={property} />
								</div>
							))}
						</div>
					)}

					<div className='text-center'>
						<Link
							href='/properties?featured=true'
							className='group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg relative overflow-hidden'
						>
							<span className='absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></span>
							<span className='relative z-10 flex items-center'>
								View All Featured Properties
								<ArrowRight className='ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300' />
							</span>
						</Link>
					</div>
				</div>
			</section>

			{/* Property Types */}
			<section className='py-20 bg-white relative overflow-hidden'>
				{/* Geometric background patterns */}
				<div className='absolute inset-0 opacity-5'>
					<div className='absolute top-10 left-10 w-32 h-32 border-4 border-blue-500 rounded-lg transform rotate-12'></div>
					<div className='absolute top-32 right-20 w-24 h-24 border-4 border-purple-500 rounded-full'></div>
					<div className='absolute bottom-20 left-32 w-28 h-28 border-4 border-green-500 rounded-lg transform -rotate-12'></div>
					<div className='absolute bottom-32 right-10 w-20 h-20 border-4 border-orange-500 rounded-full'></div>
				</div>

				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
					<div className='text-center mb-16'>
						<div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl mb-6 shadow-2xl'>
							<div className='w-10 h-10 bg-white rounded-xl flex items-center justify-center'>
								<span className='text-2xl'>🏠</span>
							</div>
						</div>
						<h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
							Browse by Property Type
						</h2>
						<p className='mt-4 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
							Discover the perfect property that matches your lifestyle and
							investment goals
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
						{[
							{
								href: '/properties?property_type=house',
								icon: Home,
								title: 'Houses',
								description:
									'Find your perfect family home with gardens and privacy',
								color: 'blue',
								gradient: 'from-blue-500 to-blue-600',
								bgPattern: 'from-blue-50 to-blue-100',
								count: '250+ Available',
							},
							{
								href: '/properties?property_type=apartment',
								icon: Building2,
								title: 'Apartments',
								description: 'Modern living spaces in prime urban locations',
								color: 'emerald',
								gradient: 'from-emerald-500 to-emerald-600',
								bgPattern: 'from-emerald-50 to-emerald-100',
								count: '180+ Available',
							},
							{
								href: '/properties?property_type=commercial',
								icon: Landmark,
								title: 'Commercial',
								description: 'Premium business and office spaces for growth',
								color: 'purple',
								gradient: 'from-purple-500 to-purple-600',
								bgPattern: 'from-purple-50 to-purple-100',
								count: '95+ Available',
							},
							{
								href: '/properties?property_type=land',
								icon: Trees,
								title: 'Land',
								description: 'Build your dream project on prime real estate',
								color: 'amber',
								gradient: 'from-amber-500 to-amber-600',
								bgPattern: 'from-amber-50 to-amber-100',
								count: '120+ Available',
							},
						].map((item, index) => (
							<Link
								key={item.href}
								href={item.href}
								className='group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 text-center border border-gray-100 hover:border-gray-200 transform hover:-translate-y-3 hover:scale-105'
								style={{ animationDelay: `${index * 100}ms` }}
							>
								{/* Background gradient overlay */}
								<div
									className={`absolute inset-0 bg-gradient-to-br ${item.bgPattern} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
								></div>

								{/* Floating icon container */}
								<div
									className={`relative z-10 w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl`}
								>
									<item.icon className='w-10 h-10 text-white' />
								</div>

								{/* Content */}
								<div className='relative z-10'>
									<h3 className='text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors'>
										{item.title}
									</h3>
									<p className='text-gray-600 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors'>
										{item.description}
									</p>
									<div
										className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${item.gradient} text-white text-sm font-semibold rounded-full shadow-lg`}
									>
										{item.count}
									</div>
								</div>

								{/* Hover arrow */}
								<div className='absolute top-6 right-6 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300'>
									<ArrowRight className={`w-4 h-4 text-${item.color}-600`} />
								</div>

								{/* Corner decoration */}
								<div
									className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl ${item.gradient} rounded-tl-full opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
								></div>
							</Link>
						))}
					</div>

					{/* Stats section */}
					<div className='mt-16 grid grid-cols-2 md:grid-cols-4 gap-8'>
						{[
							{ number: '645+', label: 'Total Properties', icon: '🏘️' },
							{ number: '1,200+', label: 'Happy Clients', icon: '😊' },
							{ number: '15+', label: 'Years Experience', icon: '⭐' },
							{ number: '95%', label: 'Satisfaction Rate', icon: '🎯' },
						].map((stat, index) => (
							<div key={index} className='text-center group'>
								<div className='text-3xl mb-2'>{stat.icon}</div>
								<div className='text-3xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors'>
									{stat.number}
								</div>
								<div className='text-gray-600 text-sm'>{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Recent Properties */}
			<section className='py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 relative overflow-hidden'>
				{/* Animated background elements */}
				<div className='absolute inset-0'>
					<div className='absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping'></div>
					<div className='absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse'></div>
					<div className='absolute bottom-32 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-ping animation-delay-1000'></div>
					<div className='absolute bottom-20 right-1/3 w-3 h-3 bg-orange-400 rounded-full animate-pulse animation-delay-2000'></div>
				</div>

				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
					<div className='text-center mb-16'>
						<div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl mb-6 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300'>
							<div className='w-10 h-10 bg-white rounded-xl flex items-center justify-center'>
								<span className='text-2xl'>🆕</span>
							</div>
						</div>
						<h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
							Recent Properties
						</h2>
						<p className='mt-4 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
							Fresh additions to our portfolio - be the first to discover these
							amazing opportunities
						</p>
						<div className='mt-6 inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold'>
							<div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
							<span>Updated daily</span>
						</div>
					</div>

					{loading ? (
						<div className='flex justify-center items-center h-64'>
							<div className='relative'>
								<div className='animate-spin rounded-full h-16 w-16 border-4 border-green-200'></div>
								<div className='animate-spin rounded-full h-16 w-16 border-t-4 border-green-600 absolute top-0 left-0'></div>
								<div className='absolute inset-0 flex items-center justify-center'>
									<div className='w-4 h-4 bg-green-600 rounded-full animate-pulse'></div>
								</div>
							</div>
						</div>
					) : (
						<>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
								{recentProperties.map((property, index) => (
									<div
										key={property.id}
										className='group relative transform hover:-translate-y-2 transition-all duration-300'
										style={{ animationDelay: `${index * 100}ms` }}
									>
										{/* "New" badge */}
										<div className='absolute -top-2 -right-2 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300'>
											NEW
										</div>
										<PropertyCard property={property} />
									</div>
								))}
							</div>

							{/* Quick filters for recent properties */}
							<div className='flex justify-center mb-12'>
								<div className='inline-flex items-center space-x-2 bg-white rounded-2xl p-2 shadow-lg border border-gray-100'>
									{['All', 'Today', 'This Week', 'This Month'].map(
										(filter, index) => (
											<button
												key={filter}
												className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
													index === 0
														? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
														: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
												}`}
											>
												{filter}
											</button>
										)
									)}
								</div>
							</div>
						</>
					)}

					<div className='text-center'>
						<Link
							href='/properties'
							className='group inline-flex items-center px-10 py-5 bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg relative overflow-hidden'
						>
							<span className='absolute inset-0 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left'></span>
							<span className='relative z-10 flex items-center'>
								<span className='mr-3'>🏡</span>
								View All Properties
								<ArrowRight className='ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300' />
							</span>
						</Link>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className='py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden'>
				{/* Animated background elements */}
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20'></div>
					<div className='absolute top-10 left-10 w-32 h-32 border border-white/10 rounded-full animate-pulse'></div>
					<div className='absolute top-32 right-20 w-48 h-48 border border-white/5 rounded-full animate-pulse animation-delay-1000'></div>
					<div className='absolute bottom-20 left-32 w-24 h-24 border border-white/15 rounded-full animate-pulse animation-delay-2000'></div>
					<div className='absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-purple-600/10 to-pink-600/10 rounded-full'></div>
				</div>

				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10'>
					{/* Icon */}
					<div className='inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-8 shadow-2xl animate-bounce'>
						<span className='text-4xl'>🚀</span>
					</div>

					{/* Heading */}
					<h2 className='text-4xl md:text-6xl font-bold text-white mb-6 leading-tight'>
						Ready to Find Your
						<span className='block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent'>
							Dream Property?
						</span>
					</h2>

					{/* Description */}
					<p className='mt-6 text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-10'>
						Join thousands of satisfied customers who found their perfect home
						through our platform. Your dream property is just one click away.
					</p>

					{/* Stats row */}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto'>
						<div className='text-center'>
							<div className='text-3xl font-bold text-white mb-2'>24/7</div>
							<div className='text-blue-200 text-sm'>Customer Support</div>
						</div>
						<div className='text-center'>
							<div className='text-3xl font-bold text-white mb-2'>100%</div>
							<div className='text-blue-200 text-sm'>Verified Listings</div>
						</div>
						<div className='text-center'>
							<div className='text-3xl font-bold text-white mb-2'>0%</div>
							<div className='text-blue-200 text-sm'>Hidden Fees</div>
						</div>
					</div>

					{/* CTA Buttons */}
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
						<Link
							href='/properties'
							className='group inline-flex items-center px-10 py-5 bg-gradient-to-r from-white to-gray-100 text-blue-900 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 text-lg relative overflow-hidden min-w-[200px]'
						>
							<span className='absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></span>
							<span className='relative z-10 flex items-center group-hover:text-white transition-colors duration-300'>
								<span className='mr-3'>🏠</span>
								Start Browsing
								<ArrowRight className='ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300' />
							</span>
						</Link>

						<Link
							href='/contact'
							className='group inline-flex items-center px-10 py-5 border-2 border-white/30 text-white font-semibold rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-lg backdrop-blur-sm min-w-[200px]'
						>
							<span className='mr-3'>📞</span>
							Contact Expert
							<ArrowRight className='ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300' />
						</Link>
					</div>

					{/* Trust indicators */}
					<div className='mt-12 flex flex-wrap justify-center items-center gap-8 opacity-60'>
						<div className='flex items-center space-x-2'>
							<div className='w-6 h-6 bg-green-500 rounded-full flex items-center justify-center'>
								<span className='text-white text-xs'>✓</span>
							</div>
							<span className='text-blue-200 text-sm'>SSL Secured</span>
						</div>
						<div className='flex items-center space-x-2'>
							<div className='w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center'>
								<span className='text-white text-xs'>★</span>
							</div>
							<span className='text-blue-200 text-sm'>Licensed Agents</span>
						</div>
						<div className='flex items-center space-x-2'>
							<div className='w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center'>
								<span className='text-white text-xs'>⚡</span>
							</div>
							<span className='text-blue-200 text-sm'>Instant Results</span>
						</div>
					</div>

					{/* Newsletter signup */}
					<div className='mt-16 max-w-md mx-auto'>
						<div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20'>
							<h3 className='text-xl font-semibold text-white mb-3'>
								Stay Updated
							</h3>
							<p className='text-blue-200 text-sm mb-4'>
								Get notified about new properties in your area
							</p>
							<div className='flex gap-3'>
								<input
									type='email'
									placeholder='Enter your email'
									className='flex-1 px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm'
								/>
								<button className='px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 font-semibold rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-lg'>
									Subscribe
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}