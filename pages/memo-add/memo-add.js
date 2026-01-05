// pages/memo-add/memo-add.js
Page({
  data: {
    title: '',
    content: '',
    tags: [],
    tagInput: '',
    selectedColor: ''
  },

  /**
   * 标题输入
   */
  onTitleInput(e) {
    this.setData({
      title: e.detail.value
    })
  },

  /**
   * 内容输入
   */
  onContentInput(e) {
    this.setData({
      content: e.detail.value
    })
  },

  /**
   * 标签输入
   */
  onTagInput(e) {
    this.setData({
      tagInput: e.detail.value
    })
  },

  /**
   * 添加标签
   */
  onAddTag() {
    const tag = this.data.tagInput.trim()
    if (!tag) return

    if (this.data.tags.includes(tag)) {
      wx.showToast({
        title: '标签已存在',
        icon: 'none'
      })
      return
    }

    if (this.data.tags.length >= 5) {
      wx.showToast({
        title: '最多添加5个标签',
        icon: 'none'
      })
      return
    }

    this.setData({
      tags: [...this.data.tags, tag],
      tagInput: ''
    })
  },

  /**
   * 删除标签
   */
  onRemoveTag(e) {
    const index = e.currentTarget.dataset.index
    const tags = this.data.tags.filter((_, i) => i !== index)
    this.setData({ tags })
  },

  /**
   * 选择颜色
   */
  onSelectColor(e) {
    const color = e.currentTarget.dataset.color
    this.setData({
      selectedColor: color
    })
  },

  /**
   * 保存备忘录
   */
  onSave() {
    const { title, content, tags, selectedColor } = this.data

    if (!title && !content) {
      wx.showToast({
        title: '请输入标题或内容',
        icon: 'none'
      })
      return
    }

    // 生成备忘录对象
    const memo = {
      id: Date.now().toString(),
      title: title || '无标题',
      content: content || '',
      tags: tags,
      color: selectedColor,
      createTime: new Date().getTime(),
      date: this.formatDate(new Date())
    }

    // 保存到本地存储
    const memos = wx.getStorageSync('memos') || []
    memos.unshift(memo)
    wx.setStorageSync('memos', memos)

    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 1500
    })

    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  },

  /**
   * 格式化日期
   */
  formatDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hour = String(date.getHours()).padStart(2, '0')
    const minute = String(date.getMinutes()).padStart(2, '0')

    return `${year}-${month}-${day} ${hour}:${minute}`
  }
})
