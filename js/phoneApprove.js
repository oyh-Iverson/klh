
    var app = new Vue({
        el: '#phoneApprove',
        data: {
        	step:2,
        	city: "",
			userInfo: {
				proFession: {
					 	label: '请选择',
						value: '',
						classNa: 'line_select'
				},// 职业    
				realWage: {
					 	label: '请选择',
						value: '',
						classNa: 'line_select'
				},// 薪资    
				shebao: {
					 	label: '请选择',
						value: '',
						classNa: 'line_select'
				},// 社保    
				gongjijin: {
					 	label: '请选择',
						value: '',
						classNa: 'line_select'
				},// 公积金    
				shouxian: {
					 	label: '请选择',
						value: '',
						classNa: 'line_select'
				},// 寿险   
				city: {
					 	label: '请选择',
						value: '',
						classNa: 'line_select'
				},// 城市   
			},
        },    
        mounted: function() {
        	//城市事件
        	var self = this;
     		$("#home-city").cityPicker({
				title: "",
 				showDistrict: false,
 				onChange: function (picker, values, displayValues) {
          			console.log(values, displayValues);
          			for(var i=0; i<displayValues.length;i++){
          				self.city = displayValues[1];
          			}
        		}
			})
        },
        methods: {
        	getTo(){       		
        			var self = this;
					var urlStr = Util.baseUrl + '/DuG/api/user/user/modifyUserInfo.do';
					var userId= window.localStorage.getItem("userId");
					var userId = userId;
					var profession = self.userInfo.proFession.value;
					var realWage = self.userInfo.realWage.value;
					var socialSecurity = self.userInfo.shebao.value;
					var accumulationFund = self.userInfo.gongjijin.value;
					var lifeInsurance = self.userInfo.shouxian.value;
					var city = self.city;	
					console.log(city);
					var step = self.step;
					var md5Str = Util.basekey 
										+ userId
										+ profession
										+ realWage
										+ socialSecurity
										+ accumulationFund
										+ lifeInsurance
										+ city
										+ step;
					if(profession == ""){
						$.toast('职业不能为空');
					}else {
						if(realWage == ""){
							$.toast('薪资不能为空');
						}else{
							if(socialSecurity == ""){
								$.toast('社保不能为空');
							}else{
								if(accumulationFund == ""){
									$.toast('公积金不能为空');
								}else{
									if(lifeInsurance == ""){
										$.toast('是否有寿险保单不能为空');
									}else{
										if(city == ""){
											$.toast('城市不能为空');
										}else{
											$.ajax({
												type:"get",
												url: urlStr,
												async:true,
												data: {
													userId:	userId,			                // 用户ID
													key: Util.basekey,
													auth: Util.base32Encode('key,userId,profession,realWage,socialSecurity,accumulationFund,lifeInsurance,city,step'),
													token: md5(md5Str),
													profession: profession,
													realWage: realWage,
													socialSecurity: socialSecurity,
													accumulationFund: accumulationFund,
													lifeInsurance: lifeInsurance,
													city: city,
													step: step,
												},
												success: function(res){	
													$.toast('提交成功');
													window.localStorage.setItem("profession",profession);
													setTimeout(function(){
														window.location.href="Verification.html";
													},2000)
												},
												error: function(res){
													$.toast('网路请求失败，请稍后重试');
												}
											});
										}
									}
								}
							}
						}
					}
					
					
					
										
        		console.log("发出去了")
        	},
        	goback(){
        		window.location.href="Verification.html";
        	},
        	//点击职业
        	zhiyeClick: function(){
					var self = this;
					weui.picker([
						{
						    label: '工薪族',
						    value: 1,
						    classNa: 'line_select_active'
						},
						{
						    label: '公务员',
						    value: 2,
						    classNa: 'line_select_active'
						},
						{
						    label: '自雇',
						    value: 3,
						    classNa: 'line_select_active'
						},{
						    label: '其他',
						    value: 4,
						    classNa: 'line_select_active'
						},{
						    label: '个体户',
						    value: 5,
						    classNa: 'line_select_active'
						},{
						    label: '企业主',
						    value: 6,
						    classNa: 'line_select_active'
						}],{
					   onConfirm: function (result) {
					   		self.userInfo.proFession = result[0];
					   },
					   id: 'singleLinePicker'
					});
			},
			//点击薪资
			monnyClick: function(){
					var self = this;
					weui.picker([
						{
						    label: '5000以下',
						    value: 1,
						    classNa: 'line_select_active'
						},
						{
						    label: '5000-10000',
						    value: 2,
						    classNa: 'line_select_active'
						},
						{
						    label: '10000-20000',
						    value: 3,
						    classNa: 'line_select_active'
						},{
						    label: '20000以上',
						    value: 4,
						    classNa: 'line_select_active'
						}],{
					   onConfirm: function (result) {
					   		self.userInfo.realWage = result[0];
					   },
					   id: 'singleLinePicker'
					});
			},
			//点击社保
			shebaoClick: function(){
					var self = this;
					weui.picker([
						{
						    label: '无社保',
						    value: 1,
						    classNa: 'line_select_active'
						},
						{
						    label: '半年内',
						    value: 2,
						    classNa: 'line_select_active'
						},
						{
						    label: '超半年',
						    value: 3,
						    classNa: 'line_select_active'
						}],{
					   onConfirm: function (result) {
					   		self.userInfo.shebao = result[0];
					   },
					   id: 'singleLinePicker'
					});
			},
			//点击公积金
			gongjijinClick: function(){
					var self = this;
					weui.picker([
						{
						    label: '无公积金',
						    value: 1,
						    classNa: 'line_select_active'
						},
						{
						    label: '半年内',
						    value: 2,
						    classNa: 'line_select_active'
						},
						{
						    label: '超半年',
						    value: 3,
						    classNa: 'line_select_active'
						}],{
					   onConfirm: function (result) {
					   		self.userInfo.gongjijin = result[0];
					   },
					   id: 'singleLinePicker'
					});
			},
			//点击寿险
			shouxianClick: function(){
					var self = this;
					weui.picker([
						{
						    label: '不详',
						    value: 0,
						    classNa: 'line_select_active'
						},
						{
						    label: '未投保',
						    value: 1,
						    classNa: 'line_select_active'
						},
						{
						    label: '投保未满两年',
						    value: 2,
						    classNa: 'line_select_active'
						},{
						    label: '投保满两年',
						    value: 3,
						    classNa: 'line_select_active'
						}],{
					   onConfirm: function (result) {
					   		self.userInfo.shouxian = result[0];
					   },
					   id: 'singleLinePicker'
					});
			},
//			//点击城市
//			cityClick: function(){
//					var self = this;
//					weui.cityPicker([
//						{
//						    label: '未投保',
//						    value: 1,
//						    classNa: 'line_select_active'
//						},
//						{
//						    label: '投保未满两年',
//						    value: 2,
//						    classNa: 'line_select_active'
//						},
//						{
//						    label: '投保满两年',
//						    value: 3,
//						    classNa: 'line_select_active'
//						}],{
//					   onConfirm: function (result) {
//					   		self.userInfo.cityClick = result[0];
//					   },
//					   id: 'singleLinePicker'
//					});
//			},
			
        },
    });
    
