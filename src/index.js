import NewsApiService from './api/api-services';
import articleMarkup from './templetes/articles.hbs';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
  loadMoreButton: document.querySelector('[data-action="load-more"]'),
};

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSubmitForm);
refs.loadMoreButton.addEventListener('click', onLoadMoreButton);

let searchQuery = '';

function onSubmitForm(e) {
  e.preventDefault();

  // clearArticlesContainer(); ---- если оставлю очистку тут ,то при в вооде уже очистятся данные
  newsApiService.query = e.target.elements.query.value;
  newsApiService.resetPage();
  newsApiService.fetchArticles().then(articles => {
    //  а здесь мы будем видеть наши картинки,
    //  но когда начнем грузить новые старые только тогда перезапишуться
    clearArticlesContainer();
    appendArticlesMarkup(articles);
  });
}

function onLoadMoreButton() {
  newsApiService.fetchArticles().then(appendArticlesMarkup);
}

function appendArticlesMarkup(articles) {
  refs.articlesContainer.insertAdjacentElement(
    'beforeend',
    articleMarkup(articles)
  );
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}
