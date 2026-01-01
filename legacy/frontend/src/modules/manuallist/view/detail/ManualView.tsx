import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { Icon, Select, Row, Col, Menu, Breadcrumb, Card, Divider, Checkbox, Slider, InputNumber, Button, Tabs, Modal } from 'antd';
import $ from 'jquery';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, LOGIN_PATH, CART_PATH, PAYMENT_PATH, storageService } from 'common';
import { VrMallModel, ProductModel } from 'modules/main/model';
import { ManualCardList, ProductCardList } from 'modules/productlist/view';

export const ManualView = (props) => {

  const [product, setProduct] = useState<ProductModel>({productId: 0, shopId:0, productName:''});
  const [manualList, setManualList] = useState<any[]>([]);
  const [count, setCount] = useState<number>(1);

  const [visibleCartConfirm, setVisibleCartConfirm] = useState<boolean>(false);

  const history = useHistory();

  useEffect(() => {

    scroll(0, 0);

    getProductData();
    getManualsData();

  }, []);

  useEffect(() => {

    scroll(0, 0);

    getProductData();

  }, [props.match.params.productId]);


  const getProductData = () => {

    console.log('productId : ', props.match.params.productId);

    let url = SOPOONG_URL + SHOP_URL + '/product.do?productId=' + props.match.params.productId;

    fetch( url )
      .then(res => res.json())
      .then(json => {console.log(json); setProduct(Object.assign(json));})
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


  const hover = (vrModelName, coverImage) => {

    var element = document.getElementById(vrModelName);

    if(element != undefined) {
      element.setAttribute('src', coverImage.replace('.png', '_ani.gif'));
      element.style.width = '480px';
      element.style.height = '400px';
      element.style.borderRadius = '10px';
    }
  }

  const unhover = (vrModelName, coverImage) => {
    var element = document.getElementById(vrModelName);

    if(element != undefined) {
      element.setAttribute('src', coverImage);
      element.style.width = '480px';
      element.style.height = '400px';
      element.style.borderRadius = '10x';
    }
  }

  const saveCartToServer = () => {

    var userId = -1;
    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined) {
          userId = user.userId;

          let url = SOPOONG_URL + SHOP_URL + '/cart.do';

          var cart = {
                      shopId: product.shopId,
                      userId: userId,
                      categoryId: product.categoryId,
                      productId: product.productId,
                      productName: product.productName,
                      coverImage: product.coverImage,
                      price: product.price,
                      count: count,
                      vrMallId: Number(product.vrModelName)
                    };

          fetch( url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(cart)
          } )
            .then(response => response.json())
            .then(data => {
                            console.log(data);
                            setVisibleCartConfirm(true);
                          })
            .catch(err => console.log(err));

        }
    }
    else {
      //location.href = LOGIN_PATH;
      history.push(LOGIN_PATH);
    }
  }

  const handlePaymentClick = () => {

    var userId = -1;
    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined) {
          userId = user.userId;

          var payment = [{
                      cartId: -1,
                      shopId: product.shopId,
                      userId: userId,
                      categoryId: product.categoryId,
                      productId: product.productId,
                      productName: product.productName,
                      coverImage: product.coverImage,
                      price: product.price,
                      count: count,
                      vrMallId: Number(product.vrModelName)
                    }];

          storageService.setItem('brickground-payment', JSON.stringify(payment));

          history.push(PAYMENT_PATH);
        }
    }
    else {
      //location.href = LOGIN_PATH;
      history.push(LOGIN_PATH);
    }

  }


  const onTabChange = (key) => {
    console.log(key);

  };

  const { TabPane } = Tabs;

  const getProductInfo = () => {

    if(product.vrModelName == undefined)
      return;
    else
      return (
        <img
          src={`images/brickground/product/${product.vrModelName}.jpg`}
          style={{ width: '100%', height: '100%', maxWidth: '700px', maxHeight: '415px', border: '0px', padding: '0px'}}
        />
      );
  }

  const getTotalPrice = () => {
    if(product.price == undefined)
      return 0;

    let price = product.price * count;
    return price.toLocaleString();
  }

  const getRemainder = () => {
    if(product.remainder == undefined)
      return 0;

    return product.remainder.toLocaleString();
  }

   return (
     <>

      <Row>
        <Col md={12} xs={24}>
          <div style={{textAlign: 'center', paddingTop: '40px', paddingBottom: '20px'}}>
            <img
              id = {product.vrModelName}
              src={product.coverImage}
              style={{ width: '100%', height: '100%', maxWidth: '480px', maxHeight: '400px', margin: '0 auto', borderRadius: '10px' }}
            />
          </div>
         <div style={{textAlign: 'center', paddingTop: '10px'}}>
          * 본 상품 이미지는 실제와 다를 수 있습니다.
         </div>
        </Col>
        <Col md={12} xs={24}>
          <div style={{ maxHeight: '480px', borderLeft: '1px solid #d9dadb', padding: '40px'}}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'RobotoSlab'}}>
              {product.productName}
            </div>
            <div style={{marginTop: '15px'}}>
              <span style={{ fontSize: '16px'}} >열람</span> &nbsp;&nbsp;&nbsp;
              <span style={{ fontSize: '16px', fontWeight: 800}}>온라인</span>
            </div>
            <div style={{marginTop: '15px'}}>
              <span style={{ fontSize: '16px'}} >형식</span> &nbsp;&nbsp;&nbsp;
              <span style={{ fontSize: '16px', fontWeight: 800}}>VR/동영상/매뉴얼/프로그램(스크래치,파이썬)</span>
            </div>
            <div style={{marginTop: '15px'}}>
              <span style={{ fontSize: '16px'}} >원산지</span> &nbsp;&nbsp;
              <span style={{ fontSize: '16px', fontWeight: 800}}>대한민국</span>
            </div>
            <div style={{marginTop: '15px'}}>
              <span style={{ fontSize: '16px'}} >판매자</span> &nbsp;&nbsp;
              <span style={{ fontSize: '16px', fontWeight: 800}}>소풍앤에듀</span>
              <span style={{ fontSize: '16px', color: '#939699'}}>(010-3650-9339)</span>
            </div>
            <div style={{marginTop: '15px'}}>
              <span style={{ fontSize: '16px'}} >기간</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{ fontSize: '16px', fontWeight: 800}}>1년</span>
            </div>
            <div style={{marginTop: '15px', maxWidth: '620px', maxHeight: '200px', borderRadius: '10px', backgroundColor: '#f5f5f5'}}>
              <div style={{paddingTop: '20px', marginLeft: '30px'}}>
                 <span style={{fontSize: '18px', fontWeight: 800, color: '#262d33'}}> { getTotalPrice() } 원 </span>
              </div>
              <Divider style={{ height: '1px', border: 'solid 0px #797777', padding: '0px', marginTop: '20px', marginBottom: '20px' }} />
              <Row style={{width: '100%', height: '60px'}}>
                <Col span={12} style={{textAlign: 'center'}}>
                  <Button type="default" title="구매하기" disabled={!count} onClick={handlePaymentClick} style={{ width: '100%', minHeight: '40px', maxWidth: '200px', maxHeight: '50px', border: '0px', borderRadius: '20px', backgroundColor: '#f2770b', color: '#ffffff', fontSize: '14px', fontWeight: 800}}>구매하기</Button>
                </Col>
                <Col span={12} style={{textAlign: 'center'}}>
                  <Button  type="default" icon='shopping-cart' title="장바구니 담기" disabled={!count} onClick={saveCartToServer} style={{ width: '100%', minHeight: '40px', maxWidth: '200px', maxHeight: '50px', border: 'solid 1px #d9dadb', borderRadius: '20px', backgroundColor: '#f5f5f5', color: '#262d33', fontSize: '14px', fontWeight: 800}} >장바구니 담기</Button>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <div className='product-container' style={{marginTop: '30px'}}>
            <Tabs onChange={onTabChange} animated={false} >
              <TabPane tab="상세설명" key="1">

                <div style={{textAlign: 'center', paddingTop: '10px'}}>
                 * 본 상품 이미지는 실제와 다를 수 있습니다.
                </div>

              </TabPane>
            </Tabs>
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

      <Modal
        visible={visibleCartConfirm}
        title=""
        footer={[
          <Button key="back" onClick={() => setVisibleCartConfirm(false)}>
            계속 쇼핑하기
          </Button>,
          <Button key="submit" type="primary"><NavLink to={CART_PATH}>
            장바구니 이동하기</NavLink>
          </Button>,
        ]}
      >
        <div style={{ margin: 'auto', textAlign: 'center' }} >
          <p>장바구니에 상품이 등록되었습니다</p>
          <p>장바구니로 이동하시겠습니까?</p>
        </div>

      </Modal>

      <br/><br/><br/><br/><br/>

    </>
  );

};
