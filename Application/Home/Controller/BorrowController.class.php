<?php

namespace Home\Controller;

class BorrowController extends HomeController {
	/* 贷款发标选择标类型 Step1*/
	public function index() {
		$this->title = "我要贷款";
		$this->list = D('Loan')->biaoList();
		$this->display();
	}

	/* 发标填写标信息 Step2*/
	public function add($biaoName = '', $biaoType = '', $loanMoney = '', $minInvestMonty = '', $maxInverstMoney = '', $interestRate = '') {
		if (IS_POST) {

		} else {
			$this->display();
		}
	}

	/* 完成发标 Step3*/
	public function finished() {
		if (IS_POST) {

		}
		$this->display();
	}
}
