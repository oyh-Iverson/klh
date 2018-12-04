var app = new Vue({
			el: '#Credithistory',
			data: {
				conList:[],
				sta:false
			},
			 mounted:function(){
				 var self = this;
				 self.datas();
			}, 
			methods: {
				// 获取数据
				datas(){
					var self = this;					
					var urlStr = Util.baseUrl + '/DuG/api/risk/riskManange/findRiskInfoApplyList.do';	
					var userPhone = localStorage.getItem('userPhone');
					console.log(userPhone);
					var md5Str = Util.basekey
								+userPhone;
						$.ajax({
							type:"get",
							url: urlStr,
							async:true,
							//dataType:'json',
							data: {
								key: Util.basekey,
								auth: Util.base32Encode('key,userPhone'),
								token: md5(md5Str),
								userPhone:userPhone
							},
							success: function(res){	
								var temp = JSON.parse(res);
								if (temp.ret_code == 0) {
									self.conList= temp.ret_data;
									
									console.log(self.conList);	
								} else{
									$.toast(res.ret_msg);
								}
							},
							error: function(res){
								$.toast('网路请求失败，请稍后重试');
							}
						});
				},
				//点击列表
				detailsClick(riskInfoApplyID,prepay_id){
                var userId = localStorage.getItem('userId');
                if(userId == "" || userId == null || userId == undefined) {
                	localStorage.setItem("pageID",id)
                    //window.location = "login.html?refereeCode="+this.getQueryString('refereeCode')+'&referee='+this.getQueryString('referee');
                    window.location.href= "login.html";
                }else{     
                   //window.location.href = 'detailsPage.html?id='+ id+'&number='+n; 
                   window.location.href = 'Report2.html?riskInfoApplyID='+ riskInfoApplyID;   
                   console.log(riskInfoApplyID);
								}

						},
			},
		})