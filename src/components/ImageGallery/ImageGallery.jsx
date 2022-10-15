import { Component } from 'react';
import { ImageGalleryContainer } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem';
import galleryApi from 'services/fetchImages';

export class ImageGallery extends Component {
  state = {
    images: [],
  };

  async componentDidUpdate(prevProps, prevState) {
    const searchQuery = this.props.search;

    if (prevProps.search === searchQuery) return;

    const images = await galleryApi.fetchImagesByQuery(searchQuery);
    this.setState({ images: images });

    console.log('Http Request')
  }

  render() {
    const { images } = this.state;

    return (
      <ImageGalleryContainer>
        {images.map(image => (
          <ImageGalleryItem key={image.id} image={image}></ImageGalleryItem>
        ))}
      </ImageGalleryContainer>
    );
  }
}
