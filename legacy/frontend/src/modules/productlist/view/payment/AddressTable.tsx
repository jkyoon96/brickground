import React, { useState, useCallback, FC, useEffect } from 'react';
import { Button, Table } from 'antd';


/**
 * @description Cart페이지에서 장바구니 제품를 표시해 주는 테이블
 */
export const AddressTable = props => {

  const { dataSource, onChangeDelivery, onDeleteAddress } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);


  // 장바구니 비우기 버튼 클릭 핸들러

  const handleSelectChange = useCallback(
    (selectedRowKeys: any, selectedRows) => {

      console.log( 'selectedRowKeys : ', selectedRowKeys , ' selectedRows : ', selectedRows.toString() );
      setSelectedRowKeys(selectedRowKeys);

      if(selectedRowKeys.length > 0)
        onChangeDelivery(selectedRowKeys[0], selectedRows[0]);

    },
    [setSelectedRowKeys, selectedRowKeys],
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelectChange,
  };


  const columns = [
    {
      title: '주소',
      dataIndex: 'address',
      align: 'left' as 'left', // NOTE: 멍충한 antd 때문에 assertion을 통해 한번 더 타입을 확정해 준다
      key: 'deliveryId',
      render: (text, record) => {

          return (
            <div>
              <span>({ record.zip })</span>&nbsp;&nbsp;<span> {record.address}, </span>&nbsp;<span> {record.detailAddress} </span>
              <span>&nbsp;&nbsp;/&nbsp;&nbsp;</span><span>{record.phone}</span>
              <span>&nbsp;&nbsp;/&nbsp;&nbsp;</span><span>{record.email}</span>
            </div>
          )
      },
      width: '90%',
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => {

          return (
            <div>
              <span> <a onClick={ e => onDeleteAddress(record) } style={{ color: '#d9dadb'}}>X</a></span>
            </div>
          )
      },
    },
  ];

  return (
    <>
      <Table
      rowKey='deliveryId'
      rowSelection={{
        type: 'radio',
        ...rowSelection }}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    </>
  );
};
