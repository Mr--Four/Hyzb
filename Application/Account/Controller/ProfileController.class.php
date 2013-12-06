<?php

namespace Account\Controller;

/* 账户模型 -  用户设置 */
class ProfileController extends AccountController {
	/* 资料修改 */
	public function profile() {

		$this->display();
	}

	public function avatar() {
		$this->display();
	}

	public function password() {
		$this->display();
	}

	public function vip_detail() {
		$this->display();
	}
}
