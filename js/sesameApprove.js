
    var app = new Vue({
        el: '#sesameApprove',
        data: {
        	step: 3,
			userInfo: {
				zhima: {
					 	label: '请选择',
						value: '',
						classNa: 'line_select'
				},// 芝麻分    
				weilidai: {
					 	label: '请选择',
						value: '',
						classNa: 'line_select'
				},// 微粒贷    
				xinyongka: {
					 	label: '请选择',
						value: '',
						classNa: 'line_select'
				},// 信用卡    
				xinyongedu: {
					 	label: '请选择',
						value: '',
						classNa: 'line_select'
				},// 信用额度    
				xinyongyuqi: {
					 	label: '请选择',
						value: '',
						classNa: 'line_select'
				},// 信用逾期    
				house: {
					 	label: '请选择',
						value: '',
						classNa: 'line_select'
				},// 房产  
				car: {
					 	label: '请选择',
						value: '',
						classNa: 'line_select'
				},// 房产  
			},
        },    
        mounted: function() {
     
        },
        methods: {
        	getTo(){
        		var self = this;
				var urlStr = Util.baseUrl + '/DuG/api/user/user/modifyUserInfo.do';
				var userId= window.localStorage.getItem("userId");
				var userId = userId;
				var step = self.step;			
				var sesameCredit = self.userInfo.zhima.value;				
				var isSmallLoan = self.userInfo.weilidai.value;				
				var isCreditCard = self.userInfo.xinyongka.value;
				var creditCardLine = self.userInfo.xinyongedu.value;
				var creditCardOverdue = self.userInfo.xinyongyuqi.value;
				var houseProperty = self.userInfo.house.value;
				var carProduction = self.userInfo.car.value;
				var md5Str = Util.basekey
						+ userId
						+ step
						+ sesameCredit
						+ isSmallLoan
						+ isCreditCard
						+ creditCardLine
						+ creditCardOverdue
						+ houseProperty
						+ carProduction;
							
				if(sesameCredit == ""){
					$.toast('芝麻分不能为空');
				}else if(isSmallLoan == ""){
					$.toast('是否有微粒贷不能为空');
				}else if(isCreditCard == ""){
					$.toast('是否有信用卡不能为空');
				}else if(creditCardLine == ""){
					$.toast('信用额度不能为空');
				}else if(creditCardOverdue == ""){
					$.toast('信用逾期不能为空');
				}else if(houseProperty == ""){
					$.toast('房产不能为空');
				}else if(carProduction == ""){
					$.toast('车产不能为空');
				}else{
						$.ajax({
						type:"get",
						url: urlStr,
						async:true,
						data: {
							userId:	userId,	
							key: Util.basekey,
							auth: Util.base32Encode('key,userId,step,sesameCredit,isSmallLoan,isCreditCard,creditCardLine,creditCardOverdue,houseProperty,carProduction'),
							step:self.step,
							sesameCredit:sesameCredit,
							isSmallLoan:isSmallLoan,
							isCreditCard:isCreditCard,
							creditCardLine:creditCardLine,
							creditCardOverdue:creditCardOverdue,
							houseProperty:houseProperty,
							carProduction:carProduction,
							token: md5(md5Str),						
						},
						success: function(res){	
							$.toast('提交成功');
							window.localStorage.setItem("isSmallLoan",isSmallLoan);
							setTimeout(function(){
								window.location.href="Verification.html";
							},2000);
						},
						error: function(res){
							$.toast('网路请求失败，请稍后重试');
						}
					})
				}
        		   		
        	},
        	goback(){
        		window.location.href="Verification.html";
        		
        	},
        	//点击芝麻分
        	zhimaClick: function(){
					var self = this;
					weui.picker([
						{
						    label: '500分以下',
						    value: 1,
						    classNa: 'line_select_active'
						},
						{
						    label: '500-600',
						    value: 2,
						    classNa: 'line_select_active'
						},
						{
						    label: '600-650',
						    value: 3,
						    classNa: 'line_select_active'
						},{
						    label: '650以上',
						    value: 4,
						    classNa: 'line_select_active'
						}],{
					   onConfirm: function (result) {
					   		self.userInfo.zhima = result[0];
					   },
					   id: 'singleLinePicker'
					});
			},
			//点击微粒贷
			weilidaiClick: function(){
					var self = this;
					weui.picker([
						{
						    label: '不详',
						    value: 0,
						    classNa: 'line_select_active'
						},
						{
						    label: '有',
						    value: 1,
						    classNa: 'line_select_active'
						},{
						    label: '无',
						    value: 2,
						    classNa: 'line_select_active'
						}],{
					   onConfirm: function (result) {
					   		self.userInfo.weilidai = result[0];
					   },
					   id: 'singleLinePicker'
					});
			},
			//点击信用卡
			xinyongkaClick: function(){
					var self = this;
					weui.picker([
						{
						    label: '是',
						    value: 1,
						    classNa: 'line_select_active'
						},
						{
						    label: '否',
						    value: 2,
						    classNa: 'line_select_active'
						}],{
					   onConfirm: function (result) {
					   		self.userInfo.xinyongka = result[0];
					   },
					   id: 'singleLinePicker'
					});
			},
			//点击信用额度
			xinyongeduClick: function(){
					var self = this;
					weui.picker([
						{
						    label: '2000以下',
						    value: 1,
						    classNa: 'line_select_active'
						},
						{
						    label: '2000-5000',
						    value: 2,
						    classNa: 'line_select_active'
						},{
						    label: '5000-10000',
						    value: 3,
						    classNa: 'line_select_active'
						},{
						    label: '10000-500000',
						    value: 3,
						    classNa: 'line_select_active'
						},{
						    label: '50000以上',
						    value: 3,
						    classNa: 'line_select_active'
						}],{
					   onConfirm: function (result) {
					   		self.userInfo.xinyongedu = result[0];
					   },
					   id: 'singleLinePicker'
					});
			},
			//点击信用逾期
			xinyongyuqiClick: function(){
					var self = this;
					weui.picker([
						{
						    label: '已还清',
						    value: 1,
						    classNa: 'line_select_active'
						},
						{
						    label: '未还清',
						    value: 2,
						    classNa: 'line_select_active'
						},{
						    label: '无逾期',
						    value: 3,
						    classNa: 'line_select_active'
						}],{
					   onConfirm: function (result) {
					   		self.userInfo.xinyongyuqi = result[0];
					   },
					   id: 'singleLinePicker'
					});
			},
			//点击房产
			houseClick: function(){
					var self = this;
					weui.picker([
						{
						    label: '有房贷',
						    value: 1,
						    classNa: 'line_select_active'
						},
						{
						    label: '红本在手',
						    value: 2,
						    classNa: 'line_select_active'
						},{
						    label: '无房',
						    value: 3,
						    classNa: 'line_select_active'
						}],{
					   onConfirm: function (result) {
					   		self.userInfo.house = result[0];
					   },
					   id: 'singleLinePicker'
					});
			},
			//点击车产
			carClick: function(){
					var self = this;
					weui.picker([
						{
						    label: '有车贷',
						    value: 1,
						    classNa: 'line_select_active'
						},
						{
						    label: '有车无贷',
						    value: 2,
						    classNa: 'line_select_active'
						},{
						    label: '无车',
						    value: 3,
						    classNa: 'line_select_active'
						}],{
					   onConfirm: function (result) {
					   		self.userInfo.car = result[0];
					   },
					   id: 'singleLinePicker'
					});
			},
        },
    });
