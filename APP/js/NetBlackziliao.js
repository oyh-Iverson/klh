var app = new Vue({
	el: '#NetBlackziliao',
	data: {
		uername: "", //名字
		uerIpName: "", //身份证
		uerPhon: "", //手机号
		isActive: true, //打钩
		code: "",
		timeStamp:"",
		nonceStr:"",
		signType:"",
		wxpackage:"",
		paySign:"",
		riskInfoApplyID:"",
		
	},
	mounted: function() {
		var self = this;
		self.uerPhon = window.localStorage.getItem("userPhone");
		//window.localStorage.removeItem("riskInfoApplyID");
		//console.log(self.uerPhon);
		function isWeiXin() {
			var ua = window.navigator.userAgent.toLowerCase();
			//console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
			if(ua.match(/MicroMessenger/i) == 'micromessenger') {
				return true;
			} else {
				return false;
			}
		};
		if(isWeiXin()) {
			if(this.getQueryString('code') !== null && this.getQueryString('code') !== "") {
				var self = this;
				self.code = self.getQueryString('code');
				console.log(self.code);

			} else {
				var uri = Util.baseUrl1 + "/dkdk/APP/template/NetBlackziliao.html";
				var weixinURL = "https://open.weixin.qq.com/connect/oauth2/authorize" +
					"?appid=wxa0bb575ddd8a8b11" +
					"&redirect_uri=" + encodeURIComponent(uri) +
					"&response_type=code" +
					"&scope=snsapi_base" +
					"&state=123&connect_redirect=1#wechat_redirect";
				window.location.href = weixinURL;
				console.log(self.code);

			}
			console.log(" 是来自微信内置浏览器")
		} else {
			console.log("不是来自微信内置浏览器")
		};

	},
	methods: {

		//获取连接
		getQueryString(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return decodeURI(r[2]);
			return null;
		},

		//返回键
		GoBack: function() {
			window.location.href = "NetBlack.html";
		},
		//协议
		Agreement: function(event) {
			event.stopPropagation();
			window.location.href = "Agreement.html";
		},
		//报告
	 	lishibaog:function(){
	 		window.location.href="Credithistory.html";
	 	},
		//样本报告
	 	yangbenbaogao:function(){
	 		window.location.href="Report3.html";
	 				//console.log("1111");
	 	},
		//支付弹框
		GoOk: function() {
			var self = this;
			function isWeiXin() {
				var ua = window.navigator.userAgent.toLowerCase();
					if(ua.match(/MicroMessenger/i) == 'micromessenger') {
							return true;
					} else {
						return false;
					}
			};
			if(isWeiXin()) {
					//self.onBridgeReady();
					self.weixinzhifu();
					//alert(" 是来自微信内置浏览器")
			} else {
				var buttons1 = [
        			{
          				text: '请选择',
          				label: true
       				 },
       				{
          				text: '微信支付',
          				bold: true,
         				color: 'danger',
          				onClick: function() {
           				self.weixinzhifu();
          				}
        			},
        {
          text: '支付宝支付',
          onClick: function() {
            //$.alert("支付宝支付");
            self.zhifubaozhifu();
          }
        }
      ];
      var buttons2 = [
        {
          text: '取消',
          bg: 'danger'
        }
      ];
      var groups = [buttons1, buttons2];
      $.actions(groups);
					//alert("不是来自微信内置浏览器")
			}
			 
		},
		
		//微信支付
		weixinzhifu() {
			var self = this;			
			var idName = self.uername;
			var idNumber = self.uerIpName;
			var userPhone = self.uerPhon;
			var payType = "0";
			var wxcode = self.code;
			console.log(wxcode);
			var urlStr = Util.baseUrl + '/DuG/api/risk/riskManange/createUserRiskInfo.do';
			var md5Str = Util.basekey +
				idName +
				idNumber +
				userPhone +
				wxcode +
				payType;
			if(idName == "") {
				$.toast('名字不能为空');
			} else if(idNumber == ""||idNumber.length<18) {
				$.toast('请正确填写身份证号码');
				//alert(idNumber.length);
			} else if(userPhone == ""||userPhone.length<11) {
				$.toast('请正确填写手机号');
				//alert(userPhone.length);
			} else if(self.isActive == false) {
				$.toast('请先阅读免责协议并打勾');
			} else {
				$.ajax({
					type: "post",
					url: urlStr,
					async: true,
					data: {
						key: Util.basekey,
						auth: Util.base32Encode('key,idName,idNumber,userPhone,wxcode,payType'),
						token: md5(md5Str),
						idName: idName,
						idNumber: idNumber,
						userPhone: userPhone,
						wxcode: wxcode,
						payType:payType
					},
					success: function(res) {
						var temp = JSON.parse(res);
						console.log(temp);
						if(temp.ret_code == "0") {
							//console.log(temp);
							if(wxcode != null && wxcode != "") {
								self.timeStamp = temp.ret_data.timeStamp;//时间戳
								self.nonceStr = temp.ret_data.nonceStr;//随机字符串
								self.signType = temp.ret_data.signType;//签名方式
								self.wxpackage = temp.ret_data.wxpackage;//prepay_id
								self.paySign = temp.ret_data.paySign;//签名
								self.riskInfoApplyID = temp.ret_data.riskInfoApplyID;								
								function isWeiXin() {
									var ua = window.navigator.userAgent.toLowerCase();
									if(ua.match(/MicroMessenger/i) == 'micromessenger') {
										return true;
									} else {
										return false;
									}
								};
								if(isWeiXin()) {
									self.onBridgeReady();
									console.log(" 是来自微信内置浏览器")
								} else {
									console.log("不是来自微信内置浏览器")
								}
							} else {
								console.log(temp);
								var urls = temp.ret_data.mweb_url;
								//window.localStorage.setItem("riskInfoApplyID",temp.ret_data.riskInfoApplyID);
								//console.log(urls);
								window.location.href = urls;
								//alert("走了？")
							}
						} else {
							$.toast(temp.ret_msg);
						}
					},
					error: function(res) {
						$.toast('网路请求失败，请稍后重试');
					}
				});
			}
		},
		//支付宝支付
		zhifubaozhifu() {
			var self = this;			
			var idName = self.uername;
			var idNumber = self.uerIpName;
			var userPhone = self.uerPhon;
			var payType = "1";
			var wxcode = self.code;
			var urlStr = Util.baseUrl + '/DuG/api/risk/riskManange/createUserRiskInfo.do';
			var md5Str = Util.basekey +
				idName +
				idNumber +
				userPhone +
				wxcode+
				payType;
			if(idName == "") {
				$.toast('名字不能为空');
			} else if(idNumber == ""||idNumber.length<18) {
				$.toast('请正确填写身份证号码');
				
			} else if(userPhone == ""||userPhone.length<11) {
				$.toast('请正确填写手机号');
				
			} else if(self.isActive == false) {
				$.toast('请先阅读免责协议并打勾');
			} else {
				$.ajax({
					type: "post",
					url: urlStr,
					async: true,
					data: {
						key: Util.basekey,
						auth: Util.base32Encode('key,idName,idNumber,userPhone,wxcode,payType'),
						token: md5(md5Str),
						idName: idName,
						idNumber: idNumber,
						userPhone: userPhone,
						wxcode: wxcode,
						payType:payType
					},
					success: function(res) {
						var temp = JSON.parse(res);
						//console.log(temp);
						if(temp.ret_code == "0") {
							//console.log(temp);
							if(wxcode != null && wxcode != "") {
								self.timeStamp = temp.ret_data.timeStamp;//时间戳
								self.nonceStr = temp.ret_data.nonceStr;//随机字符串
								self.signType = temp.ret_data.signType;//签名方式
								self.wxpackage = temp.ret_data.wxpackage;//prepay_id
								self.paySign = temp.ret_data.paySign;//签名
								self.riskInfoApplyID = temp.ret_data.riskInfoApplyID;
								
								function isWeiXin() {
									var ua = window.navigator.userAgent.toLowerCase();
									if(ua.match(/MicroMessenger/i) == 'micromessenger') {
										return true;
									} else {
										return false;
									}
								};
								if(isWeiXin()) {
									self.onBridgeReady();
									console.log(" 是来自微信内置浏览器")
								} else {
									console.log("不是来自微信内置浏览器")
								}
							} else {
								console.log(temp);
								var urls = temp.ret_data.mweb_url;
								//window.localStorage.setItem("riskInfoApplyID",temp.ret_data.riskInfoApplyID);
								console.log(urls);
								var div = document.createElement('div');
								div.innerHTML = urls;
								document.body.appendChild(div);
								document.forms[0].submit();
								//window.location.href = urls;
							}
						} else {
							$.toast(temp.ret_msg);
						}
					},
					error: function(res) {
						$.toast('网路请求失败，请稍后重试');
					}
				});
			}
		},
		onBridgeReady() {
			var self = this;
			var timeStamp =  self.timeStamp;//时间戳
		 	var nonceStr =self.nonceStr;//随机字符串
			var signType =self.signType;//签名方式
			var wxpackage =self.wxpackage;//prepay_id
			var paySign =self.paySign;//签名
			var riskInfoApplyID = self.riskInfoApplyID;
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						"appId": "wxa0bb575ddd8a8b11", //公众号名称，由商户传入     
						"timeStamp": timeStamp, //时间戳，自1970年以来的秒数     
						"nonceStr": nonceStr, //随机串     
						"package": wxpackage,
						"signType": signType, //微信签名方式：     
						"paySign": paySign //微信签名 
					},
					function(res) {
						if(res.err_msg == "get_brand_wcpay_request:ok") {							
							window.location.href= "Report2.html?riskInfoApplyID="+riskInfoApplyID;
							// 使用以上方式判断前端返回,微信团队郑重提示：
							//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
						}else if(res.err_msg == "get_brand_wcpay_request:cancel"){
							//alert("支付取消");
							window.location.href = "NetBlack.html";
						}else{
							window.location.href = "NetBlack.html";
							//alert("支付失败");
						}
					});
		},
		actives: function() {
			var self = this;
			self.isActive = !self.isActive;
		}
	},
});