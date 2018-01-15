<?php
namespace app\api\controller\v1;


use app\api\validate\AddWxUser;
use think\Exception;
use app\lib\exception\BannerMissException;

use app\api\model\User as UserModel;

// 用户接口
class User{

    // 保存小程序客户端传来的用户信息
    public function saveUserInfo(){
        (new AddWxUser())->docheck();
        $user = new UserModel();
        dump(request()->param());
        // return 1;
    }

}
