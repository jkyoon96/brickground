import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Card, Tabs, Row, Col, Button, Empty } from 'antd';

import { PRODUCTS_LIST_PATH } from 'common';
import { ProductCard } from '.';

export const ProductCardList = (props) => {

  const { productList } = props;
  const [noTitleKey, setNoTitleKey] = useState<string>('app');


  const { TabPane } = Tabs;

  const handleProductCardClick = (productId) => {

    console.log("click handleProductCardClick");
  };

  const moreOperations = <Link to={`${PRODUCTS_LIST_PATH}`}> <Button
                            icon="plus"
                            style={{width: '100px', height: '30px', backgroundColor: '#ffffff', border: '0px', paddingBottom: '0px', marginBottom : '0px' }}
                          >더보기</Button></Link>;

  return (
    <div className='card-container'>

      <Tabs  type="line" tabBarExtraContent={moreOperations}>
        <TabPane tab="호환부품" key="1">
          <Card style={{border: '0px'}}>

            {productList ? (
              productList.map(product => (
                <Card.Grid className='card-grid' key={product.productId}>
                  {' '}
                  <ProductCard
                    onClick={handleProductCardClick}
                    product={product}
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
  );

}
