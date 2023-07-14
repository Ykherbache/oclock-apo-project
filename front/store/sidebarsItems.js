const state = () => ({
  sidebarUnauthenticatedUser: [
    {
      faIconType: 'fas',
      faIcon: 'rectangle-list',
      title: 'Games List',
      class: 'primary--text',
      to: '/game-list',
    },
    /*
    {
      faIconType: 'fas',
      faIcon: 'faHome',
      title: 'Liste de GM',
      class: 'primary--text',
      to: '/game-master-list',
    },

    * */
    {
      faIconType: 'fas',
      faIcon: 'gavel',
      title: 'legals',
      to: '/legals',
      class: 'primary--text',
    },
  ],
  sidebarUser: [
    {
      faIconType: 'fas',
      faIcon: 'user',
      title: 'My informations',
      to: '/users/id',
      class: 'primary--text',
    },
    {
      faIconType: 'fas',
      faIcon: 'money-bill',
      title: 'rents (as owner)',
      class: 'primary--text',
      to: '/users/rentsAsOwner',
    },
    {
      faIconType: 'fas',
      faIcon: 'gamepad',
      title: 'rents (as renter)',
      class: 'primary--text',
      to: '/users/rentsAsRenter',
    },
    {
      faIconType: 'fas',
      faIcon: 'message',
      title: 'My messages',
      class: 'primary--text',
      to: '/users/message',
    },
    {
      faIconType: 'fas',
      faIcon: 'gavel',
      title: 'legals',
      to: '/legals',
      class: 'primary--text',
    },
  ],
})
const getters = {
  getSidebarUser(state) {
    return state.sidebarUser
  },
  getSidebarUnauthenticatedUser(state) {
    return state.sidebarUnauthenticatedUser
  },
}

const mutations = {
  SET_SIDEBAR_USER(state, newItems) {
    state.sidebarUser = newItems
  },
  SET_SIDEBAR_UNAUTHENTICATION_USER(state, newItems) {
    state.sidebarUnauthenticatedUser = newItems
  },
}

const actions = {
  setSidebarUser({ commit }, newItems) {
    commit('SET_SIDEBAR_USER', newItems)
  },
  setSidebarUnauthenticationUser({ commit }, newItems) {
    commit('SET_SIDEBAR_UNAUTHENTICATION_USER', newItems)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
