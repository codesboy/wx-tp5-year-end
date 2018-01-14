<?php
namespace app\api\controller\v1;

// use think\Controller;
// use think\Db;
// use think\Validate;
use app\api\validate\IdPositiveInt;
use think\Exception;
use app\lib\exception\BannerMissException;

use app\api\model\User as UserModel;

// 用户接口
class User{

    // 保存小程序客户端传来的用户信息
    public function saveUserInfo(){
        return "sa";
    }

}
