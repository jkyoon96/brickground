import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Row, Col, Modal } from 'antd';
import $ from 'jquery';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, MAIN_PATH, storageService } from 'common';

export const PasswordChangeView = (props) => {

  const [userId, setUserId] = useState<number>(0);
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPassword2, setNewPassword2] = useState<string>('');

  const [visiblePasswordConfirm, setVisiblePasswordConfirm] = useState<boolean>(false);
  const [passwordMessage, setPasswordMessage]  = useState<string>('');

  useEffect(() => {
    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined) {
          setUserId(user.userId);
        }
    }

  }, [props]);


  const handlePasswordChange = e => {

    if(!checkPassword())
      return;


    var param = {
                  userId: userId,
                  password: password,
                  newPassword: newPassword
                };

    let url = SOPOONG_URL + SHOP_URL + '/passwordUpdate.do';

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
                        console.log('비밀번호 변경 실패');
                        setVisiblePasswordConfirm(true);
                        setPasswordMessage('비밀번호 변경이 실패하였습니다.');
                      } else {
                        setVisiblePasswordConfirm(true);
                        setPasswordMessage('비밀번호 변경이 성공하였습니다.');
                      }

                    })
      .catch(err => console.log(err));

  };


  const checkPassword = () => {
    var num = password.search(/[0-9]/g);
    var eng = password.search(/[a-z]/ig);
    var spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if(password.length < 8 || password.length > 20){
      setVisiblePasswordConfirm(true);
      setPasswordMessage("8자리 ~ 20자리 이내로 입력해주세요.");
      return false;
    }

    if(password.search(/₩s/) != -1){
      setVisiblePasswordConfirm(true);
      setPasswordMessage("비밀번호는 공백없이 입력해주세요.");
      return false;
    }
    if(num < 0 || eng < 0 || spe < 0 ){
      setVisiblePasswordConfirm(true);
      setPasswordMessage("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
      return false;
    }
    if(newPassword !== newPassword2) {
      setVisiblePasswordConfirm(true);
      setPasswordMessage('비밀번호를 확인해 주세요.');
      return false;
    }

    return true;
  }

  const checkNewPassword = () => {
    var num = newPassword.search(/[0-9]/g);
    var eng = newPassword.search(/[a-z]/ig);
    var spe = newPassword.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if(newPassword.length < 8 || newPassword.length > 20){
      setVisiblePasswordConfirm(true);
      setPasswordMessage("8자리 ~ 20자리 이내로 입력해주세요.");
      return false;
    }

    if(newPassword.search(/₩s/) != -1){
      setVisiblePasswordConfirm(true);
      setPasswordMessage("비밀번호는 공백없이 입력해주세요.");
      return false;
    }
    if(num < 0 || eng < 0 || spe < 0 ){
      setVisiblePasswordConfirm(true);
      setPasswordMessage("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
      return false;
    }
    if(newPassword !== newPassword2) {
      setVisiblePasswordConfirm(true);
      setPasswordMessage('비밀번호를 확인해 주세요.');
      return false;
    }

    return true;
  }

  const getLabel = (title) => {
    return (
      <div style={{width: '120px'}}>
         {title}
      </div>
    );
  }

  return (

    <Row type='flex' justify='center'>
      <Col lg={8} md={16} xs={20} style={{marginTop: '50px', marginBottom: '50px'}}>
        <Row style={{ marginTop: '30px', padding: '30px', opacity: '0.8', borderRadius: '10px', border: 'solid 1px rgba(0, 0, 0, .2)'}}>
          <Col span={24} style={{marginBottom: '10px'}}>
            <Input.Password
              addonBefore={getLabel('비밀번호')}
              placeholder="비밀번호를 입력하세요."
              type="password"
              value={password}
              style={{height: '40px'}}
              onChange={e => setPassword(e.target.value)}
            />
          </Col>
          <Col span={24} style={{marginBottom: '10px'}}>
            <Input.Password
              addonBefore={getLabel('신규 비밀번호')}
              placeholder="신규 비밀번호를 입력하세요."
              type="password"
              value={newPassword}
              style={{height: '40px'}}
              onChange={e => setNewPassword(e.target.value)}
            />
          </Col>
          <Col span={24} style={{marginBottom: '10px'}}>
            <Input.Password
              addonBefore={getLabel('신규 비밀번호확인')}
              placeholder=""
              type="password"
              value={newPassword2}
              style={{height: '40px'}}
              onChange={e => setNewPassword2(e.target.value)}
            />
          </Col>

          <Col span={24}>
            <div style={{color: '#ff0000', fontSize: '12px'}}>
              * 비밀번호는 영문,숫자,특수문자 혼합하여 8자리~20자리 이내 입력하세요.
            </div>
          </Col>
          <Col span={24}>
            <Row type='flex' justify='center'>
              <Button type="primary" onClick={handlePasswordChange} style={{ marginTop: '30px', width:'100%', height: '40px', fontSize: '16px',  fontWeight: 800, borderRadius: '10px'}}>
                비밀번호 변경
              </Button>
            </Row>
          </Col>
        </Row>
        <Modal
          visible={visiblePasswordConfirm}
          closable={false}
          title=""
          footer={[
            <Button type="primary" key='confirm' onClick={() => setVisiblePasswordConfirm(false)} style={{width: '110px'}}>
              확인
            </Button>,
          ]}
        >
          <div style={{ paddingTop: '20px', margin: 'auto', textAlign: 'center' }} >
            {passwordMessage}
          </div>

        </Modal>
      </Col>
    </Row>
  );
}
