import React, { useState, useCallback, FC, useEffect } from 'react';
import { Button, Table, InputNumber, Tag, Row, Col } from 'antd';

import { SOPOONG_URL, SHOP_URL, SHOP_ID } from 'common';
import { PriceLabel } from 'components/PriceLabel';
import { CouponTag } from 'components/CouponTag';
import { ConfirmModal } from 'components/ConfirmModal';


/**
 * @description Cart페이지에서 장바구니 제품를 표시해 주는 테이블
 */
export const CartTableEx = props => {
  const { onCleanCart, onChangeCartTable, dataSource, onSelectChange } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  useEffect(() => {

    if( dataSource.length > 0 )
      setSelectedRowKeys( dataSource.map(model => model.cartId) );
    else
      setSelectedRowKeys( [] );

  }, [dataSource]);

  // 장바구니 비우기 버튼 클릭 핸들러

  const handleSelectChange = useCallback(
    (selectedRowKeys: any, selectedRows) => {

//      console.log( 'selectedRowKeys : ', selectedRowKeys , ' selectedRows : ', selectedRows.toString() );
      setSelectedRowKeys(selectedRowKeys);
      onSelectChange(selectedRowKeys, selectedRows);
    },
    [setSelectedRowKeys, selectedRowKeys, onSelectChange],
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelectChange,
  };

  const handleInputNumberChange = (record, count) => {

    var modelInfo = dataSource.find(model =>(model.cartId == record.cartId))

    if(modelInfo == undefined)
      return;

    modelInfo.count = count;

    updateCartToServer(modelInfo);

    onChangeCartTable(dataSource);
  };

  const handleDeleteSelectedModel = () => {
    console.log("click 선택 삭제");

    var uncheckedList = new Array();
    var checkedList = new Array();

    dataSource.forEach( model => {

      if(model == undefined)
        return;

      if(selectedRowKeys.find(key => key == model.cartId) == undefined )
        uncheckedList.push( model );
      else
        checkedList.push(model);
    });

    deleteCartsToServer(checkedList);

    onChangeCartTable(uncheckedList);
  };

  const handleDeleteModel = (record) => {
    console.log("click 삭제" , record);

    var modelInfo = dataSource.find(model =>(model.cartId == record.cartId))

    if(modelInfo == undefined)
      return;

    deleteCartToServer(modelInfo);

    var cartList = dataSource.filter(model =>(model.cartId != record.cartId))

    onChangeCartTable(cartList);

  };


  const handCleanCart = () => {

    deleteCartsToServer(dataSource);

    onCleanCart();

  }


  const handleDeleteAllModel = () => {
    console.log("click 장바구니 비우기");



    ConfirmModal('장바구니에 있는 모든 상품을 삭제하시겠습니까?', handCleanCart);
  };

  // 주문갯수 업데이트 정보를 서버에 저장하기
  const updateCartToServer = (record) => {

    let url = SOPOONG_URL + SHOP_URL + '/cartUpdateCount.do';

    console.log('dataSource : ', record);

    fetch( url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(record)
    } )
      .then(response => response.json())
      .then(data => {
                      console.log(data);
                    })
      .catch(err => console.log(err));

  }

  // 주문 삭제 정보를 서버에 저장하기
  const deleteCartToServer = (record) => {

    let url = SOPOONG_URL + SHOP_URL + '/cartDelete.do';

    console.log('record : ', record);

    fetch( url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(record)
    } )
      .then(response => response.json())
      .then(data => {
                      console.log(data);
                    })
      .catch(err => console.log(err));

  }

  // 전체 주문 삭제 정보를 서버에 저장하기
  const deleteCartsToServer = (records) => {

    let url = SOPOONG_URL + SHOP_URL + '/cartsDelete.do';

    console.log('records : ', records);

    fetch( url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(records)
    } )
      .then(response => response.json())
      .then(data => {
                      console.log(data);
                    })
      .catch(err => console.log(err));

  }



  const columns = [
    {
      title: '전체선택',
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
            <InputNumber
              style={{ width: '65px' }}
              min={1}
              defaultValue={record.count}
              onChange={num => handleInputNumberChange(record, num)}
            />
          </Col>
          <Col md={4} xs={10}>
            <PriceLabel value={(record.count * record.price)} strong={true} />
          </Col>
          <Col md={2} xs={2}>
            <a onClick={ e => handleDeleteModel(record) } style={{ color: '#d9dadb'}}>X</a>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button onClick={ () => handleDeleteSelectedModel()   } disabled={!dataSource.length} style={{marginRight: '10px'}}>
          선택 삭제하기
        </Button>
        <Button onClick={ () => handleDeleteAllModel() } disabled={!dataSource.length}>
          장바구니 비우기
        </Button>
      </div>
      <Table
        rowKey='cartId'
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    </>
  );
};
