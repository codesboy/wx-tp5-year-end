<?php
namespace app\api\controller\v1;


use app\api\validate\SendBarrage;
use app\api\validate\Upload as UploadValidate;
use think\Exception;
use think\Image;
use think\facade\Env;
use app\lib\exception\UserException;
use app\lib\exception\UploadException;
use app\lib\exception\SuccessMessage;

use app\api\model\User as UserModel;
use app\api\model\Barrage as BarrageModel;

use app\api\service\Token as TokenService;

// 用户发送弹幕接口
class Barrage{

    // 保存小程序客户端传来的用户信息
    public function send(){
        // $data = request()->param();
        $msg = request()->param('msg');//获取弹幕内容


        // $this->doUpload($file);
        // dump($re);die;
        (new SendBarrage())->docheck();

        // 根据token从缓存中查找对应uid
        // $token = $data['token'];
        /*$img_url = $this->getUploadImg();
        */
        $data = [
            'msg'=>$msg,
        ];



        // 根据uid从数据库查询用户数据，判断用户是否存在
        $uid = TokenService::getCurrentUID();
        $user = UserModel::get($uid);
        if(!$user){
            throw new UserException();
        }
        // 添加关联数据 用户-弹幕消息
        $user->barrages()->save($data);

        return json_encode(new SuccessMessage());
    }


    public function getBarrage(){
        $last_barrage=BarrageModel::get();
        $count=BarrageModel::count();
        return [
            'last_barrage'=>$last_barrage,
            'count'=>
        ]
    }

}
