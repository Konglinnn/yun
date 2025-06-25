Page({
  data: {
    bookCovers: [
      {img: '/assets/book1.png'},
      {img: '/assets/book2.png'},
      {img: '/assets/book3.png'},
      {img: '/assets/book4.png'},
      {img: '/assets/book5.png'}
    ],
    // 章節標題
    chapterTitles: [
      '辛氏酒店',
      '黄鹤',
      '幺妹镇龟蛇',
      '黄鹤楼飘金',
      '仙鲤遗踪'
    ],
    // 章節按鈕
    chapters: [
      '第一章',
      '第二章',
      '第三章',
      '第四章',
      '第五章'
    ],
    currentChapter: 0,
    showAI: false,
    messages: [
      {from: 'ai', text: '你好，我是文小鹤，有什么可以帮你？'}
    ],
    inputValue: ''
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
  },
  // 章節按鈕點擊
  selectChapter(e) {
    const idx = Number(e.currentTarget.dataset.index);
    this.setData({ currentChapter: idx });
  },
  // 圖片輪播滑動時同步章節
  onSwiperChange(e) {
    this.setData({ currentChapter: e.detail.current });
  },
  // 字體輪播滑動時同步章節
  onTitleSwiperChange(e) {
    this.setData({ currentChapter: e.detail.current });
  }
});