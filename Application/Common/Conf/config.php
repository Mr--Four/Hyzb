<?php

/**
 * 系统配置文件
 * 所有系统级别的配置
 */
return array(
    /* 模块相关配置 */
    // 'AUTOLOAD_NAMESPACE' => array('Addons' => ONETHINK_ADDON_PATH), //扩展模块列表
    'DEFAULT_MODULE'     => 'Home',
    'MODULE_DENY_LIST'   => array('Common', 'User'),

    /* 系统数据加密设置 */
    'DATA_AUTH_KEY' => '"YzZmMzQwMmIzMzk4MDViNjhmNDM4NTc3NjgxMTY0NzU=', //默认数据加密KEY,  base64_encode(md5(md5("www.huayaoziben.com")))

    /* 调试配置 */
    'SHOW_PAGE_TRACE' => true,

    /* 用户相关设置 */
    'USER_MAX_CACHE'     => 1000, //最大缓存用户数
    'USER_ADMINISTRATOR' => 1, //管理员用户ID

    /* URL配置 */
    'URL_CASE_INSENSITIVE' => true, //默认false 表示URL区分大小写 true则表示不区分大小写
    'URL_MODEL'            => 0, //URL模式
    'VAR_URL_PARAMS'       => '', // PATHINFO URL参数变量
    'URL_PATHINFO_DEPR'    => '/', //PATHINFO URL分割符

    /* 全局过滤配置 */
    'DEFAULT_FILTER' => '', //全局过滤函数

    /* 数据库配置 */
    'DB_TYPE'   => 'mysqli', // 数据库类型
    'DB_HOST'   => '127.0.0.1', // 服务器地址
    'DB_NAME'   => 'huayaoziben', // 数据库名
    'DB_USER'   => 'root', // 用户名
    'DB_PWD'    => '123456',  // 密码
    'DB_PORT'   => '3306', // 端口
    'DB_PREFIX' => 'tp_', // 数据库表前缀

    /* 文档模型配置 (文档模型核心配置，请勿更改) */
    'DOCUMENT_MODEL_TYPE' => array(2 => '主题', 1 => '目录', 3 => '段落'),

    /* ajax配置 */
    'DEFAULT_AJAX_RETURN' => 'json',

    /* 邮件发送配置 */
    'THINK_EMAIL' => array(
        'SMTP_HOST'   => 'smtp.qq.com', //SMTP服务器
        'SMTP_PORT'   => '465', //SMTP服务器端口
        'SMTP_USER'   => '149725673@qq.com', //SMTP服务器用户名
        'SMTP_PASS'   => '131412san', //SMTP服务器密码
        'FROM_EMAIL'  => '149725673@qq.com', //发件人的EMAIL地址
        'FROM_NAME'   => 'admin@华耀资本', //发件人名称
        'REPLY_EMAIL' => '', //回复的EMAIL地址（留空则为发件人EMAIL）
        'REPLY_NAME'  => '', //回复名称（留空则为发件人名称）
    ),

    /* SESSION 和 COOKIE 配置 */
    'SESSION_PREFIX' => 'hyzb_home', //session前缀
    'VAR_SESSION_ID' => 'session_id',  //修复uploadify插件无法传递session_id的bug
    'COOKIE_PREFIX'  => 'HY_COOKIE_', // Cookie前缀 避免冲突
    'COOKIE_EXPIRE'  => NOW_TIME + 3600*24*2, //过期时间2天

    /* 表单令牌配置 */
    // 'TOKEN_ON'    => true,          //是否开启表单令牌验证
    // 'TOKEN_NAME'  => '__hash__',   //令牌验证表单的隐藏字段名
    // 'TOKEN_TYPE'  => 'md5',        //令牌哈希验证规则 默认MD5
    // 'TOKEN_RESET' => true,         //令牌验证出错后是否重置令牌 默认true
);
