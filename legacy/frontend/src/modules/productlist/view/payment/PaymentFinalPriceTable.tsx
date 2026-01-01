import React, { FC, useState, useEffect, useCallback } from 'react';
import { Descriptions, Radio } from 'antd';
import Text from 'antd/lib/typography/Text';
import { PriceLabel } from 'components/PriceLabel';
import { useSelector } from 'react-redux';
import { RadioChangeEvent } from 'antd/lib/radio';


export const PaymentFinalPriceTable = props => {
  const { totalPrice, payedMoney, payedPoint, deliveryPrice} = props;

  return (
    <>
      <Descriptions className='cart-container' bordered style={{ margin: '20px' }}>
        <Descriptions.Item label="총 상품 금액" span={3}>
          <PriceLabel value={totalPrice} />
        </Descriptions.Item>
        <Descriptions.Item label="배송 금액" span={3}>
          <PriceLabel value={deliveryPrice} />
        </Descriptions.Item>
        <Descriptions.Item label="최종 가격" span={3}>
          <PriceLabel
            value={totalPrice + deliveryPrice}
          />
        </Descriptions.Item>
        <Descriptions.Item label="사용 포인트" span={3}>
          <Text>{payedPoint.toLocaleString()}</Text>
          <Text style={{ marginLeft: 2 }}>P</Text>
        </Descriptions.Item>
        <Descriptions.Item label="결제 금액" span={3}>
          <PriceLabel
            value={payedMoney + deliveryPrice}
            large={true}
          />
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};
