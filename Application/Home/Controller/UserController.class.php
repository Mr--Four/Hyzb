<?php

namespace Home\Controller;
use User\Api\UserApi as UserApi;
use Account\Model\AccountModel as Account;

/**
 *  用户注册、登陆控制器
 *  用户注册视图显示和处理
 *  用户登陆视图显示和处理
 *
 */
class UserController extends HomeController {
	/**
	 *  用户注册
	 *  @param   string    $username    用户名
	 *  @param   string    $password    密码
	 *  @param   string    $repassword  重复密码
	 *  @param   string    $email       电子邮箱
	 *  @param   string    $verify      验证码
	 *  @return  boolean   true - 成功注册， false - 返回错误信息
	 */
	public function register ($username = '', $password = '', $repassword = '', $email = '', $verify = '') {
		if (IS_POST) {
			/* 检测验证码*/
			if (!check_verify($verify)) {
				$this->error('验证码输入错误!');
			}

			/* 检测密码 */
			if ($password != $repassword) {
				$this->error('两次输入密码不一致！');
			}

			/* 调用注册模块 */
			$User = new UserApi;
			$uid = $User->register($username, $password, $email);
			if ($uid > 0) { //注册成功
				//TODO: 发送验证邮件
				/*$content = $User->emailActivate($username, $email);
				$subject = '华耀资本用户注册邮箱验证';
				if ( $send = think_send_mail($email, $email, $subject, $content) === true ) {
					$this->success('注册成功!', U('login', array('msg' => '系统已发送激活邮件到' . $email,)));
				} else {
					$this->error($send);
				}*/
				$this->success('注册成功！', U('login'));
			} else { //注册失败
				$this->error($this->showRegError($uid));
			}
		} else { //非POST,显示注册白表单
			$this->display();
		}
	}

	/* 用户邮箱认证 */
	public function regEmail ($serial = '') {
		if (IS_GET) {
			if(empty($serial))
				return $this->error($this->showRegError(-13));
			$eid = D('User')->emailActivateCheck($serial);
			if ($eid > 0) {   //邮箱认证成功
				return '恭喜您，邮箱认证成功！';
			} else {
				$this->error($this->showRegError($eid));
			}
		} else {
			$this->error("no pages");
		}
	}

	public function login ($username = '', $password = '', $remember = false) {
		if (IS_POST) {
			/* 调用登陆模块 */
			$User = new UserApi;
			$uid = $User->login($username, $password);
			if ($uid > 0) { //登陆成功
				/* 登录用户 */
				$Account = new Account;
				if($Account->login($uid)){ //登录用户
					$User->remember($username, $password, $remember);
					//TODO:跳转到登录前页面
					$this->success('登陆成功！');
				} else {
					$this->error($Account->getError());
				}
			} else {
				switch ($uid) {
					case -1: $error = '用户不存在或被禁用！';break;
					case -2: $error = '密码错误!';break;
				}
				$this->error($error);
			}
		} elseif (is_login()){
			$this->redirect(U('Home/Index/index'));
		} else {
			$this->display();
		}
	}

	/* 退出登录 */
	public function logout () {
		if (is_login()) {
			$Account = new Account;
			$Account->logout();
			$this->success('退出登录！', U('Home/Index/index'));
		} else {
			$this->redirect(U('Home/Index/index'));
		}
	}

	/* 验证码, 用户登陆和注册 */
	public function verify () {
		$verify = new \COM\Verify();
		$verify->setImage(25 , 0, 0, 4, '4.ttf');
		$verify->entry(1);
	}

	/* 字段检查 */
	public function check () {
		if (!IS_AJAX) redirect(U('login'));
		$type = I('type');
		$User = new UserApi;
		switch ($type) {
			case 'username' :
				$username = I('username');
				$uid = $User->checkUsername($username);
				break;
			case 'email' :
				$email = I('email');
				$uid = $User->checkEmail($email);
				break;
			case 'verify' :
				$verify = I('verify');
				$uid = $this->checkVerify($verify);
				break;
		}
		if ($uid == 1) {
			return $this->success();
		}
		return $this->error($this->showRegError($uid));
	}

	protected function checkVerify ($verify) {
		$Verify = new \COM\Verify();
		$check = $Verify->check($verify, 1);
		if (!$check) {
			return -3;
		}
		return 1;
	}

	/* 注册出错提示信息 */
	private function showRegError ($code) {
		switch ($code) {
			case -1 : $error = '用户名长度在4~15个字符';break;
			case -2 : $error = '用户名已注册';break;
			case -3 : $error = '验证码错误';break;
			case -11: $error = '密码长度必须在6-30个字符之间';break;
			case -21: $error = '邮箱格式不正确';break;
			case -22: $error = '邮箱长度不合法';break;
			case -23: $error = '邮箱已注册';break;
			case -31: $error = '邮箱验证激活码错误,请重新操作！';
			case -32: $error = '邮箱验证激活码失效,请重新操作！';
			case -33: $error = '系统错误，编号: code NO.0015';
			default : $error = '未知错误！请联系管理员！';
		}
		return $error;
	}
}
