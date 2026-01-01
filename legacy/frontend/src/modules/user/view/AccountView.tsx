import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Row, Col, Modal } from 'antd';
import $ from 'jquery';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, MAIN_PATH, storageService } from 'common';

declare global {
  interface Window {
    Kakao: any;
  }
}

export const AccountView = (props) => {

  const [visibleEmailConfirm, setVisibleEmailConfirm] = useState<boolean>(false);
  const [visibleSuccessConfirm, setVisibleSuccessConfirm] = useState<boolean>(false);
  const [visibleFailConfirm, setVisibleFailConfirm] = useState<boolean>(false);
  const [accountMessage, setAccountMessage]  = useState<string>('');
  const [checkUseEmail, setCheckUseEmail] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userNickname, setUserNickname] = useState<string>('');
  const [mobile, setMobile] = useState<string>('000-0000-0000');

  useEffect(() => {

    createKakaotalkLoginForm();

  }, []);


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

                      if(data.userId == 0) {
                        setAccountMessage('사용할 수 있는 이메일 입니다.');
                        setCheckUseEmail(true);
                      } else {
                        setAccountMessage('사용중인 이메일 입니다.');
                      }

                    })
      .catch(err => console.log(err));

  };

  const handleAccount = e => {

    if(!checkUseEmail){
      setVisibleEmailConfirm(true);
      setAccountMessage('이메일을 확인해 주세요.');
      return;
    }

    if(!checkPassword())
      return;


    if(!checkMobile())
      return;

    if(!checkUserName()){
      return;
    }


    var param = {
                  email: email,
                  password: password,
                  userName: userName,
                  userNickname: userNickname,
                  mobile: mobile,
                  shopId: SHOP_ID
                };

    let url = SOPOONG_URL + SHOP_URL + '/user.do';

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
                        console.log('계정생성 실패');
                        setVisibleFailConfirm(true);
                        setAccountMessage('계정생성이 실패하였습니다. 이메일과 비밀번호를 확인해 주세요.');
                        setCheckUseEmail(false);
                      } else {
                        setVisibleSuccessConfirm(true);
                        setAccountMessage('계정생성이 성공하였습니다. 메인페이지로 이동하세요.');
                        setCheckUseEmail(false);
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

  const checkPassword = () => {
    var num = password.search(/[0-9]/g);
    var eng = password.search(/[a-z]/ig);
    var spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if(password.length < 8 || password.length > 20){
      setVisibleEmailConfirm(true);
      setAccountMessage("8자리 ~ 20자리 이내로 입력해주세요.");
      return false;
    }

    if(password.search(/₩s/) != -1){
      setVisibleEmailConfirm(true);
      setAccountMessage("비밀번호는 공백없이 입력해주세요.");
      return false;
    }
    if(num < 0 || eng < 0 || spe < 0 ){
      setVisibleEmailConfirm(true);
      setAccountMessage("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
      return false;
    }
    if(password !== password2) {
      setVisibleEmailConfirm(true);
      setAccountMessage('비밀번호를 확인해 주세요.');
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

    if(userNickname.length < 1 ) {
      setVisibleEmailConfirm(true);
      setAccountMessage('닉네임을 확인해 주세요.');
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
                        setVisibleEmailConfirm(true);
                        setAccountMessage(' 로그인이 실패하였습니다. 이메일과 비밀번호를 확인해 주세요.');
                      }
                      else {

                        data.loginTime = (new Date()).getTime();
                        storageService.setItem('brickground-user', JSON.stringify(data));
                        //location.href = "/lianmall/main";
                        props.history.push(MAIN_PATH);
                      }

                    })
      .catch(err => {
                      setVisibleEmailConfirm(true);
                      setAccountMessage('로그인이 실패하였습니다.');
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
        <Row style={{fontFamily: 'RobotoSlab', fontSize: '20px', fontWeight: 'bold', color: '#262d33', opacity: '0.8', textAlign: 'center'}}>
          Shopping with VR
        </Row>
        <Row style={{ marginTop: '30px', padding: '30px', opacity: '0.8', borderRadius: '10px', border: 'solid 1px rgba(0, 0, 0, .2)'}}>
          <Col span={24} style={{marginBottom: '10px'}}>
            <Input
              addonBefore={getLabel('이메일')}
              placeholder="이메일을 입력하세요."
              addonAfter={<Button onClick = {()=>handleCheckUsedEmail()} type='link' style={{padding: '0px', fontSize: '12px'}}>중복확인</Button>}
              style={{height: '40px'}}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Col>
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
              addonBefore={getLabel('비밀번호확인')}
              placeholder=""
              type="password"
              value={password2}
              style={{height: '40px'}}
              onChange={e => setPassword2(e.target.value)}
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
              addonBefore={getLabel('닉네임')}
              placeholder="닉네임을 입력하세요"
              style={{height: '40px'}}
              value={userNickname}
              onChange={e => setUserNickname(e.target.value)}
            />
          </Col>
          <Col span={24}>
            <div style={{color: '#ff0000', fontSize: '12px'}}>
              * 이메일은 중복확인 필수입니다.
            </div>
            <div style={{color: '#ff0000', fontSize: '12px'}}>
              * 비밀번호는 영문,숫자,특수문자 혼합하여 8자리~20자리 이내 입력하세요.
            </div>
          </Col>
          <Col span={24}>
            <Row type='flex' justify='center'>
              <Button type="primary" onClick={handleAccount} style={{ marginTop: '30px', width:'80%', height: '40px', fontSize: '14px',  fontWeight: 800, borderRadius: '10px'}}>
                회원가입
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
          visible={visibleEmailConfirm}
          closable={false}
          title=""
          footer={[
            <Button type="primary" key='confirm' onClick={() => setVisibleEmailConfirm(false)} style={{width: '110px'}}>
              확인
            </Button>,
          ]}
        >
          <div style={{ paddingTop: '20px', margin: 'auto', textAlign: 'center' }} >
            {accountMessage}
          </div>

        </Modal>
        <Modal
          visible={visibleSuccessConfirm}
          closable={false}
          title=""
          footer={[
            <Link key='main' to={MAIN_PATH} >
              <Button type="primary" key='home' onClick={() => setVisibleSuccessConfirm(false)} style={{width: '110px', marginRight: '10px'}}>
                홈으로 가기
              </Button>
            </Link>
          ]}
        >
          <div style={{ paddingTop: '20px', margin: 'auto', textAlign: 'center' }} >
            {accountMessage}
          </div>

        </Modal>
        <Modal
          visible={visibleFailConfirm}
          closable={false}
          title=""
          footer={[
            <Link key='main' to={MAIN_PATH} >
              <Button type="primary" key='home' onClick={() => setVisibleFailConfirm(false)} style={{width: '110px', marginRight: '10px'}}>
                홈으로 가기
              </Button>
            </Link>,
            <Button type="primary" key='confirm' onClick={() => setVisibleFailConfirm(false)} style={{width: '110px'}}>
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
