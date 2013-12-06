<?php

namespace Account\Controller;
use Think\Controller;

/* 账户模型 */
class AccountController extends Controller {
	/* 自动加载网站配置文件(数据库) */
	protected function _initialize() {
		$config = D('Config')->lists();
		C($config);

		if (!C('WEB_SITE_CLOSE')) {
			$this->error('站点已经关闭，请稍后访问!');
		}

		define(UID, is_login());
		if (!UID) {
			$this->redirect('Home/User/login');
		}
	}
}
