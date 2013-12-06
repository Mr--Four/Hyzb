<?php

namespace Home\Controller;

class WeiController extends Controller {
	public function index() {
		import('COM.ThinkWechat');
		$weixin = new ThinkWechat('*token*');
	}
}
