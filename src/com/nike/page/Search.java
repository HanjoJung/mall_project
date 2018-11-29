package com.nike.page;

public class Search {
	private String kind;
	private String search;
	private String order;
	

	public String getOrder() {
		return order;
	}

	public void setOrder(String order) {
		this.order = order;
	}

	public String getKind() {
		return kind;
	}

	public void setKind(String kind) {
		this.kind = kind;
	}

	public String getSearch() {
		return search;
	}

	public void setSearch(String search) {
		if (search == null) {
			search = "";
		}
		this.search = search;
	}
}
