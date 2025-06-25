Page({
  data: {
    currentIndex: 0,
    showAI: false,
    bookList: [
      { title: '辛氏酒店', img: '/assets/book1.png' },
      { title: '黄鹤', img: '/assets/book2.png' },
      { title: '幺妹镇龟蛇', img: '/assets/book3.png' },
      { title: '黄鹤楼飘金', img: '/assets/book4.png' },
      { title: '仙鲤遗踪', img: '/assets/book5.png' }
    ]
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
    this.setData({ showAI: true });
  },
  hideAIChat() {
    this.setData({ showAI: false });
  },
  stopTap() {
    // 阻止冒泡，防止点击对话框本身关闭
  }
}); 