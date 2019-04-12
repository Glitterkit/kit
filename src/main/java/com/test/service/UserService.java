package com.test.service;

import java.util.List;

import com.test.pojo.User;

public interface UserService {
	/**
	 * 添加用户
	 * @param user
	 * @return
	 */
	public int addUser(String username,String password);
	/**
	 * 修改
	 * @param id
	 * @return
	 */
	public int updateUser(User user);
	
	/**
	 * 查询所有员工
	 * @return
	 */
	public List<User> selectUser();
	/**
	 * 根据id删除用户
	 * @param id
	 * @return
	 */
	public int delectUser(Integer id);
}
