import './main.css';
import React from 'react';
import { useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';



export default function Main(){
    const titleName = "메인";
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerHTML = titleName;
    const [songBoardList, setSongBoardList] = useState([]);
    const [songBoardPage, setSongBoardPage] = useState([]);
    const [pageNumber, setPageNumber] = useState([]);
    const [pageArr, setPageArr] = useState([]);
    
    

    const navigate = useNavigate();
    const movRegSong = () =>{
        navigate("/board/regSong");
    }
    const movJoinGame = () =>{
        navigate("/board/gameList");
    }
    
    //함수 실행시 최초 한번 실행됨
    useEffect(() => {
        
        fetch("http://localhost:80/songBoardList",{
            method : "GET" //생략가능
        }).then(res => res.json())
        .then(res =>{
            drawBoard(res);
        });
    },[]); //뒤에 디펜던시에 []로 생략하는 이유 : 최초 한번만 실행되고 끝날거기때문
    

    const searchBoard = (pgNum) =>{
        let url = "";
        let searchText = document.getElementById("searchText").value;
        if(searchText !== "" && typeof(pgNum) ===typeof(pageNumber)){
            url = "http://localhost:80/songBoardList?searchText=" + searchText + "&page=" + pgNum;
        }else if(searchText === "" && typeof(pgNum) ===typeof(pageNumber)){
            url = "http://localhost:80/songBoardList?page=" + pgNum;
        }else{
            url = "http://localhost:80/songBoardList?searchText="+searchText;
        }
        
        if(searchText.trim().length > 20){
            alert("검색은 20글자 이하로만 가능합니다");
            return
        }
        fetch(url,{
            method : "GET",        
        }).then(res => res.json())
        .then(res =>{
            drawBoard(res)
        });
    }


    const drawBoard = (res) => {
        let arr = [];
        let startIdx = res.pageable.pageNumber / 10 < 1 ? 1 : res.pageable.pageNumber;
        let lastIdx = res.totalPages > startIdx+10 ? startIdx + 10 : res.totalPages;
        for(let i = startIdx;  i <= lastIdx; i++){
            arr.push(i);
        }
        
        setPageArr(arr);
        setSongBoardList(res.content);
        setPageNumber(res.pageable.pageNumber);
        setSongBoardPage(res);
    }

    const searchKey_press = (e) =>{
        if(e.key === "Enter"){
            searchBoard();
        }
    }

    

    return(
        <>
        
        <div className='container'> 
            <div className='left_div'>
                <div className='regSong_div left_border' id='regSong_btn'>
                    <span className='left_span' id='regSong_span' onClick={movRegSong}>노래 등록</span>
                </div>
                <div className='joinMultiGame_div left_border' id='joinMultiGame' >
                    <span className='left_span' id='joinMultiGame_span' onClick={movJoinGame} >게임 참여하기</span>
                </div>
            </div>
            <div className='right_div'>
                <div className='search_div'>
                    <input type='text' placeholder='노래 검색' name='searchText' id='searchText' onKeyUp={searchKey_press}/><span id='search_span' onClick={searchBoard}>검색</span>
                </div>
                <div className='songBoardList_div'>
                {songBoardList.map((songBoard) => (
                    <SongBoard key={songBoard.boardPk} songBoard={songBoard}/>
                ))};
                </div>
                <div className='page_div'>
                    <ul>                    
                        <li className={pageNumber === 0 ? 'disable_evt disable_cursor' : ''} onClick={() => {searchBoard(pageNumber-1)}}>이전</li>                        
                        {pageArr.map((idx) =>{
                            return (<li key={idx} className={pageNumber === idx-1 ? 'disable_evt disable_cursor' : ''} onClick={()=>{searchBoard(idx-1)}} >{idx}</li>)
                        })}
                        <li className={pageNumber === songBoardPage.totalPages -1 ? 'disable_evt disable_cursor' : ''} onClick={() => {searchBoard(pageNumber+1)}}>다음</li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    );
}


function SongBoard(props){
    const{boardPk, title, img} = props.songBoard;
    const navigate = useNavigate();
    const moveGameSel = () =>{
        navigate("/board/modeSel?boardPk="+boardPk);
    }
    return(
        <>
        <div className='songBoard_div'>
            <div className='songBoard_img_div' id='songBoard_img_div'>
                <div id='board_img_div' onClick={moveGameSel}>{
                        img === "" ? <img src="/upload/default/headSet.png" width={200} height={200} alt='test'></img> : <img src={"/upload/songBoard/"+img} width={200} height={200} alt='test'></img>
                    }
                </div>
            </div>
            <div className='board_title_div'>
                <span className='board_title_span'>{title}</span>
                <span className='drop_menu'>...</span>
            </div>
            <div className='drop_menu_board' id='drop_menu_board'>
                <div className='update_board_div'>수정</div>
                <div className='delete_board_div'>삭제</div>
            </div>
        </div>
        
        </>

    );
}


