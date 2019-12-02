import './style.scss';

import Slide from './../slide/index.js';
import Paginator from './../paginator/index.js';

export default class Slider {
  constructor(containerID, dataURL) {
    let container = document.getElementById(containerID),
      content = document.createElement('div');

    container.classList.add('slider');
    content.classList.add('slider__content');

    fetch(dataURL)
      .then(data => data.json())
      .then(dataJSON => {
        for (let data of dataJSON) content.append(new Slide(data).getHtml);

        content.firstChild.classList.add('active');

        container.append(content);
        container.append(new Paginator(containerID, content).getHtml);
      });
  }
}
