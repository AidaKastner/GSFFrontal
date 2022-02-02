import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import Idioma from "../components/Idioma";
import styled from 'styled-components';
import SubMenu from './SubMenu';
import React from 'react';
import { IconContext } from 'react-icons/lib';
import { NavLink } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../css/Sidebar.css';

let showSidebarClick = false;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: window.innerWidth > 1300
    };
  }

  handleResize = (e) => {
    this.setState({
      sidebar: window.innerWidth > 1300
    });
  };

  showSidebar = () => {
    this.setState({ sidebar: !this.state.sidebar });
    showSidebarClick = true;
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillReceiveProps(nextProps) {
    if (!showSidebarClick && nextProps.showSidebar != null) {
      this.setState({ sidebar: nextProps.showSidebar });
    }
    showSidebarClick = false;
  }

  render() {
    return (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className="Nav">   
            <div className="Navicon">   
              <NavLink to='#'>      
                  <FaIcons.FaBars onClick={() => { this.showSidebar(); }} />
              </NavLink> 
            </div>
            <Idioma />
          </div>
          <SidebarNav sidebar={this.state.sidebar}>
            <div className="SidebarWrap">
              <div className="Navicon">
                <NavLink to='#'>
                  <AiIcons.AiOutlineClose onClick={() => { this.showSidebar(); }} />
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
  }
}

const SidebarNav = styled.nav`
  background: #3f3f3f;
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


export default Sidebar;