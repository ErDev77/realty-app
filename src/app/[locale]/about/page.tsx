import { Metadata } from 'next'
import AboutClient from './AboutClient'
import { generateLocalBusinessSchema } from '@/utils/structuredData'

export const metadata: Metadata = {
	title: 'About Us - Chance Realty | 15+ Years of Real Estate Excellence',
	description:
		"Learn about Chance Realty, Armenia's leading real estate agency. 15+ years of experience, 10,000+ happy clients, and 98% satisfaction rate. Meet our expert team and discover our story.",
	keywords: [
		'about Chance Realty',
		'real estate agency Armenia',
		'Yerevan real estate experts',
		'Armenian property specialists',
		'real estate team Armenia',
		'property consultants Yerevan',
	],
	openGraph: {
		title: "About Chance Realty - Armenia's Leading Real Estate Agency",
		description:
			'15+ years of real estate excellence in Armenia. Meet our expert team and discover why 10,000+ clients trust us with their property needs.',
		images: ['/images/og-about.jpg'],
		url: 'https://chancerealty.am/about',
	},
	alternates: {
		canonical: 'https://chancerealty.am/about',
	},
}

export default function AboutPage() {
	const localBusinessSchema = generateLocalBusinessSchema()
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
				name: 'About Us',
				item: 'https://chancerealty.am/about',
			},
		],
	}

	return (
		<>
			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(localBusinessSchema),
				}}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(breadcrumbSchema),
				}}
			/>

			<AboutClient />
		</>
	)
}
