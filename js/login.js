 function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    }

    /* $(function(){
        if(getQueryString('referee') != null && getQueryString('referee') != ""){
            localStorage.setItem('referee',getQueryString('referee'));//渠道id
        }


    }); */

    var app = new Vue({
        el: '#app',
        data: {
            is_tel: true,
            show_hide: 'clear hide_pw',
            pwType: 'password',
            // 用户输入的手机号
            telVal: '',
            //快速登录时的邀请码
            inviteCodeFirst:"",
            //密码登录时的邀请码
            inviteCodeSecond:"",
            // 验证码
            yzmVal: '',
            // 显示手机号删除按钮
            showTelClear: false,
            // 显示验证码删除按钮
            showYzmClear: false,
            // 账号
            zhanghao: '',
            // 密码
            passwd: '',
            // 显示账号删除图标
            showZhanghaoClear: false,
            // 验证码计时
            yzmTime: '发送验证码',
            yzmTime2: '发送验证码',
            // 登录按钮样式
            loginClass: 'login_btn',
            yzmColor: '#1184FF',
        },
        watch: {
            // 快捷登录   账号密码登录  切换
            is_tel: function(val,oldVal){
                if (val == true) { // 快捷登录
                    $('#kuaijie').css('color','#FF2E03');
                    $('#zhanghao').css('color','#7A7A7A');
                    this.isActive1();
                } else{ // 账号密码登录
                    $('#kuaijie').css('color','#7A7A7A');
                    $('#zhanghao').css('color','#FF2E03');
                    this.isActive2();
                }
            },
            // 手机号值改变事件
            telVal: function(val,oldVal){
                if (val.length ==0) {
                    this.showTelClear = false;
                } else{
                    this.showTelClear = true;
                }
                this.isActive1();
            },
            // 验证码值改变事件
            yzmVal: function(val,oldVal){
                if (val.length ==0) {
                    this.showYzmClear = false;
                } else{
                    this.showYzmClear = true;
                }
                this.isActive1();
            },
            // 账号值改变事件
            zhanghao: function(val,oldVal){
                if (val.length ==0) {
                    this.showZhanghaoClear = false;
                } else{
                    this.showZhanghaoClear = true;
                }
                this.isActive2();
            },
            passwd: function(val,oldVal){
                this.isActive2();
            },
        },
        mounted: function() {
            this.isLogin();
            if(localStorage.getItem('refereeCode') != null && localStorage.getItem('refereeCode')!=undefined &&localStorage.getItem('refereeCode') != "null"){
                this.inviteCodeFirst = localStorage.getItem('refereeCode');//推荐码  url中有字段则自动填充
            }
        },
        methods: {
            getQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return decodeURI(r[2]); return null;
			},
            isLogin: function(){
                var userId = localStorage.getItem('userId') || '';
                if (userId != '') {
                    //window.location.href = 'home.html';
                }
            },
            // 返回首页
            goHomeClick: function(){
//					window.location.replace('home.html');
                //refereeCode推荐码  referee渠道ID
                var refereeCode = "";
                if(localStorage.getItem("refereeCode")){
                    refereeCode = localStorage.getItem("refereeCode");
                }
                var referee = "";
                if(localStorage.getItem('referee')){
                    referee = localStorage.getItem('referee');
                }

                window.location.href =  'home.html?refereeCode='+refereeCode+'&referee='+referee;
            },
            // 注册
            goRegestClick: function(){
                window.location.href = 'regrest.html'
            },
            // 显示 还是隐藏密码
            showPwClick: function(){
                // 显示密码
                if (this.show_hide == 'clear hide_pw') {
                    this.show_hide = 'clear show_pw';
                    this.pwType = 'text';
                } else{ // 隐藏密码
                    this.show_hide = 'clear hide_pw';
                    this.pwType = 'password';
                }
            },
            // 发送验证码 按钮点击事件
            sendYzmClick: function(){
                var self = this;
                if (self.yzmTime != '发送验证码') {
                    return;
                }
                if (Util.checkPhone(this.telVal)) {
                    var urlStr = Util.baseUrl + '/DuG/api/basics/validateCode/findValidateCode.do';
                    var md5Str = Util.basekey + this.telVal + '2';
                    $.ajax({
                        type:"get",
                        url: urlStr,
                        async:true,
                        timeout: 10000,
                        //dataType:'json',
                        data: {
                            phone: this.telVal,
                            sourceType: 2,
                            key: Util.basekey,
                            auth: Util.base32Encode('key,phone,sourceType'),
                            token: md5(md5Str)
                        },
                        success: function(res){
                            var res = JSON.parse(res);
                            // 发送成功
                            if (res.ret_code == '0') {
                                $.toast("验证码发送成功");
                                self.yzmTime = 60;
                                var timer = setInterval(function(){
                                    self.yzmTime =  self.yzmTime - 1;
                                    self.yzmTime2 = self.yzmTime + '(s)'
                                    self.yzmColor = '#7A7A7A';
                                    if (self.yzmTime == 0) {
                                        clearInterval(timer);
                                        self.yzmTime = '发送验证码';
                                        self.yzmTime2 = '发送验证码';
                                        self.yzmColor = '#1184FF"';
                                    }
                                },1000);
                            } else{
                                $.toast(res.ret_msg);
                            }
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
                    });
                } else{
                    $.toast("手机号输入有误");
                }
            },
            // 忘记密码按钮点击事件
            forgetPwClick: function(){
                window.location.href = 'forgetpasswd.html'
            },
            // 登录按钮点击事件
            loginClick: function(){
                // 快捷登录
                if (this.is_tel == true) {
                    var referee = localStorage.getItem('referee') || "";
                    var codeShow = "";
                    if(this.inviteCodeFirst.length ===6){
                        codeShow = this.inviteCodeFirst
					}
                    if (this.isActive1() == true) {
                        // var refereeCode = $("#codeFirst").val();
                        var urlStr = Util.baseUrl + '/DuG/api/user/user/loginAndNew.do';
                        var md5Str = Util.basekey  + this.telVal + '2' + '1';
                        $.ajax({
                            type:"get",
                            url: urlStr,
                            async:true,
                            //dataType:'json',
                            data: {
                                referee:referee,//渠道id
                                phone: this.telVal,
                                sourceType: 2,
                                type: 1,
                                passWord: this.yzmVal,
                                key: Util.basekey,
                                refereeCode:codeShow,//推荐码
                                auth: Util.base32Encode('key,phone,sourceType,type'),
                                token: md5(md5Str)
                               
                            },
                            success: function(res){	
                                var res = JSON.parse(res);
                                var self = this;
                                // 登录成功
                                if (res.ret_code == '0') {
                                    localStorage.setItem('userId',res.ret_data.userId || '');
                                    localStorage.setItem('userPhone',res.ret_data.userPhone || '');
                                    //保存vip在本地
                                     console.log(res.ret_data.VIPRank);
                                   localStorage.setItem('VIPRank',res.ret_data.VIPRank);
                                   //localStorage.setItem('VIPTime',res.ret_data.VIPTime);
                                    
                                    
                                    if(res.ret_data.ch_code != null && res.ret_data.ch_code != ''){
                                    	localStorage.setItem('referee',res.ret_data.ch_code || '');
                                    }
                                    /*localStorage.setItem('refereeCode',codeShow); */
                                    localStorage.setItem('selfRefereeCode',res.ret_data.invitationCode);//自己的邀请码
                                    
                                    window.location.replace('wode.html');//新地址取代当前文档地址
                                } else{
                                    $.toast(res.ret_msg);
                                }
                            },
                            error: function(res){
                                $.toast('网路请求失败，请稍后重试');
                            }
                        });
                    }
                } else{ // 账号密码登录
                    if (this.isActive2() == true) {
                        var refereeCode = $("#codeSecond").val();
                        var urlStr = Util.baseUrl + '/DuG/api/user/user/loginAndNew.do';
                        var md5Str = Util.basekey + this.zhanghao + '2' + '2' + md5(this.passwd);
                        $.ajax({
                            type:"get",
                            url: urlStr,
                            async:true,
                            //dataType:'json',
                            data: {
                                phone: this.zhanghao,
                                sourceType: 2,
                                type: 2,
                                passWord: md5(this.passwd),
                                key: Util.basekey,
                                refereeCode:refereeCode,
                                auth: Util.base32Encode('key,phone,sourceType,type,passWord,refereeCode'),
                                token: md5(md5Str)
                            },
                            success: function(res){
                                console.log(res)
                                var res = JSON.parse(res);

                                // 登录成功
                                if (res.ret_code == '0') {
                                    localStorage.setItem('userId',res.ret_data.userId || '');
                                    localStorage.setItem('userPhone',res.ret_data.userPhone || '');
                                    localStorage.setItem('refereeCode',$("#codeSecond").val());
                                    window.location.replace('wode.html');
                                } else{
                                    $.toast(res.ret_msg);
                                }
                            },
                            error: function(res){
                                $.toast('网路请求失败，请稍后重试');
                            }
                        });
                    }
                }
            },
            // 语音验证码点击事件
            yuyinClick: function(){

            },
            // 是否激活登录按钮
            isActive1: function(){
                if (this.telVal.length == 11 && this.yzmVal.length > 0) {
                    this.loginClass = 'login_btn_active';
                    return true;
                } else{
                    this.loginClass = 'login_btn';
                    return false;
                }
            },
            // 是否激活登录按钮
            isActive2: function(){
                if (this.zhanghao.length > 0 && this.passwd.length > 0) {
                    this.loginClass = 'login_btn_active';
                    return true;
                } else{
                    this.loginClass = 'login_btn';
                    return false;
                }
            },
        },
    })