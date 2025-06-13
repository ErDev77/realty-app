// src/app/contact/page.tsx
'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import {
	MapPin,
	Phone,
	Mail,
	Clock,
	Send,
	MessageCircle,
	Users,
	CheckCircle,
	Star,
	ArrowRight,
	Globe,
	Calendar,
	HeadphonesIcon,
	Shield,
	Zap,
	Award,
} from 'lucide-react'

type FormData = {
	name: string
	email: string
	phone: string
	subject: string
	propertyType: string
	message: string
	preferredContact: string
}

const ContactClient = () => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitSuccess, setSubmitSuccess] = useState(false)
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>()

	const onSubmit = async (data: FormData) => {
		setIsSubmitting(true)

		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 2000))

			setSubmitSuccess(true)
			reset()

			// Auto-hide success message after 5 seconds
			setTimeout(() => {
				setSubmitSuccess(false)
			}, 5000)
		} catch (error) {
			console.error('Error submitting form:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	const contactMethods = [
		{
			icon: Phone,
			title: 'Call Us',
			details: '+374 00 000 000',
			description: 'Mon-Fri from 8am to 5pm',
			color: 'blue',
			gradient: 'from-blue-500 to-blue-600',
			action: 'tel:+37400000000',
		},
		{
			icon: Mail,
			title: 'Email Us',
			details: 'info@chancerealty.am',
			description: 'Online support',
			color: 'green',
			gradient: 'from-green-500 to-emerald-600',
			action: 'mailto:info@chancerealty.am',
		},
		{
			icon: MessageCircle,
			title: 'Live Chat',
			details: 'Start a conversation',
			description: "We're online now",
			color: 'purple',
			gradient: 'from-purple-500 to-purple-600',
			action: '#',
		},
		{
			icon: MapPin,
			title: 'Visit Us',
			details: 'Yerevan, Armenia',
			description: 'Come say hello',
			color: 'orange',
			gradient: 'from-orange-500 to-red-500',
			action: '#',
		},
	]

	const features = [
		{
			icon: Shield,
			title: '100% Secure',
			description:
				'Your information is protected with enterprise-grade security',
		},
		{
			icon: Zap,
			title: 'Quick Response',
			description:
				'We respond to all inquiries within 2 hours during business days',
		},
		{
			icon: Award,
			title: 'Expert Advice',
			description:
				'Get professional guidance from our certified real estate experts',
		},
	]

	const stats = [
		{ number: '10K+', label: 'Happy Clients', icon: '😊' },
		{ number: '24/7', label: 'Support Available', icon: '🕒' },
		{ number: '98%', label: 'Satisfaction Rate', icon: '⭐' },
		{ number: '<2hrs', label: 'Response Time', icon: '⚡' },
	]

	const faqs = [
		{
			question: 'How quickly can I expect a response?',
			answer:
				'We aim to respond to all inquiries within 2 hours during business days (9 AM - 6 PM). For urgent matters, please call us directly.',
		},
		{
			question: 'Do you offer property viewing appointments?',
			answer:
				'Yes! We offer both in-person and virtual property tours. You can schedule appointments through our contact form or by calling us directly.',
		},
		{
			question: 'What areas do you serve?',
			answer:
				'We primarily serve Yerevan and surrounding areas in Armenia. For properties outside our main service area, we can connect you with trusted partners.',
		},
		{
			question: 'Is there a fee for your consultation services?',
			answer:
				'Initial consultations and property searches are completely free. We only charge commission upon successful property transactions.',
		},
		{
			question: 'Can you help with property financing?',
			answer:
				'Yes, we work with various banks and financial institutions to help you find the best financing options for your property purchase.',
		},
	]

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

				<div className='container mx-auto px-4 py-20 md:py-28 relative z-10'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='max-w-4xl mx-auto text-center'
					>
						{/* Icon */}
						<div className='inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl mb-6 backdrop-blur-sm shadow-2xl'>
							<MessageCircle className='w-10 h-10 text-white' />
						</div>

						<h1 className='text-5xl md:text-7xl font-bold mb-6 leading-tight'>
							Let's Start a
							<span className='block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent'>
								Conversation
							</span>
						</h1>
						<p className='text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8'>
							Have questions about properties? Need expert advice? We're here to
							help you find your perfect home.
						</p>

						{/* Quick stats */}
						<div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto'>
							{stats.map((stat, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className='text-center'
								>
									<div className='text-3xl mb-1'>{stat.icon}</div>
									<div className='text-2xl font-bold text-white'>
										{stat.number}
									</div>
									<div className='text-blue-200 text-sm'>{stat.label}</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</div>

			{/* Quick Contact Methods */}
			<div className='relative -mt-16 z-10'>
				<div className='container mx-auto px-4'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto'>
						{contactMethods.map((method, index) => (
							<motion.a
								key={index}
								href={method.action}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								className='group bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center'
							>
								<div
									className={`w-16 h-16 bg-gradient-to-br ${method.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
								>
									<method.icon className='w-8 h-8 text-white' />
								</div>
								<h3 className='text-lg font-bold text-gray-900 mb-1'>
									{method.title}
								</h3>
								<p className='text-blue-600 font-semibold mb-1'>
									{method.details}
								</p>
								<p className='text-gray-600 text-sm'>{method.description}</p>
								<div className='mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
									<ArrowRight
										className={`w-4 h-4 text-${method.color}-600 mx-auto`}
									/>
								</div>
							</motion.a>
						))}
					</div>
				</div>
			</div>

			{/* Main Contact Section */}
			<div className='container mx-auto px-4 py-20'>
				<div className='grid grid-cols-1 xl:grid-cols-3 gap-12 max-w-7xl mx-auto'>
					{/* Contact Information */}
					<div className='xl:col-span-1'>
						<div className='bg-white rounded-3xl shadow-xl p-8 border border-gray-100 sticky top-8'>
							<div className='text-center mb-8'>
								<div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
									<Users className='w-8 h-8 text-white' />
								</div>
								<h2 className='text-2xl font-bold text-gray-900 mb-2'>
									Get in Touch
								</h2>
								<p className='text-gray-600'>
									We'd love to hear from you. Our team is always here to help.
								</p>
							</div>

							<div className='space-y-6 mb-8'>
								{[
									{
										icon: MapPin,
										title: 'Our Location',
										details: 'Yerevan, Armenia',
										description: 'Central Business District',
										color: 'blue',
									},
									{
										icon: Phone,
										title: 'Phone Number',
										details: '+374 00 000 000',
										description: 'Mon-Fri, 9 AM - 6 PM',
										color: 'green',
									},
									{
										icon: Mail,
										title: 'Email Address',
										details: 'info@chancerealty.am',
										description: '24/7 Online Support',
										color: 'purple',
									},
									{
										icon: Clock,
										title: 'Business Hours',
										details: 'Monday - Friday',
										description: '9:00 AM - 6:00 PM',
										color: 'orange',
									},
								].map((item, index) => (
									<div
										key={index}
										className='group flex items-start p-4 hover:bg-gray-50 rounded-xl transition-colors'
									>
										<div
											className={`p-3 bg-${item.color}-100 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-200`}
										>
											<item.icon className={`h-5 w-5 text-${item.color}-600`} />
										</div>
										<div className='flex-1'>
											<h3 className='font-semibold text-gray-900 mb-1'>
												{item.title}
											</h3>
											<p className='text-gray-700 font-medium'>
												{item.details}
											</p>
											<p className='text-gray-500 text-sm'>
												{item.description}
											</p>
										</div>
									</div>
								))}
							</div>

							{/* Features */}
							<div className='space-y-4'>
								<h3 className='font-semibold text-gray-900 mb-4 flex items-center'>
									<Star className='w-4 h-4 mr-2 text-yellow-500' />
									Why Choose Us
								</h3>
								{features.map((feature, index) => (
									<div key={index} className='flex items-start space-x-3'>
										<div className='p-2 bg-blue-100 rounded-lg'>
											<feature.icon className='w-4 h-4 text-blue-600' />
										</div>
										<div>
											<h4 className='font-medium text-gray-900 text-sm'>
												{feature.title}
											</h4>
											<p className='text-gray-600 text-xs'>
												{feature.description}
											</p>
										</div>
									</div>
								))}
							</div>

							{/* Social Links */}
							<div className='mt-8 pt-6 border-t border-gray-100'>
								<h3 className='font-semibold text-gray-900 mb-4'>
									Connect With Us
								</h3>
								<div className='flex space-x-3'>
									{[
										{ name: 'Facebook', color: 'blue', href: '#' },
										{ name: 'Instagram', color: 'pink', href: '#' },
										{ name: 'LinkedIn', color: 'blue', href: '#' },
										{ name: 'Twitter', color: 'blue', href: '#' },
									].map((social, index) => (
										<a
											key={index}
											href={social.href}
											className={`group relative p-3 bg-gray-100 rounded-xl hover:bg-${social.color}-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`}
											aria-label={social.name}
										>
											<div className='w-5 h-5 bg-gray-600 group-hover:bg-white rounded transition-colors'></div>
											<div className='absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
										</a>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Contact Form */}
					<div className='xl:col-span-2'>
						<div className='bg-white rounded-3xl shadow-xl p-8 border border-gray-100'>
							<div className='text-center mb-8'>
								<div className='w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
									<Send className='w-8 h-8 text-white' />
								</div>
								<h2 className='text-3xl font-bold text-gray-900 mb-2'>
									Send Us a Message
								</h2>
								<p className='text-gray-600'>
									Fill out the form below and we'll get back to you as soon as
									possible.
								</p>
							</div>

							{submitSuccess ? (
								<motion.div
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									className='text-center py-12'
								>
									<div className='w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
										<CheckCircle className='w-12 h-12 text-green-600' />
									</div>
									<h3 className='text-2xl font-bold text-green-600 mb-3'>
										Message Sent Successfully!
									</h3>
									<p className='text-gray-600 mb-6'>
										Thank you for reaching out. We'll get back to you within 2
										hours during business days.
									</p>
									<div className='flex items-center justify-center space-x-4 text-sm text-gray-500'>
										<div className='flex items-center'>
											<Clock className='w-4 h-4 mr-2' />
											<span>Response within 2 hours</span>
										</div>
										<div className='flex items-center'>
											<HeadphonesIcon className='w-4 h-4 mr-2' />
											<span>Expert consultation</span>
										</div>
									</div>
								</motion.div>
							) : (
								<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
									{/* Personal Information */}
									<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
										<div className='group'>
											<label
												htmlFor='name'
												className='block text-sm font-semibold text-gray-700 mb-2'
											>
												Your Name *
											</label>
											<input
												type='text'
												id='name'
												className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 ${
													errors.name
														? 'border-red-300 bg-red-50'
														: 'border-gray-200 hover:border-gray-300'
												}`}
												placeholder='John Doe'
												{...register('name', { required: 'Name is required' })}
											/>
											{errors.name && (
												<motion.p
													initial={{ opacity: 0, y: -10 }}
													animate={{ opacity: 1, y: 0 }}
													className='mt-2 text-sm text-red-600 flex items-center'
												>
													<span className='mr-1'>⚠️</span>
													{errors.name.message}
												</motion.p>
											)}
										</div>

										<div className='group'>
											<label
												htmlFor='email'
												className='block text-sm font-semibold text-gray-700 mb-2'
											>
												Email Address *
											</label>
											<input
												type='email'
												id='email'
												className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 ${
													errors.email
														? 'border-red-300 bg-red-50'
														: 'border-gray-200 hover:border-gray-300'
												}`}
												placeholder='john.doe@example.com'
												{...register('email', {
													required: 'Email is required',
													pattern: {
														value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
														message: 'Invalid email address',
													},
												})}
											/>
											{errors.email && (
												<motion.p
													initial={{ opacity: 0, y: -10 }}
													animate={{ opacity: 1, y: 0 }}
													className='mt-2 text-sm text-red-600 flex items-center'
												>
													<span className='mr-1'>⚠️</span>
													{errors.email.message}
												</motion.p>
											)}
										</div>
									</div>

									<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
										<div className='group'>
											<label
												htmlFor='phone'
												className='block text-sm font-semibold text-gray-700 mb-2'
											>
												Phone Number
											</label>
											<input
												type='tel'
												id='phone'
												className='w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-300'
												placeholder='+374 00 000 000'
												{...register('phone')}
											/>
										</div>

										<div className='group'>
											<label
												htmlFor='propertyType'
												className='block text-sm font-semibold text-gray-700 mb-2'
											>
												Property Interest
											</label>
											<select
												id='propertyType'
												className='w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-300 bg-white'
												{...register('propertyType')}
											>
												<option value=''>Select property type</option>
												<option value='house'>House</option>
												<option value='apartment'>Apartment</option>
												<option value='commercial'>Commercial</option>
												<option value='land'>Land</option>
											</select>
										</div>
									</div>

									<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
										<div className='group'>
											<label
												htmlFor='subject'
												className='block text-sm font-semibold text-gray-700 mb-2'
											>
												Subject *
											</label>
											<input
												type='text'
												id='subject'
												className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 ${
													errors.subject
														? 'border-red-300 bg-red-50'
														: 'border-gray-200 hover:border-gray-300'
												}`}
												placeholder='How can we help you?'
												{...register('subject', {
													required: 'Subject is required',
												})}
											/>
											{errors.subject && (
												<motion.p
													initial={{ opacity: 0, y: -10 }}
													animate={{ opacity: 1, y: 0 }}
													className='mt-2 text-sm text-red-600 flex items-center'
												>
													<span className='mr-1'>⚠️</span>
													{errors.subject.message}
												</motion.p>
											)}
										</div>

										<div className='group'>
											<label
												htmlFor='preferredContact'
												className='block text-sm font-semibold text-gray-700 mb-2'
											>
												Preferred Contact Method
											</label>
											<select
												id='preferredContact'
												className='w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-300 bg-white'
												{...register('preferredContact')}
											>
												<option value=''>No preference</option>
												<option value='email'>Email</option>
												<option value='phone'>Phone</option>
												<option value='whatsapp'>WhatsApp</option>
											</select>
										</div>
									</div>

									<div className='group'>
										<label
											htmlFor='message'
											className='block text-sm font-semibold text-gray-700 mb-2'
										>
											Message *
										</label>
										<textarea
											id='message'
											rows={6}
											className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 resize-none ${
												errors.message
													? 'border-red-300 bg-red-50'
													: 'border-gray-200 hover:border-gray-300'
											}`}
											placeholder='Tell us about your property needs, questions, or how we can assist you...'
											{...register('message', {
												required: 'Message is required',
											})}
										/>
										{errors.message && (
											<motion.p
												initial={{ opacity: 0, y: -10 }}
												animate={{ opacity: 1, y: 0 }}
												className='mt-2 text-sm text-red-600 flex items-center'
											>
												<span className='mr-1'>⚠️</span>
												{errors.message.message}
											</motion.p>
										)}
									</div>

									<div className='flex flex-col sm:flex-row gap-4'>
										<button
											type='submit'
											disabled={isSubmitting}
											className='flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none'
										>
											{isSubmitting ? (
												<>
													<div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
													<span>Sending Message...</span>
												</>
											) : (
												<>
													<Send className='h-5 w-5' />
													<span>Send Message</span>
												</>
											)}
										</button>

										<button
											type='button'
											onClick={() => reset()}
											className='px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors'
										>
											Clear Form
										</button>
									</div>

									{/* Form Footer */}
									<div className='bg-blue-50 rounded-xl p-4 border border-blue-200'>
										<div className='flex items-center space-x-2 text-sm text-blue-800'>
											<Shield className='w-4 h-4' />
											<span className='font-medium'>
												Your information is secure and will never be shared with
												third parties.
											</span>
										</div>
									</div>
								</form>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* FAQ Section */}
			<div className='bg-white py-20'>
				<div className='container mx-auto px-4'>
					<div className='max-w-4xl mx-auto'>
						<div className='text-center mb-16'>
							<div className='w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6'>
								<MessageCircle className='w-8 h-8 text-white' />
							</div>
							<h2 className='text-4xl font-bold text-gray-900 mb-4'>
								Frequently Asked Questions
							</h2>
							<p className='text-xl text-gray-600'>
								Find answers to common questions about our services and support.
							</p>
						</div>

						<div className='space-y-6'>
							{faqs.map((faq, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									className='bg-gray-50 hover:bg-gray-100 rounded-2xl p-6 transition-colors duration-200 border border-gray-100'
								>
									<h3 className='text-lg font-semibold text-gray-900 mb-3 flex items-center'>
										<div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3'>
											<span className='text-blue-600 font-bold text-sm'>
												{index + 1}
											</span>
										</div>
										{faq.question}
									</h3>
									<p className='text-gray-600 leading-relaxed ml-11'>
										{faq.answer}
									</p>
								</motion.div>
							))}
						</div>

						{/* CTA after FAQ */}
						<div className='text-center mt-12'>
							<p className='text-gray-600 mb-6'>
								Still have questions? We're here to help!
							</p>
							<div className='flex flex-col sm:flex-row gap-4 justify-center'>
								<a
									href='tel:+37400000000'
									className='inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold'
								>
									<Phone className='w-4 h-4 mr-2' />
									Call Us Now
								</a>
								<a
									href='mailto:info@chancerealty.am'
									className='inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-semibold'
								>
									<Mail className='w-4 h-4 mr-2' />
									Send Email
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Map Section */}
			<div className='bg-gradient-to-br from-gray-100 to-gray-200 py-20'>
				<div className='container mx-auto px-4'>
					<div className='max-w-6xl mx-auto'>
						<div className='text-center mb-12'>
							<h2 className='text-3xl font-bold text-gray-900 mb-4'>
								Visit Our Office
							</h2>
							<p className='text-gray-600'>
								Located in the heart of Yerevan's business district
							</p>
						</div>
						<div className='bg-white rounded-3xl shadow-2xl p-6 border border-gray-100'>
							<div className='w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center relative overflow-hidden'>
								{/* Map placeholder with interactive elements */}
								<div className='absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-200 opacity-50'></div>
								<div className='relative z-10 text-center'>
									<div className='w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
										<MapPin className='w-10 h-10 text-blue-600' />
									</div>
									<h3 className='text-xl font-bold text-gray-800 mb-2'>
										Interactive Map
									</h3>
									<p className='text-gray-600 mb-4'>
										Map integration would go here (Google Maps, Mapbox, etc.)
									</p>
									<div className='inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
										<Globe className='w-4 h-4 mr-2' />
										View on Maps
									</div>
								</div>

								{/* Decorative map pins */}
								<div className='absolute top-1/4 left-1/4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-bounce shadow-lg'>
									<MapPin className='w-4 h-4 text-white' />
								</div>
								<div className='absolute top-1/3 right-1/3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse shadow-lg'>
									<div className='w-2 h-2 bg-white rounded-full'></div>
								</div>
								<div className='absolute bottom-1/3 left-1/2 w-4 h-4 bg-green-500 rounded-full animate-ping shadow-lg'></div>
							</div>

							{/* Map info cards */}
							<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
								{[
									{
										icon: MapPin,
										title: 'Address',
										content: 'Central Business District, Yerevan, Armenia',
										color: 'blue',
									},
									{
										icon: Calendar,
										title: 'Office Hours',
										content: 'Monday - Friday: 9:00 AM - 6:00 PM',
										color: 'green',
									},
									{
										icon: Phone,
										title: 'Parking',
										content: 'Free parking available for visitors',
										color: 'purple',
									},
								].map((item, index) => (
									<div
										key={index}
										className='flex items-center p-4 bg-gray-50 rounded-xl'
									>
										<div className={`p-3 bg-${item.color}-100 rounded-xl mr-4`}>
											<item.icon className={`w-5 h-5 text-${item.color}-600`} />
										</div>
										<div>
											<h4 className='font-semibold text-gray-900 text-sm'>
												{item.title}
											</h4>
											<p className='text-gray-600 text-sm'>{item.content}</p>
										</div>
									</div>
								))}
							</div>
						</div>
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
								<ArrowRight className='w-10 h-10 text-white' />
							</div>

							<h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
								Ready to Find Your
								<span className='block text-yellow-400'>Dream Property?</span>
							</h2>

							<p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto'>
								Don't wait any longer. Contact our expert team today and let us
								help you find the perfect property that matches your needs and
								budget.
							</p>

							<div className='flex flex-col sm:flex-row gap-4 justify-center'>
								<a
									href='tel:+37400000000'
									className='inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-2xl hover:bg-gray-100 transition-colors font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1'
								>
									<Phone className='w-5 h-5 mr-3' />
									Call Now: +374 00 000 000
								</a>
								<a
									href='#contact-form'
									onClick={e => {
										e.preventDefault()
										document
											.querySelector('form')
											?.scrollIntoView({ behavior: 'smooth' })
									}}
									className='inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300 font-bold text-lg'
								>
									<MessageCircle className='w-5 h-5 mr-3' />
									Send Message
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

			{/* Success Toast Component */}
			{submitSuccess && (
				<motion.div
					initial={{ opacity: 0, x: 300 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 300 }}
					className='fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-xl shadow-2xl z-50 max-w-sm'
				>
					<div className='flex items-center'>
						<CheckCircle className='w-6 h-6 mr-3' />
						<div>
							<h4 className='font-semibold'>Message Sent!</h4>
							<p className='text-sm opacity-90'>
								We'll respond within 2 hours.
							</p>
						</div>
					</div>
				</motion.div>
			)}

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

export default ContactClient
