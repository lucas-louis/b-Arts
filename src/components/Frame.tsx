import { Box, Button, Center, Grid, GridItem, HStack, Image, Text } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Artwork } from 'app/App';
import { useState } from 'react';

import { FramesBoard } from './FramesBoard';
import { motion } from 'framer-motion';

type FrameProps = {
	arts: Artwork[];
	displayArt: Artwork;
	setDisplayArt: (art: Artwork) => void;
};

export const Frame = ({ arts, displayArt, setDisplayArt }: FrameProps): JSX.Element => {
	const [isFramesBoard, setIsFramesBoard] = useState<boolean>(false);

	const nextArtwork = () => {
		const nextArt = arts[arts.indexOf(displayArt) + 1];
		if (nextArt) {
			setDisplayArt(nextArt);
		} else setIsFramesBoard(true);
	};

	const previousArtwork = () => {
		const previousArt = arts[arts.indexOf(displayArt) - 1];
		if (previousArt) {
			setDisplayArt(previousArt);
		}
	};

	const MotionText = motion(Text);
	const MotionImage = motion(Image);
	const MotionButton = motion(Button);

	if (displayArt.imageURL !== '') {
		if (!isFramesBoard) {
			return (
				<Center h={'90vh'}>
					<HStack>
						<Grid templateColumns="repeat(2)" gap={5} zIndex={10}>
							<GridItem position={'relative'}>
								<MotionImage
									initial={{ opacity: 0 }}
									transition={{ duration: 1 }}
									animate={{ opacity: 1 }}
									filter={'drop-shadow(8px 8px 10px gray) sepia(100%) hue-rotate(175deg) saturate(200%)'}
									src={displayArt.imageURL}
									maxW={'90%'}
									h={'60vh'}
								/>
							</GridItem>
							<GridItem px={'12px'}>
								<HStack>
									<MotionButton
										initial={{ opacity: 0 }}
										transition={{ duration: 1 }}
										animate={{ opacity: 1 }}
										bg={'transparent'}
										onClick={previousArtwork}
									>
										<ArrowLeftIcon />
									</MotionButton>
									<MotionButton
										initial={{ opacity: 0 }}
										transition={{ duration: 1 }}
										animate={{ opacity: 1 }}
										bg={'transparent'}
										onClick={nextArtwork}
									>
										<ArrowRightIcon />
									</MotionButton>
								</HStack>
								<MotionText
									initial={{ opacity: 0 }}
									transition={{ duration: 1, delay: 1 }}
									animate={{ opacity: 1 }}
									textAlign={'right'}
									fontFamily={'Alegreya SC'}
									fontSize={'24px'}
									color={'#212759'}
								>
									{displayArt.artworkTitle}
								</MotionText>
							</GridItem>
						</Grid>
						<HStack>
							<MotionText
								initial={{ opacity: 0 }}
								transition={{ duration: 0.5, delay: 1 }}
								animate={{ opacity: 1 }}
								position={'absolute'}
								transformOrigin={'left top'}
								transform={'rotate(-90deg)'}
								w={'25%'}
								bottom={'15%'}
								left={'74%'}
								fontFamily={'Amaranth'}
								fontSize={'32px'}
								color={'#212759'}
								zIndex={10}
							>
								{displayArt.artistName}
							</MotionText>
							<MotionText
								initial={{ opacity: 0 }}
								transition={{ duration: 0.5, delay: 1 }}
								animate={{ opacity: 1 }}
								position={'absolute'}
								transformOrigin={'left top'}
								transform={'rotate(-90deg)'}
								w={'25%'}
								bottom={'15%'}
								left={'76%'}
								fontFamily={'Amaranth'}
								fontSize={'32px'}
								color={'#212759'}
								zIndex={10}
							>
								{displayArt.artworkDate}
							</MotionText>
						</HStack>
						<Box position={'absolute'} bg={'white'} bottom={'8vh'} left={'66vw'} w={'13vw'} h={'55vh'}>
							<Text> </Text>
						</Box>
					</HStack>
				</Center>
			);
		} else {
			return <FramesBoard artworks={arts} setIsFramesBoardOpen={setIsFramesBoard} setSelectedArtwork={setDisplayArt} />;
		}
	} else return <></>;
};
