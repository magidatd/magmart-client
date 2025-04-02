import VideoPlayer from '@/components/ui/video-player';
import { heroData } from '@/data/home-data';

const Hero = () => {
	return (
		<div>
			<VideoPlayer heroData={heroData} />
		</div>
	);
};

export default Hero;
