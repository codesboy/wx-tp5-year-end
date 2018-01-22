<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------


// 微信用户信息写入数据库接口 api/v1/adduser
Route::post('api/:version/adduser','api/:version.User/saveUserInfo');

// 用户上传图片接口
// Route::post('api/:version/upload','api/:version.User/saveUploadFile');


//小程序携带code得到token接口   用post是为了不让code参数在url里显示出来
Route::post('api/:version/token/user','api/:version.Token/getToken');

// 用户上传图片签到接口
Route::post('api/:version/sign','api/:version.User/sign');


// 用户发送弹幕接口
Route::post('api/:version/sendbarrage','api/:version.Barrage/send');

// 获取用户头像接口
Route::post('api/:version/getavator','api/:version.User/getAvator');
