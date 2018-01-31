// pages/vote/vote.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        voteShow: true,
        tmimgs:null,
        isVote:false,//是否已经投过票
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var _this = this;
        var openVote = wx.getStorageSync('openVote');
        if(openVote==1){
            this.setData({
                voteShow:false
            })
        }else{
            this.setData({
                voteShow: true
            })
        };

        // 获取所有团队图片并渲染
        wx.request({
            url: app.globalData.baseUrl +'/gettm',
            method:'POST',
            success:function(res){
                // console.log(res.data)
                // return false
                // var tmimgs = JSON.parse(res.data);
                _this.setData({
                    tmimgs:res.data
                });
                console.log(_this.data)
            }
        })
    },

    // 进行投票
    vote:function(e){
        var _this = this;
        // console.log(e)
        if (this.data.isVote || wx.getStorageSync('isVote')){
            wx.showToast({
                title: '您已经投过票了,请勿重复投票!',
                duration:3000,
                icon:'none'
            });
            return false;
        };

        wx.request({
            url: app.globalData.baseUrl+'vote',
            method:'POST',
            data:{
                tm_id: e.currentTarget.dataset.id
            },
            success:function(res){
                console.log(res.data)
                if (res.data.msg =='投票成功'){
                    _this.setData({
                        isVote: true
                    });
                    wx.setStorageSync('isVote', true)
                    wx.showToast({
                        title: '投票成功!',
                        duration: 3000
                    });
                }

            }
        })
    },

    // onHide:function(){
    //     console.log('hide');
    //     if (this.data.isVote) {
    //         this.setData({
    //             isVote:true
    //         })
    //     }
    // }
})
