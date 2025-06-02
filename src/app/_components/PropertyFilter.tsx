'use client'

import { useState, useEffect } from 'react'
import {
	PropertyFilter as FilterType,
	PropertyType,
	ListingType,
	State,
	City,
	PropertyFeature,
} from '@/types/property'
import {
	SlidersHorizontal,
	Home,
	Building2,
	Landmark,
	Trees,
	DollarSign,
	MapPin,
	Bed,
	Bath,
	Maximize,
	Star,
	Search,
	X,
	ChevronDown,
	Filter,
	Tag,
} from 'lucide-react'

interface PropertyFilterProps {
	onFilterChange: (filter: FilterType) => void
	initialFilter?: FilterType
}

export default function PropertyFilter({
	onFilterChange,
	initialFilter = {},
}: PropertyFilterProps) {
	const [states, setStates] = useState<State[]>([])
	const [cities, setCities] = useState<City[]>([])
	const [features, setFeatures] = useState<PropertyFeature[]>([])
	const [filter, setFilter] = useState<FilterType>(initialFilter)
	const [expandedSections, setExpandedSections] = useState<{
		[key: string]: boolean
	}>({
		propertyType: true,
		listingType: true,
		location: true,
		price: true,
		details: false,
		features: false,
	})

	useEffect(() => {
		// Fetch states
		fetch('/api/properties/states')
			.then(res => res.json())
			.then(data => setStates(data))
			.catch(error => console.error('Error fetching states:', error))

		// Fetch features
		fetch('/api/properties/features')
			.then(res => res.json())
			.then(data => setFeatures(data))
			.catch(error => console.error('Error fetching features:', error))
	}, [])

	useEffect(() => {
		if (filter.state_id) {
			// Fetch cities for selected state
			fetch(`/api/properties/cities/${filter.state_id}`)
				.then(res => res.json())
				.then(data => setCities(data))
				.catch(error => console.error('Error fetching cities:', error))
		} else {
			setCities([])
		}
	}, [filter.state_id])

	const handleFilterChange = (
		key: keyof FilterType,
		value: PropertyType | ListingType | string | number | number[] | undefined
	) => {
		const newFilter = { ...filter, [key]: value }

		// Reset city if state changes
		if (key === 'state_id') {
			newFilter.city_id = undefined
		}

		setFilter(newFilter)
		onFilterChange(newFilter)
	}

	const clearFilter = () => {
		const clearedFilter = { page: 1, limit: 12 }
		setFilter(clearedFilter)
		onFilterChange(clearedFilter)
	}

	const toggleSection = (section: string) => {
		setExpandedSections(prev => ({
			...prev,
			[section]: !prev[section],
		}))
	}

	const hasActiveFilters = () => {
		return Object.keys(filter).some(
			key =>
				key !== 'page' && key !== 'limit' && filter[key as keyof FilterType]
		)
	}

	const propertyTypes: {
		type: PropertyType
		icon: any
		label: string
		color: string
	}[] = [
		{ type: 'house', icon: Home, label: 'Houses', color: 'blue' },
		{ type: 'apartment', icon: Building2, label: 'Apartments', color: 'green' },
		{
			type: 'commercial',
			icon: Landmark,
			label: 'Commercial',
			color: 'purple',
		},
		{ type: 'land', icon: Trees, label: 'Land', color: 'orange' },
	]

	const listingTypes: {
		type: ListingType
		label: string
		color: string
		icon: string
	}[] = [
		{ type: 'sale', label: 'For Sale', color: 'green', icon: '🏠' },
		{ type: 'rent', label: 'For Rent', color: 'blue', icon: '🔑' },
		{ type: 'daily_rent', label: 'Daily Rent', color: 'purple', icon: '📅' },
	]

	const FilterSection = ({
		title,
		sectionKey,
		icon: Icon,
		children,
		badge,
	}: {
		title: string
		sectionKey: string
		icon: any
		children: React.ReactNode
		badge?: number | string
	}) => (
		<div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
			<button
				onClick={() => toggleSection(sectionKey)}
				className='w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors'
			>
				<div className='flex items-center'>
					<div className='p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl mr-3'>
						<Icon className='w-4 h-4 text-white' />
					</div>
					<span className='font-semibold text-gray-900'>{title}</span>
					{badge && (
						<span className='ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full'>
							{badge}
						</span>
					)}
				</div>
				<ChevronDown
					className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
						expandedSections[sectionKey] ? 'rotate-180' : ''
					}`}
				/>
			</button>

			<div
				className={`transition-all duration-300 ease-in-out ${
					expandedSections[sectionKey]
						? 'max-h-96 opacity-100'
						: 'max-h-0 opacity-0 overflow-hidden'
				}`}
			>
				<div className='p-4 pt-0 border-t border-gray-50'>{children}</div>
			</div>
		</div>
	)

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div className='bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white'>
				<div className='flex items-center mb-4'>
					<div className='p-3 bg-white/20 rounded-xl mr-3 backdrop-blur-sm'>
						<SlidersHorizontal className='w-6 h-6' />
					</div>
					<h2 className='text-2xl font-bold'>Filter Properties</h2>
				</div>
				<p className='text-blue-100'>
					Refine your search to find the perfect property
				</p>

				{hasActiveFilters() && (
					<div className='mt-4 flex items-center justify-between'>
						<span className='text-sm text-blue-200'>
							{
								Object.keys(filter).filter(
									key =>
										key !== 'page' &&
										key !== 'limit' &&
										filter[key as keyof FilterType]
								).length
							}{' '}
							active filters
						</span>
						<button
							onClick={clearFilter}
							className='px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-white text-sm font-medium transition-colors backdrop-blur-sm'
						>
							Clear All
						</button>
					</div>
				)}
			</div>

			{/* Property Type */}
			<FilterSection
				title='Property Type'
				sectionKey='propertyType'
				icon={Home}
				badge={filter.property_type ? '1' : undefined}
			>
				<div className='grid grid-cols-2 gap-3'>
					{propertyTypes.map(({ type, icon: TypeIcon, label, color }) => (
						<button
							key={type}
							onClick={() =>
								handleFilterChange(
									'property_type',
									filter.property_type === type ? undefined : type
								)
							}
							className={`group relative p-4 rounded-xl border-2 transition-all duration-200 text-left ${
								filter.property_type === type
									? `border-${color}-300 bg-${color}-50 shadow-md`
									: 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
							}`}
						>
							<div
								className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
									filter.property_type === type
										? `bg-${color}-100`
										: 'bg-gray-100 group-hover:bg-gray-200'
								}`}
							>
								<TypeIcon
									className={`w-5 h-5 ${
										filter.property_type === type
											? `text-${color}-600`
											: 'text-gray-500'
									}`}
								/>
							</div>
							<span
								className={`text-sm font-medium block ${
									filter.property_type === type
										? `text-${color}-700`
										: 'text-gray-700'
								}`}
							>
								{label}
							</span>
							{filter.property_type === type && (
								<div className='absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center'>
									<span className='text-white text-xs'>✓</span>
								</div>
							)}
						</button>
					))}
				</div>
			</FilterSection>

			{/* Listing Type */}
			<FilterSection
				title='Listing Type'
				sectionKey='listingType'
				icon={Tag}
				badge={filter.listing_type ? '1' : undefined}
			>
				<div className='space-y-3'>
					{listingTypes.map(({ type, label, color, icon }) => (
						<button
							key={type}
							onClick={() =>
								handleFilterChange(
									'listing_type',
									filter.listing_type === type ? undefined : type
								)
							}
							className={`w-full flex items-center p-3 rounded-xl border-2 transition-all duration-200 ${
								filter.listing_type === type
									? `border-${color}-300 bg-${color}-50 shadow-md`
									: 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
							}`}
						>
							<span className='text-2xl mr-3'>{icon}</span>
							<span
								className={`font-medium ${
									filter.listing_type === type
										? `text-${color}-700`
										: 'text-gray-700'
								}`}
							>
								{label}
							</span>
							{filter.listing_type === type && (
								<div className='ml-auto w-5 h-5 bg-green-500 rounded-full flex items-center justify-center'>
									<span className='text-white text-xs'>✓</span>
								</div>
							)}
						</button>
					))}
				</div>
			</FilterSection>

			{/* Location */}
			<FilterSection
				title='Location'
				sectionKey='location'
				icon={MapPin}
				badge={filter.state_id || filter.city_id ? '1' : undefined}
			>
				<div className='space-y-4'>
					{/* State */}
					<div className='relative'>
						<label className='block text-sm font-semibold text-gray-700 mb-2'>
							State
						</label>
						<div className='relative'>
							<MapPin className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
							<select
								value={filter.state_id || ''}
								onChange={e =>
									handleFilterChange(
										'state_id',
										e.target.value ? parseInt(e.target.value) : undefined
									)
								}
								className='w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none'
							>
								<option value=''>All States</option>
								{states.map(state => (
									<option key={state.id} value={state.id}>
										{state.name}
									</option>
								))}
							</select>
							<ChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
						</div>
					</div>

					{/* City */}
					<div className='relative'>
						<label className='block text-sm font-semibold text-gray-700 mb-2'>
							City
						</label>
						<div className='relative'>
							<Building2 className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
							<select
								value={filter.city_id || ''}
								onChange={e =>
									handleFilterChange(
										'city_id',
										e.target.value ? parseInt(e.target.value) : undefined
									)
								}
								className='w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none disabled:bg-gray-50'
								disabled={!filter.state_id}
							>
								<option value=''>All Cities</option>
								{cities.map(city => (
									<option key={city.id} value={city.id}>
										{city.name}
									</option>
								))}
							</select>
							<ChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
						</div>
					</div>
				</div>
			</FilterSection>

			{/* Price Range */}
			<FilterSection
				title='Price Range'
				sectionKey='price'
				icon={DollarSign}
				badge={filter.min_price || filter.max_price ? '1' : undefined}
			>
				<div className='space-y-4'>
					<div className='grid grid-cols-2 gap-3'>
						<div className='relative'>
							<label className='block text-xs font-semibold text-gray-700 mb-2'>
								Min Price
							</label>
							<div className='relative'>
								<DollarSign className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
								<input
									type='number'
									placeholder='0'
									value={filter.min_price || ''}
									onChange={e =>
										handleFilterChange(
											'min_price',
											e.target.value ? parseFloat(e.target.value) : undefined
										)
									}
									className='w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500'
								/>
							</div>
						</div>
						<div className='relative'>
							<label className='block text-xs font-semibold text-gray-700 mb-2'>
								Max Price
							</label>
							<div className='relative'>
								<DollarSign className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
								<input
									type='number'
									placeholder='No limit'
									value={filter.max_price || ''}
									onChange={e =>
										handleFilterChange(
											'max_price',
											e.target.value ? parseFloat(e.target.value) : undefined
										)
									}
									className='w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500'
								/>
							</div>
						</div>
					</div>

					{/* Quick Price Ranges */}
					<div className='grid grid-cols-2 gap-2'>
						{[
							{ label: 'Under $100K', min: 0, max: 100000 },
							{ label: '$100K-$300K', min: 100000, max: 300000 },
							{ label: '$300K-$500K', min: 300000, max: 500000 },
							{ label: 'Over $500K', min: 500000, max: undefined },
						].map((range, index) => (
							<button
								key={index}
								onClick={() => {
									handleFilterChange('min_price', range.min)
									handleFilterChange('max_price', range.max)
								}}
								className='px-3 py-2 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors'
							>
								{range.label}
							</button>
						))}
					</div>
				</div>
			</FilterSection>

			{/* Property Details */}
			{(filter.property_type === 'house' ||
				filter.property_type === 'apartment' ||
				!filter.property_type) && (
				<FilterSection
					title='Property Details'
					sectionKey='details'
					icon={Bed}
					badge={filter.bedrooms || filter.bathrooms ? '1' : undefined}
				>
					<div className='space-y-4'>
						<div className='grid grid-cols-2 gap-3'>
							<div className='relative'>
								<label className='block text-xs font-semibold text-gray-700 mb-2'>
									Min Bedrooms
								</label>
								<div className='relative'>
									<Bed className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
									<input
										type='number'
										placeholder='Any'
										value={filter.bedrooms || ''}
										onChange={e =>
											handleFilterChange(
												'bedrooms',
												e.target.value ? parseInt(e.target.value) : undefined
											)
										}
										className='w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
										min='0'
									/>
								</div>
							</div>
							<div className='relative'>
								<label className='block text-xs font-semibold text-gray-700 mb-2'>
									Min Bathrooms
								</label>
								<div className='relative'>
									<Bath className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
									<input
										type='number'
										placeholder='Any'
										value={filter.bathrooms || ''}
										onChange={e =>
											handleFilterChange(
												'bathrooms',
												e.target.value ? parseInt(e.target.value) : undefined
											)
										}
										className='w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
										min='0'
										step='0.5'
									/>
								</div>
							</div>
						</div>

						{/* Quick bedroom/bathroom selectors */}
						<div className='space-y-3'>
							<div>
								<label className='block text-xs font-semibold text-gray-700 mb-2'>
									Bedrooms
								</label>
								<div className='flex gap-2'>
									{[1, 2, 3, 4, 5].map(num => (
										<button
											key={num}
											onClick={() =>
												handleFilterChange(
													'bedrooms',
													filter.bedrooms === num ? undefined : num
												)
											}
											className={`w-10 h-10 rounded-xl font-medium text-sm transition-colors ${
												filter.bedrooms === num
													? 'bg-blue-500 text-white'
													: 'bg-gray-100 text-gray-700 hover:bg-blue-100'
											}`}
										>
											{num}
										</button>
									))}
									<button
										onClick={() =>
											handleFilterChange(
												'bedrooms',
												filter.bedrooms === 6 ? undefined : 6
											)
										}
										className={`px-3 h-10 rounded-xl font-medium text-sm transition-colors ${
											filter.bedrooms === 6
												? 'bg-blue-500 text-white'
												: 'bg-gray-100 text-gray-700 hover:bg-blue-100'
										}`}
									>
										6+
									</button>
								</div>
							</div>
							<div>
								<label className='block text-xs font-semibold text-gray-700 mb-2'>
									Bathrooms
								</label>
								<div className='flex gap-2'>
									{[1, 1.5, 2, 2.5, 3].map(num => (
										<button
											key={num}
											onClick={() =>
												handleFilterChange(
													'bathrooms',
													filter.bathrooms === num ? undefined : num
												)
											}
											className={`h-10 px-3 rounded-xl font-medium text-sm transition-colors ${
												filter.bathrooms === num
													? 'bg-blue-500 text-white'
													: 'bg-gray-100 text-gray-700 hover:bg-blue-100'
											}`}
										>
											{num}
										</button>
									))}
									<button
										onClick={() =>
											handleFilterChange(
												'bathrooms',
												filter.bathrooms === 4 ? undefined : 4
											)
										}
										className={`px-3 h-10 rounded-xl font-medium text-sm transition-colors ${
											filter.bathrooms === 4
												? 'bg-blue-500 text-white'
												: 'bg-gray-100 text-gray-700 hover:bg-blue-100'
										}`}
									>
										4+
									</button>
								</div>
							</div>
						</div>
					</div>
				</FilterSection>
			)}

			{/* Features */}
			<FilterSection
				title='Features & Amenities'
				sectionKey='features'
				icon={Star}
				badge={filter.features?.length || undefined}
			>
				<div className='space-y-3'>
					{features.length > 0 ? (
						<div className='grid grid-cols-1 gap-2 max-h-48 overflow-y-auto'>
							{features.map(feature => (
								<label
									key={feature.id}
									className='group flex items-center p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer'
								>
									<input
										type='checkbox'
										checked={filter.features?.includes(feature.id) || false}
										onChange={e => {
											const currentFeatures = filter.features || []
											const newFeatures = e.target.checked
												? [...currentFeatures, feature.id]
												: currentFeatures.filter(id => id !== feature.id)
											handleFilterChange(
												'features',
												newFeatures.length > 0 ? newFeatures : undefined
											)
										}}
										className='w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mr-3'
									/>
									<span className='text-sm text-gray-700 group-hover:text-gray-900 font-medium'>
										{feature.name}
									</span>
								</label>
							))}
						</div>
					) : (
						<div className='text-center py-8 text-gray-500'>
							<Star className='w-8 h-8 mx-auto mb-2 text-gray-300' />
							<p className='text-sm'>No features available</p>
						</div>
					)}
				</div>
			</FilterSection>

			{/* Action Buttons */}
			<div className='space-y-3'>
				<button
					onClick={() => onFilterChange(filter)}
					className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center'
				>
					<Search className='w-5 h-5 mr-2' />
					Apply Filters
				</button>

				{hasActiveFilters() && (
					<button
						onClick={clearFilter}
						className='w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-2xl hover:bg-gray-200 transition-colors duration-200 font-medium flex items-center justify-center'
					>
						<X className='w-4 h-4 mr-2' />
						Clear All Filters
					</button>
				)}
			</div>

			{/* Filter Summary */}
			{hasActiveFilters() && (
				<div className='bg-blue-50 border border-blue-200 rounded-2xl p-4'>
					<h3 className='text-sm font-semibold text-blue-800 mb-2 flex items-center'>
						<Filter className='w-4 h-4 mr-2' />
						Active Filters
					</h3>
					<div className='flex flex-wrap gap-2'>
						{filter.property_type && (
							<span className='inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full'>
								{filter.property_type}
								<button
									onClick={() => handleFilterChange('property_type', undefined)}
									className='ml-2 hover:text-blue-600'
								>
									<X className='w-3 h-3' />
								</button>
							</span>
						)}
						{filter.listing_type && (
							<span className='inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full'>
								{filter.listing_type.replace('_', ' ')}
								<button
									onClick={() => handleFilterChange('listing_type', undefined)}
									className='ml-2 hover:text-green-600'
								>
									<X className='w-3 h-3' />
								</button>
							</span>
						)}
						{(filter.min_price || filter.max_price) && (
							<span className='inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full'>
								${filter.min_price || 0} - ${filter.max_price || '∞'}
								<button
									onClick={() => {
										handleFilterChange('min_price', undefined)
										handleFilterChange('max_price', undefined)
									}}
									className='ml-2 hover:text-purple-600'
								>
									<X className='w-3 h-3' />
								</button>
							</span>
						)}
						{filter.bedrooms && (
							<span className='inline-flex items-center px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full'>
								{filter.bedrooms}+ bed
								<button
									onClick={() => handleFilterChange('bedrooms', undefined)}
									className='ml-2 hover:text-orange-600'
								>
									<X className='w-3 h-3' />
								</button>
							</span>
						)}
						{filter.bathrooms && (
							<span className='inline-flex items-center px-3 py-1 bg-pink-100 text-pink-800 text-xs font-medium rounded-full'>
								{filter.bathrooms}+ bath
								<button
									onClick={() => handleFilterChange('bathrooms', undefined)}
									className='ml-2 hover:text-pink-600'
								>
									<X className='w-3 h-3' />
								</button>
							</span>
						)}
						{filter.features && filter.features.length > 0 && (
							<span className='inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full'>
								{filter.features.length} features
								<button
									onClick={() => handleFilterChange('features', undefined)}
									className='ml-2 hover:text-indigo-600'
								>
									<X className='w-3 h-3' />
								</button>
							</span>
						)}
					</div>
				</div>
			)}

			{/* Tips */}
			<div className='bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-4'>
				<h3 className='text-sm font-semibold text-gray-800 mb-2 flex items-center'>
					💡 Search Tips
				</h3>
				<ul className='text-xs text-gray-600 space-y-1'>
					<li>• Use multiple filters to narrow down results</li>
					<li>• Clear filters to see all available properties</li>
					<li>• Featured properties appear at the top</li>
					<li>• Price ranges help find properties in your budget</li>
				</ul>
			</div>
		</div>
	)
}
