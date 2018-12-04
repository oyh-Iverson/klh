var app = new Vue({
			el: '#app',
			data: {
				userId: '',
				content: '',
				zishu: '100', // 输入的字数
			},
			 created:function(){
				 document.getElementById("saveClick").addEventListener('click',this.saveClick,{passive:true})
			}, 
			watch: {
				// 快捷登录   账号密码登录  切换
				content: function(val,oldVal){
					this.zishu = 100 - val.length;
					if (this.zishu <= 0) {
						$.toast('已经达到最大字数限制');
					} 
				},
			},
			methods: {
				// 保存  点击事件
				saveClick: function(){
					var self = this;
					var urlStr = Util.baseUrl + '/DuG/api/basics/message/saveFeedbackModel.do';
					var userId = localStorage.getItem('userId') || '';	
					var content = this.content;
					if(content != null && content != ""){
						var md5Str = Util.basekey + userId + content;
						$.ajax({
							type:"get",
							url: urlStr,
							async:true,
							//dataType:'json',
							data: {
								userId:	userId,	  // 用户ID
								content: content, // 内容
								key: Util.basekey,
								auth: Util.base32Encode('key,userId,content'),
								token: md5(md5Str)
							},
							success: function(res){
								console.log(res);
								if (res.ret_code == 0) {
									$.toast('提交成功!谢谢反馈!');
									setTimeout(function(){
										window.location.href = document.referrer;
									},2000);
								} else{
									$.toast(res.ret_msg);
								}
							},
							error: function(res){
								$.toast('网路请求失败，请稍后重试');
							}
						});
					}
					
				},
			},
		})