// src/components/TranslatedProperty.tsx
'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import PropertyCard from '@/app/_components/PropertyCard'
import { Property } from '@/types/property'

interface TranslatedPropertyProps {
	property: Property
	variant?: 'default' | 'featured' | 'compact'
	onFavoriteClick?: (propertyId: number) => void
	isFavorited?: boolean
}

export default function TranslatedProperty({
	property,
	variant = 'default',
	onFavoriteClick,
	isFavorited = false,
}: TranslatedPropertyProps) {
	const { translateProperty, language } = useTranslation()
	const [translatedProperty, setTranslatedProperty] =
		useState<Property>(property)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const performTranslation = async () => {
			if (language === 'hy') {
				setTranslatedProperty(property)
				return
			}

			setIsLoading(true)
			try {
				const result = await translateProperty(property)
				setTranslatedProperty(result)
			} catch (error) {
				console.error('Property translation failed:', error)
				setTranslatedProperty(property) // Fallback to original
			} finally {
				setIsLoading(false)
			}
		}

		performTranslation()
	}, [property, language, translateProperty])

	return (
		<div className='relative'>
			<PropertyCard
				property={translatedProperty}
				variant={variant}
				onFavoriteClick={onFavoriteClick}
				isFavorited={isFavorited}
			/>

			{isLoading && (
				<div className='absolute inset-0 bg-white/70 rounded-xl flex items-center justify-center'>
					<div className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium animate-pulse'>
						Translating...
					</div>
				</div>
			)}
		</div>
	)
}
