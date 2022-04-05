import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import Idioma from "../Idioma";
import styled from 'styled-components';
import SubMenu from './SubMenu';
import React, { Fragment } from 'react';
import { IconContext } from 'react-icons/lib';
import { NavLink } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../../css/Sidebar.css';

let showSidebarClick = false;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: window.innerWidth > 1300,
      routerHistory: props.routerHistory,
      prevLocation: props.prevLocation
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
    if (this.state.prevLocation != null && this.state.prevLocation) {
      this.state.routerHistory.push(this.state.prevLocation);
    }
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.handleResize);
  }

  static getDerivedStateFromProps(props) {
    showSidebarClick = false;
    if (!showSidebarClick && props.showSidebar != null) {
      return {
        sidebar: props.showSidebar,
        routerHistory: props.routerHistory,
        prevLocation: props.prevLocation
      };
    }
    return null;
  }

  render() {
    const { t } = this.props;
    return (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className="Nav">
            <div className="Navicon">
              <NavLink to='#'>      
                  <FaIcons.FaBars onClick={() => { this.showSidebar(); }} />
              </NavLink>
            </div>
            {
              !this.state.sidebar
                ? <Fragment>
                    <img src={'/logo.png'} style={{width: '7rem', height: '7rem', marginLeft: '3rem'}} />
                    <h3 style={{color: 'white', marginLeft: '3rem'}}>{ t('applicationName') }</h3>
                  </Fragment>
                : ''
            }
            <div className='mail-logged-in'>{sessionStorage.getItem("mail")}</div>
            <Idioma />
          </div>
          <SidebarNav sidebar={this.state.sidebar}>
            <div className="SidebarWrap">
              <div className="Navicon" style={{width: 'max-content'}}>
                <NavLink to='#'>
                  <AiIcons.AiOutlineClose onClick={() => { this.showSidebar(); }} />
                </NavLink>
                {
                  this.state.sidebar
                    ? <Fragment>
                        <img src={'/logo.png'} style={{width: '7rem', height: '7rem', marginLeft: '3rem'}} />
                        <h3 style={{color: 'white', marginLeft: '3rem'}}>{ t('applicationName') }</h3>
                      </Fragment>
                    : ''
                }
              </div>
              {SidebarData.map((item, index) => {
                if (item.subNav !== undefined) {
                  item.path = this.state.routerHistory === undefined ? item.path : this.state.routerHistory.location.pathname;
                }
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