import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Card, Tabs, Row, Col, Button, Empty } from 'antd';

import { PRODUCTS_LIST_PATH, PRODUCT_SET_LIST_PATH } from 'common';
import { ProductCard } from 'modules/main/view';

export const ProductCardList = (props) => {

  const [noTitleKey, setNoTitleKey] = useState<string>('app');
  const { productList } = props;
  const [cardGridStyle, setCardGridStyle] = useState<any>({});
  //const productList: ProductModel[] = Object.assign(productItems);


  useEffect(() => {

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


  const onTabChange = (key) => {
    console.log(key);

  };

  const { TabPane } = Tabs;

  const { Meta } = Card;

  const loading = false;

  const handleProductCardClick = (productId) => {

    console.log("click handleProductCardClick");
  };

  return (

    <div className='card-container'>
      <Card title="세트상품" extra={<Link to={`${PRODUCT_SET_LIST_PATH}`} >더보기</Link>}
          style={{ width: '100%', height: '500px', paddingLeft: '8px'}}
          headStyle={{ fontSize: '20px', fontWeight: 800}}>

          <Card style={{border: '0px'}}>

            {productList ? (
              productList.map(product => { return (
                <Card.Grid className='card-grid'  style={cardGridStyle} key={product.productId}>
                  <div className='content'>
                    <ProductCard
                      onClick={handleProductCardClick}
                      product={product}
                    />
                  </div>
                </Card.Grid>
              )})
            ) : (
              <Empty />
            )}

          </Card>

      </Card>
    </div>
  );


}
