<?php

/**
 * 前台配置文件
 * 所有除开系统级别的前台配置
 */
return array(
    /* 主题设置 默认模板主题名称 */
    'DEFAULT_THEME' =>  'default',

    /* 模板相关配置 */
    'TMPL_PARSE_STRING' => array(
        '__STATIC__' => __ROOT__ . '/Public/static',
        '__AVATARS__' => __ROOT__ . '/Public/avatars',
        '__IMG__'    => __ROOT__ . '/Public/' . MODULE_NAME . '/images',
        '__CSS__'    => __ROOT__ . '/Public/' . MODULE_NAME . '/css',
        '__JS__'     => __ROOT__ . '/Public/' . MODULE_NAME . '/js',
    ),

    /* 数据缓存设置 */
    'DATA_CACHE_PREFIX' => 'hy_', // 缓存前缀
    'DATA_CACHE_TYPE'   => 'File', // 数据缓存类型
);
