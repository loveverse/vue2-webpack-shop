import {reqDetailInfo} from '@/apis';
const state = {
  detailInfo: {}
}
const mutations = {
  SET_DETAIL_INFO(state, data){
    state.detailInfo = data
    // console.log(data);
  }
}
const actions = {
  async getDetailInfo({commit}, id){
    const result = await reqDetailInfo(id)
    if(result.code === 200){
      commit("SET_DETAIL_INFO", result.data)
      return 'ok'
    }else {
      return Promise.reject(new Error("failed"))
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}