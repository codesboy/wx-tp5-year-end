<?php
namespace app\api\validate;

class SendBarrage extends BaseValidate{
    protected $rule=[
        'msg'=>'require|isNotEmpty'
    ];


}
