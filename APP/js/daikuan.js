
var app = new Vue({
	el: '#mescroll',
	data: {
		mescroll: null,
		pageNumber: 1,
		ToEnd: false,
		Labelstip: true,
		totalPages: "",
		SXxialas: false,
		issxColer: false,
		current: 5,
		currentJE: 0,
		currentqx: 0,
		isActive: false,
		newLoan: null,
		confirmLoan: null,
		shortTerm: null,
		largeLoan: null,
		minQuota: null,
		maxQuota: null,
		minTerm: null,
		maxTerm: null,
		datas: {
			newLoan: null,
			confirmLoan: null,
			shortTerm: null,
			largeLoan: null,
			minQuota: null,
			maxQuota: null,
			minTerm: null,
			maxTerm: null,
			rows: 10
		},
		confirmLoans: "",
		newLoans: "",
		largeLoans: "",
		tuijieloanName: "",
		oneIsActives: false,
		twoIsActives: false,
		threeIsActives: false,
		tuijieid: "",
		tuijname: "",
		tuijie: [],
		moreCP: false,
		Dindex: '', //点击的下标
		Cols: 'red !important',
//		daikTitle: {
//			daikuanMoney: '贷款金额', // 贷款金额	
//			daikuanType: '贷款分类', // 贷款分类
//			daikuanDate: '贷款期限' // 贷款期限
//		},
		biaoti: ["一定借到钱", "秒下1500", "大额低息贷"],
		jine: ["金额不限", "0-3千", "3千-5千", "5千-1万", "1万-3万", "3万-5万", "5万以上"],
		qix: ["期限不限", "0-1个月", "1-3个月", "3-6个月", "6-12个月", "12-36个月", "36个月以上"],
		// 贷款列表
		daikuanList: [],
		// 请求数据




	},
	mounted: function () {
		//创建MeScroll对象,down可以不用配置,因为内部已默认开启下拉刷新,重置列表数据为第一页
		//解析: 下拉回调默认调用mescroll.resetUpScroll(); 而resetUpScroll会将page.num=1,再执行up.callback,从而实现刷新列表数据为第一页;
		var self = this;
		if (self.getQueryString('confirmLoan') != null && self.getQueryString('confirmLoan') != "") {
			self.confirmLoans = self.getQueryString('confirmLoan');
			//console.log(typeof self.confirmLoans)
			if (self.confirmLoans=='0') {
				sessionStorage.removeItem('dataList');
				self.current = 0;
				self.oneIsActives = !self.oneIsActives;
				self.twoIsActives = false;
				self.threeIsActives = false;
				sessionStorage.setItem('current',0);
				//alert("22"+self.confirmLoans);
				let obj = {
					confirmLoan: '0'
				}
				obj = Object.assign({}, self.datas, obj)
				sessionStorage.setItem('getOpts', JSON.stringify(obj))
				self.daikuanList = null;
				self.pageNumber = "1";
				self.getData();
			}
		};
		if (self.getQueryString('newLoan') != null && self.getQueryString('newLoan') != "") {
			self.newLoans = self.getQueryString('newLoan');
			if (self.newLoans=='0') {
				sessionStorage.removeItem('dataList')
				self.current = 1;
				self.oneIsActives = false;
				self.twoIsActives = !self.twoIsActives;
				self.threeIsActives = false;
				sessionStorage.setItem('current',1)
				let obj = {
					newLoan: '0'
				}
				obj = Object.assign({}, self.datas, obj)
				sessionStorage.setItem('getOpts', JSON.stringify(obj))
				self.daikuanList = null;
				self.pageNumber = "1";
				self.getData();
			}
		};
		if (self.getQueryString('largeLoan') != null && self.getQueryString('largeLoan') != "") {
			self.largeLoans = self.getQueryString('largeLoan');
			if (self.largeLoans=='0') {
				sessionStorage.removeItem('dataList')
				self.current = 2;
				self.oneIsActives = false;
				self.twoIsActives = false;
				self.threeIsActives = !self.threeIsActives;
				sessionStorage.setItem('current',2)
				let obj = {
						largeLoan: '0'
				 	}
					obj = Object.assign({}, self.datas, obj)
					sessionStorage.setItem('getOpts', JSON.stringify(obj))
				 	self.daikuanList = null;
					self.pageNumber = "1";
				 	self.getData();
			}
		};
		self.tuijieloanName = sessionStorage.getItem('tuijieloanName');
		self.tuijieid = sessionStorage.getItem('tuijieid');
		console.log(self.tuijieloanName);
		if (self.tuijieloanName == null) {
			self.moreCP = true;
			//alert("你TM的是空的啊");
		}
		//console.log(self.tuijieid);
		var current = sessionStorage.getItem('current');
		if (current) {
			self.current = current;
		}
		let data = sessionStorage.getItem('dataList');
		if (data) {
			this.daikuanList = JSON.parse(sessionStorage.getItem('dataList'));
		} else {
			if(!(self.oneIsActives||self.twoIsActives||self.threeIsActives)){
				this.getData();
			}
			
		}
		self.tuijname = sessionStorage.getItem('tuijname');
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
		getQueryString(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return decodeURI(r[2]);
			return null;
		},

		//上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
		//				upCallback: function(page) {
		//					//联网加载数据
		//					var self = this;
		//					setTimeout(function(){
		//						self.getData();
		//					},1000);
		//				},
		// 列表点击事件
		daikuanClick: function (id) {
			window.location.href = 'dkdetail.html?id=' + id;
		},
		//点击顶部推荐
		tuijieclick: function () {
			var self = this;
			var id = self.tuijieid;
			
			//统计
			var urlStr = Util.baseUrl + '/DuG/api/user/user/saveFunctionClick.do';
					var userID = localStorage.getItem('userId') || '';
					console.log(userID);
					var functionNum="横幅_贷款";
					var sourceType= "1";
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
                        	window.location.href = 'detailsPage.html?id=' + id;
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
					 
					});

		},
		//标题按钮
		biaotiCK: function (index) {
			var self = this;
			self.current = index + '';
			sessionStorage.setItem('current', index);
			sessionStorage.setItem('pageNum', 1);
			console.log('---' + index + '-----')
			if (index == "2") {
				console.log('点击的是2')
				self.oneIsActives = false
				self.twoIsActives = false
				self.threeIsActives = !self.threeIsActives
				if(self.threeIsActives){
					self.current=2;
					let obj = {
						largeLoan: '0'
				 	}
					obj = Object.assign({}, self.datas, obj)
					sessionStorage.setItem('getOpts', JSON.stringify(obj))
				 	this.daikuanList = null;
					this.pageNumber = "1";
				 	self.getData();
				 	//统计
				 	var urlStr = Util.baseUrl + '/DuG/api/user/user/saveFunctionClick.do';
					var userID = localStorage.getItem('userId') || '';
					console.log(userID);
					var functionNum="大额低息_贷款";
					var sourceType= "1";
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
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
					 
					});
				}else{
					self.current=5;
					let obj = {
						
				 	}
					obj = Object.assign({}, self.datas, obj)
					sessionStorage.setItem('getOpts', JSON.stringify(obj))
				 	this.daikuanList = null;
					this.pageNumber = "1";
				 	self.getData();
				}

			} else if (index == "0") {
				console.log('点击的是0')
				self.oneIsActives = !self.oneIsActives
				self.twoIsActives = false
				self.threeIsActives = false
				if(self.oneIsActives){
					self.current=0;
					let obj = {
				 		confirmLoan: '0'
				 	};
				 	obj = Object.assign({}, self.datas, obj)
				 	sessionStorage.setItem('getOpts', JSON.stringify(obj))
				 	this.daikuanList = null;
				 	this.pageNumber = "1";
				 	self.getData();
				 	//统计
				 	var urlStr = Util.baseUrl + '/DuG/api/user/user/saveFunctionClick.do';
					var userID = localStorage.getItem('userId') || '';
					console.log(userID);
					var functionNum="一定借到钱_贷款";
					var sourceType= "1";
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
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
					 
					});
				}else{
					self.current=5;
					let obj = {
				 		
				 	};
				 	obj = Object.assign({}, self.datas, obj)
				 	sessionStorage.setItem('getOpts', JSON.stringify(obj))
				 	this.daikuanList = null;
				 	this.pageNumber = "1";
				 	self.getData();
				}
			} else if (index == "1") {
				console.log('点击的是1')
				self.oneIsActives = false
				self.twoIsActives = !self.twoIsActives
				self.threeIsActives = false
				if(self.twoIsActives){
					self.current=1;
					let obj = {
				 		newLoan: '0'
					}
				 	obj = Object.assign({}, self.datas, obj)
				 	sessionStorage.setItem('getOpts', JSON.stringify(obj))
				 	this.daikuanList = null;
				 	this.pageNumber = "1";
				 	self.getData();
				 	//统计
				 	var urlStr = Util.baseUrl + '/DuG/api/user/user/saveFunctionClick.do';
					var userID = localStorage.getItem('userId') || '';
					console.log(userID);
					var functionNum="秒下1500_贷款";
					var sourceType= "1";
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
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
					 
					});
				}else{
					self.current=5;
					let obj = {
				 		
					}
				 	obj = Object.assign({}, self.datas, obj)
				 	sessionStorage.setItem('getOpts', JSON.stringify(obj))
				 	this.daikuanList = null;
				 	this.pageNumber = "1";
				 	self.getData();
				}
			} else {
				let obj = {}
				obj = Object.assign({}, self.datas, obj)
				//console.log(obj)
				//console.log('-----')
				sessionStorage.setItem('getOpts', JSON.stringify(obj))
				this.daikuanList = null;
				this.pageNumber = "1";
				self.getData();
			}

			console.log("导航下标" + self.current);
		},

		//筛选下拉按钮
		SXxiala: function () {
			var self = this;
			self.SXxialas = !self.SXxialas;
			self.isActive = !self.isActive;
			self.issxColer = !self.issxColer;

		},
		//筛选金额
		SXjineCK: function (index) {
			var self = this;
			self.currentJE = index;
			console.log("金额下标" + self.currentJE);
		},
		//筛选期限
		SXqxCK: function (index) {
			var self = this;
			self.currentqx = index;

			console.log("期限下标" + self.currentqx);
		},
		//关比
		chongzhi: function () {
			var self = this;
			self.currentJE = 0;
			self.currentqx = 0;
			self.issxColer = !self.issxColer;
			self.isActive = !self.isActive;
			self.SXxialas = false;
			console.log("关闭");
		},

		//筛选确认
		qurenshaix: function () {
			var self = this;
			//console.log(self.currentJE + "+" + self.currentqx);
			let obj = {
				minQuota: null,
				maxQuota:null,
				minTerm: null,
				maxTerm:null
				}
			if (self.currentJE == "1") {
				obj.minQuota=0,
				obj.maxQuota=300
				//console.log(obj);
			} else if (self.currentJE == "2") {
				
				obj.minQuota=3000,
				obj.maxQuota=5000
			} else if (self.currentJE == "3") {
				
				obj.minQuota=5000,
				obj.maxQuota=10000
			} else if (self.currentJE == "4") {
				
				obj.minQuota=10000,
				obj.maxQuota=30000
			} else if (self.currentJE == "5") {
				obj.minQuota=30000,
				obj.maxQuota=50000
			} else if (self.currentJE == "6") {
				obj.minQuota=50000,
				obj.maxQuota=null
			} else if (self.currentJE == "0") {
				obj.minQuota=null,
				obj.maxQuota=null
			};
			if (self.currentqx == "1") {				
				obj.minTerm=0,
				obj.maxTerm=1
			} else if (self.currentqx == "2") {
				
				obj.minTerm=1,
				obj.maxTerm=3
			} else if (self.currentqx == "3") {
				
				obj.minTerm=3,
				obj.maxTerm=6
			} else if (self.currentqx == "4") {				
				obj.minTerm=6,
				obj.maxTerm=12
			} else if (self.currentqx == "5") {
				obj.minTerm=12,
				obj.maxTerm=36
			} else if (self.currentqx == "6") {
				obj.minTerm=36,
				obj.maxTerm=null
			} else if (self.currentqx == "0") {		
				obj.minTerm=null,
				obj.maxTerm=null
			};
			//console.log(minQuota + ":" + maxQuota);
			//console.log(minTerm + ":" + maxTerm);
			
			self.issxColer = !self.issxColer;
			self.isActive = !self.isActive;
			self.SXxialas = false;
//			self.daikuanList = null;
//			self.pageNumber = "1";			
			obj = Object.assign({}, self.datas, obj);
			console.log(obj);
			sessionStorage.setItem('getOpts', JSON.stringify(obj))
			this.daikuanList = null;
			this.pageNumber = "1";
			self.getData();
			//self.getData();
			console.log("确认");
			
			//统计
					var urlStr = Util.baseUrl + '/DuG/api/user/user/saveFunctionClick.do';
					var userID = localStorage.getItem('userId') || '';
					console.log(userID);
					var functionNum="筛选_贷款";
					var sourceType= "1";
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
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
					 
					});
			
		},

		// 列表点击事件
		detailsClick(id, n, index, name) {
			var userId = localStorage.getItem('userId');
			if (userId == "" || userId == null || userId == undefined) {
				localStorage.setItem("pageID", id)
				//window.location = "login.html?refereeCode="+this.getQueryString('refereeCode')+'&referee='+this.getQueryString('referee');
				window.location.href = "login.html";
			} else {

				var self = this;
				self.Dindex = index;
				sessionStorage.setItem('tuijname', name);
				console.log(name);
				var daikuanList = self.daikuanList;
				var result = daikuanList.filter(function (value, index, array) {
					return (index != self.Dindex);

				})
				var tuijie = result[Math.round(Math.random() * result.length)];
				console.log(result);
				//console.log(tuijie.loanName);
				//console.log(tuijie.id);
				sessionStorage.setItem('tuijieloanName', tuijie.loanName);
				sessionStorage.setItem('tuijieid', tuijie.id);
				//统计
				var urlStr = Util.baseUrl + '/DuG/api/user/user/saveFunctionClick.do';
					var userID = localStorage.getItem('userId') || '';
					console.log(userID);
					var functionNum="列表_贷款_"+name;
					var sourceType= "1";
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
                        	window.location.href = 'detailsPage.html?id=' + id;
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
					 
					});
				
			}

		},

		H() {
			console.log("12345");
		},

		detailsClicks(id, n) {
			event.stopPropagation();
			var userId = localStorage.getItem('userPhone');
			console.log(userId);
			console.log(n);
			if (userId == null) {
				window,
				location.href = 'login.html';
			};
			var self = this;
			var urlStr = Util.baseUrl + '/DuG/api/basics/loan/findLoanModel.do';
			var id = id;
			var userId = localStorage.getItem('userId') || '';
			var md5Str = Util.basekey + userId + id;
			$.ajax({
				type: "post",
				url: urlStr,
				async: true,
				//dataType:'json',
				data: {
					userId: userId,
					id: id,
					key: Util.basekey,
					auth: Util.base32Encode('key,userId,id'),
					token: md5(md5Str)
				},
				success: function (res) {
					console.log(res);
					var loanUrl = res.ret_data.loanUrl
					console.log(loanUrl);
					window.location.href = loanUrl;
					var urlStr1 = Util.baseUrl + '/DuG/api/basics/loan/createLoanApply.do';
					$.ajax({
						type: "post",
						url: urlStr1,
						async: true,
						//dataType:'json',
						data: {
							userId: userId,
							id: id,
							key: Util.basekey,
							auth: Util.base32Encode('key,userId,id'),
							token: md5(md5Str)
						},
						success: function (res) {
							console.log(res);
							// 请求成功
							if (res.ret_code == '0') {

								//                              if(self.dataObj.loanUrl){
								//                              	console.log(self.dataObj.loanUrl);
								//                                  //window.location.href = self.dataObj.loanUrl;
								//                              }

							} else {
								$.toast(res.ret_msg);
							}
						},
						error: function (res) {
							$.toast('网路请求失败，请稍后重试');
						}
					})
				},
				error: function (res) {
					$.toast('网路请求失败，请稍后重试');
				}
			})

			return false;
		},
		// 透明背景点击事件  关闭弹框
		bgclosePopup: function () {
			this.modalClass = 'dk_modal_out';
		},
		// 获取列表数据源
		getData: function () {
			var self = this;
			//alert("33333333");
			var newLoan = self.newLoan;
			var confirmLoan = self.confirmLoan;
			var shortTerm = self.shortTerm;
			var largeLoan = self.largeLoan;
			var minQuota = self.minQuota;
			var maxQuota = self.maxQuota;
			var minTerm = self.minTerm;
			var maxTerm = self.maxTerm;
			var userType = localStorage.getItem("userType");
			var showType = "";
			if (userType == 3) {
				showType = 0;
			} else {
				showType = 1;
			}
			var urlStr = Util.baseUrl + '/DuG/api/basics/loan/findScreenLoanList.do';
			var md5Str = Util.basekey;
			var pageNumber = self.pageNumber;
			let obj = {
				key: Util.basekey,
				auth: Util.base32Encode('key'),
				token: md5(md5Str),
				page: pageNumber,
				showType: showType
			}
			let opts = JSON.parse(sessionStorage.getItem('getOpts'))
			if (opts) {
				obj = Object.assign({}, opts, obj)
			} else {
				obj = Object.assign({}, obj, {
					newLoan: newLoan,
					confirmLoan: confirmLoan,
					showType: showType,
					shortTerm: shortTerm,
					largeLoan: largeLoan,
					minQuota: minQuota,
					maxQuota: maxQuota,
					minTerm: minTerm,
					maxTerm: maxTerm,
					rows: 10,
				})
			}
			console.log(obj)
			$.ajax({
				type: "get",
				url: urlStr,
				async: true,
				data: obj,
				success: function (res) {
					// 请求成功
					console.log(res);
					console.log(res.data);
					if (res.code == '0') {
						var data = res.data;
						for (var i = 0; i < data.length; i++) {
							var keywords = data[i].keyword;
							keywords = keywords.slice('', keywords.length - 1); //先去掉最后的|	
							data[i].keyword = keywords.split("|"); //然后分割	
						}
						//self.totalPages = res.count;
						self.totalPages = Math.ceil(res.count / 10);
						sessionStorage.setItem('totalPages', self.totalPages)
						if (self.totalPages == 1) {
							self.ToEnd = true;
						}
						//self.daikuanList = res.data;
						if (self.daikuanList != null) {
							self.daikuanList = self.daikuanList.concat(res.data);
						} else {
							self.daikuanList = res.data;

						}
						sessionStorage.setItem('dataList', JSON.stringify(self.daikuanList));
						//self.daikuanList.push(res.data);
						//								var hasNext = res.ret_data.length == 10 ? true : false;
						//								if (hasNext == true) { // 还有下一页
						//									self.requestData.page = self.requestData.page + 1;
						//								}
						//								self.mescroll.endSuccess(res.ret_data.length,hasNext);

					} else {
						$.toast(res.ret_msg);
					}
				},
				error: function (res) {
					$.toast('网路请求失败，请稍后重试');
				}
			})
		},
		coll() {
			var self = this;
			var mescroll = document.getElementById("mescroll");
			var mescrollss = mescroll.addEventListener('scroll', function () {
				var scrollHeight = document.getElementById("mescroll").scrollHeight;
				var scrollTop = document.getElementById("mescroll").scrollTop; //0-18;
				//console.log(scrollTop);
				var clientHeight = document.getElementById("mescroll").clientHeight;
				if (scrollHeight - clientHeight == scrollTop) {
					//滚动条滚到最底部
					//console.log("滚到了最底部");   
					let pn = parseInt(sessionStorage.getItem('pageNum'));
					if (pn) {
						self.pageNumber = pn + 1
						let totalPages = parseInt(sessionStorage.getItem('totalPages'));
						if (self.pageNumber > totalPages) {
							self.pageNumber = totalPages + 1
						}
						sessionStorage.setItem('pageNum', self.pageNumber);
						self.getData();
					} else {
						self.pageNumber++;
						//alert(self.pageNumber);
						var totalPages = self.totalPages;
						sessionStorage.setItem('pageNum', self.pageNumber)
						self.getData();
					};
					if (self.pageNumber >= self.totalPages + 1) {
						//     					  	self.pageNumber = totalPages; 
						console.log(self.pageNumber);
						self.ToEnd = true;
					}
					//console.log(self.totalPages);

				}
			})

		}




	}
})