import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Row, Col, Modal } from 'antd';
import $ from 'jquery';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, ACCOUNT_PATH, MAIN_PATH, PASSWORD_RESET_PATH, storageService } from 'common';

declare global {
  interface Window {
    Kakao: any;
  }
}

export const LoginView = (props) => {

  const [visibleLoginConfirm, setVisibleLoginConfirm] = useState<boolean>(false);
  const [loginMessage, setLoginMessage]  = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [autoSave, setAutoSave] = useState<boolean>(false);
  const [kakaoInit, setKakaoInit] = useState<boolean>(false);

  const kakaoJsKey = '68ac35183ac992351da8f01e2d1c294f';


  useEffect(() => {

    createKakaotalkLoginForm();

  }, []);


  useEffect(() => {
    storageService.removeItem('brickground-user');

    $('#MainHeader').hide();
    $('#MainFooter').hide();

    if (storageService.getItem('brickground-login')) {

      var login = JSON.parse( storageService.getItem('brickground-login') as string );

      if(login != undefined && login.autoSave) {
        setAutoSave(login.autoSave);
        setEmail(login.email);
      } else {
        setAutoSave(login.autoSave);
        setEmail('');
      }

    }

  }, [props]);

  const handleLogin = e => {
    e.preventDefault();

    var emailChecker = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if(!emailChecker.test(email)){
      setVisibleLoginConfirm(true);
      setLoginMessage('올바른 이메일 주소를 입력하세요.');
      return;
    }


    var param = {
                  email: email,
                  password: password
                };

    let url = SOPOONG_URL + SHOP_URL + '/login.do';

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
                      if(data.resultCode == -1) {
                        console.log('로그인 실패');
                        setVisibleLoginConfirm(true);
                        setLoginMessage(' 로그인이 실패하였습니다. 이메일과 비밀번호를 확인해 주세요.');
                      }
                      else if(data.resultCode == -2) {
                        console.log('로그인 실패');
                        setVisibleLoginConfirm(true);
                        setLoginMessage(' 로그인이 실패하였습니다. 접근권한이 없는 IP에서 접속하였습니다.');
                      }
                      else if(data.resultCode == -3) {
                        console.log('로그인 실패');
                        setVisibleLoginConfirm(true);
                        setLoginMessage(' 로그인이 실패하였습니다. 동시 접속 셰션이 초과하였습니다.');
                      }
                      else {

                        data.loginTime = (new Date()).getTime();
                        storageService.setItem('brickground-user', JSON.stringify(data));
                        //location.href = "/lianmall/main";
                        props.history.push(MAIN_PATH);
                      }

                    })
      .catch(err => console.log(err));

      let data={email:email, autoSave:autoSave};
      storageService.setItem('brickground-login', JSON.stringify(data));

  };


  const createKakaotalkLoginForm = () => {
		var loginBtn = $("#kakaoLoginButton");
		loginBtn.click(function(){
			window.Kakao.Auth.loginForm({

        persistAccessToken: false,
        persistRefreshToken: false,

				success: function(authObj) {

					var acs_token = authObj.access_token;
					var rfs_token = authObj.refresh_token;

          console.log("access_token : " + acs_token);
          onLoginKakao(authObj.access_token);

				},
				fail: function(err) {
					console.log(err);
				}
			});
		});

	}


  const onLoginKakao = (accessToken) => {

    console.log('access_token : ' + accessToken );

    var param = {
                  shopId: Number(SHOP_ID),
                  accessToken: accessToken
                };

    let url = SOPOONG_URL + SHOP_URL + '/klogin.do';

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
                        console.log('로그인 실패');
                        setVisibleLoginConfirm(true);
                        setLoginMessage(' 로그인이 실패하였습니다. 이메일과 비밀번호를 확인해 주세요.');
                      }
                      else {

                        data.loginTime = (new Date()).getTime();
                        storageService.setItem('brickground-user', JSON.stringify(data));
                        //location.href = "/lianmall/main";
                        props.history.push(MAIN_PATH);
                      }

                    })
      .catch(err => {
                      setVisibleLoginConfirm(true);
                      setLoginMessage('로그인이 실패하였습니다.');
                    });
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
        <Row>
          <Col span={8} offset={5}>
            <img className='company-logo'  src="images/logo004.png" style={{ height: '60px'}} />
          </Col>
        </Row>
        <Row style={{ marginTop: '30px', padding: '30px', opacity: '0.9', borderRadius: '10px', border: 'solid 1px rgba(0, 0, 0, .2)'}}>
          <Col span={24} style={{marginBottom: '10px'}}>
            <Input
              addonBefore={getLabel('이메일')}
              placeholder="이메일을 입력하세요"
              style={{height: '40px'}}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Col>
          <Col span={24} style={{marginBottom: '10px'}}>
            <Input.Password
              addonBefore={getLabel('비밀번호')}
              placeholder="비밀번호를 입력하세요"
              type="password"
              value={password}
              style={{height: '40px'}}
              onChange={e => setPassword(e.target.value)}
            />
          </Col>
          <Col span={24}>
            <Row type='flex' justify='space-between'>
              <Col md={12} xs={24}>
                <Checkbox
                  checked={autoSave}
                  onChange={e => {
                                   setAutoSave(e.target.checked);
                                   let data={email:email, autoSave:e.target.checked};
                                   storageService.setItem('brickground-login', JSON.stringify(data));
                                 }
                           }
                  >이메일 저장
                </Checkbox>
              </Col>
              <Col md={12} xs={24}>
                <NavLink to={PASSWORD_RESET_PATH} className="nav-link">비밀번호찾기</NavLink>
                  &nbsp;|&nbsp;
                <NavLink to={ACCOUNT_PATH} className="nav-link">회원가입</NavLink>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row type='flex' justify='center'>
              <Button type="primary" onClick={handleLogin} style={{ marginTop: '30px', width:'80%', height: '40px', fontSize: '16px',  fontWeight: 800, borderRadius: '10px'}}>
                로그인
              </Button>
            </Row>
          </Col>
          <Col span={24}>
            <Row type='flex' justify='center'>
              <div id="kakaoLoginButton" className="kakao" style={{textAlign: 'center'}}>카카오로 로그인하기</div>
            </Row>
          </Col>
        </Row>
        <Modal
          visible={visibleLoginConfirm}
          closable={false}
          title=""
          footer={[
            <Link key='main' to={MAIN_PATH} >
              <Button type="primary" key='home' onClick={() => setVisibleLoginConfirm(false)} style={{width: '110px', marginRight: '10px'}}>
                홈으로 가기
              </Button>
            </Link>,
            <Button type="primary" key='confirm' onClick={() => setVisibleLoginConfirm(false)} style={{width: '110px'}}>
              확인
            </Button>,
          ]}
        >
          <div style={{ paddingTop: '20px', margin: 'auto', textAlign: 'center' }} >
            {loginMessage}
          </div>

        </Modal>
      </Col>
    </Row>
  );

}
