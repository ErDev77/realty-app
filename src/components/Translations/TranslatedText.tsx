// src/components/TranslatedText.tsx
'use client'

import { useState, useEffect } from 'react'
import { useTranslation, Language } from '@/hooks/useTranslation'

interface TranslatedTextProps {
	text: string
	sourceLanguage?: Language
	fallback?: string
	className?: string
	tag?: keyof JSX.IntrinsicElements
}

export default function TranslatedText({
	text,
	sourceLanguage = 'hy',
	fallback,
	className = '',
	tag: Tag = 'span',
}: TranslatedTextProps) {
	const { translate, language } = useTranslation()
	const [translatedText, setTranslatedText] = useState(text)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const performTranslation = async () => {
			if (!text) {
				setTranslatedText('')
				return
			}

			if (language === sourceLanguage) {
				setTranslatedText(text)
				return
			}

			setIsLoading(true)
			try {
				const result = await translate(text, sourceLanguage)
				setTranslatedText(result)
			} catch (error) {
				console.error('Translation failed:', error)
				setTranslatedText(fallback || text)
			} finally {
				setIsLoading(false)
			}
		}

		performTranslation()
	}, [text, language, sourceLanguage, translate, fallback])

	if (isLoading) {
		return (
			<Tag
				className={`${className} animate-pulse bg-gray-200 rounded text-transparent select-none`}
			>
				{text}
			</Tag>
		)
	}

	return <Tag className={className}>{translatedText}</Tag>
}
