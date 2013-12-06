<?php
namespace Home\Controller;

/**
 *  咨询服务控制器
 *  咨询服务视图显示
 */
class InfoController extends HomeController {
	//关于我们
	public function about () {
		$this->content = D('Info')->content();
		$this->title = "关于我们";
		$this->display('index');
	}

	//公司证件
	public function cert () {
		$this->content = D('Info')->content();
		$this->title = "公司证件";
		$this->display('index');
	}

	//联系我们
	public function contact () {
		$this->content = D('Info')->content();
		$this->title = "联系我们";
		$this->display('index');
	}

	//网站资费
	public function cost () {
		$this->content = D('Info')->content();
		$this->title = "网站资费";
		$this->display('index');
	}

	//模式介绍
	public function mode () {
		$this->content = D('Info')->content();
		$this->title = "模式介绍";
		$this->display('index');
	}

	//资金保障
	public function safe () {
		$this->content = D('Info')->content();
		$this->title = "资金保障";
		$this->display('index');
	}

	//网站公告
	public function notice () {
		$id = I('id', '', 'intval');
		if ( isset($id) && !empty($id)){
			$data = D('Info')->noticeArticle($id);
			$this->title = $data['title'];
			$this->assign('data', $data);
			$this->display('article');
		} else {
			$list = D('Info')->noticeList();
			$this->list = $list;
			$this->map = U('notice');
			$this->title = "网站公告";
			$this->display('notice');
		}
	}

	//网站动态
	public function trend () {
		$id = I('id', '', 'intval');
		if (isset($id) && !empty($id)) {
			$data = D('Info')->trendArticle($id);
			$this->title = $data['title'];
			$this->assign('data', $data);
			$this->display('article');
		} else {
			$this->list = D('Info')->trendList();
			$this->map = U('trend');
			$this->title = "网站动态";
			$this->display('notice');
		}
	}

}
