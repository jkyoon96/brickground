import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Button, Divider, Tabs, Modal, Input } from 'antd';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import $ from 'jquery';
import { SOPOONG_URL, SHOP_URL,
  PRODUCTS_LIST_PATH,
  MAIN_PATH,
  storageService,
} from 'common';

import { PriceLabel } from 'components/PriceLabel';
import { PaymentTableEx } from '.';

declare global {
  interface Window {
    IMP: any;
  }
}

/**
 * @description 장바구니 페이지
 */
export const PaymentResultView = (props) => {

  const [shopId, setShopId] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [orderSummaryId, setOrderSummaryId] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0);
  const [payedMoney, setPayedMoney] = useState<number>(0);
  const [payedPoint, setPayedPoint] = useState<number>(0);
  const [address, setAddress] = useState<string>('');
  const [detailAddress, setDetailAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [applyNumber, setApplyNumber] = useState<string>('');
  const [orderDataSource, setOrderDataSource] = useState<any[]>([]);

  const [paymentPrice, setPaymentPrice] = useState<number>(0);


  useEffect(() => {

    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined) {
          setUserId(user.userId);
          setShopId(user.shopId);
          setUserName(user.userName);

          getOrderSummaryData(props.match.params.orderSummaryId);
        }
    }


  }, [props.match.params.orderSummaryId]);


  const getOrderSummaryData = (orderSummaryId) => {

    let url = SOPOONG_URL + SHOP_URL + '/ordersById.do?orderSummaryId=' + orderSummaryId;

    fetch( url )
      .then(response => response.json())
      .then(data => {
                      console.log(data);

                      if(data != undefined && data.orderSummaryId != null) {
                        setOrderSummaryId(data.orderSummaryId);
                        setTotalPrice(data.totalPrice);
                        setDeliveryPrice(data.deliveryPrice);
                        setPaymentPrice(data.payedMoney + data.deliveryPrice);
                        setPayedPoint(data.payedPoint);
                        setAddress(data.address);
                        setDetailAddress(data.detailAddress);
                        setPhone(data.phone);
                        setEmail(data.email);
                        setApplyNumber(data.applyNumber);
                        setOrderDataSource(data.orders);
                      }

                    })
      .catch(err => console.log(err));
  }


  const onTabChange = (key) => {
    console.log(key);

  };

  const { TabPane } = Tabs;


  const columns = [
    {
      title: '',
      dataIndex: 'cartId',
      render: (text, record) => (
        <Row type='flex' align='middle' >
          <Col md={4} xs={8} >
            <img
              style={{ width: '40px', height: '40px', marginBottom: '10px' }}
              src={record.coverImage}
            />
          </Col>
          <Col md={10} xs={16}>
            {record.productName}
          </Col>
          <Col md={4} xs={12}>
            {record.count}
          </Col>
          <Col md={6} xs={12}>
            <PriceLabel value={(record.count * record.price)} strong={true} />
          </Col>
        </Row>
      ),
    }
  ];



  const getLabel = (title) => {
    return (
      <div style={{width: '100px'}}>
         {title}
      </div>
    );
  }


  return (
    <>
      <div className='product-container' style={{marginTop: '30px'}}>
        <Tabs onChange={onTabChange} animated={false} >
          <TabPane tab="주문완료" key="1">
            <div style={{marginTop: '20px'}}>
              <Row type='flex' justify='center' style={{color: '#7f7f86', fontWeight: 'bold', fontSize: '18px'}}>
                주문이 성공적으로 접수되었습니다.
              </Row>
              <Row type='flex' justify='center' style={{color: '#509280', fontWeight: 'bold', fontSize: '18px'}}>
                {userName} 고객님 감사합니다.
              </Row>
              <Row type='flex' justify='center' style={{color: '#9f9fa0',  fontSize: '14px'}} >
                주문번호는 {orderSummaryId} 입니다.
              </Row>

              <Row style={{marginTop: '30px', marginBottom: '5px', fontWeight: 'bold', fontSize: '16px', color: '#f2770b'}}>
                결제 정보
              </Row>
              <Row type='flex' justify='center' align='middle' style={{marginBottom: '10px', border: 'solid 1px rgba(0, 0, 0, .2)', borderRadius: '5px'}}  >
                <Col md={3} xs={8} style={{height: '40px', backgroundColor: '#fafafa', textAlign: 'center', paddingTop: '10px', borderRadius: '5px' }}>
                  상품금액
                </Col>
                <Col md={3} xs={16} style={{paddingLeft: '20px'}}>
                  {totalPrice.toLocaleString()} 원
                </Col>
                <Col md={3} xs={8} style={{height: '40px', backgroundColor: '#fafafa', textAlign: 'center', paddingTop: '10px', borderRadius: '5px' }}>
                  배송비
                </Col>
                <Col md={3} xs={16} style={{paddingLeft: '20px'}}>
                  {deliveryPrice.toLocaleString()} 원
                </Col>
                <Col md={3} xs={8} style={{height: '40px', backgroundColor: '#fafafa', textAlign: 'center', paddingTop: '10px', borderRadius: '5px' }}>
                  사용포인트
                </Col>
                <Col md={3} xs={16} style={{paddingLeft: '20px'}}>
                  {payedPoint.toLocaleString()} P
                </Col>
                <Col md={3} xs={8} style={{height: '40px', backgroundColor: '#fafafa', textAlign: 'center', paddingTop: '10px', borderRadius: '5px' }}>
                  결제금액
                </Col>
                <Col md={3} xs={16} style={{paddingLeft: '20px'}}>
                  {paymentPrice.toLocaleString()} 원
                </Col>
              </Row>

              <Row style={{marginTop: '30px', marginBottom: '5px', fontWeight: 'bold', fontSize: '16px', color: '#f2770b'}}>
                배송 정보
              </Row>
              <Row type='flex' justify='center' align='middle' style={{marginBottom: '10px', border: 'solid 1px rgba(0, 0, 0, .2)', borderRadius: '5px'}}>
                <Col md={3} xs={8} style={{height: '40px', backgroundColor: '#fafafa', textAlign: 'center', paddingTop: '10px', borderRadius: '5px' }}>
                  받을실분
                </Col>
                <Col md={21} xs={16} style={{paddingLeft: '20px'}}>
                  {userName}
                </Col>
                <Col md={3} xs={8} style={{height: '40px', backgroundColor: '#fafafa', textAlign: 'center', paddingTop: '10px', borderRadius: '5px' }}>
                  주소
                </Col>
                <Col md={21} xs={16} style={{paddingLeft: '20px'}}>
                  {address + detailAddress}
                </Col>
                <Col md={3} xs={8} style={{height: '40px', backgroundColor: '#fafafa', textAlign: 'center', paddingTop: '10px', borderRadius: '5px' }}>
                  전화번호
                </Col>
                <Col md={9} xs={16} style={{paddingLeft: '20px'}}>
                  {phone}
                </Col>
                <Col md={3} xs={8} style={{height: '40px', backgroundColor: '#fafafa', textAlign: 'center', paddingTop: '10px', borderRadius: '5px' }}>
                  이메일
                </Col>
                <Col md={9} xs={16} style={{paddingLeft: '20px'}}>
                  {email}
                </Col>
              </Row>

              <Row style={{marginTop: '30px', marginBottom: '5px', fontWeight: 'bold', fontSize: '16px', color: '#f2770b'}}>
                주문 정보
              </Row>
              <Row align='middle' style={{marginBottom: '50px', border: 'solid 1px rgba(0, 0, 0, .2)', borderRadius: '5px'}}>
                <PaymentTableEx
                  dataSource={orderDataSource}
                />
              </Row>
              <Row type='flex' justify='center' style={{marginBottom: '50px'}}>
                <Col md={4} xs={12}>
                  <Link to={MAIN_PATH}>
                    <Button type='primary' style={{width: '100%', height: '40px', fontSize: '16px', fontWeight: 'bold'}}>계속 쇼핑하기</Button>
                  </Link>
                </Col>
              </Row>

            </div>
          </TabPane>
        </Tabs>
      </div>

    </>
  );
};
