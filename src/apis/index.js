import ajax from './ajax'

// 获取三级分类
const reqCategoryList = () => ajax('/api/product/getBaseCategoryList')