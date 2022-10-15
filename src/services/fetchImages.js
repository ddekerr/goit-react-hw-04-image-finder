import axios from 'axios';

async function fetchImagesByQuery(query, page = 1) {
  const config = {
    baseURL: 'https://pixabay.com/api/',
    params: {
      key: '29094517-4eecc7a73a7fbfad4707a18db',
      q: query,
      page: page,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  };

  const response = await axios.get('/', config);
  return response.data.hits;
}

const api = {
  fetchImagesByQuery,
};

export default api;
