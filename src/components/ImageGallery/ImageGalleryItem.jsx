import PropTypes from 'prop-types';
import {
  ImageGalleryItemContainer,
  ImageGalleryImage,
} from './ImageGallery.styled';

export const ImageGalleryItem = ({ image: { webformatURL, tags } }) => {
  return (
    <ImageGalleryItemContainer>
      <ImageGalleryImage src={webformatURL} alt={tags} />
    </ImageGalleryItemContainer>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
