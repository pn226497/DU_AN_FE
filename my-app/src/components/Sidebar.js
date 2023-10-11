import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import { backgroundColor } from '../constants/variable';
import SidebarOption from './SidebarOption';
import ForumIcon from '@mui/icons-material/Forum';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, Input, Snackbar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { enterRoom } from '../features/roomSlice';
import { v4 as uuidv4 } from 'uuid';




function Sidebar() {
    const db = getFirestore();
    const [rooms, setRooms] = useState([]);
    const [showAddChannel, setShowAddChannel] = useState(false);
    const [channel, setChannel] = useState('');
    const [notify, setNotify] = useState({ show: false, message: '' })
    const dispatch = useDispatch()

    const roomRef = collection(db, 'Rooms');
    const getChannels = async () => {
        const rooms = [];
        const docsSnap = await getDocs(roomRef);
        docsSnap?.forEach((doc) => {
            rooms.push({id: doc.id, data: doc.data() });
            
        });
        
        setRooms(rooms);
    };
  

    const handleAddChannel = (value) => {
        setShowAddChannel(value);
    }
    const handleChangeChannel = (e) => {
        setChannel(e.target.value);
    }
    const handleActionAddChannel = (name) => {
        addDoc(roomRef, { id: uuidv4(), name: name })
            .then((docRef) => {
                setNotify({ ...notify, show: true, message: "Add channel successfully" });
            })
            .catch(error => {
                setNotify({ ...notify, show: true, message: "Add channel failed" });
            })
            handleAddChannel(false);
    }

    const selectChannel = (roomId) => {
        dispatch(enterRoom(roomId))
    }

    // eslint-disable-next-line
    useEffect(() => {
       getChannels();
    },[showAddChannel]);

    // console.log(rooms);
    return (
        <SidebarContainer backgroundcolor={backgroundColor}>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={notify.show}
                message={notify.message}
                onClose={() => { setNotify({ ...notify, show: false }) }}
                key={{ vertical: 'top' } + { horizontal: 'right' }} />
            <SidebarHeader>
                <SidebarInfo>
                    <FiberManualRecordIcon />
                    <span>Status: Online</span>
                </SidebarInfo>
                <CreateIcon />
            </SidebarHeader>
            <SidebarOption Icon={ForumIcon} title='Thread' />
            <SidebarOption Icon={ForumIcon} title='Thread' />
            <SidebarOption Icon={ForumIcon} title='Thread' />
            <SidebarOption Icon={ForumIcon} title='Thread' />
            <hr />
            <SidebarOption Icon={ExpandMoreIcon} title='Channel' />
            <hr />
            <SidebarOption Icon={AddIcon} title='Add Channels' addChanel={() => handleAddChannel(true)} />

            {rooms?.map((item, index) => (
                <SidebarOption
                    title={item.data.name}
                    id={item.id}
                    selectChannel={() => selectChannel(item.id)}
                    key={index}
                />
            ))}

            <Dialog
                open={showAddChannel}
                onClose={() => handleAddChannel(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
                maxWidth='lg'
            >
                <DialogTitle id='alert-dialog-title'>
                    {"Add Channel"}
                </DialogTitle>
                <DialogContent>
                    <Input value={channel} onChange={handleChangeChannel} style={{ width: '400px' }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleActionAddChannel(channel)}>Add</Button>
                    <Button onClick={() => handleAddChannel(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </SidebarContainer>
    )
}

export default Sidebar

const SidebarContainer = styled.div`
background-color:${props => props.backgroundcolor};
color: white;
flex: 0.3;
border-top: 1px solid #afaeae;
max-width: 250px;
min-height:90vh;
margin-top: 0;


`;

const SidebarHeader = styled.div`
display: flex;
border-bottom: 1px solid #afaeae;
padding: 15px;

> .MuiSvgIcon-root{
    padding: 10px;
    color: #afaeae;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
    font-size: 18px;
}
`;

const SidebarInfo = styled.div`
flex: 1;
display: flex;
align-items: center;
> .MuiSvgIcon-root{
    color: green;
    margin-right: 5px;
}
`;