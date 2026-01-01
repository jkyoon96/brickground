import React, { FC, useState, useEffect, useCallback } from 'react';
import { Descriptions, Radio } from 'antd';
import { PriceLabel } from 'components/PriceLabel';
import { useSelector } from 'react-redux';
import { RadioChangeEvent } from 'antd/lib/radio';

export type PriceVales = {
  totalPrice: number;
  rateDiscountPrice: number;
  amountDiscountPrice: number;
};

export type RecommendCoupon = {
  [key: string]: 'unApplied' | 'amount' | 'rate';
};

type PropTypes = {
  totalPrice: number;
  deliveryPrice: number;
};

/**
 * @description 장바구니 화면에서 최종 결제 금액을 보여주는 테이블
 */
export const CartFinalPriceTable: FC<PropTypes> = props => {
  const { totalPrice, deliveryPrice} = props;


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
            large={true}
          />
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};
