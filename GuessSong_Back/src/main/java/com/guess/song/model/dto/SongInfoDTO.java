package com.guess.song.model.dto;

import java.sql.Timestamp;

import com.guess.song.model.entity.SongBoard;
import com.guess.song.model.entity.SongInfo;

import lombok.Data;

@Data
public class SongInfoDTO {
	private Integer songPk;
	
	private String youtubeUrl;
	
	private String answer;
	
	private String hint;
	
	private SongBoard songBoard;
	
	private Timestamp createTime;
	
	public SongInfoDTO(SongInfo songInfo) {
		this.songPk = songInfo.getSongPk();
		this.youtubeUrl = songInfo.getYoutubeUrl();
		this.answer = songInfo.getAnswer();
		this.hint = songInfo.getHint();
		this.songBoard = songInfo.getSongBoard();
	}
}
