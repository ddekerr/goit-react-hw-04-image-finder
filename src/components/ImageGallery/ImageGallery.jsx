import PropTypes from 'prop-types';
import galleryApi from 'services/fetchImages';

import { useState, useEffect } from 'react';
import { Puff } from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify';

import { ImageGalleryContainer } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';

export const ImageGallery = ({ searchQuery }) => {
  const [images, setImages] = useState([]);
  const [imagesTotal, setImagesTotal] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setImages([]);
    setPage(1);
    setImagesTotal(0);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    try {
      setStatus('pending');
      const response = galleryApi.fetchImagesByQuery(searchQuery, page);
      response.then(data => {
        if (data.hits.length === 0) {
          console.log(123);
          showError('No result by this query!');
          return;
        }
        setImages(images => images.concat(data.hits));
        setStatus('resolved');
        setImagesTotal(data.total);
      });
    } catch (error) {
      showError(error);
    }
  }, [searchQuery, page]);

  const showError = error => {
    setError(error);
    setStatus('rejected');
    toast.error(error);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (status === 'idle') {
    return <p>No match result yet</p>;
  }

  if (status === 'pending') {
    return <Puff color="#3f51b5" />;
  }

  if (status === 'rejected') {
    return (
      <>
        <p>{error}</p>
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
              image={{
                webformatURL: image.webformatURL,
                tags: image.tags,
                largeImageURL: image.largeImageURL,
              }}
            ></ImageGalleryItem>
          ))}
        </ImageGalleryContainer>
        {imagesTotal !== images.length && <LoadMoreButton onClick={loadMore} />}
      </>
    );
  }
};

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
