import { View } from './View.js';

class AddRecipeView extends View {
  _parentEle = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');

  _message = 'Recipe is successfuly uplpd';
  _overlay = document.querySelector('.overlay');
  _closeBtn = document.querySelector('.btn--close-modal');
  _openBtn = document.querySelector('.nav__btn--add-recipe');

  constructor() {
    super();

    this._addOpenRecipeBtn();
    this._closeOpenRecipeBtn();
  }

  addToggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addOpenRecipeBtn() {
    this._openBtn.addEventListener('click', this.addToggleWindow.bind(this));
  }

  _closeOpenRecipeBtn() {
    this._closeBtn.addEventListener('click', this.addToggleWindow.bind(this));
    this._overlay.addEventListener('click', this.addToggleWindow.bind(this));
  }

  addHandleruploder(hendler) {
    this._parentEle.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];

      const data = Object.fromEntries(dataArr);

      hendler(data);
    });
  }
  _generateMarkup() {}
}

export default new AddRecipeView();
