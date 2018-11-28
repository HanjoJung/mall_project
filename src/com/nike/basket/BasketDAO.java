package com.nike.basket;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import com.nike.file.FileDTO;
import com.nike.product.ProductDTO;
import com.nike.util.DBconnector;

public class BasketDAO {

	public int insert(BasketDTO basketDTO) throws Exception {
		Connection con = DBconnector.getConnect();
		String sql = "insert into basket values(basket_seq.nextval,?,?,?)";
		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, basketDTO.getId());
		st.setString(2, basketDTO.getProductCode());
		st.setInt(3, basketDTO.getProductSize());
		int result = st.executeUpdate();
		DBconnector.disConnect(st, con);
		return result;
	}

	public List<BasketDTO> selectList(String id) throws Exception {

		Connection con = DBconnector.getConnect();
		String sql = "select i.fname, p.productname, p.productcode, p.price, b.productsize "
				+ "from basket b,product p,image i where b.productcode=p.productcode "
				+ "and b.productcode=i.productcode and b.productcode=i.productcode and "
				+ "b.id=? order by b.num asc";

		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1, id);
		ResultSet rs = st.executeQuery();
		List<BasketDTO> ar = new ArrayList<>();
		BasketDTO basketDTO= null;
		while (rs.next()) {
			basketDTO = new BasketDTO();
			basketDTO.setFname(rs.getString("fname"));
			basketDTO.setProductName(rs.getString("productname"));
			basketDTO.setProductCode(rs.getString("productcode"));
			basketDTO.setPrice(rs.getInt("price"));
			basketDTO.setProductSize(rs.getInt("productsize"));
			ar.add(basketDTO);
			/*System.out.println(basketDTO.getFname());
			System.out.println(basketDTO.getProductName());
			System.out.println(basketDTO.getProductCode());
			System.out.println(basketDTO.getPrice());			
			System.out.println(ar.size());*/
		}

		DBconnector.disConnect(rs, st, con);
		return ar;

	}
}