import { Component } from 'react';
import { ImageGalleryContainer } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem';
import galleryApi from 'services/fetchImages';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
  };

  state = {
    images: [],
    error: null,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.props;

    if (prevProps.searchQuery !== searchQuery) {
      this.setState({ status: 'pending' });

      const images = await galleryApi.fetchImagesByQuery(searchQuery);

      if (images.length > 0) {
        this.setState({ images, status: 'resolved' });
      } else {
        this.setState({
          error: 'No result by this query!',
          status: 'rejected',
        });
      }
    }
  }

  render() {
    const { images, error, status } = this.state;

    if (status === 'idle') {
      return <p>No match result yet</p>;
    }

    if (status === 'pending') {
      return <p>Loading...</p>;
    }

    if (status === 'rejected') {
      return <p>{error}</p>;
    }

    if (status === 'resolved') {
      return (
        <ImageGalleryContainer>
          {images.map(image => (
            <ImageGalleryItem key={image.id} image={image}></ImageGalleryItem>
          ))}
        </ImageGalleryContainer>
      );
    }
  }
}
