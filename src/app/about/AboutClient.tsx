// src/app/about/page.tsx
'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
	Home,
	Users,
	Award,
	Target,
	Heart,
	Zap,
	Shield,
	TrendingUp,
	Star,
	CheckCircle,
	Globe,
	Building2,
	UserCheck,
	Calendar,
	Phone,
	Mail,
	MapPin,
	ArrowRight,
	Quote,
	Play,
	Pause,
	Volume2,
	VolumeX,
} from 'lucide-react'

const AboutClient = () => {
	const [activeTab, setActiveTab] = useState('mission')
	const [isVideoPlaying, setIsVideoPlaying] = useState(false)
	const [isMuted, setIsMuted] = useState(false)

	const stats = [
		{
			number: '15+',
			label: 'Years of Experience',
			icon: Calendar,
			color: 'blue',
		},
		{ number: '10,000+', label: 'Happy Clients', icon: Users, color: 'green' },
		{ number: '5,000+', label: 'Properties Sold', icon: Home, color: 'purple' },
		{
			number: '98%',
			label: 'Client Satisfaction',
			icon: Star,
			color: 'orange',
		},
		{ number: '50+', label: 'Expert Agents', icon: UserCheck, color: 'red' },
		{
			number: '24/7',
			label: 'Customer Support',
			icon: Shield,
			color: 'indigo',
		},
	]

	const values = [
		{
			icon: Heart,
			title: 'Client-Centered Approach',
			description:
				'We put our clients first in everything we do, ensuring their dreams become reality.',
			color: 'red',
			gradient: 'from-red-500 to-pink-600',
		},
		{
			icon: Shield,
			title: 'Trust & Transparency',
			description:
				'Honest communication and transparent processes build lasting relationships.',
			color: 'blue',
			gradient: 'from-blue-500 to-indigo-600',
		},
		{
			icon: Zap,
			title: 'Innovation',
			description:
				'We leverage cutting-edge technology to provide the best real estate experience.',
			color: 'yellow',
			gradient: 'from-yellow-500 to-orange-600',
		},
		{
			icon: TrendingUp,
			title: 'Excellence',
			description:
				'We strive for excellence in every transaction and client interaction.',
			color: 'green',
			gradient: 'from-green-500 to-emerald-600',
		},
	]

	const team = [
		{
			name: 'Armen Hakobyan',
			role: 'Founder & CEO',
			image: '/api/placeholder/300/400',
			bio: 'With over 20 years in real estate, Armen founded Chance Realty with a vision to revolutionize property transactions in Armenia.',
			specialties: [
				'Luxury Properties',
				'Commercial Real Estate',
				'Investment Properties',
			],
			contact: {
				phone: '+374 00 000 001',
				email: 'armen@chancerealty.am',
			},
		},
		{
			name: 'Anahit Grigoryan',
			role: 'Head of Sales',
			image: '/api/placeholder/300/400',
			bio: 'Anahit leads our sales team with passion and expertise, helping families find their perfect homes.',
			specialties: [
				'Residential Sales',
				'First-Time Buyers',
				'Property Valuation',
			],
			contact: {
				phone: '+374 00 000 002',
				email: 'anahit@chancerealty.am',
			},
		},
		{
			name: 'Gevorg Martirosyan',
			role: 'Commercial Director',
			image: '/api/placeholder/300/400',
			bio: 'Gevorg specializes in commercial properties and has helped numerous businesses find their ideal locations.',
			specialties: [
				'Commercial Leasing',
				'Investment Analysis',
				'Market Research',
			],
			contact: {
				phone: '+374 00 000 003',
				email: 'gevorg@chancerealty.am',
			},
		},
		{
			name: 'Sona Abrahamyan',
			role: 'Customer Relations Manager',
			image: '/api/placeholder/300/400',
			bio: 'Sona ensures every client receives exceptional service and support throughout their property journey.',
			specialties: [
				'Client Relations',
				'After-Sales Support',
				'Customer Experience',
			],
			contact: {
				phone: '+374 00 000 004',
				email: 'sona@chancerealty.am',
			},
		},
	]

	const testimonials = [
		{
			name: 'Ani Petrosyan',
			role: 'Homeowner',
			content:
				'Chance Realty made buying our first home an amazing experience. Their team was professional, knowledgeable, and truly cared about our needs.',
			rating: 5,
			image: '/api/placeholder/100/100',
		},
		{
			name: 'David Avagyan',
			role: 'Business Owner',
			content:
				'They helped us find the perfect commercial space for our restaurant. The process was smooth and their expertise was invaluable.',
			rating: 5,
			image: '/api/placeholder/100/100',
		},
		{
			name: 'Maria Khachatryan',
			role: 'Investor',
			content:
				'Outstanding service! They guided me through multiple property investments with excellent market insights and professional advice.',
			rating: 5,
			image: '/api/placeholder/100/100',
		},
	]

	const timeline = [
		{
			year: '2008',
			title: 'Company Founded',
			description:
				'Chance Realty was established with a mission to transform the real estate landscape in Armenia.',
			icon: Home,
		},
		{
			year: '2012',
			title: 'First 1000 Sales',
			description:
				'Reached our first milestone of 1000 successful property transactions.',
			icon: Target,
		},
		{
			year: '2016',
			title: 'Digital Innovation',
			description:
				'Launched our advanced online platform, making property search easier than ever.',
			icon: Globe,
		},
		{
			year: '2020',
			title: 'Market Leadership',
			description:
				'Became the leading real estate agency in Yerevan with the highest client satisfaction rate.',
			icon: Award,
		},
		{
			year: '2024',
			title: 'Continued Growth',
			description:
				'Expanded our services and team, helping more families find their dream homes.',
			icon: TrendingUp,
		},
	]

	const achievements = [
		{
			title: 'Best Real Estate Agency 2023',
			organization: 'Armenia Business Awards',
			icon: Award,
			color: 'yellow',
		},
		{
			title: 'Customer Excellence Award',
			organization: 'Service Quality Institute',
			icon: Star,
			color: 'blue',
		},
		{
			title: 'Digital Innovation Leader',
			organization: 'PropTech Armenia',
			icon: Zap,
			color: 'purple',
		},
		{
			title: 'Community Impact Award',
			organization: 'Yerevan Municipality',
			icon: Heart,
			color: 'red',
		},
	]

	const tabContent = {
		mission: {
			title: 'Our Mission',
			content:
				'To revolutionize the real estate experience by providing exceptional service, innovative solutions, and genuine care for every client. We believe that finding the perfect property should be exciting, not stressful.',
			icon: Target,
		},
		vision: {
			title: 'Our Vision',
			content:
				"To become Armenia's most trusted and innovative real estate company, setting new standards for excellence in property transactions and client satisfaction.",
			icon: Globe,
		},
		values: {
			title: 'Our Values',
			content:
				"We are guided by integrity, transparency, innovation, and an unwavering commitment to our clients' success. These values shape every interaction and decision we make.",
			icon: Heart,
		},
	}

	return (
		<div className='bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50 min-h-screen'>
			{/* Hero Section */}
			<div className='relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden'>
				{/* Background decorations */}
				<div className='absolute inset-0'>
					<div className='absolute top-20 left-10 w-32 h-32 border border-white/10 rounded-full animate-pulse'></div>
					<div className='absolute top-40 right-20 w-24 h-24 border border-white/20 rounded-lg transform rotate-45 animate-pulse animation-delay-1000'></div>
					<div className='absolute bottom-32 left-1/4 w-28 h-28 border border-white/15 rounded-full animate-pulse animation-delay-2000'></div>
					<div className='absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-purple-600/20 to-pink-600/20 rounded-full'></div>
				</div>

				<div className='container mx-auto px-4 py-20 md:py-32 relative z-10'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='max-w-5xl mx-auto text-center'
					>
						{/* Logo/Icon */}
						<div className='inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-8 backdrop-blur-sm shadow-2xl'>
							<Building2 className='w-12 h-12 text-white' />
						</div>

						<h1 className='text-5xl md:text-7xl font-bold mb-8 leading-tight'>
							About
							<span className='block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent'>
								Chance Realty
							</span>
						</h1>

						<p className='text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12'>
							For over 15 years, we've been helping families and businesses find
							their perfect properties in Armenia. Our commitment to excellence
							and innovation has made us the most trusted name in real estate.
						</p>

						{/* Quick stats */}
						<div className='grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto'>
							{stats.slice(0, 3).map((stat, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.2 }}
									className='text-center'
								>
									<div
										className={`w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm`}
									>
										<stat.icon className='w-8 h-8 text-white' />
									</div>
									<div className='text-3xl font-bold text-white mb-2'>
										{stat.number}
									</div>
									<div className='text-blue-200 text-sm'>{stat.label}</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</div>

			{/* Mission, Vision, Values Tabs */}
			<div className='relative -mt-16 z-10'>
				<div className='container mx-auto px-4'>
					<div className='max-w-4xl mx-auto'>
						<div className='bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden'>
							{/* Tab Navigation */}
							<div className='flex'>
								{Object.entries(tabContent).map(([key, content]) => (
									<button
										key={key}
										onClick={() => setActiveTab(key)}
										className={`flex-1 flex items-center justify-center py-6 px-4 transition-all duration-300 ${
											activeTab === key
												? 'bg-blue-600 text-white'
												: 'bg-gray-50 text-gray-600 hover:bg-gray-100'
										}`}
									>
										<content.icon className='w-5 h-5 mr-2' />
										<span className='font-semibold'>{content.title}</span>
									</button>
								))}
							</div>

							{/* Tab Content */}
							<div className='p-8 md:p-12'>
								<motion.div
									key={activeTab}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5 }}
									className='text-center'
								>
									<h2 className='text-3xl font-bold text-gray-900 mb-6'>
										{tabContent[activeTab as keyof typeof tabContent].title}
									</h2>
									<p className='text-xl text-gray-600 leading-relaxed'>
										{tabContent[activeTab as keyof typeof tabContent].content}
									</p>
								</motion.div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Company Stats */}
			<div className='py-20'>
				<div className='container mx-auto px-4'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl font-bold text-gray-900 mb-4'>
							Our Impact by Numbers
						</h2>
						<p className='text-xl text-gray-600'>
							These numbers represent real families and businesses we've helped
						</p>
					</div>

					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto'>
						{stats.map((stat, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								className='text-center group'
							>
								<div
									className={`w-20 h-20 bg-gradient-to-br from-${stat.color}-400 to-${stat.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
								>
									<stat.icon className='w-10 h-10 text-white' />
								</div>
								<div className='text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors'>
									{stat.number}
								</div>
								<div className='text-gray-600 text-sm'>{stat.label}</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>

			{/* Our Values */}
			<div className='bg-white py-20'>
				<div className='container mx-auto px-4'>
					<div className='text-center mb-16'>
						<div className='w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6'>
							<Heart className='w-8 h-8 text-white' />
						</div>
						<h2 className='text-4xl font-bold text-gray-900 mb-4'>
							Our Core Values
						</h2>
						<p className='text-xl text-gray-600 max-w-2xl mx-auto'>
							These principles guide everything we do and shape our
							relationships with clients and community
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto'>
						{values.map((value, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.2 }}
								className='group bg-gray-50 hover:bg-white rounded-3xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300'
							>
								<div
									className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
								>
									<value.icon className='w-8 h-8 text-white' />
								</div>
								<h3 className='text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors'>
									{value.title}
								</h3>
								<p className='text-gray-600 leading-relaxed'>
									{value.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</div>

			{/* Company Timeline */}
			<div className='py-20 bg-gradient-to-br from-gray-50 to-blue-50'>
				<div className='container mx-auto px-4'>
					<div className='text-center mb-16'>
						<div className='w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6'>
							<Calendar className='w-8 h-8 text-white' />
						</div>
						<h2 className='text-4xl font-bold text-gray-900 mb-4'>
							Our Journey
						</h2>
						<p className='text-xl text-gray-600 max-w-2xl mx-auto'>
							From humble beginnings to market leadership - here's how we've
							grown over the years
						</p>
					</div>

					<div className='max-w-4xl mx-auto'>
						{timeline.map((item, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: index * 0.2 }}
								className={`flex items-center mb-12 ${
									index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
								}`}
							>
								<div
									className={`flex-1 ${
										index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'
									}`}
								>
									<div className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
										<div className='text-blue-600 font-bold text-lg mb-2'>
											{item.year}
										</div>
										<h3 className='text-xl font-bold text-gray-900 mb-3'>
											{item.title}
										</h3>
										<p className='text-gray-600'>{item.description}</p>
									</div>
								</div>

								<div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg z-10'>
									<item.icon className='w-8 h-8 text-white' />
								</div>

								<div className='flex-1'></div>
							</motion.div>
						))}
					</div>
				</div>
			</div>

			{/* Team Section */}
			<div className='bg-white py-20'>
				<div className='container mx-auto px-4'>
					<div className='text-center mb-16'>
						<div className='w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6'>
							<Users className='w-8 h-8 text-white' />
						</div>
						<h2 className='text-4xl font-bold text-gray-900 mb-4'>
							Meet Our Expert Team
						</h2>
						<p className='text-xl text-gray-600 max-w-2xl mx-auto'>
							Our experienced professionals are passionate about helping you
							find the perfect property
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto'>
						{team.map((member, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								className='group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2'
							>
								<div className='relative h-64 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden'>
									<img
										src={member.image}
										alt={member.name}
										className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
								</div>

								<div className='p-6'>
									<h3 className='text-xl font-bold text-gray-900 mb-1'>
										{member.name}
									</h3>
									<p className='text-blue-600 font-semibold mb-3'>
										{member.role}
									</p>
									<p className='text-gray-600 text-sm mb-4 leading-relaxed'>
										{member.bio}
									</p>

									<div className='mb-4'>
										<h4 className='text-sm font-semibold text-gray-900 mb-2'>
											Specialties:
										</h4>
										<div className='flex flex-wrap gap-1'>
											{member.specialties.map((specialty, idx) => (
												<span
													key={idx}
													className='px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full'
												>
													{specialty}
												</span>
											))}
										</div>
									</div>

									<div className='flex space-x-3'>
										<a
											href={`tel:${member.contact.phone}`}
											className='flex-1 flex items-center justify-center py-2 px-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm'
										>
											<Phone className='w-4 h-4 mr-1' />
											Call
										</a>
										<a
											href={`mailto:${member.contact.email}`}
											className='flex-1 flex items-center justify-center py-2 px-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm'
										>
											<Mail className='w-4 h-4 mr-1' />
											Email
										</a>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>

			{/* Awards & Recognition */}
			<div className='bg-gradient-to-br from-gray-900 to-blue-900 py-20 text-white'>
				<div className='container mx-auto px-4'>
					<div className='text-center mb-16'>
						<div className='w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6'>
							<Award className='w-8 h-8 text-white' />
						</div>
						<h2 className='text-4xl font-bold mb-4'>Awards & Recognition</h2>
						<p className='text-xl text-blue-100 max-w-2xl mx-auto'>
							Our commitment to excellence has been recognized by industry
							leaders and clients alike
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto'>
						{achievements.map((achievement, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								className='text-center group'
							>
								<div
									className={`w-20 h-20 bg-gradient-to-br from-${achievement.color}-400 to-${achievement.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
								>
									<achievement.icon className='w-10 h-10 text-white' />
								</div>
								<h3 className='text-lg font-bold mb-2 group-hover:text-yellow-400 transition-colors'>
									{achievement.title}
								</h3>
								<p className='text-blue-200 text-sm'>
									{achievement.organization}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</div>

			{/* Client Testimonials */}
			<div className='bg-white py-20'>
				<div className='container mx-auto px-4'>
					<div className='text-center mb-16'>
						<div className='w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6'>
							<Quote className='w-8 h-8 text-white' />
						</div>
						<h2 className='text-4xl font-bold text-gray-900 mb-4'>
							What Our Clients Say
						</h2>
						<p className='text-xl text-gray-600 max-w-2xl mx-auto'>
							Don't just take our word for it - hear from the families and
							businesses we've helped
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
						{testimonials.map((testimonial, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.2 }}
								className='bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 relative'
							>
								<div className='absolute -top-4 left-8 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center'>
									<Quote className='w-4 h-4 text-white' />
								</div>

								<div className='flex items-center space-x-1 mb-4'>
									{[...Array(testimonial.rating)].map((_, i) => (
										<Star
											key={i}
											className='w-5 h-5 text-yellow-400 fill-current'
										/>
									))}
								</div>

								<p className='text-gray-700 mb-6 leading-relaxed italic'>
									"{testimonial.content}"
								</p>

								<div className='flex items-center'>
									<img
										src={testimonial.image}
										alt={testimonial.name}
										className='w-12 h-12 rounded-full object-cover mr-4'
									/>
									<div>
										<h4 className='font-semibold text-gray-900'>
											{testimonial.name}
										</h4>
										<p className='text-gray-600 text-sm'>{testimonial.role}</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>

			{/* Final CTA Section */}
			<div className='bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-20 relative overflow-hidden'>
				{/* Background decorations */}
				<div className='absolute inset-0 opacity-10'>
					<div className='absolute top-20 left-20 w-32 h-32 border-2 border-white rounded-full animate-pulse'></div>
					<div className='absolute bottom-20 right-20 w-24 h-24 border-2 border-white rounded-lg transform rotate-45 animate-pulse'></div>
					<div
						className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white rounded-full animate-spin'
						style={{ animationDuration: '20s' }}
					></div>
				</div>

				<div className='container mx-auto px-4 relative z-10'>
					<div className='max-w-4xl mx-auto text-center'>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
						>
							<div className='w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm'>
								<Home className='w-10 h-10 text-white' />
							</div>

							<h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
								Ready to Start Your
								<span className='block text-yellow-400'>Property Journey?</span>
							</h2>

							<p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto'>
								Let our experienced team help you find the perfect property.
								Contact us today for a free consultation.
							</p>

							<div className='flex flex-col sm:flex-row gap-4 justify-center'>
								<a
									href='/contact'
									className='inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-2xl hover:bg-gray-100 transition-colors font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1'
								>
									<Phone className='w-5 h-5 mr-3' />
									Get Free Consultation
								</a>
								<a
									href='/properties'
									className='inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300 font-bold text-lg'
								>
									<Home className='w-5 h-5 mr-3' />
									Browse Properties
								</a>
							</div>

							{/* Trust indicators */}
							<div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-blue-100'>
								<div className='text-center'>
									<div className='text-3xl font-bold text-white mb-2'>15+</div>
									<div className='text-sm'>Years of Experience</div>
								</div>
								<div className='text-center'>
									<div className='text-3xl font-bold text-white mb-2'>10K+</div>
									<div className='text-sm'>Happy Clients</div>
								</div>
								<div className='text-center'>
									<div className='text-3xl font-bold text-white mb-2'>98%</div>
									<div className='text-sm'>Satisfaction Rate</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</div>

			{/* Why Choose Us Section */}
			<div className='bg-gradient-to-br from-gray-50 to-blue-50 py-20'>
				<div className='container mx-auto px-4'>
					<div className='text-center mb-16'>
						<div className='w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6'>
							<CheckCircle className='w-8 h-8 text-white' />
						</div>
						<h2 className='text-4xl font-bold text-gray-900 mb-4'>
							Why Choose Chance Realty?
						</h2>
						<p className='text-xl text-gray-600 max-w-2xl mx-auto'>
							Here's what sets us apart from other real estate agencies in
							Armenia
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
						{[
							{
								icon: Shield,
								title: 'Trusted & Reliable',
								description:
									'Over 15 years of proven track record with transparent processes and honest communication.',
								color: 'blue',
								stats: '10,000+ satisfied clients',
							},
							{
								icon: Users,
								title: 'Expert Team',
								description:
									'Our certified professionals have deep knowledge of the Armenian real estate market.',
								color: 'green',
								stats: '50+ expert agents',
							},
							{
								icon: Zap,
								title: 'Fast & Efficient',
								description:
									'Streamlined processes and digital tools ensure quick property transactions.',
								color: 'yellow',
								stats: 'Average 30-day closing',
							},
							{
								icon: Heart,
								title: 'Personalized Service',
								description:
									'We treat every client as family, providing tailored solutions for your unique needs.',
								color: 'red',
								stats: '24/7 customer support',
							},
							{
								icon: TrendingUp,
								title: 'Market Leadership',
								description:
									'We stay ahead of market trends to provide you with the best investment opportunities.',
								color: 'purple',
								stats: '#1 in Yerevan',
							},
							{
								icon: Globe,
								title: 'Technology Driven',
								description:
									'Advanced online platform and tools make property search and management easier.',
								color: 'indigo',
								stats: 'Digital-first approach',
							},
						].map((feature, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								className='bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group'
							>
								<div
									className={`w-16 h-16 bg-gradient-to-br from-${feature.color}-400 to-${feature.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
								>
									<feature.icon className='w-8 h-8 text-white' />
								</div>
								<h3 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors'>
									{feature.title}
								</h3>
								<p className='text-gray-600 mb-4 leading-relaxed'>
									{feature.description}
								</p>
								<div
									className={`inline-flex items-center px-3 py-1 bg-${feature.color}-100 text-${feature.color}-700 rounded-full text-sm font-semibold`}
								>
									{feature.stats}
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>

			{/* Company Culture & Office */}
			<div className='bg-white py-20'>
				<div className='container mx-auto px-4'>
					<div className='max-w-6xl mx-auto'>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
							<div>
								<div className='w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6'>
									<Building2 className='w-8 h-8 text-white' />
								</div>
								<h2 className='text-4xl font-bold text-gray-900 mb-6'>
									Our Modern Office
								</h2>
								<p className='text-xl text-gray-600 mb-6 leading-relaxed'>
									Located in the heart of Yerevan's business district, our
									modern office is equipped with the latest technology and
									designed to provide the best experience for our clients and
									team.
								</p>

								<div className='space-y-4 mb-8'>
									{[
										'State-of-the-art meeting rooms',
										'Virtual reality property tours',
										'Client lounge and coffee bar',
										'On-site parking available',
										'Accessible for all visitors',
									].map((feature, index) => (
										<div key={index} className='flex items-center'>
											<CheckCircle className='w-5 h-5 text-green-500 mr-3' />
											<span className='text-gray-700'>{feature}</span>
										</div>
									))}
								</div>

								<div className='flex space-x-4'>
									<a
										href='/contact'
										className='inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold'
									>
										<MapPin className='w-4 h-4 mr-2' />
										Visit Our Office
									</a>
									<a
										href='tel:+37400000000'
										className='inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-semibold'
									>
										<Phone className='w-4 h-4 mr-2' />
										Call Us
									</a>
								</div>
							</div>

							<div className='relative'>
								{/* Office image placeholder */}
								<div className='relative h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl overflow-hidden shadow-2xl'>
									<div className='absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-200 opacity-75'></div>
									<div className='absolute inset-0 flex items-center justify-center'>
										<div className='text-center'>
											<Building2 className='w-24 h-24 text-blue-600 mx-auto mb-4' />
											<h3 className='text-2xl font-bold text-gray-800 mb-2'>
												Modern Office Space
											</h3>
											<p className='text-gray-600'>Yerevan Business Center</p>
										</div>
									</div>
								</div>

								{/* Floating elements */}
								<div className='absolute -top-4 -right-4 w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center'>
									<div className='text-center'>
										<div className='text-2xl font-bold text-blue-600'>24/7</div>
										<div className='text-xs text-gray-600'>Support</div>
									</div>
								</div>

								<div className='absolute -bottom-4 -left-4 w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center'>
									<div className='text-center'>
										<div className='text-2xl font-bold text-green-600'>98%</div>
										<div className='text-xs text-gray-600'>Satisfied</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Community Involvement */}
			<div className='bg-gradient-to-br from-green-50 to-emerald-50 py-20'>
				<div className='container mx-auto px-4'>
					<div className='text-center mb-16'>
						<div className='w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6'>
							<Heart className='w-8 h-8 text-white' />
						</div>
						<h2 className='text-4xl font-bold text-gray-900 mb-4'>
							Community Involvement
						</h2>
						<p className='text-xl text-gray-600 max-w-2xl mx-auto'>
							We believe in giving back to the community that has supported our
							growth over the years
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
						{[
							{
								title: 'Housing for Families',
								description:
									'We provide pro-bono services to help low-income families find affordable housing solutions.',
								impact: '200+ families helped',
								icon: Home,
								color: 'blue',
							},
							{
								title: 'Youth Education',
								description:
									'Scholarship programs and internships for students interested in real estate careers.',
								impact: '50+ students supported',
								icon: Users,
								color: 'purple',
							},
							{
								title: 'Local Development',
								description:
									'Supporting local businesses and community development projects throughout Armenia.',
								impact: '15+ projects funded',
								icon: Building2,
								color: 'green',
							},
						].map((initiative, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.2 }}
								className='bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 text-center'
							>
								<div
									className={`w-16 h-16 bg-gradient-to-br from-${initiative.color}-400 to-${initiative.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
								>
									<initiative.icon className='w-8 h-8 text-white' />
								</div>
								<h3 className='text-xl font-bold text-gray-900 mb-4'>
									{initiative.title}
								</h3>
								<p className='text-gray-600 mb-4 leading-relaxed'>
									{initiative.description}
								</p>
								<div
									className={`inline-flex items-center px-4 py-2 bg-${initiative.color}-100 text-${initiative.color}-700 rounded-full font-semibold text-sm`}
								>
									{initiative.impact}
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>

			{/* Custom Styles */}
			<style jsx>{`
				.animation-delay-1000 {
					animation-delay: 1s;
				}
				.animation-delay-2000 {
					animation-delay: 2s;
				}

				@keyframes float {
					0%,
					100% {
						transform: translateY(0px);
					}
					50% {
						transform: translateY(-20px);
					}
				}

				.animate-float {
					animation: float 6s ease-in-out infinite;
				}
			`}</style>
		</div>
	)
}

export default AboutClient
