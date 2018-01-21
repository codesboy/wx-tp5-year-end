<?php

namespace app\push\controller;

use think\worker\Server;

class Worker extends Server
{
    protected $socket = 'websocket://172.18.215.130:2346';

    protected $C=[];
    /**
     * 收到信息
     * @param $connection
     * @param $data
     */
    public function onMessage($connection, $data)
    {
       // $connection->send('我收到你的信息了哦~~');

       // $connection->send('服务端收到了:'.json_encode($data));

        foreach ($this->C as $_connection){
             $_connection->send('服务端收到了来自'.$connection->id.'的消息:'.json_encode($data));
        }

    }


    /**
     * 当连接建立时触发的回调函数
     * @param $connection
     */
    public function onConnect($_connection)
    {
        //print_r($this->serverWorker->connections);
        //$connection->send('client_id:'.$connection->id.'|');
        echo "新客户端建立连接".$_connection->id;

        $this->C[]=$_connection;

        $_connection->send('你的ID为：'.$_connection->id);


    }

    /**
     * 当连接断开时触发的回调函数
     * @param $connection
     */
    public function onClose($connection)
    {

    }

    /**
     * 当客户端的连接上发生错误时触发
     * @param $connection
     * @param $code
     * @param $msg
     */
    public function onError($connection, $code, $msg)
    {
        echo "error $code $msg\n";
    }

    /**
     * 每个进程启动
     * @param $worker
     */
    public function onWorkerStart($worker)
    {
        $this->serverWorker=$worker;
    }
}
