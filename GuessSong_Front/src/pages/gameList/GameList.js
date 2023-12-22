import React from 'react';
import './gameList.css';
import {useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';


export default function GameList(){
    const titleName = "게임 리스트";
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerHTML = titleName;
    const [pageNumber, setPageNumber] = useState([]);
    const [pageArr, setPageArr] = useState([]);
    const [gameListPage, setGameListPage] = useState([]);

    let roomNumber = 0;
    const regTypeUserName = /^[가-힣a-zA-z\s0-9]{1,6}$/;

    const [gameList, setGameList] = useState([]);

    const drawBoard = (res) =>{
        let arr = [];
        let startIdx = res.pageable.pageNumber / 10 < 1 ? 1 : res.pageable.pageNumber;
        let lastIdx = res.totalPages > startIdx + 10 ? startIdx + 10 : res.totalPages;
        for(let i = startIdx; i <= lastIdx; i++){
            arr.push(i);
        }

        setPageArr(arr);
        setGameList(res.content);
        setPageNumber(res.pageable.pageNumber);
        setGameListPage(res);
    }

    const pageMove = (pgNum) =>{
        let url = "";
        if(typeof(pgNum) === typeof(pageNumber)){
            url = "http://localhost:80/gameList?page="+pgNum;
        }else{
            url = "http://localhost:80/gameList"
        }
        fetch(url, {
            method:"GET"
        })
        .then(res => res.json())
        .then(res =>{
            drawBoard(res);
        });

    }

    useEffect(pageMove,[])

    const clickGameRoom = (roomPk, psword)=>{
        const popup = document.querySelector('#popup');
        popup.classList.add('has-filter');
		popup.classList.remove('hide');
        roomNumber = roomPk;
        if(psword === 1){
            document.getElementById('pop_input_div').insertAdjacentHTML('beforeend',
                `<div id="pop_password_div"><span>비밀번호 : </span><input type="password" id="password"><div>`
            )
        }
    }

    const closePopup = () =>{
        const popup = document.getElementById('popup');
        popup.classList.add('hide');
        if(document.getElementById('pop_password_div') !== null){
            document.getElementById('pop_password_div').remove();
        }        
        roomNumber = 0;
    }

    const playGameClick = () => {
        const userName = document.getElementById('userName').value.trim();
        if(userName === undefined || userName === '' || !regTypeUserName.test(userName)){
            alert('닉네임을 1~6글자 입력해 주세요');
            return
        }else{
            const password = document.getElementById('password') === null ? null : document.getElementById('password').value;
            console.log(password);
            const data = {
                roomPk : roomNumber,
                userName : userName,
                password : password
            };
            fetch("http://localhost:80/rest/userNameChk",{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json; charset=utf-8",
                },
                body : JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res =>{
                if(res === 0){
                    alert('동일한 이름을 사용하는 사람이 있습니다.');
                    return;
                }else if(res === -1){
                    alert('비밀번호가 틀렸습니다.');
                    return;
                }else if(res === -2){
                    alert('인원이 가득 찼습니다.');
                    return;
                }else{
                    console.log("OK");
                }
            })
        }
    }
    return(
    <>
    <div>
        <div className='table_title_div'>
            <h3>게임 목록</h3>
        </div>	
        <table className='table_div'>
            <thead>
                <tr>
                    <th className='text-left th_title'>제목</th>
                    <th className='text-left th_reader'>방장</th>
                    <th className='text-left th_amount'>인원</th>
                    <th className='text-left th_pass'><span role='img' aria-label='자물쇠'>&#128274;</span></th>
                </tr>
            </thead>
            <tbody className='table-hover'>
                {gameList.map((gameRoom) =>{
                    return(
                        <tr className='gameList_tr' key={gameRoom.roomPk} onClick={() => {clickGameRoom(gameRoom.roomPk, gameRoom.password === null ? 0 : 1)}}>
                            <td className='text-left'>{gameRoom.title}</td>
                            <td className='text-left'>{gameRoom.reader}</td>
                            <td className='text-left'>{gameRoom.headCount} / {gameRoom.amount}</td>
                            <td>
                                { gameRoom.password === null ? '' : <span role='img' aria-label='자물쇠'>&#128274;</span>}
                            </td>
                        </tr>
                    )
                })}            
            </tbody>
        </table>
        <div className="page_div">
            <ul>
                <li className={pageNumber === 0 ? 'disable_evt disable_cursor' : ''} onClick={() => {pageMove(pageNumber-1)}}>이전</li>
                {pageArr.map((idx) =>{
                    return (<li key={idx} className={pageNumber === idx-1 ? 'disable_cursor current_page' : ''} onClick={() =>{pageMove(idx-1)}}>{idx}</li>)
                })}
                <li className={pageNumber === gameListPage.totalPages -1 ? 'disable_evt disbale_cursor' : ''} onClick={() =>{pageMove(pageNumber+1)}}>다음</li>
            </ul>
        </div>
    </div>
    <div id="popup" className='hide'>
        <div className='content'>
            <div className='pop_input_div' id='pop_input_div'>
                <div id="pop_userName_div"><span>닉네임 : </span><input type="text" id="userName"/></div>
            </div>
            <button id="playGame" onClick={playGameClick}> 들어가기</button>
            <button id="closePopup" onClick={closePopup}>닫기</button>
        </div>
    </div>
    </>
    );
}