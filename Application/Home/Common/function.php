<?php
/**
 * 前台公共库文件
 * 主要定义前台公共函数库
 */

/**
 * 获取列表总行数
 * @param  string  $category 分类ID
 * @param  integer $status   数据状态
 */
function get_list_count($category, $status = 1){
    static $count;
    if(!isset($count[$category])){
        $count[$category] = D('Document')->listCount($category, $status);
    }
    return $count[$category];
}

/**
 *  重新排版标列表中标内容
 *  @param   array    $content   内容数组
 *  @return  array               返回内容数组
 */
function get_biao_content ($content) {
    if (empty($content)) return false;
    $recon = str_ireplace('</br>', '</p><p class="markSelectInfo">', $content);
    return $recon;
}

/**
 * 获取段落总数
 * @param  string $id 文档ID
 * @return integer    段落总数
 */
function get_part_count($id){
    static $count;
    if(!isset($count[$id])){
        $count[$id] = D('Document')->partCount($id);
    }
    return $count[$id];
}

/**
 * 获取导航URL
 * @param  string $url 导航URL
 * @return string      解析获得url
 */
function get_nav_url($url){
    switch ($url) {
        case 'http://' === substr($url, 0, 7):
            break;
        case '#' === substr($url, 0, 1):
            break;
        default:
            $url = U($url);
            break;
    }
    return $url;
}
