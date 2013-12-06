<?php
namespace User\Api;
use User\Api\Api;
use User\Model\UserApiModel;

class UserApi extends Api {
	/* 构造方法，实例化操作模型*/
	public function _init() {
		$this->model = new UserApiModel();
	}

	/**
	 *  注册一个新用户
	 *  @param 	string 	$usernmae 用户名
	 *  @param 	string 	$password 密码
	 *  @param 	string 	$email 用户邮箱
	 *  @return integer 注册成功-用户信息，注册失败-错误编号
	 */
	public function register($username, $password, $email) {
		return $this->model->register($username, $password, $email);
	}

	public function regEmail($serial = '') {
		if (empty($serial)) return false;
		return $this->model->regEmail($serial);
	}
	/**
	 *  用户登陆认证
	 *  @param   string   $username  用户名
	 *  @param   string   $password  密码
	 *  @param   integer  $type      用户名类型(1-用户名，2-邮箱, 3-手机，4-UID)
	 *  @return  integer             登陆成功-用户UID，登陆失败-错误编号
	 */
	public function login($username, $password, $type = 1) {
		return $this->model->login($username, $password, $type);
	}

	/* 是否记住用户名 */
	public function remember($username, $password, $remember) {
		return $this->model->remember($username, $password, $remember);
	}

	/**
	 *  获取用户信息
	 *  @param   string   $uid          UID或用户名
	 *  @param   boolean  $is_username  是否使用用户名查询
	 *  @return  array                 	用户信息
	 */
	public function info($uid, $is_username = false) {
		return $this->model->info($uid, $is_username);
	}

	public function updateInfo($uid, $password, $data) {
		if ($this->model->updateUserFields($uid, $password, $data) != false) {
			$reurn['status'] = true;
		} else {
			$return['status'] = false;
			$return['info'] = $this->model->getError();
		}
		return $return;
	}

	/* 检测用户名, 错误返回错误编号 */
	public function checkUsername($username) {
		return $this->model->checkField($username, 1);
	}

	/* 检测密码， 错误返回错误编号 */
	public function checkPassword($password) {
		return $this->model->checkField($password, 2);
	}

	/* 检测邮箱， 错误返回错误编号 */
	public function checkEmail($email) {
		return $this->model->checkField($email, 3);
	}


}
