<?php

namespace Home\Model;
use Think\Mode;

class BorrowModel extends Model {
	/* 借款标数据自动验证 */
	$_validate = array(
		array('biao_name')
	);

	protected function add($biaoName = '', $biaoType = '', $loanMoney = '', $minInvestMonty = '', $maxInverstMoney = '', $interestRate = '') {

	}
}
