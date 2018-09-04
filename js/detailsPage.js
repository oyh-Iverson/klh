var app = new Vue({
        el: '#detailsPage',
        data: {
            rating:4,
            loanUrl:"",
            isTrue: false,
            active: true,
            //showMsg: false,
            inviteAmount: 0,
            moneyAmount: 0,
            linkArr: [
                {text: "生成专属推荐二维码/链接"},
                {text: "邀请好友使用贷款产品"},
                {text: "好友成功获得首次放款"},
                {text: "获得佣金，上不封顶"},
            ],
            phoneArr: [
                {phone: '****', number: '0'}
            ],
            showArr: [],
            dataObj: {},
            //showMsg: false,
            numbers: 0,
            iconShow: false,
            requestData: {
                page:     '0',  // 请求页数
            },
            commentInfo:[] //用户评论
        },
        mounted(){
           /* this.numbers = this.getQueryString('number');
            var data = JSON.parse(localStorage.getItem("indexListData"));
            for(var i=0;i<data.length;i++){
                if(data[i]["id"] == this.getQueryString('id')){
                    this.dataObj = data[i];
                }
            }*/
            this.queryDetails();
        },
        methods:{
            queryDetails(){
                var self = this;
                var urlStr = Util.baseUrl + '/DuG/api/basics/loan/findLoanModel.do';
                var id = Util.getQueryString("id");
                var userId = localStorage.getItem('userId') || '';
                var md5Str = Util.basekey + userId + id;
                if(userId && userId !=""){
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
                            // 请求成功
                            if (res.ret_code == '0') {
                                self.dataObj = res.ret_data;
                                self.rating =  Number(self.dataObj.rating);
                            } else{
                                $.toast(res.ret_msg);
                            }
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
                    })
                }else{
                    window.location.href = "login.html";
                }
            },
            closeShare(){
                this.isTrue = false;
            },
            checkArea(){
              $.toast("敬请期待")
            },
            longButton(){
                var clipboard = new Clipboard('.changIconLong');

                clipboard.on('success', function(e) {
                    $.toast('复制成功');
                });

                clipboard.on('error', function(e) {
                    $.toast('复制失败');
                });
                this.isTrue = false;

            },
            qrcodeChange(){//生成二维码
                this.isTrue = true;
                var qrcode = new QRCode('qrcode', {
                    width: 100,
                    height: 100, // 高度
                    text: 'http://dkdk.hgdqdev.cn/' // 二维码内容
                    // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                    // background: '#f0f'
                    // foreground: '#ff0'
                })
                console.log(qrcode)

            },
            copy(){//复制链接
                var clipboard = new Clipboard('.btner');

                clipboard.on('success', function(e) {
                    $.toast('复制成功');
                });

                clipboard.on('error', function(e) {
                    $.toast('复制失败');
                });
            },
            //showMessage(){
            //    this.showMsg = true;
           //},
           // cloneTip(){
           //     this.showMsg = false;
           // },
            getQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return decodeURI(r[2]); return null;
            },
            slectBtn(e){
              if(e === 0){
                  this.iconShow = false;
              }else{
                  this.iconShow = true;
                  this.commentList();
              }

            },
            //获取评论列表
            commentList(){
                var self = this;
                var urlStr = Util.baseUrl + '/DuG/api/basics/loanComment/findLoanCommentList.do';
                var id = Util.getQueryString("id");
                var userId = localStorage.getItem('userId') || '';
                var md5Str = Util.basekey + id + self.requestData.page + '10';
                if(userId && userId !=""){
                    $.ajax({
                        type:"get",
                        url: urlStr,
                        async:true,
                        //dataType:'json',
                        data: {
                            key: Util.basekey,
                            loanID: id,
                            page: self.requestData.page,
                            rows: '10',
                            auth: Util.base32Encode('key,loanID,page,rows'),
                            token: md5(md5Str)
                        },
                        success: function(res){
                        	console.log(res);
                            // 请求成功
                            if (res.ret_code == '0') {
                                if(res.ret_data){
                                   self.commentInfo = res.ret_data;
                                }else{
                                    $.toast(res.ret_msg);
                                }

                            } else{
                                $.toast(res.ret_msg);
                            }
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
                    })
                }else{
                    window.location.href = "login.html";
                }
            },
            // 立即申请 点击事件
            moneyApply(){
                var self = this;
                var urlStr = Util.baseUrl + '/DuG/api/basics/loan/createLoanApply.do';
                var id = Util.getQueryString("id");
                var userId = localStorage.getItem('userId') || '';
                var md5Str = Util.basekey + userId + id;
                console.log(userId);
                if(userId && userId !=""){
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
                            // 请求成功
                            if (res.ret_code == '0') {
                                if(self.dataObj.loanUrl){
                                	//console.log(self.dataObj.loanUrl);
                                    window.location.href = self.dataObj.loanUrl;
                                }else{
                                    window.location.href = "login.html";
                                }

                            } else{
                                $.toast(res.ret_msg);
                            }
                        },
                        error: function(res){
                            $.toast('网路请求失败，请稍后重试');
                        }
                    })
                }else{
                    window.location.href = "login.html";
                }

            },

        },

    });