Vue.use(VueLazyload,{
			preLoad: 1.3,
			error: '../img/dai.png',
			loading: '../img/loading.gif',
			attempt: 3
		})
		
		 var app = new Vue({
			el: '#mescroll',
			data: {
				mescroll: null,
				pageNumber:1,	
				ToEnd: false,
				Labelstip:true,
				totalPages:"",
				Cols: 'red !important',
				daikTitle: {
					daikuanMoney: '贷款金额',  // 贷款金额	
					daikuanType: '贷款分类',   // 贷款分类
					daikuanDate: '贷款期限'    // 贷款期限
				},
				// pop
				modalClass: 'dk_modal',
				// 弹出类型
				popType: 1,   // 1:贷款金额  2：贷款分类  3：贷款期限
				// 弹框数据
				popList: [],
				// 贷款列表
				daikuanList: [],
				// 请求数据
				requestData: {
					minQuota: '0',  // 最小贷款金额
					maxQuota: '50000',  // 最大贷款金额
					minTerm:  '0',  // 最小贷款期限
					maxTerm:  '36',  // 最大贷款期限
					label:    '0',  // 贷款分类
					page:     '0',  // 请求页数
				},
				// 贷款金额
				daikMoney: [
					{
						id: 1,
						name: '金额不限',
						claName: 'dk_item_active',
					},
					{
						id: 2,
						name: '0~3000',
						claName: 'dk_item',
					},
					{
						id: 3,
						name: '3000~5000',
						claName: 'dk_item',
					},
					{
						id: 4,
						name: '5000~10000',
						claName: 'dk_item',
					},
					{
						id: 5,
						name: '10000~30000',
						claName: 'dk_item',
					},
					{
						id: 6,
						name: '30000~50000',
						claName: 'dk_item',
					},
					{
						id: 7,
						name: '50000以上',
						claName: 'dk_item',
					},
				],
				// 贷款期限
				daikDate: [
					{
						id: 0,
						name: '期限不限',
						claName: 'dk_item_active',
					},
					{
						id: 1,
						name: '0~1个月',
						claName: 'dk_item',
					},
					{
						id: 2,
						name: '1~3个月',
						claName: 'dk_item',
					},
					{
						id: 3,
						name: '3~6个月',
						claName: 'dk_item',
					},
					{
						id: 4,
						name: '6~12个月',
						claName: 'dk_item',
					},
					{
						id: 5,
						name: '12~36个月',
						claName: 'dk_item',
					},
					{
						id: 6,
						name: '36个月以上',
						claName: 'dk_item',
					}
				],
				// 贷款分类
				daikType: [
					{
						id: 0,
						name: '分类不限',
						claName: 'dk_item_active',
					},
					{
						id: 1,
						name: '新口子',
						claName: 'dk_item',
					},
					{
						id: 2,
						name: '一定借到钱',
						claName: 'dk_item',
					},
					{
						id: 3,
						name: '小额贷款',
						claName: 'dk_item',
					},
					{
						id: 4,
						name: '大额低息贷',
						claName: 'dk_item',
					},
					
				],
			},
			mounted: function() {
				//创建MeScroll对象,down可以不用配置,因为内部已默认开启下拉刷新,重置列表数据为第一页
				//解析: 下拉回调默认调用mescroll.resetUpScroll(); 而resetUpScroll会将page.num=1,再执行up.callback,从而实现刷新列表数据为第一页;
				var self = this;
				self.getData();
				self.coll();
//				self.mescroll = new MeScroll("mescroll", { //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
//					up: {
//						callback: self.upCallback, //上拉回调
//						//以下参数可删除,不配置
//						isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
//						//page:{size:8}, //可配置每页8条数据,默认10
//						toTop:{ //配置回到顶部按钮
//							src : "../mescroll/mescroll-totop.png", //默认滚动到1000px显示,可配置offset修改
//							//html: null, //html标签内容,默认null; 如果同时设置了src,则优先取src
//							//offset : 1000
//						},
//						
//						empty:{ //配置列表无任何数据的提示
//							warpId:"mescroll",
//							icon : "../img/wujilu.png" , 
////						  	tip : "亲,暂无相关数据哦~" , 
////						  	btntext : "去逛逛 >" , 
////						  	btnClick : function() {
////						  		alert("点击了去逛逛按钮");
////						  	} 
//						},
//					}
//				});
			},
			methods: {	
				
				//上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
//				upCallback: function(page) {
//					//联网加载数据
//					var self = this;
//					setTimeout(function(){
//						self.getData();
//					},1000);
//				},
				// 列表点击事件
				daikuanClick: function(id){
					window.location.href = 'dkdetail.html?id=' + id;
				},
				// 贷款
				daikClick: function(id){
					this.popType = id;
					if (this.modalClass == 'dk_modal' || this.modalClass == 'dk_modal_out') {
						this.modalClass = 'dk_modal_in';
					} else{
						this.modalClass = 'dk_modal_out';
					}
					switch (id){
						case 1:  // 贷款金额
							this.popList = this.daikMoney;
							break;
						case 2: // 贷款类型
							this.popList = this.daikType;
							break;
						case 3:  // 贷款期限
							this.popList = this.daikDate;
							break;
						default:
							break;
					}
				},
				// 关闭弹出视图
				
				closePopup:  function(id,name){
					this.modalClass = 'dk_modal_out';
					switch (this.popType){
						case 1: // 贷款金额
								this.daikTitle.daikuanMoney = name;
								console.log(id);
								console.log(this.daikTitle.daikuanMoney);
								switch (id){
									case 1:
										this.requestData.minQuota = '';
										this.requestData.maxQuota = '';
										break;
									case 2:
										this.requestData.minQuota = '0';
										this.requestData.maxQuota = '3000';
										break;
									case 3:
										this.requestData.minQuota = '3000';
										this.requestData.maxQuota = '5000';
										break;
									case 4:
										this.requestData.minQuota = '5000';
										this.requestData.maxQuota = '10000';
										break;
									case 5:
										this.requestData.minQuota = '10000';
										this.requestData.maxQuota = '30000';
										break;
									case 6:
										this.requestData.minQuota = '30000';
										this.requestData.maxQuota = '50000';
										break;
									case 7:
										this.requestData.minQuota = '50000';
										this.requestData.maxQuota = '';
										break;
									default:
										break;
								}
							break;
						case 2: // 贷款分类
							this.requestData.label = id;
							console.log(this.requestData.label);//id
							this.daikTitle.daikuanType = name;
							console.log("分类："+this.daikTitle.daikuanType);
							break;
						case 3: // 贷款期限
							this.daikTitle.daikuanDate = name;
							console.log("期限："+this.daikTitle.daikuanDate);
							switch (id){
									case 1:
										this.requestData.minTerm = '';
										this.requestData.maxTerm = '';
										break;
									case 2:
										this.requestData.minTerm = '0';
										this.requestData.maxTerm = '1';
										break;
									case 3:
										this.requestData.minTerm = '1';
										this.requestData.maxTerm = '3';
										break;
									case 4:
										this.requestData.minTerm = '3';
										this.requestData.maxTerm = '6';
										break;
									case 5:
										this.requestData.minTerm = '6';
										this.requestData.maxTerm = '12';
										break;
									case 6:
										this.requestData.minTerm = '12';
										this.requestData.maxTerm = '36';
										break;
									case 7:
										this.requestData.minTerm = '36';
										this.requestData.maxTerm = '';
										break;
									default:
										break;
								}
							break;
						default:
							break;
					}
					var len = this.popList.length;
					for (var i = 0; i < len; i ++) {
						if (this.popList[i].id == id) {
							this.popList[i].claName = 'dk_item_active';
						} else{
							this.popList[i].claName = 'dk_item';
						}
					}
					this.requestData.page = 0;
					this.daikuanList = null;
					this.pageNumber = "1";
					this.getData();
				},
				 // 列表点击事件
            detailsClick(id,n){
                var userId = localStorage.getItem('userId');
                if(userId == "" || userId == null || userId == undefined) {
                	localStorage.setItem("pageID",id)
                    //window.location = "login.html?refereeCode="+this.getQueryString('refereeCode')+'&referee='+this.getQueryString('referee');
                    window.location.href= "login.html";
                }else{     
                   window.location.href = 'detailsPage.html?id='+ id+'&number='+n;                    
				}

			},
			H(){
				console.log("12345");
			},
			
			detailsClicks(id,n){
                event.stopPropagation();
                var userId = localStorage.getItem('userPhone');
                console.log(userId);
                console.log(n);
                if(userId==null){
                	window,location.href='login.html';
                };
                var self = this;
                var urlStr = Util.baseUrl + '/DuG/api/basics/loan/findLoanModel.do';
                var id = id;
                var userId = localStorage.getItem('userId') || '';
                var md5Str = Util.basekey + userId + id;
                    $.ajax({
                        type:"post",
                        url: urlStr,
                        async:true,
                        //dataType:'json',
                        data: {
                            userId: userId,
                            id: id,
                            key: Util.basekey,
                            auth: Util.base32Encode('key,userId,id'),
                            token: md5(md5Str)
                        },
                        success: function(res){
                        console.log(res);
                        var loanUrl=	res.ret_data.loanUrl 
                        console.log(loanUrl);
                       	window.location.href=loanUrl; 
                		var urlStr1 = Util.baseUrl + '/DuG/api/basics/loan/createLoanApply.do';			
                    $.ajax({
                        type:"post",
                        url: urlStr1,
                        async:true,
                        //dataType:'json',
                        data: {
                            userId: userId,
                            id: id,
                            key: Util.basekey,
                            auth: Util.base32Encode('key,userId,id'),
                            token: md5(md5Str)
                        },
                        success: function(res){
                        	console.log(res);
                            // 请求成功
                            if (res.ret_code == '0') {
                            	
//                              if(self.dataObj.loanUrl){
//                              	console.log(self.dataObj.loanUrl);
//                                  //window.location.href = self.dataObj.loanUrl;
//                              }

                            } else{
                                $.toast(res.ret_msg);
                            }
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
                    })               
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
                    })
                
						return false;},
				// 透明背景点击事件  关闭弹框
				bgclosePopup: function(){
					this.modalClass = 'dk_modal_out';
				},
				// 获取列表数据源
				getData: function(){
					var self = this;
					console.log(self.daikTitle.daikuanType);
					var daikuanType = self.daikTitle.daikuanType;	//名字				
					var daikuanMoney = self.daikTitle.daikuanMoney;//名字
					var daikuanDate = self.daikTitle.daikuanDate;//名字
					console.log(daikuanMoney);
					var newLoan = "";
					var confirmLoan = "";
					var shortTerm ="";
					var largeLoan = "";
					var minQuota = "";
					var maxQuota = "";
					var minTerm = "";
					var maxTerm = "";
					var id = this.requestData.label;
					if(id ==1){
						 newLoan = "0";
						 confirmLoan= null;
					}else if(id ==2){
						confirmLoan= "0";
						newLoan= null;
					}else if(id ==3){
						shortTerm = "0";
						confirmLoan= null;
						newLoan= null;
					}else if(id ==4){
						largeLoan = "0";
						shortTerm = null;
						confirmLoan= null;
						newLoan= null;
					}else if(id ==0){
						largeLoan = null;
						shortTerm = null;
						confirmLoan= null;
						newLoan= null;
					};
					var userType = localStorage.getItem("userType");
        			var showType = "";
        			if(userType == 3){
        				showType = 0;
        			}else{
        				showType = 1;
        			}
        			if (daikuanMoney=="0~3000"){
        				minQuota = "0";
						maxQuota = "3000";			
        			}else if(daikuanMoney=="3000~5000"){
        				minQuota = "3000";
						maxQuota = "5000";	
        			}else if(daikuanMoney=="5000~10000"){
        				minQuota = "5000";
						maxQuota = "10000";	
        			}else if(daikuanMoney=="10000~30000"){
        				minQuota = "10000";
						maxQuota = "30000";	
        			}else if(daikuanMoney=="30000~50000"){
        				minQuota = "30000";
						maxQuota = "50000";	
        			}else if(daikuanMoney=="50000以上"){
        				minQuota = "50000";
						maxQuota = null;	
        			};
        			
					var urlStr = Util.baseUrl + '/DuG/api/basics/loan/findScreenLoanList.do';
					var md5Str = Util.basekey;
					if(daikuanDate=="0~1个月"){
						minTerm = "0";
					    maxTerm = "1";
					}else if(daikuanDate=="1~3个月"){
						minTerm = "1";
					    maxTerm = "3";
					}else if(daikuanDate=="3~6个月"){
						minTerm = "3";
					    maxTerm = "6";
					}else if(daikuanDate=="6~12个月"){
						minTerm = "6";
					    maxTerm = "12";
					}else if(daikuanDate=="12~36个月"){
						minTerm = "12";
					    maxTerm = "36";
					}else if(daikuanDate=="36个月以上"){
						minTerm = "36";
					    maxTerm = null;
					};
					console.log(minTerm);
					console.log(maxTerm);
					console.log(minQuota);
					console.log(maxQuota);	
					console.log(self.pageNumber);
					var pageNumber = self.pageNumber;
					$.ajax({
						type:"get",
						url: urlStr,
						async:true,
						data: {
							minQuota: self.requestData.minQuota,
							key: Util.basekey,
                        	auth: Util.base32Encode('key'),
                        	token: md5(md5Str),
                        	// userID:userId
                        	newLoan: newLoan,
                        	confirmLoan:confirmLoan,
                        	showType:showType,
                        	shortTerm:shortTerm,
                        	largeLoan:largeLoan,
                        	minQuota:minQuota,
                        	maxQuota:maxQuota,
                        	minTerm:minTerm,
                        	maxTerm:maxTerm,
                        	page:pageNumber,
                        	rows:10,
						},
						success: function(res){
							// 请求成功
							console.log(res);
							if (res.code == '0') {	
								var data = res.data;								
                         		for(var i = 0;i<data.length;i++){
                         			var keywords = data[i].keyword;
                         			keywords = keywords.slice('',keywords.length-1);//先去掉最后的|	
                         			data[i].keyword = keywords.split("|"); //然后分割
                         			
                         			
                         		}
								//self.totalPages = res.count;
								self.totalPages = Math.ceil(res.count / 10);	
								if(self.totalPages == 1){
									self.ToEnd = true;
								}
									//self.daikuanList = res.data;
									if(self.daikuanList != null){
										self.daikuanList = self.daikuanList.concat(res.data);
									}else {
										self.daikuanList = res.data;
									}
									//self.daikuanList.push(res.data);
//								var hasNext = res.ret_data.length == 10 ? true : false;
//								if (hasNext == true) { // 还有下一页
//									self.requestData.page = self.requestData.page + 1;
//								}
//								self.mescroll.endSuccess(res.ret_data.length,hasNext);

							} else{
								$.toast(res.ret_msg);
							}
						},
						error: function(res){
							$.toast('网路请求失败，请稍后重试');
						}
					})
			},	
				coll(){
					var self = this;
					var mescroll = document.getElementById("mescroll");
		 			var mescrollss = mescroll.addEventListener('scroll', function () {
		 		  		var scrollHeight = document.getElementById("mescroll").scrollHeight;
		 		  		var scrollTop = document.getElementById("mescroll").scrollTop;//0-18;
		 		  		var clientHeight = document.getElementById("mescroll").clientHeight; 
		 		   		if (scrollHeight - clientHeight == scrollTop) {
        				//滚动条滚到最底部
       					 //console.log("滚到了最底部");          					 
       					 self.pageNumber++; 
       					 var pageNumber = self.pageNumber;
       					 self.pageNumber = pageNumber;
       					 var totalPages = self.totalPages;
       					 console.log(self.pageNumber);
       					 console.log(totalPages);
       					  self.getData();
       					  if(self.pageNumber >= totalPages+1){
       					  	self.pageNumber = totalPages; 
       					  	console.log(self.pageNumber)
       					  	self.ToEnd = true;
       					  	
       					  }
       					  //console.log(self.totalPages);
       					  
    					}
			})
		}
		
			}
		})
		