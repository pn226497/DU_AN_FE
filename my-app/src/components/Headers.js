import React from 'react'
import styled from 'styled-components'
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { backgroundColor } from '../constants/variable';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { Tooltip } from '@mui/material';
import { getLocalStorage } from '../utils/localStorage';

function Header() {
    const user = useSelector(selectUser);
    const userInfo = user ? user : getLocalStorage('chatapp');
  return (
    <HeaderContainer backgroundcolor= {backgroundColor}>
        <HeaderLeft>
            <Avatar alt='avarta' src={userInfo ? userInfo.photoURL: ''}/>
            <div style={{marginLeft: 20}}>
                <div>{userInfo && userInfo.displayName}</div>
                <Tooltip title = {userInfo && userInfo.email}>
                    <Email>{userInfo && userInfo.email}</Email>
                </Tooltip>
            </div>
            <HistoryIcon/>
        </HeaderLeft>
        <HeaderSearch>
            <SearchIcon/>
            <input type='text' placeholder='Search' value='' onChange={()=>{}}/>
        </HeaderSearch>
        <HeaderRight>
            <HelpOutlineIcon/>
        </HeaderRight>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
    // position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 15px 0;
    background-color: ${props => props.backgroundcolor};
    color: white
`
const HeaderLeft = styled.div`
    flex: 0.3;
    display: flex;
    align-items: center;
    > .MuiSvgIcon-root{
        margin-left: auto;
        margin-right: 30px;
    }
`;
const HeaderSearch = styled.div`
    flex: 0.4;
    display: flex;
    background-color: #421f44;
    align-items: center;
    text-align: center;
    color: gray;
    padding: 0 50px;
    opacity: 1;
    border: 1px gray solid;
    border-radius: 7px;
    > input {
        background-color: transparent;
        text-align: center;
        border: none;
        color: white;
        min-width: 30vw;
        outline: 0;
    }
`;
const HeaderRight = styled.div`
    flex: 0.3;
    display: flex;
    align-items: flex-end;
    > .MuiSvgIcon-root{
        margin-left: auto;
        margin-right: 30px;
    }
`;
const Email = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100px;
`;