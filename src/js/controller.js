import * as model from './model.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

// if (module.hot) {
//   module.hot.accept();
// }

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpiner();

    await model.loadRecipe(id);

    resultsView.update(model.getSearchResultPage());
    bookmarkView.update(model.state.bookmarks);

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.generateError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpiner();
    const query = searchView.getSearchQuery();
    await model.searchRecipi(query);

    resultsView.render(model.getSearchResultPage(1));

    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const pageNationBtn = function (goTopage) {
  resultsView.render(model.getSearchResultPage(goTopage));

  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateService(newServings);
  recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmarkRecipi(model.state.recipe);
  } else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controladdRecipeUplode = async function (data) {
  try {
    recipeView.renderSpiner();
    await model.uploadRecipe(data);

    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();

    bookmarkView.render(model.state.bookmarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // window, history.back()

    setTimeout(function () {
      addRecipeView.addToggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.generateError(err.message);
  }
};
const int = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandelerRander(showRecipe);
  recipeView.addHandelerUpdate(controlServings);
  searchView.addHandelerSearch(controlSearchResults);
  paginationView.addHandelerClick(pageNationBtn);
  recipeView.addHandlerBookmark(controlBookmark);
  addRecipeView.addHandleruploder(controladdRecipeUplode);
};

int();
