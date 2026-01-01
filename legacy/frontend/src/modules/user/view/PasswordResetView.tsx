import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Row, Col, Modal } from 'antd';
import $ from 'jquery';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, MAIN_PATH, storageService } from 'common';

export const PasswordResetView = (props) => {

  const [visibleEmailConfirm, setVisibleEmailConfirm] = useState<boolean>(false);
  const [accountMessage, setAccountMessage]  = useState<string>('');
  const [checkUseEmail, setCheckUseEmail] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');

  useEffect(() => {
    storageService.removeItem('brickground-user');
    storageService.removeItem('brickground-login');

    $('#MainHeader').hide();
    $('#MainFooter').hide();

  }, [props]);

  const handleCheckUsedEmail = () => {

    if(!checkEmail()){
      return;
    }

    var param = {
                  email: email,
                };

    let url = SOPOONG_URL + SHOP_URL + '/usedEmailCheck.do';

    fetch( url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(param)
    } )
      .then(response => response.json())
      .then(data => {
                      setVisibleEmailConfirm(true);

                      if(data.userId == null) {
                        setAccountMessage('등록되지 않은 이메일 입니다.');
                      } else {
                        setAccountMessage('사용중인 이메일 입니다.');
                        setCheckUseEmail(true);
                      }

                    })
      .catch(err => console.log(err));

  };

  const handlePasswordReset = e => {

    if(!checkUseEmail){
      setVisibleEmailConfirm(true);
      setAccountMessage('이메일을 확인해 주세요.');
      return;
    }

    if(!checkMobile())
      return;

    var param = {
                  email: email,
                  userName: userName,
                  mobile: mobile,
                  shopId: SHOP_ID
                };

    let url = SOPOONG_URL + SHOP_URL + '/passwordReset.do';

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
                      if(data.userId == null) {
                        console.log('비밀번호 초기화 실패');
                        setVisibleEmailConfirm(true);
                        setAccountMessage('비밀번호 재설정이 실패하였습니다. 이메일과 이름, 휴대폰번호를 확인해 주세요.');
                      } else {
                        setVisibleEmailConfirm(true);
                        setAccountMessage('비밀번호 재설정이 성공하였습니다. 메일을 확인해 주세요.');
                      }

                    })
      .catch(err => console.log(err));

  };

  const checkEmail = () => {
    var emailChecker = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if(!emailChecker.test(email)){
      setVisibleEmailConfirm(true);
      setAccountMessage('올바른 이메일을 입력하세요.');
      return false;
    }

    return true;
  }

  const checkUserName = () => {

    if(userName.length < 1 ) {
      setVisibleEmailConfirm(true);
      setAccountMessage('이름을 확인해 주세요.');
      return false;
    }

    return true;
  }

  const checkMobile = () => {

    if(!mobile.match( /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/ )) {
      setVisibleEmailConfirm(true);
      setAccountMessage('휴대폰 번호를 확인해 주세요.');
      return false;
    }

    return true;
  }

  const updateMobile = (number) => {

    let newNumber = number.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-");

    setMobile(newNumber);
  }

  const getLabel = (title) => {
    return (
      <div style={{width: '100px'}}>
         {title}
      </div>
    );
  }

  return (

    <Row type='flex' justify='center'>
      <Col lg={8} md={16} xs={20} style={{marginTop: '50px', marginBottom: '50px'}}>
        <Row style={{fontFamily: 'RobotoSlab', fontSize: '20px', fontWeight: 'bold', color: '#262d33', opacity: '0.8', textAlign: 'center'}}>
          Shopping with VR
        </Row>
        <Row style={{ marginTop: '30px', padding: '30px', opacity: '0.8', borderRadius: '10px', border: 'solid 1px rgba(0, 0, 0, .2)'}}>
          <Col span={24} style={{marginBottom: '10px'}}>
            <Input
              addonBefore={getLabel('이메일')}
              placeholder="이메일을 입력하세요."
              addonAfter={<Icon onClick = {()=>handleCheckUsedEmail()} type="question-circle" />}
              style={{height: '40px'}}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Col>
          <Col span={24} style={{marginBottom: '10px'}}>
            <Input
              addonBefore={getLabel('이름')}
              placeholder="이름을 입력하세요"
              style={{height: '40px'}}
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
          </Col>
          <Col span={24} style={{marginBottom: '10px'}}>
            <Input
              addonBefore={getLabel('휴대폰번호')}
              placeholder="휴대폰번호를 입력하세요."
              style={{height: '40px'}}
              value={mobile}
              onChange={e => updateMobile(e.target.value)}
            />
          </Col>
          <Col span={24}>
            <div style={{color: '#ff0000', fontSize: '12px'}}>
              * 이메일은 등록여부 체크가 필수입니다.
            </div>
            <div style={{color: '#ff0000', fontSize: '12px'}}>
              * 이름은 가입시 등록된 이름을 입력하세요.
            </div>
            <div style={{color: '#ff0000', fontSize: '12px'}}>
              * 휴대전화는 가입시 등록된 번호를 입력하세요.
            </div>
          </Col>
          <Col span={24}>
            <Row type='flex' justify='center'>
              <Button type="primary" onClick={handlePasswordReset} style={{ marginTop: '30px', width:'100%', height: '40px', fontSize: '16px',  fontWeight: 800, borderRadius: '10px'}}>
                비밀번호 재설정
              </Button>
            </Row>
          </Col>
        </Row>
        <Modal
          visible={visibleEmailConfirm}
          closable={false}
          title=""
          footer={[
            <Link key='main' to={MAIN_PATH} >
              <Button type="primary" key='home' onClick={() => setVisibleEmailConfirm(false)} style={{width: '110px', marginRight: '10px'}}>
                홈으로 가기
              </Button>
            </Link>,
            <Button type="primary" key='confirm' onClick={() => setVisibleEmailConfirm(false)} style={{width: '110px'}}>
              확인
            </Button>,
          ]}
        >
          <div style={{ paddingTop: '20px', margin: 'auto', textAlign: 'center' }} >
            {accountMessage}
          </div>

        </Modal>
      </Col>
    </Row>
  );
}
