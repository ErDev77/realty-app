// src/app/properties/page.tsx
'use client'

import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import PropertiesContent from './PropertiesContent'

// Loading component for the Suspense boundary
function LoadingFallback() {
	return (
		<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
			<Loader2 className='w-8 h-8 animate-spin text-blue-600' />
		</div>
	)
}

export default function PropertiesPage() {
	return (
		<Suspense fallback={<LoadingFallback />}>
			<PropertiesContent />
		</Suspense>
	)
}
