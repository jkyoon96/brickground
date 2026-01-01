import React, { useState, useCallback, FC, useEffect } from 'react';
import { Button, Table, InputNumber, Tag, Row, Col } from 'antd';
import { PriceLabel } from 'components/PriceLabel';


export const PaymentTableEx = props => {
  const { dataSource } = props;

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
