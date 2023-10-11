import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Button } from '@mui/material';
import { getFirestore, collection, serverTimestamp, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function ChatInput({ chatRef, channelId }) {
    const [message, setMessage] = useState('');
    const [user, setUser] = useState('')
    const db = getFirestore()
    const auth = getAuth();

    // onAuthStateChanged(auth, setUser); khi chạy sẽ bị render lại nhìu lần nên phải cho vào useEff để ngưng render lại nhìu lần dẫn tới tràn dữ liệu
    useEffect(() => {
        onAuthStateChanged(auth, setUser);

    }, [])

    const roomRef = collection(db, 'Rooms',channelId ? channelId : 'z0SNyyHltioMSxavwVwk', 'Messages')
    const handleInput = (e) => {
        setMessage(e.target.value)
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        const data = {
            message: message,
            timestamp: serverTimestamp(),
            user: user?.displayName,
            userImage: user?.photoURL,
        }
        if(channelId) {
            addDoc(roomRef, data)
            .then(docRef => {    
                console.log("Document has been added successfully");
            })
            .catch(error => {    
                console.log(error);
            }) 
        }else return
        setMessage('')
      };   
    return (
        <ChatInputContainer>
            <form>
                <input
                    ref={chatRef}
                    name='message'
                    value={message}
                    type="text"
                    placeholder='Type a message...'
                    onChange={handleInput} />
                <Button type='submit' onClick={(e) => handleSendMessage(e)} >
                    Send{' '}
                </Button>
            </form>
        </ChatInputContainer>
    )
}

export default ChatInput

const ChatInputContainer = styled.div`
> form {
    display: flex;
    justify-content: center;
}
> form > input {
    position:fixed;
    bottom:35px;
    width: 60%;
    border-radius: 5px;
    outline: none;
    height:20px;
    padding:10px;
}

> form > button {
    position:fixed;
    bottom:38px;
    right:110px;

}
`;
