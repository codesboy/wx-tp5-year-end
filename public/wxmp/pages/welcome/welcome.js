//welcome.js  
//获取应用实例  
var app = getApp();
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        tempFilePaths:null,
        per:'',//上传进度
        btnDisable:false,//submit按钮的禁用状态
    },
    onLoad: function () {
        
    },



    // 上传图片
    chooseimg:function(){
        let _this = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'],
            success: function (res) {
                // console.log(res)
                var tempFilePaths = res.tempFilePaths;
                if (tempFilePaths){
                    _this.setData({
                        tempFilePaths: res.tempFilePaths
                    });
                }else{
                    wx.showToast({
                        title: '没有得到tempFilePaths',
                    })
                }
            },
            fail:function(e){
                wx.showModal({
                    title: '错误',
                    content: e.errMsg,
                    showCancel:false
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
    userUpload: function(e){
        let _this= this;
        let token = wx.getStorageSync('token');
        // console.log(e.detail);
        // console.log(this.data);
        // console.log(app.globalData)
        const uploadTask = wx.uploadFile({
            // url: 'http://year.com/api/v1/upload/user', //后台图片上传接口
            url: app.globalData.baseUrl +'/sign', //后台图片上传签到接口
            filePath: this.data.tempFilePaths[0],
            name: 'image',
            header: {"token":token},
            success: function (res) {
                console.log(res.data)
                // console.log(typeof(res.data))
                // return false;
                var data =res.data
                // console.log(data)
                if(data){
                    _this.setData({
                        btnDisable:true,
                        tempFilePaths: ''
                    });
                    // app.globalData.avatarurl=data;
                    // 把用户头像图片文件名存到本地缓存
                    wx.setStorageSync('avatarurl', data)
                    // console.log(app.globalData)
                    wx.showToast({
                        title: '签到成功!',
                        duration:4000
                    });
                    // wx.switchTab({
                    //     url:'/pages/barrage/barrage'
                    // });
                }else{
                    wx.showModal({
                        title: '错误',
                        content: JSON.stringify(res.data),
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
        
    }


    
})  