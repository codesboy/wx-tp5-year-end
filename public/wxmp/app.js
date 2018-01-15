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
                    console.log('获取用户登录凭证：' + code);

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
        code:null
    }
})  