import { View } from './View';

class searchView extends View {
  _parentEle = document.querySelector('.search');

  getSearchQuery() {
    const query = this._parentEle.querySelector('.search__field').value;

    this._clearSerach();

    return query;
  }
  _clearSerach() {
    this._parentEle.querySelector('.search__field').value = '';
  }

  addHandelerSearch(handler) {
    this._parentEle.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
