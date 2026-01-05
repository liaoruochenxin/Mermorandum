// pages/memo-detail/memo-detail.js
Page({
  data: {
    memo: {},
    memoId: ''
  },

  onLoad(options) {
    const id = options.id
    if (id) {
      this.setData({ memoId: id })
      this.loadMemo(id)
    }
  },

  /**
   * 页面显示时重新加载数据
   */
  onShow() {
    if (this.data.memoId) {
      this.loadMemo(this.data.memoId)
    }
  },

  /**
   * 加载备忘录详情
   */
  loadMemo(id) {
    const memos = wx.getStorageSync('memos') || []
    const memo = memos.find(m => m.id === id)

    if (memo) {
      wx.setNavigationBarTitle({
        title: memo.title
      })
      this.setData({ memo })
    } else {
      wx.showToast({
        title: '备忘录不存在',
        icon: 'none'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }
  },

  /**
   * 编辑备忘录
   */
  onEdit() {
    wx.navigateTo({
      url: `/pages/memo-edit/memo-edit?id=${this.data.memo.id}`
    })
  },

  /**
   * 删除备忘录
   */
  onDelete() {
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条备忘录吗？',
      confirmColor: '#ff4757',
      success: (res) => {
        if (res.confirm) {
          this.deleteMemo()
        }
      }
    })
  },

  /**
   * 执行删除操作
   */
  deleteMemo() {
    const memos = wx.getStorageSync('memos') || []
    const newMemos = memos.filter(m => m.id !== this.data.memo.id)
    wx.setStorageSync('memos', newMemos)

    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 1500
    })

    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  }
})
