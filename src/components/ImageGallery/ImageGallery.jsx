import PropTypes from 'prop-types';
import galleryApi from 'services/fetchImages';

import { Component } from 'react';
import { Puff } from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify';

import { ImageGalleryContainer } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';

export class ImageGallery extends Component {
  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
  };

  state = {
    images: [],
    error: null,
    status: 'idle',
  };

  async componentDidUpdate(prevProps) {
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
        toast.error('No result by this query!');
      }
    }
  }

  render() {
    const { images, status } = this.state;

    if (status === 'idle') {
      return <p>No match result yet</p>;
    }

    if (status === 'pending') {
      return <Puff color="#3f51b5" />;
    }

    if (status === 'rejected') {
      return (
        <>
          <p>No match result yet</p>
          <ToastContainer
            theme="light"
            pauseOnHover={false}
            autoClose={2000}
            draggable={false}
          />
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGalleryContainer>
            {images.map(image => (
              <ImageGalleryItem
                key={image.id}
                image={{ webformatURL: image.webformatURL, tags: image.tags }}
              ></ImageGalleryItem>
            ))}
          </ImageGalleryContainer>
          <LoadMoreButton />
        </>
      );
    }
  }
}
