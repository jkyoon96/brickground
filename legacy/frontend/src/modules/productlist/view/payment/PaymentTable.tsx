import React, { useState, useCallback, FC, useEffect } from 'react';
import { Button, Table, InputNumber, Tag } from 'antd';
import { PriceLabel } from 'components/PriceLabel';
import { CouponTag } from 'components/CouponTag';
import { ConfirmModal } from 'components/ConfirmModal';


export const PaymentTable = props => {
  const { dataSource } = props;

  const columns = [
    {
      title: '이미지',
      dataIndex: 'coverImage',
      align: 'center' as 'center',
      render: (coverImage: string) => (
        <img
          style={{ width: '40px', height: '40px' }}
          src={coverImage}
        />
      ),
    },
    {
      title: '상품 제목',
      dataIndex: 'productName',
      align: 'center' as 'center', // NOTE: 멍충한 antd 때문에 assertion을 통해 한번 더 타입을 확정해 준다
      key: 'productName',
      width: '50%',
    },
    {
      title: '수량',
      dataIndex: 'count',
      align: 'center' as 'center',
      key: 'count',
    },
    {
      title: '가격',
      dataIndex: 'price',
      align: 'center' as 'center',
      render: (text, record) => (
        <PriceLabel value={(record.count * record.price)} strong={true} />
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <span style={{ marginRight: 10 }}>
          {dataSource.length > 0
            ? `선택 상품(${dataSource.length}개)`
            : ' '}
        </span>
      </div>
      <Table
        rowKey='cartId'
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    </>
  );
};
