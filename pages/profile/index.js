Page({
  data: {
    avatarUrl: '/assets/avatar1.png',
    nickname: '文小鶴',
    desc: '熱愛繪本創作與收藏，歡迎交流！',
    historyBooks: ['/assets/book1.png','/assets/book2.png','/assets/book3.png'],
    tabs: ['我的徽章', '我的收藏', '我的作品'],
    currentTab: 0,
    badges: [
      {id: 1, img: '/assets/badge1.png', name: '優秀創作者', time: '2024-05-01'},
      {id: 2, img: '/assets/badge2.png', name: '活躍用戶', time: '2024-04-20'}
    ],
    collections: [
      {id: 1, img: '/assets/collect1.png', name: '收藏作品A', time: '2024-05-10'},
      {id: 2, img: '/assets/collect2.png', name: '收藏作品B', time: '2024-05-12'}
    ],
    works: [
      {id: 1, img: '/assets/work1.png', name: '我的作品1', time: '2024-05-15'},
      {id: 2, img: '/assets/work2.png', name: '我的作品2', time: '2024-05-16'}
    ],
    showPreview: false,
    previewImg: '',
    previewName: '',
    previewTime: ''
  },
  switchTab(e) {
    this.setData({ currentTab: e.currentTarget.dataset.index });
  },
  viewImage(e) {
    this.setData({
      showPreview: true,
      previewImg: e.currentTarget.dataset.img,
      previewName: e.currentTarget.dataset.name,
      previewTime: e.currentTarget.dataset.time
    });
  },
  closePreview() {
    this.setData({ showPreview: false });
  },
  stopTap() {}
});