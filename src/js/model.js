import { async } from 'regenerator-runtime';
import { AJAX, getJosn, sendJosn } from './helper';

import { API_URL, KEY, PER_PAGE_NUM } from './config';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultPerPage: PER_PAGE_NUM,
  },
  bookmarks: [],
};

const creatRecipeObject = function (data) {
  const { recipe } = data.data;

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);

    state.recipe = creatRecipeObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else state.recipe.bookmarked = false;
  } catch (error) {
    throw error;
  }
};

export const searchRecipi = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}/?search=${query}&key=${KEY}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
  } catch (error) {
    throw error;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;

  return state.search.results.slice(start, end);
};

export const updateService = function (newService) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newService) / state.recipe.servings;
  });
  state.recipe.servings = newService;
};

const presetBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmarkRecipi = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  presetBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.indexOf(el => el.id === id);

  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  presetBookmarks();
};
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

const clearBookmarkes = function () {
  localStorage.clear('bookmarks');
};

clearBookmarkes();

export const uploadRecipe = async function (newREcipe) {
  try {
    const ingredients = Object.entries(newREcipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].replaceAll('', '').split(',');

        if (ingArr.length !== 3)
          throw new Error('Format doest match try correct formet');

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: newREcipe.title,
      source_url: newREcipe.sourceUrl,
      image_url: newREcipe.image,
      publisher: newREcipe.publisher,
      cooking_time: +newREcipe.cookingTime,
      servings: +newREcipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = creatRecipeObject(data);
    console.log(data);
    addBookmarkRecipi(state.recipe);
  } catch (err) {
    throw err;
  }
};
