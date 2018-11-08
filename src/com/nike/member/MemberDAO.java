package com.nike.member;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.nike.util.DBconnector;

public class MemberDAO {

	public int insert(MemberDTO memberDTO) throws Exception {
		Connection con = DBconnector.getConnect();
		String sql = "insert into member values(?,?,?,?,?,?,?,?,?,?,?)";

		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, memberDTO.getId());
		st.setString(2, memberDTO.getPassword());
		st.setString(3, memberDTO.getNickname());
		st.setString(4, memberDTO.getEmail());
		st.setString(5, memberDTO.getPhone());
		st.setString(6, memberDTO.getAddress());
		st.setString(7, memberDTO.getSex());
		st.setInt(8, memberDTO.getAge());
		st.setDate(9, memberDTO.getJoin_date());
		st.setString(10, memberDTO.getProfileFname());
		st.setString(11, memberDTO.getProfileOname());
		int result = st.executeUpdate();

		DBconnector.disConnect(st, con);
		return result;
	}

	public int update(MemberDTO memberDTO) throws Exception {
		Connection con = DBconnector.getConnect();
		String sql = "update member set password=?, nickname=?, email=?, phone=?, address=?, sex=?, age=? where id =?";

		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, memberDTO.getPassword());
		st.setString(2, memberDTO.getNickname());
		st.setString(3, memberDTO.getEmail());
		st.setString(4, memberDTO.getPhone());
		st.setString(5, memberDTO.getAddress());
		st.setString(6, memberDTO.getSex());
		st.setInt(7, memberDTO.getAge());
		st.setString(8, memberDTO.getId());
		int result = st.executeUpdate();

		DBconnector.disConnect(st, con);
		return result;
	}

	public int delete(MemberDTO memberDTO) throws Exception {
		Connection con = DBconnector.getConnect();
		String sql = "delete member where id = ?";

		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, memberDTO.getId());
		int result = st.executeUpdate();

		DBconnector.disConnect(st, con);
		return result;
	}

	public MemberDTO login(MemberDTO memberDTO) throws Exception {
		Connection con = DBconnector.getConnect();
		String sql = "selete * from member where id=? and pw=?";

		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, memberDTO.getId());
		st.setString(2, memberDTO.getPassword());
		ResultSet rs = st.executeQuery();

		if (rs.next()) {
			memberDTO.setNickname(rs.getString("nickname"));
			memberDTO.setEmail(rs.getString("email"));
			memberDTO.setPhone(rs.getString("phone"));
			memberDTO.setAddress(rs.getString("address"));
			memberDTO.setSex(rs.getString("sex"));
			memberDTO.setAge(rs.getInt("age"));
			memberDTO.setJoin_date(rs.getDate("join_date"));
			memberDTO.setProfileFname(rs.getString("profileFname"));
			memberDTO.setProfileOname(rs.getString("profileOname"));
		}

		DBconnector.disConnect(rs, st, con);
		return memberDTO;
	}

	public List<MemberDTO> seleteList() throws Exception {
		Connection con = DBconnector.getConnect();
		String sql = "selete * from member";
		List<MemberDTO> ar = new ArrayList<>();

		PreparedStatement st = con.prepareStatement(sql);
		ResultSet rs = st.executeQuery();

		while(rs.next()) {
			MemberDTO memberDTO = new MemberDTO();
			memberDTO.setNickname(rs.getString("nickname"));
			memberDTO.setEmail(rs.getString("email"));
			memberDTO.setPhone(rs.getString("phone"));
			memberDTO.setAddress(rs.getString("address"));
			memberDTO.setSex(rs.getString("sex"));
			memberDTO.setAge(rs.getInt("age"));
			memberDTO.setJoin_date(rs.getDate("join_date"));
			memberDTO.setProfileFname(rs.getString("profileFname"));
			memberDTO.setProfileOname(rs.getString("profileOname"));
		}

		DBconnector.disConnect(rs, st, con);
		return ar;
	}
}
