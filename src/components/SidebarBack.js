import React, { useState } from 'react';
import '../css/Sidebar.css';
import {SidebarData} from './SidebarData';
import SubMenuBack from './SubMenuBack';
import styled from 'styled-components';



const SidebarBack = () => {


    const [sidebarBack, setSidebar] = useState(true);

    return (
      <>
          <SidebarNav sidebar={sidebarBack}>
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
  width: 40px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 80px;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;


export default SidebarBack