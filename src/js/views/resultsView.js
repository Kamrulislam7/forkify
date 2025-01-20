import previewView from './previewView';
import { View } from './View';

class ResultsView extends View {
  _parentEle = document.querySelector('.results');
  _errorMsg = 'No recipes found in your query. Please try again!';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
