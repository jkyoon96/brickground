import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Card, Tabs, Row, Col, Button, Empty } from 'antd';

import {  SOPOONG_URL, SHOP_URL, SHOP_ID, PRODUCTS_LIST_PATH, PRODUCT_SET_LIST_PATH } from 'common';
import { ProductCard } from '.';

export const ProductSetCardList = (props) => {

  //const { manualList } = props;
  const [productSetList, setProductSetList] = useState<any[]>([]);
  const [noTitleKey, setNoTitleKey] = useState<string>('app');
  const [cardGridStyle, setCardGridStyle] = useState<any>({});


  const { TabPane } = Tabs;

  useEffect(() => {

    getProductSetsData();

    window.addEventListener( 'resize',onWindowResize, false );

    onWindowResize();

  }, []);


  const onWindowResize = () => {

    console.log("document.body.clientWidth : " + document.body.clientWidth);

    if(document.body.clientWidth < 500)
      setCardGridStyle({width: '100%'});
    else if (document.body.clientWidth < 600)
      setCardGridStyle({width: '50%'});
    else if (document.body.clientWidth < 900)
      setCardGridStyle({width: '33.3%'});
    else
      setCardGridStyle({width: '25%'});
	}


  const getProductSetsData = () => {

    var searchUrl = SOPOONG_URL + SHOP_URL + '/productsByCategory.do?' + 'shopId=' + SHOP_ID ;
    searchUrl += '&categoryList=301,302';
    searchUrl += '&page=0&size=4';

    fetch(
      searchUrl
    ).then(res => res.json())
     .then(json => {console.log(json); setProductSetList(Object.assign(json));})
     .catch(err => console.log(err));

  };



  const moreOperations = <Link to={`${PRODUCT_SET_LIST_PATH}`}> <Button
                            icon="plus"
                            style={{width: '100px', height: '30px', backgroundColor: '#ffffff', border: '0px', paddingBottom: '0px', marginBottom : '0px' }}
                          >더보기</Button></Link>;

  return (
    <div className='card-container'>

      <Tabs  type="line" tabBarExtraContent={moreOperations}>
        <TabPane tab="세트상품" key="1">
          <Card style={{border: '0px'}}>

            {productSetList ? (
              productSetList.map(productSet => (
                <Card.Grid className='card-grid' style={cardGridStyle} key={productSet.productId}>
                  <div className='content'>
                    <ProductCard
                      product={productSet}
                    />
                  </div>
                </Card.Grid>
              ))
            ) : (
              <Empty />
            )}

          </Card>

        </TabPane>
      </Tabs>
    </div>
  );

}
