const state = () => ({
  messagesList: [],
  message: null,
  pseudoList: [],
})
const getters = {
  getMessagesList(state) {
    return state.messagesList
  },
  getPseudoList(state) {
    return state.pseudoList
  },
  getMessage(state) {
    return state.message
  },
}

const mutations = {
  SET_MESSAGES_LIST(state, messagesList) {
    state.messagesList = messagesList
  },
  SET_PSEUDO_LIST(state, messagesList) {
    state.pseudoList = messagesList
  },
  SET_MESSAGE(state, message) {
    state.message = message
  },
}

const actions = {
  // get message by id
  setMessageById({ commit }, messageId) {
    return this.$axios
      .get(`/user/account/message/${messageId}`)
      .then((response) => {
        commit('SET_MESSAGE', response)
        return Promise.resolve(response)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  // get all messages
  setMessagesList({ commit }, userId) {
    return this.$axios
      .get(`api/user/account/message/list/${userId}`)
      .then((response) => {
        commit('SET_MESSAGES_LIST', response.data)
        return Promise.resolve(response)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  setPseudoList({ commit }, userId) {
    return this.$axios
      .get(`api/user/account/message/list/${userId}`)
      .then((response) => {
        this.messages = response.data
        const pseudoList = response.data.map((message) => {
          if (
            message.sender_id !== this.$auth.$storage.getUniversal('user').id
          ) {
            return message.sender.pseudo
          } else {
            return message.receiver.pseudo
          }
        })
        commit('SET_PSEUDO_LIST', pseudoList)
        return Promise.resolve(response)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },

  postMessageCreate({ commit }, message) {
    return this.$axios
      .post('api/user/account/message/create', message)
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  deleteMessage({ commit }, messageToDelete) {
    return this.$axios
      .delete(
        `api/user/account/message?` +
          `messageId=` +
          messageToDelete.messageId +
          `&` +
          `userId=` +
          messageToDelete.userId
      )
      .then((response) => {
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
