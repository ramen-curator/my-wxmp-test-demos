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
    top:0,
  },
  onLoad() {
    fakeAPI().then((res) =>
      this.setData({ dataList: res }, () => {
        this.setData({ enabled: true });
      })
    );
  },
  onPageScroll(e) {
    this.setData({top:e.scrollTop})
    if(this.data.triggered)return;
    this.setData({ enabled: e.scrollTop <= 0 });
  },
  onRefresherRefresh() {
    this.setData({ triggered: true }, () => {
      fakeAPI().finally(() => {
        this.setData({ triggered: false },()=>{
          if(this.data.top>0){
            this.setData({enabled:false})
          }
        });
      });
    });
  },
});
