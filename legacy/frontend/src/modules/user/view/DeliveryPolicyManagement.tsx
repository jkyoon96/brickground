import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import {Icon, Input, Button, Checkbox, Row, Col, Modal, Radio } from 'antd';
import $ from 'jquery';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, MAIN_PATH, storageService } from 'common';



export const DeliveryPolicyManagement = (props) => {

  const { userId, shopId, tabKey } = props;
  const [deliveryPolicyId, setDeliveryPolicyId] = useState<number>(0);
  const [priceMode, setPriceMode] = useState<string>('count');
  const [basePrice, setBasePrice] = useState<number>(0);
  const [baseCount, setBaseCount] = useState<number>(0);
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0);


  useEffect(() => {

    if(tabKey == "delivery-management") {

      getDeliveryPolicy(shopId);

    }

  }, [tabKey]);


  const getDeliveryPolicy = (shopId) => {

      var searchUrl = SOPOONG_URL + SHOP_URL + '/deliveryPolicy.do?' + 'shopId=' + shopId ;

      fetch(
        searchUrl
      ).then(response => response.json())
       .then(data => {
                       console.log(data);

                       let deliveryPolicy = data;
                       let deliveryTotal = 0;

                       if(deliveryPolicy != undefined && deliveryPolicy.deliveryPolicyId != undefined) {

                         setDeliveryPolicyId(data.deliveryPolicyId);
                         setPriceMode(data.priceMode);
                         setBasePrice(data.basePrice);
                         setBaseCount(data.baseCount);
                         setDeliveryPrice(data.deliveryPrice);

                       }

                     })
       .catch(err => console.log(err));

  };


  const handleDeliveryPolicy = () => {

    var param = {
                  deliveryPolicyId: deliveryPolicyId,
                  priceMode: priceMode,
                  basePrice: basePrice,
                  baseCount: baseCount,
                  deliveryPrice: deliveryPrice
                };

    let url = SOPOONG_URL + SHOP_URL + '/deliveryPolicyUpdate.do';

    fetch( url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(param)
    } )
      .then(response => response.json())
      .then(data => {
                      console.log(data);

                    })
      .catch(err => console.log(err));

  };

  const checkNumber = (value) => {

    var numberChecker = /^[0-9]*$/;

    if(!numberChecker.test(value))
      return false;

    return true;
  }


  return (
    <Row type='flex' justify='center' align='middle' style={{marginTop:'50px', marginBottom: '50px', paddingTop: '20px', border: 'solid 1px rgba(0, 0, 0, .2)', borderRadius: '5px'}}  >
      <Col md={4} xs={8} style={{height: '40px', backgroundColor: '#fafafa', textAlign: 'center', paddingTop: '10px', borderRadius: '5px' }}>
        가격정책
      </Col>
      <Col md={20} xs={16} style={{paddingLeft: '20px', marginBottom: '10px'}}>
        <Radio.Group onChange={e => setPriceMode(e.target.value)} value={priceMode}>
          <Radio value={'count'}>갯수기준</Radio>
          <Radio value={'price'}>가격기준</Radio>
        </Radio.Group>
      </Col>
      <Col md={4} xs={8} style={{height: '40px', backgroundColor: '#fafafa', textAlign: 'center', paddingTop: '10px', borderRadius: '5px' }}>
        기준갯수
      </Col>
      <Col md={20} xs={16} style={{paddingLeft: '20px', paddingRight: '20px', marginBottom: '10px'}}>
        <Input
          placeholder="기준갯수를 입력하세요."
          style={{height: '40px'}}
          value={baseCount}
          onChange={(e) => {
                          if(checkNumber(e.target.value))
                            setBaseCount(Number.parseInt(e.target.value));
                          }
                    }
        />
      </Col>
      <Col md={4} xs={8} style={{height: '40px', backgroundColor: '#fafafa', textAlign: 'center', paddingTop: '10px', borderRadius: '5px' }}>
        기준가격
      </Col>
      <Col md={20} xs={16} style={{paddingLeft: '20px', paddingRight: '20px', marginBottom: '10px'}}>
        <Input
          placeholder="기준가격을 입력하세요."
          style={{height: '40px'}}
          value={basePrice}
          onChange={(e) => {
                          if(checkNumber(e.target.value))
                            setBasePrice(Number.parseInt(e.target.value));
                          }
                    }
        />
      </Col>
      <Col md={4} xs={8} style={{height: '40px', backgroundColor: '#fafafa', textAlign: 'center', paddingTop: '10px', borderRadius: '5px' }}>
        배송가격
      </Col>
      <Col md={20} xs={16} style={{paddingLeft: '20px', paddingRight: '20px', marginBottom: '10px'}}>
        <Input
          placeholder="가격을 입력하세요."
          style={{height: '40px'}}
          value={deliveryPrice}
          onChange={(e) => {
                          if(checkNumber(e.target.value))
                            setDeliveryPrice(Number.parseInt(e.target.value));
                          }
                    }
        />
      </Col>
      <Col span={24}>
        <Row type='flex' justify='center'>
          <Button type="primary" onClick={handleDeliveryPolicy} style={{textAlign: 'center', margin: '20px'}}>배송비 수정</Button>
        </Row>
      </Col>
    </Row>

  );
}
