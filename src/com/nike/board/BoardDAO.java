package com.nike.board;

import java.util.List;

import com.nike.page.RowNumber;
import com.nike.page.Search;

public interface BoardDAO {
	
	public List<BoardDTO> selectList(RowNumber rowNumber) throws Exception;
	
	public BoardDTO selectOne(int num) throws Exception;
	
	public int insert(BoardDTO boardDTO) throws Exception;
	
	public int update(BoardDTO boardDTO) throws Exception;
	
	public int delete(BoardDTO boardDTO) throws Exception;
	
	public int getCount(Search search) throws Exception;

}
