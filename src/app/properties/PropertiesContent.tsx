// src/app/properties/PropertiesContent.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import PropertyCard from '../_components/PropertyCard'
import PropertyFilter from '../_components/PropertyFilter'
import {
	Property,
	PropertyFilter as FilterType,
	PropertyType,
	ListingType,
} from '@/types/property'
import { getProperties } from '@/services/propertyService'
import {
	Loader2,
	Filter,
	Grid3X3,
	List,
	SlidersHorizontal,
	Search,
	MapPin,
	Home,
	RefreshCw,
	ChevronDown,
	X,
	Eye,
	Calendar,
} from 'lucide-react'

export default function PropertiesContent() {
	const searchParams = useSearchParams()
	const [properties, setProperties] = useState<Property[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
	const [showFilters, setShowFilters] = useState(false)
	const [sortBy, setSortBy] = useState<'price' | 'created_at' | 'views'>(
		'created_at'
	)
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

	// Initialize filter from URL params
	const [filter, setFilter] = useState<FilterType>(() => {
		const initialFilter: FilterType = {
			page: 1,
			limit: 12,
		}

		// Parse URL parameters
		const property_type = searchParams.get('property_type')
		const listing_type = searchParams.get('listing_type')
		const state_id = searchParams.get('state_id')
		const city_id = searchParams.get('city_id')
		const min_price = searchParams.get('min_price')
		const max_price = searchParams.get('max_price')
		const featured = searchParams.get('featured')

		if (property_type)
			initialFilter.property_type = property_type as PropertyType
		if (listing_type) initialFilter.listing_type = listing_type as ListingType
		if (state_id) initialFilter.state_id = parseInt(state_id)
		if (city_id) initialFilter.city_id = parseInt(city_id)
		if (min_price) initialFilter.min_price = parseFloat(min_price)
		if (max_price) initialFilter.max_price = parseFloat(max_price)

		return initialFilter
	})

	const fetchProperties = async () => {
		setLoading(true)
		setError(null)

		try {
			console.log('Fetching properties with filter:', {
				...filter,
				page: currentPage,
				sort_by: sortBy,
				sort_order: sortOrder,
			})

			const data = await getProperties({
				...filter,
				page: currentPage,
				sort_by: sortBy,
				sort_order: sortOrder,
			})

			if (data && data.length > 0) {
				setProperties(data)
				setTotalPages(Math.ceil(data.length / (filter.limit || 12)))
			} else {
				setProperties([])
				setTotalPages(1)
			}
		} catch (err) {
			console.error('Error in fetchProperties:', err)
			setError('Failed to load properties. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchProperties()
	}, [currentPage, filter, sortBy, sortOrder])

	const handleFilterChange = (newFilter: FilterType) => {
		setFilter(newFilter)
		setCurrentPage(1)
	}

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handleSortChange = (
		newSortBy: 'price' | 'created_at' | 'views',
		newSortOrder: 'asc' | 'desc'
	) => {
		setSortBy(newSortBy)
		setSortOrder(newSortOrder)
		setCurrentPage(1)
	}

	const clearAllFilters = () => {
		setFilter({ page: 1, limit: 12 })
		setCurrentPage(1)
		setSortBy('created_at')
		setSortOrder('desc')
	}

	const hasActiveFilters = () => {
		return Object.keys(filter).some(
			key =>
				key !== 'page' && key !== 'limit' && filter[key as keyof FilterType]
		)
	}

	const getFilterSummary = () => {
		const summary = []
		if (filter.property_type) summary.push(filter.property_type)
		if (filter.listing_type) summary.push(filter.listing_type.replace('_', ' '))
		if (filter.min_price || filter.max_price) {
			const priceRange = `$${filter.min_price || 0} - $${
				filter.max_price || '∞'
			}`
			summary.push(priceRange)
		}
		return summary.join(', ') || 'All properties'
	}

	const formatPrice = (price: number, listingType: string) => {
		const formatted = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
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

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50'>
			{/* Header Section */}
			<div className='bg-white shadow-lg border-b border-gray-100'>
				<div className='max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
					<div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
						<div className='mb-6 lg:mb-0'>
							<div className='flex items-center mb-2'>
								<div className='p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mr-4 shadow-lg'>
									<Home className='w-8 h-8 text-white' />
								</div>
								<h1 className='text-4xl font-bold text-gray-900'>Properties</h1>
							</div>
							<p className='text-xl text-gray-600 leading-relaxed'>
								{loading
									? 'Loading...'
									: `${properties.length} properties found`}
							</p>
							{hasActiveFilters() && (
								<div className='mt-2 flex items-center text-sm text-gray-500'>
									<Filter className='w-4 h-4 mr-2' />
									<span>Filtered by: {getFilterSummary()}</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Controls Bar */}
			<div className='bg-white border-b border-gray-100 shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
					<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
						{/* Left Controls */}
						<div className='flex items-center space-x-4'>
							{/* Mobile Filter Toggle */}
							<button
								onClick={() => setShowFilters(!showFilters)}
								className='lg:hidden flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors border border-blue-200'
							>
								<SlidersHorizontal className='w-4 h-4 mr-2' />
								Filters
								{hasActiveFilters() && (
									<span className='ml-2 w-2 h-2 bg-blue-500 rounded-full'></span>
								)}
							</button>

							
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto py-8 sm:px-6 lg:px-8'>
				<div className='px-4 sm:px-0'>
					<div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
						{/* Filters Sidebar - Desktop */}
						<div
							className={`lg:col-span-1 ${
								showFilters ? 'block' : 'hidden lg:block'
							}`}
						>
							<div className='sticky top-24'>
								<PropertyFilter
									onFilterChange={handleFilterChange}
									initialFilter={filter}
								/>
							</div>
						</div>

						{/* Properties Grid/List */}
						<div className='lg:col-span-3'>
							{loading ? (
								<div className='flex flex-col items-center justify-center h-96 bg-white rounded-2xl shadow-lg border border-gray-100'>
									<div className='relative'>
										<Loader2 className='w-16 h-16 animate-spin text-blue-600' />
										<div className='absolute inset-0 w-16 h-16 border-4 border-blue-200 rounded-full animate-pulse'></div>
									</div>
									<p className='mt-4 text-gray-600 font-medium'>
										Loading amazing properties...
									</p>
									<p className='mt-2 text-gray-400 text-sm'>
										Please wait while we fetch the latest listings
									</p>
								</div>
							) : error ? (
								<div className='text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100'>
									<div className='w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
										<X className='w-10 h-10 text-red-600' />
									</div>
									<h3 className='text-xl font-semibold text-gray-900 mb-2'>
										Oops! Something went wrong
									</h3>
									<p className='text-red-600 mb-4'>{error}</p>
									<button
										onClick={fetchProperties}
										className='inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl'
									>
										<RefreshCw className='w-4 h-4 mr-2' />
										Try Again
									</button>
								</div>
							) : properties.length === 0 ? (
								<div className='text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100'>
									<div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
										<Search className='w-10 h-10 text-gray-400' />
									</div>
									<h3 className='text-xl font-semibold text-gray-900 mb-2'>
										No properties found
									</h3>
									<p className='text-gray-500 text-lg mb-4'>
										No properties found matching your criteria.
									</p>
									<p className='text-gray-400 mb-6'>
										Try adjusting your filters to see more results.
									</p>
									<button
										onClick={clearAllFilters}
										className='inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl'
									>
										<X className='w-4 h-4 mr-2' />
										Clear All Filters
									</button>
								</div>
							) : (
								<>
									{/* Results Summary */}
									<div className='mb-6 flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100'>
										<div className='flex items-center space-x-4'>
											<div className='flex items-center text-sm text-gray-600'>
												<MapPin className='w-4 h-4 mr-2 text-blue-500' />
												<span className='font-medium'>
													{properties.length} properties found
												</span>
											</div>
											{hasActiveFilters() && (
												<div className='flex items-center text-sm text-blue-600'>
													<Filter className='w-4 h-4 mr-1' />
													<span>Filtered results</span>
												</div>
											)}
										</div>
										{/* Right Controls */}
										<div className='flex items-center space-x-4'>
											{/* Sort Dropdown */}
											<div className='relative group'>
												<button className='flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200'>
													<span className='text-sm font-medium mr-2'>
														Sort:{' '}
														{sortBy === 'created_at'
															? 'Date'
															: sortBy === 'price'
															? 'Price'
															: 'Views'}
													</span>
													<ChevronDown className='w-4 h-4' />
												</button>

												<div className='absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20'>
													<div className='p-2'>
														{[
															{
																key: 'created_at',
																label: 'Date Added',
																orders: [
																	{ key: 'desc', label: 'Newest First' },
																	{ key: 'asc', label: 'Oldest First' },
																],
															},
															{
																key: 'price',
																label: 'Price',
																orders: [
																	{ key: 'asc', label: 'Low to High' },
																	{ key: 'desc', label: 'High to Low' },
																],
															},
															{
																key: 'views',
																label: 'Popularity',
																orders: [
																	{ key: 'desc', label: 'Most Viewed' },
																	{ key: 'asc', label: 'Least Viewed' },
																],
															},
														].map(sort => (
															<div key={sort.key}>
																<div className='px-3 py-2 text-xs font-semibold text-gray-500 uppercase'>
																	{sort.label}
																</div>
																{sort.orders.map(order => (
																	<button
																		key={`${sort.key}-${order.key}`}
																		onClick={() =>
																			handleSortChange(
																				sort.key as any,
																				order.key as any
																			)
																		}
																		className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
																			sortBy === sort.key &&
																			sortOrder === order.key
																				? 'bg-blue-50 text-blue-700'
																				: 'text-gray-700 hover:bg-gray-50'
																		}`}
																	>
																		{order.label}
																	</button>
																))}
															</div>
														))}
													</div>
												</div>
											</div>

											{/* View Mode Toggle */}
											<div className='flex items-center bg-gray-100 p-1 rounded-xl'>
												<button
													onClick={() => setViewMode('grid')}
													className={`p-2 rounded-lg transition-colors ${
														viewMode === 'grid'
															? 'bg-white text-blue-600 shadow-sm'
															: 'text-gray-600 hover:text-gray-900'
													}`}
												>
													<Grid3X3 className='w-4 h-4' />
												</button>
												<button
													onClick={() => setViewMode('list')}
													className={`p-2 rounded-lg transition-colors ${
														viewMode === 'list'
															? 'bg-white text-blue-600 shadow-sm'
															: 'text-gray-600 hover:text-gray-900'
													}`}
												>
													<List className='w-4 h-4' />
												</button>
											</div>
										</div>
										<div className='text-sm text-gray-500'>
											Page {currentPage} of {totalPages}
										</div>
									</div>

									{/* Properties Display */}
									{viewMode === 'grid' ? (
										<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
											{properties.map((property, index) => (
												<div
													key={property.id}
													className='animate-fade-in'
													style={{ animationDelay: `${index * 100}ms` }}
												>
													<PropertyCard
														property={property}
														variant={property.featured ? 'featured' : 'default'}
													/>
												</div>
											))}
										</div>
									) : (
										<div className='space-y-6'>
											{properties.map((property, index) => (
												<div
													key={property.id}
													className='animate-fade-in bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300'
													style={{ animationDelay: `${index * 50}ms` }}
												>
													<div className='flex flex-col md:flex-row'>
														<div className='md:w-1/3 h-48 md:h-auto relative'>
															{property.images && property.images.length > 0 ? (
																<img
																	src={property.images[0].url}
																	alt={property.title}
																	className='w-full h-full object-cover'
																/>
															) : (
																<div className='w-full h-full bg-gray-200 flex items-center justify-center'>
																	<Home className='w-12 h-12 text-gray-400' />
																</div>
															)}
															{property.featured && (
																<div className='absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold'>
																	FEATURED
																</div>
															)}
														</div>
														<div className='md:w-2/3 p-6'>
															<div className='flex justify-between items-start mb-2'>
																<h3 className='text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors'>
																	{property.title}
																</h3>
																<span className='text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600'>
																	ID: {property.custom_id}
																</span>
															</div>
															<div className='flex items-center text-gray-600 mb-3'>
																<MapPin className='w-4 h-4 mr-2 text-blue-500' />
																<span>
																	{property.city?.name}, {property.state?.name}
																</span>
															</div>
															<div className='text-2xl font-bold text-blue-600 mb-4'>
																{formatPrice(
																	property.price,
																	property.listing_type
																)}
															</div>
															<div className='flex items-center justify-between'>
																<div className='flex items-center space-x-4 text-gray-600 text-sm'>
																	{/* Property attributes based on type */}
																	{property.property_type === 'house' &&
																		'attributes' in property && (
																			<>
																				{property.attributes.bedrooms && (
																					<div className='flex items-center'>
																						<span className='text-xs mr-1'>
																							🛏️
																						</span>
																						<span>
																							{property.attributes.bedrooms} bed
																						</span>
																					</div>
																				)}
																				{property.attributes.bathrooms && (
																					<div className='flex items-center'>
																						<span className='text-xs mr-1'>
																							🚿
																						</span>
																						<span>
																							{property.attributes.bathrooms}{' '}
																							bath
																						</span>
																					</div>
																				)}
																				{property.attributes.area_sqft && (
																					<div className='flex items-center'>
																						<span className='text-xs mr-1'>
																							📐
																						</span>
																						<span>
																							{property.attributes.area_sqft}{' '}
																							sqft
																						</span>
																					</div>
																				)}
																			</>
																		)}
																	{property.property_type === 'apartment' &&
																		'attributes' in property && (
																			<>
																				{property.attributes.bedrooms && (
																					<div className='flex items-center'>
																						<span className='text-xs mr-1'>
																							🛏️
																						</span>
																						<span>
																							{property.attributes.bedrooms} bed
																						</span>
																					</div>
																				)}
																				{property.attributes.bathrooms && (
																					<div className='flex items-center'>
																						<span className='text-xs mr-1'>
																							🚿
																						</span>
																						<span>
																							{property.attributes.bathrooms}{' '}
																							bath
																						</span>
																					</div>
																				)}
																				{property.attributes.area_sqft && (
																					<div className='flex items-center'>
																						<span className='text-xs mr-1'>
																							📐
																						</span>
																						<span>
																							{property.attributes.area_sqft}{' '}
																							sqft
																						</span>
																					</div>
																				)}
																			</>
																		)}
																	{property.property_type === 'commercial' &&
																		'attributes' in property && (
																			<>
																				{property.attributes.area_sqft && (
																					<div className='flex items-center'>
																						<span className='text-xs mr-1'>
																							📐
																						</span>
																						<span>
																							{property.attributes.area_sqft}{' '}
																							sqft
																						</span>
																					</div>
																				)}
																				{property.attributes.business_type && (
																					<div className='flex items-center'>
																						<span className='text-xs mr-1'>
																							🏢
																						</span>
																						<span>
																							{
																								property.attributes
																									.business_type
																							}
																						</span>
																					</div>
																				)}
																			</>
																		)}
																	{property.property_type === 'land' &&
																		'attributes' in property && (
																			<div className='flex items-center'>
																				<span className='text-xs mr-1'>🌍</span>
																				<span>
																					{property.attributes.area_acres} acres
																				</span>
																			</div>
																		)}
																</div>
																<div className='flex items-center space-x-4 text-xs text-gray-500'>
																	<div className='flex items-center'>
																		<Eye className='w-3 h-3 mr-1' />
																		{property.views}
																	</div>
																	<div className='flex items-center'>
																		<Calendar className='w-3 h-3 mr-1' />
																		{new Date(
																			property.created_at
																		).toLocaleDateString()}
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											))}
										</div>
									)}

									{/* Pagination */}
									{totalPages > 1 && (
										<div className='mt-12 flex justify-center'>
											<nav className='flex items-center space-x-2'>
												<button
													onClick={() => handlePageChange(currentPage - 1)}
													disabled={currentPage === 1}
													className='px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
												>
													Previous
												</button>

												{[...Array(Math.min(totalPages, 7))].map((_, index) => {
													let pageNumber
													if (totalPages <= 7) {
														pageNumber = index + 1
													} else {
														if (currentPage <= 4) {
															pageNumber = index + 1
														} else if (currentPage >= totalPages - 3) {
															pageNumber = totalPages - 6 + index
														} else {
															pageNumber = currentPage - 3 + index
														}
													}

													return (
														<button
															key={pageNumber}
															onClick={() => handlePageChange(pageNumber)}
															className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
																currentPage === pageNumber
																	? 'bg-blue-600 text-white shadow-lg'
																	: 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
															}`}
														>
															{pageNumber}
														</button>
													)
												})}

												<button
													onClick={() => handlePageChange(currentPage + 1)}
													disabled={currentPage === totalPages}
													className='px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
												>
													Next
												</button>
											</nav>
										</div>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Add custom CSS for animations */}
			<style jsx>{`
				@keyframes fade-in {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				.animate-fade-in {
					animation: fade-in 0.6s ease-out forwards;
					opacity: 0;
				}
			`}</style>
		</div>
	)
}
