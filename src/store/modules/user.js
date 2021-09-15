import { setToken, removeToken } from '../../utils/cookies'

const user = {
  state: {
    userInfo: null,
    roles: []
  },
  mutations: {
    SET_ROLES (state, roles) {
      state.roles = roles
    },
    SET_USER_INFO (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    login ({ commit }, params) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          setToken('23423j12h8fa7f9asd7f9')
          commit('SET_USER_INFO', { name: 'yd' })
          commit('SET_ROLES', ['admin'])
          resolve()
        }, 2000)
      })
    },
    loginOut ({ commit }) {
      commit('SET_USER_INFO', '')
      commit('SET_ROLES', [])
      removeToken()
    }
  }
}

export default user
