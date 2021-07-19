import { createStore } from 'vuex'

import user from './user'
import { auth } from '../firebase'

const store = createStore({
  state: () => ({
  }),
  mutations: {
  },
  actions: {
    checkAuth ({ dispatch, commit }) {
      auth.onAuthStateChanged(async function (user) {
        if (user) {
          commit('user/setUser', user)
        } else {
          commit('user/setUser', null)
          commit('user/setUserListener', () => {})
        }
      })
    }
  },
  modules: {
    user
  }
})

export default store

store.dispatch('checkAuth')
