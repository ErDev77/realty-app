// src/app/properties/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import PropertyCard from '../_components/PropertyCard'
import PropertyFilter from '../_components/PropertyFilter'
import { Property, PropertyFilter as FilterType, PropertyType, ListingType } from '@/types/property'
import { getProperties } from '@/services/propertyService'
import { Loader2 } from 'lucide-react'

export default function PropertiesPage() {
	const searchParams = useSearchParams()
	const [properties, setProperties] = useState<Property[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)

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
			const data = await getProperties({ ...filter, page: currentPage })
			setProperties(data)

			
			// Calculate total pages (this would be better if your API returned total count)
			// For now, we'll check if we received a full page of results
			if (data.length === filter.limit) {
				setTotalPages(currentPage + 1)
			} else {
				setTotalPages(currentPage)
			}
		} catch (err) {
			setError('Failed to load properties. Please try again.')
			console.error('Error fetching properties:', err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchProperties()
	}, [currentPage, filter])

	const handleFilterChange = (newFilter: FilterType) => {
		setFilter(newFilter)
		setCurrentPage(1) // Reset to first page when filter changes
	}

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Header */}
			<div className='bg-white shadow'>
				<div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
					<h1 className='text-3xl font-bold text-gray-900'>Properties</h1>
					<p className='mt-2 text-gray-600'>Find your dream property</p>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
				<div className='px-4 sm:px-0'>
					<div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
						{/* Filters Sidebar */}
						<div className='lg:col-span-1'>
							<PropertyFilter
								onFilterChange={handleFilterChange}
								initialFilter={filter}
							/>
						</div>

						{/* Properties Grid */}
						<div className='lg:col-span-3'>
							{loading ? (
								<div className='flex justify-center items-center h-96'>
									<Loader2 className='w-8 h-8 animate-spin text-blue-600' />
								</div>
							) : error ? (
								<div className='text-center py-12'>
									<p className='text-red-600'>{error}</p>
									<button
										onClick={fetchProperties}
										className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
									>
										Try Again
									</button>
								</div>
							) : properties.length === 0 ? (
								<div className='text-center py-12'>
									<p className='text-gray-500 text-lg'>
										No properties found matching your criteria.
									</p>
									<p className='text-gray-400 mt-2'>
										Try adjusting your filters to see more results.
									</p>
								</div>
							) : (
								<>
									<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
										{properties.map(property => (
											<PropertyCard key={property.id} property={property} />
										))}
									</div>

									{/* Pagination */}
									{totalPages > 1 && (
										<div className='mt-8 flex justify-center'>
											<nav className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'>
												<button
													onClick={() => handlePageChange(currentPage - 1)}
													disabled={currentPage === 1}
													className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
												>
													Previous
												</button>

												{[...Array(totalPages)].map((_, index) => (
													<button
														key={index + 1}
														onClick={() => handlePageChange(index + 1)}
														className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
															currentPage === index + 1
																? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
																: 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
														}`}
													>
														{index + 1}
													</button>
												))}

												<button
													onClick={() => handlePageChange(currentPage + 1)}
													disabled={currentPage === totalPages}
													className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
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
		</div>
	)
}
