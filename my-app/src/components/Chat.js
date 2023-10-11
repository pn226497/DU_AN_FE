import React, { useEffect, useState, useRef } from 'react'
import styled from '@emotion/styled';
import InfoIcon from '@mui/icons-material/Info';
import Message from './Message';
import ChatInput from './ChatInput';
import {useSelector} from 'react-redux'
import {selectRoomId} from '../features/roomSlice'
import {getFirestore,collection, query, orderBy, getDoc, doc} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import {app} from '../firebase'

function Chat() {
  const roomId = useSelector(selectRoomId)
  const chatRef = useRef(null)
  const db = getFirestore(app)
  const messages = []
  const [roomNames, setRoomNames] = useState()
//  console.log(roomNames);
  const getChannels = async () => {
   
      if(roomId){
        const roomName = doc(db, 'Rooms', roomId);
        const docsSnap = await getDoc(roomName);
      if(docsSnap.exists()){
        setRoomNames(docsSnap.data().name)
      }
      }
      return
  };
  const roomRef = query( 
    collection(db, 'Rooms',roomId ? roomId: 'z0SNyyHltioMSxavwVwk', 'Messages'),
    orderBy('timestamp', 'asc')
  )
  const [value] = useCollection( roomRef  );
    if (value) {
      value.docs.forEach((doc) => {
        messages.push(doc.data())
        // console.log('value', doc.data);

      })
    }

    useEffect (() => {
      chatRef.current?.scrollIntoView({
        behavior: 'smooth'
      })
    })
    useEffect(() => {
      getChannels();
    },[roomId])

  return (
    <div>
      <ChatContainer>
        <ChatHeader>
          <ChatHeaderLeft>
            <h3>
              <strong># {roomNames}</strong>
            </h3>
          </ChatHeaderLeft>
          <ChatContainerRight>
            <p>
              <InfoIcon />
              Details
            </p>
          </ChatContainerRight>
        </ChatHeader>
        {messages?.map((item, index) => {
          const { message, user, userImage, timestamp } = item;
          return (
            <Message 
              key={index}
              message = {message}
              user = {user}
              timestamp = {new Date(timestamp * 1000).toLocaleTimeString()}
              userImage = {userImage}
            />
          )
        })}
        <ChatInput 
        chatRef={chatRef} 
        channelName='' 
        channelId={roomId} />
      </ChatContainer>
    </div>

  )
}

export default Chat

const ChatContainer = styled.div`
flex: 0.7%;
flex-grow:1;
overflow-y: scroll;
margin-top: 60px;
`;

const ChatHeader = styled.div`
display: flex;
justify-content: space-between;
padding: 20px;
border-bottom: 1px solid gray;
`;

const ChatHeaderLeft = styled.div`
// display: flex;
// align-items: center;
// > h4 {
//   display: flex;
//   text-transform: lowercase;
//   margin-right: 10px;
// }
// >h4 >.MuiSvgIcon-root {
//   margin-left: 10px;
//   font-size: 18px;
// }
`;

const ChatContainerRight = styled.div`
> p {
  display: flex;
  align-items:center;
  font-size: 14px;
  
}
> p > .MuiSvgIcon-root {
  margin-right: 5px !important;
  font-size: 16px;
}
`

