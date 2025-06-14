'use client'

import Header from './_components/Header'
import Footer from './_components/Footer'
import { LanguageProvider } from '@/context/LanguageContext'

export default function ClientLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<LanguageProvider>
				<Header />
				<main>{children}</main>
				<Footer />
			</LanguageProvider>
		</>
	)
}
