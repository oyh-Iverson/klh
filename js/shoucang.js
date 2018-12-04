	var app = new Vue({
        el: '#abc',
        data: {
			daikuanList:[],
			startX: 0,
			endX: 0,
			page:0
        },
        
        mounted(){
        	var self = this;
        	self.datas();
          
        },
        methods:{
        	//获取数据
        	datas:function(){
        		var self = this;
					var urlStr = Util.baseUrl + '/DuG/api/basics/loan/findLoanListByType.do';
					var userId = localStorage.getItem('userId') || '';
					var md5Str = Util.basekey + userId + self.page + 'collection' + '10';					
					$.ajax({
						type:"get",
						url: urlStr,
						async:true,
						data: {
							userId: userId,
							page: self.page,
							type: 'collection',
							rows: 10,
							key: Util.basekey,
							auth: Util.base32Encode('key,userId,page,type,rows'),
							token: md5(md5Str)
						},
						success: function(res){
							// 请求成功
							console.log(res);
							if (res.ret_code == '0') {
								var data = res.ret_data;
                         		for(var i = 0;i<data.length;i++){
                         			var keywords = data[i].keyword;
                         			keywords = keywords.slice('',keywords.length-1); 	
                         			data[i].keyword = keywords.split("|");
                        		 }
								if (self.page == 0) {
									self.daikuanList = res.ret_data;
								} else{
									self.daikuanList = self.daikuanList.concat(res.ret_data);
								}
								var hasNext = res.ret_data.length == 10 ? true : false;
								if (hasNext == true) { // 还有下一页
									self.page = self.page + 1;
								}
							} else{
								$.toast(res.ret_msg);
							}
						},
						error: function(res){
							$.toast('网路请求失败，请稍后重试');
						}
					})
        	},
        	
           //跳转
					skip:function(id,name) {
						if(this.checkSlide()) {
							this.restSlide();
						} else {
							var urlStr = Util.baseUrl + '/DuG/api/user/user/saveFunctionClick.do';
					var userID = localStorage.getItem('userId') || '';
					console.log(userID);
					var functionNum="我的收藏_"+name;
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
                        	console.log(functionNum);
                        	 window.location.href = 'detailsPage.html?id='+ id;  
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
					 
					});
							
						}
					},
					//滑动开始
					touchStart:function(e) {
						// 记录初始位置
						this.startX = e.touches[0].clientX;
					},
					//滑动结束
					touchEnd:function(e) {
						// 当前滑动的父级元素
						let parentElement = e.currentTarget.parentElement;
						// 记录结束位置
						this.endX = e.changedTouches[0].clientX;
						// 左滑
						if(parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
							this.restSlide();
							parentElement.dataset.type = 1;
						}
						// 右滑
						if(parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
							this.restSlide();
							parentElement.dataset.type = 0;
						}
						this.startX = 0;
						this.endX = 0;
					},
					//判断当前是否有滑块处于滑动状态
					checkSlide:function() {
						let listItems = document.querySelectorAll('.list-item');
						for(let i = 0; i < listItems.length; i++) {
							if(listItems[i].dataset.type == 1) {
								return true;
							}
						}
						return false;
					},
					//复位滑动状态
					restSlide:function() {
						let listItems = document.querySelectorAll('.list-item');
						// 复位
						for(let i = 0; i < listItems.length; i++) {
							listItems[i].dataset.type = 0;
						}
					},
					//删除
					deleteItem:function(index,id) {						
						// 复位
						this.restSlide();
						// 删除
						this.daikuanList.splice(index, 1);
               			// 取消收藏
                		var urlStr = Util.baseUrl + '/DuG/api/basics/loan/removeLoanCollection.do';
                		var userId = localStorage.getItem('userId') || '';
                		var md5Str = Util.basekey
                						+userId
                						+id;       
                		$.ajax({
                			type:"post",
                    		url: urlStr,
                    		async:true,
                    		data:{
                    			userId: userId,
                        		id: id,
                        		key: Util.basekey,
                        		auth: Util.base32Encode('key,userId,id'),
                        		token: md5(md5Str)
                    		},
                    		success:function(res){
                    			console.log(res);
                    		},
                    		error: function(res){
                        		$.toast('网路请求失败，请稍后重试');
                    		}
                		})
					}
        },

    });