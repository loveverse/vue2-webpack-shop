import { reqCategoryList,reqBannerList } from '@/apis';
const state = {
  categoryListData: [],
  bannerListData: []
}

const mutations = {
  SET_CATEGORYLISTDATA(state, data) {
    state.categoryListData = data
    // console.log(state.categoryListData);
  },
  SET_BANNERLISTDATA(state, data){
    state.bannerListData = data
    // console.log(data);
  }
}

const actions = {
  // async函数叫异步函数
  // 一般在异步函数当中都是一些异步的操作
  // async函数返回值一定是promise，不看return
  // 返回的promise成功还是失败看return 
  // 如果return的值：
  // promise值和非promise值
  // 如果是非promise值，那么函数返回的promise状态就是成功的，成功的结果就是return的结果
  // 如果是非promise值，但是中间抛出异常，那么函数返回的promise状态就是失败的，失败的原因就是抛出的异常
  // 如果是promise值，return返回的promise是成功的，那么函数返回的promise就是成功的，
          // 成功的结果就是return的promise成功的结果
  // 如果是promise值，return返回的promise是失败的，那么函数返回的promise就是失败的
          // 失败的原因就是return的promise失败的原因
  async getCateGoryListData({ commit }) {
    const result = await reqCategoryList()
    if (result.code === 200) {
      commit('SET_CATEGORYLISTDATA', result.data)
      // 后面能继续处理Promise
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  async getBannerListData({commit}){
    const result = await reqBannerList()
    if(result.code === 200){
      commit('SET_BANNERLISTDATA', result.data)
      return 'ok'
    }else {
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