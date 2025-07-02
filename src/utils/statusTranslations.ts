// Add this to src/utils/statusTranslations.ts
import { CheckCircle, Clock, XCircle, Pause, AlertCircle } from 'lucide-react'
export function getTranslatedStatus(
	status: any,
	language: 'hy' | 'en' | 'ru'
): { label: string; icon: any } {

	const statusStr =
		typeof status === 'object' ? status?.name || 'active' : String(status)

	const statusTranslations: Record<
		string,
		Record<string, { label: string; icon: any }>
	> = {
		active: {
			hy: { label: 'Ակտիվ', icon: CheckCircle },
			en: { label: 'Active', icon: CheckCircle },
			ru: { label: 'Активный', icon: CheckCircle },
		},
		pending: {
			hy: { label: 'Սպասող', icon: Clock },
			en: { label: 'Pending', icon: Clock },
			ru: { label: 'В ожидании', icon: Clock },
		},
		sold: {
			hy: { label: 'Վաճառված', icon: XCircle },
			en: { label: 'Sold', icon: XCircle },
			ru: { label: 'Продано', icon: XCircle },
		},
		rented: {
			hy: { label: 'Վարձակալված', icon: Pause },
			en: { label: 'Rented', icon: Pause },
			ru: { label: 'Арендовано', icon: Pause },
		},
		inactive: {
			hy: { label: 'Ոչ ակտիվ', icon: AlertCircle },
			en: { label: 'Inactive', icon: AlertCircle },
			ru: { label: 'Неактивный', icon: AlertCircle },
		},
	}

	return (
		statusTranslations[statusStr.toLowerCase()]?.[language] ||
		statusTranslations.active[language]
	)
}
