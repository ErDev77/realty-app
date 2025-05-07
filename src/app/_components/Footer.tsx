import { Facebook, Home, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"

const Footer = () => {
	return (
		<footer className='bg-[#2C3539] text-white py-16'>
			<div className='container mx-auto px-4'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-12'>
					<div>
						<div className='flex items-center mb-6'>
							<div className='p-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg'>
								<Home className='h-8 w-8 text-white' />
							</div>
							<span className='ml-3 text-2xl font-bold'>Chance Realty</span>
						</div>
						<p className='text-gray-400 mb-6'>
							Գտեք ձեր երազանքի անշարժ գույքը մեզ հետ։ Մենք անշարժ գույքի
							որոնումը դարձնում ենք հեշտ և հաճելի։
						</p>
						<div className='flex space-x-4'>
							<a
								href='#'
								className='bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors'
							>
								<Facebook className='h-5 w-5' />
							</a>
							<a
								href='#'
								className='bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors'
							>
								<Instagram className='h-5 w-5' />
							</a>
							<a
								href='#'
								className='bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors'
							>
								<Linkedin className='h-5 w-5' />
							</a>
						</div>
					</div>

					<div>
						<h3 className='text-lg font-semibold mb-6'>Արագ հղումներ</h3>
						<ul className='space-y-3'>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'
								>
									Մեր մասին
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'
								>
									Կապ
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'
								>
									Ծառայությունների պայմաններ
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'
								>
									Գաղտնիության քաղաքականություն
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='text-lg font-semibold mb-6'>Գույքի տեսակներ</h3>
						<ul className='space-y-3'>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'
								>
									Տներ
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'
								>
									Բնակարաններ
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'
								>
									Կոմերցիոն
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-white transition-colors'
								>
									Հողատարածք
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='text-lg font-semibold mb-6'>Կապ մեզ հետ</h3>
						<ul className='space-y-3'>
							<li className='flex items-center gap-3 text-gray-400'>
								<Phone className='h-5 w-5' />
								<span>+374 00 000 000</span>
							</li>
							<li className='flex items-center gap-3 text-gray-400'>
								<Mail className='h-5 w-5' />
								<span>info@armrealty.am</span>
							</li>
							<li className='flex items-center gap-3 text-gray-400'>
								<MapPin className='h-5 w-5' />
								<span>Երևան, Հայաստան</span>
							</li>
						</ul>
					</div>
				</div>

				<div className='border-t border-gray-800 pt-8 text-center text-gray-400'>
					<p>&copy; 2024 ԱրմՌիլթի։ Բոլոր իրավունքները պաշտպանված են։</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer;