const GlobalBanner = () => {
	return (
		<section className='hidden md:block border-b border-white/90 bg-magmart-banner-background'>
			<div className='container mx-auto flex items-center justify-between h-[56px]'>
				<div className='text-center text-white w-1/2 border-r border-white h-full flex items-center justify-center'>
					<a href='#'>
						<div className=''>
							<span className=''>
								<strong>
									20% OFF ALL CASUAL WEAR*<br></br>With code: CODE2025
								</strong>
							</span>
						</div>
					</a>
				</div>
				<div className='text-center text-white w-1/2 h-full flex items-center justify-center'>
					<a href=''>
						<div className=''>
							<span className=''>FREE WORLDWIDE DELIVERY</span>
						</div>
					</a>
				</div>
			</div>
		</section>
	);
};

export default GlobalBanner;
