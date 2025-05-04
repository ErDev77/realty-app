// "use client"

// import React, { useEffect, useState } from 'react'
// import {
// 	Search,
// 	Home,
// 	MapPin,
// 	ChevronDown,
// 	Heart,
// 	User,
// 	Building,
// 	Building2,
// 	Store,
// 	Trees,
// 	ArrowRight,
// 	Bed,
// 	Bath,
// 	Square,
// 	ChevronLeft,
// 	ChevronRight,
// 	Filter,
// 	Car,
// 	Wifi,
// 	Zap,
// 	Waves,
// 	Mountain,
// 	Compass,
// 	Shield,
// 	Globe,
// 	Briefcase,
// 	Truck,
// 	Factory,
// 	Warehouse,
//   ChevronUp,
// } from 'lucide-react'
// import Header from './_components/Header'
// import Footer from './_components/Footer'

// // Types
// type PropertyType = 'apartment' | 'house' | 'commerce' | 'territory'
// type TransactionType = 'buy' | 'rent'

// interface PropertyFilter {
// 	propertyType?: PropertyType
// 	transactionType: TransactionType
// 	priceRange?: {
// 		min: number
// 		max: number
// 	}
// 	areaRange?: {
// 		min: number
// 		max: number
// 	}
// 	state?: string
// 	city?: string
// 	bedrooms?: number
// 	bathrooms?: number
// 	features?: string[]
// 	buildingType?: string
// 	condition?: string
// }

// interface Property {
// 	id: string
// 	title: string
// 	type: PropertyType
// 	price: number
// 	area: number
// 	state: string
// 	city: string
// 	address: string
// 	image: string
// 	bedrooms?: number
// 	bathrooms?: number
// 	features?: string[]
// 	buildingType?: string
// 	condition?: string
// }

// // Armenian states and cities
// const armenianStates = [
// 	{ value: 'yerevan', label: 'Երևան' },
// 	{ value: 'aragatsotn', label: 'Արագածոտն' },
// 	{ value: 'ararat', label: 'Արարատ' },
// 	{ value: 'armavir', label: 'Արմավիր' },
// 	{ value: 'gegharkunik', label: 'Գեղարքունիք' },
// 	{ value: 'kotayk', label: 'Կոտայք' },
// 	{ value: 'lori', label: 'Լոռի' },
// 	{ value: 'shirak', label: 'Շիրակ' },
// 	{ value: 'syunik', label: 'Սյունիք' },
// 	{ value: 'tavush', label: 'Տավուշ' },
// 	{ value: 'vayots-dzor', label: 'Վայոց Ձոր' },
// ]

// const citiesByState: { [key: string]: { value: string; label: string }[] } = {
// 	yerevan: [
// 		{ value: 'ajapnyak', label: 'Աջափնյակ' },
// 		{ value: 'arabkir', label: 'Արաբկիր' },
// 		{ value: 'avan', label: 'Ավան' },
// 		{ value: 'davtashen', label: 'Դավթաշեն' },
// 		{ value: 'erebuni', label: 'Էրեբունի' },
// 		{ value: 'kentron', label: 'Կենտրոն' },
// 		{ value: 'malatia-sebastia', label: 'Մալաթիա-Սեբաստիա' },
// 		{ value: 'nork-marash', label: 'Նորք-Մարաշ' },
// 		{ value: 'nor-nork', label: 'Նոր Նորք' },
// 		{ value: 'nubarashen', label: 'Նուբարաշեն' },
// 		{ value: 'shengavit', label: 'Շենգավիթ' },
// 		{ value: 'kanaker-zeytun', label: 'Քանաքեռ-Զեյթուն' },
// 	],
// 	kotayk: [
// 		{ value: 'abovyan', label: 'Աբովյան' },
// 		{ value: 'hrazdan', label: 'Հրազդան' },
// 		{ value: 'charentsavan', label: 'Չարենցավան' },
// 		{ value: 'yeghvard', label: 'Եղվարդ' },
// 		{ value: 'byureghavan', label: 'Բյուրեղավան' },
// 		{ value: 'tsaghkadzor', label: 'Ծաղկաձոր' },
// 	],
// 	shirak: [
// 		{ value: 'gyumri', label: 'Գյումրի' },
// 		{ value: 'artik', label: 'Արթիկ' },
// 		{ value: 'maralik', label: 'Մարալիկ' },
// 	],
// 	lori: [
// 		{ value: 'vanadzor', label: 'Վանաձոր' },
// 		{ value: 'spitak', label: 'Սպիտակ' },
// 		{ value: 'alaverdi', label: 'Ալավերդի' },
// 		{ value: 'stepanavan', label: 'Ստեփանավան' },
// 	],
// 	// Add more cities for other states
// }

// const propertyTypes: {
// 	value: PropertyType
// 	label: string
// 	icon: React.ReactNode
// }[] = [
// 	{ value: 'house', label: 'Տներ', icon: <Home className='h-6 w-6' /> },
// 	{
// 		value: 'apartment',
// 		label: 'Բնակարաններ',
// 		icon: <Building className='h-6 w-6' />,
// 	},
// 	{
// 		value: 'commerce',
// 		label: 'Կոմերցիոն',
// 		icon: <Store className='h-6 w-6' />,
// 	},
// 	{
// 		value: 'territory',
// 		label: 'Հողատարածք',
// 		icon: <Trees className='h-6 w-6' />,
// 	},
// ]

// // Building types and conditions
// const buildingTypes = {
// 	house: [
// 		{ value: 'stone', label: 'Քարե' },
// 		{ value: 'panel', label: 'Պանելային' },
// 		{ value: 'monolith', label: 'Մոնոլիտ' },
// 		{ value: 'brick', label: 'Աղյուսե' },
// 		{ value: 'wood', label: 'Փայտե' },
// 	],
// 	apartment: [
// 		{ value: 'stone', label: 'Քարե' },
// 		{ value: 'panel', label: 'Պանելային' },
// 		{ value: 'monolith', label: 'Մոնոլիտ' },
// 		{ value: 'new-building', label: 'Նորակառույց' },
// 	],
// }

// const conditions = [
// 	{ value: 'excellent', label: 'Գերազանց' },
// 	{ value: 'good', label: 'Լավ' },
// 	{ value: 'renovation-needed', label: 'Վերանորոգման կարիք' },
// 	{ value: 'zero-condition', label: 'Զրոյական' },
// 	{ value: 'under-construction', label: 'Կառուցվող' },
// ]

// // Filter options for different property types
// const filterOptions = {
// 	house: {
// 		features: [
// 			{ id: 'garage', label: 'Ավտոտնակ', icon: <Car className='h-4 w-4' /> },
// 			{ id: 'garden', label: 'Այգի', icon: <Trees className='h-4 w-4' /> },
// 			{ id: 'pool', label: 'Լողավազան', icon: <Waves className='h-4 w-4' /> },
// 			{ id: 'fireplace', label: 'Բուխարի', icon: <Home className='h-4 w-4' /> },
// 			{
// 				id: 'smart-home',
// 				label: 'Խելացի տուն',
// 				icon: <Wifi className='h-4 w-4' />,
// 			},
// 			{
// 				id: 'solar',
// 				label: 'Արևային վահանակներ',
// 				icon: <Zap className='h-4 w-4' />,
// 			},
// 		],
// 		additional: ['Նկուղ', 'Ձեղնահարկ', 'Գրասենյակ', 'Հյուրատուն'],
// 	},
// 	apartment: {
// 		features: [
// 			{
// 				id: 'elevator',
// 				label: 'Վերելակ',
// 				icon: <ArrowRight className='h-4 w-4 rotate-90' />,
// 			},
// 			{
// 				id: 'balcony',
// 				label: 'Պատշգամբ',
// 				icon: <Building2 className='h-4 w-4' />,
// 			},
// 			{ id: 'concierge', label: 'Դռնապան', icon: <User className='h-4 w-4' /> },
// 			{ id: 'gym', label: 'Մարզասրահ', icon: <Heart className='h-4 w-4' /> },
// 			{ id: 'parking', label: 'Կայանատեղի', icon: <Car className='h-4 w-4' /> },
// 			{
// 				id: 'security',
// 				label: 'Անվտանգություն',
// 				icon: <Shield className='h-4 w-4' />,
// 			},
// 		],
// 		additional: ['Պենտհաուս', 'Դուպլեքս', 'Ստուդիա', 'Լոֆտ'],
// 	},
// 	commerce: {
// 		features: [
// 			{
// 				id: 'storefront',
// 				label: 'Ցուցափեղկ',
// 				icon: <Store className='h-4 w-4' />,
// 			},
// 			{
// 				id: 'warehouse',
// 				label: 'Պահեստ',
// 				icon: <Warehouse className='h-4 w-4' />,
// 			},
// 			{
// 				id: 'office',
// 				label: 'Գրասենյակային տարածք',
// 				icon: <Briefcase className='h-4 w-4' />,
// 			},
// 			{
// 				id: 'loading-dock',
// 				label: 'Բեռնման հարթակ',
// 				icon: <Truck className='h-4 w-4' />,
// 			},
// 			{
// 				id: 'high-ceilings',
// 				label: 'Բարձր առաստաղներ',
// 				icon: <Building className='h-4 w-4' />,
// 			},
// 			{
// 				id: 'industrial',
// 				label: 'Արդյունաբերական',
// 				icon: <Factory className='h-4 w-4' />,
// 			},
// 		],
// 		additional: [
// 			'Ռեստորանի համար',
// 			'Բժշկական կենտրոն',
// 			'Խանութի տարածք',
// 			'Խառը օգտագործում',
// 		],
// 	},
// 	territory: {
// 		features: [
// 			{
// 				id: 'waterfront',
// 				label: 'Ջրամերձ',
// 				icon: <Waves className='h-4 w-4' />,
// 			},
// 			{
// 				id: 'mountain-view',
// 				label: 'Լեռնային տեսարան',
// 				icon: <Mountain className='h-4 w-4' />,
// 			},
// 			{
// 				id: 'utilities',
// 				label: 'Կոմունալ ծառայություններ',
// 				icon: <Zap className='h-4 w-4' />,
// 			},
// 			{
// 				id: 'road-access',
// 				label: 'Ճանապարհի հասանելիություն',
// 				icon: <Car className='h-4 w-4' />,
// 			},
// 			{
// 				id: 'zoned',
// 				label: 'Գոտիավորված',
// 				icon: <Compass className='h-4 w-4' />,
// 			},
// 			{
// 				id: 'surveyed',
// 				label: 'Չափագրված',
// 				icon: <Globe className='h-4 w-4' />,
// 			},
// 		],
// 		additional: [
// 			'Գյուղատնտեսական',
// 			'Բնակելի գոտի',
// 			'Առևտրային գոտի',
// 			'Հանգստի գոտի',
// 		],
// 	},
// }

// // Scroll to Top Button Component
// const ScrollToTop: React.FC = () => {
// 	const [isVisible, setIsVisible] = useState(false)

// 	useEffect(() => {
// 		const toggleVisibility = () => {
// 			if (window.pageYOffset > 300) {
// 				setIsVisible(true)
// 			} else {
// 				setIsVisible(false)
// 			}
// 		}

// 		window.addEventListener('scroll', toggleVisibility)

// 		return () => window.removeEventListener('scroll', toggleVisibility)
// 	}, [])

// 	const scrollToTop = () => {
// 		window.scrollTo({
// 			top: 0,
// 			behavior: 'smooth'
// 		})
// 	}

// 	return (
// 		<button
// 			onClick={scrollToTop}
// 			className={`fixed right-8 bottom-8 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 z-50 ${
// 				isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
// 			}`}
// 			aria-label="Scroll to top"
// 		>
// 			<ChevronUp className='h-6 w-6' />
// 		</button>
// 	)
// }

// // Sample data
// const sampleProperties: { [key: string]: Property[] } = {
// 	house: [
// 		{
// 			id: '1',
// 			title: 'Ժամանակակից ընտանեկան տուն',
// 			type: 'house',
// 			price: 120000000,
// 			area: 250,
// 			state: 'yerevan',
// 			city: 'ajapnyak',
// 			address: 'Շինարարների 15',
// 			image: '/api/placeholder/400/300',
// 			bedrooms: 4,
// 			bathrooms: 3,
// 			features: ['garage', 'garden', 'smart-home'],
// 			buildingType: 'monolith',
// 			condition: 'excellent',
// 		},
// 		{
// 			id: '2',
// 			title: 'Շքեղ առանձնատուն',
// 			type: 'house',
// 			price: 250000000,
// 			area: 350,
// 			state: 'yerevan',
// 			city: 'arabkir',
// 			address: 'Կոմիտասի 30',
// 			image: '/api/placeholder/400/300',
// 			bedrooms: 5,
// 			bathrooms: 4,
// 			features: ['pool', 'garden', 'solar'],
// 			buildingType: 'stone',
// 			condition: 'excellent',
// 		},
// 		{
// 			id: '3',
// 			title: 'Հարմարավետ տուն',
// 			type: 'house',
// 			price: 85000000,
// 			area: 180,
// 			state: 'kotayk',
// 			city: 'abovyan',
// 			address: 'Հանրապետության 25',
// 			image: '/api/placeholder/400/300',
// 			bedrooms: 3,
// 			bathrooms: 2,
// 			features: ['garage', 'fireplace'],
// 			buildingType: 'brick',
// 			condition: 'good',
// 		},
// 		{
// 			id: '4',
// 			title: 'Էլիտար կոտեջ',
// 			type: 'house',
// 			price: 350000000,
// 			area: 450,
// 			state: 'kotayk',
// 			city: 'tsaghkadzor',
// 			address: 'Օլիմպիական 10',
// 			image: '/api/placeholder/400/300',
// 			bedrooms: 6,
// 			bathrooms: 5,
// 			features: ['pool', 'smart-home', 'garage'],
// 			buildingType: 'monolith',
// 			condition: 'excellent',
// 		},
// 	],
// 	apartment: [
// 		{
// 			id: '5',
// 			title: 'Կենտրոնի լոֆտ',
// 			type: 'apartment',
// 			price: 95000000,
// 			area: 120,
// 			state: 'yerevan',
// 			city: 'kentron',
// 			address: 'Աբովյան 52',
// 			image: '/api/placeholder/400/300',
// 			bedrooms: 2,
// 			bathrooms: 2,
// 			features: ['balcony', 'gym', 'parking'],
// 			buildingType: 'monolith',
// 			condition: 'excellent',
// 		},
// 		{
// 			id: '6',
// 			title: 'Շքեղ պենտհաուս',
// 			type: 'apartment',
// 			price: 180000000,
// 			area: 200,
// 			state: 'yerevan',
// 			city: 'davtashen',
// 			address: 'Դավիթ Անհաղթ 35',
// 			image: '/api/placeholder/400/300',
// 			bedrooms: 3,
// 			bathrooms: 3,
// 			features: ['elevator', 'concierge', 'security'],
// 			buildingType: 'new-building',
// 			condition: 'excellent',
// 		},
// 		{
// 			id: '7',
// 			title: 'Հարմարավետ ստուդիա',
// 			type: 'apartment',
// 			price: 45000000,
// 			area: 45,
// 			state: 'yerevan',
// 			city: 'shengavit',
// 			address: 'Արշակունյաց 15',
// 			image: '/api/placeholder/400/300',
// 			bedrooms: 1,
// 			bathrooms: 1,
// 			features: ['gym', 'security'],
// 			buildingType: 'panel',
// 			condition: 'good',
// 		},
// 		{
// 			id: '8',
// 			title: 'Ժամանակակից բնակարան',
// 			type: 'apartment',
// 			price: 110000000,
// 			area: 140,
// 			state: 'yerevan',
// 			city: 'arabkir',
// 			address: 'Մամիկոնյանց 20',
// 			image: '/api/placeholder/400/300',
// 			bedrooms: 2,
// 			bathrooms: 2,
// 			features: ['balcony', 'parking', 'elevator'],
// 			buildingType: 'stone',
// 			condition: 'excellent',
// 		},
// 	],
// 	commerce: [
// 		{
// 			id: '9',
// 			title: 'Գրասենյակային շենք',
// 			type: 'commerce',
// 			price: 500000000,
// 			area: 1000,
// 			state: 'yerevan',
// 			city: 'kentron',
// 			address: 'Հյուսիսային պող․ 1',
// 			image: '/api/placeholder/400/300',
// 			features: ['office', 'elevator', 'parking'],
// 		},
// 		{
// 			id: '10',
// 			title: 'Խանութի տարածք',
// 			type: 'commerce',
// 			price: 150000000,
// 			area: 300,
// 			state: 'yerevan',
// 			city: 'arabkir',
// 			address: 'Կոմիտասի 7',
// 			image: '/api/placeholder/400/300',
// 			features: ['storefront', 'high-ceilings'],
// 		},
// 		{
// 			id: '11',
// 			title: 'Ռեստորանի տարածք',
// 			type: 'commerce',
// 			price: 120000000,
// 			area: 250,
// 			state: 'yerevan',
// 			city: 'kentron',
// 			address: 'Աբովյան 15',
// 			image: '/api/placeholder/400/300',
// 			features: ['storefront', 'kitchen'],
// 		},
// 		{
// 			id: '12',
// 			title: 'Պահեստային տարածք',
// 			type: 'commerce',
// 			price: 80000000,
// 			area: 800,
// 			state: 'yerevan',
// 			city: 'shengavit',
// 			address: 'Արտաշիսյան 90',
// 			image: '/api/placeholder/400/300',
// 			features: ['warehouse', 'loading-dock', 'industrial'],
// 		},
// 	],
// 	territory: [
// 		{
// 			id: '13',
// 			title: 'Շինարարական հողատարածք',
// 			type: 'territory',
// 			price: 75000000,
// 			area: 500,
// 			state: 'kotayk',
// 			city: 'abovyan',
// 			address: 'Երևանյան խճ․ 12',
// 			image: '/api/placeholder/400/300',
// 			features: ['utilities', 'road-access', 'zoned'],
// 		},
// 		{
// 			id: '14',
// 			title: 'Գյուղատնտեսական հող',
// 			type: 'territory',
// 			price: 35000000,
// 			area: 1000,
// 			state: 'ararat',
// 			city: 'artashat',
// 			address: 'Արարատյան դաշտ',
// 			image: '/api/placeholder/400/300',
// 			features: ['road-access', 'surveyed'],
// 		},
// 		{
// 			id: '15',
// 			title: 'Ծովափնյա հողամաս',
// 			type: 'territory',
// 			price: 200000000,
// 			area: 300,
// 			state: 'gegharkunik',
// 			city: 'sevan',
// 			address: 'Սևանի ափ',
// 			image: '/api/placeholder/400/300',
// 			features: ['waterfront', 'utilities'],
// 		},
// 		{
// 			id: '16',
// 			title: 'Լեռնային հողատարածք',
// 			type: 'territory',
// 			price: 90000000,
// 			area: 700,
// 			state: 'kotayk',
// 			city: 'tsaghkadzor',
// 			address: 'Ծաղկաձորի լանջեր',
// 			image: '/api/placeholder/400/300',
// 			features: ['mountain-view', 'road-access'],
// 		},
// 	],
// }

// const FilterPanel: React.FC<{
// 	activeType: PropertyType
// 	filters: PropertyFilter
// 	onFilterChange: (filters: PropertyFilter) => void
// }> = ({ activeType, filters, onFilterChange }) => {
// 	const options = filterOptions[activeType]
// 	const [isExpanded, setIsExpanded] = useState(false)

// 	const selectedState = filters.state
// 	const availableCities = selectedState
// 		? citiesByState[selectedState] || []
// 		: []

// 	const toggleFeature = (featureId: string) => {
// 		const currentFeatures = filters.features || []
// 		const newFeatures = currentFeatures.includes(featureId)
// 			? currentFeatures.filter(f => f !== featureId)
// 			: [...currentFeatures, featureId]

// 		onFilterChange({ ...filters, features: newFeatures })
// 	}

// 	const colorClasses = {
// 		house: 'border-blue-600 bg-blue-50 text-blue-600',
// 		apartment: 'border-purple-600 bg-purple-50 text-purple-600',
// 		commerce: 'border-orange-600 bg-orange-50 text-orange-600',
// 		territory: 'border-green-600 bg-green-50 text-green-600',
// 	}

// 	return (
// 		<div className='bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 transition-all duration-300'>
// 			<div className='flex items-center justify-between mb-6'>
// 				<h3 className='text-lg font-semibold flex items-center gap-2'>
// 					<Filter className='h-5 w-5' />
// 					Ֆիլտրեր {propertyTypes.find(t => t.value === activeType)?.label} համար
// 				</h3>
// 				<button
// 					onClick={() => setIsExpanded(!isExpanded)}
// 					className='text-gray-600 hover:text-gray-900'
// 				>
// 					<ChevronDown
// 						className={`h-5 w-5 transition-transform ${
// 							isExpanded ? 'rotate-180' : ''
// 						}`}
// 					/>
// 				</button>
// 			</div>

// 			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6'>
// 				<div>
// 					<label className='block text-sm font-medium text-gray-700 mb-2'>
// 						Մարզ
// 					</label>
// 					<select
// 						className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
// 						value={filters.state || ''}
// 						onChange={e =>
// 							onFilterChange({ ...filters, state: e.target.value, city: '' })
// 						}
// 					>
// 						<option value=''>Բոլոր մարզերը</option>
// 						{armenianStates.map(state => (
// 							<option key={state.value} value={state.value}>
// 								{state.label}
// 							</option>
// 						))}
// 					</select>
// 				</div>

// 				<div>
// 					<label className='block text-sm font-medium text-gray-700 mb-2'>
// 						Քաղաք/Շրջան
// 					</label>
// 					<select
// 						className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
// 						value={filters.city || ''}
// 						onChange={e => onFilterChange({ ...filters, city: e.target.value })}
// 						disabled={!selectedState}
// 					>
// 						<option value=''>Բոլոր քաղաքները</option>
// 						{availableCities.map(city => (
// 							<option key={city.value} value={city.value}>
// 								{city.label}
// 							</option>
// 						))}
// 					</select>
// 				</div>

// 				<div>
// 					<label className='block text-sm font-medium text-gray-700 mb-2'>
// 						Գնի տիրույթ (֏)
// 					</label>
// 					<select className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'>
// 						<option>Բոլոր գները</option>
// 						<option>0 - 50,000,000</option>
// 						<option>50,000,000 - 100,000,000</option>
// 						<option>100,000,000 - 200,000,000</option>
// 						<option>200,000,000+</option>
// 					</select>
// 				</div>

// 				<div>
// 					<label className='block text-sm font-medium text-gray-700 mb-2'>
// 						Մակերես (մ²)
// 					</label>
// 					<select className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'>
// 						<option>Բոլոր չափերը</option>
// 						<option>0 - 50</option>
// 						<option>50 - 100</option>
// 						<option>100 - 200</option>
// 						<option>200+</option>
// 					</select>
// 				</div>

// 				{(activeType === 'house' || activeType === 'apartment') && (
// 					<>
// 						<div>
// 							<label className='block text-sm font-medium text-gray-700 mb-2'>
// 								Շինության տիպը
// 							</label>
// 							<select
// 								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
// 								value={filters.buildingType || ''}
// 								onChange={e =>
// 									onFilterChange({ ...filters, buildingType: e.target.value })
// 								}
// 							>
// 								<option value=''>Բոլորը</option>
// 								{buildingTypes[activeType]?.map(type => (
// 									<option key={type.value} value={type.value}>
// 										{type.label}
// 									</option>
// 								))}
// 							</select>
// 						</div>

// 						<div>
// 							<label className='block text-sm font-medium text-gray-700 mb-2'>
// 								Վիճակը
// 							</label>
// 							<select
// 								className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
// 								value={filters.condition || ''}
// 								onChange={e =>
// 									onFilterChange({ ...filters, condition: e.target.value })
// 								}
// 							>
// 								<option value=''>Բոլոր վիճակները</option>
// 								{conditions.map(condition => (
// 									<option key={condition.value} value={condition.value}>
// 										{condition.label}
// 									</option>
// 								))}
// 							</select>
// 						</div>
// 					</>
// 				)}
// 			</div>

// 			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
// 				{(activeType === 'house' || activeType === 'apartment') && (
// 					<>
// 						<div>
// 							<label className='block text-sm font-medium text-gray-700 mb-2'>
// 								Սենյակներ
// 							</label>
// 							<select className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'>
// 								<option>Բոլորը</option>
// 								<option>1+</option>
// 								<option>2+</option>
// 								<option>3+</option>
// 								<option>4+</option>
// 								<option>5+</option>
// 							</select>
// 						</div>

// 						<div>
// 							<label className='block text-sm font-medium text-gray-700 mb-2'>
// 								Բաղնիքներ
// 							</label>
// 							<select className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'>
// 								<option>Բոլորը</option>
// 								<option>1+</option>
// 								<option>2+</option>
// 								<option>3+</option>
// 								<option>4+</option>
// 							</select>
// 						</div>
// 					</>
// 				)}

// 				{activeType === 'commerce' && (
// 					<>
// 						<div>
// 							<label className='block text-sm font-medium text-gray-700 mb-2'>
// 								Բիզնեսի տեսակ
// 							</label>
// 							<select className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'>
// 								<option>Բոլոր տեսակները</option>
// 								<option>Գրասենյակ</option>
// 								<option>Խանութ</option>
// 								<option>Ռեստորան</option>
// 								<option>Արդյունաբերական</option>
// 							</select>
// 						</div>

// 						<div>
// 							<label className='block text-sm font-medium text-gray-700 mb-2'>
// 								Վարձակալության ժամկետ
// 							</label>
// 							<select className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'>
// 								<option>Բոլորը</option>
// 								<option>Կարճաժամկետ</option>
// 								<option>Երկարաժամկետ</option>
// 								<option>Ճկուն</option>
// 							</select>
// 						</div>
// 					</>
// 				)}

// 				{activeType === 'territory' && (
// 					<>
// 						<div>
// 							<label className='block text-sm font-medium text-gray-700 mb-2'>
// 								Գոտիավորում
// 							</label>
// 							<select className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'>
// 								<option>Բոլոր գոտիները</option>
// 								<option>Բնակելի</option>
// 								<option>Առևտրային</option>
// 								<option>Գյուղատնտեսական</option>
// 								<option>Խառը օգտագործման</option>
// 							</select>
// 						</div>

// 						<div>
// 							<label className='block text-sm font-medium text-gray-700 mb-2'>
// 								Տեղանք
// 							</label>
// 							<select className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'>
// 								<option>Բոլորը</option>
// 								<option>Հարթ</option>
// 								<option>Թեք</option>
// 								<option>Անտառային</option>
// 								<option>Մաքրված</option>
// 							</select>
// 						</div>
// 					</>
// 				)}
// 			</div>

// 			<div className='mb-6'>
// 				<h4 className='text-sm font-medium text-gray-700 mb-3'>
// 					Հարմարություններ
// 				</h4>
// 				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3'>
// 					{options.features.map(feature => (
// 						<button
// 							key={feature.id}
// 							onClick={() => toggleFeature(feature.id)}
// 							className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
// 								filters.features?.includes(feature.id)
// 									? colorClasses[activeType]
// 									: 'border-gray-300 hover:border-gray-400'
// 							}`}
// 						>
// 							{feature.icon}
// 							<span className='text-sm'>{feature.label}</span>
// 						</button>
// 					))}
// 				</div>
// 			</div>

// 			{isExpanded && (
// 				<div className='border-t pt-6'>
// 					<h4 className='text-sm font-medium text-gray-700 mb-3'>
// 						Լրացուցիչ տարբերակներ
// 					</h4>
// 					<div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
// 						{options.additional.map(option => (
// 							<label key={option} className='flex items-center gap-2'>
// 								<input
// 									type='checkbox'
// 									className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
// 								/>
// 								<span className='text-sm text-gray-700'>{option}</span>
// 							</label>
// 						))}
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	)
// }

// const HeroSection: React.FC = () => {
// 	const [filters, setFilters] = useState<PropertyFilter>({
// 		transactionType: 'buy',
// 		propertyType: 'house',
// 		features: [],
// 	})

// 	const handlePropertyTypeChange = (type: PropertyType) => {
// 		setFilters(prev => ({ ...prev, propertyType: type, features: [] }))
// 	}

// 	return (
// 		<div className='relative bg-gradient-to-r from-blue-600 to-blue-700 pt-24 pb-32'>
// 			<div className='absolute inset-0 overflow-hidden'>
// 				<img
// 					src='/api/placeholder/1920/800'
// 					alt='Hero background'
// 					className='w-full h-full object-cover opacity-20'
// 				/>
// 			</div>

// 			<div className='relative container mx-auto px-4'>
// 				<div className='text-center mb-12'>
// 					<h1 className='text-5xl md:text-6xl font-bold text-white mb-6'>
// 						Գտեք ձեր երազանքի գույքը
// 					</h1>
// 					<p className='text-xl text-blue-100 max-w-2xl mx-auto'>
// 						Բացահայտեք տներ, բնակարաններ, կոմերցիոն տարածքներ և հողատարածքներ
// 						մեր համապարփակ անշարժ գույքի հարթակի միջոցով
// 					</p>
// 				</div>

// 				<div className='max-w-6xl mx-auto'>
// 					<div className='bg-white rounded-2xl shadow-2xl p-8 mb-8'>
// 						<div className='flex justify-center mb-8'>
// 							<div className='inline-flex rounded-lg border border-gray-200 p-1'>
// 								<button
// 									onClick={() =>
// 										setFilters(prev => ({ ...prev, transactionType: 'buy' }))
// 									}
// 									className={`px-6 py-2 rounded-lg font-medium transition-colors ${
// 										filters.transactionType === 'buy'
// 											? 'bg-blue-600 text-white'
// 											: 'text-gray-700 hover:bg-gray-100'
// 									}`}
// 								>
// 									Գնել
// 								</button>
// 								<button
// 									onClick={() =>
// 										setFilters(prev => ({ ...prev, transactionType: 'rent' }))
// 									}
// 									className={`px-6 py-2 rounded-lg font-medium transition-colors ${
// 										filters.transactionType === 'rent'
// 											? 'bg-blue-600 text-white'
// 											: 'text-gray-700 hover:bg-gray-100'
// 									}`}
// 								>
// 									Վարձակալել
// 								</button>
// 							</div>
// 						</div>

// 						<div className='flex flex-wrap justify-center gap-4 mb-8'>
// 							{propertyTypes.map(({ value, label, icon }) => (
// 								<button
// 									key={value}
// 									onClick={() => handlePropertyTypeChange(value)}
// 									className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-all ${
// 										filters.propertyType === value
// 											? 'border-blue-600 bg-blue-50 text-blue-600 shadow-lg transform scale-105'
// 											: 'border-gray-200 hover:border-blue-400 text-gray-700 hover:shadow-md'
// 									}`}
// 								>
// 									{icon}
// 									{label}
// 								</button>
// 							))}
// 						</div>

// 						<div className='flex flex-col md:flex-row gap-4 mb-8'>
// 							<div className='flex-1 relative'>
// 								<MapPin className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
// 								<input
// 									type='text'
// 									placeholder='Որոնել ըստ հասցեի, շրջանի կամ բանալի բառի'
// 									className='w-full pl-10 pr-4 py-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
// 								/>
// 							</div>
// 							<button className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2'>
// 								<Search className='h-5 w-5' />
// 								Որոնել
// 							</button>
// 						</div>
// 					</div>

// 					{filters.propertyType && (
// 						<FilterPanel
// 							activeType={filters.propertyType}
// 							filters={filters}
// 							onFilterChange={setFilters}
// 						/>
// 					)}
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
// 	const stateLabel =
// 		armenianStates.find(s => s.value === property.state)?.label ||
// 		property.state
// 	const cityLabel =
// 		citiesByState[property.state]?.find(c => c.value === property.city)
// 			?.label || property.city

// 	return (
// 		<div className='bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300'>
// 			<div className='relative overflow-hidden'>
// 				<img
// 					src={property.image}
// 					alt={property.title}
// 					className='w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300'
// 				/>
// 				<div className='absolute top-4 right-4'>
// 					<button className='bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors'>
// 						<Heart className='h-5 w-5 text-gray-700' />
// 					</button>
// 				</div>
// 				{property.features && property.features.length > 0 && (
// 					<div className='absolute bottom-4 left-4 flex gap-2'>
// 						{property.features.slice(0, 3).map(feature => (
// 							<span
// 								key={feature}
// 								className='bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium'
// 							>
// 								{filterOptions[property.type].features.find(
// 									f => f.id === feature
// 								)?.label || feature}
// 							</span>
// 						))}
// 					</div>
// 				)}
// 			</div>
// 			<div className='p-6'>
// 				<h3 className='text-xl font-semibold mb-2 text-gray-700'>{property.title}</h3>
// 				<p className='text-gray-600 mb-2 flex items-center gap-2'>
// 					<MapPin className='h-4 w-4' />
// 					{stateLabel}, {cityLabel}
// 				</p>
// 				<p className='text-sm text-gray-500 mb-4'>{property.address}</p>
// 				<div className='flex items-center justify-between mb-4'>
// 					<p className='text-2xl font-bold text-blue-600'>
// 						{property.price.toLocaleString('hy-AM')} ֏
// 					</p>
// 					<p className='text-gray-600 flex items-center gap-1'>
// 						<Square className='h-4 w-4' />
// 						{property.area} մ²
// 					</p>
// 				</div>
// 				{property.bedrooms && property.bathrooms && (
// 					<div className='flex items-center gap-4 text-gray-600'>
// 						<div className='flex items-center gap-1'>
// 							<Bed className='h-4 w-4' />
// 							{property.bedrooms} սենյակ
// 						</div>
// 						<div className='flex items-center gap-1'>
// 							<Bath className='h-4 w-4' />
// 							{property.bathrooms} բաղնիք
// 						</div>
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	)
// }

// const PropertySection: React.FC<{
// 	title: string
// 	icon: React.ReactNode
// 	properties: Property[]
// 	bgGradient: string
// 	propertyType: PropertyType
// }> = ({ title, icon, properties, bgGradient, propertyType }) => {
// 	const [currentSlide, setCurrentSlide] = useState(0)
// 	const itemsPerSlide = 3
// 	const totalSlides = Math.ceil(properties.length / itemsPerSlide)

// 	const nextSlide = () => {
// 		setCurrentSlide(prev => (prev + 1) % totalSlides)
// 	}

// 	const prevSlide = () => {
// 		setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides)
// 	}

// 	const visibleProperties = properties.slice(
// 		currentSlide * itemsPerSlide,
// 		(currentSlide + 1) * itemsPerSlide
// 	)

// 	return (
// 		<section
// 			className={`py-20 ${
// 				bgGradient ||
// 				// Using a subtle alternating background pattern
// 				propertyType === 'house' ||
// 				propertyType === 'commerce'
// 					? 'bg-gradient-to-br from-slate-50 to-gray-100'
// 					: 'bg-gradient-to-br from-gray-100 to-slate-50'
// 			}`}
// 		>
// 			<div className='container mx-auto px-4'>
// 				<div className='flex items-center justify-between mb-12'>
// 					<div className='flex items-center gap-4'>
// 						<div className='p-3 bg-white rounded-xl shadow-lg'>{icon}</div>
// 						<h2 className='text-3xl font-bold text-gray-700'>{title}</h2>
// 					</div>
// 					<div className='flex items-center gap-2'>
// 						<button
// 							onClick={prevSlide}
// 							className='p-2 bg-white/80 hover:bg-white rounded-lg shadow-sm transition-all hover:shadow-md'
// 							disabled={currentSlide === 0}
// 						>
// 							<ChevronLeft className='h-6 w-6 text-gray-700' />
// 						</button>
// 						<button
// 							onClick={nextSlide}
// 							className='p-2 bg-white/80 hover:bg-white rounded-lg shadow-sm transition-all hover:shadow-md'
// 							disabled={currentSlide === totalSlides - 1}
// 						>
// 							<ChevronRight className='h-6 w-6 text-gray-700' />
// 						</button>
// 					</div>
// 				</div>

// 				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
// 					{visibleProperties.map(property => (
// 						<PropertyCard key={property.id} property={property} />
// 					))}
// 				</div>

// 				<div className='text-center mt-12'>
// 					<button className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2 shadow-lg hover:shadow-xl'>
// 						Տեսնել բոլոր {title.toLowerCase()}ը
// 						<ArrowRight className='h-5 w-5' />
// 					</button>
// 				</div>
// 			</div>
// 		</section>
// 	)
// }

// const HomePage: React.FC = () => {
// 	return (
// 		<div className='min-h-screen'>
// 			<Header />
// 			<main>
// 				<HeroSection />
// 				<ScrollToTop />
// 				<PropertySection
// 					title='Տներ'
// 					icon={<Home className='h-8 w-8 text-blue-600' />}
// 					properties={sampleProperties.house}
// 					bgGradient=''
// 					propertyType='house'
// 				/>

// 				<PropertySection
// 					title='Բնակարաններ'
// 					icon={<Building className='h-8 w-8 text-blue-600' />}
// 					properties={sampleProperties.apartment}
// 					bgGradient=''
// 					propertyType='apartment'
// 				/>

// 				<PropertySection
// 					title='Կոմերցիոն գույք'
// 					icon={<Store className='h-8 w-8 text-blue-600' />}
// 					properties={sampleProperties.commerce}
// 					bgGradient=''
// 					propertyType='commerce'
// 				/>

// 				<PropertySection
// 					title='Հողատարածքներ'
// 					icon={<Trees className='h-8 w-8 text-blue-600' />}
// 					properties={sampleProperties.territory}
// 					bgGradient=''
// 					propertyType='territory'
// 				/>
// 			</main>
// 			<Footer />
// 		</div>
// 	)
// }

// export default HomePage


// src/app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import PropertyCard from './_components/PropertyCard'
import { Property } from '@/types/property'
import { getFeaturedProperties, getRecentProperties } from '@/services/propertyService'
import { Search, Home, Building2, Landmark, Trees, ArrowRight } from 'lucide-react'

export default function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([])
  const [recentProperties, setRecentProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  // Search form state
  const [searchForm, setSearchForm] = useState({
    property_type: '',
    listing_type: '',
    location: ''
  })

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const [featured, recent] = await Promise.all([
          getFeaturedProperties(),
          getRecentProperties(8)
        ])
        setFeaturedProperties(featured)
        setRecentProperties(recent)
      } catch (error) {
        console.error('Error fetching properties:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Build query parameters
    const params = new URLSearchParams()
    if (searchForm.property_type) params.append('property_type', searchForm.property_type)
    if (searchForm.listing_type) params.append('listing_type', searchForm.listing_type)
    if (searchForm.location) params.append('location', searchForm.location)
    
    // Navigate to properties page with search params
    window.location.href = `/properties?${params.toString()}`
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px] bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Find Your Dream Property
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Discover the perfect home from our extensive collection
              </p>

              {/* Search Form */}
              <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <select
                    value={searchForm.property_type}
                    onChange={(e) => setSearchForm({ ...searchForm, property_type: e.target.value })}
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Property Type</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="commercial">Commercial</option>
                    <option value="land">Land</option>
                  </select>

                  <select
                    value={searchForm.listing_type}
                    onChange={(e) => setSearchForm({ ...searchForm, listing_type: e.target.value })}
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Listing Type</option>
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                    <option value="daily_rent">Daily Rent</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Location"
                    value={searchForm.location}
                    onChange={(e) => setSearchForm({ ...searchForm, location: e.target.value })}
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />

                  <button
                    type="submit"
                    className="bg-blue-600 text-white rounded-lg px-6 py-3 hover:bg-blue-700 flex items-center justify-center"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
            <p className="mt-4 text-xl text-gray-600">Handpicked properties for you</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/properties?featured=true"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              View All Featured Properties
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Browse by Property Type</h2>
            <p className="mt-4 text-xl text-gray-600">Find the perfect property that suits your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link
              href="/properties?property_type=house"
              className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Home className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Houses</h3>
              <p className="mt-2 text-gray-600">Find your perfect family home</p>
            </Link>

            <Link
              href="/properties?property_type=apartment"
              className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Building2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Apartments</h3>
              <p className="mt-2 text-gray-600">Modern living spaces</p>
            </Link>

            <Link
              href="/properties?property_type=commercial"
              className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Landmark className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Commercial</h3>
              <p className="mt-2 text-gray-600">Business and office spaces</p>
            </Link>

            <Link
              href="/properties?property_type=land"
              className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <Trees className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Land</h3>
              <p className="mt-2 text-gray-600">Build your dream project</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Recent Properties</h2>
            <p className="mt-4 text-xl text-gray-600">Latest additions to our collection</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {recentProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/properties"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              View All Properties
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Find Your Dream Property?</h2>
          <p className="mt-4 text-xl text-blue-100">Browse through our extensive collection of properties</p>
          <div className="mt-8">
            <Link
              href="/properties"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
            >
              Start Browsing
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}