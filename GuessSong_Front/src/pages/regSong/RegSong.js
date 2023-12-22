import React from 'react';
import { useNavigate} from 'react-router-dom';
import './regSong.css';

export default function RegSong(){
    let trNumber = 0;
    const titleName = "노래 등록하기";
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerHTML= titleName;
    const navigate = useNavigate();
    const regTypeTitle = /^.{3,30}$/;
    const regTypePw = /^[a-z0-9]{3,6}$/;


    const submitSongFrm = (e) =>{
        e.preventDefault(); //submit의 Action 방지
        const formData = new FormData(document.getElementById('regSongFrm'));
        let title = document.getElementById("title").value.trim();
		let password = document.getElementById("password").value.trim();
		if(title === undefined || title === "" || !regTypeTitle.test(title)){
			alert('제목은 3~30글자를 입력해 주세요')
			return;
		}else if(password === undefined || password === "" || !regTypePw.test(password)){
			alert('비밀번호는 영어(소문자),숫자로 3~6글자를 입력해 주세요')
			return;
		}

        fetch("http://localhost:80/proc/regSong", {
            method : "POST",
            headers : {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body : formData
        }).then(res => {
            if(res.status === 200){
                alert("등록이 완료 되었습니다.");
                navigate("/board/main");
            }else{
                alert("다시 시도해 주세요");
            }
        })

        
    }
    

    const addSongInfo = () =>{
        if(trNumber === 0){    
            trNumber = document.getElementById("trNumber").value;
        }
        trNumber++;        
        const songList_tbody = document.getElementById('songList_tbody');
        
        songList_tbody.insertAdjacentHTML('beforeend',
        `<tr id="songInfoTr${trNumber}">
            <td><input type="text" placeholder="유튜브주소" name="youtubeUrl" class="youtubeUrl" /></td>
            <td><input type="text" placeholder="정답" name="answer" class="answer" /></td>
            <td><input type="text" placeholder="힌트" name="hint" class="hint" /></td>
            <td><button type="button" id="remove_btn${trNumber}" class="remove_btn">X</button></td>
        </tr>`
        )
        let addOnClick = document.getElementById('remove_btn'+trNumber)
        addOnClick.addEventListener("click", ()=>removeTr(addOnClick));
        
       
    }

    const removeTr = (this_btn) =>{
        if(this_btn === undefined){
          this_btn = document.getElementById("remove_btn1");
        }
        this_btn.parentElement.parentElement.remove();
    }


    return(
        <>
        <section>
            <h1>노래 리스트 만들기</h1>
            <form id="regSongFrm">
            <div className='tbl-header'>
                <table cellSpacing="0" border="0">
                <thead>
                    <tr>
                    <th>제목</th>
                    <th>비밀번호</th>
                    <th>대표 이미지</th>
                    </tr>
                </thead>
                </table>
            </div>
            <div className="tbl-content">
                <table cellSpacing='0' border='0'>
                <tbody>
                    <tr>
                        <td><input type="text" placeholder="제목" name="title" id="title" defaultValue=""/></td>
                        <td><input type="password" placeholder="비밀번호" name="password" id="password"/> </td>
                        <td>이미지 : <input type="file" id="songImg" name="songImg" defaultValue=""/></td>
                    </tr>
                </tbody>
                </table>
            </div>
                <div className="tbl-header">
                <table cellPadding={0} cellSpacing={0} border={0}>
                <thead>
                    <tr>
                    <th>유튜브 주소</th>
                    <th>정답 </th>
                    <th>힌트</th>
                    <th><button type="button" id="add_songList_btn" onClick={addSongInfo}>노래 목록 추가</button></th>
                    </tr>
                </thead>
                </table>
            </div>
            <div className="tbl-content">
                <table cellSpacing="0" border="0">
                <tbody id="songList_tbody">
                    <tr id="songInfoTr1">
                        <td><input type="text" placeholder="유튜브 주소" name="youtubeUrl" className="youtubeUrl"/></td>
                        <td><input type="text" placeholder="정답" name="answer" className="answer"/> </td>
                        <td><input type="text" placeholder="힌트" name="hint" className="hint"/></td>
                        <td><button className="remove_btn" id="remove_btn1"type="button" onClick={() => removeTr()} >X</button></td>                        
                    </tr>                        
                </tbody>
                </table>
                <input type="hidden" id="trNumber" value={1}/>
            </div>
                <button className="submit_btn" onClick={submitSongFrm}>등록</button>
            </form>
        </section>
        </>
    );
}
