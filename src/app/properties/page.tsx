import { Metadata } from 'next'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import PropertiesContent from './PropertiesContent'
import { generateLocationMetadata } from '@/utils/seo'

interface PropertiesPageProps {
	searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
	searchParams,
}: PropertiesPageProps): Promise<Metadata> {
	const propertyType = searchParams.property_type as string
	const listingType = searchParams.listing_type as string
	const stateId = searchParams.state_id as string
	const cityId = searchParams.city_id as string

	// You might want to fetch actual state/city names here
	const { title, description, keywords } = generateLocationMetadata({
		type: propertyType,
		// You would fetch these from your API based on IDs
		// state: stateName,
		// city: cityName,
	})

	let canonicalUrl = 'https://chancerealty.am/properties'
	const params = new URLSearchParams()
	if (propertyType) params.append('property_type', propertyType)
	if (listingType) params.append('listing_type', listingType)
	if (stateId) params.append('state_id', stateId)
	if (cityId) params.append('city_id', cityId)

	if (params.toString()) {
		canonicalUrl += `?${params.toString()}`
	}

	return {
		title,
		description,
		keywords,
		openGraph: {
			title,
			description,
			images: ['/images/og-properties.jpg'],
			url: canonicalUrl,
		},
		alternates: {
			canonical: canonicalUrl,
		},
	}
}

function LoadingFallback() {
	return (
		<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
			<Loader2 className='w-8 h-8 animate-spin text-blue-600' />
		</div>
	)
}

export default function PropertiesPage({ searchParams }: PropertiesPageProps) {
	const breadcrumbSchema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Home',
				item: 'https://chancerealty.am',
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: 'Properties',
				item: 'https://chancerealty.am/properties',
			},
		],
	}

	return (
		<>
			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(breadcrumbSchema),
				}}
			/>

			<Suspense fallback={<LoadingFallback />}>
				<PropertiesContent />
			</Suspense>
		</>
	)
}
