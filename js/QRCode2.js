var app = new Vue({
        el: '#ORCode',
        data:{
            link:"http://klh.ijiakj.com/dkdk/template/home.html"   
        },
        mounted(){
        this.invitFriends();
        this.qrcodeChange(); 
        },       
        methods:{          
            //修改修改二维码点击
            qrcodeChange(){//生成二维码   
                var q = document.getElementById("qrcode");
                console.log(q);
                var qrcode = new QRCode('qrcode', {
                    width: 150,
                    height: 150, // 高   度                 
                    text: this.link// 二维码内容               
                });                      
                console.log(this.link);  
               
            },
            // 关闭推介专员
            closeShare(){
                window.location.href="invitation.html";
            },
            invitFriends(){
                this.link =this.link+'?refereeCode='+localStorage.getItem("selfRefereeCode")+'&referee='+localStorage.getItem("referee");
				console.log(this.link);
            },
            
            
        },

});