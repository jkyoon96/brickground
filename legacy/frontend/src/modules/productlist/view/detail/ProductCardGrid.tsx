import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'antd';
import $ from 'jquery';

import { SOPOONG_URL, SHOP_URL, SHOP_ID,PRODUCT_LIST_PATH } from 'common';


export const ProductCardGrid = (props) => {

  const gridStyle: any = {
    width: '175px',
    height: '215px',
    textAlign: 'center',
    margin: '0px',
    padding: '0px',
    border: '1px solid rgba(0, 0, 0, .4)'
  };

  return (
    <>
      <Card style={{width: '710px'}} bordered={false}>
      </Card>
    </>
  );

};
