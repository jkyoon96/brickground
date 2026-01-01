import React, { useState, useCallback, FC, useEffect } from 'react';
import { Button, Table, InputNumber, Tag, Row, Col, Pagination } from 'antd';
import Text from 'antd/lib/typography/Text';

import { SOPOONG_URL, SHOP_URL } from 'common';
import { PriceLabel } from 'components/PriceLabel';
import { CouponTag } from 'components/CouponTag';
import { ConfirmModal } from 'components/ConfirmModal';


/**
 * @description Cart페이지에서 장바구니 제품를 표시해 주는 테이블
 */
export const OrderTableEx = (props) => {

  const { userId, shopId, tabKey } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [dataSource, setDataSource] = useState<any[]>([]);

  const [size, setSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(10);

  useEffect(() => {

    if(tabKey == "my-order") {
      getOrderCount();
    }

  }, [tabKey]);


  const getOrderCount = () => {

    var searchUrl = SOPOONG_URL + SHOP_URL + '/orderSummaryCountByUserId.do?userId=' + userId;

    fetch(
      searchUrl
    ).then(response => response.json())
     .then(data => {
                      console.log(data);
                      setTotalCount(data);

                      getOrderList(currentPage, size);
                     })
     .catch(err => console.log(err));

  };

  const getOrderList = (page, pageSize) => {

    let url = SOPOONG_URL + SHOP_URL + '/ordersByUser.do?userId=' + userId;
    url += '&page=' + (page - 1) + '&size=' + size;

    fetch( url )
      .then(response => response.json())
      .then(data => {
                      console.log(data);

                      if(data != undefined && data.length > 0) {
                        setDataSource(data);
                      }

                    })
      .catch(err => console.log(err));
  }

  const getInvoiceNumber = (record) => {

    let invoiceNumber = record.invoiceNumber;

    if(invoiceNumber == undefined || invoiceNumber == null ) {
      return (
        <></>
      );
    }

    else {
      let popupWidth = 536;
      let popupHeight = 500;
      let left = (screen.width - popupWidth) / 2;
      let top = (screen.height - popupHeight) / 4;
      let feature = `width=${popupWidth}, height=${popupHeight}, top=${top}, left=${left}, location=no, titlebar=no, toolbar=no, status=no`;
      return (
        <>
          <Button type="primary" onClick={()=>{window.open('http://nexs.cjgls.com/web/service02_01.jsp?slipno=' + invoiceNumber, '배송조회', feature)}} >
            {invoiceNumber}
          </Button>
        </>
      );
    }
  }

  const getDeliveryState = (record) => {

    let deliveryState = record.deliveryState;

    if(deliveryState == 'P')
      return '배송준비';
    else if (deliveryState == 'S')
      return '배송시작';
    else if (deliveryState == 'F')
      return '배송완료';
    else
      return '주문취소';
  }

  const columns = [
    {
      title: '',
      dataIndex: 'orderSummaryId',
      render: (text, record) => (
        <Row type='flex' align='middle' >
          <Col md={4} xs={14} >
            {record.createDate.replace('T', ' ')}
          </Col>
          <Col md={2} xs={10}>
            {`${record.orderCount} 건`}
          </Col>
          <Col md={3} xs={12}>
            <PriceLabel value={record.totalPrice} strong={true} />
          </Col>
          <Col md={3} xs={12}>
            <PriceLabel value={record.deliveryPrice} strong={true} />
          </Col>
          <Col md={3} xs={12}>
            <PriceLabel value={record.payedMoney} strong={true} />
          </Col>
          <Col md={3} xs={12}>
            <Text strong={true}>{record.payedPoint.toLocaleString()}</Text>
            <Text style={{ marginLeft: 2 }}>P</Text>
          </Col>
          <Col md={3} xs={12}>
            { getDeliveryState(record) }
          </Col>
          <Col md={3} xs={12}>
            { getInvoiceNumber(record) }
          </Col>
        </Row>
      ),
    }
  ];

  const expandedRowRender = (record) => {
    const columns = [
      {
        title: '',
        dataIndex: 'orderId',
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
            <Col md={4} xs={8}>
              {`${record.count} 개`}
            </Col>
            <Col md={6} xs={16}>
              <PriceLabel value={record.price} strong={true} />
            </Col>
          </Row>
        ),
      }
    ];

    return (
      <>
        <Row style={{padding: '10px', marginTop: '0px', marginBottom: '20px', fontSize: '14px', fontWeight: 'bold', color: '#00567E', borderRadius: '5px', border: 'solid 1px rgba(0, 86, 126, .0)'}}>
          <Col md={6} xs={24}>
            주문자 : {record.userName}
          </Col>
          <Col md={6} xs={24} >
            연락처 : {record.phone}
          </Col>
          <Col md={12} xs={24} >
            배송지 : {record.address}, {record.detailAddress}
          </Col>
        </Row>
        <Table rowKey='orderId' showHeader={false} columns={columns} dataSource={record.orders} pagination={false} />
      </>
    );

  };

  return (
    <>
      <Table
        rowKey='orderSummaryId'
        columns={columns}
        dataSource={dataSource}
        expandedRowRender={expandedRowRender}
        pagination={false}
      />
      <Pagination defaultCurrent={currentPage} total={totalCount} onChange={getOrderList} style={{float: 'right', margin: '16px'}}/>
    </>
  );
};
