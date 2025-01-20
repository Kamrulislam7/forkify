import previewView from './previewView';
import { View } from './View';

class bookmarkView extends View {
  _parentEle = document.querySelector('.bookmarks__list');
  _errorMsg = 'No recipes found in your query. Please try again!';

  addHandlerRender(hendler) {
    window.addEventListener('load', hendler);
  }

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new bookmarkView();
