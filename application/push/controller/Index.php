<?php
namespace app\push\controller;
use think\Controller;

class Index extends Controller {

    function index(){
        return $this->fetch();
    }
}
