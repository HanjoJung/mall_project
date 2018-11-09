package com.nike.member;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.nike.page.RowNumber;
import com.nike.util.DBconnector;

public class MemberDAO {

	public int insert(MemberDTO memberDTO) throws Exception {
		Connection con = DBconnector.getConnect();
		String sql = "insert into member values(?,?,?,?,?,?,?,?,sysdate,?,?)";

		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, memberDTO.getId());
		st.setString(2, memberDTO.getPassword());
		st.setString(3, memberDTO.getNickname());
		st.setString(4, memberDTO.getEmail());
		st.setString(5, memberDTO.getPhone());
		st.setString(6, memberDTO.getAddress());
		st.setString(7, memberDTO.getSex());
		st.setInt(8, memberDTO.getAge());
		st.setString(9, memberDTO.getProfileFname());
		st.setString(10, memberDTO.getProfileOname());
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
		String sql = "select * from member where id=? and password=?";

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

	public List<MemberDTO> seleteList(RowNumber rowNumber) throws Exception {
		Connection con = DBconnector.getConnect();
		String sql = "select * from " + 
				"(select rownum R, m.* from " + 
				"(select * from member order by join_date desc, id desc) m) " + 
				"where R between ? and ?";
		
		List<MemberDTO> ar = new ArrayList<>();

		PreparedStatement st = con.prepareStatement(sql);
		st.setInt(1, rowNumber.getStartRow());
		st.setInt(2, rowNumber.getLastRow());
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
			ar.add(memberDTO);
		}

		DBconnector.disConnect(rs, st, con);
		return ar;
	}
	
	public int totalCount() throws Exception{
		Connection con = DBconnector.getConnect();
		String sql = "select count(id) from member";
		
		PreparedStatement st = con.prepareStatement(sql);
		ResultSet rs = st.executeQuery();
		rs.next();
		int result = rs.getInt(1);
		
		DBconnector.disConnect(rs, st, con);
		return result;
	}
}
