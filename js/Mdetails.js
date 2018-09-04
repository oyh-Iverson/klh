window.onload=function(){
	var title = sessionStorage.getItem("title");
	var createTime = sessionStorage.getItem("createTime");
	var content = sessionStorage.getItem("content");				
	document.getElementById("title").innerHTML = title;
	document.getElementById("Con").innerHTML = content;
	document.getElementById("Time").innerHTML = createTime;
			
				
				
}