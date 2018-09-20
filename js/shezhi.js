var app = new Vue({
			el: '#app',
			data: {
				userId: '',
			},
			mounted: function() {
				this.userId = localStorage.getItem('userId') || '';	
			},
			methods: {
				// 登出  点击事件
				loginOutClick: function(){
					localStorage.removeItem('userId');
					localStorage.removeItem('userPhone');
					localStorage.removeItem('isEnter');
                    localStorage.removeItem('refereeCode');//邀请码
                    localStorage.removeItem('referee');//渠道id
                    localStorage.removeItem('pageID');                    
					$.toast('退出成功');
					setTimeout(function(){
						window.location.replace('login2.html');
					},2000);
				},
			},
})