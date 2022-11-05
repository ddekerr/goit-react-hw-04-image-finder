import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import {
  ImageGalleryItemContainer,
  ImageGalleryImage,
  ModalImage,
} from './ImageGallery.styled';

export const ImageGalleryItem = ({
  image: { webformatURL, largeImageURL, tags },
}) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(show => !show);
  };

  console.log(webformatURL);
  console.log(largeImageURL);
  console.log(tags);

  return (
    <>
      <ImageGalleryItemContainer>
        <ImageGalleryImage
          src={webformatURL}
          alt={tags}
          onClick={toggleModal}
        />
      </ImageGalleryItemContainer>
      {showModal && (
        <Modal onClose={toggleModal}>
          <ModalImage src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
