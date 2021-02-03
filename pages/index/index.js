// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    mybless: '春节快乐！愿你福禄财神紧拥抱，事业顺心顺意！工作顺顺利利！爱情甜甜蜜蜜！滚滚财源广进！',
    showCanvas: false,
    // 二维码
    codeImg: "../../img/codeImg.png",
    bgList: [
      'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-0c03b75a-8139-4654-83b3-f12d36df4bbe/870bcc2a-c405-48e7-9ab2-6092cfa5a1ed.jpg',
      'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-0c03b75a-8139-4654-83b3-f12d36df4bbe/305acc3e-b16c-4bd5-994e-86c051021f8a.jpg',
      'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-0c03b75a-8139-4654-83b3-f12d36df4bbe/ebde0372-be48-4aeb-afc5-40e26937701d.png',
      'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-0c03b75a-8139-4654-83b3-f12d36df4bbe/e94fa668-5738-4dc9-a1b6-dba3b26299a7.png'
    ],
    Allbless: [{
        lable: '春节快乐！愿你福禄财神紧拥抱，事业顺心顺意！工作顺顺利利！爱情甜甜蜜蜜！滚滚财源广进！'
      },
      {
        lable: '志在哪里，哪里就有成功；心在哪里，哪里就有风景；爱在哪里，哪里就有感动。在新年来临之际，衷心祝愿春节快乐，心想事成！'
      },
      {
        lable: '新春佳节到，向你问个好；身体倍健康，心情特别好；好运天天交，口味顿顿妙；家里出黄金，墙上长钞票。'
      },
      {
        lable: '一切的美好源于真挚和坦诚，虽然岁月不会轮回，天真不再重现，一份真诚的祝福，会让你快乐每一天！'
      },

    ],
    cardbg: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-0c03b75a-8139-4654-83b3-f12d36df4bbe/e94fa668-5738-4dc9-a1b6-dba3b26299a7.png",
    // 用户头像
    headImg: null,
    showAllBg: false,
    choiceText: false,
    useMybless: false,
  },
  // 事件处理函数
  bindViewTap() {

  },
  onLoad() {
    this.getUserInfo();
  },
  // 获取用户信息
  getUserInfo() {
    let that = this;
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        that.userInfo = res.userInfo;
        that.data.userInfo = res.userInfo;
        that.data.hasUserInfo = true;
        that.setData({
          hasUserInfo: that.data.hasUserInfo,
        })
        // 下载头像
        wx.downloadFile({
          url: res.userInfo.avatarUrl,
          success: function (res) {
            wx.hideLoading();
            if (res.statusCode === 200) {
              that.data.headImg = res.tempFilePath;
              that.setData({
                headImg: that.data.headImg,
                userInfo: that.data.userInfo
              })
              // that.getCanvas(that.data.cardbg, that.data.codeImg, res.tempFilePath);
            }
          }
        })

      }
    }, )
  },
  // 查看全部背景
  getAllBg() {
    this.data.choiceText = false;
    this.data.showAllBg = !this.data.showAllBg;
    this.setData({
      choiceText: this.data.choiceText,
      showAllBg: this.data.showAllBg
    })
  },

  // 查看全部祝福语
  getText() {
    this.data.showAllBg = false
    this.data.choiceText = !this.data.choiceText;
    this.setData({
      choiceText: this.data.choiceText,
      showAllBg: this.data.showAllBg
    })
  },
  // 选择祝福语
  radioChange(e) {
    if (e.detail.value !=0) {
      this.data.mybless = e.detail.value
      this.data.useMybless = false
    }else{
      this.data.useMybless = true
    }
    this.setData({
      useMybless:this.data.useMybless,
      mybless:this.data.mybless
    })
  },
  // 更改背景
  changeBg(e) {
    let bg = e.currentTarget.dataset['bg'];
    this.data.cardbg = bg;
    this.setData({
      cardbg: this.data.cardbg
    })
  },
  /**
   * 开始用canvas绘制分享海报
   * @param cardbg 下载的海报背景图路径
   * @param codeImg   下载的二维码图片路径
   */
  getCanvas: function (cardbgurl, codeImg, headImg) {
    let cardbg;
    // 下载背景
    wx.downloadFile({
      url: cardbgurl,
      success: function (res) {
        wx.hideLoading();
        if (res.statusCode === 200) {
          cardbg = res.tempFilePath;
        }
      }
    })

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

      // 内容
      ctx.setFontSize(15);
      ctx.setFillStyle('#000');
      ctx.setTextAlign('left');
      ctx.fillText("前端/小程序开发前端/小程序开发前端/小程序开发前端/小程序开发前端/小程序开发前端/小程序开发微信号:qq287534291", 35 * rpx, 415 * rpx, 100 * rpx, 100 * rpx); //姓名


      //  绘制二维码
      console.log(codeImg)
      if (codeImg) {
        ctx.drawImage(codeImg, 165 * rpx, 320 * rpx, 100 * rpx, 100 * rpx)
      }

      // 姓名
      ctx.setFontSize(14);
      ctx.setFillStyle('#000');
      ctx.setTextAlign('left');
      ctx.fillText(that.userInfo.nickName, 35 * rpx, 355 * rpx, 100 * rpx, 100 * rpx); //姓名

      //头像
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