<?php

namespace Home\Controller;
use Think\Controller;

class HomeController extends Controller {
	/* 空操作，用户输出404页面*/
	public function _empty() {
		$this->display('_404');
	}

	/*  网站配置初始化  */
	protected function _initialize () {
		$config = D('Config')->lists();
		C($config);

		if (!C('WEB_SITE_CLOSE')) {
			$this->error('站点已经关闭，请稍后访问!');
		}
	}

	/* 用户登陆检测 */
	protected function login() {
		is_login() || $this->error('您还没有登录，请先登录！', U('User/login'));
	}
}
