$(document).ready(function(){

	/**
	author:peach
	time:2013-06-22
	page:addSelect
	content:addSelect页面的滚动选择部分
	*/

	var scrollBox = $(".markSelectScrollBox");
	if(scrollBox.html() != undefined){
		var scrollLi = $(".markSelectScrollBox ul:eq(0) li");
		var markSelectScrollTimer1;
		var markSelectScrollTimer2;
		scrollLi.mouseover(function(){
			var tempThis = $(this);
			clearTimeout(markSelectScrollTimer1);
			markSelectScrollTimer1 = setTimeout(function(){
				tempThis.stop(true).animate({"marginRight":"130"});
				tempThis.parent().stop(true).animate({"marginLeft":-20*(tempThis.index())});
			},10);
		});
		scrollLi.mouseleave(function(){
			var tempThis = $(this);
			clearTimeout(markSelectScrollTimer2);
			markSelectScrollTimer2 = setTimeout(function(){
				tempThis.stop(true).animate({"marginLeft":"0","marginRight":"-85"});
				tempThis.parent().stop(true).animate({"marginLeft":0});
			},10);
		});
		
	}


	/**
	author:peach
	time:2013-06-22
	page:markAdd
	content:Add页面的伪表单控件部分
	*/


	//如果有select则为select启用select伪表单控件
	if($("#selectOptionRepay").html() != undefined)
		$("#selectOptionRepay").SelectOption({"selectWidth":110,"isForForm":true});
	if($("#selectOptionReward").html() != undefined)
		$("#selectOptionReward").SelectOption({"selectWidth":110,"isForForm":true});
	if($("#selectOptionMaxAmount").html() != undefined)
		$("#selectOptionMaxAmount").SelectOption({"selectWidth":90,"isForForm":true});
	if($("#selectOptionAmountLimit").html() != undefined)
		$("#selectOptionAmountLimit").SelectOption({"selectWidth":110,"isForForm":true});

	/**
	author:peach
	time:2013-06-22
	page:markAdd
	content:Add页面的年月日切换选择时间部分
	*/


	var markAddTimeType = $("#markAddTimeTypeSelect");
	var markAddTimeNum = $("#markAddTimeSelectNum");

	if(markAddTimeType.html() != undefined){
		//第一次初始化将值设为N“月”
		markAddTimeNum.html(getOption(12, 30));
		markAddTimeNum.SelectOption({"selectWidth":50,"isForForm":true});
		markAddTimeType.SelectOption({"selectWidth":70});
	}

	/**
	author:peach
	time:2013-06-22
	page:add
	content:add页面的验证部分
	*/

	function getRedInfo(str){
		return "<font color='red'>* " + str + "</font>"
	}
	$("#needCheckForm").submit(function(){
		var flag = true;
		if(!checkIsNum($("#intAmountCheck"))){
			flag = false;
			$("#intAmountCheck").next().html(getRedInfo("请输入合理金额"));
		}else{
			$("#intAmountCheck").next().html("");
		}
		if(!checkIsDoNum($("#floatAprCheck")) || $("#floatAprCheck").val() > 26 || $("#floatAprCheck").val() < 0){
			flag = false;
			$("#floatAprCheck").next().html(getRedInfo("请输入合理利率"));
		}else{
			$("#floatAprCheck").next().html("");
		}
		if(!checkIsNull($("#stringTitleCheck"))){
			flag = false;
			$("#stringTitleCheck").next().html(getRedInfo("请输入标题"));
		}else{
			$("#stringTitleCheck").next().html("");
		}
		if(!checkIsNum($("#intMinAmountCheck")) || $("#intMinAmountCheck").val() < 50){
			flag = false;
			$("#intMinAmountCheck").next().html(getRedInfo("请输入合理金额"));
		}else{
			$("#intMinAmountCheck").next().html("");
		}
		if($("#markAddRewardInput").attr("class").indexOf("needStep")!=-1)
			if(!checkIsDoNum($("#markAddRewardInput")) || $("#markAddRewardInput").val()<=0){
				flag = false;
				$("#markAddRewardInput").next().next().html(getRedInfo("请输入合理奖励"));
			}else{
				$("#markAddRewardInput").next().next().html("");
			}
		// 临时提交作用，后面记得删除
		if($("#tempEditorInput").html()==undefined){
			var tempEditorInput = $("<input id='tempEditorInput' name='info' type='hidden'>");
			$(this).append(tempEditorInput);
		}
		$("#tempEditorInput").val($("#borrowEditor").html());
		// 临时提交作用，后面记得删除
		return flag;
	});

	/**
	author:peach
	time:2013-06-22
	page:add
	content:add页面的进度指示部分
	*/

	var oStepFinish = $(".creditStepFinish").last();
	var oStepPer = oStepFinish.find(".credirPer:eq(0)");
	var oStepInfo = oStepFinish.find(".creditStepInfo:eq(0)");
	oStepInfo.css("opacity",0);
	oStepPer.css("width",0).animate({"width":320},800,function(){
		oStepInfo.animate({"opacity":1},500);
	});


	/**
	author: NSDont
	time:2013-09-04
	page:borrow_list.html
	content:判断当前borrow是哪个筛选状态
	*/
	var title_triangle = $(".titleTriangle");
	var url_Str_Borrow = window.location.href;
	var now_Borrow_Status = 0
	if(url_Str_Borrow.indexOf("/running/")!=-1)
		now_Borrow_Status = 0;
	else if(url_Str_Borrow.indexOf("/done/")!=-1)
		now_Borrow_Status = 1;
	title_triangle.eq(now_Borrow_Status).parent().addClass("SelectMiddleTitle")
	title_triangle.eq(now_Borrow_Status).parent().removeClass("noSelectMiddleTitle")
	

	//获取到页面上所有的信息输入域
	var allStepInput = $(".needStep");
	//将进度条的宽度设置为0，并将透明度设置为1
	$(".credirPer:eq(1)").css({"width":0,"opacity":1})

	//每当输入域切换焦点的时候就检测当前的表单输入进度，并改变进度条宽度
	allStepInput.blur(function(){
		var targetWidth = checkStep();
		$(".credirPer:eq(1)").animate({"width":targetWidth},500,function(){
			if(targetWidth == 320){
				$(".creditStepInfo:eq(1)").animate({"opacity":1},500);
			}
		});
	});

	function checkStep(){
		var per = 0;
		allStepInput.each(function(){
			if($(this).val()!=""&&$(this).val()!=undefined){
				per++;
			}
		});
		return per/allStepInput.size()*320;
	}

	/*
	* time: 2013-07-08
	* author: Peach
	* content: detail页面的左导航部分
	*/
	var leftNav = $("#leftFloatNav");
	if(leftNav.html()!=undefined){
		var edgeTop = leftNav.offset().top;

		$(window).scroll(function(){
			if($(document).scrollTop() >= edgeTop - 10){
				leftNav.css({"position":"fixed","top":10});
			}else{
				leftNav.css({"position":"absolute","top":0});
			}
		});

		var allTarget = $(".detailMenuTarget");
		//如果不是detail页面则不设置锚点滚动
		if(allTarget.eq(0).html()!=undefined){
			var allLeftMenu = $("#detailMenu li");
			var menuScroll = false;  //设置一个标记判断当前是点击导航滚动还是鼠标滚动

			allLeftMenu.click(function(){
				$(this).addClass("current").siblings().removeClass("current");
				menuScroll = true;
				$("body,html").animate({"scrollTop":allTarget.eq($(this).index()).offset().top-80},500,function(){
					menuScroll = false;
				});
			});
		}
	}

	/**
	author:peach
	time:2013-07-08
	page:markDetail
	content:detail页面的投标记录部分
	*/

	var allInvestList = $(".tableDetailList:eq(0)");
	var allInvestTr = allInvestList.find("tr");

	allInvestList.find("tr:even").css("backgroundColor","#F6F6F6");
	allInvestList.find("tr:odd").css("backgroundColor","#FFF");
	allInvestTr.mouseover(function(){
		$(this).css("backgroundColor","#F0F0F0");
	});
	allInvestTr.mouseleave(function(){
		if($(this).index()%2==0)
			$(this).css("backgroundColor","#F6F6F6");
		else
			$(this).css("backgroundColor","#FFF");

	});

	/**
	author:peach
	time:2013-07-12
	page:markDetail
	content:detail页面的投标确认弹出部分
	*/

	var tenderBtn = $("#detailTenderBtn");
	var tempTenderNum = $("<span style='color:#F60;'></span>");
	var tenderConfirm = $("<p style='padding:20px;font-size:12px'>投标后将不可撤销！！您确定投标</p>");
	var tenderMax = $("#detailTenderBox p:eq(0)");
	var tempMaxTender = tenderMax.html();

	if(tenderBtn.html() != undefined){
		if(tenderBtn.attr("disabled")=="disabled"){
			var fullTenderBoxy = tenderBtn.boxyPlug({"title":"投标提示","type":"confirm","boxyWidth":420});
			fullTenderBoxy.setBoxyContent("<p style='padding:20px;font-size:12px'>改标已结束融资，不能投标！</p>");
		}else{
			var tenderInputBox = null;
			//绑定弹出层插件
			var tenderBoxy = tenderBtn.boxyPlug({"title":"确认投标","type":"confirm","boxyWidth":420,
				"callback1":function(){
					if($("#detailTenderCode").val() != undefined){
						$("#detailTenderCode").val($("#tenderDialogTempInput").val());
					} //如果需要输入密码则先将密码取出再进行表单提交
					if($("#detailTenderPwd").val() != undefined){
						$("#detailTenderPwd").val($("#tenderDialogTempInput1").val());
					} //如果需要输入支付密码则先将密码取出再进行表单提交
					$("#detailTenderForm").submit();
				},
				"callback2":function(){if($("#detailTenderNum").html()!=undefined){tenderInputBox.val("");tenderBoxy.setBoxyIsRun(false);}else{tenderInputBox.val(1)};}});
			//设置弹出层的内容
			tenderConfirm.append(tempTenderNum);

			if($("#detailTenderNum").html()!=undefined){
				tenderConfirm.append("元吗？");
				tenderInputBox = $("#detailTenderNum");
				tenderInputBox.keydown(function(e) {
					var keyEv = e || event;
					var keyCode = keyEv.keyCode;
					if(keyCode == 13) {
						keyEv.preventDefault();
					}
				});
				tenderInputBox.keyup(function(e){
					var keyEv = e || event;
					var keyCode = keyEv.keyCode;
					if($.trim($(this).val()) == "" || $.trim($(this).val()) == "0.0"){
						tenderBoxy.setBoxyIsRun(false);
						tenderMax.html(tempMaxTender);
					}else if($.trim(tenderInputBox.val()) <=0){
						tenderBoxy.setBoxyIsRun(false);
						tenderMax.html("金额必须大于0！");
					}else{
						var tempBool = true;
						if(!checkIsDoNum($(this))){
							tenderMax.html("请输入数字(精确到一位)！");
							tempBool = false;
						}else{
							tempTenderNum.html($(this).val());
							tenderMax.html(tempMaxTender);
						}
						tenderBoxy.setBoxyIsRun(tempBool);
					}
					if(keyCode == 13){
						tenderBoxy.showBoxyNow();
					}
				});
			}else{
				tenderConfirm.append("份吗？");
				tenderInputBox = $("#flowCopiesInput");
				tenderInputBox.keydown(function(e) {
					var keyEv = e || event;
					var keyCode = keyEv.keyCode;
					if(keyCode == 13) {
						keyEv.preventDefault();
					}
				});
				tenderInputBox.keyup(function(e){
					var keyEv = e || event;
					var keyCode = keyEv.keyCode;
					if($.trim($(this).val()) == "" || $.trim($(this).val()) == "0"){
						tenderBoxy.setBoxyIsRun(false);
						tenderMax.html(tempMaxTender);
					}else if($.trim(tenderInputBox.val()) <=0){
						tenderBoxy.setBoxyIsRun(false);
						tenderMax.html("份数必须大于0！");
					}else{
						var tempBool = true;
						if(!checkIsNum($(this))){
							tenderMax.html("请输入整数！");
							tempBool = false;
						}else{
							tempTenderNum.html($(this).val());
							tenderMax.html(tempMaxTender);
						}
						tenderBoxy.setBoxyIsRun(tempBool);
					}
					if(keyCode == 13){
						tenderBoxy.showBoxyNow();
					}
				});

				//如果是流转标则加上份数增减部分				

				/**
				author:peach
				time:2013-08-14
				page:markDetail
				content:流转标detail页面的份数增减部分
				*/

				var addFlow = $("#addFlowCopies");
				var minuFlow = $("#minuFlowCopies");
				var flowCopiesInput = $("#flowCopiesInput");

				addFlow.click(function(){
					flowCopiesInput.val(Math.floor(flowCopiesInput.val())+1);
					tempTenderNum.html(flowCopiesInput.val());
				});
				minuFlow.click(function(){
					if(Math.floor(flowCopiesInput.val())-1>0){
						flowCopiesInput.val(Math.floor(flowCopiesInput.val())-1);
						tempTenderNum.html(flowCopiesInput.val());
					}
				});
			}
			if($("#detailTenderCode").val() != undefined){
				tenderConfirm.append("<br><br>");
				tenderConfirm.append("请输入定向密码以确保账户安全：<input type='password' id='tenderDialogTempInput' class='pageTextInput'>");
			}
			if($("#detailTenderPwd").val() != undefined){
				tenderConfirm.append("<br><br>");
				tenderConfirm.append("请输入支付密码以确保账户安全：<input type='password' id='tenderDialogTempInput1' class='pageTextInput'>");
			}
			tenderBoxy.setBoxyContent(tenderConfirm);

			//如果是流转标，则允许页面加载完成就投标，反之不允许
			if($("#detailTenderNum").html()!=undefined)
				tenderBoxy.setBoxyIsRun(false);
			else
				tempTenderNum.html(tenderInputBox.val());


			tenderBtn.click(function(){
				if($.trim(tenderInputBox.val()) == "" || $.trim(tenderInputBox.val()) == "0.0")
					tenderMax.html("请输入投标金额！");
				else if($.trim(tenderInputBox.val()) <=0){
					tenderMax.html("金额必须大于0！");
				}else if(!checkIsDoNum(tenderInputBox)){
					if($("#detailTenderNum").html()!=undefined)
						tenderMax.html("请输入数字(精确到一位)！");
					else
						if(!checkIsNum(tenderInputBox))
							tenderMax.html("请输入整数！");
				}else{
					tenderBoxy.setBoxyIsRun(true);
				}
			});
		}

	}
	
	/**
	author:peach
	time:2013-08-14
	page:markAdd
	content:发标页面的添加图片部分
	*/

	var addBtn = $("#addImageBox span:eq(0)");
	var addBox = $("#addImageBox");
	var imageName = 2;

	addBtn.click(function(){
		var tr = $("<tr>");
		var td = $("<td>");
		var fileTd = $("<td>");
		var file = $("<input type='file'>");
		file.attr("name","image"+imageName++);
		fileTd.append(file);
		tr.append(td).append(fileTd);
		addBox.before(tr);
	});
	/**
	author:peach
	time:2013-09-05
	page:add
	content:add页面金额大写显示部分
	*/

	var chinaMoney = $("#intMinAmountCheck");
	if(chinaMoney.html()!=undefined){
		var chinaShowBox = $("<span></span>");
		chinaShowBox.css({"padding":"5px 10px","backgroundColor":"#FFF",
			"border":"1px solid #EEE","font-size":"14px","color":"#F60",
			"position":"absolute","top":chinaMoney.offset().top-10,
			"left":chinaMoney.offset().left,"max-width":220,
			"z-index":1000,"display":"none"}).hide();
		$("body").append(chinaShowBox);

		chinaMoney.keyup(function(){
			if(chinaMoney.val()!=""){
				chinaShowBox.html(AmountInWords(chinaMoney.val())).show()
					.css({"marginTop":-chinaShowBox.innerHeight()});
			}else{
				chinaShowBox.hide();
			}
		});
	}

	function AmountInWords(dValue, maxDec) 
	{
	// 验证输入金额数值或数值字符串：
	dValue = dValue.toString().replace(/,/g, ""); dValue = dValue.replace(/^0+/, "");      // 金额数值转字符、移除逗号、移除前导零
	if (dValue == "") { return "零元整"; }      // （错误：金额为空！）
	else if (isNaN(dValue)) { return "错误：金额不是合法的数值！"; } 

	var minus = "";                             // 负数的符号“-”的大写：“负”字。可自定义字符，如“（负）”。
	var CN_SYMBOL = "";                         // 币种名称（如“人民币”，默认空）
	if (dValue.length > 1)
	{
	if (dValue.indexOf('-') == 0) { dValue = dValue.replace("-", ""); minus = "负"; }   // 处理负数符号“-”
	if (dValue.indexOf('+') == 0) { dValue = dValue.replace("+", ""); }                 // 处理前导正数符号“+”（无实际意义）
	}

	// 变量定义：
	var vInt = ""; var vDec = "";               // 字符串：金额的整数部分、小数部分
	var resAIW;                                 // 字符串：要输出的结果
	var parts;                                  // 数组（整数部分.小数部分），length=1时则仅为整数。
	var digits, radices, bigRadices, decimals; // 数组：数字（0~9——零~玖）；基（十进制记数系统中每个数字位的基是10——拾,佰,仟）；大基（万,亿,兆,京,垓,杼,穰,沟,涧,正）；辅币 （元以下，角/分/厘/毫/丝）。
	var zeroCount;                              // 零计数
	var i, p, d;                                // 循环因子；前一位数字；当前位数字。
	var quotient, modulus;                      // 整数部分计算用：商数、模数。
	    // 金额数值转换为字符，分割整数部分和小数部分：整数、小数分开来搞（小数部分有可能四舍五入后对整数部分有进位）。
	var NoneDecLen = (typeof(maxDec) == "undefined" || maxDec == null || Number(maxDec)
	< 0 || Number(maxDec) >
		5);     // 是否未指定有效小数位（true/false）
	parts = dValue.split('.');                      // 数组赋值：（整数部分.小数部分），Array的length=1则仅为整数。
	if (parts.length > 1) 
	{
	vInt = parts[0]; vDec = parts[1];           // 变量赋值：金额的整数部分、小数部分

	if(NoneDecLen) { maxDec = vDec.length > 5 ? 5 : vDec.length; }                                  // 未指定有效小数位参数值时，自动取实际小数位长但不超5。
	var rDec = Number("0." + vDec);     
	rDec *= Math.pow(10, maxDec); rDec = Math.round(Math.abs(rDec)); rDec /= Math.pow(10, maxDec); // 小数四舍五入
	var aIntDec = rDec.toString().split('.');
	if(Number(aIntDec[0]) == 1) { vInt = (Number(vInt) + 1).toString(); }                           // 小数部分四舍五入后有可能向整数部分的个位进位（值1）
	if(aIntDec.length > 1) { vDec = aIntDec[1]; } else { vDec = ""; }
	}
	else { vInt = dValue; vDec = ""; if(NoneDecLen) { maxDec = 0; } } 
	if(vInt.length > 44) { return "错误：金额值太大了！整数位长【" + vInt.length.toString() + "】超过了上限——44位/千正/10^43（注：1正=1万涧=1亿亿亿亿亿，10^40）！"; }

	// 准备各字符数组 Prepare the characters corresponding to the digits:
	digits = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖");         // 零~玖
	radices = new Array("", "拾", "佰", "仟");                                              // 拾,佰,仟
	bigRadices = new Array("", "万", "亿", "兆", "京", "垓", "杼", "穰" ,"沟", "涧", "正"); // 万,亿,兆,京,垓,杼,穰,沟,涧,正
	decimals = new Array("角", "分", "厘", "毫", "丝");                                     // 角/分/厘/毫/丝

	resAIW = ""; // 开始处理

	// 处理整数部分（如果有）
	if (Number(vInt) > 0) 
	{
	zeroCount = 0;
	for (i = 0; i
		< vInt.length; i++) 
	{
	p = vInt.length - i - 1; d = vInt.substr(i, 1); quotient = p / 4; modulus = p % 4;
	if (d == "0") { zeroCount++; }
	else 
	{
	if (zeroCount >
			0) { resAIW += digits[0]; }
	zeroCount = 0; resAIW += digits[Number(d)] + radices[modulus];
	}
	if (modulus == 0 && zeroCount < 4) { resAIW += bigRadices[quotient]; }
	}
	resAIW += "元";
	}

	// 处理小数部分（如果有）
	for (i = 0; i < vDec.length; i++) { d = vDec.substr(i, 1); if (d != "0") { resAIW += digits[Number(d)] + decimals[i]; } }

	// 处理结果
	if (resAIW == "") { resAIW = "零" + "元"; }     // 零元
	if (vDec == "") { resAIW += "整"; }             // ...元整
	resAIW = CN_SYMBOL + minus + resAIW;            // 人民币/负......元角分/整
	return resAIW;
	}
});

/*期限option生成函数*/

function getOption(num, times){
	var temp = "";
	for(var i=1;i<=num;i++){
		temp += "<option value='" + (i*times) + 
			"'>" + i + "</option>";
	}
	
	return temp;
}
/*期限切换函数*/
function changeTimeSelect(obj, type){
	var tempParent = $(obj).parent().parent();
	tempParent.next().remove();
	var newTimeSelect = $("<select name='days'></select>");
	if(type == 1)
		newTimeSelect.html(getOption(30, 1));
	else if(type == 2)
		newTimeSelect.html(getOption(12, 30));
	else if(type == 3)
		newTimeSelect.html(getOption(10, 360));
	tempParent.after(newTimeSelect);
	tempParent.after(" ");
	newTimeSelect.SelectOption({"selectWidth":50,"isForForm":true});
}
/*奖励方式切换函数*/
function changeRewardInput(type){
	if(type == null){
		$("#markAddRewardInput").val("").removeClass("needStep").hide().next().html("");
	}
	else if(type == "val"){
		$("#markAddRewardInput").val("").addClass("needStep").show().next().html("元");
	}
	else if(type == "per"){
		$("#markAddRewardInput").val("").addClass("needStep").show().next().html("% ");
	}else{
		console.log("错误的还款方式参数！");
	}
}