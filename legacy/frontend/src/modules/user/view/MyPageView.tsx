import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Button, Divider, Tabs, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import $ from 'jquery';
import { SOPOONG_URL, SHOP_URL,
  PRODUCTS_LIST_PATH,
  storageService,
} from 'common';

import { OrderTableEx,
          ProductManagementTable,
          OrderManagementTable,
          DeliveryPolicyManagement,
          PasswordChangeView} from '.';


/**
 * @description 장바구니 페이지
 */
export const MyPageView = (props) => {

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
          setTabKey("my-order");
        }
    }
  }, []);



  const onTabChange = (key) => {
    console.log(key);

    setTabKey(key);

  };

  const { TabPane } = Tabs;
  const { SubMenu } = Menu;


  const getOrderMenu = () => {

    if(createMode == 0) {
      return (
        <TabPane tab="주문내역" key="my-order">
          <Row style={{ marginBottom: 50}}>
            <Col xs={24} style={{paddingLeft: '20px'}}>
              <OrderTableEx
                tabKey={tabKey}
                userId={userId}
                shopId={shopId}
              />
            </Col>
          </Row>
        </TabPane>
      );
    }
  }


  // 사용자 정보 추후 추가

  const getPasswordMenu = () => {

    if(createMode == 0) {
      return (
        <TabPane tab="비밀번호변경" key="password-change" >
          <Row style={{ marginBottom: 50}}>
            <Col xs={24} style={{paddingLeft: '20px'}}>
              <PasswordChangeView
              />
            </Col>
          </Row>
        </TabPane>
      );
    }
  }

  const getProductManagementMenu = () => {

    if(role > 1) {
      return (
        <TabPane tab="상품관리" key="product-management" >
          <Row style={{ marginBottom: 50}}>
            <Col xs={24} style={{paddingLeft: '20px'}}>
              <ProductManagementTable
                tabKey={tabKey}
                userId={userId}
                shopId={shopId}
              />
            </Col>
          </Row>
        </TabPane>
      );
    }
  }

  const getOrderManagementMenu = () => {

    if(role > 1) {
      return (
        <TabPane tab="주문관리" key="order-management" >
          <Row style={{ marginBottom: 50}}>
            <Col xs={24} style={{paddingLeft: '20px'}}>
              <OrderManagementTable
                tabKey={tabKey}
                userId={userId}
                shopId={shopId}
              />
            </Col>
          </Row>
        </TabPane>
      );
    }
  }

  const getDeliveryPolicyManagementMenu = () => {

    if(role > 1) {
      return (
        <TabPane tab="배송관리" key="delivery-management" >
          <Row style={{ marginBottom: 50}}>
            <Col xs={24} style={{paddingLeft: '20px'}}>
              <DeliveryPolicyManagement
                tabKey={tabKey}
                userId={userId}
                shopId={shopId}
              />
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
              <TabPane tab="주문내역" key="my-order">
                <Row style={{ marginBottom: 50}}>
                  <Col xs={24} style={{paddingLeft: '20px'}}>
                    <OrderTableEx
                      tabKey={tabKey}
                      userId={userId}
                      shopId={shopId}
                    />
                  </Col>
                </Row>
              </TabPane>
              {getPasswordMenu()}
              {getProductManagementMenu()}
              {getOrderManagementMenu()}
              {getDeliveryPolicyManagementMenu()}
            </Tabs>
          </Col>
        </Row>
      </div>

    </>
  );
};
