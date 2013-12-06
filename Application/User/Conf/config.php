<?php

/**
 *  用户API配置文件
 */

define('USER_APP_ID', 1);  //用户API应用ID
define('USER_API_TYPE', 'Model');  //2种类型: Service/Model
define('USER_AUTH_KEY', '`]#9{;(e4+2b=E@X1duUD7-QO!V3tiBy)p^vScJ[');  //加密KEY
define('USER_DB_DSN', 'mysqli://root:123456@127.0.0.1:3306/huayaoziben');// 数据库连接，使用Model方式调用API必须配置此项
define('USER_TABLE_PREFIX', 'tp_');  //数据库表前缀, 使用MODEL方式调用API必须配置此项
