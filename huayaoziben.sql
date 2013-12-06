-- phpMyAdmin SQL Dump
-- version 4.0.5
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2013 年 12 月 06 日 16:43
-- 服务器版本: 5.5.28
-- PHP 版本: 5.4.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `huayaoziben`
--

-- --------------------------------------------------------

--
-- 表的结构 `tp_account`
--

CREATE TABLE IF NOT EXISTS `tp_account` (
  `uid` mediumint(8) unsigned NOT NULL COMMENT '用户ID',
  `avatars` varchar(100) DEFAULT 'Public/avatars/hyzb.jpg' COMMENT '头像路径',
  `realname` varchar(20) DEFAULT NULL,
  `pay_password` varchar(50) DEFAULT NULL,
  `sex` varchar(2) DEFAULT NULL,
  `birthday` date NOT NULL DEFAULT '0000-00-00',
  `address` varchar(200) DEFAULT NULL,
  `phone` varchar(11) NOT NULL DEFAULT '0',
  `phone_status` tinyint(1) NOT NULL DEFAULT '0',
  `card_id` varchar(18) DEFAULT NULL,
  `card_id_pic1` varchar(200) DEFAULT NULL,
  `card_id_pic2` varchar(120) DEFAULT NULL,
  `card_status` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `update_ip` int(11) unsigned NOT NULL DEFAULT '0',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  `last_login_ip` int(11) unsigned NOT NULL DEFAULT '0',
  `last_login_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '上次登录时间',
  `login` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '登陆次数',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid` (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `tp_account`
--

INSERT INTO `tp_account` (`uid`, `avatars`, `realname`, `pay_password`, `sex`, `birthday`, `address`, `phone`, `phone_status`, `card_id`, `card_id_pic1`, `card_id_pic2`, `card_status`, `update_ip`, `update_time`, `last_login_ip`, `last_login_time`, `login`, `status`) VALUES
(1, 'Public/avatars/hyzb.jpg', NULL, NULL, NULL, '0000-00-00', NULL, '0', 0, NULL, NULL, NULL, 0, 0, 1385013299, 2130706433, 1385952550, 47, 1),
(3, 'Public/avatars/hyzb.jpg', NULL, NULL, NULL, '0000-00-00', NULL, '0', 0, NULL, NULL, NULL, 0, 0, 1385023180, 2130706433, 1385565027, 9, 1),
(4, 'Public/avatars/hyzb.jpg', NULL, NULL, NULL, '0000-00-00', NULL, '0', 0, NULL, NULL, NULL, 0, 0, 1385027051, 2130706433, 1385178460, 2, 1),
(6, 'Public/avatars/hyzb.jpg', NULL, NULL, NULL, '0000-00-00', NULL, '0', 0, NULL, NULL, NULL, 0, 0, 1385261463, 2130706433, 1385261463, 1, 1),
(13, 'Public/avatars/hyzb.jpg', NULL, NULL, NULL, '0000-00-00', NULL, '0', 0, NULL, NULL, NULL, 0, 0, 1385265772, 2130706433, 1385265790, 2, 1),
(123456, 'Public/avatars/hyzb.jpg', NULL, NULL, NULL, '0000-00-00', NULL, '0', 0, NULL, NULL, NULL, 0, 0, 1385564667, 2130706433, 1385564699, 2, 1),
(0, 'Public/avatars/hyzb.jpg', NULL, NULL, NULL, '0000-00-00', NULL, '0', 0, NULL, NULL, NULL, 0, 0, 1385564707, 2130706433, 1385564812, 11, 1),
(2, 'Public/avatars/hyzb.jpg', NULL, NULL, NULL, '0000-00-00', NULL, '0', 0, NULL, NULL, NULL, 0, 0, 1385564775, 2130706433, 1385564775, 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `tp_account_bank`
--

CREATE TABLE IF NOT EXISTS `tp_account_bank` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` mediumint(8) unsigned NOT NULL COMMENT '用户ID',
  `card_id` varchar(19) NOT NULL COMMENT '银行卡号',
  `bank` varchar(30) NOT NULL COMMENT '银行',
  `branch` varchar(50) NOT NULL COMMENT '银行支行',
  `add_time` int(10) unsigned NOT NULL COMMENT '添加时间',
  `add_ip` varchar(16) NOT NULL COMMENT '添加时IP',
  PRIMARY KEY (`id`,`card_id`),
  UNIQUE KEY `uid` (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='银行卡列表' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `tp_account_category`
--

CREATE TABLE IF NOT EXISTS `tp_account_category` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT COMMENT ' 分类ID',
  `pid` tinyint(3) unsigned NOT NULL COMMENT '上级分类ID',
  `name` varchar(30) NOT NULL COMMENT '分类名称',
  `title` varchar(50) NOT NULL COMMENT '标题',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `tp_account_money`
--

CREATE TABLE IF NOT EXISTS `tp_account_money` (
  `uid` mediumint(8) unsigned NOT NULL COMMENT '用户ID',
  `total_money` decimal(11,2) unsigned NOT NULL COMMENT '账户总额',
  `use_money` decimal(11,2) unsigned NOT NULL COMMENT '可用金额',
  `frozen_money` decimal(11,2) unsigned NOT NULL COMMENT '冻结金额',
  `retake_money` decimal(11,2) unsigned NOT NULL COMMENT '待收金额',
  `use_credit` decimal(11,2) unsigned NOT NULL COMMENT '可用信用额度',
  `frozen_credit` decimal(11,2) unsigned NOT NULL COMMENT '冻结信用额度',
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='账户资产表';

-- --------------------------------------------------------

--
-- 表的结构 `tp_account_withdraw`
--

CREATE TABLE IF NOT EXISTS `tp_account_withdraw` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '提现流水号',
  `uid` mediumint(8) unsigned NOT NULL COMMENT '用户ID',
  `card_id` varchar(19) NOT NULL COMMENT '银行卡号',
  `bank` varchar(30) NOT NULL COMMENT '银行',
  `branch` varchar(50) NOT NULL COMMENT '银行支行',
  `total` decimal(11,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '提取的金额',
  `credited` decimal(11,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '实际到账',
  `fee` decimal(6,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '手续费',
  `hongbao` decimal(11,2) unsigned NOT NULL DEFAULT '0.00',
  `add_time` int(10) unsigned NOT NULL COMMENT '申请提现时间',
  `add_ip` varchar(16) NOT NULL DEFAULT '0.0.0.0' COMMENT '申请提现IP',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '提现审核状态',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='提现列表' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `tp_biao_type`
--

CREATE TABLE IF NOT EXISTS `tp_biao_type` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `biao_name` varchar(20) NOT NULL COMMENT '标名称',
  `show_name` varchar(40) NOT NULL COMMENT '显示标名称',
  `content` varchar(300) NOT NULL COMMENT '内容介绍',
  PRIMARY KEY (`id`),
  UNIQUE KEY `biao_name` (`biao_name`,`show_name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `tp_biao_type`
--

INSERT INTO `tp_biao_type` (`id`, `biao_name`, `show_name`, `content`) VALUES
(1, 'lz', '流转标', '流转标是指债权人将手中优质的债权转让给其他有投资意愿的投资人，并且承诺在一定期限内回购该债权的投资品种。在投资人受让债权的期限内，投资人本金及收益的安全由华耀资本提供连带担保，在投资人受让债权届满时，华耀资本担保债权人如约回购债权，投资人从而获益。</br>流转标优势：投资人即刻申购即刻生效，无资金空档期，使投资人的资金获得最佳收益。</br>流转标逾期当日，网站先行垫付本息。'),
(2, 'miao', '秒标', '秒还标为一种娱乐庆祝送钱的标。 秒还标标满后，系统自动审核通过，发标人瞬间返还本金及利息。');

-- --------------------------------------------------------

--
-- 表的结构 `tp_borrow`
--

CREATE TABLE IF NOT EXISTS `tp_borrow` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '流水号',
  `user_id` mediumint(8) unsigned NOT NULL COMMENT '用户ID',
  `biao_name` varchar(100) NOT NULL COMMENT '标名称(贷款名)',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '标状态',
  `biao_type` varchar(20) NOT NULL COMMENT '标类别(show_name)',
  `borrow_money` decimal(11,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '借贷金额',
  `is_vouch` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否担保',
  `vouch_user` mediumint(8) unsigned NOT NULL COMMENT '担保人',
  `year_interest_rate` decimal(3,2) unsigned NOT NULL DEFAULT '0.20' COMMENT '年利率',
  `repayment_type` varchar(20) NOT NULL COMMENT '还款方式',
  `time_limit` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '还款期限',
  `min_tender_money` decimal(11,0) unsigned NOT NULL COMMENT '最小投标金额',
  `max_tender_money` decimal(11,0) unsigned NOT NULL COMMENT '最大投标金额',
  `borrow_award_amount` decimal(11,4) unsigned NOT NULL DEFAULT '0.0000' COMMENT '奖励金额',
  `create_ip` int(11) unsigned NOT NULL COMMENT '发标IP地址',
  `create_time` int(11) unsigned NOT NULL COMMENT '发标时间',
  `verify_user` mediumint(8) unsigned NOT NULL COMMENT '审核验证用户的ID',
  `verify_ip` int(11) unsigned NOT NULL COMMENT '审核时IP',
  `verify_time` int(11) unsigned NOT NULL COMMENT '审核时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='贷款列表' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `tp_config`
--

CREATE TABLE IF NOT EXISTS `tp_config` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '配置ID',
  `name` varchar(30) NOT NULL COMMENT '配置名称',
  `type` tinyint(3) unsigned NOT NULL COMMENT '配置类型 (0-数字，1-字符， 2-文本， 3-数组， 4-枚举， 5-多选)',
  `title` varchar(50) NOT NULL COMMENT '配置说明',
  `group` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '配置分组 (0-无分组， 1-基本设置)',
  `extra` varchar(255) NOT NULL COMMENT '配置值',
  `remark` varchar(100) NOT NULL COMMENT '配置说明',
  `create_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `status` tinyint(2) unsigned NOT NULL DEFAULT '0' COMMENT '状态',
  `value` text NOT NULL,
  `sort` smallint(3) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_name` (`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `tp_config`
--

INSERT INTO `tp_config` (`id`, `name`, `type`, `title`, `group`, `extra`, `remark`, `create_time`, `update_time`, `status`, `value`, `sort`) VALUES
(1, 'WEB_SITE_TITLE', 1, '网站标题', 0, '', '前台标题', 1382434708, 0, 1, '华耀资本,网络投资,网络理财,网上投资,P2P网络理财,赚钱,本金保障,高收益,投资,理财', 0),
(2, 'WEB_SITE_DESCRIPTION', 2, '网站描述', 0, '', '网站搜索引擎描述', 1382434708, 0, 1, '华耀资本,网络投资,网络理财,网上投资,P2P网络理财,赚钱,本金保障,高收益,投资,理财', 1),
(3, 'WEB_SITE_KEYWORD', 2, '网站关键字', 0, '', '网站搜索引擎热词', 1382434708, 0, 1, '华耀资本,网络投资,网络理财,网上投资,P2P网络理财,赚钱,本金保障,高收益,投资,理财', 3),
(4, 'WEB_SITE_CLOSE', 4, '关闭站点', 0, '0:关闭,1:开启', '站点关闭后其他用户不能访问，管理员可以正常访问', 1382434708, 0, 1, '1', 0),
(5, 'WEB_SITE_ICP', 1, '网站备案号', 0, '', '网站页脚底部的备案号', 1382435578, 0, 1, '湘ICP备13006487号-1', 4),
(6, 'COLOR_STYLE', 4, '后台色系', 0, 'default_color:默认blue_color:紫罗兰', '后台颜色风格', 1383068016, 1383068016, 1, 'default_color', 5);

-- --------------------------------------------------------

--
-- 表的结构 `tp_friend_link`
--

CREATE TABLE IF NOT EXISTS `tp_friend_link` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `url` varchar(100) NOT NULL,
  `sort` smallint(5) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `tp_info`
--

CREATE TABLE IF NOT EXISTS `tp_info` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `title` varchar(20) NOT NULL,
  `content` varchar(3000) DEFAULT NULL,
  `changetime` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`,`title`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- 转存表中的数据 `tp_info`
--

INSERT INTO `tp_info` (`id`, `name`, `title`, `content`, `changetime`) VALUES
(1, 'about', '关于我们', '　　华耀资本（www.huayaoziben.com）是专业化的，安全诚信的网络投融资平台，隶属于益阳市华耀资产管理有限公司，注册资金100万。</br>\n　　华耀资本为有资金需求和理财需求的客户搭建一个快速，安全，诚信，专业的网络借贷第三方信息中介平台， 公司拥有的一支精通企业投融资、互联网技术和政策法规的专业技术团队，并以P2P方式最大限度的为有需求的 个人，中小微企业提供优质高效的服务。</br>\n　　华耀资本遵循“不吸储、不放贷”的原则，严格遵守国家相关法律法规，顺应电子商务全球化的发展趋势， 推动网络投融资平台走向信息化，阳光化，合法化，让借贷双方实现互惠互赢。 ', 1381590693),
(2, 'cert', '公司证件', '<img src=''//localhost/hy/Public/static/images/companyCert.jpg'' />', 1381590826),
(3, 'contact', '联系我们', '<h3>公司地址：益阳市高新区益阳大道世纪金源大厦A座2702房</h3>\r\n					<h3>邮编：413000</h3>\r\n					<h3>邮箱：2253633431@qq.com</h3>\r\n					<h3>电话：0737-3299111</h3>', 1381591041),
(4, 'cost', '网站资费', '<h3>一、充值费用</h3>\n					　　在线充值(网上充值)无任何手续费，回款续投一次性万元以上奖励<span class="orange">1‰</span>。\n					<h3>二、提现费用</h3>\n					　　用户投标回款即可免费提现，充值未投标提现按提现金额的<span class="orange">3‰</span>收取手续费。<br/>\n					注：<br/>\n					1、本网站坚决抵制信用卡套现行为，如发现某一用户连续多次网上充值且不投标直接提现，视为套现行为，将冻结其账户资金。<br/>\n					2、提现时间<br/>\n					（1）<span class="orange">11:00之前</span>的申请，当日<span class="orange">16：00之前</span>完成所有提现申请的内部审核及网银转账；<span class="orange">11:00到16:00</span>之间的申请,<span class="orange">18:00之前完</span>成所有提现申请的内部审核及网银转账，特殊情况<span class="orange">不超过当日24:00</span>；<br/>\n					（2）<span class="orange">16:00以后</span>的申请，<span class="orange">第二日11:00之前</span>进行处理（遇周日及节假日除外）\n					网银转账后，实际到账时间根据打款银行、地区以及日期（工作日、法定节假日）的不同，到账时间会有所差异，一般到账时间不超过24小时。对转账时间如有疑问，可在<span class="orange">20:00前</span>直接联系客服，必要时索取网银转账截图。<br/>\n					（3）如果会员提现过程中有任何疑问，可立即联系华耀资本客服。<br/>\n					4、投资者申请的提现金额，提现最低<span class="orange">50</span>元起,单笔不超过<span class="orange">50万</span>，每日累计不超过<span class="orange">100万</span>。<br/>\n					5、投资者投标所获得的利息，华耀资本将扣除投资者所得利息<span class="orange">10%</span>作为网站管理费用。<br/>', 1381591041),
(5, 'notice', '网站公告', NULL, 1381591754),
(6, 'trend', '公司动态', NULL, 1381591852),
(7, 'mode', '模式介绍', 'P2P网络融资，简单的说，就是手中有闲钱的放款人，通过网络融资平台，将钱投给需要用钱的融资人的过程。放款人获得较高的收益，同时融资人能方便快捷的获得事业发展的资金。<br/>\r\n					　　P2P网络融资是个新兴事物，最早于2005年诞生于英国；2007年中国出现了第一家P2P融资网站；P2P网络融资模式由于互联网这个工具的便利性和跨地域性，迅速实现了爆发式的增长，行业总融资额由2007年的2000万元增长到2011年的60亿，预计2012年将达到300亿元并继续保持爆发性增长态势。中国的网络融资平台家数也由2007年的1家迅速发展到上千家；上规模的、有稳定日常成交量的平台，也达到了4、50家，且不断还有新的平台诞生。从本质上说，网络融资是互联网这个革命性的工具进入到传统的金融融资领域而出现的一种"金融淘宝网"，网络融资模式必将成为今后人们重要的一种理财方式选项。<br/>\r\n\r\n					　　大多数人第一次接触网络融资，第一反应就是："什么？通过网络把钱投给完全不认识的陌生人，并指望他/她按时还款，收取利息？"----这也太不靠谱了吧！~~ 产生这一反应是正常的，源于人们对一陌生事物所产生的本能偏见，这些偏见是由以下误区造成的，下面就逐个来分析这些误区：<br/>\r\n					　　误区一：网络上都是匿名的，我根本不知道把钱投给谁了。 错！其实每个网络ID背后都是活生生的人，尤其在网络融资这个领域，要想通过网络平台融资，必须前期经过很严格的身份认证过程，包括身份证实名认证（通过国政通身份证户籍数据库查询）、央行信用报告认证、学历证书认证、手机、邮箱认证等等，对于融资量在5万元以上的客户，网络平台一般还需要去现场考察融资者的资质，所以，想匿名通过网络平台融到钱，是不可能的。<br/>\r\n					　　误区二：在网络上融钱的都是穷人，而穷人是不讲信用的。 错！诺贝尔和平奖获得者孟加拉经济学家尤努斯教授的研究结果表明：穷人也有信用！他在孟加拉创办的乡村银行，常年坏账率在1%以下，大大低于很多只做大企业融资的大银行。其实也很好理解，一个人可能会为还不起几千万、几亿的融资而"跑路"，但一个人只为了几万元、几十万元就背井离乡、抛家舍业"跑路"的动力就大大降低了。 另外，在网络上融钱的并不一定是穷人，准确的讲，在网络上融钱的人，是现有银行体系下没有很好被覆盖到的，没有办法被服务好的小微企业主、小微经营者，往往他们的生意有着良好的毛利率，完全可以消化掉年化20%左右的资金利息，只不过他们的资金需求量也不大，几万元、最多几十万元，是银行不愿意服务，也没有能力提供服务（因为银行的服务成本很高、效率很低）的"小微客户"。<br/>\r\n					　　误区三：在网络上融资，属于"高息融资"，不受法律保护。 错！国家法律是允许和保护民间投融资的，对于利率在国家规定的融资利率的四倍以下的利息，也是承认和保护的，而现有网络平台上的利率水平，均是在四倍安全线的下方。 《中华人民共和国合同法》第211条从法律上肯定了民间投融资行为的合法性，并从法律层面保护投资人收回融资资金和利息的权利。<br/>\r\n					　　误区四：我的钱通过网络融资放出去了，风险很高，别利息赚了一些，但把本金赔进去了。 这个担忧不能算错，世界上没有100%无风险的事情，网络融资的风险，远没有大家想象的那么大。首先是各个网络融资平台，经过充分竞争，现在已经基本形成了对于VIP客户本金垫付机制，对于抵押标、推荐标、担保标等，还垫付本金和利息；而且，投资者本身也可以利用互联网的便利性，很容易的采取"分散投资"的策略，比如总共投资10万元，可以分散投资到10个平台，每个平台再分成10份1000元的投资分散出去，如果坏账率在1%以下的话，年化收益率还是会稳定在18%~19%一线（假设都是投资20%左右的标），网络平台的便利性很容易实现"鸡蛋不放在一个篮子里"，如果没有互联网这个工具，这种模式的成本是不可想象，也无法实现的。', 1381591979),
(8, 'safe', '本金保障', '<h3>如何保障您的投资安全</h3>\n					　　1.益阳市华耀资产管理有限公司为每笔融资承诺收购债权。也就是说，融资协议是一个三方协议，益阳市华耀资产管理有限公司将作为协议的一方，在协议约定的范围内，对投资人负有连带还款的责任和义务。如融资人违约，投资人可直接依据借款协议，要求益阳市华耀资产管理有限公司收购债权还款或采取相应法律措施。<br/>\n					　　2.如果融资人在当期还款出现逾期，益阳市华耀资产管理有限公司在逾期当日进行本金及收益垫付。', 1381591979);

-- --------------------------------------------------------

--
-- 表的结构 `tp_info_notice`
--

CREATE TABLE IF NOT EXISTS `tp_info_notice` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `addtime` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `tp_info_notice`
--

INSERT INTO `tp_info_notice` (`id`, `title`, `content`, `addtime`) VALUES
(1, '华耀资本国庆秒标公告', '<p>尊敬的华耀资本投资人：</p>\n<p>华耀资本为庆祝国庆节，网站将于9月28日20点发布秒标，金额100万，利率6.88%，限额20万，欢迎广大会员投资。</p>\n<p>华耀资本<br />2013年9月27日</p>', 1382171678),
(2, '华耀资本开业活动公告', '尊敬的华耀资本投资人，公告之日起华耀资本开展开业活动酬宾：\r\n\r\n投资人投资1月标，奖励投标金额的2.3%作为奖励，年利率为22%。\r\n投资人投资2月标，奖励投标金额的4.7%作为奖励，年利率为23%。\r\n投资人投资3月标，奖励投标金额的7.2%作为奖励，年利率为24%。\r\n\r\n注：\r\n如果有其它期限借款标，另行公告。\r\n活动最终解释权归华耀资本所有。\r\n\r\n2013年9月3日\r\n华耀资本', 1382192980);

-- --------------------------------------------------------

--
-- 表的结构 `tp_info_trend`
--

CREATE TABLE IF NOT EXISTS `tp_info_trend` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `addtime` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `titile` (`title`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `tp_info_trend`
--

INSERT INTO `tp_info_trend` (`id`, `title`, `content`, `addtime`) VALUES
(1, '热烈庆祝华耀资本网站9月顺利上线', '\r\n					随着2013年的网贷行业大发展，网贷行业取得了长足的发展。为了顺应互联网金融发展的潮流，华耀资本经过4个月的努力，完成了华耀资本的网站系统，并于2013年9月3日顺利上线。\r\n\r\n 一，系统平台精准的数据计算和统计\r\n对在借贷过程中产生的借贷双方利息、借款管理费、冻结资金、利息管理费、逾期罚金和催缴费等精准计算；同时，提供每月所产生的各项金额数据均有统计数据分析\r\n二，系统拥有完善的借款标种类\r\n系统拥有最完善的各类借款标种类，适合不同用户，借款标种类有：信用标，担保标，净值标，抵押标，秒还标，天标等\r\n三，完善的借贷流程细节优化\r\n完整的一套用户认证流程，完善的借款和放贷流程，更支持信用借款和担保借款、投标奖励和担保奖励。\r\n四，金融交易系统安全保障\r\n作为网络金融交易系统，交易安全攸关重要，为此，我们系统支持U盾加密技术，在后台管理员登陆使用动态口令技术，极大增加了安全系数，在市场中处于领先地位。', 1382169314);

-- --------------------------------------------------------

--
-- 表的结构 `tp_repayment_type`
--

CREATE TABLE IF NOT EXISTS `tp_repayment_type` (
  `id` tinyint(2) unsigned NOT NULL AUTO_INCREMENT COMMENT '还款方式ID',
  `name` varchar(20) NOT NULL COMMENT '类别名称',
  `show_name` varchar(20) NOT NULL COMMENT '显示名称',
  PRIMARY KEY (`id`),
  UNIQUE KEY `type_name` (`name`,`show_name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='还款方式' AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `tp_repayment_type`
--

INSERT INTO `tp_repayment_type` (`id`, `name`, `show_name`) VALUES
(1, 'one-time repayment', '一次性还款');

-- --------------------------------------------------------

--
-- 表的结构 `tp_tender`
--

CREATE TABLE IF NOT EXISTS `tp_tender` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '投资流水单号',
  `uid` mediumint(8) unsigned NOT NULL COMMENT '用户ID',
  `borrow_id` int(11) unsigned NOT NULL COMMENT '标ID',
  `tender_money` decimal(11,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '投标金额',
  `create_ip` int(11) unsigned NOT NULL COMMENT '投标IP地址',
  `create_time` int(11) unsigned NOT NULL COMMENT '投标时间',
  `interest_amount` decimal(11,2) unsigned NOT NULL COMMENT '利息',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='投标列表' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `tp_user`
--

CREATE TABLE IF NOT EXISTS `tp_user` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `email_status` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `reg_ip` int(11) unsigned NOT NULL,
  `reg_time` int(11) unsigned NOT NULL,
  `last_login_ip` int(11) unsigned NOT NULL,
  `last_login_time` int(11) unsigned NOT NULL,
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`,`email`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=21 ;

--
-- 转存表中的数据 `tp_user`
--

INSERT INTO `tp_user` (`id`, `username`, `password`, `email`, `email_status`, `reg_ip`, `reg_time`, `last_login_ip`, `last_login_time`, `status`) VALUES
(1, '123456', 'a402b26591b72b84e9136e0b08bccb6e', '11@qq.com', 0, 2130706433, 1385002700, 2130706433, 1385952550, 1),
(2, 'nihao', 'a402b26591b72b84e9136e0b08bccb6e', '1111@qq.com', 0, 2130706433, 1385023114, 2130706433, 1385023114, 1),
(3, 'Mr_Four', 'a402b26591b72b84e9136e0b08bccb6e', '1@qq.com', 0, 2130706433, 1385023170, 2130706433, 1385565027, 1),
(4, 'wode', 'a402b26591b72b84e9136e0b08bccb6e', '123@qq.com', 0, 2130706433, 1385027045, 2130706433, 1385178460, 1),
(5, '啊啊11', 'a402b26591b72b84e9136e0b08bccb6e', '22@qqq.cp', 0, 2130706433, 1385261255, 2130706433, 1385261270, 1),
(7, '12345611', 'a402b26591b72b84e9136e0b08bccb6e', '333@qq.com', 0, 2130706433, 1385261586, 2130706433, 1385261586, 1),
(8, 'wode111', 'a402b26591b72b84e9136e0b08bccb6e', 'wode@qq.com', 0, 2130706433, 1385261875, 2130706433, 1385261875, 1),
(9, 'a123456', 'a402b26591b72b84e9136e0b08bccb6e', 'aaa@qq.com', 0, 2130706433, 1385262187, 2130706433, 1385262187, 1),
(10, 'aaa123', 'a402b26591b72b84e9136e0b08bccb6e', 'aaaaaaa@qq.com', 0, 2130706433, 1385262368, 2130706433, 1385262368, 1),
(11, 'abc123', 'a402b26591b72b84e9136e0b08bccb6e', '234@qq.com', 0, 2130706433, 1385262487, 2130706433, 1385262487, 1),
(12, '你好是你', 'a402b26591b72b84e9136e0b08bccb6e', '178@qq.com', 0, 2130706433, 1385262921, 2130706433, 1385262921, 1),
(13, 'admin', 'dbd5f76f81ea613482bfbad7d5a4509b', 'timest@qq.com', 0, 2130706433, 1385265765, 2130706433, 1385265790, 1),
(14, '啊啊22', 'a402b26591b72b84e9136e0b08bccb6e', '778@qq.com', 0, 2130706433, 1385299447, 2130706433, 1385299447, 1),
(15, '98765', 'a402b26591b72b84e9136e0b08bccb6e', '908098@qq.com', 0, 2130706433, 1385299465, 2130706433, 1385299465, 1),
(16, '789446', 'a402b26591b72b84e9136e0b08bccb6e', '4445@q.com', 0, 2130706433, 1385299547, 2130706433, 1385299547, 1),
(17, '12345612', 'a402b26591b72b84e9136e0b08bccb6e', '4566@qq.com', 0, 2130706433, 1385358334, 2130706433, 1385358334, 1),
(18, 'mr_four12', 'a402b26591b72b84e9136e0b08bccb6e', '888@qq.com', 0, 2130706433, 1385358366, 2130706433, 1385358366, 1),
(19, '45678', 'a402b26591b72b84e9136e0b08bccb6e', '4436@qq.com', 0, 2130706433, 1385358386, 2130706433, 1385358386, 1),
(20, '9875', 'a402b26591b72b84e9136e0b08bccb6e', '90-33-12@qq.com', 0, 2130706433, 1385358416, 2130706433, 1385358416, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
