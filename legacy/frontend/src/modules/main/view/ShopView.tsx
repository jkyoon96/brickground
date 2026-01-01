import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Link, NavLink } from 'react-router-dom';
import { Icon, Select, Row, Col, Menu, Carousel, Tabs, Card, Empty } from 'antd';
import $ from 'jquery';

import {SOPOONG_URL, SHOP_URL, SHOP_ID,
        ROOT_PATH,
        VR_MALL_VIEW_PATH,
        PRODUCTS_LIST_PATH
      } from 'common';

import { ShopModel } from 'modules/main/model';
import { ShopCard, ShopSearch } from '.';

export const ShopView = () => {

  const [shopList, setShopList] = useState<ShopModel[]>([]);

  useEffect(() => {

    $('#MainHeader').hide();
    //$('#MainFooter').hide();

    getShopsData();

  }, []);


  const getShopsData = () => {

      var searchUrl = SOPOONG_URL + '/shops.do?' ;
      searchUrl += 'page=0&size=8';

      fetch(
        searchUrl
      ).then(res => res.json())
       .then(json => {console.log(json); setShopList(Object.assign(json));})
       .catch(err => console.log(err));

  };

  const { TabPane } = Tabs;

   return (
     <>

       <div style={{ width: '100%', height: '120px', border: 'solid 0px #797777'}}>
         <Row align='middle' style={{paddingTop: '20px', maxHeight: '141px'}}>
           <Col xs={8} offset={0} >
             <NavLink to={ROOT_PATH}> <img src="images/logo_kor.png"  style={{width: '100%', height: '100%', maxWidth: '220px', maxHeight: '120px'}}/> </NavLink>
           </Col>
           <Col xs={13} offset={1} >
             <div>
               <ShopSearch></ShopSearch>
             </div>
           </Col>
         </Row>
       </div>

        <div className='card-container' style={{marginTop: '30px'}}>
          <Tabs type="line" >
            <TabPane tab="쇼핑몰" key="1">
              <Card style={{border: '0px'}}>

                {shopList ? (
                  shopList.map(shop => (
                    <Card.Grid className='card-grid' key={shop.shopId}>
                      {' '}
                      <ShopCard
                        shop={shop}
                      />{' '}
                    </Card.Grid>
                  ))
                ) : (
                  <Empty />
                )}

              </Card>


            </TabPane>
          </Tabs>
        </div>

        <br/><br/><br/>

      </>
    );

};
