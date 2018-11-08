package com.nike.board;

public interface BoardReply {
	
	public int reply(BoardReplyDTO boardReplyDTO) throws Exception;
	
	public int replyUpdate(BoardReplyDTO boardReplyDTO) throws Exception;

}
