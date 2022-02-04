import {reqSearchInfo} from '@/apis';
const state = {
  searchInfo: {}
}
const mutations = {
  SET_SEARCHINFO(state, info){
    state.searchInfo = info
  }
}
const actions = {
  async getSearchInfo({commit}, searchParams){
    const result = await reqSearchInfo(searchParams)
    // console.log(result);
    if(result.code === 200){
      commit('SET_SEARCHINFO', result.data)
      return 'ok'
    }else{ 
      return Promise.reject(new Error('failed'))
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}