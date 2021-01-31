// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    codeimg: "",
    // 默认虚拟数据
    cardBase: {
      //需要https图片路径,下载到本地然后去绘制
      cardbg: "../../img/viewBg.png",
      // 二维码
      codeImg: "https://7265-redux-32ab9a-1259022487.tcb.qcloud.la/image/111.png",
      // 用户头像
      headImg:null
    }
  },
  // 事件处理函数
  bindViewTap() {

  },
  onLoad() {
    let that = this;
    let cardBase = that.data.cardBase;
    // 在没有 open-type=getUserInfo 版本的兼容处理
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        that.userInfo = res.userInfo;
        console.log(that.userInfo)
        wx.downloadFile({
          url:  that.userInfo.avatarUrl,
          success: function(res) {
            wx.hideLoading();
            if (res.statusCode === 200) {
              that.headImg = res.tempFilePath;
              that.getCanvas(cardBase.cardbg, cardBase.codeImg, headImg);
            }
          }
        })
        
      }
    })
  },

  /**
   * 开始用canvas绘制分享海报
   * @param cardbg 下载的海报背景图路径
   * @param codeImg   下载的二维码图片路径
   */
  getCanvas: function (cardbg, codeImg, headImg) {
    wx.showLoading({
      title: '正在生成中...',
      mask: true,
    })
    let that = this;
    let cardBase = that.data.cardBase; //需要绘制的数据集合
    const ctx = wx.createCanvasContext('myCanvas'); //创建画布
    let width = "";
    wx.createSelectorQuery().select('#canvas-container').boundingClientRect(function (rect) {
      let height = rect.height;
      let right = rect.right;
      width = rect.width * 0.8;
      let left = rect.left + 5;
      ctx.setFillStyle('#fff');
      ctx.fillRect(0, 0, rect.width, height);
      // 这里处理自适应
      let rpx = 1;
      wx.getSystemInfo({
        success(res) {
          rpx = res.windowWidth / 375;
        },
      })

      ctx.fillStyle = "#BC4B48"; //填充实体颜色
      //背景图
      if (cardbg) {
        ctx.drawImage(cardbg, -2 * rpx, -4 * rpx, 379 * rpx, 706 * rpx);
      }
      // 标题
      ctx.setFontSize(14);
      ctx.setFillStyle('#000');
      ctx.setTextAlign('left');
      ctx.fillText(that.userInfo.nickName, 35 * rpx, 355 * rpx, 100 * rpx, 100 * rpx); //姓名
      console.log(headImg)
     
      // ctx.drawImage(headImg, 50 * rpx, 220 * rpx, 20 * rpx, 20 * rpx);//头像
      let avatarurl_width = 60, //绘制的头像宽度
        avatarurl_heigth = 60, //绘制的头像高度
        avatarurl_x = 28, //绘制的头像在画布上的位置
        avatarurl_y = 36; //绘制的头像在画布上的位置

      ctx.save(); // 先保存状态 已便于画完圆再用
      ctx.beginPath(); //开始绘制
      //先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
      ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);
      ctx.clip(); //画了圆 再剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
      ctx.drawImage(headImg, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth); // 推进去图片
      // 标题
      ctx.setFontSize(15);
      ctx.setFillStyle('#000');
      ctx.setTextAlign('left');
      ctx.fillText("前端/小程序开发", 35 * rpx, 385 * rpx, 100 * rpx, 100 * rpx); //姓名
      // 标题
      ctx.setFontSize(15);
      ctx.setFillStyle('#000');
      ctx.setTextAlign('left');
      ctx.fillText("微信号:qq287534291", 35 * rpx, 415 * rpx, 100 * rpx, 100 * rpx); //姓名
      //  绘制二维码
      if (codeImg) {
        ctx.drawImage(codeImg, 165 * rpx, 320 * rpx, 100 * rpx, 100 * rpx)
      }
    }).exec()

    setTimeout(function () {
      ctx.draw();
      wx.hideLoading();
    }, 1000)

  },


  //点击保存到相册
  saveShareImg: function () {
    let that = this;
    wx.showLoading({
      title: '正在保存',
      mask: true,
    })
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function (res) {
          console.info("res", res);
          wx.hideLoading();
          let tempFilePath = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              console.info(res);
              wx.showModal({
                content: '图片已保存到相册，赶紧晒一下吧~',
                showCancel: false,
                confirmText: '好的',
                confirmColor: '#333',
                success: function (res) {
                  if (res.confirm) {}
                },
                fail: function (res) {}
              })
            },
            fail: function (res) {
              console.log(res)
              if (res.errMsg === "saveImageToPhotosAlbum:fail:auth denied") {
                console.log("打开设置窗口");
                wx.openSetting({
                  success(settingdata) {
                    console.log(settingdata)
                    if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                      console.log("获取权限成功，再次点击图片保存到相册")
                    } else {
                      console.log("获取权限失败")
                    }
                  }
                })
              }
            }
          })
        }
      });
    }, 1000);
  },

})