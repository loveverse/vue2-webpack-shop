export default {
  attrList: state => state.search.searchInfo.attrsList,
  goodList: state => state.search.searchInfo.goodsList,
  trademarkList: state => state.search.searchInfo.trademarkList,
  categoryView: state => state.detail.detailInfo.categoryView || {},
  skuInfo: state => state.detail.detailInfo.skuInfo || {},
  spuSaleAttrList: state => state.detail.detailInfo.spuSaleAttrList || []
}