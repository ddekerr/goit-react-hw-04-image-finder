import { Component } from 'react';
import { Wrapper } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';

export class App extends Component {
  state = {
    searchField: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchField === this.state.searchField) {
      toast.error('Please enter other query!');
    }
  }

  formSubmit = query => {
    this.setState({ searchField: query });
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
        <ImageGallery search={this.state.searchField} />
        <LoadMoreButton />
      </Wrapper>
    );
  }
}
