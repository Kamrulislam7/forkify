import { View } from './View';
import icons from 'url:../../../src/img/icons.svg';

class PaginationView extends View {
  _parentEle = document.querySelector('.pagination');

  addHandelerClick(handler) {
    this._parentEle.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline ');

      if (!btn) return;

      const goTOpage = +btn.dataset.gotopage;

      handler(goTOpage);
    });
  }

  _generateMarkup() {
    const curntPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    console.log(curntPage);

    if (curntPage === 1 && numPages > 1) {
      const [markup1] = this._generateBtn(curntPage);
      return markup1;
    }

    if (curntPage === numPages && numPages > 1) {
      const [markup1, markup2] = this._generateBtn(curntPage);
      return markup2;
    }

    if (curntPage < numPages) {
      const [markup1, markup2] = this._generateBtn(curntPage);
      return [markup1, markup2];
    }

    return '';
  }

  _generateBtn(curntPage) {
    const markup1 = ` 
          <button data-goToPage ="${
            curntPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${curntPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    const markup2 = `<button data-goToPage ="${
      curntPage - 1
    }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curntPage - 1}</span>
        </button>`;

    return [markup1, markup2];
  }
}

export default new PaginationView();
