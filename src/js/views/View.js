import icons from 'url:../../../src/img/icons.svg';
export class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.generateError();
    this._data = data;

    const markup = this._generateMarkup();

    if (!render) return markup;
    this._clear();

    this._parentEle.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;

    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDom.querySelectorAll('*'));

    const curentEle = Array.from(this._parentEle.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const curEl = curentEle[i];

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  renderSpiner() {
    const markup = `
        <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>`;

    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentEle.innerHTML = '';
  }
  generateError(message = this._errorMsg) {
    const markup = `<div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div> `;
    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `<div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div> `;
    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', markup);
  }
}
