import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    answers: {
    }
  },
  mutations: {
    changeAnswer(state, payload) {
      state.answers[payload.questionId] = payload.answer
    }
  },
  actions: {
    addAnswer({commit}, payload) {
      commit('changeAnswer', payload)
    }
  },
  getters: {
    getAnswers: (state) => {
      return state.answers
    }
  },
  modules: {
  }
})
