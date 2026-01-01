import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Card, Tabs, Row, Col, Button, Empty, Checkbox, Pagination } from 'antd';
import $ from 'jquery';
import queryString from 'query-string';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, VR_MALL_INFO_PATH, storageService } from 'common';
import { VrMallModel, ProductModel } from 'modules/main/model';

import { VrMallCard } from 'modules/main/view';
import { vrMallItems } from 'modules/main/service/dummyData/vrMallItems';
import { ProductCardList } from '.';



export const VrMallListView = (props) => {

  const params = queryString.parse(props.location.search);
  console.log('params : ' , params);

  const [checkedProductList, setCheckedProductList] = useState<string[]>(['BricQ', '스파이크 프라임', '로봇 인벤터', 'EV3', '애니멀 세트']);
  const [indeterminateProduct, setIndeterminateProduct] = useState<boolean>(true);
  const [checkAllProduct, setCheckAllProduct] = useState<boolean>(false);

  const [checkedList, setCheckedList] = useState<string[]>(['기초', '초급', '중급', '고급']);
  const [indeterminate, setIndeterminate] = useState<boolean>(true);
  const [checkAll, setCheckAll] = useState<boolean>(false);

  const [vrMallList, setVrMallList] = useState<VrMallModel[]>([]);
  const [productList, setProductList] = useState<ProductModel[]>([]);

  const [categoryList, setCategoryList] = useState<string>('101,102,103,104');
  const [size, setSize] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(10);

  const [cardGridStyle, setCardGridStyle] = useState<any>({});

  //const vrMallList: VrMallModel[] = Object.assign(vrMallItems);

  useEffect(() => {
    scroll(0, 0);

    $('#MainHeader').show();
    $('#MainFooter').show();

    if (params != undefined){

     if(params.product != undefined) {

        if(params.product == '45678') {
          var product:string[] = ['스파이크 프라임'];
          setCheckedProductList(product)
          getVrMallCount(product, checkedList);
        }
        else if(params.product == '51515') {
          var product:string[] = ['로봇 인벤터'];
          setCheckedProductList(product)
          getVrMallCount(product, checkedList);
        }
        else if(params.product == '45544') {
          var product:string[] = ['EV3'];
          setCheckedProductList(product)
          getVrMallCount(product, checkedList);
        }
        else if(params.productSet == '2000470,2000471,45400,45401') {
          var product:string[] = ['BricQ'];
          setCheckedProductList(product)
          getVrMallCount(product, checkedList);
        }
        else if(params.productSet == '9102,9103,9106') {
          var product:string[] = ['애니멀 세트'];
          setCheckedProductList(product)
          getVrMallCount(product, checkedList);
        }
      }
      else if(params.categoryId != undefined) {

         if(params.categoryId == '101') {
           var category:string[] = ['기초'];
           setCheckedList(category)
           getVrMallCount(checkedProductList, category);
         }
         else if(params.categoryId == '102') {
           var category:string[] = ['초급'];
           setCheckedList(category)
           getVrMallCount(checkedProductList, category);
         }
         else if(params.categoryId == '103') {
           var category:string[] = ['중급'];
           setCheckedList(category)
           getVrMallCount(checkedProductList, category);
         }
         else if(params.categoryId == '104') {
           var category:string[] = ['고급'];
           setCheckedList(category)
           getVrMallCount(checkedProductList, category);
         }
       }
       else{
         getVrMallCount(checkedProductList, checkedList);
       }
    }
    else {
      getVrMallCount(checkedProductList, checkedList);
    }


    //getVrMallsData(checkedList, currentPage, size);
    //getVrMallCount(checkedProductList, checkedList);
    getProductsData();

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


  const getVrMallCount = (list1, list2) => {

    var searchUrl = SOPOONG_URL + SHOP_URL + '/vrMallCountByProuductAndCatetory.do?shopId=' + SHOP_ID;

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
        else if(element == '애니멀 세트')
          product += '9102,9103,9106,';
    });

    if(product.length > 0)
      product = product.substring(0, product.length - 1);
    else{
      scroll(0, 0);
      setVrMallList([]);
      return;
    }

    searchUrl += '&productList=' + product;

    var category = ''

    list2.forEach(element => {
        if(element == '기초')
          category += '101,';
        else if(element == '초급')
          category += '102,';
        else if(element == '중급')
          category += '103,';
        else if(element == '고급')
          category += '104,';
    });

    if(category.length > 0)
      category = category.substring(0, category.length - 1);
    else{
      scroll(0, 0);
      setVrMallList([]);
      return;
    }

    setCategoryList(category);

    searchUrl += '&categoryList=' + category;

    fetch(
      searchUrl
    ).then(response => response.json())
     .then(data => {
                      console.log(data);

                      setTotalCount(data);
                      //getVrMallsData(category, currentPage, size);
                      getVrMallsData(list1, list2, currentPage, size);
                     })
     .catch(err => console.log(err));

  };


  const getVrMallsData = (list1, list2, page, size) => {

    scroll(0, 0);

    var searchUrl = SOPOONG_URL + SHOP_URL + '/vrMallsByProductAndCategory.do?' + 'shopId=' + SHOP_ID ;
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
        else if(element == '애니멀 세트')
          product += '9102,9103,9106,';
    });

    if(product.length > 0)
      product = product.substring(0, product.length - 1);
    else{
      scroll(0, 0);
      setVrMallList([]);
      return;
    }

    searchUrl += '&productList=' + product;


    var category = '';

    list2.forEach(element => {
        if(element == '기초')
          category += '101,';
        else if(element == '초급')
          category += '102,';
        else if(element == '중급')
          category += '103,';
        else if(element == '고급')
          category += '104,';
    });

    if(category.length > 0)
      category = category.substring(0, category.length - 1);
    else{
      setVrMallList([]);
      return;
    }

    searchUrl += '&categoryList=' + category;

    fetch(
      searchUrl
    ).then(res => res.json())
     .then(json => {
                    console.log(json);
                    setVrMallList(Object.assign(json));
                  })
     .catch(err => console.log(err));

  };


  const getVrMallsDataByPage = (page, pageSize) => {

    getVrMallsData(checkedProductList, checkedList, page, pageSize);

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


  const onTabChange = (key) => {
    console.log(key);

  };

  const handleRefresh = () => {

    console.log("handleRefresh Start..");
    getVrMallsData(checkedProductList, checkedList, currentPage, size);
  };

  const handleVrMallCardClick = (vrMallId: VrMallModel['vrMallId']) => {

    console.log("click handleVrMallCardClick");
  };


  const { TabPane } = Tabs;


  const { Meta } = Card;

  const productOptions = ['BricQ', '스파이크 프라임', '로봇 인벤터', 'EV3', '애니멀 세트'];

  const onChangeProduct = list => {
    setCheckedProductList(list);
    setIndeterminateProduct(!!list.length && list.length < productOptions.length);
    setCheckAllProduct(list.length === productOptions.length);

    getVrMallCount(list, checkedList);
    //getVrMallsData(list, checkedList, currentPage, size);

  };

  const onCheckAllProductChange = e => {

    setCheckedProductList(e.target.checked ? productOptions : []);
    setIndeterminateProduct(false);
    setCheckAllProduct(e.target.checked);

    getVrMallCount(e.target.checked ? productOptions : [], checkedList);
    //getVrMallsData(e.target.checked ? productOptions : [], checkedList, currentPage, size);
  };


  const vrMallOptions = ['기초', '초급', '중급', '고급'];

  const onChange = list => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < vrMallOptions.length);
    setCheckAll(list.length === vrMallOptions.length);

    getVrMallCount(checkedProductList, list);
    //getVrMallsData(checkedProductList, list, currentPage, size);

  };

  const onCheckAllChange = e => {

    setCheckedList(e.target.checked ? vrMallOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);

    getVrMallCount(checkedProductList, e.target.checked ? vrMallOptions : []);
    //getVrMallsData(checkedProductList, e.target.checked ? vrMallOptions : [], currentPage, size);
  };

  const genAddExtra = () => {

    if (storageService.getItem('legomall-user')) {

        var user = JSON.parse( storageService.getItem('legomall-user') as string );

        if(user != undefined && user.role == 9) {
          return (<Link to={`${VR_MALL_INFO_PATH}/0`} >조립품 추가</Link>);
        }
    }

    return (<div></div>);

  };

  const CheckboxGroup = Checkbox.Group;


  return (
    <div className='card-container' style={{backgroundColor: '#ffffff', marginTop: '20px'}}>
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
            options={vrMallOptions}
            value={checkedList}
            onChange={onChange}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card style={{border: '0px', margin: '2px'}} extra={genAddExtra()}>
            {vrMallList ? (
              vrMallList.map(vrMall => (
                <Card.Grid className='card-grid'  style={cardGridStyle} key={vrMall.vrMallId}>
                  <div className='content'>
                    <VrMallCard
                      onClick={handleVrMallCardClick}
                      onRefresh={handleRefresh}
                      vrMall={vrMall}
                    />
                  </div>
                </Card.Grid>
              ))
            ) : (
              <Empty />
            )}
          </Card>
        </Col>
        <Pagination defaultCurrent={currentPage} pageSize={size} total={totalCount} onChange={getVrMallsDataByPage} style={{float: 'right', margin: '16px'}}/>
      </Row>
      <Row>
        <Col span={24}>
          <div>
            <ProductCardList productList={productList} />
          </div>
        </Col>
      </Row>

      <br/><br/><br/><br/>
    </div>
  );

}
