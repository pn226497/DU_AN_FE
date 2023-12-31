import React from 'react';
import styled from 'styled-components'

function SidebarOption({Icon, title, addChanel, id, selectChannel}) {
    
  return (
    <SidebarOptionContainer onClick={addChanel}>
        {Icon && <Icon fontSize="small" style={{padding: 10 }} />}
        {Icon ? (
            <h3>{title}</h3>
        ) : (
            <SidebarOptionChannel onClick= {() => selectChannel(id)} >
                <span>#</span> {title}
            </SidebarOptionChannel>
        )}
    </SidebarOptionContainer>
  )
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
display: flex;
font-size:12px;
align-items: center;
padding-left: 5px;
cursor: pointer;
:hover {
    opacity: 0.9;
    background-color:#340e36 ;
}
> h3 {
    font-weight: 500;
}
> h3 > span {
    padding: 15px;
}
`;
const SidebarOptionChannel = styled.h3`
padding: 10px 0;
font-weight: 300;
`;