import './style.scss';

import { createElementFromHTML } from './../utils.js';

export default class Paginator {
  constructor(sliderID, data) {
    this.html = this.createPaginator(sliderID, data);
  }

  createPaginator(sliderID, data) {
    let buttons = createElementFromHTML(`
      <div class="${ sliderID }__paginator paginator">
        <button id="start" class="ui-button">start</button>
        <button id="prev" class="ui-button">prev</button>
        <button id="next" class="ui-button">next</button>
        <button id="end" class="ui-button">end</button>
      </div>
    `),
      start = buttons.querySelector('#start'),
      prev = buttons.querySelector('#prev'),
      next = buttons.querySelector('#next'),
      end = buttons.querySelector('#end'),
      current = 0;


    function changeState(event) {
      switch (event.currentTarget.id) {
        case 'start':
          current = 0;
          break;
        case 'prev':
          current -= current > 0 ? 1 : 0;
          break;
        case 'next':
          current += (current < data.children.length - 1) ? 1 : 0;
          break;
        case 'end':
          current = data.children.length - 1;
          break;
      }

      let allBtns = buttons.querySelectorAll('#start, #prev, #next, #end');

      for (let btn of allBtns)
        btn.disabled = false;


      if (current == 0) {
        let startButtons = buttons.querySelectorAll('#start, #prev');

        for (let btn of startButtons)
          btn.disabled = true;

      } else if (current == data.children.length - 1) {
        let endButtons = buttons.querySelectorAll('#next, #end');

        for (let btn of endButtons)
          btn.disabled = true;
      }

      for (let child of data.children) {
        child.classList.remove('active');
        child.querySelector('.js-article__description').classList.remove('opened')
      }

      data.children[current].classList.add('active');
    }

    start.addEventListener('click', changeState);
    prev.addEventListener('click', changeState);
    next.addEventListener('click', changeState);
    end.addEventListener('click', changeState);

    return buttons;
  }

  get getHtml() {
    return this.html;
  }
}