<?php

namespace User\Api;

define('USER_API_PATH', dirname(dirname(__FILE__)));
require_cache(USER_API_PATH . '/Conf/config.php');  //载入配置文件
require_cache(USER_API_PATH . '/Common/common.php');  //载入函数文件

abstract class Api{
	/**
	 * USER API 调用控制器层
	 * @access protected
	 * @var    $object
	 */
	protected $model;

	/**
	 * 构造方法，检测相关配置
	 */
	public function __construct(){
		//相关配置项检测
		defined('USER_APP_ID') || throw_exception('USER API配置错误，缺少USER_APP_ID');
		defined('USER_API_TYPE') || throw_exception('USER API配置错误, 缺少USER_API_TYPE');
		defined('USER_AUTH_KEY') || throw_exception('USER API配置错误，缺少USER_AUTH_KEY');
		defined('USER_DB_DSN') || throw_exception('USER API配置错误， 缺少USER_DB_DSN');
		defined('USER_TABLE_PREFIX') || throw_exception('USER API配置错误，缺少USER_TABLE_PREFIX');

		if (USER_API_TYPE != 'Model' && USER_API_TYPE != 'Service') {
			throw_exception('USER API配置错误：USER_API_TYPE只能为Model 或 Service');
		}
		if (USER_API_TYPE == 'Service' && USER_AUTH_KEY == '') {
			throw_exception('USER API配置错误：当USER_API_TYPE为Service时，USER_AUTH_KEY必须配置');
		}
		if (USER_API_TYPE == 'Model' && USER_DB_DSN == '') {
			throw_exception('USER API配置错误：当USER_API_TYPE为Model时，USER_DB_DSN必须配置');
		}

		$this->_init();
	}

	/**
	 * 抽象方法，用于设置模型实例
	 */
	abstract protected function _init();
}
