// src/app/[locale]/layout.tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../globals.css'
import ClientLayout from '../client-layout'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

const locales = ['hy', 'en', 'ru']

export async function generateMetadata(
	props: Promise<{ params: { locale: string } }>
): Promise<Metadata> {
	const { params } = await props
	const { locale } = params

	if (!locales.includes(locale)) {
		return {
			title: 'Page Not Found',
			description: 'The requested page could not be found.',
		}
	}

	const translations = {
		hy: {
			title: 'Chance Realty - Գտեք ձեր երազանքի անշարժ գույքը Հայաստանում',
			description:
				'Բացահայտեք պրեմիում անշարժ գույք Հայաստանում։ Տներ, բնակարաններ, կոմերցիոն գույք և հողատարածքներ վաճառքի և վարձակալության համար։',
		},
		en: {
			title: 'Chance Realty - Find Your Dream Property in Armenia',
			description:
				'Discover premium real estate in Armenia. Houses, apartments, commercial properties, and land for sale or rent.',
		},
		ru: {
			title: 'Chance Realty - Найдите недвижимость вашей мечты в Армении',
			description:
				'Откройте для себя премиальную недвижимость в Армении. Дома, квартиры, коммерческая недвижимость и земля на продажу или аренду.',
		},
	}

	const meta = translations[locale as keyof typeof translations]

	return {
		title: meta.title,
		description: meta.description,
		openGraph: {
			title: meta.title,
			description: meta.description,
			locale: locale === 'hy' ? 'hy_AM' : locale === 'ru' ? 'ru_RU' : 'en_US',
		},
		alternates: {
			canonical: `https://chancerealty.am/${locale}`,
			languages: {
				'hy-AM': 'https://chancerealty.am/hy',
				'en-US': 'https://chancerealty.am/en',
				'ru-RU': 'https://chancerealty.am/ru',
			},
		},
	}
}

export default function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: { locale: string }
}) {
	const { locale } = params

	// Validate locale
	if (!locales.includes(locale)) {
		notFound()
	}

	return (
		<html lang={locale}>
			<head>
				{/* Alternate language links */}
				<link rel='alternate' hrefLang='hy' href='https://chancerealty.am/hy' />
				<link rel='alternate' hrefLang='en' href='https://chancerealty.am/en' />
				<link rel='alternate' hrefLang='ru' href='https://chancerealty.am/ru' />
				<link
					rel='alternate'
					hrefLang='x-default'
					href='https://chancerealty.am/hy'
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ClientLayout>{children}</ClientLayout>
			</body>
		</html>
	)
}

// Generate static params for all locales
export function generateStaticParams() {
	return locales.map(locale => ({ locale }))
}
