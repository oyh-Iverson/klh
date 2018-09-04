Vue.use(VueLazyload,{
			preLoad: 1.3,
			// error: '../img/dai.png',
			// loading: '../img/loading.gif',
			attempt: 3
		});
		 var app = new Vue({
			el: '#mescroll',
			data: {
				Cols: 'red !important',
				daikuanList: [],
				page: 0, // 请求页码
			},
			mounted: function() {
				//创建MeScroll对象,down可以不用配置,因为内部已默认开启下拉刷新,重置列表数据为第一页
				//解析: 下拉回调默认调用mescroll.resetUpScroll(); 而resetUpScroll会将page.num=1,再执行up.callback,从而实现刷新列表数据为第一页;
				var self = this;
				self.mescroll = new MeScroll("mescroll", { //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
					up: {
						callback: self.upCallback, //上拉回调
						//以下参数可删除,不配置
						isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
						//page:{size:8}, //可配置每页8条数据,默认10
						toTop:{ //配置回到顶部按钮
							src : "../mescroll/mescroll-totop.png",//默认滚动到1000px显示,可配置offset修改
							//html: null, //html标签内容,默认null; 如果同时设置了src,则优先取src
							//offset : 1000
						},
						empty:{ //配置列表无任何数据的提示
							warpId:"mescroll",
							icon : "../img/wujilu.png" , 
						  	tip : "暂无记录~" , 
//						  	btntext : "去贷款" , 
//						  	btnClick : function() {
//						  		window.location.replace('daikuan.html')
//						  	} 
						},
					}
				});
			},
			methods: {
				//上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
				upCallback: function(page) {
					//联网加载数据
					var self = this;
					self.getData();
				},
				to: function(){
				   window.location.href  = ""
				},
				// 列表点击事件
				daikuanClick: function(item){
					sessionStorage.setItem("title",item.title);
					//sessionStorage.setItem("subtitle",item.subtitle);
					sessionStorage.setItem("content",item.content);
					sessionStorage.setItem("createTime",item.createTime.split(' ')[0]);
					
					console.log(item.content);
					console.log(item.title);
					//console.log(item.subtitle);
					console.log(item.createTime.split(' ')[0]);
					window.location.replace('Mdetails.html')
					
				},
				// 获取列表数据源
				getData: function(){
					var self = this;
					var urlStr = Util.baseUrl + '/DuG/api/basics/message/findMessageList.do';
					var userId = localStorage.getItem('userId') || '';
					var md5Str = Util.basekey + self.page  + '10';
					//console.log(Util.base32Encode('key,userId,page,rows'))
					$.ajax({
						type:"get",
						url: urlStr,
						async:true,
						//dataType:'json',
						data: {
							page: self.page,
							rows: 10,
							key: Util.basekey,
							auth: Util.base32Encode('key,userId,page,rows'),
							token: md5(md5Str)
						},
						success: function(res){
							console.log(res);
							// 请求成功
							if (res.ret_code == '0') {
								if (self.page == 0) {
								    //console.log(res.ret_data)
                                    //console.log(md5(md5Str))
									self.daikuanList = res.ret_data;
								} else{
									self.daikuanList = self.daikuanList.concat(res.ret_data);
								}
								var hasNext = res.ret_data.length == 10 ? true : false;
								if (hasNext == true) { // 还有下一页
									self.page = self.page + 1;
								}
								self.mescroll.endSuccess(res.ret_data.length,hasNext);
							} else{
								$.toast(res.ret_msg);
							}
						},
						error: function(res){
							$.toast('网路请求失败，请稍后重试');
						}
					})
				},
			}
		})
		  