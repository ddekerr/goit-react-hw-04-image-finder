import PropTypes from 'prop-types';

import { ImageGalleryContainer } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
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
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object.isRequired),
};
