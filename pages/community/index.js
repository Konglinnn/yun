Page({
  data: {
    tabs: ['热门', '最新', '评论', '收藏'],
    currentTab: 0,
    bannerIndex: 0,
    banners: [
      { id: 1, image: '/assets/banner1.png', slogan: '今日热门', desc: '发现今日最受欢迎的话题与创作，快来参与讨论，与大家一起交流灵感！' },
      { id: 2, image: '/assets/banner2.png', slogan: '讨论专题', desc: '本周专题讨论区，聚焦艺术与设计的深度话题，欢迎发表你的见解。' },
      { id: 3, image: '/assets/banner3.png', slogan: '排行榜', desc: '浏览本周人气排行榜，看看哪些作品和话题最受大家喜爱！' }
    ],
    posts: [
      {
        id: 1,
        avatar: '/assets/avatar1.png',
        nickname: '艺术家小王',
        time: '10分钟前',
        image: '/assets/post1.png',
        title: '传统工艺与现代设计的完美融合',
        desc: '这件作品采用了传统的剪纸工艺，结合现代设计理念，展现出独特的艺术魅力...',
        likes: 128,
        comments: 32,
        collects: 45,
        isLiked: false,
        isCollected: false
      },
      {
        id: 2,
        avatar: '/assets/avatar2.png',
        nickname: '创意达人',
        time: '2小时前',
        image: '/assets/post2.png',
        title: '水墨丹青新诠释',
        desc: '用现代视角重新诠释传统水墨画，让古老艺术焕发新生命...',
        likes: 256,
        comments: 48,
        collects: 67,
        isLiked: true,
        isCollected: true
      },
      {
        id: 3,
        avatar: '/assets/avatar1.png',
        nickname: '艺术家小王',
        time: '10分钟前',
        image: '/assets/post1.png',
        title: '传统工艺与现代设计的完美融合',
        desc: '这件作品采用了传统的剪纸工艺，结合现代设计理念，展现出独特的艺术魅力...',
        likes: 128,
        comments: 32,
        collects: 45,
        isLiked: false,
        isCollected: false
      }
    ],
    scrollTop: 0
  },

  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ currentTab: index });
    // 切换数据加载
  },

  onScan() {
    wx.scanCode({
      success: (res) => {
        console.log(res);
        wx.showToast({ title: '扫码成功', icon: 'success' });
      },
      fail: () => {
        wx.showToast({ title: '扫码失败', icon: 'error' });
      }
    });
  },

  showMenu() {
    wx.showActionSheet({
      itemList: ['分享', '举报', '设置'],
      success: (res) => {
        console.log(res.tapIndex);
      }
    });
  },

  toggleLike(e) {
    const id = e.currentTarget.dataset.id;
    const posts = this.data.posts;
    const post = posts.find(item => item.id === id);
    if (post) {
      post.isLiked = !post.isLiked;
      post.likes += post.isLiked ? 1 : -1;
      this.setData({ posts });
    }
  },

  toggleCollect(e) {
    const id = e.currentTarget.dataset.id;
    const posts = this.data.posts;
    const post = posts.find(item => item.id === id);
    if (post) {
      post.isCollected = !post.isCollected;
      post.collects += post.isCollected ? 1 : -1;
      this.setData({ posts });
    }
  },

  goComment(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/community/comment?id=${id}`
    });
  },

  viewImage(e) {
    const url = e.currentTarget.dataset.url;
    wx.previewImage({
      urls: [url],
      current: url
    });
  },

  onRefresh() {
    // 下拉刷新
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 1000);
  },

  bannerSwiperChange(e) {
    this.setData({ bannerIndex: e.detail.current });
  },

  onScrollToLower() {
    this.setData({ scrollTop: 0 });
  }
});