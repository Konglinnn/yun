Page({
  data: {
    bookCovers: [
      {img: '/assets/book1.png'},
      {img: '/assets/book2.png'},
      {img: '/assets/book3.png'},
      {img: '/assets/book4.png'},
      {img: '/assets/book5.png'}
    ],
    // 章节标题
    chapterTitles: [
      '辛氏酒店',
      '黄鹤',
      '幺妹镇龟蛇',
      '黄鹤楼飘金',
      '仙鲤遗踪'
    ],
    // 章节按钮
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
    inputValue: '',
    scrollTo: 'msgBottom'
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
    const newMessages = messages.concat([{from: 'user', text: inputValue}]);
    this.setData({ messages: newMessages, inputValue: '', scrollTo: 'msgBottom' }, () => {
      // 滚动到底部
      this.setData({ scrollTo: 'msgBottom' });
    });
    setTimeout(() => {
      const aiMessages = this.data.messages.concat([{from: 'ai', text: '这是AI的回复：' + inputValue}]);
      this.setData({ messages: aiMessages, scrollTo: 'msgBottom' }, () => {
        this.setData({ scrollTo: 'msgBottom' });
      });
    }, 800);
  },
  // 章节按钮点击
  selectChapter(e) {
    const idx = Number(e.currentTarget.dataset.index);
    this.setData({ currentChapter: idx });
  },
  // 图片轮播滑动时同步章节
  onSwiperChange(e) {
    this.setData({ currentChapter: e.detail.current });
  },
  // 字体轮播滑动时同步章节
  onTitleSwiperChange(e) {
    this.setData({ currentChapter: e.detail.current });
  }
});