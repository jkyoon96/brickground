import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Button, Divider, Tabs, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import $ from 'jquery';
import { SOPOONG_URL, SHOP_URL,
  PRODUCTS_LIST_PATH,
  storageService,
} from 'common';

import { MyVrMallCardList } from '.';


export const MyVrMallListView = (props) => {

  const [dataSource, setDataSource] = useState<any[]>([]);
  const [userId, setUserId] = useState<number>(0);
  const [shopId, setShopId] = useState<number>(0);
  const [role, setRole] = useState<number>(0);
  const [createMode, setCreateMode] = useState<number>(0);
  const [tabKey, setTabKey] = useState<string>("");


  useEffect(() => {

    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined) {
          setUserId(user.userId);
          setShopId(user.shopId);
          setRole(user.role);
          setCreateMode(user.createMode);
          setTabKey("vr-manual");
        }
    }
  }, []);



  const onTabChange = (key) => {
    console.log(key);

    setTabKey(key);

  };

  const { TabPane } = Tabs;
  const { SubMenu } = Menu;


  const getVrManualMenu = () => {

    if(createMode == 0) {
      return (
        <TabPane tab="내작업방" key="vr-manual" >
          <Row style={{ marginBottom: 50}}>
            <Col xs={24} style={{paddingLeft: '20px'}}>
              <MyVrMallCardList title={"조립품"} userId={userId} />
            </Col>
          </Row>
        </TabPane>
      );
    }
  }



  return (
    <>

      <div className='mypage-container' style={{marginTop: '20px'}}>
        <Row type="flex" justify="space-around">
          <Col md={24} xs={24} style={{ backgroundColor: '#ffffff', color: '#e6e0e0', paddingLeft: '10px'}}>
            <Tabs onChange={onTabChange} type="line" activeKey={tabKey} style={{marginTop: '20px'}} >
              {getVrManualMenu()}
            </Tabs>
          </Col>
        </Row>
      </div>

    </>
  );
};
