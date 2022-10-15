import {
  ImageGalleryItemContainer,
  ImageGalleryImage,
} from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image }) => {
  return (
    <ImageGalleryItemContainer>
      <ImageGalleryImage src={image.webformatURL} alt={image.tags} />
    </ImageGalleryItemContainer>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
