<?php
namespace User\Model;
use Think\Model;
/**
 *  UserApi 用户模块
 */
class UserApiModel extends Model {
	protected $tablePrefix = USER_TABLE_PREFIX;  //数据库表前缀
	protected $tableName = "user";
	protected $connection = USER_DB_DSN;  //数据库连接

	/* 用户模型自动验证配置 */
	protected $_validate = array(
		/* 验证用户名 */
		array('username', '4,15', -1, self::EXISTS_VALIDATE, 'length'), //用户名长度不合法
		array('username', '', -2, self::EXISTS_VALIDATE, 'unique'), //用户名已注册

		/* 验证密码*/
		array('password', '6,30', -11, self::EXISTS_VALIDATE, 'length'),

		/* 验证邮箱*/
		array('email', 'email', -21, self::EXISTS_VALIDATE),
		array('email', '4,50', -22, self::EXISTS_VALIDATE, 'length'),
		array('email', '', -23, self::EXISTS_VALIDATE, 'unique'),//邮箱以注册
	);

	/* 用户模型自动完成 */
	protected $_auto = array(
		array('password', 'user_api_md5', self::MODEL_BOTH, 'function', USER_AUTH_KEY),
		array('reg_time', NOW_TIME, self::MODEL_INSERT),
		array('reg_ip', 'ip_to_int', self::MODEL_INSERT, 'function'),
		array('last_login_time', NOW_TIME, self::MODEL_BOTH),
		array('last_login_ip', 'ip_to_int', self::MODEL_BOTH, 'function'),
	);

	/**
	 *  注册一个新用户
	 *  @param   string    $username  用户名
	 *  @param   string    $password  密码
	 *  @param   string    $email     邮箱
	 *  @return  string               成功返回用户ID，错误返回错误编号
	 */
	public function register($username, $password, $email) {
		$data = array(
			'username' => $username,
			'password' => $password,
			'email'    => $email,
			'reg_ip'   => get_client_ip(),
			'last_login_ip' => get_client_ip(),
		);

		/* 添加用户 */
		if ($this->create($data)) {
			$uid = $this->add();
			return $uid ? $uid : 0; //0-未知错误， 大于0-注册成功
		} else {
			return $this->getError();  //自动验证错误详情
		}
	}

	/**
	 *  用户登陆验证
	 *  @param   string   $username  用户名
	 *  @param   string   $password  密码
	 *  @param   integer  $type      用户名类型,1-username,2-email,3-手机,4-UID
	 *  @return  string              成功返货用户ID，错误返回错误编号
	 */
	public function login($username, $password) {
		$user = $this->where(array('username' => $username))->find(); //获取用户信息
		if ( is_array($user) && $user['status'] == 1) {
			if (user_api_md5($password, USER_AUTH_KEY) === $user['password']) {
				$this->updateLogin($user['id']); //更新用户信息
				return $user['id']; //登陆成功，返回UID
			} else {
				return -2;  //密码错误
			}
		} else {
			return -1; //用户不存在或被禁用
		}
	}

	public function remember($username, $password, $remember) {
		if ($remember == 'on') {
			$data = array(
				'name' => think_encrypt($username),
				'pass' => think_encrypt($password),
			);

			cookie('user_auth', $data);
			cookie('user_auth_sign', data_auth_sign($data));
		}
	}

	/**
	 *  邮箱验证
	 *  @param   string    $serial  邮箱验证激活码
	 *  @return  boolean            true - 验证成功, 错误返回错误编号
	 */
	public function regEmail($serial) {
		if (!is_string($serial)) return -13;
		$arr = (array)explode(':', $serial); //把验证信息转换成数组
		$data = array('username', $arr[0]);
		$user = $this->where($data)->find(); //获取用户信息
		if (!empty($user) && $user['status']) {
			//todo 验证
		} else {
			return;
		}
	}

	/**
	 *  获取用户信息
	 *  @param   string   $uid          用户ID或用户名
	 *  @param   boolean  $is_username  是否使用用户名查询
	 *  @return  array                  成功返回用户信息，错误返回错误
	 */
	public function info($uid, $is_username = false) {
		$map = array();
		if ($is_username) { //通过用户名获取
			$map['username'] = $uid;
		} else {
			$map['id'] = $uid;
		}

		$user = $this->where($map)->field('id, username, email, email_status,status')->find(); //获取用户数据
		if (is_array($user) && $user['status'] == 1) {
			if (true) { //$user['email_status'] == 1
				return array($user['id'], $user['username'], $user['reg_ip']);
			} else {
				return -2; //邮箱未验证
			}
		} else {
			return -1; //用户名不存在或被禁用
		}
	}

	public function checkField($field, $type = 1) {
		$data = array();
		switch($type) {
			case 1:
				$data['username'] = $field;
				break;
			case 2:
				$data['email'] = $field;
				break;
		}

		return $this->create($data) ? 1 : $this->getError();
	}

	/* 更新用户登陆信息 */
	protected function updateLogin($uid) {
		$data = array(
			'id' => $uid,
			'last_login_time' => NOW_TIME,
			'last_login_ip' => ip_to_int(get_client_ip()),
		);
		$this->save($data);
	}

	/**
	 *  更新用户信息
	 *  @param   int          $uid       用户ID
	 *  @param   string       $password  密码
	 *  @param   array        $data      修改的字段数组
	 *  @return  true-修改成功, false-修改失败
	 */
	public function updateUserInfo($uid, $password, $data) {
		if (empty($uid) || empty($password) || empty($data)) {
			$this->error = '参数错误!';
			return false;
		}

		//更新前检查用户密码
		if (!$this->verifyUser($uid, $password)) {
			$this->error = '验证出错：密码不正确！';
			return false;
		}

		$data = $this->create($data);
		if ($data) {
			return $this->where(array('id' => $uid))->save($data);
		}
		return false;
	}

	/* 验证用户密码，更新用户信息时调用 */
	protected function verifyUser($uid, $password_in) {
		$password = $this->where(array('id'=>$uid))->getField('password');
		if (user_api_md5($password_in, USER_AUTH_KEY) === $password) {
			return true;
		}
		return false;
	}
}
