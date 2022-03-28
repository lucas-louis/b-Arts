import { Center, Grid, Image } from '@chakra-ui/react';
import { Artwork } from 'app/App';
import { motion } from 'framer-motion';

type FramesBoardProps = {
	artworks: Artwork[];
	setIsFramesBoardOpen: (isFramesBoardOpen: boolean) => void;
	setSelectedArtwork: (selectedArtwork: Artwork) => void;
};

export const FramesBoard = ({ artworks, setIsFramesBoardOpen, setSelectedArtwork }: FramesBoardProps): JSX.Element => {
	const MotionImage = motion(Image);
	return (
		<Center>
			<Grid templateColumns="repeat(3, 1fr)" gap={'64px'} mt={'64px'} mx={'64px'}>
				{artworks.map((art) => (
					<MotionImage
						initial={{ opacity: 0 }}
						transition={{ duration: 1 }}
						animate={{ opacity: 1 }}
						key={art.imageURL}
						src={art.imageURL}
						filter={'drop-shadow(8px 8px 10px gray) sepia(100%) hue-rotate(175deg) saturate(200%)'}
						_hover={{
							filter: 'drop-shadow(8px 8px 10px gray) blur(2px) sepia(100%) hue-rotate(175deg) saturate(200%)',
							cursor: 'pointer',
						}}
						onClick={() => {
							setIsFramesBoardOpen(false);
							setSelectedArtwork(art);
						}}
					/>
				))}
			</Grid>
		</Center>
	);
};
