// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    currentIndex: 0,
    showAI: false,
    inputValue: '',
    messages: [
      { from: 'ai', text: '你好，我是文小鹤，有什么可以帮你？' }
    ],
    bookList: [
      { title: '辛氏酒店', img: '/assets/book1.png' },
      { title: '黄鹤', img: '/assets/book2.png' },
      { title: '幺妹镇龟蛇', img: '/assets/book3.png' },
      { title: '黄鹤楼飘金', img: '/assets/book4.png' },
      { title: '仙鲤遗踪', img: '/assets/book5.png' }
    ],
    scrollTo: ''
  },
  selectBook(e) {
    this.setData({ currentIndex: e.currentTarget.dataset.index });
  },
  prevBook() {
    let idx = this.data.currentIndex - 1;
    if (idx < 0) idx = this.data.bookList.length - 1;
    this.setData({ currentIndex: idx });
  },
  nextBook() {
    let idx = this.data.currentIndex + 1;
    if (idx >= this.data.bookList.length) idx = 0;
    this.setData({ currentIndex: idx });
  },
  showAIChat() {
    this.setData({ showAI: true }, this.scrollToBottom);
  },
  hideAIChat() {
    this.setData({ showAI: false });
  },
  stopTap() {
    // 阻止冒泡，防止点击对话框本身关闭
  },
  onInput(e) {
    this.setData({ inputValue: e.detail.value });
  },
  sendMsg() {
    const val = this.data.inputValue.trim();
    if (!val) return;
    const newMsgs = this.data.messages.concat([{ from: 'user', text: val }]);
    this.setData({
      messages: newMsgs,
      inputValue: ''
    }, this.scrollToBottom);
    // 模拟AI回复
    setTimeout(() => {
      this.setData({
        messages: this.data.messages.concat([{ from: 'ai', text: '收到：' + val }])
      }, this.scrollToBottom);
    }, 600);
  },
  scrollToBottom() {
    this.setData({ scrollTo: 'msgBottom' });
  }
})
