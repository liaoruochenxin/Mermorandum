// index.js
Page({
  data: {
    memos: []
  },

  onLoad() {
    this.loadMemos()
  },

  onShow() {
    this.loadMemos()
  },

  /**
   * 加载备忘录列表
   */
  loadMemos() {
    const memos = wx.getStorageSync('memos') || []
    this.setData({ memos })
  },

  /**
   * 创建新备忘录
   */
  onCreateMemo() {
    wx.navigateTo({
      url: '/pages/memo-add/memo-add'
    })
  },

  /**
   * 查看备忘录详情
   */
  onViewMemo(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/memo-detail/memo-detail?id=${id}`
    })
  }
})
