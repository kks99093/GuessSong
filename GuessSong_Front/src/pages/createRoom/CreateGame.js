import React from 'react';
import {useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import './createGame.css';

export default function CreateGame(){
    const titleName = "방 만들기";
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerHTML = titleName;
    const [songBoard, setSongBoard] = useState([]);
    const [searchParams] = useSearchParams([]);
    const url = 'http://localhost:80/createGame?boardPk='+searchParams.get('boardPk');
    

    useEffect(() =>{
        fetch(url,{
            method : "GET"
        })
        .then(res => res.json())
        .then((res) => {
            setSongBoard(res);
        });
    });

    const submitCreateFrm = () =>{
        const regTypeUserName = /^[가-힣a-zA-z\s0-9]{1,6}$/;
        const regTypeTitle = /^.{3,30}$/;
        let userName = document.getElementById("userName").value.trim();
        let title = document.getElementById("title").value.trim();
        let password = document.getElementById("password").value.trim();
        if(userName === '' || userName === undefined || !regTypeUserName.test(userName)){
            alert('닉네임은 1~6 글자로 입력해 주세요');
            return;
        }else if(title === '' || title === undefined || !regTypeTitle.test(title)){
            alert('방제목은 3~30 글자로 입력해 주세요');
            return;
        }
        const formData = new FormData(document.getElementById('createGameFrm'));
        const data  = new URLSearchParams(formData); //문자열로만 이루어진 데이터를 보낼때
        const url = "http://localhost:80/proc/createGameRoom";

        fetch(url, {
            method : "POST",
            headers : {
                "Content-Type" : "application/x-www-form-urlencoded"
            },
            body : data
        })
        .then()
        .then()

    }

    return(
        <> 
        <div className='title_div'>
            <span className='title_span'> {songBoard.title}</span>
        </div>
        <div className='modSel_container'>
            <div className='mode_div'>
                <div id='multiPlay_div'>
                    <span>방 만들기</span>
                </div>
            </div>        
            <div className="create_div">
                <form id="createGameFrm">
                    <div className="create_span">닉네임 : <input className="create_input" type="text" id="userName" name="userName" /></div>
                    <div className="multi_div">
                        <div className="create_span">제목 : <input className="create_input multi_input" type="text" id="title" name="title" /></div>
                        <div className="create_span">비밀번호 : <input placeholder="공백일 경우 비밀번호 없음" className="create_input multi_input" type="password" id="password" name="password" /></div>
                        <div className="create_span">최대인원 :
                        <select className="create_input" name="amount">
                            <option className="create_input ">1</option>
                            <option className="create_input">2</option>
                            <option className="create_input">3</option>
                            <option className="create_input">4</option>
                            <option className="create_input">5</option>
                            <option className="create_input">6</option>
                            <option className="create_input">7</option>
                            <option className="create_input">8</option>
                        </select> 
                        </div>
                    </div>
                    <input type="hidden" name="userRole" value="1"/>
                    <input type="hidden" name="boardPk" value={songBoard.boardPk || ''}/>
                    <input type="hidden" name="createRoom" value="1"/>
                    <div className="create_div" onClick={submitCreateFrm}><span id="create_btn">만들기</span></div>
                </form>
            </div>
		</div>
        </>
    );
}

