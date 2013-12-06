<?php

namespace Home\Model;
use Think\Model;

class InfoModel extends Model {
	public $field = array('id', 'title', 'addtime');

	/**
	 *  网站公告列表
	 *  @return  array   网站公告列表
	 */
	public function noticeList () {
		return M('Info_notice')->field($field)->order('id desc')->select();
	}

	/**
	 *  网站公告详情内容
	 *  @return array    内容详情
	 */
	public function noticeArticle ($id) {
		return M('Info_notice')->where(array('id' => $id))->find();
	}

	/**
	 *  网站动态列表
	 *  @return  array    网站动态列表
	 */
	public function trendList() {
		return M('Info_trend')->field($field)->order('id desc')->select();
	}

	public function trendArticle ($id) {
		return M('Info_trend')->where(array('id' => $id))->find();
	}

	/**
	 *  咨询服务详情内容
	 *  @param   string   $field  查询字段
	 *  @return  array            返回数组结果集
	 */
	public function content ($field = '') {
		$field = !empty($field) ? $field : 'content';
		$name = array('name' => ACTION_NAME);
		return $this->field($field)->where($name)->select();
	}
}
