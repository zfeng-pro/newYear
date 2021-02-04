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
      'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-0c03b75a-8139-4654-83b3-f12d36df4bbe/60245817-e08f-4cc1-8bfd-1fa1c2cfd6b6.jpg',
      'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-0c03b75a-8139-4654-83b3-f12d36df4bbe/44a3fea1-48c5-473b-8966-38bf8f00a558.jpg',
      'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-0c03b75a-8139-4654-83b3-f12d36df4bbe/85c45fa6-602b-4df1-9746-3275e4e4d99a.jpg',
      'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-0c03b75a-8139-4654-83b3-f12d36df4bbe/291a6d8d-3fc1-4da8-84c2-cba250896daa.jpg',
      'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-0c03b75a-8139-4654-83b3-f12d36df4bbe/d504af52-5015-4f55-87b2-3e2aeb37abd9.jpg',
      'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-0c03b75a-8139-4654-83b3-f12d36df4bbe/de613ad0-3659-46b0-aa2e-327a95987e12.jpg'
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
    cardbg: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-0c03b75a-8139-4654-83b3-f12d36df4bbe/de613ad0-3659-46b0-aa2e-327a95987e12.jpg",
    // 用户头像
    headImg: null,
    showAllBg: false,
    choiceText: false,
    useMybless: false,
    focus: true,
    myblessLength: '0',
    carImg: '',
    shareImage:false,
    Canvas:false,
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
    if (e.detail.value != 0) {
      this.data.mybless = e.detail.value
      this.data.useMybless = false
    } else {
      this.data.useMybless = true
    }
    this.data.myblessLength = this.data.mybless.length;
    this.setData({
      useMybless: this.data.useMybless,
      mybless: this.data.mybless,
      myblessLength: this.data.myblessLength
    })
  },

  // 获取自定义祝福语及长度
  getmyblessLength(e) {
    this.data.mybless = e.detail.value;
    this.data.myblessLength = e.detail.value.length;
    this.setData({
      mybless: this.data.mybless,
      myblessLength: this.data.myblessLength,
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
  // 预览或分享
  previewImage() {
    this.data.showAllBg = false
    this.data.choiceText = false
    this.data.Canvas = true;
    this.setData({
      Canvas: this.data.Canvas,
      choiceText: this.data.choiceText,
      showAllBg: this.data.showAllBg
    })
    this.showImage(true)
  },
  shareMyImage() {
    this.data.showAllBg = false
    this.data.choiceText = false
    this.data.Canvas = true;
    this.setData({
      Canvas: this.data.Canvas,
      choiceText: this.data.choiceText,
      showAllBg: this.data.showAllBg
    })
    this.showImage(false)
  },
  // 下载背景
  showImage(previewOrsave) {
    let imgdata = this.data;
    let that = this;
    wx.downloadFile({
      url: imgdata.cardbg,
      success: function (res) {
        wx.hideLoading();
        if (res.statusCode === 200) {
          let bgImg = res.tempFilePath;
          that.getCanvas(bgImg, imgdata.codeImg, imgdata.headImg, previewOrsave);
        }
      }
    })
  },

  /**
   * 开始用canvas绘制分享海报
   */
  getCanvas: function (cardbg, codeImg, headImg, previewOrsave) {
    wx.showLoading({
      title: '正在生成中...',
      mask: true,
    })
    let that = this;
    let ctx = wx.createCanvasContext('myCanvas'); //创建画布
    ctx.draw()
    wx.createSelectorQuery().select('#canvas-container').boundingClientRect(function (rect) {
      ctx.setFillStyle('#fff');
      ctx.fillRect(0, 0, 1500, 2668);
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
        ctx.drawImage(cardbg, 0, 0, 375 * rpx, 667 * rpx);
      }

      // 内容
      let txtHeight = 225;
      let contentTxt = that.data.mybless;
      let num = Math.ceil(contentTxt.length / 13);
      ctx.setFontSize(15);
      ctx.setFillStyle('#4F0000');
      ctx.setTextAlign('left');
      for (let i = 0; i < num; i++) {
        let star = i * 13;
        let end = (i + 1) * 13;
        if (end <= contentTxt.length) {
          let txt = contentTxt.slice(star, end)
          ctx.fillText(txt, 75 * rpx, (txtHeight + i * 35) * rpx, 250 * rpx, 40 * rpx);
        } else {
          let txt = contentTxt.slice(star)
          ctx.fillText(txt, 75 * rpx, (txtHeight + i * 35) * rpx, 250 * rpx, 40 * rpx);
        }
      }


      //  绘制二维码
      if (codeImg) {
        ctx.drawImage(codeImg, 300 * rpx, 570 * rpx, 60 * rpx, 60 * rpx)
      }

      // 姓名
      ctx.setFontSize(14);
      ctx.setFillStyle('#4F0000');
      ctx.setTextAlign('left');
      ctx.fillText(that.userInfo.nickName, 145 * rpx, 170 * rpx, 80 * rpx, 60 * rpx); //姓名

      //头像
      let avatarurl_width = 40, //绘制的头像宽度
        avatarurl_heigth = 40, //绘制的头像高度
        avatarurl_x = 80, //绘制的头像在画布上的位置
        avatarurl_y = 120; //绘制的头像在画布上的位置

      ctx.save(); // 先保存状态 已便于画完圆再用
      ctx.beginPath(); //开始绘制
      //先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
      ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);
      ctx.clip(); //画了圆 再剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
      ctx.drawImage(headImg, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth); // 推进去图片
    }).exec()

    setTimeout(function () {
      ctx.draw(false, function () {
        wx.canvasToTempFilePath({
          canvasId: 'myCanvas',
          success: function (res) {
            wx.hideLoading();
            that.data.carImg = res.tempFilePath;
            that.data.Canvas = false;
            that.setData({
              carImg: that.data.carImg,
              Canvas: that.data.Canvas
            })
            if (previewOrsave) {
              that.showPreview()
            }else{
              that.showShare()
            }
          },
        });
      });
    }, 500)
  },
  // 展示预览
  showPreview() {
    let that = this;
    setTimeout(function () {
      that.data.showCanvas = true;
      that.setData({
        showCanvas: that.data.showCanvas
      })
    }, 500)
  },
  // 关闭预览
  closePreview(){
    this.data.showCanvas = false;
    this.setData({
      showCanvas: this.data.showCanvas
    })
  },
  showShare(){
    let that = this;
    wx.showShareImageMenu({
      path:this.data.carImg,
      complete:res=>{
        if(that.data.showCanvas == true){
          that.data.showCanvas = false;
          that.setData({
            showCanvas: this.data.showCanvas
          })
        }
      }
    })
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