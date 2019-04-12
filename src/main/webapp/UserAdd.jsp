<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>添加用户</title>
<base href="${pageContext.request.contextPath }/">
<link rel="stylesheet" type="text/css" href="themes/default/easyui.css" />
<link rel="stylesheet" type="text/css" href="themes/icon.css" />
<script src="js/jquery.min.js" type="text/javascript" charset="utf-8"></script>
<script src="js/jquery.easyui.min.js" type="text/javascript" charset="utf-8"></script>
<script src="js/easyui-lang-zh_CN.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
	$(function(){
		$("#btnSubmit").click(function(){
			$("#fm").form("submit",{
				"url":"add.action",
				"onSubmit":function(){
					return $(this).form('enableValidation').form('validate');
				},
				"success":function(result){
					var msg="";
					if(result>0){
						$("#fm").form("reset");
						msg="新增成功!";
					}else{
						msg="新增失败!";
					}
					$.messager.show({
						"title":"系统消息",
						"msg":msg,
						"timeout":2000,
						"showType":"solide"
					});
				}
				
			});
		});
		$("#btnReset").click(function(){
			$("#fm").form("reset");
		});
	});
</script>
</head>
<body>
	<div class="easyui-panel" data-options="title:'用户新增信息'" style="height: 540px;padding-top: 80px">
	<form id="fm" style="margin-left: 300px" class="easyui-form" data-options="novalidate:true" method="post">
	<input type="hidden" name="id">
		<table>
			<tr>
				<td>用户名:</td>
				<td>
					<input class="easyui-textbox" data-options="required:true" name="username" style="width: 300px">
				</td>
			</tr>
			<tr>
				<td>密码:</td>
				<td>
					<input class="easyui-passwordbox" data-options="required:true" name="password" style="width: 300px">
				</td>
			</tr>
			<tr>
				<td colspan="2" style="text-align: center;">
					<a id="btnSubmit" href="javaScript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-ok'">添加</a>
					<a id="btnReset" href="javaScript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-reload'">重置</a>
				</td>
			</tr>
		</table>
	</form>
</div>
</body>
</html>