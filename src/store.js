import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
const SET_LOADING = 'SET_LOADING';
const SET_LIST = 'SET_LIST';
const RESET_LIST = 'RESET_LIST';
const SET_TOTAL_COUNT = 'SET_COUNT';
const RESET_TOTAL_COUNT = 'RESET_COUNT';

export default new Vuex.Store({
  state: {
    searchQuery: 'https://github.com/vuejs/vue/issues',
    loading: false,
    list: [],
    total_count: null
  },
  mutations: {
    [SET_SEARCH_QUERY]: (state, searchQuery) => state.searchQuery = searchQuery,
    [SET_LOADING]: (state, loading) => state.loading = loading,
    [SET_LIST]: (state, list) => state.list = list,
    [RESET_LIST]: state => state.list = [],
    [SET_TOTAL_COUNT]: (state, total_count) => state.total_count = total_count,
    [RESET_TOTAL_COUNT]: state => state.total_count = null,
  },
  actions: {
    //Получаем количество строк
    async count({ commit }) {
      try {                               //пока вбиваем репо намертво
        const { data } = await axios.get(`https://api.github.com/search/issues?q=repo:vuejs/vue`)
        commit(SET_TOTAL_COUNT, data.total_count);
      } catch (e) {
        commit(RESET_TOTAL_COUNT);
      }
    },
    //Получаем первые n(15) строк
    async search({ commit, state }) {
      commit(SET_LOADING, true);
      try {
        const { data } = await axios.get(`https://api.github.com/repos/${state.searchQuery.replace("https://github.com/", "")}?per_page=15&sort=created&order=asc`)
        commit(SET_LIST, data);
      } catch (e) {
        commit(RESET_LIST);
      }
      commit(SET_LOADING, false);
    }
  }
});