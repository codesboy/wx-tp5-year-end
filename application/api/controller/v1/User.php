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

use app\api\service\Token as TokenService;

// 用户接口
class User{

    // 用户上传图片进行签到
    public function sign(){
        // $data = request()->param();


        // (new SendBarrage())->docheck();

        // 根据token从缓存中查找对应uid
        // $token = $data['token'];






        // 根据uid从数据库查询用户数据，判断用户是否存在
        $uid = TokenService::getCurrentUID();
        $user = UserModel::get($uid);
        if(!$user){
            throw new UserException();
        };

        $sign_status=$user->issign;
        // dump($user);die;
        if($sign_status==2){
            throw new UserException([
                "msg"=>"您已经签到了！"
            ]);
        };

        $img_url = $this->getUploadImg();
        if(!$img_url){
            throw new UserException([
                "msg"=>"上传图片失败"
            ]);
        };

        $data = [
            'avatarurl'=>$img_url,
            'issign'=>2
        ];
        // 更新用户数据
        $user->save($data);

        $avatarurl=$user->avatarurl;
        return $avatarurl;

        // return json_encode(new SuccessMessage());

    }

    private function getUploadImg(){
        // 获取表单上传文件
        $file = request()->file('image');
        // dump($file);die;
        // $num=request()->param('num');
        // dump($_FILES);die;
        // dump($file);die;
        if(!$file){
            throw new UploadException([
                'code'=>0,
                'msg'=>'没有选择图片或者图片超过post_max_size、upload_max_filesize大小'
            ]);
        };

        $validate=new UploadValidate();
        // 针对getimagesize(): Read error!异常
        try {
            // 上传文件验证
            $result=$validate->check(['file' => $file]);
        } catch (\Exception $e) {
            throw new UploadException([
                'code'=>0,
                'msg'=>$e->getMessage()
            ]);
        }

        // 验证不通过
        if(true !== $result){
            // dump(UploadException);die;
            throw new UploadException([
                // 'msg'=>$this->error($result);
                'code'=>0,
                'msg'=>$validate->getError()
            ]);
        }

        $image = Image::open($file);
        // 图片压缩处理
        $image->thumb(300, 300, Image::THUMB_CENTER);

        // 唯一文件名 微妙md5加密
        $saveName = md5(uniqid(microtime(true),true)) . '.' . $image->type();
        // 保存图片
        $root_path=Env::get('root_path');
        // dump($root_path);die;
        $image->save($root_path . 'public/uploads/' . $saveName);
        if(empty($image)){
            return;
        }
        return $saveName;

    }

    public function getAvator(){
        $uid = TokenService::getCurrentUID();
        // return $uid;die;
        $user = UserModel::get($uid);
        $avatarurl = $user->avatarurl;
        return $avatarurl;
    }
}
