import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class SubMenuBack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subnav: false,
      item: props.item
    };
  }

  componentWillReceiveProps() {
    this.setState({
      subnav: false
    });
  }

  showSubnav() {
    this.setState({
      subnav: !this.state.subnav
    });
  }

  render() {
    return (
      <>
        <SidebarLink to={this.state.item.path} onClick={() => { this.showSubnav(); }}>
          <div>
            {this.state.item.icon}
          </div>
          <div>
            {this.state.item.subNav && this.state.subnav
              ? this.state.item.iconOpened
              : this.state.item.subNav
              ? this.state.item.iconClosed
              : null}
          </div>
        </SidebarLink>
        {this.state.subnav &&
          this.state.item.subNav.map((item, index) => {
            return (
              <DropdownLink to={item.path} key={index}>
                {item.icon}
              </DropdownLink>
            );
          })}
      </>
    );
  }
}

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    background: #9a9ca5;
    border-left: 4px solid #a11510;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #9a9ca5;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
  &:hover {
    background: #908C8B;
    cursor: pointer;
    color: #a11510;
  }
`;

export default SubMenuBack;