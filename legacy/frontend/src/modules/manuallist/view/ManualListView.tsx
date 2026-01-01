import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Icon, Select, Row, Col, Menu, Breadcrumb, Card, Divider, Checkbox, Slider, InputNumber, Pagination } from 'antd';
import $ from 'jquery';
import queryString from 'query-string';

import { SOPOONG_URL, SHOP_URL, SHOP_ID } from 'common';
import { ProductCardList, ManualCardList } from '.'

export const ManualListView = (props) => {

  const params = queryString.parse(props.location.search);
  console.log('params : ' , params);

  const [checkedProductList, setCheckedProductList] = useState<string[]>(['BricQ','스파이크 프라임', '로봇 인벤터', 'EV3']);
  const [indeterminateProduct, setIndeterminateProduct] = useState<boolean>(true);
  const [checkAllProduct, setCheckAllProduct] = useState<boolean>(false);

  const [checkedList, setCheckedList] = useState<string[]>(['기초', '초급', '중급', '고급']);
  const [indeterminate, setIndeterminate] = useState<boolean>(true);
  const [checkAll, setCheckAll] = useState<boolean>(false);


  const [priceRange, setPriceRange] = useState<[number, number]>([2000, 5000]);
  const [vrMallList, setVrMallList] = useState<any[]>([]);
  const [productList, setProductList] = useState<any[]>([]);
  const [manualList, setManualList] = useState<any[]>([]);

  const [levelList, setLevelList] = useState<string>('101,102,103,104');
  const [size, setSize] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(10);


  useEffect(() => {

    scroll(0, 0);

    $('#MainHeader').show();
    $('#MainFooter').show();

    if (params != undefined){

     if(params.productSet != undefined) {

        if(params.productSet == '45678') {
          var product:string[] = ['스파이크 프라임'];
          setCheckedProductList(product)
          getManualCount(product, checkedList);
        }
        else if(params.productSet == '51515') {
          var product:string[] = ['로봇 인벤터'];
          setCheckedProductList(product)
          getManualCount(product, checkedList);
        }
        else if(params.productSet == '45544') {
          var product:string[] = ['EV3'];
          setCheckedProductList(product)
          getManualCount(product, checkedList);
        }
        else if(params.productSet == '2000470,2000471,45400,45401') {
          var product:string[] = ['BricQ'];
          setCheckedProductList(product)
          getManualCount(product, checkedList);
        }
      }
      else if(params.level != undefined) {

         if(params.level == '101') {
           var level:string[] = ['기초'];
           setCheckedList(level)
           getManualCount(checkedProductList, level);
         }
         else if(params.level == '102') {
           var level:string[] = ['초급'];
           setCheckedList(level)
           getManualCount(checkedProductList, level);
         }
         else if(params.level == '103') {
           var level:string[] = ['중급'];
           setCheckedList(level)
           getManualCount(checkedProductList, level);
         }
         else if(params.level == '104') {
           var level:string[] = ['고급'];
           setCheckedList(level)
           getManualCount(checkedProductList, level);
         }
       }
       else{
         getManualCount(checkedProductList, checkedList);
       }
    }
    else {
      getManualCount(checkedProductList, checkedList);
    }

    getProductsData();

  }, []);


  const getManualCount = (list1, list2) => {

    setTotalCount(0);
    setCurrentPage(1);

    var searchUrl = SOPOONG_URL + SHOP_URL + '/manualCountByProuductSetNameAndLevel.do?shopId=' + SHOP_ID;

    var product = '';
    list1.forEach(element => {
        if(element == '스파이크 프라임')
          product += '45678,';
        else if(element == '로봇 인벤터')
          product += '51515,';
        else if(element == 'EV3')
          product += '45544,';
        else if(element == 'BricQ')
          product += '2000470,2000471,45400,45401,';
    });

    if(product.length > 0)
      product = product.substring(0, product.length - 1);
    else{
      setManualList([]);
      return;
    }

    searchUrl += '&productSetList=' + product;

    var level = '';
    list2.forEach(element => {
        if(element == '기초')
          level += '101,';
        else if(element == '초급')
            level += '102,';
        else if(element == '중급')
          level += '103,';
        else if(element == '고급')
          level += '104,';
    });

    if(level.length > 0)
      level = level.substring(0, level.length - 1);
    else{
      setManualList([]);
      return;
    }

    setLevelList(level);

    searchUrl += '&levelList=' + level;

    fetch(
      searchUrl
    ).then(response => response.json())
     .then(data => {
                      console.log(data);

                      setTotalCount(data);
                      //getVrMallsData(category, currentPage, size);
                      getManualsData(list1, list2, currentPage, size);
                     })
     .catch(err => console.log(err));

  };


  const getManualsData = (list1, list2, page, size) => {

      scroll(0, 0);

      var searchUrl = SOPOONG_URL + SHOP_URL + '/manualsByManualsByProuductSetAndLevel.do?' + 'shopId=' + SHOP_ID ;
      searchUrl += '&page=' + (page - 1) + '&size=' + size;

      var product = '';
      list1.forEach(element => {
          if(element == '스파이크 프라임')
            product += '45678,';
          else if(element == '로봇 인벤터')
            product += '51515,';
          else if(element == 'EV3')
            product += '45544,';
          else if(element == 'BricQ')
            product += '2000470,2000471,45400,45401,';
      });

      if(product.length > 0)
        product = product.substring(0, product.length - 1);
      else{
        setManualList([]);
        return;
      }

      searchUrl += '&productSetList=' + product;

      var level = '';
      list2.forEach(element => {
          if(element == '기초')
            level += '101,';
          else if(element == '초급')
            level += '102,';
          else if(element == '중급')
            level += '103,';
          else if(element == '고급')
            level += '104,';
      });

      if(level.length > 0)
        level = level.substring(0, level.length - 1);
      else{
        setManualList([]);
        return;
      }

      searchUrl += '&levelList=' + level;

      fetch(
        searchUrl
      ).then(res => res.json())
       .then(json => {console.log(json); setManualList(Object.assign(json));})
       .catch(err => console.log(err));

  };


  const getManualsDataByPage = (page, pageSize) => {

    getManualsData(checkedProductList, checkedList, page, pageSize);

  };


  const getProductsData = () => {

      var searchUrl = SOPOONG_URL + SHOP_URL + '/productsByCategory.do?' + 'shopId=' + SHOP_ID ;
      searchUrl += '&categoryList=301,302';
      searchUrl += '&page=0&size=4';

      fetch(
        searchUrl
      ).then(res => res.json())
       .then(json => {console.log(json); setProductList(Object.assign(json));})
       .catch(err => console.log(err));

  };


  const productOptions = ['BricQ', '스파이크 프라임', '로봇 인벤터', 'EV3'];

  const onChangeProduct = list => {
    setCheckedProductList(list);
    setIndeterminateProduct(!!list.length && list.length < productOptions.length);
    setCheckAllProduct(list.length === productOptions.length);

    getManualCount(list, checkedList);
    //getManualsData(list, checkedList, currentPage, size);

  };

  const onCheckAllProductChange = e => {

    setCheckedProductList(e.target.checked ? productOptions : []);
    setIndeterminateProduct(false);
    setCheckAllProduct(e.target.checked);

    getManualCount(e.target.checked ? productOptions : [], checkedList);
    //getManualsData(e.target.checked ? productOptions : [], checkedList, currentPage, size);
  };


  const manualOptions = ['기초', '초급', '중급', '고급'];

  const onChange = list => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < manualOptions.length);
    setCheckAll(list.length === manualOptions.length);

    getManualCount(checkedProductList, list);
    //getManualsData(checkedProductList, list, currentPage, size);

  };

  const onCheckAllChange = e => {

    setCheckedList(e.target.checked ? manualOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);

    getManualCount(checkedProductList, e.target.checked ? manualOptions : []);
    //getManualsData(checkedProductList, e.target.checked ? manualOptions : [], currentPage, size);
  };

  const CheckboxGroup = Checkbox.Group;



   return (
     <>
      <div className='manual-list-container'>

        <Row style={{ paddingBottom: '10px', paddingTop: '10px', border: 'solid 1px rgba(112, 112, 112, 0.4)', borderStyle: 'solid none none none', borderRadius: '0px', margin: '20px 20px 0px 20px' }}>
          <Col span={3} style={{textAlign: 'center'}}>
            상품별
          </Col>
          <Col span={1} style={{textAlign: 'left'}}>
            |
          </Col>
          <Col span={20} style={{textAlign: 'left'}}>
            <Checkbox
                indeterminate={indeterminateProduct}
                onChange={onCheckAllProductChange}
                checked={checkAllProduct}
            >전체 &nbsp;&nbsp;&nbsp;
            </Checkbox>

            <CheckboxGroup
              options={productOptions}
              value={checkedProductList}
              onChange={onChangeProduct}
            />
          </Col>
        </Row>
        <Row style={{ paddingBottom: '10px', paddingTop: '10px', border: 'solid 1px rgba(112, 112, 112, 0.4)', borderStyle: 'solid none solid none', borderRadius: '0px', margin: '0px 20px 20px 20px' }}>
          <Col span={3} style={{textAlign: 'center'}}>
            레벨별
          </Col>
          <Col span={1} style={{textAlign: 'left'}}>
            |
          </Col>
          <Col span={20} style={{textAlign: 'left'}}>
            <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
            >전체 &nbsp;&nbsp;&nbsp;
            </Checkbox>

            <CheckboxGroup
              options={manualOptions}
              value={checkedList}
              onChange={onChange}
            />
          </Col>
        </Row>

        <Row>
          <Col  lg={24} sm={24} xs={24}>
            <div>
              <ManualCardList  manualList={manualList} />
            </div>
          </Col>
          <Pagination defaultCurrent={currentPage} pageSize={size} total={totalCount} onChange={getManualsDataByPage} style={{float: 'right', margin: '16px'}}/>
        </Row>
        <Row>
          <Col span={24}>
            <div>
              <ProductCardList productList={productList} />
            </div>
          </Col>
        </Row>
        <br/><br/><br/>

      </div>
    </>
  );

};
