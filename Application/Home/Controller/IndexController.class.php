<?php
namespace Home\Controller;
use ThinkPHP\Extend;
/**
 *  前台首页控制器
 */
class IndexController extends HomeController {
	/* 前台首页视图 */
	public function index () {
		$info = D('Info');
		$this->title = "首页";
		$this->notice = $info->noticeList();
		$this->trend = $info->trendList();
		$this->display();
	}

	public function email ($to = '', $name = '', $subject = '', $content = '') {
		if (IS_POST) {
			// $rule = ' /[\w]*@/ ';
			// $domain = preg_replace($rule, 'mail.', $to);
			// var_dump($domain);die;
			// echo $to;die;
			$content = D('User')->emailActivate($name, $to);
			echo $content;die;
			$send = think_send_mail($to, $name, $subject, $content['REG_CONTENT']);
			if ($send === true) {
				echo "ok";
			} else {
				echo $send;
		}
		} else {
			$a = '123456';
			$this->a = base64_encode($a);
			$this->aa = think_encrypt($a);
			$this->display();
		}
	}

}
