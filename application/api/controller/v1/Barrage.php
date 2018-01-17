<?php
namespace app\api\controller\v1;


use app\api\validate\SendBarrage;
use app\api\validate\Upload as UploadValidate;
// use think\Exception;
use \think\Image;
use app\lib\exception\UserException;
use app\lib\exception\UploadException;
use app\lib\exception\SuccessMessage;

use app\api\model\User as UserModel;

use app\api\service\Token as TokenService;

// 用户发送弹幕接口
class Barrage{

    // 保存小程序客户端传来的用户信息
    public function upload(){
        $data = request()->param();
        $msg = request()->param('msg');//获取弹幕内容


        // $this->doUpload($file);
        // dump($re);die;
        (new SendBarrage())->docheck();

        // 根据token从缓存中查找对应uid
        // $token = $data['token'];
        $img_url = $this->getUploadImg();

        $data = [
            'msg'=>$msg,
            'img_url'=>$img_url
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

    private function getUploadImg(){
        // 获取表单上传文件

        $file = request()->file('image');
        // $num=request()->param('num');
        // dump($_FILES);die;
        // dump($file);die;
        if(!$file){
            throw new UploadException([
                'code'=>0,
                'msg'=>'没有选择图片或者图片超过post_max_size大小'
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
        $image->thumb(800, 800, Image::THUMB_CENTER);

        // 唯一文件名 微妙md5加密
        $saveName = md5(uniqid(microtime(true),true)) . '.' . $image->type();
        // 保存图片
        $image->save(ROOT_PATH . 'public/uploads/' . $saveName);
        if(empty($image)){
            return;
        }

        $arr=[];
        // $arr['sign_num']=$num;
        $arr['img_url']=$saveName;
        return $arr;

    }


    private function saveUploadFile($user){
        // dump(UploadException);die;
        $data=$this->doUpload();
        if(!empty($data)){
            $res = $user->barrages()->save($data);
            if(!$res){
                throw new UploadException([
                    'msg'=>'上传失败',
                    'code'=>400,
                    'errorCode'=>6000
                ]);
            }else{
                // dump(UploadException);die;
                throw new UploadException([
                    'msg'=>'上传成功',
                    'code'=>200,
                    'errorCode'=>0
                ]);

            }
        }
    }

}
