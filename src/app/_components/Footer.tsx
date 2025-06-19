// import {
// 	Facebook,
// 	Home,
// 	Instagram,
// 	Linkedin,
// 	Mail,
// 	MapPin,
// 	Phone,
// 	ArrowUp,
// 	ExternalLink,
// } from 'lucide-react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useState } from 'react'

// const Footer = () => {
// 	const [email, setEmail] = useState('')
// 	const [subscribed, setSubscribed] = useState(false)

// 	const handleNewsletterSubmit = (e: React.FormEvent) => {
// 		e.preventDefault()
// 		// Simulate subscription
// 		setSubscribed(true)
// 		setEmail('')
// 		setTimeout(() => setSubscribed(false), 3000)
// 	}

// 	const scrollToTop = () => {
// 		window.scrollTo({ top: 0, behavior: 'smooth' })
// 	}

// 	return (
// 		<footer className='relative bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden'>
// 			{/* Background decorations */}
// 			<div className='absolute inset-0 opacity-5'>
// 				<div className='absolute top-20 left-10 w-32 h-32 border-2 border-white rounded-full'></div>
// 				<div className='absolute top-40 right-20 w-24 h-24 border-2 border-white rounded-lg transform rotate-45'></div>
// 				<div className='absolute bottom-32 left-1/4 w-28 h-28 border-2 border-white rounded-full'></div>
// 				<div className='absolute bottom-20 right-10 w-20 h-20 border-2 border-white rounded-lg transform -rotate-12'></div>
// 			</div>

// 			{/* Main Footer Content */}
// 			<div className='container mx-auto px-4 pt-16 pb-8 relative z-10'>
// 				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12'>
// 					{/* Company Info */}
// 					<div className='space-y-6'>
// 						<div className='flex items-center mb-6'>
// 							<div className='p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300'>
// 								<Image 
// 								src={'/3.png'}
// 								alt='Chance Realty Logo'
// 								width={140}
// 								height={140}
// 								/>
// 							</div>
						
// 						</div>
// 						<p className='text-gray-300 leading-relaxed'>
// 							Գտեք ձեր երազանքի անշարժ գույքը մեզ հետ։ Մենք անշարժ գույքի
// 							որոնումը դարձնում ենք հեշտ և հաճելի։
// 						</p>

// 						{/* Social Links */}
// 						<div className='flex space-x-3'>
// 							{[
// 								{ icon: Facebook, href: '#', color: 'hover:bg-blue-600' },
// 								{ icon: Instagram, href: '#', color: 'hover:bg-pink-600' },
// 								{ icon: Linkedin, href: '#', color: 'hover:bg-blue-700' },
// 							].map(({ icon: Icon, href, color }, index) => (
// 								<a
// 									key={index}
// 									href={href}
// 									className={`group relative p-3 bg-gray-800 rounded-xl ${color} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}
// 									aria-label={`Social media link ${index + 1}`}
// 								>
// 									<Icon className='h-5 w-5 group-hover:scale-110 transition-transform duration-200' />
// 									<div className='absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
// 								</a>
// 							))}
// 						</div>
// 					</div>

// 					{/* Quick Links */}
// 					<div>
// 						<h3 className='text-lg font-semibold mb-6 flex items-center'>
// 							<div className='w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mr-3'></div>
// 							Արագ հղումներ
// 						</h3>
// 						<ul className='space-y-3'>
// 							{[
// 								{ label: 'Մեր մասին', href: '/about' },
// 								{ label: 'Ծառայություններ', href: '/services' },
// 								{ label: 'Կապ', href: '/contact' },
// 								{ label: 'Բլոգ', href: '/blog' },
// 								{ label: 'Ծառայությունների պայմաններ', href: '/terms' },
// 								{ label: 'Գաղտնիության քաղաքականություն', href: '/privacy' },
// 							].map((link, index) => (
// 								<li key={index}>
// 									<Link
// 										href={link.href}
// 										className='group flex items-center text-gray-300 hover:text-white transition-all duration-200'
// 									>
// 										<span className='w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 mr-0 group-hover:mr-3 rounded-full'></span>
// 										{link.label}
// 										<ExternalLink className='w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
// 									</Link>
// 								</li>
// 							))}
// 						</ul>
// 					</div>

// 					{/* Property Types */}
// 					<div>
// 						<h3 className='text-lg font-semibold mb-6 flex items-center'>
// 							<div className='w-1 h-6 bg-gradient-to-b from-green-400 to-blue-500 rounded-full mr-3'></div>
// 							Գույքի տեսակներ
// 						</h3>
// 						<ul className='space-y-3'>
// 							{[
// 								{
// 									label: 'Տներ',
// 									href: '/properties?property_type=house',
// 									count: '250+',
// 								},
// 								{
// 									label: 'Բնակարաններ',
// 									href: '/properties?property_type=apartment',
// 									count: '180+',
// 								},
// 								{
// 									label: 'Կոմերցիոն',
// 									href: '/properties?property_type=commercial',
// 									count: '95+',
// 								},
// 								{
// 									label: 'Հողատարածք',
// 									href: '/properties?property_type=land',
// 									count: '120+',
// 								},
// 							].map((link, index) => (
// 								<li key={index}>
// 									<Link
// 										href={link.href}
// 										className='group flex items-center justify-between text-gray-300 hover:text-white transition-all duration-200 p-2 hover:bg-gray-800 rounded-lg'
// 									>
// 										<span className='flex items-center'>
// 											<span className='w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300 mr-0 group-hover:mr-3 rounded-full'></span>
// 											{link.label}
// 										</span>
// 										<span className='text-xs bg-gray-700 px-2 py-1 rounded-full group-hover:bg-blue-600 transition-colors duration-200'>
// 											{link.count}
// 										</span>
// 									</Link>
// 								</li>
// 							))}
// 						</ul>
// 					</div>

// 					{/* Contact & Newsletter */}
// 					<div>
// 						<h3 className='text-lg font-semibold mb-6 flex items-center'>
// 							<div className='w-1 h-6 bg-gradient-to-b from-orange-400 to-red-500 rounded-full mr-3'></div>
// 							Կապ մեզ հետ
// 						</h3>
// 						<ul className='space-y-4 mb-8'>
// 							{[
// 								{
// 									icon: Phone,
// 									text: '+374 00 000 000',
// 									href: 'tel:+37400000000',
// 								},
// 								{
// 									icon: Mail,
// 									text: 'info@chancerealty.am',
// 									href: 'mailto:info@chancerealty.am',
// 								},
// 								{ icon: MapPin, text: 'Երևան, Հայաստան', href: '#' },
// 							].map(({ icon: Icon, text, href }, index) => (
// 								<li key={index} className='group'>
// 									<a
// 										href={href}
// 										className='flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-200 p-2 hover:bg-gray-800 rounded-lg'
// 									>
// 										<div className='p-2 bg-gray-800 rounded-lg group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-600 transition-all duration-300'>
// 											<Icon className='h-4 w-4' />
// 										</div>
// 										<span className='text-sm'>{text}</span>
// 									</a>
// 								</li>
// 							))}
// 						</ul>

// 						{/* Newsletter Signup */}
// 						<div className='bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700'>
// 							<h4 className='text-sm font-semibold mb-3 text-gray-200'>
// 								Newsletter
// 							</h4>
// 							<p className='text-xs text-gray-400 mb-4'>
// 								Ստացեք վերջին նորությունները
// 							</p>

// 							{subscribed ? (
// 								<div className='text-center py-4'>
// 									<div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2'>
// 										<span className='text-2xl'>✅</span>
// 									</div>
// 									<p className='text-green-400 text-sm font-medium'>
// 										Բաժանորդագրությունը հաջող է!
// 									</p>
// 								</div>
// 							) : (
// 								<form onSubmit={handleNewsletterSubmit} className='flex gap-2'>
// 									<input
// 										type='email'
// 										placeholder='Ձեր email-ը'
// 										value={email}
// 										onChange={e => setEmail(e.target.value)}
// 										required
// 										className='flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm'
// 									/>
// 									<button
// 										type='submit'
// 										className='px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
// 									>
// 										→
// 									</button>
// 								</form>
// 							)}
// 						</div>
// 					</div>
// 				</div>

// 				{/* Stats Section */}
// 				<div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 p-8 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700'>
// 					{[
// 						{ number: '645+', label: 'Գույքեր', icon: '🏠' },
// 						{ number: '1,200+', label: 'Բավարարված հաճախորդներ', icon: '😊' },
// 						{ number: '15+', label: 'Տարվա փորձ', icon: '⭐' },
// 						{ number: '95%', label: 'Գոհունակության տոկոս', icon: '🎯' },
// 					].map((stat, index) => (
// 						<div key={index} className='text-center group'>
// 							<div className='text-3xl mb-2 group-hover:scale-110 transition-transform duration-300'>
// 								{stat.icon}
// 							</div>
// 							<div className='text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors duration-300'>
// 								{stat.number}
// 							</div>
// 							<div className='text-gray-400 text-xs md:text-sm'>
// 								{stat.label}
// 							</div>
// 						</div>
// 					))}
// 				</div>

// 				{/* Bottom Section */}
// 				<div className='flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800'>
// 					<div className='flex items-center space-x-4 mb-4 md:mb-0'>
// 						<p className='text-gray-400 text-sm'>
// 							&copy; 2024 Chance Realty․ Բոլոր իրավունքները պաշտպանված են։
// 						</p>
// 					</div>

// 					<div className='flex items-center space-x-4'>
// 						<div className='flex items-center space-x-2 text-xs text-gray-500'>
// 							<span className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></span>
// 							<span>Վեբ կայքը գործում է</span>
// 						</div>

// 						<button
// 							onClick={scrollToTop}
// 							className='group p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl'
// 							aria-label='Scroll to top'
// 						>
// 							<ArrowUp className='w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200' />
// 						</button>
// 					</div>
// 				</div>
// 			</div>
// 		</footer>
// 	)
// }

// export default Footer




// src/app/_components/Footer.tsx - Updated with translations
'use client'

import {
	Facebook,
	Home,
	Instagram,
	Linkedin,
	Mail,
	MapPin,
	Phone,
	ArrowUp,
	ExternalLink,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useTranslations } from '@/translations/translations'
import { useLanguage } from '@/context/LanguageContext'

const Footer = () => {
	const t = useTranslations()
	const { language } = useLanguage()
	const [email, setEmail] = useState('')
	const [subscribed, setSubscribed] = useState(false)

	const handleNewsletterSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// Simulate subscription
		setSubscribed(true)
		setEmail('')
		setTimeout(() => setSubscribed(false), 3000)
	}

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<footer className='relative bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden'>
			{/* Background decorations */}
			<div className='absolute inset-0 opacity-5'>
				<div className='absolute top-20 left-10 w-32 h-32 border-2 border-white rounded-full'></div>
				<div className='absolute top-40 right-20 w-24 h-24 border-2 border-white rounded-lg transform rotate-45'></div>
				<div className='absolute bottom-32 left-1/4 w-28 h-28 border-2 border-white rounded-full'></div>
				<div className='absolute bottom-20 right-10 w-20 h-20 border-2 border-white rounded-lg transform -rotate-12'></div>
			</div>

			{/* Main Footer Content */}
			<div className='container mx-auto px-4 pt-16 pb-8 relative z-10'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12'>
					{/* Company Info */}
					<div className='space-y-6'>
						<div className='flex items-center mb-6'>
							<div className='p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300'>
								<Image 
									src={'/3.png'}
									alt='Chance Realty Logo'
									width={140}
									height={140}
								/>
							</div>
						</div>
						<p className='text-gray-300 leading-relaxed'>
							{language === 'hy' 
								? 'Գտեք ձեր երազանքի անշարժ գույքը մեզ հետ։ Մենք անշարժ գույքի որոնումը դարձնում ենք հեշտ և հաճելի։'
								: language === 'ru'
								? 'Найдите недвижимость вашей мечты с нами. Мы делаем поиск недвижимости простым и приятным.'
								: 'Find your dream property with us. We make real estate search easy and enjoyable.'
							}
						</p>

						{/* Social Links */}
						<div className='flex space-x-3'>
							{[
								{ icon: Facebook, href: '#', color: 'hover:bg-blue-600' },
								{ icon: Instagram, href: '#', color: 'hover:bg-pink-600' },
								{ icon: Linkedin, href: '#', color: 'hover:bg-blue-700' },
							].map(({ icon: Icon, href, color }, index) => (
								<a
									key={index}
									href={href}
									className={`group relative p-3 bg-gray-800 rounded-xl ${color} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}
									aria-label={`Social media link ${index + 1}`}
								>
									<Icon className='h-5 w-5 group-hover:scale-110 transition-transform duration-200' />
									<div className='absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
								</a>
							))}
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className='text-lg font-semibold mb-6 flex items-center'>
							<div className='w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mr-3'></div>
							{t.quickLinks}
						</h3>
						<ul className='space-y-3'>
							{[
								{ label: t.about, href: `/${language}/about` },
								{ label: t.services, href: `/${language}/services` },
								{ label: t.contact, href: `/${language}/contact` },
								{ label: t.blog, href: `/${language}/blog` },
								{ label: t.terms, href: `/${language}/terms` },
								{ label: t.privacy, href: `/${language}/privacy` },
							].map((link, index) => (
								<li key={index}>
									<Link
										href={link.href}
										className='group flex items-center text-gray-300 hover:text-white transition-all duration-200'
									>
										<span className='w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 mr-0 group-hover:mr-3 rounded-full'></span>
										{link.label}
										<ExternalLink className='w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Property Types */}
					<div>
						<h3 className='text-lg font-semibold mb-6 flex items-center'>
							<div className='w-1 h-6 bg-gradient-to-b from-green-400 to-blue-500 rounded-full mr-3'></div>
							{t.propertyTypesFooter}
						</h3>
						<ul className='space-y-3'>
							{[
								{
									label: t.houses,
									href: `/${language}/properties?property_type=house`,
									count: '250+',
								},
								{
									label: t.apartments,
									href: `/${language}/properties?property_type=apartment`,
									count: '180+',
								},
								{
									label: t.commercial,
									href: `/${language}/properties?property_type=commercial`,
									count: '95+',
								},
								{
									label: t.land,
									href: `/${language}/properties?property_type=land`,
									count: '120+',
								},
							].map((link, index) => (
								<li key={index}>
									<Link
										href={link.href}
										className='group flex items-center justify-between text-gray-300 hover:text-white transition-all duration-200 p-2 hover:bg-gray-800 rounded-lg'
									>
										<span className='flex items-center'>
											<span className='w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300 mr-0 group-hover:mr-3 rounded-full'></span>
											{link.label}
										</span>
										<span className='text-xs bg-gray-700 px-2 py-1 rounded-full group-hover:bg-blue-600 transition-colors duration-200'>
											{link.count}
										</span>
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact & Newsletter */}
					<div>
						<h3 className='text-lg font-semibold mb-6 flex items-center'>
							<div className='w-1 h-6 bg-gradient-to-b from-orange-400 to-red-500 rounded-full mr-3'></div>
							{t.contactInfo}
						</h3>
						<ul className='space-y-4 mb-8'>
							{[
								{
									icon: Phone,
									text: '+374 00 000 000',
									href: 'tel:+37400000000',
								},
								{
									icon: Mail,
									text: 'info@chancerealty.am',
									href: 'mailto:info@chancerealty.am',
								},
								{ 
									icon: MapPin, 
									text: language === 'hy' ? 'Երևան, Հայաստան' : language === 'ru' ? 'Ереван, Армения' : 'Yerevan, Armenia', 
									href: '#' 
								},
							].map(({ icon: Icon, text, href }, index) => (
								<li key={index} className='group'>
									<a
										href={href}
										className='flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-200 p-2 hover:bg-gray-800 rounded-lg'
									>
										<div className='p-2 bg-gray-800 rounded-lg group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-600 transition-all duration-300'>
											<Icon className='h-4 w-4' />
										</div>
										<span className='text-sm'>{text}</span>
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Stats Section */}
				<div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 p-8 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700'>
					{[
						{ number: '645+', label: t.properties, icon: '🏠' },
						{ number: '1,200+', label: t.happyClients, icon: '😊' },
						{ number: '15+', label: t.yearsExperience, icon: '⭐' },
						{ number: '95%', label: t.satisfactionRate, icon: '🎯' },
					].map((stat, index) => (
						<div key={index} className='text-center group'>
							<div className='text-3xl mb-2 group-hover:scale-110 transition-transform duration-300'>
								{stat.icon}
							</div>
							<div className='text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors duration-300'>
								{stat.number}
							</div>
							<div className='text-gray-400 text-xs md:text-sm'>
								{stat.label}
							</div>
						</div>
					))}
				</div>

				{/* Bottom Section */}
				<div className='flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800'>
					<div className='flex items-center space-x-4 mb-4 md:mb-0'>
						<p className='text-gray-400 text-sm'>
							&copy; 2024 Chance Realty․ {t.allRightsReserved}
						</p>
					</div>

					<div className='flex items-center space-x-4'>
						<div className='flex items-center space-x-2 text-xs text-gray-500'>
							<span className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></span>
							<span>{t.websiteWorking}</span>
						</div>

						<button
							onClick={scrollToTop}
							className='group p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl'
							aria-label={t.scrollToTop}
						>
							<ArrowUp className='w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200' />
						</button>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
