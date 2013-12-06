<?php
namespace Account\Controller;

class MessageController extends AccountController {
	/* 新消息 */
	public function new() {
		$this->display();
	}

	public function inbox() {
		$this->display();
	}

	public function outbox() {
		$this->display();
	}
}
