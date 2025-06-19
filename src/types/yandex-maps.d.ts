// src/types/yandex-maps.d.ts - Enhanced and optimized
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

	control: {
		FullscreenControl: {
			new (parameters?: any): YControl
		}
		ZoomControl: {
			new (parameters?: any): YControl
		}
		TypeSelector: {
			new (parameters?: any): YControl
		}
		GeolocationControl: {
			new (parameters?: any): YControl
		}
		RouteButtonControl: {
			new (parameters?: any): YControl
		}
		TrafficControl: {
			new (parameters?: any): YControl
		}
	}

	geocode(request: string, options?: YGeocodeOptions): Promise<YGeocodeResult>
}

interface YMapState {
	center: number[]
	zoom: number
	controls?: string[]
	type?: string
	behaviors?: string[]
}

interface YMapOptions {
	minZoom?: number
	maxZoom?: number
	restrictMapArea?: boolean | number[][]
	suppressMapOpenBlock?: boolean
	yandexMapDisablePoiInteractivity?: boolean
	searchControlProvider?: string
	autoFitToViewport?: string
	avoidFractionalZoom?: boolean
	exitFullscreenByEsc?: boolean
	fullscreenZIndex?: number
}

interface YMap {
	geoObjects: YGeoObjectCollection
	controls: YControlCollection
	events: YEventManager
	behaviors: YBehaviorManager

	getCenter(): number[]
	getZoom(): number
	getBounds(): number[][]
	setCenter(center: number[], zoom?: number, options?: any): Promise<void>
	setZoom(zoom: number, options?: any): Promise<void>
	setBounds(bounds: number[][], options?: any): Promise<void>
	destroy(): void
	getContainer(): HTMLElement
}

interface YPlacemarkProperties {
	balloonContent?: string
	balloonContentHeader?: string
	balloonContentBody?: string
	balloonContentFooter?: string
	hintContent?: string
	iconContent?: string
	iconCaption?: string
}

interface YPlacemarkOptions {
	preset?: string
	iconColor?: string
	iconImageHref?: string
	iconImageSize?: number[]
	iconImageOffset?: number[]
	iconCaptionMaxWidth?: number
	balloonCloseButton?: boolean
	balloonMaxWidth?: number
	balloonMinHeight?: number
	balloonMinWidth?: number
	balloonOffset?: number[]
	balloonShadow?: boolean
	balloonShadowOffset?: number[]
	balloonShadowSize?: number[]
	hideIconOnBalloonOpen?: boolean
	openBalloonOnClick?: boolean
	openEmptyBalloon?: boolean
	openEmptyHint?: boolean
	openHintOnHover?: boolean
	draggable?: boolean
	cursor?: string
	strokeColor?: string
	strokeOpacity?: number
	strokeWidth?: number
	fillColor?: string
	fillOpacity?: number
	visible?: boolean
	zIndex?: number
	zIndexActive?: number
	zIndexDrag?: number
	zIndexHover?: number
}

interface YPlacemark {
	events: YEventManager
	geometry: YGeometry
	properties: YDataManager
	options: YOptionManager
	balloon: YBalloon
	hint: YHint

	getOverlay(): Promise<any>
	getOverlaySync(): any
}

interface YGeoObjectCollection {
	add(object: YPlacemark | any): YGeoObjectCollection
	remove(object: YPlacemark | any): YGeoObjectCollection
	removeAll(): YGeoObjectCollection
	getLength(): number
	getBounds(): number[][] | null
	getIterator(): YIterator
}

interface YControlCollection {
	add(control: string | any, options?: any): YControlCollection
	remove(control: string | any): YControlCollection
	get(index: number | string): any
}

interface YControl {
	events: YEventManager
	options: YOptionManager
	data: YDataManager
}

interface YEventManager {
	add(
		event: string,
		handler: Function,
		context?: any,
		priority?: number
	): YEventManager
	remove(event: string, handler: Function, context?: any): YEventManager
	fire(event: string, eventObject?: any): YEventManager
}

interface YBehaviorManager {
	get(name: string): any
	isEnabled(name: string): boolean
	enable(name: string | string[]): YBehaviorManager
	disable(name: string | string[]): YBehaviorManager
}

interface YGeometry {
	getCoordinates(): number[]
	setCoordinates(coordinates: number[]): void
	getBounds(): number[][] | null
	getType(): string
}

interface YDataManager {
	get(property: string, defaultValue?: any): any
	set(property: string | any, value?: any): YDataManager
	unset(property: string): YDataManager
	setAll(data?: any): YDataManager
	getAll(): any
}

interface YOptionManager {
	get(option: string, defaultValue?: any): any
	set(option: string | any, value?: any): YOptionManager
	unset(option: string): YOptionManager
	setAll(options?: any): YOptionManager
	getAll(): any
	getParent(): YOptionManager | null
	setParent(parent: YOptionManager): YOptionManager
}

interface YBalloon {
	autoPan(): Promise<YBalloon>
	close(force?: boolean): Promise<YBalloon>
	destroy(): void
	getData(): any
	getOptions(): YOptionManager | null
	getOverlay(): Promise<any>
	getOverlaySync(): any
	getPosition(): number[] | null
	isOpen(): boolean
	open(objectId?: any, anchorPixelPosition?: boolean): Promise<YBalloon>
	setData(data: any): Promise<YBalloon>
	setOptions(options: any): Promise<YBalloon>
	setPosition(position: number[]): Promise<YBalloon>
}

interface YHint {
	destroy(): void
	getData(): any
	getOptions(): YOptionManager | null
	getOverlay(): Promise<any>
	getOverlaySync(): any
	getPosition(): number[] | null
	isOpen(): boolean
	open(objectId?: any, anchorPixelPosition?: boolean): Promise<YHint>
	setData(data: any): Promise<YHint>
	setOptions(options: any): Promise<YHint>
	setPosition(position: number[]): Promise<YHint>
}

interface YGeocodeOptions {
	boundedBy?: number[][]
	strictBounds?: boolean
	results?: number
	skip?: number
	lang?: string
	rspn?: number
	ll?: string
	spn?: string
	bbox?: string
	rstr?: string
	uri?: string
}

interface YGeocodeResult {
	geoObjects: YGeoObjectCollection
	metaData: {
		geocoder: {
			request: string
			found: string
			results: string
			skip: string
		}
	}
}

interface YIterator {
	getNext(): any
}

// Export for module usage
export {}
