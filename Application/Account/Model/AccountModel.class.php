<?php

namespace Account\Model;
use Think\Model;
use User\Api\UserApi;

/**
 * 用户账户模型
 */
class AccountModel extends Model{
    /* 账户模型自动完成 */
    protected $_auto = array(
    	array('avatars', 'Public/avatars/hyzb.jpg', self::MODEL_INSERT), //默认头像
        array('login', 0, self::MODEL_INSERT),  //登陆次数
        array('update_time', NOW_TIME, self::MODEL_INSERT),
        array('status', 1, self::MODEL_INSERT),
    );

    /**
     * 登录指定用户
     * @param  integer 	$uid 	  用户ID
     * @param  boolean  $remember 是否记住密码
     * @return boolean      ture-登录成功，false-登录失败
     */
    public function login($uid){
        /* 检测是否在当前应用注册 */
        $user = $this->where(array('uid' => $uid))->find();
        if(!$user){ //未注册
            /* 在账户模型中注册用户 */
        	$Api = new UserApi();
        	$info = $Api->info($uid);
            $user = $this->create(array('uid' => $uid));
            // $user['uid'] = $uid;
            if(!$this->add($user)){
                $this->error = '前台用户信息注册失败，请重试！';
                return false;
            }
        } elseif(1 != $user['status']) {
            $this->error = '用户未激活或已禁用！'; //应用级别禁用
            return false;
        }

        /* 登录用户 */
        $this->autoLogin($uid);

        //记录行为
        action_log('user_login', 'account', $uid, $uid);

        return true;
    }

    /**
     * 注销当前用户
     * @return void
     */
    public function logout(){
        session('user_auth', null);
        session('user_auth_sign', null);
    }

    /**
     * 自动登录用户
     * @param  integer $user  用户ID
     * @param  boolean $remember 是否记住密码
     */
    private function autoLogin($uid){
        /* 更新登录信息 */
        $data = array(
            'login'           => array('exp', '`login`+1'),
            'last_login_time' => NOW_TIME,
            'last_login_ip'   => ip_to_int(get_client_ip()),
        );
        $this->where(array('uid' => $uid))->save($data);

        /* 记录登录SESSION和COOKIES */
		$user  = $this->info($uid); //获取用户信息
		$email = M('user')->where(array('id' => $uid))->getField('email');
		$auth  = array(
            'uid'             => $uid,
            'username'        => get_username($uid),
            'email'		  	  => $email,
            'avatars'		  => $user['avatars'],
            'use_money'		  => $user['use_money'],
            'last_login_time' => time_format($user['last_login_time']),
        );

        session('user_auth', $auth);
        session('user_auth_sign', data_auth_sign($auth));
    }

    /**
	 *  获取用户信息
	 *  @param   string   $uid          用户ID
	 *  @return  array                  成功返回用户信息，错误返回错误编号
	 */
	public function info($uid) {
		$user = $this->where(array('uid' => $uid))->field('id', true)->find(); //获取用户数据
		if (is_array($user) && $user['status'] == 1) {
			return $user;
		} else {
			$this->error = '用户不存在或被禁用！';
			return false;
		}
	}

}
