Page({
  data: {
    detail: {
      cover: '',
      title: '',
      desc: ''
    }
  },
  onLoad(options) {
    // 简单写死两条数据
    const details = {
      1: {
        cover: '/assets/treasure1.png',
        title: '青铜器·兽面纹鼎',
        desc: '西周时期青铜器，造型庄重，纹饰精美，是中国古代青铜文化的代表之一。'
      },
      2: {
        cover: '/assets/treasure2.png',
        title: '唐三彩骆驼',
        desc: '唐代三彩陶器，色彩斑斓，造型生动，展现了丝绸之路的繁荣景象。'
      }
    };
    const id = options.id || 1;
    this.setData({ detail: details[id] || details[1] });
  },
  onBack() {
    wx.navigateBack();
  }
});