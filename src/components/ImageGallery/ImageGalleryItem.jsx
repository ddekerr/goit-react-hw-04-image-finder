import {
  ImageGalleryItemContainer,
  ImageGalleryImage,
} from './ImageGallery.styled';

export const ImageGalleryItem = ({ image }) => {
  return (
    <ImageGalleryItemContainer>
      <ImageGalleryImage src={image.webformatURL} alt={image.tags} />
    </ImageGalleryItemContainer>
  );
};
