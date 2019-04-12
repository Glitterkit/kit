package com.test.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.test.pojo.User;

public interface UserMapper {
	/**
	 * 添加用户
	 * @param user
	 * @return
	 */
	public int addUser(@Param("username")String username,@Param("password")String password);
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
	public int delectUser(@Param("id")Integer id);
}
