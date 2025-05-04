// src/app/properties/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Property } from '@/types/property'
import { getPropertyByCustomId, submitInquiry } from '@/services/propertyService'
import {
	MapPin,
	Bed,
	Bath,
	Maximize,
	Car,
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
} from 'lucide-react'
import Link from 'next/link'


export default function PropertyDetailPage() {
	const params = useParams()
	const [property, setProperty] = useState<Property | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [selectedImage, setSelectedImage] = useState(0)
	const [showInquiryForm, setShowInquiryForm] = useState(false)
	const [inquiryForm, setInquiryForm] = useState({
		name: '',
		email: '',
		phone: '',
		message: '',
	})
	const [submitting, setSubmitting] = useState(false)

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

	const handleInquirySubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!property) return

		setSubmitting(true)
		try {
			await submitInquiry({
				propertyId: property.id,
				...inquiryForm,
			})

			// Reset form and close modal
			setInquiryForm({ name: '', email: '', phone: '', message: '' })
			setShowInquiryForm(false)
			alert('Inquiry submitted successfully!')
		} catch (err) {
			console.error('Error submitting inquiry:', err)
			alert('Failed to submit inquiry. Please try again.')
		} finally {
			setSubmitting(false)
		}
	}

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<Loader2 className='w-8 h-8 animate-spin text-blue-600' />
			</div>
		)
	}

	if (error || !property) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<p className='text-red-600 text-lg'>
						{error || 'Property not found'}
					</p>
					<Link
						href='/properties'
						className='mt-4 inline-block text-blue-600 hover:underline'
					>
						Back to properties
					</Link>
				</div>
			</div>
		)
	}

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

	const propertyTypeIcons = {
		house: Home,
		apartment: Building2,
		commercial: Landmark,
		land: Trees,
	}

	const PropertyIcon = propertyTypeIcons[property.property_type]

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Image Gallery */}
			<div className='bg-black'>
				<div className='max-w-7xl mx-auto'>
					<div className='relative h-[60vh]'>
						{property.images && property.images.length > 0 ? (
							<Image
								src={property.images[selectedImage].url}
								alt={property.title}
								fill
								className='object-cover'
							/>
						) : (
							<div className='w-full h-full bg-gray-300 flex items-center justify-center'>
								<span className='text-gray-500'>No images available</span>
							</div>
						)}
					</div>

					{property.images && property.images.length > 1 && (
						<div className='flex overflow-x-auto py-4 px-4 gap-2'>
							{property.images.map((image, index) => (
								<button
									key={image.id}
									onClick={() => setSelectedImage(index)}
									className={`relative w-24 h-24 flex-shrink-0 ${
										selectedImage === index ? 'ring-2 ring-blue-500' : ''
									}`}
								>
									<Image
										src={image.url}
										alt={`${property.title} - ${index + 1}`}
										fill
										className='object-cover'
									/>
								</button>
							))}
						</div>
					)}
				</div>
			</div>

			{/* Property Details */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Main Content */}
					<div className='lg:col-span-2 space-y-8'>
						{/* Title and Price */}
						<div>
							<div className='flex items-center justify-between'>
								<h1 className='text-3xl font-bold text-gray-900'>
									{property.title}
								</h1>
								<div className='flex space-x-2'>
									<button className='p-2 border rounded-lg hover:bg-gray-50'>
										<Share2 className='w-5 h-5' />
									</button>
									<button className='p-2 border rounded-lg hover:bg-gray-50'>
										<Heart className='w-5 h-5' />
									</button>
								</div>
							</div>

							<div className='mt-2 flex items-center text-gray-600'>
								<MapPin className='w-5 h-5 mr-2' />
								<span>
									{property.address}, {property.city?.name},{' '}
									{property.state?.name}
								</span>
							</div>

							<div className='mt-4 flex items-center justify-between'>
								<div className='text-3xl font-bold text-blue-600'>
									{formatPrice(property.price, property.listing_type)}
								</div>
								<div className='flex items-center space-x-2'>
									<PropertyIcon className='w-6 h-6 text-gray-500' />
									<span className='text-gray-600'>
										{property.property_type.charAt(0).toUpperCase() +
											property.property_type.slice(1)}
									</span>
								</div>
							</div>
						</div>

						{/* Key Features */}
						<div className='bg-white rounded-lg shadow p-6'>
							<h2 className='text-xl font-semibold mb-4'>Key Features</h2>
							<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
								{'attributes' in property &&
									property.property_type !== 'land' && (
										<>
											{'bedrooms' in property.attributes && (
												<div className='flex items-center'>
													<Bed className='w-5 h-5 text-gray-500 mr-2' />
													<span>{property.attributes.bedrooms} Bedrooms</span>
												</div>
											)}
											{'bathrooms' in property.attributes && (
												<div className='flex items-center'>
													<Bath className='w-5 h-5 text-gray-500 mr-2' />
													<span>{property.attributes.bathrooms} Bathrooms</span>
												</div>
											)}
											{'area_sqft' in property.attributes && (
												<div className='flex items-center'>
													<Maximize className='w-5 h-5 text-gray-500 mr-2' />
													<span>{property.attributes.area_sqft} sq ft</span>
												</div>
											)}
											{'garage_spaces' in property.attributes && (
												<div className='flex items-center'>
													<Car className='w-5 h-5 text-gray-500 mr-2' />
													<span>
														{property.attributes.garage_spaces} Garage
													</span>
												</div>
											)}
											{'parking_spaces' in property.attributes && (
												<div className='flex items-center'>
													<Car className='w-5 h-5 text-gray-500 mr-2' />
													<span>
														{property.attributes.parking_spaces} Parking
													</span>
												</div>
											)}
											{'year_built' in property.attributes &&
												property.attributes.year_built && (
													<div className='flex items-center'>
														<Calendar className='w-5 h-5 text-gray-500 mr-2' />
														<span>Built {property.attributes.year_built}</span>
													</div>
												)}
										</>
									)}

								{'attributes' in property &&
									property.property_type === 'land' && (
										<div className='flex items-center'>
											<Maximize className='w-5 h-5 text-gray-500 mr-2' />
											<span>{property.attributes.area_acres} acres</span>
										</div>
									)}
							</div>
						</div>

						{/* Description */}
						<div className='bg-white rounded-lg shadow p-6'>
							<h2 className='text-xl font-semibold mb-4'>Description</h2>
							<p className='text-gray-700 whitespace-pre-line'>
								{property.description}
							</p>
						</div>

						{/* Additional Details */}
						<div className='bg-white rounded-lg shadow p-6'>
							<h2 className='text-xl font-semibold mb-4'>Property Details</h2>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								{'attributes' in property &&
									property.property_type === 'house' && (
										<>
											<div>
												<h3 className='font-medium text-gray-900'>
													Interior Features
												</h3>
												<ul className='mt-2 space-y-1 text-gray-600'>
													<li>
														Heating: {property.attributes.heating_type || 'N/A'}
													</li>
													<li>
														Cooling: {property.attributes.cooling_type || 'N/A'}
													</li>
													<li>
														Basement:{' '}
														{property.attributes.basement ? 'Yes' : 'No'}
													</li>
													<li>Floors: {property.attributes.floors || 'N/A'}</li>
												</ul>
											</div>
											<div>
												<h3 className='font-medium text-gray-900'>
													Exterior Features
												</h3>
												<ul className='mt-2 space-y-1 text-gray-600'>
													<li>
														Lot Size:{' '}
														{property.attributes.lot_size_sqft
															? `${property.attributes.lot_size_sqft} sq ft`
															: 'N/A'}
													</li>
													<li>
														Roof Type: {property.attributes.roof_type || 'N/A'}
													</li>
												</ul>
											</div>
										</>
									)}

								{'attributes' in property &&
									property.property_type === 'apartment' && (
										<>
											<div>
												<h3 className='font-medium text-gray-900'>
													Building Features
												</h3>
												<ul className='mt-2 space-y-1 text-gray-600'>
													<li>
														Floor: {property.attributes.floor} of{' '}
														{property.attributes.total_floors}
													</li>
													<li>
														Building:{' '}
														{property.attributes.building_name || 'N/A'}
													</li>
													<li>
														Unit: {property.attributes.unit_number || 'N/A'}
													</li>
												</ul>
											</div>
											<div>
												<h3 className='font-medium text-gray-900'>Amenities</h3>
												<ul className='mt-2 space-y-1 text-gray-600'>
													<li className='flex items-center'>
														{property.attributes.balcony ? (
															<Check className='w-4 h-4 text-green-500 mr-2' />
														) : (
															<X className='w-4 h-4 text-red-500 mr-2' />
														)}
														Balcony
													</li>
													<li className='flex items-center'>
														{property.attributes.elevator ? (
															<Check className='w-4 h-4 text-green-500 mr-2' />
														) : (
															<X className='w-4 h-4 text-red-500 mr-2' />
														)}
														Elevator
													</li>
													<li className='flex items-center'>
														{property.attributes.security_system ? (
															<Check className='w-4 h-4 text-green-500 mr-2' />
														) : (
															<X className='w-4 h-4 text-red-500 mr-2' />
														)}
														Security System
													</li>
													<li className='flex items-center'>
														{property.attributes.pet_friendly ? (
															<Check className='w-4 h-4 text-green-500 mr-2' />
														) : (
															<X className='w-4 h-4 text-red-500 mr-2' />
														)}
														Pet Friendly
													</li>
												</ul>
											</div>
										</>
									)}

								{'attributes' in property &&
									property.property_type === 'commercial' && (
										<>
											<div>
												<h3 className='font-medium text-gray-900'>
													Business Details
												</h3>
												<ul className='mt-2 space-y-1 text-gray-600'>
													<li>
														Type: {property.attributes.business_type || 'N/A'}
													</li>
													<li>
														Zoning: {property.attributes.zoning_type || 'N/A'}
													</li>
													<li>
														Ceiling Height:{' '}
														{property.attributes.ceiling_height
															? `${property.attributes.ceiling_height} ft`
															: 'N/A'}
													</li>
												</ul>
											</div>
											<div>
												<h3 className='font-medium text-gray-900'>
													Facilities
												</h3>
												<ul className='mt-2 space-y-1 text-gray-600'>
													<li className='flex items-center'>
														{property.attributes.loading_dock ? (
															<Check className='w-4 h-4 text-green-500 mr-2' />
														) : (
															<X className='w-4 h-4 text-red-500 mr-2' />
														)}
														Loading Dock
													</li>
													<li>
														Parking Spaces: {property.attributes.parking_spaces}
													</li>
												</ul>
											</div>
										</>
									)}

								{'attributes' in property &&
									property.property_type === 'land' && (
										<>
											<div>
												<h3 className='font-medium text-gray-900'>
													Land Features
												</h3>
												<ul className='mt-2 space-y-1 text-gray-600'>
													<li>
														Zoning: {property.attributes.zoning_type || 'N/A'}
													</li>
													<li>
														Topography:{' '}
														{property.attributes.topography || 'N/A'}
													</li>
													<li>
														Soil Type: {property.attributes.soil_type || 'N/A'}
													</li>
												</ul>
											</div>
											<div>
												<h3 className='font-medium text-gray-900'>
													Utilities & Access
												</h3>
												<ul className='mt-2 space-y-1 text-gray-600'>
													<li className='flex items-center'>
														{property.attributes.road_access ? (
															<Check className='w-4 h-4 text-green-500 mr-2' />
														) : (
															<X className='w-4 h-4 text-red-500 mr-2' />
														)}
														Road Access
													</li>
													<li className='flex items-center'>
														{property.attributes.utilities_available ? (
															<Check className='w-4 h-4 text-green-500 mr-2' />
														) : (
															<X className='w-4 h-4 text-red-500 mr-2' />
														)}
														Utilities Available
													</li>
													<li className='flex items-center'>
														{property.attributes.is_fenced ? (
															<Check className='w-4 h-4 text-green-500 mr-2' />
														) : (
															<X className='w-4 h-4 text-red-500 mr-2' />
														)}
														Fenced
													</li>
													<li className='flex items-center'>
														{property.attributes.water_rights ? (
															<Check className='w-4 h-4 text-green-500 mr-2' />
														) : (
															<X className='w-4 h-4 text-red-500 mr-2' />
														)}
														Water Rights
													</li>
													<li className='flex items-center'>
														{property.attributes.mineral_rights ? (
															<Check className='w-4 h-4 text-green-500 mr-2' />
														) : (
															<X className='w-4 h-4 text-red-500 mr-2' />
														)}
														Mineral Rights
													</li>
												</ul>
											</div>
										</>
									)}
							</div>
						</div>

						{/* Features & Amenities */}
						{property.features && property.features.length > 0 && (
							<div className='bg-white rounded-lg shadow p-6'>
								<h2 className='text-xl font-semibold mb-4'>
									Features & Amenities
								</h2>
								<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
									{property.features.map(feature => (
										<div key={feature.id} className='flex items-center'>
											<Check className='w-5 h-5 text-green-500 mr-2' />
											<span>{feature.name}</span>
										</div>
									))}
								</div>
							</div>
						)}
					</div>

					{/* Sidebar */}
					<div className='lg:col-span-1'>
						<div className='sticky top-4 space-y-4'>
							{/* Contact Card */}
							<div className='bg-white rounded-lg shadow p-6'>
								<h3 className='text-lg font-semibold mb-4'>Contact Agent</h3>

								{/* {property.user && (
									<div className='mb-4'>
										<p className='font-medium'>
											{property.user.name || 'Real Estate Agent'}
										</p>
										{property.user.agency_name && (
											<p className='text-sm text-gray-600'>
												{property.user.agency_name}
											</p>
										)}
									</div>
								)} */}

								<button
									onClick={() => setShowInquiryForm(true)}
									className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mb-3'
								>
									Send Message
								</button>

								{/* {property.user?.phone && (
									<a
										href={`tel:${property.user.phone}`}
										className='flex items-center justify-center w-full border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 mb-3'
									>
										<Phone className='w-4 h-4 mr-2' />
										Call Agent
									</a>
								)}

								{property.user?.email && (
									<a
										href={`mailto:${property.user.email}`}
										className='flex items-center justify-center w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50'
									>
										<Mail className='w-4 h-4 mr-2' />
										Email Agent
									</a>
								)}
							</div> */}

							{/* Property Stats */}
							<div className='bg-white rounded-lg shadow p-6'>
								<h3 className='text-lg font-semibold mb-4'>Property Stats</h3>
								<div className='space-y-3'>
									<div className='flex justify-between'>
										<span className='text-gray-600'>Views</span>
										<span className='font-medium'>{property.views}</span>
									</div>
									<div className='flex justify-between'>
										<span className='text-gray-600'>Listed</span>
										<span className='font-medium'>
											{new Date(property.created_at).toLocaleDateString()}
										</span>
									</div>
									<div className='flex justify-between'>
										<span className='text-gray-600'>Status</span>
										<span className='font-medium capitalize'>
											{property.status}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Inquiry Modal */}
			{showInquiryForm && (
				<div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
					<div className='bg-white rounded-lg max-w-md w-full p-6'>
						<div className='flex justify-between items-center mb-4'>
							<h3 className='text-lg font-semibold'>Send Inquiry</h3>
							<button
								onClick={() => setShowInquiryForm(false)}
								className='text-gray-400 hover:text-gray-600'
							>
								<X className='w-6 h-6' />
							</button>
						</div>

						<form onSubmit={handleInquirySubmit}>
							<div className='space-y-4'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Name *
									</label>
									<input
										type='text'
										required
										value={inquiryForm.name}
										onChange={e =>
											setInquiryForm({ ...inquiryForm, name: e.target.value })
										}
										className='w-full border border-gray-300 rounded-lg px-3 py-2'
									/>
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Email *
									</label>
									<input
										type='email'
										required
										value={inquiryForm.email}
										onChange={e =>
											setInquiryForm({ ...inquiryForm, email: e.target.value })
										}
										className='w-full border border-gray-300 rounded-lg px-3 py-2'
									/>
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Phone
									</label>
									<input
										type='tel'
										value={inquiryForm.phone}
										onChange={e =>
											setInquiryForm({ ...inquiryForm, phone: e.target.value })
										}
										className='w-full border border-gray-300 rounded-lg px-3 py-2'
									/>
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Message *
									</label>
									<textarea
										required
										rows={4}
										value={inquiryForm.message}
										onChange={e =>
											setInquiryForm({
												...inquiryForm,
												message: e.target.value,
											})
										}
										className='w-full border border-gray-300 rounded-lg px-3 py-2'
										placeholder="I'm interested in this property..."
									/>
								</div>
							</div>

							<div className='mt-6 flex justify-end space-x-3'>
								<button
									type='button'
									onClick={() => setShowInquiryForm(false)}
									className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50'
								>
									Cancel
								</button>
								<button
									type='submit'
									disabled={submitting}
									className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50'
								>
									{submitting ? 'Sending...' : 'Send Inquiry'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
        </div>
	)
}
