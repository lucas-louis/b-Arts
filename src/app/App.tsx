import { TopBar } from '../components/TopBar';
import { Frame } from '../components/Frame';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

export type Artwork = {
	imageURL: string;
	artistName: string;
	artworkTitle: string;
	artworkDate: string;
};

const App = (): JSX.Element => {
	const toast = useToast();

	const [displayArt, setDisplayArt] = useState<Artwork>({
		imageURL:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Starry_Night_Over_the_Rhone.jpg/1920px-Starry_Night_Over_the_Rhone.jpg',
		artistName: 'Vincent Van Gogh',
		artworkTitle: 'We searching for you the best artworks ...',
		artworkDate: '1888',
	});
	const [arts, setArts] = useState<Artwork[]>([
		{
			imageURL: 'https://raw.githubusercontent.com/Lybertyxz/JAM_EPITECH/main/jam/assets/henric.png',
			artistName: 'b·Arts',
			artworkTitle: "Henric, la télé et l'aquarium",
			artworkDate: '2022',
		},
	]);

	useEffect(() => {
		(async () => {
			await getArtworks();
		})();
	}, []);

	const getArtworks = async () => {
		toast({
			title: 'Artworks loading',
			status: 'info',
			duration: 2500,
			isClosable: true,
		});
		await loadArtworks();
		setDisplayArt(arts[0]);
	};

	const getRandom = (max: number) => Math.floor(Math.random() * max);

	const loadArtworks = async () => {
		// Get all artworks
		const res = await axios.get(
			'https://api.artic.edu/api/v1/artworks/search?is_public_domain=true&limit=100&page=' +
				getRandom(10) +
				'&fields=api_link',
		);
		const artworks: Artwork[] = [];

		for (let i = 0; i < 8; i++) {
			const artwork = await axios.get(
				res.data.data[getRandom(100)].api_link + '?fields=image_id,artist_title,title,date_display,date_end',
			);
			if (artwork.data.data.image_id !== null)
				artworks.push({
					imageURL: 'https://www.artic.edu/iiif/2/' + artwork.data.data.image_id + '/full/843,/0/default.jpg',
					artistName: artwork.data.data.artist_title,
					artworkTitle: artwork.data.data.title,
					artworkDate: artwork.data.data.date_display,
				});
			else i--;
			console.log(artworks.length);
		}
		console.log(artworks);
		setArts(arts.concat(artworks));
		toast({
			title: 'Artworks loaded, good visit',
			status: 'success',
			duration: 2500,
			isClosable: true,
		});
	};

	return (
		<>
			<TopBar />
			<Frame arts={arts} displayArt={displayArt} setDisplayArt={setDisplayArt} />
		</>
	);
};

export default App;
