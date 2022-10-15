import {
  SearchContainer,
  SearchForm,
  SearchButton,
  SearchInput,
} from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';

export const Searchbar = () => {
  return (
    <SearchContainer>
      <SearchForm>
        <SearchButton type="submit">
          <FaSearch />
        </SearchButton>

        <SearchInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchContainer>
  );
};
