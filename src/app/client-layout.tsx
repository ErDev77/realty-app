'use client'

import Header from './_components/Header'
import Footer from './_components/Footer'

export default function ClientLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	)
}
