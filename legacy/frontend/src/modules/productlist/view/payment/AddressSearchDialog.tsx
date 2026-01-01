import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Form, Icon, Input, Button, Checkbox, Row, Col, Modal, Table, Pagination } from 'antd';
import $ from 'jquery';

import { SOPOONG_URL, SHOP_URL, JUSO_API_KEY, storageService } from 'common';

export const AddressSearchDialog= (props) => {

  const { onSelectAddress, visibleSelectAddressConfirm } = props;

  const [searchJuso, setSearchJuso] = useState<string>('');
  const [jusoDataSource, setJusoDataSource] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>({})

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [countPerPage, setCountPerPage] = useState<number>(10);

  useEffect(() => {

    findAddress(currentPage);

  }, []);

  const findAddress = (page) => {

    if(!checkSearchedWord(searchJuso))
      return;

    fetch(
      `http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=${page}&countPerPage=${countPerPage}&keyword=${searchJuso}&confmKey=${JUSO_API_KEY}&resultType=json`
    ).then(res => res.json())
     .then(json => {
       console.log(json);

       if(json.results.common != null) {
         setCurrentPage(json.results.common.currentPage);
         setTotalCount(json.results.common.totalCount);
       }

       if(json.results.juso != null) {
         //json.results.juso.map(addr => {let address = addr.zipNo + " " + addr.roadAddr; tempAddr.push(address)});
         setJusoDataSource(json.results.juso);
       }

     }
   )
     .catch(err => console.log(err))
  };

  const checkSearchedWord = (value) => {
  	if(value.length >0){
  		//특수문자 제거
  		var expText = /[%=><]/ ;
  		if(expText.test(value) == true){
  			alert("특수문자를 입력 할수 없습니다.") ;
  			value = value.split(expText).join("");
  			return false;
  		}

  		//특정문자열(sql예약어의 앞뒤공백포함) 제거
  		var sqlArray = new Array(
  			//sql 예약어
  			"OR", "SELECT", "INSERT", "DELETE", "UPDATE", "CREATE", "DROP", "EXEC",
               		 "UNION",  "FETCH", "DECLARE", "TRUNCATE"
  		);

  		var regex;
  		for(var i=0; i<sqlArray.length; i++){
  			regex = new RegExp( sqlArray[i] ,"gi") ;

  			if (regex.test(value) ) {
  			    alert("\"" + sqlArray[i]+"\"와(과) 같은 특정문자로 검색할 수 없습니다.");
  				value =value.replace(regex, "");
  				return false;
  			}
  		}
  	}
  	return true ;
  };

  const handleSelectChange = (selectedRowKeys: any, selectedRows) => {

    setSelectedRowKeys(selectedRowKeys);

    if(selectedRows.length > 0)
      setSelectedAddress(selectedRows[0]);
  };

  const handleSelectAddress = () => {
    onSelectAddress(selectedAddress);
  };

  const handleCancelSelectAddress = () => {
    onSelectAddress();
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelectChange,
  };

  const getLabel = (title) => {
    return (
      <div style={{width: '100px'}}>
         {title}
      </div>
    );
  }

  const columns = [
    {
      title: '주소',
      dataIndex: 'roadAddr',
      align: 'left' as 'left', // NOTE: 멍충한 antd 때문에 assertion을 통해 한번 더 타입을 확정해 준다
      render: (text, record) => {

          return (
            <div>
              <span>{record.roadAddr} / {record.zipNo} </span>
            </div>
          )
      },
      width: '100%',
    }
  ];

  return (
      <Modal
        visible={visibleSelectAddressConfirm}
        closable={false}
        title="주소검색"
        footer={[
                  <Button key="save_back" onClick={() => { handleCancelSelectAddress();} }>
                    취소하기
                  </Button>,
                  <Button key="save_submit" onClick={e => { handleSelectAddress(); } }>
                    선택하기
                  </Button>,
                ]}
        >
        <Row style={{ margin: 'auto', textAlign: 'center' }} >
          <Col span={24}>
            <Input
              addonBefore={getLabel('도로명')}
              addonAfter={<Icon onClick = {()=> findAddress(currentPage)} type="search" />}
              onChange={e => setSearchJuso(e.target.value)}
              style={{height: '40px'}}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              rowKey='roadAddr'
              rowSelection={{
                type: 'radio',
                ...rowSelection }}
                columns={columns}
                dataSource={jusoDataSource}
                pagination={false}
                scroll={{ y: 300 }}
              />
              <Pagination current={currentPage} onChange={page=>findAddress(page)} total={totalCount} pageSize={countPerPage} style={{float: 'right', margin: '16px'}} />
          </Col>
        </Row>
      </Modal>
  );

}
