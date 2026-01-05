// pages/login/login.js
Page({
  data: {
    loading: false
  },

  /**
   * 获取用户信息回调
   */
  onGetUserInfo(e) {
    if (e.detail.userInfo) {
      // 用户同意授权
      this.setData({ loading: true })

      // TODO: 这里需要将用户信息发送到后端服务器
      // 进行登录验证和用户信息存储
      const userInfo = e.detail.userInfo

      console.log('用户信息:', userInfo)

      // 模拟登录请求
      setTimeout(() => {
        wx.setStorageSync('userInfo', userInfo)
        wx.setStorageSync('isLogin', true)

        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 1500
        })

        // 跳转到首页
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/index/index'
          })
        }, 1500)
      }, 1000)
    } else {
      // 用户拒绝授权
      wx.showToast({
        title: '需要授权才能使用',
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 查看用户协议
   */
  onAgreement() {
    wx.showModal({
      title: '用户协议',
      content: '这里是用户协议的内容...',
      showCancel: false
    })
  },

  /**
   * 查看隐私政策
   */
  onPrivacy() {
    wx.showModal({
      title: '隐私政策',
      content: '这里是隐私政策的内容...',
      showCancel: false
    })
  }
})
