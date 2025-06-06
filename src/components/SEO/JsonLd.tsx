'use client'

interface JsonLdProps {
	data: object
}

export default function JsonLd({ data }: JsonLdProps) {
	return (
		<script
			type='application/ld+json'
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(data, null, 2),
			}}
		/>
	)
}
