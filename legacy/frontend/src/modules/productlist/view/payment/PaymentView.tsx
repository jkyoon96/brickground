import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Button, Divider, Tabs, Modal, InputNumber, Checkbox } from 'antd';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import $ from 'jquery';
import { SOPOONG_URL, SHOP_URL,
  PRODUCTS_LIST_PATH,
  PAYMENT_RESULT_PATH,
  storageService,
} from 'common';
import { PaymentTableEx, PaymentFinalPriceTable, DeliveryInfo } from '.';

declare global {
  interface Window {
    IMP: any;
  }
}

/**
 * @description 장바구니 페이지
 */
export const PaymentView = () => {

  const [dataSource, setDataSource] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [point, setPoint] = useState<number>(0);
  const [maxPoint, setMaxPoint] = useState<number>(0);
  const [payedMoney, setPayedMoney] = useState<number>(0);
  const [payedPoint, setPayedPoint] = useState<number>(0);
  const [bonusPoint, setBonusPoint] = useState<number>(0);
  const [deliveryTotalPrice, setDeliveryTotalPrice] = useState<number>(0);

  const [userId, setUserId] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [shopId, setShopId] = useState<number>(0);
  const [deliveryId, setDeliveryId] = useState<number>(0);
  const [deliveryInfo, setDeliveryInfo] = useState<any>({});

  const [visiblePaymentConfirm, setVisiblePaymentConfirm] = useState<boolean>(false);
  const [paymentMessage, setPaymentMessage]  = useState<string>('');

  const history = useHistory();


  useEffect(() => {

    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined) {
          setUserId(user.userId);
          setShopId(user.shopId);
          setUserName(user.userName);

          setPoint(user.point);
          getPaymentData(user.point, user.shopId);
        }
    }


  }, []);

  useEffect(() => {

    var floatPosition = parseInt($("#paymentFloatMenu").css('top'));

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

  		$("#paymentFloatMenu").stop().animate({
  			"top" : newPosition
  		}, 500);

  	}).scroll();
   }, []);


   const getPaymentData = (availablePoint, shopId) => {

     if (storageService.getItem('brickground-payment')) {

         var paymentList = JSON.parse( storageService.getItem('brickground-payment') as string );
         var value = 0;
         var count = 0;

         setDataSource( paymentList );

         paymentList.forEach(model => {
           value += (model.count * model.price);

           /*
           // 전시회 임시용
           if(model.productName == "45678") {
             setBonusPoint(model.count * 50000);
           }
           */

         });

         if(availablePoint > value) {
           setMaxPoint(value);
         } else {
           setMaxPoint(availablePoint);
         }

         setTotalPrice(value);
         setPayedMoney(value);

         getDeliveryPrice(paymentList, shopId);

     }
   };

   const getDeliveryPrice = (paymentList, shopId) => {

       var searchUrl = SOPOONG_URL + SHOP_URL + '/deliveryPolicy.do?' + 'shopId=' + shopId ;

       fetch(
         searchUrl
       ).then(response => response.json())
        .then(data => {
                        console.log(data);

                        var value = 0;
                        var count = 0;

                        paymentList.forEach(model => {
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


  const handlePaymentClick = () => {

    if(deliveryId == 0) {

      setVisiblePaymentConfirm(true);

      var message = '배송지를 선택해 주세요.';
      setPaymentMessage(message);
      return;
    }

    //var price = totalPrice + deliveryTotalPrice;
    var price = payedMoney + deliveryTotalPrice;
    var orderName = '주문명: 소풍앤에듀 상품';

    if(price > 0) {

      window.IMP.init('imp25321399');  //IMP.init('imp33886024'); //아임포트 회원가입 후 발급된 가맹점 고유 코드를 사용해주세요. 예시는 KCP공식 아임포트 데모 계정입니다.

      window.IMP.request_pay({
          pg : 'html5_inicis', //웹표준 결제창 지원
          pay_method : 'card', //card(신용카드), samsung(삼성페이), trans(실시간계좌이체), vbank(가상계좌), phone(휴대폰소액결제)
          merchant_uid : 'vrmall_' + new Date().getTime(), //상점에서 관리하시는 고유 주문번호를 전달
          name : orderName,   // '주문명:결제테스트',
          amount : price,
          buyer_email : deliveryInfo.email,
          buyer_name : userName,
          buyer_tel : deliveryInfo.phone,
          buyer_addr : deliveryInfo.address + ',' + deliveryInfo.detailAddress,
          buyer_postcode : deliveryInfo.zip
      }, function(rsp) {
          if ( rsp.success ) {

          console.log('IMP result : ', rsp);
          var message = '결제가 완료되었습니다.';
          message += '\n고유ID : ' + rsp.imp_uid;
          message += '\n상점 거래ID : ' + rsp.merchant_uid;
          message += '\n결제 금액 : ' + rsp.paid_amount;
          message += '카드 승인번호 : ' + rsp.apply_num;

          //setVisiblePaymentConfirm(true);
          //setPaymentMessage(message);

          saveOrder(orderName, rsp.imp_uid, rsp.merchant_uid, rsp.apply_num);

          } else {
            //결제 실패 : error_msg속성에 실패 사유가 전달됨
              var message = '결제에 실패하였습니다. ';
              message += '에러내용 : ' + rsp.error_msg;

              setVisiblePaymentConfirm(true);
              setPaymentMessage(message);

              //saveOrder(orderName, '00000000', '00000000', '00000000');
          }
      });

    }
    else {

      var message = '결제가 완료되었습니다.';
      message += '\n결제 금액 : 0 원';

      saveOrder(orderName, '00000000', '00000000', '00000000');
    }

    //saveOrder(orderName, '00000000', '00000000', '00000000');
  }

  const saveOrder = (orderName, impUid, merchantUid, applyNumber) => {

    let url = SOPOONG_URL + SHOP_URL + '/orderSummary.do';

    var orderSummary = { userId: userId,
                        shopId:shopId,
                        deliveryId: deliveryId,
                        orderName: orderName,
                        orderCount: dataSource.length,
                        totalPrice: totalPrice,
                        payedMoney: payedMoney,
                        payedPoint: payedPoint,
                        bonusPoint: bonusPoint,
                        deliveryPrice: deliveryTotalPrice,
                        impUid: impUid,
                        merchantUid: merchantUid,
                        applyNumber: applyNumber,
                        orders: dataSource };

    console.log('orderSummary : ', orderSummary);

    fetch( url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(orderSummary)
    } )
      .then(response => response.json())
      .then(data => {
                      console.log(data);
                      handleCleanCart();

                      var user = JSON.parse( storageService.getItem('brickground-user') as string );
                      if(user != undefined) {
                        user.point = user.point - payedPoint + bonusPoint;
                        storageService.setItem('brickground-user', JSON.stringify(user));
                      }

                      history.push(PAYMENT_RESULT_PATH + '/' + data.orderSummaryId);
                    })
      .catch(err => console.log(err));

  }


  const onTabChange = (key) => {
    console.log(key);

  };

  const { TabPane } = Tabs;

  const handleChangeDelivery = (selectedId, record) => {
    setDeliveryId(selectedId);
    setDeliveryInfo(record);
  }

  const getPaymentMenu = () => {

    var filter = "win16|win32|win64|mac|macintel";
    if(navigator.platform) {
      if(filter.indexOf(navigator.platform.toLowerCase()) < 0) {

        return (<div style={{marginTop: '10px', border: '1px solid #d9dadb', borderRadius: '10px'}}>

                  <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 800, color: '#4592ff'}}> 최종 결제 금액 </div>
                  <Divider style={{marginTop: '15px', marginBottom: '15px'}} />
                  <PaymentFinalPriceTable
                    totalPrice={totalPrice}
                    payedMoney={payedMoney}
                    payedPoint={payedPoint}
                    deliveryPrice={deliveryTotalPrice}
                  />
                  <Divider style={{marginTop: '20px', marginBottom: '15px'}} />
                  <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 800, color: '#4592ff'}}>
                    <Button
                      type="primary"
                      size="large"
                      style={{ marginRight: '6px', marginBottom: '20px' }}
                      disabled={!totalPrice}
                      onClick={handlePaymentClick}
                    >
                      결제하기
                    </Button>
                  </div>
                </div>
              );

      }
    }

    return (<div id='paymentFloatMenu' style={{position: 'absolute', top: '0px', marginTop: '0px', marginLeft: '30px',  border: '1px solid #d9dadb', borderRadius: '10px'}}>

              <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 800, color: '#4592ff'}}> 최종 결제 금액 </div>
              <Divider style={{marginTop: '15px', marginBottom: '15px'}} />
              <PaymentFinalPriceTable
                totalPrice={totalPrice}
                payedMoney={payedMoney}
                payedPoint={payedPoint}
                deliveryPrice={deliveryTotalPrice}
              />
              <Divider style={{marginTop: '20px', marginBottom: '15px'}} />
              <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 800, color: '#4592ff'}}>
                <Button
                  type="primary"
                  size="large"
                  style={{ marginRight: '6px', marginBottom: '20px' }}
                  disabled={!totalPrice}
                  onClick={handlePaymentClick}
                >
                  결제하기
                </Button>
              </div>
            </div>
          );
  }


  const getPointInfo = () => {

    return (
      <InputNumber
        min={0}
        max={maxPoint}
        style={{height: '40px'}}
        value={payedPoint}
        onChange={value => {
                              if(value != undefined && value <= maxPoint) {
                                setPayedPoint(value);
                                setPayedMoney(totalPrice - value);
                              }
                            }}
      />
    );

  }

  const getDeliveryInfo = () => {

    if(deliveryInfo.zip != undefined) {

      return (
        <div>
          <span>({ deliveryInfo.zip })</span>&nbsp;&nbsp;<span> {deliveryInfo.address}, </span>&nbsp;<span> {deliveryInfo.detailAddress} </span>
          <span>&nbsp;&nbsp;/&nbsp;&nbsp;</span><span>{deliveryInfo.phone}</span>
          <span>&nbsp;&nbsp;/&nbsp;&nbsp;</span><span>{deliveryInfo.email}</span>
        </div>
      );
    } else {

      return (
        <div style={{color: '#ff0000'}}>
          배송지 정보를 선택해 주세요.
        </div>
      );
    }

  }


  return (
    <>
      <div className='product-container' style={{marginTop: '30px'}}>
        <Tabs onChange={onTabChange} animated={false} >
          <TabPane tab="결제하기" key="1">
            <div style={{marginTop: '20px'}}>
              <Row style={{ marginBottom: 50}}>
                <Col md={18} xs={24}>
                  <Row>
                    <PaymentTableEx
                      dataSource={dataSource}
                    />
                  </Row>
                  <Row type='flex' align='middle' style={{ color: '#1890ff', marginTop: '20px', padding: '10px', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '5px'}}>
                    <Col md={4} xs={12}>
                      내 포인트
                    </Col>
                    <Col md={6} xs={12}>
                      {point.toLocaleString()}
                    </Col>
                    <Col md={4} xs={12}>
                      사용할 포인트
                    </Col>
                    <Col md={3} xs={6} style={{color: '#000000'}}>
                      <InputNumber
                        min={0}
                        max={maxPoint}
                        style={{height: '40px'}}
                        value={payedPoint}
                        onChange={value => {
                                              if(value != undefined && value <= maxPoint) {
                                                setPayedPoint(value);
                                                setPayedMoney(totalPrice - value);
                                              }
                                            }}
                      />
                    </Col>
                    <Col md={3} xs={6} >
                      <Button
                        type="primary"
                        onClick={() => {
                                         setPayedPoint(maxPoint);
                                         setPayedMoney(totalPrice - maxPoint);
                                       }
                                 }
                        >전체사용
                      </Button>
                    </Col>
                  </Row>
                  <Row type='flex' align='middle' style={{ color: '#1890ff', marginTop: '20px', padding: '10px', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '5px'}}>
                    <Col md={4} xs={24}>
                      배송지 정보
                    </Col>
                    <Col md={20} xs={24} style={{color: '#000000'}}>
                      { getDeliveryInfo() }
                    </Col>

                  </Row>
                  <Row>
                    <DeliveryInfo
                      onChangeDelivery={handleChangeDelivery}
                    />
                  </Row>
                </Col>
                <Col md={6} xs={24}>
                  { getPaymentMenu() }
                </Col>
              </Row>
            </div>
          </TabPane>
        </Tabs>
        <Modal
          visible={visiblePaymentConfirm}
          closable={false}
          title=""
          footer={[
            <Button type="primary" key='confirm' onClick={() => setVisiblePaymentConfirm(false)} style={{width: '110px'}}>
              확인
            </Button>,
          ]}
        >
          <div style={{ paddingTop: '20px', margin: 'auto', textAlign: 'center' }} >
            {paymentMessage}
          </div>

        </Modal>
      </div>

    </>
  );
};
