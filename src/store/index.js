import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    paymentProcessed: false,
    loading: false
  },
  mutations: {
    setPaymentProcessed(state, status) {
      state.paymentProcessed = status;
      if (status === true) {
        localStorage.setItem('paymentProcessed', 'true');
      } else if (status === false) {
        localStorage.removeItem('paymentProcessed');
      }
    },
    setLoading(state, status) {
      state.loading = status;
    }
  },
  actions: {
    showLoading({ commit }) {
      commit('setLoading', true);
    },
    hideLoading({ commit }) {
      commit('setLoading', false);
    }
  }
});
