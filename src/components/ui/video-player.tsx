import useIsMobile from '@/hooks/use-is-mobile';
import { useEffect, useRef, useState } from 'react';
import { IoPause, IoPlay } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import parser from 'html-react-parser';

interface VideoPlayerProps {
	heroData: {
		title: string;
		paragraph: string;
		button: string;
		desktopVideo: string;
		mobileVideo: string;
		desktopPoster: string;
		mobilePoster: string;
	};
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ heroData }) => {
	const isMobile = useIsMobile(769);

	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const attemptPlay = () => {
		if (videoRef && videoRef.current) {
			videoRef.current.play().catch((error) => {
				console.error('Error attempting to play', error);
			});

			setIsPlaying(true);
		}
	};

	useEffect(() => {
		attemptPlay();
	}, []);

	const handlePlay = () => {
		if (isPlaying) {
			if (videoRef.current) {
				videoRef.current.pause();
			}
			setIsPlaying(false);
		} else {
			if (videoRef.current) {
				videoRef.current.play();
			}
			setIsPlaying(true);
		}
	};

	return (
		<div className='relative mt-6'>
			<video
				autoPlay
				muted
				ref={videoRef}
				src={isMobile ? heroData.mobileVideo : heroData.desktopVideo}
				loop
				playsInline
				poster={isMobile ? heroData.mobilePoster : heroData.desktopPoster}
				className=''
			></video>

			<div className='absolute inset-0 bg-black/5 flex items-center justify-center'>
				<div className='text-center text-white p-6'>
					<h1 className='text-4xl md:text-9xl font-bold tracking-tight uppercase mb-4'>
						<>{parser(heroData.title)}</>
					</h1>
					<p className='text-sm tracking-tighter md:text-lg mb-6'>
						{parser(heroData.paragraph)}
					</p>
					<Link
						to='/'
						className='bg-white text-gray-950 px-6 py-2 rounded-sm text-lg'
					>
						{parser(heroData.button)}
					</Link>
				</div>
			</div>

			<button
				onClick={handlePlay}
				className='absolute z-10 bottom-0 left-0 text-white'
			>
				{isPlaying ? <IoPause className='size-8' /> : <IoPlay className='size-8' />}
			</button>
		</div>
	);
};

export default VideoPlayer;
