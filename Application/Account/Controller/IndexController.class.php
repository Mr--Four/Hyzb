<?php

namespace Account\Controller;

/**
 *  账户模型
 */
class IndexController extends AccountController {
	/* 账户首页 */
	public function index () {
		if (is_login()) {
			$this->user = D('Account')->info(session('user_auth.uid'));
			$this->display('index');
		} else {
			$this->redirect(U('Home/User/login'));
		}
	}
}
