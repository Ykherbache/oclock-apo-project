const state = () => ({
  showSignUpModal: false,
  showSignInModal: false,
  showForgotPasswordModal: false,
  authUser: null,
})
const getters = {
  getShowSignUpModal(state) {
    return state.showSignUpModal
  },
  getShowSignInModal(state) {
    return state.showSignInModal
  },
  getShowForgotPasswordModal(state) {
    return state.showForgotPasswordModal
  },
  getAuthUser(state) {
    return state.authUser
  },
}
const mutations = {
  SET_SHOW_SIGN_UP_MODAL(state, payload) {
    state.showSignUpModal = payload
  },
  SET_SHOW_SIGN_IN_MODAL(state, payload) {
    state.showSignInModal = payload
  },
  SET_SHOW_FORGOT_PASSWORD(state, payload) {
    state.showForgotPasswordModal = payload
  },
  SET_AUTH_USER(state, payload) {
    state.authUser = payload
  },
}
const actions = {
  setShowSignUpModal({ commit }, payload) {
    commit('SET_SHOW_SIGN_UP_MODAL', payload)
  },
  setShowSignInModal({ commit }, payload) {
    commit('SET_SHOW_SIGN_IN_MODAL', payload)
  },
  setShowForgotPasswordModal({ commit }, payload) {
    commit('SET_SHOW_FORGOT_PASSWORD', payload)
  },
  setAuthUser({ commit }, payload) {
    commit('SET_AUTH_USER', payload)
  },
}
export default {
  state,
  getters,
  mutations,
  actions,
}
