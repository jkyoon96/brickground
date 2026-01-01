import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import { Icon, Select, Row, Col, Menu, Tabs, Card, Empty } from 'antd';
import queryString from 'query-string'

import { SOPOONG_URL, SHOP_URL, SHOP_ID,
        HELP_PATH,
        PRODUCTS_LIST_PATH
      } from 'common';

import { VrMallModel, ProductModel } from 'modules/main/model';
import { VrMallCardList, ProductCardList, VrMallCard, ProductCard } from '.'

export const SearchView = (props) => {

  const [vrMallList, setVrMallList] = useState<VrMallModel[]>([]);
  const [productList, setProductList] = useState<ProductModel[]>([]);

  useEffect(() => {
    getVrMallsData();
    getProductsData();

  }, [props.location.search]);


  const getProductsData = () => {

      var searchUrl = SOPOONG_URL + SHOP_URL + '/productsBySearch.do';


      searchUrl += props.location.search;
      searchUrl += '&shopId=' + SHOP_ID ;
      searchUrl += '&page=0&size=0';


      fetch(
        searchUrl
      ).then(res => res.json())
       .then(json => {console.log(json); setProductList(Object.assign(json));})
       .catch(err => console.log(err));

  };

  const getVrMallsData = () => {

      var searchUrl = SOPOONG_URL + SHOP_URL + '/vrMallsBySearch.do';

      searchUrl += props.location.search;
      searchUrl += '&shopId=' + SHOP_ID ;
      searchUrl += '&page=0&size=0';

      fetch(
        searchUrl
      ).then(res => res.json())
       .then(json => {console.log(json); setVrMallList(Object.assign(json));})
       .catch(err => console.log(err));

  };

  const getKeyword = () => {

      let params = queryString.parse(props.location.search);

      return decodeURI(params.keyword as string);

  };


  const callback = (key) => {
    console.log(key);
  }

  const {TabPane} = Tabs;

   return (
     <>
      <div className='search-container'>
        <div>
          <p style={{color:'#0000ff', textAlign: 'center', fontSize: '20px', fontWeight: 800 }}> {getKeyword()} 조회결과  </p>
          <p style={{color:'#0000ff', textAlign: 'center'}}> VR 조립품 ({vrMallList.length}), 설명서/세트/부품 ({productList.length}) 건이 조회되었습니다. </p>
        </div>
        <Tabs onChange={callback} type="card">
          <TabPane tab={`VR 조립품 (${vrMallList.length})`}  key="1">
            <div className='card-container' >
              <Card style={{border: '0px'}}>

                { vrMallList ? (
                  vrMallList.map(vrMall => (
                    <Card.Grid className='card-grid' key={vrMall.vrMallId}>
                      {' '}
                      <VrMallCard
                        vrMall={vrMall}
                      />{' '}
                    </Card.Grid>
                  ))
                ) : (
                  <Empty />
                )}
              </Card>
            </div>
          </TabPane>
          <TabPane tab={`매뉴얼/세트/부품 (${productList.length})`} key="2">
            <div className='card-container'>
              <Card style={{border: '0px'}}>

                {productList ? (
                  productList.map(product => (
                    <Card.Grid className='card-grid' key={product.productId}>
                      {' '}
                      <ProductCard
                        product={product}
                      />{' '}
                    </Card.Grid>
                  ))
                ) : (
                  <Empty />
                )}

              </Card>
            </div>
          </TabPane>
        </Tabs>
        <br/><br/><br/>

      </div>
    </>
  );

};
