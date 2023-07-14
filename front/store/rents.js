const state = () => ({
  reserved: { rents: {} },
  rented: { rents: {} },
  closed: { rents: {} },
  maxPageClosed: null,
  maxPageRented: null,
  maxPageReserved: null,
})
const getters = {
  getReserved(state) {
    return state.reserved
  },
  getRented(state) {
    return state.rented
  },
  getClosed(state) {
    return state.closed
  },
}

const mutations = {
  setReserved(state, data) {
    state.reserved = data
  },
  setRented(state, data) {
    state.rented = data
  },
  setClosed(state, data) {
    state.closed = data
  },
  setMaxPageClosed(state, maxPage) {
    state.maxPageClosed = maxPage
  },
  setMaxPageRented(state, maxPage) {
    state.maxPageRented = maxPage
  },
  setMaxPageReserved(state, maxPage) {
    state.maxPageReserved = maxPage
  },
}
const actions = {
  fetchReserved({ commit, rootState }, page) {
    // Faites votre appel API pour récupérer les données de réservation
    // Utilisez commit pour appeler la mutation appropriée et mettre à jour l'état
    // Exemple :
    this.$axios
      .get(
        `api/user/account/rent/${
          this.$auth.$storage.getUniversal('user').id
        }/reserved?pageSize=8&page=${page}`
      )
      .then((res) => {
        commit('setReserved', res.data)
      })
  },
  fetchRented({ commit, rootState }, page) {
    // Faites votre appel API pour récupérer les données de fermeture
    // Utilisez commit pour appeler la mutation appropriée et mettre à jour l'état
    // Exemple :
    this.$axios
      .get(
        `api/user/account/rent/${
          this.$auth.$storage.getUniversal('user').id
        }/rented?pageSize=8&page=${page}`
      )
      .then((res) => {
        commit('setRented', res.data)
      })
  },
  fetchClosed({ commit, rootState }, page) {
    this.$axios
      .get(
        `api/user/account/rent/${
          this.$auth.$storage.getUniversal('user').id
        }/closed?pageSize=8&page=${page}`
      )
      .then((res) => {
        commit('setClosed', res.data)
      })
  },
}
export default {
  state,
  getters,
  mutations,
  actions,
}
