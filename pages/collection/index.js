Page({
  data: {
    treasures: [
      {
        id: 1,
        cover: '/assets/treasure1.jpg',
        title: '青铜器·兽面纹鼎',
        desc: '西周时期青铜器，造型庄重，纹饰精美，是中国古代青铜文化的代表之一。'
      },
      {
        id: 2,
        cover: '/assets/treasure2.jpg',
        title: '唐三彩骆驼',
        desc: '唐代三彩陶器，色彩斑斓，造型生动，展现了丝绸之路的繁荣景象。'
      }
      // ...更多藏品
    ],
    showAI: false,
    messages: [
      {from: 'ai', text: '你好，我是文小鹤，有什么可以帮你？'}
    ],
    inputValue: ''
  },
  onBack() {
    wx.navigateBack();
  },
  onFilter() {
    wx.showToast({ title: '筛选功能开发中', icon: 'none' });
  },
  goDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/collection/detail?id=${id}` });
  },
  showAIChat() {
    this.setData({ showAI: true });
  },
  hideAIChat() {
    this.setData({ showAI: false });
  },
  stopTap(e) {
    // 阻止冒泡
  },
  onInput(e) {
    this.setData({ inputValue: e.detail.value });
  },
  sendMsg() {
    const { inputValue, messages } = this.data;
    if (!inputValue.trim()) return;
    messages.push({from: 'user', text: inputValue});
    // 模拟AI回复
    setTimeout(() => {
      messages.push({from: 'ai', text: '这是AI的回复：' + inputValue});
      this.setData({ messages, inputValue: '', scrollTo: 'msgBottom' });
    }, 800);
    this.setData({ messages, inputValue: '', scrollTo: 'msgBottom' });
  }
});