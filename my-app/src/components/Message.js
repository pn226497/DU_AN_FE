import React from 'react'
import styled from '@emotion/styled'

function Message({user, message,timestamp, userImage}) {
  return (
    <MessageContainer>
        <img src={userImage ? userImage: 'https://i.pravatar.cc/300'} alt=''/>
        <MessageInfo>
            <h4>
                {user}
                <span>{timestamp.toString()}</span>
            </h4>
            <p>{message}</p>
        </MessageInfo>
    </MessageContainer>
  )
}

export default Message

const MessageContainer = styled.div`
display: flex;
align-items: center;
padding:20px;
>img {
    height:50px;
    border-radius: 10px;
}
`;
const MessageInfo = styled.div`
padding-left:15px;
> h4 > span {
color: gray;
font-size:.8rem;
font-weight: 400;
margin-left:10px;
}
`;