 Vue.use(VueLazyload,{
        preLoad: 1.3,
        error: '../img/dai.png',
        loading: '../img/loading.gif',
        attempt: 3,
    })
    var app = new Vue({
        el: '#mescroll',
        data: {
            active:true,
            showMsg:false,
            inviteAmount:0,
            inviteAmount2:0,
            moneyAmount:0,
            abonusRatio:true,
            abonusRatio2:true,
            abonusRatio21:true,
            abonusRatio22:true,
            abonusRatio31:true,
            abonusRatio32:true,
            linkArr:[
                {text:"生成专属推荐二维码/链接"},
                {text:"邀请好友使用贷款产品"},
                {text:"好友成功获得首次放款"},
                {text:"获得佣金，上不封顶"},
            ],
            phoneArr: [
                {phone:'****',number:'0'}
            ],
            showArr:[],
            link:"http://klh.ijiakj.com/dkdk/template/home.html"
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

            self.getCommission();//我的佣金
            self.getList();//获取佣金排行榜
            self.getMyList();//我的佣金基本情况
        },
        methods: {
            // 点击按钮截屏下载
            Screenshots(){
                html2canvas(document.querySelector("#qrcode"),{
                	taintTest: true,
                    useCORS: true,
                }).then(function(canvas) {
                    canvasImg = canvas.toDataURL("image/png");
                    var a = document.createElement("a");
                    a.href=canvasImg;
                    a.download='你的二维码';
                    a.click();
                });
                // alert("截不了图啊.............");
            },
            checkArea(em){
                if (em == "1"){
                    var p = {
						url: location.href, /*获取URL，可加上来自分享到QQ标识，方便统计*/
						desc: '', /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
						title: '', /*分享标题(可选)*/
						summary: '', /*分享摘要(可选)*/
						pics: '', /*分享图片(可选)*/
						flash: '', /*视频地址(可选)*/
						site: '满艺网', /*分享来源(可选) 如：QQ分享*/
						style: '201',
						width: 32,
						height: 32
					};
					//分享到QQ
					var sharesinastring = 'http://connect.qq.com/widget/shareqq/index.html?title=' + $("#title").val() + '&summary=' + $("#url").val() + '&url=' + $("#url").val() + '&site="满艺网"';
					window.location.href = sharesinastring;
                    
                	}
                else if (em == "4"){ 
                	wx.config({
                        debug: true,
                        appId: 'wxa0bb575ddd8a8b11',
                        timestamp: 1495803333,
                        nonceStr: 'CvNjcpHIUv755Pcr',
                        signature: '02f85062d8c1ecd2f66d05b1b988b3b5dffc9da8',
                        jsApiList: [
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage'
                        ]
                    });
                    wx.ready(function () {
                        var shareData = {
                            title: '这里是分享标题',
                            desc: '这里是发送给好友的时候的简介',
                            link: 'http://baidu.com',
                            imgUrl: 'http://baidu.com/logo.jpg'
                        };
                        // wx.onMenuShareAppMessage(shareData);//分享给朋友
                        wx.onMenuShareTimeline(shareData); //分享给朋友圈
                        // wx.onMenuShareQQ(shareData);//分享到QQ
                    });
                    wx.error(function (res) {
                        alert(res.errMsg);
                    });
             	
						
                	
                   console.log("什么情况咯");

                }
                else if (em == "3"){
                var p = {
                       url:location.href,
                        showcount:'0',/*是否显示分享总数,显示：'1'，不显示：'0' */
                        desc:'',/*默认分享理由(可选)*/
                        summary:'',/*分享摘要(可选)*/
                        title:'',/*分享标题(可选)*/
                        site:'满艺网',/*分享来源 如：腾讯网(可选)*/
                        pics:'', /*分享图片的路径(可选)*/
                        style:'203',
                        width:98,
                        height:22
                };
                       //分享到QQ空间
                var sharesinastring = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=' + $("#title").val() + '&url=' + $("#url").val() + '&site="满艺网"';
                window.location.href = sharesinastring;
      			}

            },
            qrcodeChange(){      
				window.location.href="QRCode2.html";

            },
            copy(){//复制链接
              var clipboard = new Clipboard('.btner');
            	var linkgg = this.link;
			
             	console.log(this.link);
				
                clipboard.on('success', function(e) {
                    $.toast('复制成功');
                    console.log("?");
                    
                });
                clipboard.on('error', function(e) {
                    $.toast('复制失败');
                });
                
                
                
            },
            getQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return decodeURI(r[2]); return null;
            },
            selctTab(e){
                if(e === 0){
                    this.active = true;
                }else{
                    this.active = false;
                }
            },
            showMessage(){
            	
                if (localStorage.getItem('userId')){
                    this.showMsg = true;
                    this.link =this.link+'?refereeCode='+localStorage.getItem("selfRefereeCode")+'&referee='+localStorage.getItem("referee");
                    console.log(this.link);
                }else {
                    window.location.href = 'login.html'
                }
                
            },
            cloneTip(){
                this.showMsg = false;
            },

            //我的佣金
            //获取佣金资产 和邀请人数
            getCommission(){
                var self = this;
                // api/basics/loan/findCountUsersAndabonusMoney.do
                var userId = localStorage.getItem("userId") || "";
                var urlStr = Util.baseUrl + '/DuG/api/basics/loan/findCountUsersAndabonusMoney.do';
                var md5Str = Util.basekey;
                if(userId != ""){
                    $.ajax({
                        type:"get",
                        url: urlStr,
                        async:true,
                        //dataType:'json',
                        data: {
                            key: Util.basekey,
                            auth: Util.base32Encode('key'),
                            token: md5(md5Str),
                            userID:userId
                        },
                       
                        success: function(res){
                            // 获取成功
                            console.log(res)
                            if (res.ret_code == '0' && res.ret_data) {
                                self.inviteAmount = res.ret_data.countUsers;
                                self.inviteAmount2 = res.ret_data.countUsers2;
                                console.log(res.ret_data.countUsers2);
                                self.moneyAmount = res.ret_data.abonusMoney;
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

            jumpInvite(){
                if(localStorage.getItem('userId') && localStorage.getItem('userId') != ""){
                    window.location.href = "MyinvitedRecord.html"
                }else{
                    var referee = localStorage.getItem('referee') || "";
                    var refereeCode = localStorage.getItem('refereeCode') || "";
                    window.location.href = "login.html?referee="+referee+'&refereeCode='+refereeCode;
                }
            },
            compare(val1,val2){
                return val2.number-val1.number;
            },
            // 获取佣金排行榜
            getList(){
                var self = this;
                // api/basics/loan/findCountUsersAndabonusMoney.do
                // var userId = localStorage.getItem("userId") || "";
                var urlStr = Util.baseUrl + '/DuG/api/basics/advertOperation/findUsersLoanRankings.do';
                var md5Str = Util.basekey;
                $.ajax({
                    type:"get",
                    url: urlStr,
                    async:true,
                    //dataType:'json',
                    data: {
                        key: Util.basekey,
                        auth: Util.base32Encode('key'),
                        token: md5(md5Str),
                        // userID:userId
                    },
                    success: function(res){  
                        // 获取成功
                        self.phoneArr = [];
                        console.log(res);
                        if (res.ret_code == '0' && res.ret_data) {
                            var data = res.ret_data ;
                            if(data){
                                console.log(data);
                                //排序显示
                                var sdic=Object.keys(data).sort(function(a,b){
                                    return data[b]-data[a];
                                });
                                for(ki in sdic){
                                    console.log(sdic[ki]+":"+data[sdic[ki]]);
                                    var amount =  Util.formatMoneyNumber(data[sdic[ki]]) +" "+ "元";
                                    self.phoneArr.push({phone:sdic[ki],number:amount});
                                }
                                //self.phoneArr.sort(self.compare);
                            }
                        } else{
                            $.toast(res.ret_msg);
                        }
                    },
                    error: function(res){
                        $.toast('网路请求失败，请稍后重试');
                    }
                });
                

            },

            getMyList(){
                var self = this;
                // api/basics/loan/findCountUsersAndabonusMoney.do
                // var userId = localStorage.getItem("userId") || "";
                var urlStr = Util.baseUrl + '/DuG/api/basics/loan/findLoanAbonusRatioList.do';
                var md5Str = Util.basekey;

                $.ajax({
                    type:"get",
                    url: urlStr,
                    async:true,
                    //dataType:'json',
                    data: {
                        key: Util.basekey,
                        auth: Util.base32Encode('key'),
                        token: md5(md5Str),
                        // userID:userId
                    },
                    success: function(res){                       
      				console.log(res);
      				
                        // 获取成功
                        if (res.ret_code == '0' && res.ret_data &&res.ret_data.length >0) {
                            var data = res.ret_data ;
                            self.showArr = data;
                            
                            var VIPRank = localStorage.getItem('VIPRank');
                            
      						console.log("VIPRank是"+VIPRank);
      						//var gg =  document.getElementById("li-bar");
      						
      							//console.log(self.showArr.length);
      						if(VIPRank == null || VIPRank == "1"){
      							//var gg =  document.getElementById("gg");
      							self.abonusRatio = true;
      							self.abonusRatio2 = true;
      							self.abonusRatio21 = false;
      							self.abonusRatio22 = false;
      							self.abonusRatio31 = false;
      							self.abonusRatio32 = false;
      							
      						}else if(VIPRank == "2"){
      							self.abonusRatio = false;
      							self.abonusRatio2 = false;
      							self.abonusRatio21 = true;
      							self.abonusRatio22 = true;
      							self.abonusRatio31 = false;
      							self.abonusRatio32 = false;
      							
      						}else if(VIPRank == "3"){
      							self.abonusRatio = false;
      							self.abonusRatio2 = false;
      							self.abonusRatio21 = false;
      							self.abonusRatio22 = false;
      							self.abonusRatio31 = true;
      							self.abonusRatio32 = true;
      						}
                            
                        } else{
                            $.toast(res.ret_msg);
                        }
                    },
                    error: function(res){
                        $.toast('网路请求失败，请稍后重试');
                    }
                });

            },


        }
    })
    // 广告轮播图
    getBanners();
    var banners = [];
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
                    banners = res.ret_data;
                    var tempHtml = '';
                    $.each(banners, function(index,item) {
                        //tempHtml = tempHtml + '<div class="swiper-slide" data-id="' + item.id + '"><img src="' + item.imgUrl + '"></div>'
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
                        direction : 'horizontal',
                        speed: 2000,
                        loop: true,
                        spaceBetween: 0,
                        autoplay: {
                            disableOnInteraction: false
                        },
                        observer:true,//修改swiper自己或子元素时，自动初始化swiper
                        observeParents:true,//修改swiper的父元素时，自动初始化swiper
                    })
                } else{
                    $.toast(res.ret_msg);
                }
            },
            error: function(res){
                $.toast('网路请求失败，请稍后重试');
            }
        });
    }
    // 广告栏
    getMessages();
    var messages = [];
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
                    })
                } else{
                    $.toast(res.ret_msg);
                }
            },
            error: function(res){
                $.toast('网路请求失败，请稍后重试');
            }
        });
    }
    