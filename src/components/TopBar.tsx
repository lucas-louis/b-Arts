import { Box, VStack, Image } from '@chakra-ui/react';

import '@fontsource/alegreya-sc';
import '@fontsource/amaranth';

export const TopBar = (): JSX.Element => (
	<Box zIndex={100} height="80px !important" minH="80px !important">
		<Box as="nav" w="100vw" h="50px" bg={'#afd2e9'} shadow={'0px 15px 15px #afd2e9'}>
			<VStack>
				<Image
					src={
						'https://raw.githubusercontent.com/Lybertyxz/JAM_EPITECH/25b2b672c0e97ff590779dd4eb660ac6831108e9/b-Arts_logo.svg'
					}
					h={'50px'}
					pt={'12px'}
				/>
			</VStack>
		</Box>
	</Box>
);
