import { basename } from 'path';

import './style.scss';

import { createElementFromHTML } from './../utils.js';

export default class Slide {
  constructor(data) {
    this.html = this.createArticle(data);
  }

  createArticle({ productUrl, img, title, description, note }) {
    let article = createElementFromHTML(`
      <article class="article">
        <a href="${ productUrl }" class="article__link" title="${ note }">
            <img class="article__img" src="${ img }" alt="${ basename(img) }">
        </a>
        <div class="article__content">
          <header class="article__header">
              <h2>
                ${ title }
              </h2>
          </header>
          <div class="article__description js-article__description">
            ${ description }
          </div>
          <a href="#" class="more">more...</a>
        </div>
      </article>
    `);

    let more = article.querySelector('.more');

    more.addEventListener('click', event => {
      event.preventDefault();

      article.querySelector('.js-article__description').classList.toggle('opened');
    });

    return article;
  }

  get getHtml() {
    return this.html;
  }
}