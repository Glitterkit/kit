<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>查询用户</title>
<base href="${pageContext.request.contextPath }/">
<link rel="stylesheet" type="text/css" href="themes/default/easyui.css" />
<link rel="stylesheet" type="text/css" href="themes/icon.css" />
<script src="js/jquery.min.js" type="text/javascript" charset="utf-8"></script>
<script src="js/jquery.easyui.min.js" type="text/javascript" charset="utf-8"></script>
<script src="js/easyui-lang-zh_CN.js" type="text/javascript" charset="utf-8"></script>
</head>
<script type="text/javascript">
	$(function(){
		$("#co").datagrid({
			"url":"selectUser.action",
			"columns":[[
				{field:'id',title:'序号',width:100,align:'center'},
				{field:'username',title:'登录名',width:100,align:'center'},
				{field:'password',title:'登录密码',width:100,align:'center'}
			]],
			"fitColumns":true,
			"rownumbers":true,
			"fit":true,
			"border":false,
			"striped":true,
			"toolbar":"#tool",
			"singleSelect":true
		});
		//给工具栏中修改按钮添加点击事件
		$("#butEdit").click(function(){
			//获取选择的类
			var selected=$("#co").datagrid("getSelected");
			if(selected==null){
				$.messager.alert("警告","请先选中在进行修改","warning");
			}else{
				//显示修改窗口
				$("#updDl").dialog({
					title:'修改用户信息',
					width:450,
					heigth:300,
					closed:false,
					modal:true,
					buttons:"#btn"
				});
				//让表单加载当前选中的信息
				$("#fm").form("load",selected);
			}
		});
		//给修改表单中的修改按钮添加点击事件
		$("#btnUpd").click(function(){
			$("#fm").form("submit",{
				"url":"updateUser.action",
				"success":function(data){
					var msg="";
					if(data>0){
						msg="修改成功!";
						//关闭修改窗口
						$("#updDl").dialog("close");
						//刷新页面
						$("#co").datagrid("reload");
					}else{
						msg="修改失败!";
					}
					$.messager.show({
						"title":"系统消息",
						"msg":msg,
						"timeout":2000,
						"showType":"slide"
					});
				}
			});
		});
		//给窗口中的取消按钮添加点击事件
		$("#btncancel").click(function(){
			$("#updDl").dialog("close");
		});
		//给删除按钮绑定点击事件
		$("#butDel").click(function(){
			//获取选择的类
			var selected=$("#co").datagrid("getSelected");
			if(selected==null){
				$.messager.alert("警告","请先选中在删除","warning");
			}else{
					//弹框提示是否删除数据
					$.messager.confirm("确认","确定要删除"+selected.uname+"吗？",function(r){
						if(r){
							$.get("delectUser.action",{"id":selected.id},function(data){
								var msg="";
								if(data){
									msg="删除成功";
									$("#co").datagrid("reload");
								}else{
									msg="删除成功";
								}
								$.messager.show({
									"title":"系统消息",
									"msg":msg,
									"timeout":2000,
									"showType":"slide"
								});
							});
						}
					});	
				}
			});
	});
</script>
<body>
<table id="co"></table>
<div id="tool">
	<a href="javaScript:void(0)" class="easyui-linkbutton" id="butEdit" data-options="iconCls:'icon-edit'">修改</a>
	<a href="javaScript:void(0)" class="easyui-linkbutton" id="butDel" data-options="iconCls:'icon-remove'">删除</a>
</div>
<!--修改用户信息的窗口  -->
<div id="updDl">
	<center>
		<form id="fm" method="post" style="margin-top: 20px;">
			<table>
				<tr>
					<td><input  name="id" style="width: 300px;" type="hidden"/></td>
				</tr>
				<tr>
					<td>用户名:</td>
					<td><input class="easyui-textbox" data-options="required:true" name="username" style="width: 300px;" /></td>
				</tr>
				<tr>
					<td>密码:</td>
					<td><input class="easyui-passwordbox" data-options="required:true" name="password" style="width: 300px;" /></td>
				</tr>
			</table>
		</form>
	</center>
</div>
<div id="btn">
	<a href="javaScript:void(0)" id="btnUpd" class="easyui-linkbutton" data-options="iconCls:'icon-ok'">修改</a>
	<a href="javaScript:void(0)" id="btncancel" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'">取消</a>
</div>
</body>
</html>