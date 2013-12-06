$(function () {
	/* 输入框获取焦点时变色 */
	var name   = $("input[name=username]")
	var pass   = $("input[name=password]")
	var repass = $("input[name=repassword]")
	var email  = $("input[name=email]")
	var verify = $("input[name=verify]")
	$("input").each(function () {
		if ($(this).attr("name") == "verify") {
			$(this).focus(function () {
				$(this).attr("class", "pageVerifyInput").addClass("formInput")
			}).blur(function () {
				$(this).attr("class", "pageVerifyInput")
			})
		} else {
			$(this).focus(function () {
				$(this).attr("class", "pageTextInput").addClass("formInput")
			}).blur(function () {
				$(this).attr("class", "pageTextInput")
			})
		}
	})

	/* 定义正则匹配 */
	var name_reg = /^[\u4E00-\u9FA5\uf900-\ufa2d\w]+$/i //只能使用英文数字汉字下划线
	var pass_reg = /^(?![0-9]+$)(?![a-zA-Z]+$).{6,}$/
	var email_reg = /^\w+([-+.]\w+)*@\w+\1*\.\w+\1*$/

	/* 表单提交前判断是否都验证成功 */
	$("form").submit(function () {
		var sUrl = $(this).attr("action")
		var arr = {username: name.val(), password: pass.val(), repassword: repass.val(), email: email.val(), verify: verify.val()}
		if (validate()) {
			$.post(sUrl, arr, function (data) {
				if (data.status === 1) {
					alert(data.info)
					window.location.href = data.url
				} else {
					alert(data.info)
				}
			}, "json")
			return false
		} else {
			return false
		}
	})

	/* 提交表单前判断是否有错误信息 */
	function validate () {
		var flag = true
		var userInfo = $("#userInfo").hasClass("formSuccessInfo")
		var passInfo = $("#passInfo").hasClass("formSuccessInfo")
		var repassInfo = $("#repassInfo").hasClass("formSuccessInfo")
		var emailInfo = $("#emailInfo").hasClass("formSuccessInfo")
		var verifyInfo = $("#verifyInfo").hasClass("formSuccessInfo")

		verify.blur()

		if (!userInfo) {
			name.blur()
			flag = false
		}
		if (!passInfo) {
			pass.blur()
			flag = false
		}
		if (!repassInfo) {
			repass.blur()
			flag = false
		}
		if (!emailInfo) {
			email.blur()
			flag = false
		}
		if (!verifyInfo) {
			flag = false
		} else {
			return true
		}
		if (flag === false) {
			$("#reloadVerify").click()
		}
	}

	/* 验证用户名 */
	$("input[name=username]").blur(function () {
		var iVal = $(this).val()
		var oU = $("#userInfo")
		if (iVal == '') {
			showInfo(oU, "请输入用户名")
			return false
		} else if (!name_reg.test(iVal)) {
			showInfo(oU, "禁止输入@!*空格等字符")
			return false
		}
		else if (iVal.length < 4 || iVal.length > 15) {
			showInfo(oU, "长度为4~15个字符")
			return false
		}
		$.post(url, {type: "username", username: iVal}, function (data) {
			if (data.status === 1) {
				showInfo(oU, "　", "true")
			} else {
				showInfo(oU, data.info)
			}
		}, "json")
	})

	/* 验证密码 */
	$("input[name=password]").blur(function () {
		var iVal = $(this).val()
		var oP = $("#passInfo")
		if (iVal == '') {
			showInfo(oP, "请输入密码")
			return false
		} else if (iVal.length < 6) {
			showInfo(oP, "长度不小于6位")
			return false
		} else {
			showInfo(oP, "　", "true")
		}
	})

	/* 验证确认密码 */
	$("input[name=repassword]").blur(function () {
		var val = $("input[name=password]").val()
		var iVal = $(this).val()
		var oR = $("#repassInfo")
		if (iVal == '') {
			showInfo(oR, "请输入确认密码")
		}else if (iVal !== val) {
			showInfo(oR, "密码不一致")
		}else {
			showInfo(oR, "　", "true")
		}
	})

	/* 验证邮箱 */
	$("input[name=email]").blur(function () {
		var iVal = $(this).val()
		var oE = $("#emailInfo")
		if ( iVal == '') {
			showInfo(oE, "请输入电子邮箱")
			return false
		}
		if (!email_reg.test(iVal)) {
			showInfo(oE, "错误的邮箱格式")
			return false
		}
		$.post(url, {type: "email", email: iVal}, function (data) {
			if (data.status === 1) {
				showInfo(oE, "　", "true")
			} else {
				showInfo(oE, data.info)
			}
		}, "json")
	})

	/* 检测验证码 */
	$("input[name=verify]").blur(function () {
		var iVal = $(this).val()
		var oV = $("#verifyInfo")
		if (iVal == '') {
			showInfo(oV, "请输入验证码")
			return false
		}
		if (iVal.length <4) {
			showInfo(oV, "验证码错误")
			return false
		} else if (iVal.length == 4) {
			$.post(url, {type: "verify", verify: iVal}, function (data) {
				if (data.status === 1) {
					showInfo(oV, "　", "true")
				} else {
					showInfo(oV, data.info);
				}
			}, "json")
		}
	})

	/* 显示验证信息 */
	function showInfo (obj, info = "* 未知错误！请联系管理员！", type = "false") {
		$(obj).text(info)
		input = $(obj).parent("td").prev("td").find("input")
		if(type === "true") {
			input.removeClass("formErrorInput")
			$(obj).attr("class", "formSuccessInfo")
		} else {
			input.addClass("formErrorInput")
			$(obj).attr("class", "formErrorInfo")
		}
	}
})
