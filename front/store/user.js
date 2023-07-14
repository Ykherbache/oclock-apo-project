const state = () => ({
  user: [],
  showAddGameModal: false,
  userInfo: null,
})
const getters = {
  getUser(state) {
    return state.user
  },
  getShowAddGameModal(state) {
    return state.showAddGameModal
  },
  getUserInfo(state) {
    return state.userInfo
  },
}

const mutations = {
  SET_USER(state, user) {
    state.messagesList = user
  },
  SET_SHOW_ADD_GAME(state, payload) {
    state.showAddGameModal = payload
  },
  SET_USER_INFO(state, user) {
    state.userInfo = user
  },
}

const actions = {
  // get message by id
  setShowAddGameModal({ commit }, payload) {
    commit('SET_SHOW_ADD_GAME', payload)
  },
  fetchUserById({ commit }, userId) {
    return this.$axios
      .get(`/user/account/${userId}`)
      .then((response) => {
        commit('SET_USER_INFO', response)
        return Promise.resolve(response)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
