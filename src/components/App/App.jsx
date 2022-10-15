import { Wrapper } from './App.styled';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';

export const App = () => {
  return (
    <Wrapper>
      <Searchbar />
      <ImageGallery />
      <LoadMoreButton />
    </Wrapper>
  );
};
