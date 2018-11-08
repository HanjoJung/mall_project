package com.nike.product;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.nike.util.DBconnector;

public class ProductDAO {
	
	public List<ProductDTO> selectList() throws Exception{
	
		Connection con = DBconnector.getConnect();
		String sql = "select * from product order by desc";
		PreparedStatement st = con.prepareStatement(sql);
		ResultSet rs = st.executeQuery();
		
		List<ProductDTO> ar = new ArrayList<>();
		while(rs.next()) {
			ProductDTO productDTO = new ProductDTO();
			productDTO.setProductCode(rs.getString("productcode"));
			productDTO.setProductName(rs.getString("productname"));
			productDTO.setPrice(rs.getInt("price"));
			productDTO.setKind(rs.getString("kind"));
			productDTO.setHit(rs.getInt("hit"));
			productDTO.setSale(rs.getInt("sale"));
			productDTO.setGood(rs.getInt("good"));
			productDTO.setManufacturerCode(rs.getString("manufacturercode"));
			
			ar.add(productDTO);
			
		}
		DBconnector.disConnect(rs, st, con);
		return ar;
		
	}
	
	
	public ProductDTO selectOne(String code) throws Exception{
		
		Connection con = DBconnector.getConnect();
		String sql = "select * from product where productcode=?";
		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, code);
		ResultSet rs = st.executeQuery();
		ProductDTO productDTO = null;
		if(rs.next()) {
			productDTO = new ProductDTO();
			productDTO.setProductCode(rs.getString("productcode"));
			productDTO.setProductName(rs.getString("productname"));
			productDTO.setPrice(rs.getInt("price"));
			productDTO.setKind(rs.getString("kind"));
			productDTO.setHit(rs.getInt("hit"));
			productDTO.setSale(rs.getInt("sale"));
			productDTO.setGood(rs.getInt("good"));
			productDTO.setManufacturerCode(rs.getString("manufacturercode"));
			
		}
		DBconnector.disConnect(rs, st, con);
		return productDTO;
		
		
	}
	
	public int insert(ProductDTO productDTO) throws Exception{
		
		Connection con = DBconnector.getConnect();
		String sql = "insert into product values(nike+product_seq.nextval,?,?,?,0,0,0,?)";
		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, productDTO.getProductName());
		st.setInt(2, productDTO.getPrice());
		st.setString(3, productDTO.getKind());
		st.setString(4, productDTO.getManufacturerCode());
		
		int result = st.executeUpdate();
		DBconnector.disConnect(st, con);
		return result;
		
		
	}
	
	
	public int delete(String code) throws Exception{
		
		Connection con = DBconnector.getConnect();
		String sql = "delete product where productcode=?";
		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, code);
		int result = st.executeUpdate();
		DBconnector.disConnect(st, con);
		return result;
		
	}
	
	
	public int update(ProductDTO productDTO) throws Exception{
		
		Connection con = DBconnector.getConnect();
		String sql = "update product set productname=?, price=? where productcode=?";
		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, productDTO.getProductName());
		st.setInt(2, productDTO.getPrice());
		st.setString(3, productDTO.getProductCode());
		
		int result = st.executeUpdate();
		DBconnector.disConnect(st, con);
		
		return result;
		
		
		
	}
	
	
	

}
