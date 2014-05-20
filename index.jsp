<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>webapp</title>
</head>
<body>
<%
Object loginkey=session.getAttribute("LOGIN_KEY");
Cookie[] _cookie=request.getCookies();
if(loginkey==null && _cookie!=null){
	for(int i=0,len=_cookie.length;i<len;i++){
		Cookie item=_cookie[i];
		if("loginkey".equals(item.getName())){
			loginkey=item.getValue();
			break;
		}
	}
}
System.out.println("session LOGIN_KEY:"+loginkey);
if(loginkey!=null && "q85155785".equals(loginkey)){
	%>
	<style>
.icon-list{
	position: absolute;
	z-index: 10000;
	bottom: 10px;
	right: 10px;
}
.icon{
	float:left;
	width:20px;
	height:20px;
	background-repeat: no-repeat;
	background-image: url(/oD/images/all_icon.png);
	background-position: -400px 0px;
	outline: 1px solid #DDD;
	margin-right:10px;
}
.line{
	height: 10px;
	clear: both;
}
.demo-list{
	position: absolute;
	z-index: 10000;
	bottom: 10px;
	left: 10px;
	width: 300px;
}
.demo-list a{
	margin-right:10px;
	display: inline-block;
	width: 100px;
}
</style>

<script type="text/javascript" charset="utf-8" src="/oD/js/jquery-2.0.3.min.js"></script>
<script type="text/javascript" charset="utf-8" src="/oD/js/extend-js.js"></script>
<script type="text/javascript" charset="utf-8" src="/oD/js/CF.js" ></script>
<script type="text/javascript" charset="utf-8" src="js/ui.startup.js"></script>
<script type="text/javascript" charset="utf-8" src="examples/startup.js"></script>
<script type="text/javascript" charset="utf-8">
var html=['<div class="icon-list">'];
//-358px 0px
var size=20;
for(var n=340;n<520;n+=size){
	for(var i=0;i<15;i++){
		html.push('<div class="icon" style="background-position:',' -',n,'px -',(i*size),'px;"></div>');
	}
	html.push('<div class="line"></div>');
}
size=40;
for(var n=420;n<520;n+=size){
	for(var i=0;i<5;i++){
		html.push('<div class="icon" style="background-position:',' -',n,'px -',(140+(i*size)),'px;width: ',size,'px;height: ',size,'px;"></div>');
	}
	html.push('<div class="line"></div>');
}
html.push('</div>');
document.write(html.join(""));


</script>

<%
}else{
	%>
	<script>
		var code;
		if(code=window.prompt("请输入暗号")){
			document.cookie="loginkey="+encodeURIComponent(code)+";";
			window.location.href="index.jsp";
		}else{
			window.location.reload();
		}
	</script>
	<%
	System.out.println("login == null...");
}
%>

</body>
</html>