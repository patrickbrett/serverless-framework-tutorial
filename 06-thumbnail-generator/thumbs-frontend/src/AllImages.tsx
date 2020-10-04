import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { LIST_IMAGES_URL } from './constants';
import { getImageUrl, ImageKind } from './utils';

export default class AllImages extends Component {
	state = {
		imageKeys: [],
	};

	componentDidMount() {
		this.getImagesList();
	}

	getImagesList = async () => {
    const { data } = await axios.get(LIST_IMAGES_URL);

		this.setState({ imageKeys: data });
	};

	render() {
		const { imageKeys } = this.state;

		return (
			<div>
				{imageKeys.map((key) => {
					const thumbnailUrl = getImageUrl(ImageKind.THUMBNAIL, key);
					const fullSizeUrl = getImageUrl(ImageKind.FULL_SIZE, key);

					return (
						<Fragment key={key}>
							<img src={thumbnailUrl} alt="Thumbnail" width={100} />
							<img src={fullSizeUrl} alt="Full size" width={400} />
						</Fragment>
					);
				})}
			</div>
		);
	}
}
