import axios from "axios";

// export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const fetcher = (url, token) => { return axios.get(url, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => res.data);}
export const postFetcher = (url, token, payload) => { return axios.post(url, payload, { headers: { "Authorization": `Bearer ${token}` } }).then((res) => res.data);}

export const apiKey = "95f2419536f533cdaa1dadf83c606027";
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";

const ServerUri = "http://194.163.34.66:8080"
// const ServerUri = "https://api-backend.com:8080"
const ApiEndpoint = `${ServerUri}/api/v1`;

export const tmdbAPI = {
  getBrandList: () => `${ApiEndpoint}/brands`,
  getMovieList: (type, page = 1) => type != null ? `${ApiEndpoint}/vehicles?brandId=${type}` : `${ApiEndpoint}/vehicles`,
  // getMovieList: (type, page = 1) =>
  //   `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetails: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
  getMovieMeta: (movieId, type) =>
    `${tmdbEndpoint}/${movieId}/${type}?api_key=${apiKey}`,
  getMovieSearch: (query, page) =>
    `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  image500: (url) => url,
  // image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
};

export const API = {
  getBrandList: () => `${ApiEndpoint}/brands`,
  getVehicleList: (type = null, page = 1, keyword = null, pageSize = 12) => {
    var url = `${ApiEndpoint}/vehicles`
    if (type != null) {
      url += `?brandId=${type}&`
    }
    else if(keyword != null) {
      url += `?keyword=${keyword}&`
    }
    
    if (url.endsWith('&')) {
      url += `pageIndex=${page-1}&pageSize=${pageSize}`
    }
    else {
      url += `?pageIndex=${page-1}&pageSize=${pageSize}`
    }
    return url
  },
  getVehicleDetails: (id) => `${ApiEndpoint}/vehicles/${id}`,
  postOrder: () => `${ApiEndpoint}/order-details`,
  deleteOrder: (id) => `${ApiEndpoint}/order-details/${id}`,
  getOrderDetails: (id) => `${ApiEndpoint}/orders/${id}`,
  checkoutOrder: (id) => `${ApiEndpoint}/orders/${id}`,
  login: () => `${ServerUri}/api/login`,
  signup: () => `${ServerUri}/api/signup`,
}