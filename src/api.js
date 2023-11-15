import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const headers = {
  accept: 'application/json',
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzIxMzI1OWMyNWJiNmQxMjdhNDA1Y2UyNDUxZDQ2YiIsInN1YiI6IjY1NTRhYjZhZWE4NGM3MTA5NmRjZDhhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U3v4fXFdcGFn9M0xih4Y_mQdTwg1rCD7jhv0rRqmHJQ',
};

export const getTrending = async controller => {
  const params = {
    language: 'en-US',
  };
  const urlParams = new URLSearchParams(params);
  const response = await axios.get(
    `/trending/all/day?${urlParams.toString()}`,
    {
      headers: headers,
      signal: controller,
    }
  );

  return response.data;
};
