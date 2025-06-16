// src/app/[locale]/properties/page.tsx - Fixed
import { Metadata } from 'next'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import PropertiesContent from './PropertiesContent'
import { generateLocationMetadata } from '@/utils/seo'

interface PropertiesPageProps {
	params: Promise<{ locale: string }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({
	params,
	searchParams,
}: PropertiesPageProps): Promise<Metadata> {
	// ✅ FIX: Properly await both params and searchParams
	const { locale } = await params
	const searchParamsData = await searchParams

	const propertyType = searchParamsData.property_type as string
	const listingType = searchParamsData.listing_type as string
	const stateId = searchParamsData.state_id as string
	const cityId = searchParamsData.city_id as string

	const { title, description, keywords } = generateLocationMetadata({
		type: propertyType,
	})

	let canonicalUrl = `https://chancerealty.am/${locale}/properties`
	const params_url = new URLSearchParams()
	if (propertyType) params_url.append('property_type', propertyType)
	if (listingType) params_url.append('listing_type', listingType)
	if (stateId) params_url.append('state_id', stateId)
	if (cityId) params_url.append('city_id', cityId)

	if (params_url.toString()) {
		canonicalUrl += `?${params_url.toString()}`
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

export default async function PropertiesPage({
	params,
	searchParams,
}: PropertiesPageProps) {
	const { locale } = await params

	const breadcrumbSchema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Home',
				item: `https://chancerealty.am/${locale}`,
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: 'Properties',
				item: `https://chancerealty.am/${locale}/properties`,
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
