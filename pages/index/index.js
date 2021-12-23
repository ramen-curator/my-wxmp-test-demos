const data = new Array(10).fill(null).map((v, i, a) => (a[i] = i));

const fakeAPI = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(data);
    }, 1000);
  });
};

Page({
  data: {
    dataList: [],
    enabled: false,
    isFirstRender: true,
    triggered: true,
  },
  onLoad() {
    fakeAPI().then((res) =>
      this.setData({ dataList: res }, () => {
        this.setData({ enabled: true });
      })
    );
  },
  onPageScroll(e) {
    this.setData({ enabled: e.scrollTop <= 0 });
  },
  onRefresherRefresh() {
    this.setData({ triggered: true }, () => {
      fakeAPI().finally(() => {
        this.setData({ triggered: false });
      });
    });
  },
});
