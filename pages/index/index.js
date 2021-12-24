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
    // 如果没有触发triggered，仅仅是在下拉的时候挪动到外部滚动条。那还是会导致在动画的时候关闭enabled，导致增加空白空间的情况
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
