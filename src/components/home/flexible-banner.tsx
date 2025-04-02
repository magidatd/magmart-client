const FlexibleBanner = () => {
	return (
		<div className='flex items-center justify-center text-center text-white bg-magmart-banner-background py-[24px]'>
			<a href='#'>
				<div>
					<p className='font-jost-italic text-5xl tracking-tighter font-extrabold'>
						20% OFF ALL CASUAL WEAR
					</p>
					<p className='font-semibold text-xl mt-2'>
						With code: <mark>CODE2025</mark>
					</p>
					<p className='text-xs mt-5'>
						Valid on selected products only. See website banner for full Ts&Cs.
					</p>
				</div>
			</a>
		</div>
	);
};

export default FlexibleBanner;
