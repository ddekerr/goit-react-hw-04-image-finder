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
    console.log('Reset');
    setImages([]);
    setPage(1);
    setImagesTotal(0);
  }, [searchQuery]);

  useEffect(() => {
    async function fetchImages() {
      console.log('Send request');
      try {
        setStatus('resolved');
        const { hits, total } = await galleryApi.fetchImagesByQuery(
          searchQuery,
          page
        );
        if (hits.length === 0) {
          showError('No result by this query!');
          return;
        }
        setImages(prevImages => prevImages.concat(hits));
        setImagesTotal(total);
        setStatus('resolved');
      } catch (error) {
        showError(error);
      }
    }

    if (searchQuery === '') {
      console.log('No send request');
      return;
    }

    fetchImages();
  }, [searchQuery, page]);

  const showError = error => {
    setError(error);
    setStatus('rejected');
    toast.error(error);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      {status === 'idle' && <p>No match result yet</p>}

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

      {status === 'rejected' && (
        <>
          <p>{error}</p>
          <ToastContainer
            theme="light"
            pauseOnHover={false}
            autoClose={2000}
            draggable={false}
          />
        </>
      )}

      {imagesTotal !== images.length && status === 'resolved' && (
        <LoadMoreButton onClick={loadMore} />
      )}

      {status === 'pending' && <Puff color="#3f51b5" />}
    </>
  );
};

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
