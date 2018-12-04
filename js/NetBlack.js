var app = new Vue({
			el: '#NetBlack',
			data: {
				
			},
			mounted: function() {
				var self = this;
				self.getMessages();
				
			},
			methods: {
				yijianBtn:function(){
					//统计
					var urlStr = Util.baseUrl + '/DuG/api/user/user/saveFunctionClick.do';
					var userID = localStorage.getItem('userId') || '';
					console.log(userID);
					var functionNum="一键检测_查信用";
					var sourceType= "0";
					var md5Str = Util.basekey 
										+userID
										+functionNum
										+sourceType;
					$.ajax({						
						type:"post", 
						url: urlStr,
                        async:true,                        
                        data:{
                        	userID: userID,
                        	functionNum:functionNum,
                        	key: Util.basekey,
                            auth: Util.base32Encode('key,userID,functionNum,sourceType'),
                            token: md5(md5Str),
                            sourceType:sourceType
                        },
                        success:function(res){
                        	console.log(res);
                        	console.log(sourceType);
                        	window.location.href="NetBlackziliao.html";
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
					 
					});
					
				},
	 			//样本报告
	 			yangbenbaogao:function(){
	 				window.location.href="Report3.html";
	 				//console.log("1111");
	 			},
	 			//报告
	 			lishibaog:function(){
	 				window.location.href="Credithistory.html";
	 			},
   				 //喇叭消息
    			getMessages(){
    				var myDate = new Date();
    				
    				//月份
    				var m = myDate.getMonth()+1;
    				
    				console.log(m);
    				var d= myDate.getDate();
    				console.log(d);
    				if(m < 10){
    							m = "0"+m;
    						}
    						//var d = Math.round(Math.random()*29+1);
    						if(d < 10){
    							d = "0"+d;
    				}
    				
    					var messages = [];
    					var xings = ["赵","钱","孙","李","周","吴","郑","王"];
    					var shouji=["疑似欺诈","短期内注册过多产品","同一手机号码，绑定多个身份证","同一身份，短期内通过多个号码申请产品"]
    					var sexs = ["先生","女士"];
    					for(var i =0; i<10;i++){
    						//var m = Math.round(Math.random()*11+1);
    						var n = Math.round(Math.random()*99+1);
    						var xing = xings[Math.round(Math.random()*7)];
    						
    						var shoujis = shouji[Math.round(Math.random()*3)];
    						console.log(shoujis);
    						var sex = sexs[Math.round(Math.random()*1)];
    						messages.push(m+'-'+d+'&nbsp;&nbsp;&nbsp;'+xing+sex+'&nbsp;&nbsp;&nbsp;'+shoujis+'&nbsp;'+'被'+n+'家网贷拒绝');
    						//console.log(messages);
    					}
    	
    				
    				
    				
    				
    				//console.log(messages);
    				var tempHtml = '';
                  			$.each(messages, function(index,item) {
                      			tempHtml = tempHtml + '<div class="swiper-slide">' + item + '</div>'
                 				});
                   				
                   				var html = '<div class="swiper-wrapper">' + tempHtml + '</div>';
                    			$('#swiper2').html(html);
                    			var swiper2 = new Swiper('#swiper2',{
                        			direction : 'vertical',
                        			speed: 1000,
                        			loop: true,
                        			spaceBetween: 0,
                        			autoplay:true,
                        			observer:true,//修改swiper自己或子元素时，自动初始化swiper
                        			observeParents:true,//修改swiper的父元素时，自动初始化swiper
                    			}); 
//      			var urlStr = Util.baseUrl + '/DuG/api/basics/advertOperation/findLoanSucce.do';
//      			var md5Str = Util.basekey;
//      			$.ajax({
//          			type:"get",
//          			url: urlStr,
//          			async:true,
//          			data: {
//              			key: Util.basekey,
//              			auth: Util.base32Encode('key'),
//             				token: md5(md5Str)
//          			},
//          			success: function(res){
//          				console.log(res);
//              			// 获取成功
//              			if (res.ret_code == '0') {
//                 				messages = res.ret_data;
//                  			                  
//              			} else{
//                  			$.toast(res.ret_msg);
//              				}
//          			},
//          			error: function(res){
//              			$.toast('网路请求失败，请稍后重试');
//          			}
//      			});
    			}
			},
});
	