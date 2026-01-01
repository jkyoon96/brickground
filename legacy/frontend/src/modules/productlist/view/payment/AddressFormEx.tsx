import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Form, Icon, Input, Button, Checkbox, Row, Col, Modal } from 'antd';
import $ from 'jquery';

import { SOPOONG_URL, SHOP_URL, JUSO_API_KEY, storageService } from 'common';
import { AddressSearchDialog } from '.';

export const AddressFormEx = (props) => {
  const { onChangeDelivery } = props;

  const [address, setAddress] = useState<string>('');
  const [detailAddress, setDetailAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [zip, setZip] = useState<string>('');
  const [visibleSelectAddressConfirm, setVisibleSelectAddressConfirm] = useState<boolean>(false);
  const [searchJuso, setSearchJuso] = useState<string>('');
  const [jusoDataSource, setJusoDataSource] = useState<any[]>([]);

  const [visibleAddressConfirm, setVisibleAddressConfirm] = useState<boolean>(false);
  const [addressMessage, setAddressMessage]  = useState<string>('');

  useEffect(() => {

    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined) {
          setEmail(user.email);
        }
    }

  }, []);


  const handleDelivery = () => {

    if(!checkAddress() || !checkPhone() || !checkEmail()) {
      return;
    }

    let url = SOPOONG_URL + SHOP_URL + '/delivery.do';

    var userId = -1;
    var shopId = -1;

    console.log("delevery");

    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined) {

          userId = user.userId;
          shopId = user.shopId;

        }
    }

    var param = {
                  userId: userId,
                  shopId: shopId,
                  address: address,
                  detailAddress: detailAddress,
                  phone: phone,
                  email: email,
                  zip: zip
                };

    fetch( url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(param)
      } )
        .then(response => response.json())
        .then(data => {
                        console.log(data);
                        $("#deliveryResult").text(' 새로운 배송지가 등록되었습니다.');

                        let deliveryInfo = {deliveryId: data.deliveryId,
                                            address: data.address,
                                            detailAddress: data.detailAddress,
                                            zip: data.zip,
                                            phone: data.phone,
                                            email: data.email
                                          };
                        onChangeDelivery(deliveryInfo.deliveryId, deliveryInfo);

                      })
        .catch(err => console.log(err));

  };

  const handleSelectAddress = (jusoRecord:any) => {

    if(jusoRecord != undefined) {
      setAddress(jusoRecord.roadAddrPart1);
      setZip(jusoRecord.zipNo)
    }

    setVisibleSelectAddressConfirm(false);

  };

  const checkAddress = () => {

    if(address.length == 0 || detailAddress.length == 0 || zip.length == 0 ){
      setVisibleAddressConfirm(true);
      setAddressMessage('올바른 주소를 입력하세요.');
      return false;
    }

    return true;
  }

  const checkEmail = () => {
    var emailChecker = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if(!emailChecker.test(email)){
      setVisibleAddressConfirm(true);
      setAddressMessage('올바른 이메일 주소를 입력하세요.');
      return false;
    }

    return true;
  }

  const checkPhone = () => {

    if(!phone.match( /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/ )) {
      setVisibleAddressConfirm(true);
      setAddressMessage('전화번호를 확인해 주세요.');
      return false;
    }

    return true;
  }

  const updatePhone = (number) => {

    let newNumber = number.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-");

    setPhone(newNumber);
  }

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
  };

  const getLabel = (title) => {
    return (
      <div style={{width: '100px'}}>
         {title}
      </div>
    );
  }

  return (

    <Row type='flex' justify='center'>
      <Col lg={18} md={20} xs={23}  style={{marginTop: '30px', padding: '30px', opacity: '0.8', borderRadius: '10px', border: 'solid 1px rgba(0, 0, 0, .2)'}}>
        <Row style={{marginBottom: '10px'}}>
          <Col span={24}>
            <Input
              addonBefore={getLabel('배송지주소')}
              addonAfter={<Icon onClick = {()=>setVisibleSelectAddressConfirm(true)} type="search" />}
              value={address}
              style={{height: '40px'}}
            />
          </Col>
        </Row>
        <Row style={{marginBottom: '10px'}}>
          <Col>
            <Input
              addonBefore={getLabel('상세주소')}
              placeholder="상세주소를 입력하세요"
              style={{height: '40px'}}
              onChange={e => setDetailAddress(e.target.value)}
            />
          </Col>
        </Row>
        <Row style={{marginBottom: '10px'}}>
          <Input
            addonBefore={getLabel('전화번호')}
            placeholder="전화번호를 입력하세요"
            style={{height: '40px'}}
            value={phone}
            onChange={e => updatePhone(e.target.value)}
          />
        </Row>
        <Row style={{marginBottom: '10px'}}>
          <Input
            addonBefore={getLabel('이메일')}
            placeholder="이메일을 입력하세요"
            style={{height: '40px'}}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Row>
        <Row type='flex' justify='center'>
          <p id='deliveryResult' style={{color:'#0000ff', textAlign: 'center', marginTop: '20px'}}> </p>
          <Button type="primary" onClick={handleDelivery} style={{ marginTop: '30px', width:'80%', height: '50px', fontSize: '16px', fontWeight: 800, borderRadius: '10px'}}>
            배송지 등록
          </Button>
        </Row>
      </Col>
      <Modal
        visible={visibleAddressConfirm}
        closable={false}
        title=""
        footer={[
          <Button type="primary" key='confirm' onClick={() => setVisibleAddressConfirm(false)} style={{width: '110px'}}>
            확인
          </Button>,
        ]}
      >
        <div style={{ paddingTop: '20px', margin: 'auto', textAlign: 'center' }} >
          {addressMessage}
        </div>

      </Modal>
      <AddressSearchDialog
        onSelectAddress={handleSelectAddress}
        visibleSelectAddressConfirm={visibleSelectAddressConfirm}
      />
    </Row>
  );

}
