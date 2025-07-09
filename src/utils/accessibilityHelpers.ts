import { formatPrice } from "./formatters"

// src/utils/accessibilityHelpers.ts - Accessibility improvements
export function generateAriaLabel(
	element: 'propertyCard' | 'navigationLink' | 'contactButton',
	data: any,
	language: 'hy' | 'en' | 'ru' = 'hy'
): string {

	switch (element) {
		case 'propertyCard':
			return `${data.title}, ${formatPrice(
				data.price,
				data.listing_type,
				data.currency,
				language
			)}, ${data.city?.name}`

		case 'navigationLink':
			return `${
				language === 'hy'
					? 'Անցնել'
					: language === 'ru'
					? 'Перейти к'
					: 'Navigate to'
			} ${data.label}`

		case 'contactButton':
			return `${
				language === 'hy'
					? 'Կապվել'
					: language === 'ru'
					? 'Связаться'
					: 'Contact'
			} ${data.method}`

		default:
			return ''
	}
}

// Focus management for accessibility
export function manageFocus() {
	return {
		trapFocus: (element: HTMLElement) => {
			const focusableElements = element.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			)
			const firstElement = focusableElements[0] as HTMLElement
			const lastElement = focusableElements[
				focusableElements.length - 1
			] as HTMLElement

			element.addEventListener('keydown', e => {
				if (e.key === 'Tab') {
					if (e.shiftKey) {
						if (document.activeElement === firstElement) {
							lastElement.focus()
							e.preventDefault()
						}
					} else {
						if (document.activeElement === lastElement) {
							firstElement.focus()
							e.preventDefault()
						}
					}
				}
			})
		},

		announceToScreenReader: (message: string) => {
			const announcement = document.createElement('div')
			announcement.setAttribute('aria-live', 'polite')
			announcement.setAttribute('aria-atomic', 'true')
			announcement.setAttribute('class', 'sr-only')
			announcement.textContent = message
			document.body.appendChild(announcement)

			setTimeout(() => {
				document.body.removeChild(announcement)
			}, 1000)
		},
	}
}
