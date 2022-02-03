import React, { useState } from 'react';
import '../css/Sidebar.css';
import {SidebarData} from './SidebarData';
import SubMenuBack from './SubMenuBack';
import styled from 'styled-components';

const SidebarBack = (props) => {
  const [sidebarBack, setSidebar] = useState(true);
  const [prevLocation, setPrevLocation] = useState(props.prevLocation);
  const [routerHistory, setRouterHistory] = useState(props.routerHistory);

  const setSidebarBackActive = () => {
    routerHistory.push('/menu', {showSidebar: true, prevLocation: prevLocation});
  }

  return (
    <>
      <SidebarNav sidebar={sidebarBack} onClick={() => { setSidebarBackActive(); }}>
        <div className="SidebarWrap">
          {SidebarData.map((item, index) => {
            return <SubMenuBack item={item} key={index} />;
          })}
        </div> 
      </SidebarNav>
    </>
  );
};

const SidebarNav = styled.nav`
  background: #15171c;
  width: 75px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 80px;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

export default SidebarBack;
