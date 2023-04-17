import axios from 'axios';

export default class NewApiService {
  constructor({ url, key }) {
    this.url = url;
    this.key = key;
    this.query = '';
    this.page = 1;
  }

  fetchCards() {
    return axios.get(
      `${this.url}?key=${this.key}&q=${this.query}&per_page=40&page=${this.page}&image_type=photo&orientation=horizontal&safesearch=true`
    );
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
