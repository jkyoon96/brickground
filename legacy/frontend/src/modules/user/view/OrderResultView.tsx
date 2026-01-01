import React, { useState, useCallback, FC, useEffect } from 'react';
import { Button, Table, InputNumber, Tag } from 'antd';
import { PriceLabel } from 'components/PriceLabel';
import { CouponTag } from 'components/CouponTag';
import { ConfirmModal } from 'components/ConfirmModal';

type PropTypes = {
  dataSource: any;
};
/**
 * @description Cart페이지에서 장바구니 제품를 표시해 주는 테이블
 */
export const OrderResultView = props => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const { dataSource } = props;
  const [deliveryList, setDeliveryList] = useState<any[]>([]);
  const [orderList, setOrderList] = useState<any[]>([]);


  const columns = [
    {
      title: '주문일자',
      dataIndex: 'createDate',
      align: 'center' as 'center',
    },
    {
      title: '상품건수',
      dataIndex: 'orderCount',
      align: 'center' as 'center',
    },
    {
      title: '총금액',
      dataIndex: 'totalPrice',
      align: 'center' as 'center',
    },
    {
      title: '배송상태',
      dataIndex: 'deliveryState',
      align: 'center' as 'center',
      render: (coverImage: string) => (
        <div>
          <div>
          배송중
          </div>
          <div>
            <Button  size='small' style={{marginTop: '5px'}}>
              배송조회
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: '확인상태',
      dataIndex: 'confirmState',
      align: 'center' as 'center',
      render: (coverImage: string) => (
        <div>
          <div>
            <Button  size='small' style={{marginTop: '5px'}}>
              수취확인
            </Button>
          </div>
        </div>
      ),
    },

  ];

  const expandedRowRender = (record) => {
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
        width: '50%',
      },
      {
        title: '수량',
        dataIndex: 'count',
        align: 'center' as 'center',
      },
      {
        title: '가격',
        dataIndex: 'price',
        align: 'center' as 'center',
        render: (price: number) => (
          <PriceLabel value={price} strong={true} />
        ),
      },
    ];

    return <Table rowKey='orderId' columns={columns} dataSource={record.orders} pagination={false} />;

  };

  return (
    <>
      <Table
        style={{minWidth: '600px'}}
        rowKey='orderSummaryId'
        columns={columns}
        dataSource={dataSource}
        expandedRowRender={expandedRowRender}
        pagination={false}
      />
    </>
  );
};
