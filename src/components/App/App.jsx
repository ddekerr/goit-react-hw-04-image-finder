import { useState, useEffect } from 'react';
import { Puff } from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify';
import { fetchImagesByQuery } from 'services/fetchImages';

import { Wrapper, Section } from './App.styled';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [imagesTotal, setImagesTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    async function loadGallery() {
      try {
        setStatus('pending');
        const response = await fetchImagesByQuery(searchQuery, page);
        if (response.hits.length === 0) {
          showError('No match result by this query');
          setStatus('rejected');
          return;
        }
        setImages(prevImages => prevImages.concat(response.hits));
        setImagesTotal(response.total);
        setStatus('resolved');
      } catch (error) {
        showError(error);
        setStatus('rejected');
      }
    }

    loadGallery();
  }, [searchQuery, page]);

  const formSubmit = query => {
    if (query === '') {
      showError('Please enter not empty query');
      return;
    }

    if (query === searchQuery) {
      showError('Please enter another query');
      return;
    }

    setSearchQuery(query.trim().toLowerCase());
    setImages([]);
    setImagesTotal(0);
    setPage(1);
    setError(null);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showError = errorMessage => {
    console.log('error')
    setError(errorMessage);
    toast.error(errorMessage);
  };

  return (
    <Wrapper>
      <Searchbar onSearch={formSubmit} />
      <Section>
        {status === 'idle' && <p>No match result yet</p>}

        <ImageGallery images={images} />

        {status === 'resolved' && images.length !== imagesTotal && (
          <LoadMoreButton onClick={loadMore} />
        )}

        {status === 'pending' && <Puff color="#3f51b5" />}

        {status === 'rejected' && (
          <>
            <p>{error}</p>
            <ToastContainer autoClose={2000} />
          </>
        )}
      </Section>
    </Wrapper>
  );
};
