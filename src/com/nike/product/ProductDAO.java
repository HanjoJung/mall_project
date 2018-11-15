package com.nike.product;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.nike.page.RowNumber;
import com.nike.page.Search;
import com.nike.util.DBconnector;

public class ProductDAO {

	public int getCount(Search search) throws Exception {

		Connection con = DBconnector.getConnect();
		String sql = "select count(productcode) from product "
				+ "where " + search.getKind() + " like ?";
		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, "%" + search.getSearch() + "%");
		ResultSet rs = st.executeQuery();
		rs.next();
		int result = rs.getInt(1);

		DBconnector.disConnect(rs, st, con);
		return result;

	}
	
	public List<ProductDTO> selectList(RowNumber rowNumber) throws Exception {

		Connection con = DBconnector.getConnect();
		String sql = "select * from "
					+ "(select rownum R, N.* from "
					+ "(select * from product "
					+ "where "+rowNumber.getSearch().getKind()+" like ? "
					+ "order by productcode desc) N) "
					+ "where R between ? and ?";
		
		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, "%"+rowNumber.getSearch().getSearch()+"%");
		st.setInt(2, rowNumber.getStartRow());
		st.setInt(3, rowNumber.getLastRow());
		ResultSet rs = st.executeQuery();


		List<ProductDTO> ar = new ArrayList<>();
		while (rs.next()) {
			ProductDTO productDTO = new ProductDTO();
			productDTO.setProductCode(rs.getString("productcode"));
			productDTO.setProductName(rs.getString("productname"));
			productDTO.setPrice(rs.getInt("price"));
			productDTO.setKind(rs.getString("kind"));
			productDTO.setHit(rs.getInt("hit"));
			productDTO.setGood(rs.getInt("good"));
			
			ar.add(productDTO);
		}
		
		DBconnector.disConnect(rs, st, con);
		return ar;

	}

	public ProductDTO selectOne(String code) throws Exception {

		Connection con = DBconnector.getConnect();
		String sql = "select * from product where productcode=?";
		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, code);
		ResultSet rs = st.executeQuery();
		ProductDTO productDTO = null;
		if (rs.next()) {
			productDTO = new ProductDTO();
			productDTO.setProductCode(rs.getString("productcode"));
			productDTO.setProductName(rs.getString("productname"));
			productDTO.setPrice(rs.getInt("price"));
			productDTO.setKind(rs.getString("kind"));
			productDTO.setHit(rs.getInt("hit"));
			productDTO.setGood(rs.getInt("good"));
			productDTO.setManufacturerCode(rs.getString("manufacturercode"));
			productDTO.setContents(rs.getString("contents"));

		}
		DBconnector.disConnect(rs, st, con);
		return productDTO;

	}

	public int insert(ProductDTO productDTO) throws Exception {

	
		Connection con = DBconnector.getConnect();
		String sql = "insert into product values('nike'||product_seq.nextval,?,?,?,0,0,0,?,?,?)";
		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, productDTO.getProductName());
		st.setInt(2, productDTO.getPrice());
		st.setString(3, productDTO.getKind());
		st.setString(4, productDTO.getManufacturerCode());
		st.setString(5, productDTO.getWriter());
		st.setString(6, productDTO.getContents());

		int result = st.executeUpdate();
		DBconnector.disConnect(st, con);
		return result;

	}

	/*public static void main(String[] args) throws Exception{
		
		ProductDTO productDTO = new ProductDTO();
		ProductDAO productDAO = new ProductDAO();
		for(int i=0;i<50;i++) {
			productDTO.setProductName("nike"+i);
			productDTO.setPrice(2000);
			productDTO.setKind("max");
			productDTO.setManufacturerCode("usa");
			productDTO.setWriter("master");
			
			int a =productDAO.insert(productDTO);
			
		}
		System.out.println("end");
		
		
	}*/
	public int delete(String code) throws Exception {

		Connection con = DBconnector.getConnect();
		String sql = "delete product where productcode=?";
		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, code);
		int result = st.executeUpdate();
		DBconnector.disConnect(st, con);
		System.out.println(result);
		return result;

	}

	public int update(ProductDTO productDTO) throws Exception {

		Connection con = DBconnector.getConnect();
		String sql = "update product set productname=?, price=?, contents=? where productcode=?";
		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, productDTO.getProductName());
		st.setInt(2, productDTO.getPrice());
		st.setString(3, productDTO.getContents());
		st.setString(4, productDTO.getProductCode());
		int result = st.executeUpdate();
		DBconnector.disConnect(st, con);

		return result;

	}
	

}
