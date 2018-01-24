// pages/dev.js
var app = getApp();
var array = [];
Page({

    /**
     * 页面的初始数据
     */
    data: {
        psw:'周',
        notadmin:true,
        tempFilePaths: null,
        per: '',//上传进度
        btnDisable: false,//submit按钮的禁用状态
        imgs: []
    },
    
    // 密码校验
    bindBlur: function (e) {
        // var _this = this;
        // console.log(e.detail.value)
        if (e.detail.value==this.data.psw){
            this.setData({
                notadmin:false
            })
        }
    },


    // 上传图片
    chooseimg: function () {
        let _this = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'],
            success: function (res) {
                // console.log(res)
                var tempFilePaths = res.tempFilePaths;
                if (tempFilePaths) {
                    _this.setData({
                        tempFilePaths: res.tempFilePaths
                    });
                } else {
                    wx.showToast({
                        title: '没有得到tempFilePaths',
                    })
                }
            },
            fail: function (e) {
                wx.showModal({
                    title: '错误',
                    content: e.errMsg,
                    showCancel: false
                })
            }
        });
    },
    previewImage: function (e) {
        var that = this;
        var dataid = e.currentTarget.dataset.id;
        var imageList = that.data.imageList;
        wx.previewImage({
            current: imageList[dataid],
            urls: this.data.imageList
        });
    },
    teamUpload: function (e) {
        let _this = this;
        // let token = wx.getStorageSync('token');
        // console.log(e.detail);
        // console.log(this.data);
        // console.log(app.globalData)
        const uploadTask = wx.uploadFile({
            url: app.globalData.baseUrl + '/upteamimg', 
            filePath: this.data.tempFilePaths[0],
            name: 'image',
            // header: { "token": token },
            success: function (res) {
                // console.log(res.data)
                // return false
                var data = JSON.parse(res.data);
                console.log(data);
                // console.log(data)
                if (data.msg == '团队照上传成功') {
                    // var arr_imgs=_this.data.imgs.push(data.img);
                    array.push(data.img);
                    console.log(_this.data.imgs)
                    _this.setData({
                        // btnDisable: true,
                        tempFilePaths: '',
                        per:0,
                        imgs:array
                    });
                    console.log(_this.data.imgs)
                    // app.globalData.avatarurl=data;
                    // 把用户头像图片文件名存到本地缓存
                    // wx.setStorageSync('avatarurl', data.avatarurl);
                    // console.log(app.globalData)
                    wx.showToast({
                        title: '团队照上传成功',
                        duration: 3000
                    });
                    // wx.switchTab({
                    //     url:'/pages/barrage/barrage'
                    // });
                } else {
                    wx.showModal({
                        title: '错误',
                        content: res.data,
                        showCancel: false
                    })
                }
            },
            fail: function (e) {
                wx.showModal({
                    title: '错误',
                    content: e.errMsg,
                    showCancel: false
                })
            }
        });
        uploadTask.onProgressUpdate((res) => {
            this.setData({
                per: res.progress
            })
            // console.log('上传进度', res.progress)
            // console.log('已经上传的数据长度', res.totalBytesSent)
            // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
        })

    },

    // 开启投票功能
    openVote:function(){
        wx.setStorageSync('openVote', 1)
    },

    // 结束投票
    closeVote:function(){
        wx.setStorageSync('openVote', 2)
    }


})