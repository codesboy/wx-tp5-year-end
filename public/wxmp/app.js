//app.js  
App({
    onLaunch: function () {
        //调用登录接口  
        wx.login({
            success: res => {
                let code = res.code;
                if (code) {
                    let _this = this;
                    _this.globalData.code=code;
                    // console.log('获取用户登录凭证：' + code);
                    wx.request({
                        // url: 'http://year.com/api/v1/token/user',
                        url: _this.globalData.baseUrl+'token/user',
                        data:{code:code},
                        method:'POST',
                        success:res=>{
                            _this.globalData.token = res.data.token;
                            // console.log(_this.globalData.token)
                        },
                        fail:function(e){
                            wx.showModal({
                                title: '错误',
                                content: e.errMsg,
                            })
                        }
                    })
                } else {
                    wx.showModal({
                        title: '错误',
                        content: '获取用户登录态失败：' + res.errMsg,
                    })
                }
            }
        });
    },
    globalData:{
        code:null,
        token:null,
        avatarurl:null,
        // baseUrl:'https://me.rehack.cn/api/v1/'
        baseUrl: 'http://year.com/api/v1/'
    }
})  