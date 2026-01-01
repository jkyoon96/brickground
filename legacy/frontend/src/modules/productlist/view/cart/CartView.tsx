import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Button, Divider, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import $ from 'jquery';
import { SOPOONG_URL, SHOP_URL,
  PRODUCTS_LIST_PATH,
  PAYMENT_PATH,
  storageService
} from 'common';

import { CartTableEx, CartFinalPriceTable } from '.';

declare global {
  interface Window {
    IMP: any;
  }
}

/**
 * @description 장바구니 페이지
 */
export const CartView = () => {

  const [dataSource, setDataSource] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [deliveryTotalPrice, setDeliveryTotalPrice] = useState<number>(0);

  const [priceMode, setPriceMode] = useState<string>('count');
  const [basePrice, setBasePrice] = useState<number>(0);
  const [baseCount, setBaseCount] = useState<number>(0);
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0);

  const [userId, setUserId] = useState<number>(0);
  const [shopId, setShopId] = useState<number>(0);
  const [deliveryId, setDeliveryId] = useState<number>(0);

  const [paymentSource, setPaymentSource] = useState<any[]>([]);


  useEffect(() => {

    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined) {
          setUserId(user.userId);
          setShopId(user.shopId);

          getCartsData(user.shopId, user.userId);
        }
    }

  }, []);

  useEffect(() => {

    var floatPosition = parseInt($("#cartFloatMenu").css('top'));

  	$(window).scroll(function() {
  		// 현재 스크롤 위치를 가져온다.

      var scrollTop = $(window).scrollTop();
      var tempPosition = scrollTop + floatPosition;

      var documentHeight = $(document).height();

      console.log('document height : ', documentHeight , ' tempPosition : ', tempPosition );

      if(tempPosition < 200)
        tempPosition = 0;
      else if (documentHeight - tempPosition < 1200)
        tempPosition =  documentHeight - 1200;
      else
        tempPosition = tempPosition - 200;

      var newPosition = tempPosition + 'px';

  		/* 애니메이션 없이 바로 따라감
  		 $("#floatMenu").css('top', newPosition);
  		 */

  		$("#cartFloatMenu").stop().animate({
  			"top" : newPosition
  		}, 500);

  	}).scroll();
   }, []);


   const getCartsData = (shopId, userId) => {

       var searchUrl = SOPOONG_URL + SHOP_URL + '/cartsByUser.do?' + 'shopId=' + shopId ;
       searchUrl += '&userId=' + userId;

       fetch(
         searchUrl
       ).then(response => response.json())
        .then(data => {
                        console.log(data);
                        var vrCartList = Object.assign(data);
                        var value = 0;
                        var count = 0;

                        setDataSource( vrCartList );
                        setPaymentSource( vrCartList );

                        vrCartList.forEach(model => {
                          value += (model.count * model.price);
                        });

                        setTotalPrice(value);

                        getDeliveryPrice(vrCartList, shopId);

                      })
        .catch(err => console.log(err));

   };


   const getDeliveryPrice = (vrCartList, shopId) => {

       var searchUrl = SOPOONG_URL + SHOP_URL + '/deliveryPolicy.do?' + 'shopId=' + shopId ;

       fetch(
         searchUrl
       ).then(response => response.json())
        .then(data => {
                        console.log(data);

                        var value = 0;
                        var count = 0;

                        vrCartList.forEach(model => {
                          count += model.count;
                          value += (model.count * model.price);
                        });


                        let deliveryPolicy = data;
                        let deliveryTotal = 0;

                        if(deliveryPolicy.priceMode == 'count') {
                          deliveryTotal = deliveryPolicy.deliveryPrice + Math.floor(((count - 1)/deliveryPolicy.baseCount)) * deliveryPolicy.deliveryPrice;
                        } else if (deliveryPolicy.priceMode == 'price') {
                          if(value < deliveryPolicy.basePrice)
                            deliveryTotal = deliveryPolicy.deliveryPrice;
                          else
                            deliveryTotal = 0;
                        }

                        setPriceMode(data.priceMode);
                        setBasePrice(data.basePrice);
                        setBaseCount(data.baseCount);
                        setDeliveryPrice(data.deliveryPrice);

                        setDeliveryTotalPrice(deliveryTotal);

                      })
        .catch(err => console.log(err));

   };


  const handleCleanCart = useCallback(() => {
    storageService.removeItem('brickground-vr-cart');
    setDataSource([]);
    setTotalPrice(0);
    setDeliveryTotalPrice(0);

  }, [storageService.removeItem]);


  const handleSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    var value = 0;
    var count = 0;

    var paymentList = new Array();
    selectedRows.forEach(model => {
        count += model.count;
        value += (model.count * model.price);
        paymentList.push(model);
      });

    setPaymentSource(paymentList);
    setTotalPrice(value);

    var deliveryTotal = 0;

    if(priceMode == 'count') {
      deliveryTotal = deliveryPrice + Math.floor(((count - 1)/baseCount)) * deliveryPrice;
    } else if (priceMode == 'price') {
      if(value < basePrice)
        deliveryTotal = deliveryPrice;
      else
        deliveryTotal = 0;
    }

    setDeliveryTotalPrice(deliveryTotal);
  };


  const handleChangeCartTable = (vrCartList) => {

    storageService.setItem('brickground-vr-cart', JSON.stringify(vrCartList));

    setDataSource( vrCartList );
    setPaymentSource( vrCartList );

    var value = 0;
    var count = 0;

    vrCartList.forEach(model => {
        count += model.count;
        value += (model.count * model.price);
      });

    setTotalPrice(value);

    var deliveryTotal = 0;

    if(priceMode == 'count') {
      deliveryTotal = deliveryPrice + Math.floor(((count - 1)/baseCount)) * deliveryPrice;
    } else if (priceMode == 'price') {
      if(value < basePrice)
        deliveryTotal = deliveryPrice;
      else
        deliveryTotal = 0;
    }

    setDeliveryTotalPrice(deliveryTotal);

  };


  const handlePaymentClick = () => {

    storageService.setItem('brickground-payment', JSON.stringify(paymentSource));
  // location.href = PAYMENT_PATH;
  }


  const onTabChange = (key) => {
    console.log(key);

  };

  const { TabPane } = Tabs;

  const handleChangeDelivery = (selectedId) => {
    setDeliveryId(selectedId);
  }

  const getOrderMenu = () => {

    var filter = "win16|win32|win64|mac|macintel";
    if(navigator.platform) {
      if(filter.indexOf(navigator.platform.toLowerCase()) < 0) {

        return (<div style={{marginTop: '10px', border: '1px solid #d9dadb', borderRadius: '10px'}}>

                  <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 800, color: '#4592ff'}}> 최종 결제 금액 </div>
                  <Divider style={{marginTop: '15px', marginBottom: '15px'}} />
                  <CartFinalPriceTable
                    totalPrice={totalPrice}
                    deliveryPrice={deliveryTotalPrice}
                  />
                  <Divider style={{marginTop: '20px', marginBottom: '15px'}} />
                  <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 800, color: '#4592ff'}}>
                    <Link to={PAYMENT_PATH} >
                      <Button
                        type="primary"
                        size="large"
                        style={{ marginRight: '6px', marginBottom: '20px' }}
                        disabled={!totalPrice}
                        onClick={handlePaymentClick}
                      >
                        주문하기
                      </Button>
                    </Link>
                  </div>
                </div>
              );

      }
    }

    return (<div id='cartFloatMenu' style={{position: 'absolute', top: '0px', marginTop: '0px', marginLeft: '30px',  border: '1px solid #d9dadb', borderRadius: '10px'}}>

              <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 800, color: '#4592ff', marginTop: '10px'}}> 최종 결제 금액 </div>
              <Divider style={{marginTop: '15px', marginBottom: '15px'}} />
              <CartFinalPriceTable
                totalPrice={totalPrice}
                deliveryPrice={deliveryTotalPrice}
              />
              <Divider style={{marginTop: '20px', marginBottom: '15px'}} />
              <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 800, color: '#4592ff'}}>
                <Link to={PAYMENT_PATH} >
                  <Button
                    type="primary"
                    size="large"
                    style={{ marginRight: '6px', marginBottom: '20px' }}
                    disabled={!totalPrice}
                    onClick={handlePaymentClick}
                  >
                    주문하기
                  </Button>
                </Link>
              </div>
            </div>
          );
  }

  return (
    <>

      <div className='product-container' style={{marginTop: '30px' }}>
        <Tabs onChange={onTabChange} animated={false} >
          <TabPane tab="장바구니" key="1">
            <div style={{marginTop: '20px'}}>
              <Row style={{ marginBottom: '50px', minHeight: '400px'}} >
                <Col md={18} xs={24}>
                  <div>
                    <CartTableEx
                      dataSource={dataSource}
                      onCleanCart={handleCleanCart}
                      onChangeCartTable={handleChangeCartTable}
                      onSelectChange={handleSelectChange}
                    />
                  </div>
                </Col>
                <Col md={6} xs={24}>
                  { getOrderMenu() }
                </Col>
              </Row>

            </div>
          </TabPane>
        </Tabs>
      </div>

    </>
  );
};
