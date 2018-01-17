<?php
namespace app\api\model;
//
class User extends Base{
    public static function getByOpenID($openid){
        $user=self::where('openid',$openid)->find();
        return $user;
    }

    // 关联弹幕模型
    public function barrages(){
        return $this->hasMany('Barrage','uid','id');
    }
}
