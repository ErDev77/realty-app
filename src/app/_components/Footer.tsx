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
import { FaWhatsapp } from 'react-icons/fa'
import { FaViber } from 'react-icons/fa'
import { FaTelegram } from 'react-icons/fa'

import Link from 'next/link'
import { useTranslations } from '@/translations/translations'
import { useLanguage } from '@/context/LanguageContext'
import { BsTiktok } from 'react-icons/bs'

const Footer = () => {
	const t = useTranslations()
	const { language } = useLanguage()

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	/** CONTACT DATA SPLIT */
	const phoneContacts = [
		{
			icon: Phone,
			text: '+374 96 194 646',
			href: 'tel:+37496194646',
		},
		{
			icon: Phone,
			text: '+374 41 194 646',
			href: 'tel:+37441194646',
		},
		{
			icon: Phone,
			text: '+374 94 174 646',
			href: 'tel:+37494174646',
		},
	]

	const mailContact = {
		icon: Mail,
		text: 'chancerealty4646@gmail.com',
		href: 'mailto:chancerealty4646@gmail.com',
	}

	const addressContact = {
		icon: MapPin,
		text:
			language === 'hy'
				? 'Մարգարյան 43, Երևան, Հայաստան'
				: language === 'ru'
				? 'Маргарян 43, Ереван, Армения'
				: 'Margaryan 43, Yerevan, Armenia',

		href: '#',
	}

	return (
		<footer className='relative bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden'>
			{/* Decorations */}
			<div className='absolute inset-0 opacity-5'>
				<div className='absolute top-20 left-10 w-32 h-32 border-2 border-white rounded-full'></div>
				<div className='absolute top-40 right-20 w-24 h-24 border-2 border-white rounded-lg transform rotate-45'></div>
				<div className='absolute bottom-32 left-1/4 w-28 h-28 border-2 border-white rounded-full'></div>
				<div className='absolute bottom-20 right-10 w-20 h-20 border-2 border-white rounded-lg transform -rotate-12'></div>
			</div>

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
								: 'Find your dream property with us. We make real estate search easy and enjoyable.'}
						</p>

						{/* Social Media and Messaging Apps */}
						<div className='flex flex-wrap gap-3'>
							{/* Social Media */}
							{[
								{
									name: 'Facebook',
									icon: Facebook,
									href: 'https://www.facebook.com/share/1BzdM7fmJ6/?mibextid=wwXIfr',
									color: 'hover:bg-blue-600',
								},
								{
									name: 'Instagram',
									icon: Instagram,
									href: 'https://www.instagram.com/chance_realty_?igsh=cGR6NW10ZW1jb2x0&utm_source=qr',
									color: 'hover:bg-pink-600',
								},
								{
									name: 'TikTok',
									icon: BsTiktok,
									href: 'https://www.tiktok.com/@chance_realty_?_t=ZS-8xYPKwImd6Y&_r=1',
									color: 'hover:bg-blue-700',
								},
							].map(({ icon: Icon, href, color, name }, index) => (
								<a
									key={index}
									href={href}
									target='_blank'
									rel='noopener noreferrer'
									className={`group relative p-3 bg-gray-800 rounded-xl ${color} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}
									aria-label={`${name} ${
										language === 'hy'
											? 'էջ'
											: language === 'ru'
											? 'страница'
											: 'page'
									}`}
								>
									<Icon className='h-5 w-5 group-hover:scale-110 transition-transform duration-200' />
									<div className='absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

									{/* Tooltip */}
									<div className='absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10'>
										{name}
										<div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900'></div>
									</div>
								</a>
							))}

							{/* Messaging Apps */}
							{[
								{
									name: 'WhatsApp',
									href: 'https://wa.me/37441194646',
									icon: <FaWhatsapp />,
									color: 'hover:bg-green-600',
									bgColor: 'bg-green-500',
								},
								{
									name: 'Viber',
									href: 'viber://chat?number=37441194646',
									icon: <FaViber />,
									color: 'hover:bg-purple-600',
									bgColor: 'bg-purple-500',
								},
								{
									name: 'Telegram',
									href: 'https://t.me/+37441194646',
									icon: <FaTelegram />,
									color: 'hover:bg-blue-500',
									bgColor: 'bg-blue-400',
								},
							].map(({ name, href, icon, color, bgColor }, index) => (
								<a
									key={`messaging-${index}`}
									href={href}
									target='_blank'
									rel='noopener noreferrer'
									className={`group relative p-3 ${bgColor} rounded-xl ${color} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}
									aria-label={`${
										language === 'hy'
											? 'Կապվել'
											: language === 'ru'
											? 'Связаться через'
											: 'Contact via'
									} ${name}`}
									title={`${
										language === 'hy'
											? 'Կապվել մեզ հետ'
											: language === 'ru'
											? 'Связаться с нами'
											: 'Contact us'
									} ${name}`}
								>
									<span className='text-lg group-hover:scale-110 transition-transform duration-200'>
										{icon}
									</span>
									<div className='absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

									{/* Tooltip */}
									<div className='absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10'>
										{name}
										<div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900'></div>
									</div>
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

					{/* Contact Info */}
					<div>
						<h3 className='text-lg font-semibold mb-6 flex items-center'>
							<div className='w-1 h-6 bg-gradient-to-b from-orange-400 to-red-500 rounded-full mr-3'></div>
							{t.contactInfo}
						</h3>

						<ul className='space-y-4 mb-8'>
							{/* Phones */}
							{phoneContacts.map(({ icon: Icon, text, href }, index) => (
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

							{/* Mail */}
							<li className='group'>
								<a
									href={mailContact.href}
									className='flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-200 p-2 hover:bg-gray-800 rounded-lg'
								>
									<div className='p-2 bg-gray-800 rounded-lg group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-600 transition-all duration-300'>
										<mailContact.icon className='h-4 w-4' />
									</div>
									<span className='text-sm'>{mailContact.text}</span>
								</a>
							</li>

							{/* Address */}
							<li className='group'>
								<a
									href={addressContact.href}
									className='flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-200 p-2 hover:bg-gray-800 rounded-lg'
								>
									<div className='p-2 bg-gray-800 rounded-lg group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-600 transition-all duration-300'>
										<addressContact.icon className='h-4 w-4' />
									</div>
									<span className='text-sm'>{addressContact.text}</span>
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Stats */}
				<div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 p-8 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700 cursor-pointer'>
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

				{/* Bottom */}
				<div className='flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800'>
					<p className='text-gray-400 text-sm mb-4 md:mb-0'>
						&copy; 2025 Chance Realty․ {t.allRightsReserved}
					</p>
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
