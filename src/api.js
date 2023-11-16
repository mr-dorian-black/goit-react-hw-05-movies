import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const headers = {
  accept: 'application/json',
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzIxMzI1OWMyNWJiNmQxMjdhNDA1Y2UyNDUxZDQ2YiIsInN1YiI6IjY1NTRhYjZhZWE4NGM3MTA5NmRjZDhhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U3v4fXFdcGFn9M0xih4Y_mQdTwg1rCD7jhv0rRqmHJQ',
};

const urlParams = new URLSearchParams({
  language: 'en-US',
});

export const getTrending = async controller => {
  const response = await axios.get(
    `/trending/all/day?${urlParams.toString()}`,
    {
      headers: headers,
      signal: controller,
    }
  );

  return response.data;
};

export const getMovieById = async (id, controller) => {
  const response = await axios.get(`/movie/${id}?${urlParams.toString()}`, {
    headers: headers,
    signal: controller,
  });

  return response.data;
};

export const getMovieByIdCast = async (id, controller) => {
  const response = await axios.get(
    `/movie/${id}/credits?${urlParams.toString()}`,
    {
      headers: headers,
      signal: controller,
    }
  );

  return response.data;
};

export const getMovieByIdReviews = async (id, controller) => {
  const response = await axios.get(
    `/movie/${id}/reviews?${urlParams.toString()}`,
    {
      headers: headers,
      signal: controller,
    }
  );

  return response.data;
};

export const searchMovie = async (query, controller) => {
  urlParams.append('query', query);
  urlParams.append('include_adult', false);
  urlParams.append('page', 1);

  const response = await axios.get(`/search/movie?${urlParams.toString()}`, {
    headers: headers,
    signal: controller,
  });

  return response.data;
};
