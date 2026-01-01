import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Icon, Select, Row, Col, Menu, Breadcrumb, Card, Divider, Checkbox, Slider, InputNumber } from 'antd';
import $ from 'jquery';
import queryString from 'query-string';

import { SOPOONG_URL, SHOP_URL, SHOP_ID } from 'common';
import { ManualCardList, ProductCardList } from '.'

export const ProductListView = (props) => {

  const params = queryString.parse(props.location.search);
  console.log('params : ' , params);

  const [checkedList, setCheckedList] = useState<string[]>(['브릭', '빔', '연결', '핀', '축', '기어', '바퀴', '전기']);
  const [indeterminate, setIndeterminate] = useState<boolean>(true);
  const [checkAll, setCheckAll] = useState<boolean>(false);


  const [priceRange, setPriceRange] = useState<[number, number]>([2000, 5000]);
  const [manualList, setManualList] = useState<any[]>([]);
  const [productList, setProductList] = useState<any[]>([]);


  useEffect(() => {
    scroll(0, 0);

    getProductsData(checkedList);
    getManualsData();

  }, []);




  const getProductsData = (list) => {

      var searchUrl = SOPOONG_URL + SHOP_URL + '/productsByCategory.do?' + 'shopId=' + SHOP_ID ;
      var categoryList = ''

      list.forEach(element => {
          if(element == '브릭')
            categoryList += '101,';
          else if(element == '빔')
            categoryList += '102,';
          else if(element == '연결')
            categoryList += '103,';
          else if(element == '핀')
            categoryList += '104,';
          else if(element == '축')
            categoryList += '105,';
          else if(element == '기어')
            categoryList += '106,';
          else if(element == '바퀴')
            categoryList += '107,';
          else if(element == '전기')
            categoryList += '108,';
      });

      searchUrl += '&categoryList='+ categoryList;
      searchUrl += '&page=0&size=200';

      fetch(
        searchUrl
      ).then(res => res.json())
       .then(json => {console.log(json); setProductList(Object.assign(json));})
       .catch(err => console.log(err));

  };

  const getManualsData = () => {

      var searchUrl = SOPOONG_URL + SHOP_URL + '/productsByCategory.do?' + 'shopId=' + SHOP_ID ;
      searchUrl += '&categoryList=201';
      searchUrl += '&page=0&size=4';

      fetch(
        searchUrl
      ).then(res => res.json())
       .then(json => {console.log(json); setManualList(Object.assign(json));})
       .catch(err => console.log(err));

  };


  const productOptions = ['브릭', '빔', '연결', '핀', '축', '기어', '바퀴', '전기'];

  const onChange = list => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < productOptions.length);
    setCheckAll(list.length === productOptions.length);

    getProductsData(list);

  };

  const onCheckAllChange = e => {

    setCheckedList(e.target.checked ? productOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);

    getProductsData(e.target.checked ? productOptions : []);
  };

  const CheckboxGroup = Checkbox.Group;



   return (
     <>
      <div className='product-list-container'>

        <Row style={{ paddingBottom: '20px', paddingTop: '20px', border: 'solid 1px rgba(112, 112, 112, 0.4)', borderRadius: '10px', margin: '20px' }}>
          <Col span={24} style={{textAlign: 'center'}}>
            <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
            >전체 &nbsp;&nbsp;&nbsp;
            </Checkbox>

            <CheckboxGroup
              options={productOptions}
              value={checkedList}
              onChange={onChange}
            />
          </Col>
        </Row>

        <Row>
          <Col  lg={24} sm={24} xs={24}>
            <div>
              <ProductCardList  productList={productList} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div>
              <ManualCardList manualList={manualList} />
            </div>
          </Col>
        </Row>
        <br/><br/><br/>

      </div>
    </>
  );

};
