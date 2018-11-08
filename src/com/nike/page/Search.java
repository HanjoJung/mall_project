package com.nike.page;

public class Search {
	private String kind;
	private String search;

	public String getKind() {
		return kind;
	}

	public void setKind(String kind) {
		if (kind == null) {
			kind = "";
		}
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
