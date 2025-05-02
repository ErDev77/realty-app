import { Home, Heart, User, X, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<header className='bg-white shadow-sm sticky top-0 z-50'>
			<div className='container mx-auto px-4'>
				<div className='flex items-center justify-between h-20'>
					<div className='flex items-center'>
						<div className='p-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg'>
							<Home className='h-8 w-8 text-white' />
						</div>
						<span className='ml-3 text-2xl font-bold text-gray-900'>
							Chance Realty
						</span>
					</div>

					<nav className='hidden md:flex items-center space-x-8'>
						<a
							href='#'
							className='text-gray-700 hover:text-blue-600 transition-colors font-medium'
						>
							Գնել
						</a>
						<a
							href='#'
							className='text-gray-700 hover:text-blue-600 transition-colors font-medium'
						>
							Վարձակալել
						</a>
						<a
							href='#'
							className='text-gray-700 hover:text-blue-600 transition-colors font-medium'
						>
							Վաճառել
						</a>
						<a
							href='#'
							className='text-gray-700 hover:text-blue-600 transition-colors font-medium'
						>
							Մեր մասին
						</a>
					</nav>

					<div className='hidden md:flex items-center space-x-4'>
						<button className='p-2 text-gray-700 hover:text-blue-600 transition-colors'>
							<Heart className='h-6 w-6' />
						</button>
						<button className='p-2 text-gray-700 hover:text-blue-600 transition-colors'>
							<User className='h-6 w-6' />
						</button>
						<button className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
							Մուտք
						</button>
					</div>

					<button
						className='md:hidden p-2'
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? (
							<X className='h-6 w-6' />
						) : (
							<Menu className='h-6 w-6' />
						)}
					</button>
				</div>
			</div>

			{isMenuOpen && (
				<div className='md:hidden bg-white border-t'>
					<div className='container mx-auto px-4 py-4 space-y-4'>
						<a href='#' className='block text-gray-700 hover:text-blue-600'>
							Գնել
						</a>
						<a href='#' className='block text-gray-700 hover:text-blue-600'>
							Վարձակալել
						</a>
						<a href='#' className='block text-gray-700 hover:text-blue-600'>
							Վաճառել
						</a>
						<a href='#' className='block text-gray-700 hover:text-blue-600'>
							Մեր մասին
						</a>
						<button className='w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
							Մուտք
						</button>
					</div>
				</div>
			)}
		</header>
	)
}

export default Header;