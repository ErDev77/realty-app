// types/yandex-maps.d.ts
// Single, clean declaration file for Yandex Maps

declare global {
	interface Window {
		ymaps: YMaps
	}
}

interface YMaps {
	ready(callback?: () => void): Promise<void>

	Map: {
		new (
			container: string | HTMLElement,
			state: YMapState,
			options?: YMapOptions
		): YMap
	}

	Placemark: {
		new (
			geometry: number[],
			properties?: YPlacemarkProperties,
			options?: YPlacemarkOptions
		): YPlacemark
	}

	geocode(request: string, options?: YGeocodeOptions): Promise<YGeocodeResult>
}

interface YMapState {
	center: number[]
	zoom: number
	controls?: string[]
	type?: string
}

interface YMapOptions {
	minZoom?: number
	maxZoom?: number
	restrictMapArea?: boolean
	suppressMapOpenBlock?: boolean
	yandexMapDisablePoiInteractivity?: boolean
}

interface YMap {
	geoObjects: YGeoObjectCollection
	controls: YControlCollection
	events: YEventManager

	getCenter(): number[]
	getZoom(): number
	setCenter(center: number[], zoom?: number, options?: object): Promise<void>
	setZoom(zoom: number, options?: object): Promise<void>
	destroy(): void
}

interface YPlacemarkProperties {
	balloonContent?: string
	balloonContentHeader?: string
	balloonContentBody?: string
	balloonContentFooter?: string
	hintContent?: string
	iconContent?: string
}

interface YPlacemarkOptions {
	preset?: string
	iconColor?: string
	iconImageHref?: string
	iconImageSize?: number[]
	iconImageOffset?: number[]
	balloonCloseButton?: boolean
	hideIconOnBalloonOpen?: boolean
}

interface YPlacemark {
	events: YEventManager
	geometry: YGeometry
	properties: YDataManager
	options: YOptionManager
}

interface YGeoObjectCollection {
	add(object: YPlacemark | any): YGeoObjectCollection
	remove(object: YPlacemark | any): YGeoObjectCollection
	removeAll(): YGeoObjectCollection
}

interface YControlCollection {
	add(control: string | any, options?: object): YControlCollection
	remove(control: string | any): YControlCollection
}

interface YEventManager {
	add(event: string, handler: Function, context?: object): YEventManager
	remove(event: string, handler: Function, context?: object): YEventManager
}

interface YGeometry {
	getCoordinates(): number[]
	setCoordinates(coordinates: number[]): void
}

interface YDataManager {
	get(property: string): any
	set(property: string, value: any): YDataManager
}

interface YOptionManager {
	get(option: string): any
	set(option: string, value: any): YOptionManager
}

interface YGeocodeOptions {
	results?: number
	skip?: number
	boundedBy?: number[][]
	strictBounds?: boolean
}

interface YGeocodeResult {
	geoObjects: YGeoObjectCollection
	metaData: any
}

export {}
