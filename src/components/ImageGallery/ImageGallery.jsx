import { ImageGalleryContainer } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem';

const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const ImageGallery = () => {
  return (
    <ImageGalleryContainer>
      {images.map(img => {
        return <ImageGalleryItem key={img}></ImageGalleryItem>;
      })}
    </ImageGalleryContainer>
  );
};
