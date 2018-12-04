
    var app = new Vue({
        el: '#app',
        data: {
           
        },
        mounted: function() {
           
        },
        methods: {
       		copyText:function() {       	
      			var clipboard = new Clipboard('.btn');	
                clipboard.on('success', function(e) {
                    $.toast('复制成功');                             
                });
                clipboard.on('error', function(e) {
                    $.toast('复制失败');
                });                       
   			}
        }
    });