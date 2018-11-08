package com.nike.page;

public class MakePager {
	private int curPage;
	private int perPage;
	private Row row;
	private Search search;

	public MakePager(int curPage, String kind, String search) {
		this(curPage, 10, kind, search);
	}

	public MakePager(int curPage, int perPage, String kind, String search) {
		this.curPage = curPage;
		this.search = new Search();
		this.search.setKind(kind);
		this.search.setSearch(search);
		this.perPage = perPage;
	}

	public Row row() {
		row = new Row();
		row.setRowStart((this.curPage - 1) * this.perPage + 1);
		row.setRowLast(this.curPage * this.perPage);
		row.setSearch(this.search);
		return row;
	}

	public Pager makePage(int totalCount) {
		int totalPage = totalCount / this.perPage;
		if (totalCount % this.perPage != 0) {
			totalPage++;
		}

		int perBlock = 10;
		int totalBlock = totalPage / perBlock;
		if (totalPage % perBlock != 0) {
			totalBlock++;
		}

		int curBlock = this.curPage / perBlock;
		if (this.curPage % perBlock != 0) {
			curBlock++;
		}

		int startNum = (curBlock - 1) * perBlock + 1;
		int lastNum = curBlock * perBlock;

		if (curBlock == totalBlock) {
			lastNum = totalPage;
		}

		Pager pager = new Pager();
		pager.setStartNum(startNum);
		pager.setLastNum(lastNum);
		pager.setCurBlock(curBlock);
		pager.setTotalPage(totalPage);
		pager.setTotalBlock(totalBlock);
		pager.setSearch(this.search);

		return pager;
	}
}
