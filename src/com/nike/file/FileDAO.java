package com.nike.file;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.nike.util.DBconnector;

public class FileDAO {
	
	public FileDTO selectOne(int num) throws Exception{
		Connection con = DBconnector.getConnect();
		String sql = "select * from image where imagenum=?";
		PreparedStatement st = con.prepareStatement(sql);
		st.setInt(1, num);
		ResultSet rs = st.executeQuery();
		FileDTO fileDTO = null;
		if(rs.next()) {
			fileDTO = new FileDTO();
			fileDTO.setImageNum(rs.getInt("imagenum"));
			fileDTO.setFname(rs.getString("fname"));
			fileDTO.setOname(rs.getString("oname"));
			fileDTO.setPut(rs.getString("put"));
		}
		DBconnector.disConnect(rs, st, con);
		return fileDTO;
		
	}
		
	public FileDTO selectOne(String code) throws Exception{
		Connection con = DBconnector.getConnect();
		String sql = "select * from image where productcode=? order by put desc";
		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, code);
		ResultSet rs = st.executeQuery();
		FileDTO fileDTO = null;
		if(rs.next()) {
			fileDTO = new FileDTO();
			fileDTO.setImageNum(rs.getInt("imagenum"));
			fileDTO.setFname(rs.getString("fname"));
			fileDTO.setOname(rs.getString("oname"));
			fileDTO.setPut(rs.getString("put"));
		}
		DBconnector.disConnect(rs, st, con);
		return fileDTO;
		
	}

	public List<FileDTO> selectList(String code) throws Exception{
		Connection con = DBconnector.getConnect();
		String sql = "select * from image where productcode=? order by put desc";
		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, code);
		ResultSet rs = st.executeQuery();
		List<FileDTO> ar = new ArrayList<>();
		while(rs.next()) {
			FileDTO fileDTO = new FileDTO();
			fileDTO.setImageNum(rs.getInt("imageNum"));
			fileDTO.setProductCode(rs.getString("productCode"));
			fileDTO.setFname(rs.getString("fname"));
			fileDTO.setOname(rs.getString("oname"));
			fileDTO.setPut(rs.getString("put"));
			ar.add(fileDTO);
		}
		
		DBconnector.disConnect(rs, st, con);
		return ar;
		
	}
	
	
	public int insert(FileDTO fileDTO) throws Exception{
		
		Connection con = DBconnector.getConnect();
		String sql = "insert into image values(image_seq.nextval,?,?,?,?)";
		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, fileDTO.getProductCode());
		st.setString(2, fileDTO.getFname());
		st.setString(3, fileDTO.getOname());
		st.setString(4, fileDTO.getPut());
		int result = st.executeUpdate();
		
		DBconnector.disConnect(st, con);
		return result;
	}
	
	
	public int delete(String code) throws Exception{
		
		Connection con = DBconnector.getConnect();
		String sql = "delete image where productcode=?";
		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, code);
		int result = st.executeUpdate();
		DBconnector.disConnect(st, con);
		
		return result;
	}
	
	public int update(FileDTO fileDTO) throws Exception{
		
		Connection con = DBconnector.getConnect();
		String sql = "update image set fname=?, oname=? where imagenum=?";
		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, fileDTO.getFname());
		st.setString(2, fileDTO.getOname());
		st.setInt(3, fileDTO.getImageNum());
		int result = st.executeUpdate();
		DBconnector.disConnect(st, con);
		
		return result;
		
	}
	
	
}
