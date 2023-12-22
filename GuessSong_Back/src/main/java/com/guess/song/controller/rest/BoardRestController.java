package com.guess.song.controller.rest;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.guess.song.model.RestFile;
import com.guess.song.model.param.GameRoomParam;
import com.guess.song.model.param.SongBoardParam;
import com.guess.song.model.param.SongInfoParam;
import com.guess.song.model.param.UserInfoParam;
import com.guess.song.service.BoardService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class BoardRestController {
	
	@Autowired
	private BoardService boardService;
	
	@PostMapping("/rest/boardDel")
	public int boardDel(@RequestBody SongBoardParam songBoardParam) {
		int result = boardService.delSongBoard(songBoardParam);
		return result;
		
	}
	
	@PostMapping("/rest/boardPassChk")
	public int boardPassChk(@RequestBody SongBoardParam songBoardParam) {
		int result = boardService.boardPassChk(songBoardParam);
		return result;
		
	}
	
	@CrossOrigin // CORS(외부의 자바 요청 차단)을 푸는방법인데 이렇게 하면 안됨 나중에 수정해줄거
	@GetMapping("/songBoardList")
	public ResponseEntity<?> selSongBoardList(@PageableDefault(sort = {"createTime"}, direction = Direction.DESC, size = 24) Pageable pageable, String searchText){
		return new ResponseEntity<>( boardService.selSongBoardList(pageable, searchText), HttpStatus.OK);
	}
	
	@CrossOrigin	
	@PostMapping("/proc/regSong")	
	public ResponseEntity<?> regSong(HttpServletRequest request, SongInfoParam songInfoParam, RestFile restFile) {
		boardService.regSong(songInfoParam, restFile, request);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@GetMapping("/gameList")
	public ResponseEntity<?> selGameList(@PageableDefault(sort = {"createTime"}, direction = Direction.DESC, size = 2) Pageable pageable){
		return new ResponseEntity<>(boardService.selGameRoom(pageable), HttpStatus.OK);
	}
	
	@CrossOrigin
	@GetMapping("/createGame")
	public ResponseEntity<?> createGame(SongBoardParam songBoardParam){
		return new ResponseEntity<>(boardService.selSongBoard(songBoardParam.getBoardPk()), HttpStatus.OK);
		
	}
	
	
	@CrossOrigin
	@PostMapping("/proc/createGameRoom")	
	public ResponseEntity<?> createGameRoom(UserInfoParam userInfoParam, GameRoomParam gameRoomParam, SongBoardParam songBoardParam){
		log.info(gameRoomParam.getAmount() + " dd");
		log.info(songBoardParam.getBoardPk() + " ff");
		log.info("test");
		return null;
		
	}
}
