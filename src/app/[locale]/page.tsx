// src/app/[locale]/page.tsx - Updated with translations
"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import PropertyCard from '../_components/PropertyCard'
import { Property, PropertyType, ListingType, State, City, District } from '@/types/property'
import { getCitiesByState, getDistrictsByState, getFeaturedProperties, getRecentProperties, getStates, getTranslatedCityName, getTranslatedField, getTranslatedStateName } from '@/services/propertyService'
import { useTranslations } from '@/translations/translations'
import { useLanguage } from '@/context/LanguageContext'
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

export default function HomePage() {
	const t = useTranslations()
	const { language } = useLanguage()
	const [featuredProperties, setFeaturedProperties] = useState<Property[]>([])
	const [recentProperties, setRecentProperties] = useState<Property[]>([])
	const [loading, setLoading] = useState(true)
	const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
	const [customId, setCustomId] = useState('')
	const [states, setStates] = useState<State[]>([])
	const [cities, setCities] = useState<City[]>([])
	const [districts, setDistricts] = useState<District[]>([])
	const [selectedState, setSelectedState] = useState<State | null>(null)

	// Advanced search state
	const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType | ''>('')
	const [advancedSearch, setAdvancedSearch] = useState({
		listing_type: '' as ListingType | '',
		location: '',
		min_price: '',
		max_price: '',
		bedrooms: '',
		bathrooms: '',
		min_area: '',
		max_area: '',
		state_id: undefined as number | undefined,
		city_id: undefined as number | undefined,
		district_id: undefined as number | undefined,
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

	useEffect(() => {
		// Fetch states on component mount
		const fetchStates = async () => {
			try {
				const statesData = await getStates()
				setStates(statesData || [])
			} catch (error) {
				console.error('Error fetching states:', error)
			}
		}
		fetchStates()
	}, [])

	useEffect(() => {
		// Handle state changes for district/city loading
		if (advancedSearch.state_id) {
			const state = states.find(s => s.id === advancedSearch.state_id)
			setSelectedState(state || null)

			if (state?.uses_districts) {
				fetchDistricts(advancedSearch.state_id)
				setCities([])
			} else {
				fetchCities(advancedSearch.state_id)
				setDistricts([])
			}
		} else {
			setSelectedState(null)
			setCities([])
			setDistricts([])
		}
	}, [advancedSearch.state_id, states])

	// Add these fetch functions
	const fetchStates = async () => {
		try {
			const data = await getStates()
			setStates(data || [])
		} catch (error) {
			console.error('Error fetching states:', error)
			setStates([])
		}
	}

	const fetchCities = async (stateId: number) => {
		try {
			const data = await getCitiesByState(stateId)
			setCities(data || [])
		} catch (error) {
			console.error('Error fetching cities:', error)
			setCities([])
		}
	}

	const fetchDistricts = async (stateId: number) => {
		try {
			const data = await getDistrictsByState(stateId)
			setDistricts(data || [])
		} catch (error) {
			console.error('Error fetching districts:', error)
			setDistricts([])
		}
	}

	const handleSimpleSearch = (e: React.FormEvent) => {
		e.preventDefault()
		if (customId.trim()) {
			window.location.href = `/${language}/properties/${customId.trim()}`
		}
	}

	const handleAdvancedSearch = (e: React.FormEvent) => {
		e.preventDefault()
		const params = new URLSearchParams()

		if (selectedPropertyType) params.append('property_type', selectedPropertyType)
		if (advancedSearch.listing_type) params.append('listing_type', advancedSearch.listing_type)
		if (advancedSearch.location) params.append('location', advancedSearch.location)
		if (advancedSearch.min_price) params.append('min_price', advancedSearch.min_price)
		if (advancedSearch.max_price) params.append('max_price', advancedSearch.max_price)
		if (advancedSearch.bedrooms) params.append('bedrooms', advancedSearch.bedrooms)
		if (advancedSearch.bathrooms) params.append('bathrooms', advancedSearch.bathrooms)
		if (advancedSearch.min_area) params.append('min_area', advancedSearch.min_area)
		if (advancedSearch.max_area) params.append('max_area', advancedSearch.max_area)

		window.location.href = `/${language}/properties?${params.toString()}`
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
			state_id: undefined,
			city_id: undefined,
			district_id: undefined,
		})
	}

	const propertyTypes = [
		{
			type: 'house' as PropertyType,
			icon: Home,
			label: t.house,
			color: 'blue',
			gradient: 'from-blue-500 to-blue-600',
		},
		{
			type: 'apartment' as PropertyType,
			icon: Building2,
			label: t.apartment,
			color: 'emerald',
			gradient: 'from-emerald-500 to-emerald-600',
		},
		{
			type: 'commercial' as PropertyType,
			icon: Landmark,
			label: t.commercial,
			color: 'violet',
			gradient: 'from-violet-500 to-violet-600',
		},
		{
			type: 'land' as PropertyType,
			icon: Trees,
			label: t.land,
			color: 'amber',
			gradient: 'from-amber-500 to-amber-600',
		},
	]

	const getPropertyTypeFields = () => {
		switch (selectedPropertyType) {
			case 'house':
			case 'apartment':
				return (
					<>
						{/* Bedrooms */}
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

						{/* Bathrooms */}
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
	



	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<div className='relative h-[600px] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800'>
				<div className='absolute inset-0 bg-black opacity-40'></div>
				<div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
				<div className='relative h-full flex items-center'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
						<div className='text-center text-white'>
							<h1 className='text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg'>
								{t.heroTitle}
							</h1>
							<p className='text-xl md:text-2xl mb-10 opacity-90 drop-shadow-md'>
								{t.heroSubtitle}
							</p>

							{/* Simple Search Form */}
							<div className='max-w-3xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20'>
								<form onSubmit={handleSimpleSearch} className='flex gap-4'>
									<div className='relative flex-1'>
										<Search className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
										<input
											type='text'
											placeholder={t.searchPlaceholder}
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
										{t.search}
									</button>
								</form>

								{/* Advanced Search Toggle */}
								<button
									onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
									className='mt-6 text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center justify-center mx-auto group transition-colors'
								>
									<SlidersHorizontal className='w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-300' />
									{showAdvancedSearch
										? t.hideAdvancedSearch
										: t.showAdvancedSearch}
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
							{t.advancedSearch}
						</h2>
						<p className='text-gray-600 text-lg'>{t.refineSearch}</p>
					</div>

					{/* Property Type Selection */}
					<div className='mb-12'>
						<div className='flex items-center justify-center mb-8'>
							<label className='text-lg font-semibold text-gray-800 mr-4'>
								{t.selectPropertyType}
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
							{propertyTypes.map(
								({ type, icon: Icon, label, color, gradient }) => (
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
									</button>
								)
							)}
						</div>
					</div>

					<form onSubmit={handleAdvancedSearch} className='max-w-7xl mx-auto'>
						{/* Advanced search form content here */}
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
											<option value=''>{t.anyType}</option>
											<option value='sale'>{t.forSale}</option>
											<option value='rent'>{t.forRent}</option>
											<option value='daily_rent'>{t.forDailyRent}</option>
										</select>
										<ChevronDown className='absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none' />
									</div>
								</div>

								<div className='relative group'>
									<label className='block text-sm font-semibold text-gray-700 mb-3'>
										location
									</label>
									<div className='relative'>
										<MapPin className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors' />
										<select
											value={advancedSearch.state_id || ''}
											onChange={e => {
												const stateId = e.target.value
													? parseInt(e.target.value)
													: undefined
												setAdvancedSearch({
													...advancedSearch,
													state_id: stateId,
													city_id: undefined, // Reset city when state changes
													district_id: undefined, // Reset district when state changes
												})
											}}
											className='w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-all duration-200 bg-white shadow-sm appearance-none cursor-pointer'
										>
											<option value=''>{t.allStates}</option>
											{states.map(state => (
												<option key={state.id} value={state.id}>
													{getTranslatedStateName(state.name, language)}
												</option>
											))}
										</select>
										<ChevronDown className='absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none' />
									</div>
								</div>

								{/* District Selection (for states that use districts like Yerevan) */}
								{selectedState?.uses_districts && (
									<div className='relative group'>
										<label className='block text-sm font-semibold text-gray-700 mb-3'>
											districts
										</label>
										<div className='relative'>
											<Building2 className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors' />
											<select
												value={advancedSearch.district_id || ''}
												onChange={e =>
													setAdvancedSearch({
														...advancedSearch,
														district_id: e.target.value
															? parseInt(e.target.value)
															: undefined,
													})
												}
												className='w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-all duration-200 bg-white shadow-sm appearance-none cursor-pointer disabled:bg-gray-50'
												disabled={!advancedSearch.state_id}
											>
												<option value=''>all districts</option>
												{districts.map(district => (
													<option key={district.id} value={district.id}>
														{getTranslatedField(district, 'name', language)}
													</option>
												))}
											</select>
											<ChevronDown className='absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none' />
										</div>
									</div>
								)}

								{/* City Selection (for states that don't use districts) */}
								{selectedState && !selectedState.uses_districts && (
									<div className='relative group'>
										<label className='block text-sm font-semibold text-gray-700 mb-3'>
											city
										</label>
										<div className='relative'>
											<Building2 className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors' />
											<select
												value={advancedSearch.city_id || ''}
												onChange={e =>
													setAdvancedSearch({
														...advancedSearch,
														city_id: e.target.value
															? parseInt(e.target.value)
															: undefined,
													})
												}
												className='w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-all duration-200 bg-white shadow-sm appearance-none cursor-pointer disabled:bg-gray-50'
												disabled={!advancedSearch.state_id}
											>
												<option value=''>{t.allCities}</option>
												{cities.map(city => (
													<option key={city.id} value={city.id}>
														{getTranslatedCityName(city.name, language)}
													</option>
												))}
											</select>
											<ChevronDown className='absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none' />
										</div>
									</div>
								)}

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

								{/* Custom property type fields */}
								{getPropertyTypeFields()}

								{/* Area fields if applicable */}
								{(selectedPropertyType === 'house' ||
									selectedPropertyType === 'apartment' ||
									selectedPropertyType === 'commercial') && (
									<>
										{/* Min Area */}
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

										{/* Max Area */}
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
								{t.clearFilters}
							</button>
							<button
								type='submit'
								className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl px-12 py-4 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5'
							>
								<Search className='w-5 h-5 mr-2' />
								{t.search} {t.properties}
							</button>
						</div>
					</form>
				</div>
			</div>

			{/* Recent Properties */}
			<section className='py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 relative overflow-hidden'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
					<div className='text-center mb-16'>
						<div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl mb-6 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300'>
							<div className='w-10 h-10 bg-white rounded-xl flex items-center justify-center'>
								<span className='text-2xl'>🆕</span>
							</div>
						</div>
						<h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
							{t.recentProperties}
						</h2>
						<p className='mt-4 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
							{t.recentDescription}
						</p>
						<div className='mt-6 inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold'>
							<div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
							<span>{t.updated}</span>
						</div>
					</div>

					{loading ? (
						<div className='flex justify-center items-center h-64'>
							<div className='relative'>
								<div className='animate-spin rounded-full h-16 w-16 border-4 border-green-200'></div>
								<div className='animate-spin rounded-full h-16 w-16 border-t-4 border-green-600 absolute top-0 left-0'></div>
							</div>
						</div>
					) : (
						<>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
								{Array.isArray(recentProperties) &&
									recentProperties.map((property, index) => (
										<div
											key={property.id}
											className='group relative transform hover:-translate-y-2 transition-all duration-300'
											style={{ animationDelay: `${index * 100}ms` }}
										>
											{/* "New" badge */}
											<div className='absolute -top-2 -right-2 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300'>
												{t.new}
											</div>
											<PropertyCard property={property} />
										</div>
									))}
								{Array.isArray(recentProperties) &&
									recentProperties.length === 0 && (
										<div className='col-span-full text-center py-8 text-gray-500'>
											{t.noProperties}
										</div>
									)}
							</div>
						</>
					)}

					<div className='text-center'>
						<Link
							href={`/${language}/properties`}
							className='group inline-flex items-center px-10 py-5 bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg relative overflow-hidden'
						>
							<span className='relative z-10 flex items-center'>
								<span className='mr-3'>🏡</span>
								{t.viewAll} {t.properties}
								<ArrowRight className='ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300' />
							</span>
						</Link>
					</div>
				</div>
			</section>

			{/* Property Types */}
			<section className='py-20 bg-white relative overflow-hidden'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
					<div className='text-center mb-16'>
						<div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl mb-6 shadow-2xl'>
							<div className='w-10 h-10 bg-white rounded-xl flex items-center justify-center'>
								<span className='text-2xl'>🏠</span>
							</div>
						</div>
						<h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
							{t.browseByType}
						</h2>
						<p className='mt-4 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
							{t.browseDescription}
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
						{[
							{
								href: `/${language}/properties?property_type=house`,
								icon: Home,
								title: t.houses,
								description:
									'Find your perfect family home with gardens and privacy',
								color: 'blue',
								gradient: 'from-blue-500 to-blue-600',
								bgPattern: 'from-blue-50 to-blue-100',
								count: '250+' + ' ' + t.availableProperties,
							},
							{
								href: `/${language}/properties?property_type=apartment`,
								icon: Building2,
								title: t.apartments,
								description: 'Modern living spaces in prime urban locations',
								color: 'emerald',
								gradient: 'from-emerald-500 to-emerald-600',
								bgPattern: 'from-emerald-50 to-emerald-100',
								count: '180+' + ' ' + t.availableProperties,
							},
							{
								href: `/${language}/properties?property_type=commercial`,
								icon: Landmark,
								title: t.commercial,
								description: 'Premium business and office spaces for growth',
								color: 'purple',
								gradient: 'from-purple-500 to-purple-600',
								bgPattern: 'from-purple-50 to-purple-100',
								count: '95+' + ' ' + t.availableProperties,
							},
							{
								href: `/${language}/properties?property_type=land`,
								icon: Trees,
								title: t.land,
								description: 'Build your dream project on prime real estate',
								color: 'amber',
								gradient: 'from-amber-500 to-amber-600',
								bgPattern: 'from-amber-50 to-amber-100',
								count: '120+' + ' ' + t.availableProperties,
							},
						].map((item, index) => (
							<Link
								key={item.href}
								href={item.href}
								className='group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 text-center border border-gray-100 hover:border-gray-200 transform hover:-translate-y-3 hover:scale-105'
								style={{ animationDelay: `${index * 100}ms` }}
							>
								<div
									className={`relative z-10 w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl`}
								>
									<item.icon className='w-10 h-10 text-white' />
								</div>

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
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className='py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden'>
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
						{t.readyToFind}
						<span className='block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent'>
							{t.dreamProperty}
						</span>
					</h2>

					{/* Description */}
					<p className='mt-6 text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-10'>
						{t.readyDescription}
					</p>

					{/* Stats row */}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto'>
						<div className='text-center'>
							<div className='text-3xl font-bold text-white mb-2'>24/7</div>
							<div className='text-blue-200 text-sm'>{t.customerSupport}</div>
						</div>
						<div className='text-center'>
							<div className='text-3xl font-bold text-white mb-2'>100%</div>
							<div className='text-blue-200 text-sm'>{t.verifiedListings}</div>
						</div>
						<div className='text-center'>
							<div className='text-3xl font-bold text-white mb-2'>0%</div>
							<div className='text-blue-200 text-sm'>{t.hiddenFees}</div>
						</div>
					</div>

					{/* CTA Buttons */}
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
						<Link
							href={`/${language}/properties`}
							className='group inline-flex items-center px-10 py-5 bg-gradient-to-r from-white to-gray-100 text-blue-900 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 text-lg relative overflow-hidden min-w-[200px]'
						>
							<span className='relative z-10 flex items-center group-hover:text-white transition-colors duration-300'>
								<span className='mr-3'>🏠</span>
								{t.startBrowsing}
								<ArrowRight className='ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300' />
							</span>
						</Link>

						<Link
							href={`/${language}/contact`}
							className='group inline-flex items-center px-10 py-5 border-2 border-white/30 text-white font-semibold rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-lg backdrop-blur-sm min-w-[200px]'
						>
							<span className='mr-3'>📞</span>
							{t.contactExpert}
							<ArrowRight className='ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300' />
						</Link>
					</div>
				</div>
			</section>
		</div>
	)
}