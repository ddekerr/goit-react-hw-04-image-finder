import { useState } from 'react';
import { Wrapper, Section } from './App.styled';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const formSubmit = query => {
    console.log('App State change')
    setSearchQuery(query.trim().toLowerCase())
  };

  return (
    <Wrapper>
      <Searchbar onSearch={formSubmit} />
      <Section>
        <ImageGallery searchQuery={searchQuery} />
      </Section>
    </Wrapper>
  );
};
