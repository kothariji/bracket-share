import React, {useEffect, useState} from 'react'
import io from 'socket.io-client';
import './PairProgramming.css'

const socket = io.connect();

function PairProgramming() { 
    const [codeSnippet, setCodeSnippet] = useState();
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    
    const updateCodeSnippet = (e) => {
        e.preventDefault();
        setCodeSnippet(e.target.value);
        socket.emit('chat', {codeSnippet: e.target.value, roomId: roomId});
    }

    useEffect(() => {
        socket.on('chat', (payload) => {
            setCodeSnippet(payload.codeSnippet);
        })
        
        let roomCode = localStorage.getItem("roomCode");
        if(roomCode){
            setRoomId(roomCode);
            socket.emit('room', {roomId: roomCode});
        }
        let userName = localStorage.getItem("userName");
        if(roomCode){
            setUserName(userName);
        }
    })

    return (
        <div className="container">
            <h1>Hello {userName}: [{roomId}]</h1>
          
            <div className="row">
                <div className="col-md-8">
                    <textarea 
                    className="codeEditor" 
                    placeholder="Pair Programming"
                    value={codeSnippet}
                    onChange={updateCodeSnippet}
                    >
                    </textarea>
                    </div>
                <div className="col-md-4 chat-window">
                    <div className="chat-container">
                        <div className="message left">
                            XYZ: Hello Bhai Kaise ho
                        </div>
                        <div className="message right">
                            Me: Badhiya
                        </div>                        
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Type your message here..." />
                        <div class="input-group-append">
                            <span class="input-group-text">Send</span>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default PairProgramming