
    var app = new Vue({
        el: '#Verification',
        data: {       	
			widthData: 0,
			VerificationMonny:0,
			nofinish:true,
			
			
        },    
        mounted: function() {
        	var self = this;
     		self.Verification();
     		
     		
        },
        methods: {
        Returns:function(){
        	window.location.href="home.html";
        },
        reloads(){
        	window.location.reload();
        },
        //回首页
        fanhuiqu:function(){
        	window.location.href="loans.html?largeLoan=0";
        },
         Authentication(){
         	window.location.href="Authentication.html";
         },
         phoneApprove(){
         	var idNumbers= window.localStorage.getItem("idNumber");
			var socialSecuritys = window.localStorage.getItem("socialSecurity");
			var isSmallLoans = window.localStorage.getItem("isSmallLoan");
			
         	if(idNumbers  == ""){
         		$.toast("请先认证身份");
         	}else{
         		window.location.href="phoneApprove.html";
         	}
         	
         },
         sesameApprove(){
         	var idNumbers= window.localStorage.getItem("idNumber");
			var socialSecuritys = window.localStorage.getItem("socialSecurity");
			var isSmallLoans = window.localStorage.getItem("isSmallLoan");
         	if(idNumbers == ""){
         		$.toast("请先认证身份");
         	}else if(socialSecuritys == ""){
         		$.toast("请先认证职业");
         	}else{
         		window.location.href="sesameApprove.html";
         	}
         	
         },
         
         Verification(){
         	var self = this;
					var urlStr = Util.baseUrl + '/DuG/api/user/user/findUserInfo.do';
					var userId= window.localStorage.getItem("userId");
					var userId = userId;
					var md5Str = Util.basekey + userId;
					var progress = document.getElementById("mt-progress-progress");		  
					$.ajax({
						type:"get",
						url: urlStr,
						async:true,
						data: {
							userId:	userId,			                // 用户ID
							key: Util.basekey,
							auth: Util.base32Encode('key,userId'),
							token: md5(md5Str)
						},
						success: function(res){							
							res = JSON.parse(res);							
							// 请求成功
							if (res.ret_code == '0') {
								console.log(res);
								console.log(res.ret_data.idName);
								
								var idNumber = res.ret_data.idNumber;
								localStorage.setItem("idNumber",res.ret_data.idNumber);
								localStorage.setItem("socialSecurity",res.ret_data.socialSecurity);
								localStorage.setItem("isSmallLoan",res.ret_data.isSmallLoan);
								var socialSecurity = res.ret_data.socialSecurity;
								var sesameCredit = res.ret_data.sesameCredit;
								var isSmallLoan = res.ret_data.isSmallLoan;
								if(idNumber !== ""){
									//身份证不为空
									var Authentication = document.getElementById("Authentication");
									var AuthenticationText = document.getElementById("AuthenticationText");									
									self.widthData +=45;
									self.VerificationMonny+=30000;
									Authentication.style.visibility='hidden';
									AuthenticationText.innerHTML="已认证";
									
								};
								if(socialSecurity !== ""){
									//社保
									var phoneApprove = document.getElementById("phoneApprove");
									var phoneApproveText = document.getElementById("phoneApproveText");
									phoneApprove.style.visibility="hidden";
									phoneApproveText.innerHTML="已认证";
									self.widthData +=25;
									self.VerificationMonny+=30000;
								};
								if(isSmallLoan !== ""){
									self.widthData +=30;
									self.VerificationMonny+=40000;
									var sesameApprove = document.getElementById("sesameApprove");
									var sesameApproveText = document.getElementById("sesameApproveText");
									sesameApprove.style.visibility="hidden";
									sesameApproveText.innerHTML="已认证";
								};
								if(idNumber !== ""){
									if(socialSecurity !== ""){
										if(isSmallLoan !== ""){
											self.nofinish = false;
											
										}else{
											self.nofinish = true;
										}
									}
								}
							
							} else{
								$.toast(res.ret_msg);
							}
						},
						error: function(res){
							$.toast('网路请求失败，请稍后重试');
						}
					});
         	
//       			var userPhone = window.localStorage.getItem("userPhone");//userPhone手机号
//       			var idName = window.localStorage.getItem("idName");//姓名
//       			var idNumber = window.localStorage.getItem("idNumber");//身份证号
//       			var birthday = window.localStorage.getItem("birthday");//生日
//       			var sex = window.localStorage.getItem("sex");//性别
//       			var applyQuota = window.localStorage.getItem("applyQuota");//申请额度
//       			var applyTerm = window.localStorage.getItem("applyTerm");//申请期限
//       			
//       			var profession = window.localStorage.getItem("profession");//职业
//       			var realWage = window.localStorage.getItem("realWage");//薪资
//       			var socialSecurity = window.localStorage.getItem("socialSecurity");//社保
//       			var accumulationFund = window.localStorage.getItem("accumulationFund");//公积金
//       			var lifeInsurance = window.localStorage.getItem("lifeInsurance");//寿险
//       			var city = window.localStorage.getItem("city");//所在城市
//       			
//       			var sesameCredit = window.localStorage.getItem("sesameCredit");//芝麻分
//       			var isSmallLoan = window.localStorage.getItem("isSmallLoan");//是否有微粒贷
//       			var isCreditCard = window.localStorage.getItem("isCreditCard");//是否有信用卡
//       			var creditCardLine = window.localStorage.getItem("creditCardLine");//信用额度
//       			var creditCardOverdue = window.localStorage.getItem("creditCardOverdue");//信用逾期
//       			var houseProperty = window.localStorage.getItem("houseProperty");//房产
//       			var carProduction = window.localStorage.getItem("carProduction");//车产
         			//console.log(idName);
//					var urlStr = Util.baseUrl + '/DuG/api/user/user/findUserInfo.do';
//					var md5Str = Util.basekey
//							   + self.userId;
//							   + self.userPhone
//							   + self.idName
//							   + self.idNumber
//							   + self.birthday
//							   + self.sex
//							   + self.applyQuota
//							   + self.applyTerm
//							   + self.profession
//							   + self.realWage
//							   + self.socialSecurity
//							   + self.accumulationFund
//							   + self.lifeInsurance
//							   + self.city
//							   + self.sesameCredit
//							   + self.isSmallLoan
//							   + self.isCreditCard
//							   + self.creditCardLine
//							   + self.creditCardOverdue
//							   + self.houseProperty
//							   + self.carProduction;
							 							   
					//$.ajax({
					//	type:"post",
					//	url: urlStr,
					//	async:true,
					//	data: {
					//		userId:	self.userId,// 用户ID
//							userPhone: self.userPhone,
//							idName: self.userPhone,
//							idNumber: self.idName,
//							birthday: self.birthday,
//							sex: self.sex,
//							applyQuota: self.applyQuota,
//							applyTerm: self.applyTerm,
//							profession: self.profession,
//							realWage: self.realWage,
//							socialSecurity: self.socialSecurity,
//							accumulationFund: self.accumulationFund,
//							lifeInsurance: self.lifeInsurance,
//							city: self.city,
//							sesameCredit: self.sesameCredit,
//							isSmallLoan: self.isSmallLoan,
//							isCreditCard: self.isCreditCard,
//							creditCardLine: self.creditCardLine,
//							creditCardOverdue: self.creditCardOverdue,
//							houseProperty: self.houseProperty,
//							carProduction: self.carProduction,
							//key: Util.basekey,
//							//auth: Util.base32Encode(
//								'key,userId,userPhone,idName,idNumber,birthday,sex,applyQuota,applyTerm,profession,realWage,socialSecurity,accumulationFund,lifeInsurance,city,sesameCredit,isSmallLoan,isCreditCard,creditCardLine,creditCardOverdue,houseProperty,carProduction'
//								),
							//auth: Util.base32Encode(
							//	'key,userId'
							//	),
							//token: md5(md5Str),
						//},
						//success: function(res){
						//	console.log(res);
						//	// 请求成功
						//	if (res.ret_code == '0') {
						//		
						//	} else{
						//		$.toast(res.ret_msg);
							//}
						//},
						//error: function(res){
						//	$.toast('网路请求失败，请稍后重试');
						//}
					//});
					
         }
            
        },
    });
