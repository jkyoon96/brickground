import React, { useState, useCallback, FC, useEffect } from 'react';
import { Button, Table, Input, InputNumber, Tag, Row, Col, Select, Pagination } from 'antd';
import Text from 'antd/lib/typography/Text';
import CKEditor from '@ckeditor/ckeditor5-react';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';

import { SOPOONG_URL, SHOP_URL } from 'common';
import { PriceLabel } from 'components/PriceLabel';
import { CouponTag } from 'components/CouponTag';
import { ConfirmModal } from 'components/ConfirmModal';


export const OrderManagementTable = (props) => {

  const { userId, shopId, tabKey } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [price, setPrice] = useState<number>(-1);
  const [remainder, setRemainder] = useState<number>(-1);
  const [description, setDescription] = useState<string>("none");
  const [deliveryState, setDeliveryState] = useState<string>("P");
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");

  const [size, setSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(10);

  useEffect(() => {

    if(tabKey == "order-management") {
      getOrderCount();
    }

  }, [tabKey]);

  const getOrderCount = () => {

    var searchUrl = SOPOONG_URL + SHOP_URL + '/orderSummaryCountByShopId.do?shopId=' + shopId;

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

    let url = SOPOONG_URL + SHOP_URL + '/ordersByShop.do?shopId=' + shopId;
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


  const updateDeliveryState = (record, deliveryState) => {

    let url = SOPOONG_URL + SHOP_URL + '/orderSummaryUpdate.do';

    let params = {orderSummaryId: record.orderSummaryId, deliveryState: deliveryState, invoiceNumber: ''};

    if(invoiceNumber != '')
      params.invoiceNumber = invoiceNumber;
    else
      params.invoiceNumber = record.invoiceNumber;

    fetch( url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(params)
    } )
      .then(response => response.json())
      .then(data => {
                      console.log(data);
                      getOrderCount();
                    })
      .catch(err => console.log(err));

  }



  const getDeliveryState = (record) => {

    let deliveryState = record.deliveryState;

    if(deliveryState == 'P')
      return (
        <Select defaultValue="P" style={{paddingLeft: '20px', width: 150, color: '#FF0000'}} onChange={state => updateDeliveryState(record, state)}>
          <Option value="P" style={{color: '#FF0000'}}>배송준비</Option>
          <Option value="S" style={{color: '#0000FF'}}>배송시작</Option>
          <Option value="F" style={{color: '#000000'}}>배송완료</Option>
          <Option value="C" style={{color: '#A2ACAB'}}>주문취소</Option>
        </Select>
      );
    else if (deliveryState == 'S')
      return (
        <Select defaultValue="S" style={{paddingLeft: '20px', width: 150, color: '#0000FF'}} onChange={state => updateDeliveryState(record, state)}>
          <Option value="P" style={{color: '#FF0000'}}>배송준비</Option>
          <Option value="S" style={{color: '#0000FF'}}>배송시작</Option>
          <Option value="F" style={{color: '#000000'}}>배송완료</Option>
          <Option value="C" style={{color: '#A2ACAB'}}>주문취소</Option>
        </Select>
      );
    else if (deliveryState == 'F')
      return (
        <Select defaultValue="F" style={{paddingLeft: '20px', width: 150, color: '#000000'}} onChange={state => updateDeliveryState(record, state)}>
          <Option value="P" style={{color: '#FF0000'}}>배송준비</Option>
          <Option value="S" style={{color: '#0000FF'}}>배송시작</Option>
          <Option value="F" style={{color: '#000000'}}>배송완료</Option>
          <Option value="C" style={{color: '#A2ACAB'}}>주문취소</Option>
        </Select>
      );
    else
      return (
        <Select defaultValue="C" style={{paddingLeft: '20px', width: 150, color: '#A2ACAB'}} onChange={state => updateDeliveryState(record, state)}>
          <Option value="P" style={{color: '#FF0000'}}>배송준비</Option>
          <Option value="S" style={{color: '#0000FF'}}>배송시작</Option>
          <Option value="F" style={{color: '#000000'}}>배송완료</Option>
          <Option value="C" style={{color: '#A2ACAB'}}>주문취소</Option>
        </Select>
      );
  }

  const traceInvoiceNumber = (state) => {

    if(state == 'trace') {
      let popupWidth = 536;
      let popupHeight = 500;
      let left = (screen.width - popupWidth) / 2;
      let top = (screen.height - popupHeight) / 4;
      let feature = `width=${popupWidth}, height=${popupHeight}, top=${top}, left=${left}, location=no, titlebar=no, toolbar=no, status=no`;
      window.open('http://nexs.cjgls.com/web/service02_01.jsp?slipno=' + invoiceNumber, '배송조회', feature);
    }
  }


  const { Option } = Select;

  const selectBefore = (
    <Select defaultValue="insert" style={{ width: 100 }} onChange={state => traceInvoiceNumber(state)}>
      <Option value="insert">송장번호</Option>
      <Option value="trace">배송조회</Option>
    </Select>
  );


  const columns = [
    {
      title: '',
      dataIndex: 'orderSummaryId',
      render: (text, record) => (
        <Row type='flex' align='middle' >
          <Col md={3} xs={14} >
            {record.createDate.replace('T', ' ')}
          </Col>
          <Col md={2} xs={10}>
            {`${record.orderCount} 건`}
          </Col>
          <Col md={3} xs={12}>
            <PriceLabel value={record.totalPrice} strong={true} />
          </Col>
          <Col md={2} xs={12}>
            <PriceLabel value={record.deliveryPrice} strong={true} />
          </Col>
          <Col md={3} xs={12}>
            <PriceLabel value={record.payedMoney} strong={true} />
          </Col>
          <Col md={2} xs={12}>
            <Text strong={true}>{record.payedPoint.toLocaleString()}</Text>
            <Text style={{ marginLeft: 2 }}>P</Text>
          </Col>
          <Col md={5} xs={12}>
            <Input
              addonBefore={selectBefore}
              style={{height: '40px'}}
              defaultValue={record.invoiceNumber}
              onChange={e => setInvoiceNumber(e.target.value)}
            />
          </Col>
          <Col md={3} xs={12}>
            { getDeliveryState(record) }
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
