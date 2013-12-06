<?php
namespace Home\Controller;

class TenderController extends HomeController {
	/* 正在进行的标项目	add() */
	public function running() {
		$this->display('running');
	}

	/* 已完成的标项目*/
	public function done() {
		$this->display();
	}

	/* 标投资的详情页 */
	public function	add($borrow_id = '') {
		if (!isset($borrow_id) || !is_numeric($borrow_id) || !is_login()) {
			return $this->redirect(U('Home/User/login', array( 'info' => '* 请登录后在操作！')));
		} else {

			$this->display();
		}
	}
}
