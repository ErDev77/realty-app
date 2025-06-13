import { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
	title: 'Contact Us - Get Expert Real Estate Advice | Chance Realty',
	description:
		'Contact Chance Realty for expert real estate advice in Armenia. Call +374 00 000 000, email info@chancerealty.am, or visit our Yerevan office. Free consultation available.',
	keywords: [
		'contact Chance Realty',
		'real estate consultation Armenia',
		'Yerevan real estate office',
		'property advice Armenia',
		'real estate experts contact',
		'Armenian property consultants',
	],
	openGraph: {
		title: 'Contact Chance Realty - Expert Real Estate Consultation',
		description:
			"Get in touch with Armenia's leading real estate experts. Free consultation, professional advice, and personalized service.",
		images: ['/images/og-contact.jpg'],
		url: 'https://chancerealty.am/contact',
	},
	alternates: {
		canonical: 'https://chancerealty.am/contact',
	},
}

export default function ContactPage() {
	const contactSchema = {
		'@context': 'https://schema.org',
		'@type': 'ContactPage',
		name: 'Contact Chance Realty',
		description:
			'Get in touch with Chance Realty for expert real estate advice and consultation in Armenia.',
		url: 'https://chancerealty.am/contact',
		mainEntity: {
			'@type': 'Organization',
			name: 'Chance Realty',
			contactPoint: {
				'@type': 'ContactPoint',
				telephone: '+374-00-000-000',
				contactType: 'customer service',
				email: 'info@chancerealty.am',
				availableLanguage: ['English', 'Armenian'],
			},
		},
	}

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
				name: 'Contact',
				item: 'https://chancerealty.am/contact',
			},
		],
	}

	return (
		<>
			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(contactSchema),
				}}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(breadcrumbSchema),
				}}
			/>

			<ContactClient />
		</>
	)
}
