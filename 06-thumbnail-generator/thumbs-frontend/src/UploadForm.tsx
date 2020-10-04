import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { getUploadUrl } from './utils';
import axios from 'axios';

enum UploadState {
	NO_PHOTO = 'No photo',
	READY = 'Ready',
	PREPARING = 'Preparing...',
	UPLOADING = 'Uploading...',
	PROCESSING = 'Processing...',
	FINISHED = 'Finished',
	ERROR = 'Error',
	CANCELLED = 'Cancelled',
}

interface Props {}

interface State {
	current: {
		src: string | null;
		file?: File;
		uploadProgress: number;
		uploadState: UploadState;
	};
}

export default class Upload extends Component<Props, State> {
	state = {
		current: {
			src: null,
			file: undefined,
			uploadProgress: 0,
			uploadState: UploadState.NO_PHOTO,
		},
	};

	setFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { target } = e;
		const file = target?.files && target.files[0];

		if (!file) return;

		const url = URL.createObjectURL(file);
		const image = new Image();

		image.onload = () => {
			this.setState((prevState) => {
				const upload = { ...prevState.current };

				upload.file = file;
				upload.src = url;
				upload.uploadState = UploadState.READY;

				return { current: upload };
			});
		};

		image.src = url;
	};

	handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { file } = this.state.current;

		const uploadUrl = await getUploadUrl();

		const onUploadProgress = (progressEvent: any) => {
			const { loaded, total } = progressEvent;
      const uploadProgress = Math.round((loaded / total) * 100);
      
      console.log(uploadProgress);

			this.setState((prevState: any) => {
        //@ts-ignore
				const { current } = { ...prevState };
				const uploadState = UploadState.UPLOADING;
				return { current: { ...current, uploadState, uploadProgress } };
			});
		};

		await axios.put(uploadUrl, file, { headers: { 'Content-Type': 'image/jpeg' }, onUploadProgress });

		this.setState((prevState: any) => {
      //@ts-ignore
			const { current } = { ...prevState };
			const uploadState = UploadState.FINISHED;
			return { ...current, uploadState };
		});
	};

	render() {
		const { current } = this.state;
		const { src, uploadProgress, uploadState } = current;

		const uploadForm = (
			<Paper>
				<form method="POST" onSubmit={this.handleSubmit} encType="multipart/form-data">
					<div>
						<input type="file" accept=".jpg" onChange={this.setFile} />
						<button type="submit">Upload!</button>
						<img src={src || undefined} alt="Preview" width={100} />
            <div>
              {uploadProgress}%
            </div>
            <div>{uploadState}</div>
					</div>
				</form>
			</Paper>
		);

		return uploadForm;
	}
}
