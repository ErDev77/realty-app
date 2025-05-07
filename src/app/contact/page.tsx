// src/app/contact/page.tsx
'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'

type FormData = {
	name: string
	email: string
	subject: string
	message: string
}

const ContactPage = () => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>()

	const onSubmit = async (data: FormData) => {
		setIsSubmitting(true)

		// Simulate API call with timeout
		try {
			// In a real application, you would send the form data to your API
			// Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });
			await new Promise(resolve => setTimeout(resolve, 1500))

			toast.success('Message sent successfully!')
			reset()
		} catch (error) {
			toast.error('Failed to send message. Please try again.')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className='bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen'>
			{/* Hero Section */}
			<div className='bg-blue-600 text-white'>
				<div className='container mx-auto px-4 py-16 md:py-24'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className='max-w-4xl mx-auto text-center'
					>
						<h1 className='text-4xl md:text-5xl font-bold mb-4'>
							Get in Touch
						</h1>
						<p className='text-xl md:text-2xl text-blue-100'>
							We'd love to hear from you. Our team is always here to help.
						</p>
					</motion.div>
				</div>
			</div>

			{/* Contact Section */}
			<div className='container mx-auto px-4 py-16'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
					{/* Contact Information */}
					<div className='lg:col-span-1'>
						<div className='bg-white rounded-xl shadow-md p-8'>
							<h2 className='text-2xl font-bold text-gray-800 mb-6'>
								Contact Information
							</h2>

							<div className='space-y-6'>
								<div className='flex items-start'>
									<div className='bg-blue-50 p-3 rounded-full mr-4'>
										<MapPin className='h-6 w-6 text-blue-600' />
									</div>
									<div>
										<h3 className='font-medium text-gray-900'>Our Location</h3>
										<p className='text-gray-600 mt-1'>
											123 Innovation Street, Tech City, TC 10010
										</p>
									</div>
								</div>

								<div className='flex items-start'>
									<div className='bg-blue-50 p-3 rounded-full mr-4'>
										<Phone className='h-6 w-6 text-blue-600' />
									</div>
									<div>
										<h3 className='font-medium text-gray-900'>Phone Number</h3>
										<p className='text-gray-600 mt-1'>+1 (555) 123-4567</p>
									</div>
								</div>

								<div className='flex items-start'>
									<div className='bg-blue-50 p-3 rounded-full mr-4'>
										<Mail className='h-6 w-6 text-blue-600' />
									</div>
									<div>
										<h3 className='font-medium text-gray-900'>Email Address</h3>
										<p className='text-gray-600 mt-1'>contact@example.com</p>
									</div>
								</div>

								<div className='flex items-start'>
									<div className='bg-blue-50 p-3 rounded-full mr-4'>
										<Clock className='h-6 w-6 text-blue-600' />
									</div>
									<div>
										<h3 className='font-medium text-gray-900'>
											Business Hours
										</h3>
										<p className='text-gray-600 mt-1'>Monday-Friday: 9AM-6PM</p>
										<p className='text-gray-600'>Saturday-Sunday: Closed</p>
									</div>
								</div>
							</div>

							<div className='mt-8'>
								<h3 className='font-medium text-gray-900 mb-3'>
									Connect With Us
								</h3>
								<div className='flex space-x-4'>
									<a
										href='#'
										className='bg-gray-100 hover:bg-gray-200 transition p-3 rounded-full'
										aria-label='Twitter'
									>
										<svg
											className='h-5 w-5 text-gray-700'
											fill='currentColor'
											viewBox='0 0 24 24'
										>
											<path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
										</svg>
									</a>
									<a
										href='#'
										className='bg-gray-100 hover:bg-gray-200 transition p-3 rounded-full'
										aria-label='LinkedIn'
									>
										<svg
											className='h-5 w-5 text-gray-700'
											fill='currentColor'
											viewBox='0 0 24 24'
										>
											<path d='M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5v1.5c1-1.4 2.6-2.5 4.5-2.5 3.3 0 5.5 2.7 5.5 6.5v7.5h-5v-7c0-1-1-2-3-2z' />
										</svg>
									</a>
									<a
										href='#'
										className='bg-gray-100 hover:bg-gray-200 transition p-3 rounded-full'
										aria-label='Facebook'
									>
										<svg
											className='h-5 w-5 text-gray-700'
											fill='currentColor'
											viewBox='0 0 24 24'
										>
											<path d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' />
										</svg>
									</a>
									<a
										href='#'
										className='bg-gray-100 hover:bg-gray-200 transition p-3 rounded-full'
										aria-label='Instagram'
									>
										<svg
											className='h-5 w-5 text-gray-700'
											fill='currentColor'
											viewBox='0 0 24 24'
										>
											<path d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z' />
										</svg>
									</a>
								</div>
							</div>
						</div>
					</div>

					{/* Contact Form */}
					<div className='lg:col-span-2'>
						<div className='bg-white rounded-xl shadow-md p-8'>
							<h2 className='text-2xl font-bold text-gray-800 mb-6'>
								Send Us a Message
							</h2>

							<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									<div>
										<label
											htmlFor='name'
											className='block text-sm font-medium text-gray-700 mb-1'
										>
											Your Name
										</label>
										<input
											type='text'
											id='name'
											className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
												errors.name ? 'border-red-500' : 'border-gray-300'
											}`}
											placeholder='John Doe'
											{...register('name', { required: 'Name is required' })}
										/>
										{errors.name && (
											<p className='mt-1 text-sm text-red-600'>
												{errors.name.message}
											</p>
										)}
									</div>
									<div>
										<label
											htmlFor='email'
											className='block text-sm font-medium text-gray-700 mb-1'
										>
											Your Email
										</label>
										<input
											type='email'
											id='email'
											className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
												errors.email ? 'border-red-500' : 'border-gray-300'
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
											<p className='mt-1 text-sm text-red-600'>
												{errors.email.message}
											</p>
										)}
									</div>
								</div>

								<div>
									<label
										htmlFor='subject'
										className='block text-sm font-medium text-gray-700 mb-1'
									>
										Subject
									</label>
									<input
										type='text'
										id='subject'
										className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
											errors.subject ? 'border-red-500' : 'border-gray-300'
										}`}
										placeholder='How can we help you?'
										{...register('subject', {
											required: 'Subject is required',
										})}
									/>
									{errors.subject && (
										<p className='mt-1 text-sm text-red-600'>
											{errors.subject.message}
										</p>
									)}
								</div>

								<div>
									<label
										htmlFor='message'
										className='block text-sm font-medium text-gray-700 mb-1'
									>
										Message
									</label>
									<textarea
										id='message'
										rows={5}
										className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
											errors.message ? 'border-red-500' : 'border-gray-300'
										}`}
										placeholder='Tell us how we can assist you...'
										{...register('message', {
											required: 'Message is required',
										})}
									/>
									{errors.message && (
										<p className='mt-1 text-sm text-red-600'>
											{errors.message.message}
										</p>
									)}
								</div>

								<div>
									<button
										type='submit'
										disabled={isSubmitting}
										className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition duration-300 flex items-center justify-center space-x-2'
									>
										{isSubmitting ? (
											<>
												<svg
													className='animate-spin h-5 w-5 text-white'
													xmlns='http://www.w3.org/2000/svg'
													fill='none'
													viewBox='0 0 24 24'
												>
													<circle
														className='opacity-25'
														cx='12'
														cy='12'
														r='10'
														stroke='currentColor'
														strokeWidth='4'
													></circle>
													<path
														className='opacity-75'
														fill='currentColor'
														d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
													></path>
												</svg>
												<span>Sending...</span>
											</>
										) : (
											<>
												<Send className='h-5 w-5' />
												<span>Send Message</span>
											</>
										)}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			{/* Map Section */}
			<div className='container mx-auto px-4 pb-16'>
				<div className='max-w-6xl mx-auto'>
					<div className='bg-white rounded-xl shadow-md p-3 h-96'>
						{/* For an actual map, integrate Google Maps or another mapping service */}
						<div className='w-full h-full bg-gray-200 rounded-lg flex items-center justify-center'>
							<p className='text-gray-600'>
								Map integration would go here (Google Maps, Mapbox, etc.)
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* FAQ Section */}
			<div className='container mx-auto px-4 py-16 bg-white'>
				<div className='max-w-4xl mx-auto text-center mb-12'>
					<h2 className='text-3xl font-bold text-gray-800'>
						Frequently Asked Questions
					</h2>
					<p className='text-gray-600 mt-4'>
						Find answers to common questions about our services and support.
					</p>
				</div>

				<div className='max-w-3xl mx-auto'>
					<div className='space-y-6'>
						{[
							{
								question: 'How quickly can I expect a response?',
								answer:
									'We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please indicate so in your message subject.',
							},
							{
								question: 'Do you offer technical support via phone?',
								answer:
									'Yes, our technical support team is available via phone during business hours. For complex issues, we recommend scheduling a call with one of our specialists.',
							},
							{
								question: 'Can I schedule a consultation meeting?',
								answer:
									'Absolutely! You can request a consultation through this contact form or call us directly to schedule a meeting with our team.',
							},
							{
								question:
									'What information should I include when reporting an issue?',
								answer:
									'Please include details such as the specific error messages, steps to reproduce the issue, and screenshots if possible. This helps us diagnose and resolve your issue faster.',
							},
						].map((faq, index) => (
							<div key={index} className='bg-gray-50 rounded-xl p-6'>
								<h3 className='text-lg font-medium text-gray-900'>
									{faq.question}
								</h3>
								<p className='mt-2 text-gray-600'>{faq.answer}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ContactPage
