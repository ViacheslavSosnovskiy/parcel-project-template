import NewsApiService from './api/api-services';
// import articleMarkup from './templetes/articles.hbs';
import LoadMoreBtn from './components/load-more-btn';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
  // loadMoreButton: document.querySelector('[data-action="load-more"]'),
};

// мы передали '[data-action="load-more"]' который потом запишиться в selector в файле load-more-btn.js
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
});
console.log(loadMoreBtn);
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSubmitForm);
loadMoreBtn.refs.button.addEventListener('click', onLoadMoreButton);
// refs.loadMoreButton.addEventListener('click', onLoadMoreButton);

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
  const fetchArticlesMarkup = articles
    .map(({ url, title, author, description }) => {
      return `<li>
    <a href='${url}' target='_blank' rel='noopener noreferrer'>
      <article>
        <img src=${url}/>
        <h2>${title}</h2>
        <p>Posted by:${author}</p>
        <p>
          ${description}
        </p>
      </article>
    </a>
  </li>`;
    })
    .join('');
  refs.articlesContainer.insertAdjacentElement(
    'beforeend',
    fetchArticlesMarkup
  );
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}
