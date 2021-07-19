import { auth } from '../firebase'

const state = () => ({
  user: null,
  userListener: () => {}
})

const getters = {
  getUserUid (state) {
    return state.user.uid
  }
}

const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setUserListener (state, listener) {
    if (listener) {
      state.userListener = listener
    } else {
      state.userListener()
    }
  }
}

const actions = {
  getCurrentUser () {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          unsubscribe()
          resolve(user)
        } else {
          resolve(null)
        }
      }, error => { reject(error) })
    })
  },

  async doLogin ({ commit }, { email, password }) {
    await auth.signInWithEmailAndPassword(email, password)
    commit('setUser', auth.currentUser)
  },

  async doRegister ({ commit }, { name, email, password }) {
    try {
      await auth.createUserWithEmailAndPassword(email, password)
      const user = auth.currentUser
      await user.updateProfile({
        displayName: name
      })
      commit('setUser', user)
    } catch (error) {
      console.error(error)
      throw new Error(error.message)
    }
  },

  async doLogout () {
    await auth.signOut()
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
