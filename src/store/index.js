import { createStore } from 'vuex'
import axios from 'axios';

const store = createStore({
  state: {
   results: [],
   news: []
  },
  mutations: {
    setResults(state, results) {
      state.results = results;
    },
    setNews(state, news) {
        state.news = news;
      },
  },
  actions: {
    async fetchResults({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/api/football-data');
        commit('setResults', response.data.matches);
      } catch (error) {
        console.error('Error fetching soccer results:', error);
      }
    },
    async fetchNews({ commit }) {
        try {
          const response = await axios.get('http://localhost:3000/api/football-news');
          commit('setNews', response.data.articles);
        } catch (error) {
          console.error('Error fetching news:', error);
        }
      },
  },
});

export default store