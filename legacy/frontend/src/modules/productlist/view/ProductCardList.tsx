import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Card, Tabs, Row, Col, Button, Empty } from 'antd';

import { ProductCard } from './';

export const ProductCardList = (props) => {

  const { productList } = props;
  const [noTitleKey, setNoTitleKey] = useState<string>('app');
  const [cardGridStyle, setCardGridStyle] = useState<any>({});

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


  return (
    <div className='card-container' style={{ backgroundColor: '#ffffff', marginTop: '0px'}}>
      <Card style={{border: '0px'}} >

        {productList.length > 0 ? (
          productList.map(product => (
            <Card.Grid className='card-grid' style={cardGridStyle} key={product.productId}>
              <div className='content'>
                <ProductCard
                  product={product}
                />
              </div>
            </Card.Grid>
          ))
        ) : (
          <Empty />
        )}

      </Card>

      <br />

    </div>
  );

}
