  Vue.use(VueLazyload,{
        preLoad: 1.3,
        error: '../img/dai.png',
        loading: '../img/loading.gif',
        attempt: 3
    });
    var app = new Vue({
        el: '#mescroll',
        data: {
            daikuanList: [],
            Labelstip:false,
            // daikuanType :0,
            classify: [
                {
                    img: '../img/dedx.png',
                    title: '大额低息',
                    tip: '精准推荐',
                    id: 4,
                },
                {
                    img: '../img/xesd.png',
                    title: '小额速贷',
                    tip: '款速放贷',
                    id: 1,
                },
                {
                    img: '../img/xykd.png',
                    title: '信用卡贷',
                    tip: '个人征信报告',
                    id: 3,
                },
                {
                    img: '../img/gxdk.png',
                    title: '工薪贷款',
                    tip: '贷款分类引导',
                    id: 6,
                },
            ],
            dataList: [],
            classify2: [
                {
                    title: '宜人贷急速',
                    tip: '全场最高可借6W',
//                  backImg: 'linear-gradient(-135deg, #C0E3FF, #C49FFF)',
										backImg: 'url(../img/aa.png)',
                    titleColor: '#803604',
                    tipColor: '#691B04'
                },
                {
                    title: '宜人贷急速',
                    tip: '全场最高可借6W',
//                  backImg: 'linear-gradient(-135deg, #D4FF85, #FFAD6C)',
                    backImg: 'url(../img/bb.png)',
                    titleColor: '#803604',
                    tipColor: '#691B04'
                },
                {
                    title: '宜人贷急速',
                    tip: '全场最高可借6W',
                    backImg: 'linear-gradient(-135deg, #FFAE85, #FF9CAD)',
                    titleColor: '#771212',
                    tipColor: '#691616'
                },
                {
                    title: '宜人贷急速',
                    tip: '全场最高可借6W',
                    backImg: 'linear-gradient(-135deg, #C0E3FF, #C49FFF)',
                    titleColor: '#634BCE',
                    tipColor: '#473A81'
                }
            ],
            // // 贷款列表
            // daikuanList: [
            // ],
            // 请求数据
            requestData: {
                minQuota: '0',  // 最小贷款金额
                maxQuota: '50000',  // 最大贷款金额
                minTerm:  '0',  // 最小贷款期限
                maxTerm:  '36',  // 最大贷款期限
                label:    '-1',  // 贷款分类 热门
                page:     '0',  // 请求页数
            },
        },
        beforeMount:function(){
        	var userId = localStorage.getItem('userId');
        	if(userId == "" || userId == null || userId == undefined) {               	
                 window.location.href= "login2.html";
                }
        },
        mounted: function() {
            //创建MeScroll对象,down可以不用配置,因为内部已默认开启下拉刷新,重置列表数据为第一页
            //解析: 下拉回调默认调用mescroll.resetUpScroll(); 而resetUpScroll会将page.num=1,再执行up.callback,从而实现刷新列表数据为第一页;
            var self = this;
            self.mescroll = new MeScroll("mescroll", { //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
                up: {
                    callback: self.upCallback,//上拉回调                    
                    //以下参数可删除,不配置
                    isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
                    //page:{size:8}, //可配置每页8条数据,默认10
                    toTop:{ //配置回到顶部按钮
                        src : "../mescroll/mescroll-totop.png", //默认滚动到1000px显示,可配置offset修改
                        //html: null, //html标签内容,默认null; 如果同时设置了src,则优先取src
                        //offset : 1000
                    },
                    empty:{ //配置列表无任何数据的提示
                        warpId:"mescroll",
                        icon : "../img/wujilu.png" ,
                        tip : "暂无记录~" ,
                        btntext : "去贷款" ,
                        btnClick : function() {
                            window.location.replace('daikuan.html')
                        }
                    },
                }
                

            });
            if(this.getQueryString('referee')!=null && this.getQueryString('referee') != ""){
            	localStorage.setItem('referee',this.getQueryString('referee') || '');
            };
            if(this.getQueryString('userType')!=null && this.getQueryString('userType') != ""){
            	localStorage.setItem('userType',this.getQueryString('userType') || '');
            };
            if(this.getQueryString('refereeCode')!=null && this.getQueryString('refereeCode') != ""){
            	localStorage.setItem('refereeCode',this.getQueryString('refereeCode') || '');
            };
            /*if(localStorage.getItem('referee') == null || localStorage.getItem('referee') == ""){
            	localStorage.setItem('referee',this.getQueryString('referee') || '');
            }*/
            /*if(localStorage.getItem('userType') == null || localStorage.getItem('userType') == ""){
            	localStorage.setItem('userType',this.getQueryString('userType') || '');
            }*/
//          if(localStorage.getItem('refereeCode') == null || localStorage.getItem('refereeCode') == ""){
//          	localStorage.setItem('refereeCode',this.getQueryString('refereeCode') || '');
//          }
            
            /* this.getData2(); */
         /* // 贷款成功信息
            getMessages();
            // 广告轮播图
            getBanners(); */
           
        },
        methods: {
            getQueryString(name){
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return decodeURI(r[2]); return null;
            },
            //上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
            upCallback: function(page) {
                //联网加载数据
                // this.getData();
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
						//立即申请的点击
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
            // 收藏 按钮点击事件
            addCollectionClick: function(id){
                var self = this;
                // 添加收藏
                var urlStr1 = Util.baseUrl + '/DuG/api/basics/loan/createLoanCollection.do';
                // 取消收藏
                var urlStr2 = Util.baseUrl + '/DuG/api/basics/loan/removeLoanCollection.do';
                var userId = localStorage.getItem('userId') || '';

                if (userId == '') {
                    weui.confirm('您还未登录喔~', {
                        title: '提示',
                        buttons: [{
                            label: '取消',
                            type: 'default',
                            onClick: function(){

                            }
                        }, {
                            label: '去登录',
                            type: 'primary',
                            onClick: function(){
                                window.location.href = 'login.html';
                            }
                        }]
                    });
                    return;
                }


                var md5Str = Util.basekey + userId + id;
                var urlStr = '';
                var msg = '';
                var dataID = 1;
                // 收藏
                if (dataID == 1) {
                    urlStr = urlStr1;
                    msg = '收藏成功';
                } else{ // 取消收藏
                    urlStr = urlStr2;
                    msg = '取消成功';
                }
                $.ajax({
                    type:"get",
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
                        // 请求成功
                        if (res.ret_code == '0') {
                            $.toast(msg);
                        } else{
                            $.toast(res.ret_msg);
                        }
                    },
                    error: function(res){
                        $.toast('网路请求失败，请稍后重试');
                    }
                })
            },
            // 获取 热门列表数据源

            // 4个分类
            classifyClick:  function(id){
                window.location.href = 'daikuan2.html?id=' + id;
            },
           
            // 获取 火热 列表数据源
            getData2: function(){            
                var self = this;
                var urlStr = Util.baseUrl + '/DuG/api/basics/loan/findLoanList.do';
                var md5Str = Util.basekey
                    + self.requestData.minQuota
                    + self.requestData.maxQuota
                    + self.requestData.minTerm
                    + self.requestData.maxTerm
                    + '-1'
                    + self.requestData.page
                    + '10';
                var userType = localStorage.getItem("userType");
        				console.log(userType);
        				var showType = "";
        				if(userType == 3){
        					showType = 0;
        				}else{
        					showType = 1;
        				}
        				console.log(showType);
                $.ajax({
                    type:"get",
                    url: urlStr,
                    async:true,
                    //dataType:'json',
                    data: {
                        minQuota: self.requestData.minQuota,
                        maxQuota: self.requestData.maxQuota,
                        minTerm: self.requestData.minTerm,
                        maxTerm: self.requestData.maxTerm,
                        label: '-1' ,
                        page: self.requestData.page,
                        rows: 10,
                        key: Util.basekey,
                        auth: Util.base32Encode('key,minQuota,maxQuota,minTerm,maxTerm,label,page,rows'),
                        token: md5(md5Str),
                        showType: showType
                    },
                    success: function(res){
                        // 请求成功
                        console.log(res);
                        if (res.ret_code == '0') {
                            if(res.ret_data.length>=2){
                                self.dataList.push(res.ret_data[0]);
                                self.dataList.push(res.ret_data[1]);
							}else{
                                self.dataList = res.ret_data;
							}
                          
                            var dataList = JSON.stringify(self.daikuanList);    
                            //localStorage.setItem("indexListData",dataList);                            
                            var len = self.dataList.length;
                            for (var i = 0; i < len; i++) {
                                if (i <= 4) {
                                    self.dataList[i].backImg = self.classify2[i].backImg;
                                    self.dataList[i].titleColor = self.classify2[i].titleColor;
                                    self.dataList[i].tipColor = self.classify2[i].tipColor;
                                } else{
                                    var ran = Math.ceil(Math.random()*3);
                                    self.dataList[i].backImg = self.classify2[ran].backImg;
                                    self.dataList[i].titleColor = self.classify2[ran].titleColor;
                                    self.dataList[i].tipColor = self.classify2[ran].tipColor;
                                }
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
           
            getData3: function(){           	
                var self = this;
                var urlStr = Util.baseUrl + '/DuG/api/basics/loan/findLoanList.do';
                var md5Str = Util.basekey
                    + self.requestData.minQuota
                    + self.requestData.maxQuota
                    + self.requestData.minTerm
                    + self.requestData.maxTerm
                    + self.requestData.page
                    + '10';
                var userType = localStorage.getItem("userType");
        				console.log(userType);
        				var showType = "";
        				if(userType == 3){
        					showType = 0;
        				}else{
        					showType = 1;
        				}
        				console.log(showType);
                $.ajax({
                    type:"get",
                    url: urlStr,
                    async:true,
                    //dataType:'json',
                    data: {
                        minQuota: self.requestData.minQuota,
                        maxQuota: self.requestData.maxQuota,
                        minTerm: self.requestData.minTerm,
                        maxTerm: self.requestData.maxTerm,
                        page: self.requestData.page,
                        rows: 10,
                        key: Util.basekey,
                        auth: Util.base32Encode('key,minQuota,maxQuota,minTerm,maxTerm,page,rows'),
                        token: md5(md5Str),
                        showType: showType
                    },
                    success: function(res){
                        // 请求成功
                        console.log(res);
                        if (res.ret_code == '0') {               
                            self.daikuanList = res.ret_data;   
                            //localStorage.setItem("indexListData",dataList);                            
                            var len = self.dataList.length;
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
    });
    
     function Newmouth(){ 	
    	window.location.href= "loans.html?newLoan=0";
    };
    function borrow(){ 	
    	window.location.href= "loans.html?confirmLoan=0";
    };
    function Complete(){ 	
    	window.location.href= "daikuan.html?";
    };
    function SmallAM(){
    	window.location.href= "loans.html?shortTerm=0";
    };
    function large(){
    	window.location.href= "loans.html?largeLoan=0";
    };


    var banners = [];
    //广告轮播
    function getBanners(){
        var urlStr = Util.baseUrl + '/DuG/api/basics/advertOperation/findAdvertOperationList.do';
        var md5Str = Util.basekey;
        var userType = localStorage.getItem("userType");
        console.log(userType);
        var showType = "";
        if(userType == 3){
        	showType = 0;
        }else{
        	showType = 1;
        }
        console.log(showType);
        
        $.ajax({
            type:"get",
            url: urlStr,
            async:true,
            //dataType:'json',
            data: {
                key: Util.basekey,
                auth: Util.base32Encode('key'),
                token: md5(md5Str),
                showType: showType
            },
            success: function(res){
            	console.log(res);
                // 获取成功
                if (res.ret_code == '0') {
                	var userId = localStorage.getItem('userId');                 
                    banners = res.ret_data;
                    var tempHtml = '';
                    $.each(banners, function(index,item) {	
                    	var userPhone = localStorage.getItem('userPhone');
                        tempHtml = tempHtml + '<div class="swiper-slide" data-id="' + item.id + '" >' +
							'<a href="'+(userPhone!=null?item.advertUrl:'login.html')+'" >'+
								'<img src="' + item.imgUrl + '">' +
							'</a>'+
							'</div>'
                    });                   
                    var html = '<div class="swiper-wrapper">' + tempHtml + '</div><div class="swiper-pagination"></div>';
                    $('#swiper1').html(html);
                    var swiper1 = new Swiper('#swiper1',{
                        pagination: {
                            el: '.swiper-pagination'
                        },
                        lazy: {
                            loadPrevNext: true,
                            loadPrevNextAmount: 1,
                        },
                        direction : 'horizontal',
                        speed: 2000,
                        loop: true,
                        spaceBetween: 0,
                        autoplay: {
                            disableOnInteraction: false
                        },
                        observer:true,//修改swiper自己或子元素时，自动初始化swiper
                        observeParents:true,//修改swiper的父元素时，自动初始化swiper
                    });
                    
//                var userId = localStorage.getItem('userId');
//            if(userId == "" || userId == null || userId == undefined) { 
//           	mui(".links")[0].href="login.html";
//           	console.log(mui(".links")[0]);
//              
//              
//           }else{
//                
//									}
                
                
                } else{
                    $.toast(res.ret_msg);
     
                }
            },
            error: function(res){
                $.toast('网路请求失败，请稍后重试');            }
        });
        
    }
    
    var messages = [];
    //喇叭消息
    function getMessages(){
        var urlStr = Util.baseUrl + '/DuG/api/basics/advertOperation/findLoanSucce.do';
        var md5Str = Util.basekey;
        $.ajax({
            type:"get",
            url: urlStr,
            async:true,
            //dataType:'json',
            data: {
                key: Util.basekey,
                auth: Util.base32Encode('key'),
                token: md5(md5Str)
            },
            success: function(res){
            	console.log(res);
                // 获取成功
                if (res.ret_code == '0') {
                    messages = res.ret_data;
                    var tempHtml = '';
                    $.each(messages, function(index,item) {
                        tempHtml = tempHtml + '<div class="swiper-slide">' + item + '</div>'
                    });
                    var html = '<div class="swiper-wrapper">' + tempHtml + '</div>';
                    $('#swiper2').html(html);
                    var swiper2 = new Swiper('#swiper2',{
                        direction : 'vertical',
                        speed: 2000,
                        loop: true,
                        spaceBetween: 0,
                        autoplay:true,
                        observer:true,//修改swiper自己或子元素时，自动初始化swiper
                        observeParents:true,//修改swiper的父元素时，自动初始化swiper
                    });
                    
                } else{
                    $.toast(res.ret_msg);
                }
            },
            error: function(res){
                $.toast('网路请求失败，请稍后重试');
            }
        });
    }
    
     
    
    function func(){
    	// 广告轮播图
        getBanners();
    	// 贷款成功信息
        getMessages();
        app.getData2();
        app.getData3();
        
    }
   