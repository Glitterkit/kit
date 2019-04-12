package com.test.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.gson.Gson;
import com.test.pojo.User;
import com.test.service.UserService;

@Controller
public class UserController {
	@Autowired
	private UserService userService;

	
	@RequestMapping("/selectUser")
	public void selectUser(Model model,HttpServletResponse resp) throws IOException{
		List<User> list = userService.selectUser();
		model.addAttribute("list", list);
		resp.getWriter().println(new Gson().toJson(list));
	}
	
	@RequestMapping("/add")
	public void addUser(String username,String password,HttpServletResponse resp) throws IOException{
		resp.setCharacterEncoding("UTF-8");
		resp.getWriter().print(userService.addUser(username,password));
	}
	
	@RequestMapping("/updateUser")
	public void updateUser(User user,HttpServletResponse resp) throws IOException{
		resp.setCharacterEncoding("UTF-8");
		resp.getWriter().print(userService.updateUser(user));
		
	}
	@RequestMapping("/delectUser")
	public void delectUser(Integer id,HttpServletResponse resp)throws IOException{
		resp.setCharacterEncoding("UTF-8");
		resp.getWriter().print(userService.delectUser(id));
	}
}
