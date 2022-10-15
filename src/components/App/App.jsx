import { Component } from 'react';
import { Wrapper } from './App.styled';
import { ToastContainer } from 'react-toastify';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  formSubmit = query => {
    this.setState({ searchQuery: query });
  };

  render() {
    return (
      <Wrapper>
        <Searchbar onSearch={this.formSubmit} />
        <ToastContainer
          theme="light"
          pauseOnHover={false}
          autoClose={2000}
          draggable={false}
        />
        <ImageGallery searchQuery={this.state.searchQuery} />
        <LoadMoreButton />
      </Wrapper>
    );
  }
}
