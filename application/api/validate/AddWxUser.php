<?php
namespace app\api\validate;

class AddWxUser extends BaseValidate{
    protected $rule=[
        'nickname'=>'require',
        'avatarurl'=>'require'
    ];


}
