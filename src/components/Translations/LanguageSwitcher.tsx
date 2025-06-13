// src/components/LanguageSwitcher.tsx
'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Globe, ChevronDown } from 'lucide-react'
import { Language } from '@/hooks/useTranslation'

const languages = [
	{ code: 'hy' as Language, name: 'Հայերեն', flag: '🇦🇲', english: 'Armenian' },
	{ code: 'en' as Language, name: 'English', flag: '🇺🇸', english: 'English' },
	{ code: 'ru' as Language, name: 'Русский', flag: '🇷🇺', english: 'Russian' },
]

export default function LanguageSwitcher() {
	const router = useRouter()
	const pathname = usePathname()
	const [isOpen, setIsOpen] = useState(false)

	// Get current language from URL
	const currentLang = (pathname.split('/')[1] as Language) || 'hy'
	const currentLanguage =
		languages.find(lang => lang.code === currentLang) || languages[0]

	const switchLanguage = (newLang: Language) => {
		const pathParts = pathname.split('/')

		// Replace the language part of the URL
		if (['hy', 'en', 'ru'].includes(pathParts[1])) {
			pathParts[1] = newLang
		} else {
			pathParts.splice(1, 0, newLang) // Insert language if not present
		}

		const newPath = pathParts.join('/')

		// Set language preference in localStorage
		localStorage.setItem('preferred-language', newLang)

		router.push(newPath)
		setIsOpen(false)
	}

	return (
		<div className='relative'>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700'
				aria-label='Change language'
			>
				<Globe className='w-4 h-4' />
				<span className='text-lg'>{currentLanguage.flag}</span>
				<span className='hidden sm:inline font-medium'>
					{currentLanguage.name}
				</span>
				<ChevronDown
					className={`w-3 h-3 transition-transform ${
						isOpen ? 'rotate-180' : ''
					}`}
				/>
			</button>

			{isOpen && (
				<>
					{/* Backdrop */}
					<div
						className='fixed inset-0 z-40'
						onClick={() => setIsOpen(false)}
					/>

					{/* Dropdown */}
					<div className='absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50'>
						{languages.map(language => (
							<button
								key={language.code}
								onClick={() => switchLanguage(language.code)}
								className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
									language.code === currentLang
										? 'bg-blue-50 text-blue-600'
										: 'text-gray-700'
								}`}
							>
								<span className='text-lg'>{language.flag}</span>
								<div className='flex-1'>
									<div className='font-medium'>{language.name}</div>
									<div className='text-xs text-gray-500'>
										{language.english}
									</div>
								</div>
								{language.code === currentLang && (
									<span className='text-blue-600 font-bold'>✓</span>
								)}
							</button>
						))}
					</div>
				</>
			)}
		</div>
	)
}
