Component({
  data: {
    selected: 0,
    tabList: [
      {
        pagePath: "/pages/index/index",
        iconPath: "/assets/tab1.png",
        selectedIconPath: "/assets/tab1.png",
        text: "绘梦阁"
      },
      {
        pagePath: "/pages/collection/index",
        iconPath: "/assets/tab2.png",
        selectedIconPath: "/assets/tab2.png",
        text: "珍萃轩"
      },
      {
        pagePath: "/pages/community/index",
        iconPath: "/assets/tab3.png",
        selectedIconPath: "/assets/tab3.png",
        text: "乐创集"
      },
      {
        pagePath: "/pages/profile/index",
        iconPath: "/assets/tab4.png",
        selectedIconPath: "/assets/tab4.png",
        text: "画韵册"
      }
    ]
  },
  attached() {
    this.updateSelected();
  },
  methods: {
    switchTab(e) {
      const idx = e.currentTarget.dataset.index;
      const path = this.data.tabList[idx].pagePath;
      if (getCurrentPages()[0].route !== path.replace(/^\//, "")) {
        wx.switchTab({ url: path });
      }
      this.setData({ selected: idx });
    },
    updateSelected() {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1].route;
      const idx = this.data.tabList.findIndex(tab => tab.pagePath.replace(/^\//, "") === currentPage);
      if (idx !== -1) {
        this.setData({ selected: idx });
      }
    }
  }
});