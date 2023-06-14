export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    const KEY = '75e6d13ff6fd46bfbb1d82a5e48ed5ff';
    const BASE_URL = 'https://newsapi.org/v2/everything';

    return fetch(
      `${BASE_URL}?q=${this.searchQuery}&pageSize=5&page=${this.page}&apiKey=${KEY}`
    )
      .then(response => response.json())
      .then(({ articles }) => {
        this.page += 1;

        return articles;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
