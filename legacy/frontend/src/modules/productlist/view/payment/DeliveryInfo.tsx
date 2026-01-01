import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Card, Tabs, Row, Col, Button, Empty } from 'antd';
import { SOPOONG_URL, SHOP_URL, storageService } from 'common';

import { AddressTable, AddressFormEx } from '.';

export const DeliveryInfo = (props) => {

  const { onChangeDelivery } = props;

  const [dataSource, setDataSource] = useState<any[]>([]);
  const [userId, setUserId] = useState<string>('');
  const [deliveryKey, setDeliveryKey] = useState<string>('1');

  useEffect(() => {

    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined) {
          setUserId(user.userId);
          getDataSource(user.userId);
        }
    }

  }, []);


  const getDataSource = (id) => {

    let url = SOPOONG_URL + SHOP_URL + '/deliverys.do?userId=' + id;

    fetch( url )
      .then(response => response.json())
      .then(data => {
                      console.log(data);

                      if(data != undefined && data.length > 0) {
                        setDataSource(data);
                      }


                    })
      .catch(err => console.log(err));
  };


  const handleDeleteAddress = (record) => {
    console.log("click 삭제" , record);

    let url = SOPOONG_URL + SHOP_URL + '/deliveryDelete.do';

    fetch( url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({deliveryId: record.deliveryId, userId: userId})
      } )
        .then(response => response.json())
        .then(data => {
                        console.log(data);

                        if(data != undefined && data.length > 0) {
                          setDataSource(data);
                        }


                      })
        .catch(err => console.log(err));

  };


  const onTabChange = (key) => {
    console.log(key);

    setDeliveryKey(key);

    if(key == '1')
      getDataSource(userId);

  };

  const { TabPane } = Tabs;

  return (
    <Row>
      <Col span={24} style={{marginTop: '10px'}}>
        <Tabs onChange={onTabChange} type="card" activeKey={deliveryKey} style={{marginTop: '20px'}} >
          <TabPane tab="최근 배송지" key="1">
            <Button onClick={()=>setDeliveryKey("2")} style={{marginLeft: '20px', marginBottom: '10px'}}>신규 배송지</Button>
            <AddressTable
              dataSource={dataSource}
              onChangeDelivery={onChangeDelivery}
              onDeleteAddress={handleDeleteAddress}
            />
          </TabPane>
          <TabPane tab="신규 배송지" key="2">
            <AddressFormEx
              onChangeDelivery={onChangeDelivery}
            />
          </TabPane>

        </Tabs>
      </Col>
    </Row>
  );

}
