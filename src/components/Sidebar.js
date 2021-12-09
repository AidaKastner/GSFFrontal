import React, { useState } from 'react';
import '../css/Sidebar.css';
import {SidebarData} from './SidebarData';
import SubMenu from './SubMenu';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';

const Sidebar = () => {


    const [sidebar, setSidebar] = useState(true);
  
    const showSidebar = () => setSidebar(!sidebar);
  
    return (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
        <div className="Nav">   
          <div className="Navicon">   
            <NavLink to='#'>      
                <FaIcons.FaBars onClick={showSidebar} />
            </NavLink> 

          </div>     
                       
        </div>
          <SidebarNav sidebar={sidebar}>
          <div className="SidebarWrap">          
            <div className="Navicon">   
              <NavLink to='#'>
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </NavLink>  
            </div> 
              {SidebarData.map((item, index) => {
                return <SubMenu item={item} key={index} />;
              })}
         
            </div> 
          </SidebarNav>
        </IconContext.Provider>
      </>
    );
  };


const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;


export default Sidebar