import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Headers from '../components/Headers'
import { Outlet, useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

function Home() {
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('chatapp'))
    {
      navigate('/login')
    }
  }, [])
  return (
    <div>
      <Headers />
      <ContentWrapper>
        <Sidebar />
        <ChatWrapper>
          <Outlet />
        </ChatWrapper>
      </ContentWrapper>
    </div>
  )
}

export default Home

const ContentWrapper = styled.div`
display: flex;

`;
const ChatWrapper = styled.span`
flex:1;
height: 100vh;
overflow: scroll;
margin-bottom: 100px;
`