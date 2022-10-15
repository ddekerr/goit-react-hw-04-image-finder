import {
  SearchContainer,
  SearchForm,
  SearchButton,
  SearchInput,
} from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';
import { Component } from 'react';
import { toast } from 'react-toastify';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  inputChange = e => {
    this.setState({ inputValue: e.target.value.trim().toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { inputValue } = this.state;

    if (inputValue === '') {
      toast.error('Please enter search query!')
      return;
    }

    this.props.onSearch(inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    const { inputValue } = this.state;

    return (
      <SearchContainer>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <FaSearch />
          </SearchButton>

          <SearchInput
            type="text"
            autocomplete="off"
            value={inputValue}
            autoFocus
            placeholder="Search images and photos"
            onChange={this.inputChange}
          />
        </SearchForm>
      </SearchContainer>
    );
  }
}
