
    var app = new Vue({
        el: '#Authentication',
        data: {
			userPhone: "",
			names: "",
			ipNumber: "",
			step:1,
			userInfo: {
				birthday: {
					 	label: '请选择',
						value: '请选择',
						classNa: 'line_select'
				},
				phoneRealName: {
					 	label: '请选择',
						value: '',
						classNa: 'line_select'
				},// 手机号码是否实名       1已实名认证小于6个月，2已实名认证大于6个月，3未实
				Sex: {
					 	label: '请选择',
						value: '',
						classNa: 'line_select'
				},// 性别     
				shengqingEdu: {
					 	label: '请选择',
						value: '',
						classNa: 'line_select'
				},// 申请额度    
				shengqingQixian: {
					 	label: '请选择',
						value: '',
						classNa: 'line_select'
				},// 申请额度    
			},
        },    
        mounted: function() {
          var self = this;
          //self.iphoneNumber();
        },
        methods: {        	       	
//      	iphoneNumber(){
//      		var self = this;
//      		var userPhone = window.localStorage.getItem("userPhone");
//      		self.userPhone = userPhone;
//      		
//      	},
        	getTo(){
        		var self = this;
        		var urlStr = Util.baseUrl + '/DuG/api/user/user/modifyUserInfo.do';
				var userId= window.localStorage.getItem("userId");
				var userId = userId;
				var phoneRealName = self.userInfo.phoneRealName.value; //手机号实名
				var idName = self.names; //姓名
				var idNumber = self.ipNumber; //身份证
				var birthday = self.userInfo.birthday.value;//生日
				var sex = self.userInfo.Sex.value; //性别
				var applyQuota = self.userInfo.shengqingEdu.label;//申请额度
				console.log(phoneRealName);
				var applyTerm = self.userInfo.shengqingQixian.label;//申请期限
				var step = self.step;
        		var md5Str = Util.basekey
							+ userId
							+ phoneRealName
							+ idName
							+ idNumber
							+ birthday
							+ sex
							+ applyQuota
							+ applyTerm
							+ step;
				if(phoneRealName == ""){
					$.toast('手机号实名不能为空');
				}else if(idName == ""){
					$.toast('姓名不能为空');
				}else if(idNumber == "" ){
					$.toast('身份证不能为空');
				}else if(birthday == "请选择"){
					$.toast('生日不能为空');
				}else if(sex == ""){
					$.toast('性别不能为空');
				}else if(applyQuota == "请选择"){
					$.toast('申请额度不能为空');
				}else if(applyTerm == "请选择"){
					$.toast('申请期限不能为空');
				}else {
						$.ajax({
							type:"get",
							url: urlStr,
							async:true,
							data: {
								userId:	userId,			                // 用户ID
								key: Util.basekey,
								auth: Util.base32Encode('key,userId,phoneRealName,idName,idNumber,birthday,sex,applyQuota,applyTerm,step'),
								token: md5(md5Str),
								phoneRealName: phoneRealName,
								idName: idName,
								idNumber: idNumber,
								birthday: birthday,
								sex: sex,
								applyQuota: applyQuota,
								applyTerm: applyTerm,
								step:self.step,
							},
							success: function(res){	
								$.toast('提交成功');
								console.log(res);
								window.localStorage.setItem("idNumber",idNumber);
								setTimeout(function(){
									window.location.href="Verification.html";
								},2000)
							},
							error: function(res){
								$.toast('网路请求失败，请稍后重试');
							}
						});
				}
        		
        	},
        	goback(){
        		window.location.href="Verification.html";
        	},
        	// 生日点击事件
			shengriClick: function(){
					var self = this;
					weui.datePicker({
					    start: 1900,
					    end: 2099,
					    defaultValue: [1990, 6, 15],
					    onConfirm: function(result){
					        var year_label = result[0].label;
					        var year_value = result[0].value;
					        var mouth_label = result[1].label;
					        var mouth_value = result[1].value;
					        var day_label = result[2].label;
					        var day_value = result[2].value;
					        self.userInfo.birthday = {
					        		label: year_label + '-' + mouth_label + '-' + day_label,
					        		value: year_value + '-' + mouth_value + '-' + day_value,
					        		classNa: 'line_select_active'
					        }
					    },
					    id: 'datePicker'
					});	
			},
			// 手机号实名点击事件
			telSmClick: function(){
					var self = this;
					weui.picker([
						{
						    label: '已实名认证小于6个月',
						    value: 1,
						    classNa: 'line_select_active'
						},
						{
						    label: '已实名认证大于6个月',
						    value: 2,
						    classNa: 'line_select_active'
						},
						{
						    label: '未实名认证',
						    value: 3,
						    classNa: 'line_select_active'
						}],{
					   onConfirm: function (result) {
					   		self.userInfo.phoneRealName = result[0];
					   },
					   id: 'singleLinePicker'
					});
			},
			SexClick: function(){
					var self = this;
					weui.picker([
						{
						    label: '男',
						    value: 1,
						    classNa: 'line_select_active'
						},
						{
						    label: '女',
						    value: 2,
						    classNa: 'line_select_active'
						}],{
					   onConfirm: function (result) {
					   		self.userInfo.Sex = result[0];
					   },
					   id: 'singleLinePicker'
					});
			},
			shengqingEduClick: function(){
					var self = this;
					weui.picker([
						{
						    label: '1000',
						    value: 1,
						    classNa: 'line_select_active'
						},
						{
						    label: '1000',
						    value: 2,
						    classNa: 'line_select_active'
						},{
						    label: '3000',
						    value: 3,
						    classNa: 'line_select_active'
						},{
						    label: '4000',
						    value: 4,
						    classNa: 'line_select_active'
						},{
						    label: '5000以上',
						    value: 5,
						    classNa: 'line_select_active'
						}],{
					   onConfirm: function (result) {
					   		self.userInfo.shengqingEdu = result[0];
					   },
					   id: 'singleLinePicker'
					});
			},
			shengqingQixianClick: function(){
					var self = this;
					weui.picker([
						{
						    label: '0-3个月',
						    value: 1,
						    classNa: 'line_select_active'
						},
						{
						    label: '3-6个月',
						    value: 2,
						    classNa: 'line_select_active'
						},{
						    label: '6-12个月',
						    value: 3,
						    classNa: 'line_select_active'
						},{
						    label: '36个月以上',
						    value: 4,
						    classNa: 'line_select_active'
						}],{
					   onConfirm: function (result) {
					   		self.userInfo.shengqingQixian = result[0];
					   },
					   id: 'singleLinePicker'
					});
			},
        },
    });
