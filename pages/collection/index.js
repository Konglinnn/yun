Page({
  data: {
    timelineTabs: ['历史渊源', '新石器时代', '战国', '西汉', '魏晋'],
    timelineCurrent: 0,
    treasures: [
      {
        id: 1,
        cover: '/assets/treasure1.png',
        title: '青铜器·兽面纹鼎',
        desc: '西周时期青铜器，造型庄重，纹饰精美，是中国古代青铜文化的代表之一。'
      },
      {
        id: 2,
        cover: '/assets/treasure2.png',
        title: '唐三彩骆驼',
        desc: '唐代三彩陶器，色彩斑斓，造型生动，展现了丝绸之路的繁荣景象。'
      }
      // ...更多藏品
    ]
  },
  onTimelineTab(e) {
    this.setData({ timelineCurrent: e.currentTarget.dataset.index });
    // 這裡可以根據tab切換內容
  },
  onBack() {
    wx.navigateBack();
  },
  onFilter() {
    wx.showToast({ title: '筛选功能开发中', icon: 'none' });
  },
  goDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/collection/collection-detail?id=${id}` });
  }
});