import ajax from './ajax'
import mockAjax from './mockAjax';

// 获取三级分类
const reqCategoryList = () => ajax('/product/getBaseCategoryList')

const reqBannerList = () => mockAjax.get('/banner')

const reqFloorList = () => mockAjax.get('/floor')

const reqSearchInfo = (searchParams) => ajax('/list', searchParams, 'POST')

export { 
  reqCategoryList,
  reqBannerList,
  reqFloorList,
  reqSearchInfo
}