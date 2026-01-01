import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';

import { Modal, Button, Empty, Tooltip } from 'antd';

import { Planet } from "react-planet";


export const CircleMenuComponent = (props) => {

  const { circleMenuList,  circleMenuOpen, onOpenCircleMenu, onSelectCircleMenu} = props;

  const [menuList, setMenuList] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);


  useEffect(() => {

    if(circleMenuList != undefined)
      setMenuList(circleMenuList);

  }, [circleMenuList]);

  useEffect(() => {

      setOpen(circleMenuOpen);

  }, [circleMenuOpen]);



  const getDataSource = () => {

    let menuArray = [
      {menuId: 1, menuName: 'Menu1'},
      {menuId: 2, menuName: 'Menu2'},
      {menuId: 3, menuName: 'Menu3'},
      {menuId: 4, menuName: 'Menu4'}
    ];

    return menuArray;
  }


  return (
    <Planet
      centerContent={

        <Button
          shape="circle"
          icon="menu"
          size="large"
          style={{
            color: '#ffffff',
            backgroundColor: '#808080',
            border: '1px solid #ffffff',
            height: 50,
            width: 50,
          }}
          onClick={() => {onOpenCircleMenu(!open);}}
          />

      }
      open={open}
      autoClose={true}
      orbitRadius={70}
      rotation={120}
      orbitStyle={(defaultStyle) => ({
                		...defaultStyle,
                		borderWidth: 0,
                	})}

    >
    {menuList ? (
      menuList.map(menu => (
        <Tooltip title={menu.tooltip} key={menu.menuId}>
          <Button
            shape="circle"
            style={{
              color: '#ffffff',
              backgroundColor: '#808080',
              border: '1px solid #ffffff',
              height: 50,
              width: 50,
            }}
            onClick={() => {onSelectCircleMenu(menu);}}
          >
          {menu.menuName}
          </Button>
        </Tooltip>
      ))) : (
        <Empty />
      )}
    </Planet>
  );
};
