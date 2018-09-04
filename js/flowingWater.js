var app = new Vue({
        el: '#myCommission',
        data:{
            assets:[]
        },
        mounted(){
             this.getInvitation();
        },
        methods:{
            //获取邀请记录
            getInvitation(){
                var self = this;
                var userId = localStorage.getItem("userId") || "";
                var urlStr = Util.baseUrl + '/DuG/api/basics/applyCash/findBalanceInfoList.do';
                var md5Str = Util.basekey;
                $.ajax({
                    type:"get",
                    url:urlStr,
                    async:true,
                    //dataType:'json',
                    data:{
                        key:md5Str,
                        auth: Util.base32Encode('key'),
                        token: md5(md5Str),
                        userID:userId,
                        page:0,
                        rows:2,
                    },
                    success:function (res) {
                        console.log(res)
                        //获取成功
                        if(res.ret_code == '0'){
                            self.assets = res.ret_data;
                        }else{
                            $.toast(res.ret_msg);
                        }
                    },
                    error: function(res){
                        $.toast('网路请求失败，请稍后重试');
                    }
                })
            }
        },

    });
