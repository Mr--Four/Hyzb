<?php

namespace Home\Model;
use Think\Model;

class LoanModel extends Model {
	/* 获取标列表 */
	public function biaoList() {
		return M('biao_type')->select();
	}

	/* 发标*/
	public function add() {
		$this->display();
	}
}
