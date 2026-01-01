import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Icon, Select, Row, Col, Menu, Breadcrumb, Card, Divider, Checkbox, Slider, InputNumber, Empty, Pagination } from 'antd';
import $ from 'jquery';
import queryString from 'query-string';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, PRODUCT_SET_INFO_PATH, storageService  } from 'common';
import { ManualCardList, ProductCardList, ProductCard } from '.'

export const ProductRentListView = (props) => {

  const params = queryString.parse(props.location.search);
  console.log('params : ' , params);

  const [checkedList, setCheckedList] = useState<string[]>(['브릭 낱개', '패키지']);
  const [indeterminate, setIndeterminate] = useState<boolean>(true);
  const [checkAll, setCheckAll] = useState<boolean>(false);

  const [checkedSubjectList, setCheckedSubjectList] = useState<string[]>(['인물','풍경', '명화', '캐릭터', '식물', '동물', '이벤트']);
  const [indeterminateSubject, setIndeterminateSubject] = useState<boolean>(true);
  const [checkAllSubject, setCheckAllSubject] = useState<boolean>(false);


  const [priceRange, setPriceRange] = useState<[number, number]>([2000, 5000]);
  const [vrMallList, setVrMallList] = useState<any[]>([]);
  const [productList, setProductList] = useState<any[]>([]);
  const [manualList, setManualList] = useState<any[]>([]);

  const [size, setSize] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(10);

  const [cardGridStyle, setCardGridStyle] = useState<any>({});



  useEffect(() => {
    scroll(0, 0);

    getProductCount(checkedList, checkedSubjectList);

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


  const getProductCount = (list1, list2) => {

    setTotalCount(0);
    setCurrentPage(1);

    var searchUrl = SOPOONG_URL + SHOP_URL + '/productCountByCategoryAndSubject.do?shopId=' + SHOP_ID;

    var category = '';
    list1.forEach(element => {
        if(element == '브릭 낱개')
          category += '101,';
        else if(element == '패키지')
          category += '102,';
    });

    if(category.length > 0)
      category = category.substring(0, category.length - 1);
    else{
      setProductList([]);
      return;
    }

    searchUrl += '&categoryList=' + category;

    var subject = '100,';
    list2.forEach(element => {
        if(element == '인물')
          subject += '101,';
        else if(element == '풍경')
          subject += '102,';
        else if(element == '명화')
          subject += '103,';
        else if(element == '캐릭터')
          subject += '104,';
        else if(element == '식물')
          subject += '105,';
        else if(element == '동물')
          subject += '106,';
        else if(element == '이벤트')
          subject += '107,';
    });

    if(subject.length > 0)
      subject = subject.substring(0, subject.length - 1);
    else{
      setProductList([]);
      return;
    }

    searchUrl += '&subjectList=' + subject;

    fetch(
      searchUrl
    ).then(response => response.json())
     .then(data => {
                      console.log(data);

                      setTotalCount(data);
                      //getVrMallsData(category, currentPage, size);
                      getProductsData(list1, list2, currentPage, size);
                     })
     .catch(err => console.log(err));

  };


  const getProductsData = (list1, list2, page, size) => {

      scroll(0, 0);

      var searchUrl = SOPOONG_URL + SHOP_URL + '/productsByCategoryAndSubject.do?' + 'shopId=' + SHOP_ID ;
      searchUrl += '&page=' + (page - 1) + '&size=' + size;

      var category = '';
      list1.forEach(element => {
          if(element == '브릭 낱개')
            category += '101,';
          else if(element == '패키지')
            category += '102,';
      });

      if(category.length > 0)
        category = category.substring(0, category.length - 1);
      else{
        setProductList([]);
        return;
      }

      searchUrl += '&categoryList=' + category;

      var subject = '100,';
      list2.forEach(element => {
          if(element == '인물')
            subject += '101,';
          else if(element == '풍경')
            subject += '102,';
          else if(element == '명화')
            subject += '103,';
          else if(element == '캐릭터')
            subject += '104,';
          else if(element == '식물')
            subject += '105,';
          else if(element == '동물')
            subject += '106,';
          else if(element == '이벤트')
            subject += '107,';
      });

      if(subject.length > 0)
        subject = subject.substring(0, subject.length - 1);
      else{
        setProductList([]);
        return;
      }

      searchUrl += '&subjectList=' + subject;

      fetch(
        searchUrl
      ).then(res => res.json())
       .then(json => {console.log(json); setProductList(Object.assign(json));})
       .catch(err => console.log(err));

  };


  const getProductsDataByPage = (page, pageSize) => {

    getProductsData(checkedList, checkedSubjectList, page, pageSize);

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


  const categoryOptions = ['브릭 낱개', '패키지'];

  const onChangeCategory = list => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < categoryOptions.length);
    setCheckAll(list.length === categoryOptions.length);

    getProductCount(list, checkedSubjectList);
    //getManualsData(list, checkedList, currentPage, size);

  };

  const onCheckAllCategoryChange = e => {

    setCheckedList(e.target.checked ? categoryOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);

    getProductCount(e.target.checked ? categoryOptions : [], checkedList);
    //getManualsData(e.target.checked ? productOptions : [], checkedList, currentPage, size);
  };


  const subjectOptions = ['인물','풍경', '명화', '캐릭터', '식물', '동물', '이벤트'];

  const onSubjectChange = list => {
    setCheckedSubjectList(list);
    setIndeterminateSubject(!!list.length && list.length < subjectOptions.length);
    setCheckAllSubject(list.length === subjectOptions.length);

    getProductCount(checkedList, list);
    //getManualsData(checkedProductList, list, currentPage, size);

  };

  const onCheckAllSubjectChange = e => {

    setCheckedSubjectList(e.target.checked ? subjectOptions : []);
    setIndeterminateSubject(false);
    setCheckAllSubject(e.target.checked);

    getProductCount(checkedList, e.target.checked ? subjectOptions : []);
    //getManualsData(checkedProductList, e.target.checked ? manualOptions : [], currentPage, size);
  };

  const genAddExtra = () => {

    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined && user.role == 9) {
          return (<Link to={`${PRODUCT_SET_INFO_PATH}/0`} >상품 추가</Link>);
        }
    }

    return (<div></div>);

  };


  const CheckboxGroup = Checkbox.Group;

   return (
     <>
      <div className='product-list-container'>

        <Row style={{ paddingBottom: '10px', paddingTop: '10px', border: 'solid 1px rgba(112, 112, 112, 0.4)', borderStyle: 'solid none none none', borderRadius: '0px', margin: '20px 20px 0px 20px' }}>
          <Col span={3} style={{textAlign: 'center'}}>
            상품별
          </Col>
          <Col span={1} style={{textAlign: 'left'}}>
            |
          </Col>
          <Col span={20} style={{textAlign: 'left'}}>
            <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllCategoryChange}
                checked={checkAll}
            >전체 &nbsp;&nbsp;&nbsp;
            </Checkbox>

            <CheckboxGroup
              options={categoryOptions}
              value={checkedList}
              onChange={onChangeCategory}
            />
          </Col>
        </Row>

        <Row style={{ paddingBottom: '10px', paddingTop: '10px', border: 'solid 1px rgba(112, 112, 112, 0.4)', borderStyle: 'solid none solid none', borderRadius: '0px', margin: '0px 20px 0px 20px' }}>
          <Col span={3} style={{textAlign: 'center'}}>
            주제별
          </Col>
          <Col span={1} style={{textAlign: 'left'}}>
            |
          </Col>
          <Col span={20} style={{textAlign: 'left'}}>
            <Checkbox
                indeterminate={indeterminateSubject}
                onChange={onCheckAllSubjectChange}
                checked={checkAllSubject}
            >전체 &nbsp;&nbsp;&nbsp;
            </Checkbox>

            <CheckboxGroup
              options={subjectOptions}
              value={checkedSubjectList}
              onChange={onSubjectChange}
            />
          </Col>
        </Row>

        <Row>
          <Col  lg={24} sm={24} xs={24}>
            <div>
              <Card style={{border: '0px'}} extra={genAddExtra()}>

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
            </div>
          </Col>
          <Pagination defaultCurrent={currentPage} pageSize={size} total={totalCount} onChange={getProductsDataByPage} style={{float: 'right', margin: '16px'}}/>
        </Row>

        <br/><br/><br/>

      </div>
    </>
  );

};
