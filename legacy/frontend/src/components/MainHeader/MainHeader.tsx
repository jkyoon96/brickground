import React, { useState, useEffect, CSSProperties } from 'react';
import { Link, NavLink, useLocation, useHistory } from 'react-router-dom';
import { Layout, Row, Col, Typography, Button, Divider, Icon, Menu, Dropdown } from 'antd';
import $ from 'jquery';

import { SOPOONG_URL,
        SHOP_URL,
        LOGIN_PATH,
        ACCOUNT_PATH,
        MY_VR_MALLS_PATH,
        MY_PAGE_PATH,
        HELP_PATH,
        CART_PATH,
        MAIN_PATH,
        PRODUCTS_LIST_PATH,
        PRODUCT_SET_LIST_PATH,
        PRODUCT_PACKAGE_LIST_PATH,
        DOTARTS_PATH,
        MANUALS_LIST_PATH,
        CREATIONS_PATH,
        SCHOOL_DOTARTS_PATH,
        SEARCH_PATH,
        HELP_MAIN_PATH,
      storageService } from 'common';
import { NavLinkIconButton } from 'components/NavLinkIconButton';
import { CompleteSearch } from '.';
import { ManualBookDialog, ProgramBookDialog } from 'modules/vrmall/view';

/**
 * @description NomalLayout에서 사용하는 메인 헤더 컴포넌트
 */
export const MainHeader = (props) => {

  const [userName, setUserName] = useState<string>('');
  const [userNickname, setUserNickname] = useState<string>('');
  const [point, setPoint] = useState<number>(0);

  const [visibleManualConfirm, setVisibleManualConfirm] = useState<boolean>(false);
  const [visibleProgramConfirm, setVisibleProgramConfirm] = useState<boolean>(false);

  const [manualId, setManualId] = useState<number>(0);
  const [manualData, setManualData] = useState<number>(4);

  const history = useHistory();

  useEffect(() => {

    console.log('currentTime : ' + (new Date()).getTime() );

    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined) {

          var currentTime = (new Date()).getTime();

          /*
          if(currentTime - user.loginTime > 3600000) {
            storageService.removeItem('brickground-user');
            return;
          }
          */

          setUserName(user.userName);
          setUserNickname(user.userNickname);
          setPoint(user.point);

          $('#user').show();
          $('#logout').show();
          $('#mymanual').show();
          $('#mypage').show();

          if(user.role > 8){
            $('#minihome').show();
          }

          $('#login').hide();
          $('#account').hide();
        }

    }
  }, [props]);


  const logout = (e) => {
    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined) {

          var logoutUrl = SOPOONG_URL + SHOP_URL + '/logout.do?' + 'sessionId=' + user.sessionId;

          fetch(logoutUrl)
            .then(res => res.json())
            .then(json => {console.log(json);})
            .catch(err => console.log(err));
        }

        storageService.removeItem('brickground-user');
        storageService.removeItem('brickground-vr-cart');

        $('#user').hide();
        $('#logout').hide();
        $('#mymanual').hide();
        $('#mypage').hide();

        $('#login').show();
        $('#account').show();

    }

  };


  const { Header, Footer, Sider, Content } = Layout;

  const { Title, Text } = Typography;
  const location = useLocation();

  const isCartedPage: boolean = location.pathname === CART_PATH;

  const style = { padding: '2px 0', fontSize: '20px', fontWeight: 600};
  const titleStyle = { color: '#fff', verticalAlign: 'center', marginTop: '7px' };

  const headerTopStyle: CSSProperties = { width: '100%', height: '25px', border: 'solid 0px #797777', backgroundColor: '#dce2dd', fontSize: '12px', paddingTop: '5px'};
  const headerMiddleStyle: CSSProperties = { width: '100%', height: '120px', border: 'solid 0px #797777'   };
  const headerBottomStyle: CSSProperties = { width: '100%', height: '40px', border: 'solid 0px #797777' };

  const dataSource = ['12345', '23456', '34567'];

  const { SubMenu } = Menu;

  return (
    <>
      <div className='header-container'>
        <Row type='flex' justify='space-between' style={headerTopStyle}>
          <Col span={6} style={{ textAlign: 'left', paddingLeft: '10px'  }}>
            <NavLink to={`${HELP_PATH}/notice`}  style={{ color: '#707070' }} >고객센터</NavLink>
          </Col>
          <Col span={18} style={{ textAlign: 'right', paddingRight: '10px' }}>
            <span id='user' style={{display: 'none'}}>{userName}&nbsp;({point}p)&nbsp;|&nbsp;</span>
            <span id='logout' style={{display: 'none'}} ><NavLink to={SHOP_URL} onClick={logout} style={{ color: '#707070' }} >로그아웃</NavLink>&nbsp;|&nbsp;</span>
            <span id='login'><NavLink to={LOGIN_PATH} style={{ color: '#707070' }} >로그인</NavLink>&nbsp;|&nbsp;</span>
            <span id='account'><NavLink to={ACCOUNT_PATH} style={{ color: '#707070' }} >회원가입</NavLink>&nbsp;|&nbsp;</span>
            <span id='mypage' style={{display: 'none'}}><NavLink to={MY_PAGE_PATH} style={{ color: '#707070' }} >마이페이지</NavLink>&nbsp;|&nbsp;</span>
            <span id='cart'><NavLink to={CART_PATH} style={{ color: '#707070' }} >장바구니</NavLink></span>
          </Col>
        </Row>

        <Row type='flex' justify='start' style={{width:'100%', marginTop: '10px', height: '80px'}}>
          <Col span={4} offset={1} style={{marginTop: '20px', marginBottom : '0px'}}>
            <img src="images/logo004.png" style={{height: '60%', marginBottom : '0px', cursor:'pointer'}} onClick={e=>history.push(MAIN_PATH)} />
          </Col>
        </Row>

        <Row type='flex' justify='end' style={{width: '100%', height: '30px'}}>
          <Col lg={4} md={0} xs={0}>
            <img src="images/discord001.png" style={{height: '25%', cursor: 'pointer', marginRight: '10px'}} onClick={e=>{return window.open("https://discord.gg/JsxTDqrMSv")}} />
            <img src="images/insta002.png" style={{height: '25%', cursor: 'pointer', marginRight: '10px'}} onClick={e=>{return window.open("https://www.instagram.com/sopoong_edu")}} />
            <img src="images/youtube003.png" style={{height: '25%', cursor: 'pointer', marginRight: '10px'}} onClick={e=>{return window.open("https://www.youtube.com/channel/UCG7WqOL-VUvJRW_0iMT19Cg")}} />
          </Col>
          <Col lg={0} md={4} xs={0}>
            <img src="images/insta002.png" style={{height: '25%', cursor: 'pointer', marginRight: '10px'}} onClick={e=>{return window.open("https://www.instagram.com/sopoong_edu")}} />
            <img src="images/youtube003.png" style={{height: '25%', cursor: 'pointer', marginRight: '10px'}} onClick={e=>{return window.open("https://www.youtube.com/channel/UCG7WqOL-VUvJRW_0iMT19Cg")}} />
          </Col>
          <Col lg={0} md={0} xs={4}>
            <img src="images/insta002.png" style={{height: '25%', cursor: 'pointer', marginRight: '10px'}} onClick={e=>{return window.open("https://www.instagram.com/sopoong_edu")}} />
            <img src="images/youtube003.png" style={{height: '25%', cursor: 'pointer', marginRight: '10px'}} onClick={e=>{return window.open("https://www.youtube.com/channel/UCG7WqOL-VUvJRW_0iMT19Cg")}} />
          </Col>
        </Row>

        <Divider/>
        <Row type='flex' justify='space-between' style={{width:'100%', marginTop: '10px', marginBottom: '11px', marginLeft: '70px', marginRight: '30px'}}>
          <Col lg={3} md={3} xs={0} >
            <img src="images/menu1_product_set.png" style={{width: '75%', cursor:'pointer'}} onClick={e=>history.push(PRODUCT_SET_LIST_PATH)} />
          </Col>
          <Col lg={3} md={3} xs={0} >
            <img src="images/menu1_product_package.png" style={{width: '75%', cursor:'pointer'}} onClick={e=>history.push(PRODUCT_PACKAGE_LIST_PATH)} />
          </Col>
          <Col lg={3} md={3} xs={0} >
            <img src="images/menu1_creation_expert.png" style={{width: '75%', cursor:'pointer'}} onClick={e=>history.push(DOTARTS_PATH + '?categoryId=201')} />
          </Col>
          <Col lg={3} md={3} xs={0} >
            <img src="images/menu1_creation_general.png" style={{width: '75%', cursor:'pointer'}} onClick={e=>history.push(DOTARTS_PATH + '?categoryId=101')} />
          </Col>
          <Col lg={3} md={3} xs={0} >
            <img src="images/menu1_vr_menual.png" style={{width: '75%', cursor:'pointer'}} onClick={e=>history.push(CREATIONS_PATH)} />
          </Col>
          <Col lg={3} md={3} xs={0} >
            <img src="images/menu1_help.png" style={{width: '75%', cursor:'pointer'}} onClick={()=>{setManualId(1); setManualData(20);setVisibleManualConfirm(true);}} />
          </Col>
          <Col lg={3} md={3} xs={0} >
            <img src="images/menu1_creation_school.png" style={{width: '75%', cursor:'pointer'}} onClick={e=>history.push(SCHOOL_DOTARTS_PATH + '?categoryId=301')} />
          </Col>
        </Row>
        <Divider/>
      </div>

      <ManualBookDialog
         vrMallId={manualId}
         visibleManualConfirm={visibleManualConfirm}
         manualData={manualData}
         handleManualConfirm={(value)=>{setVisibleManualConfirm(value)}}
       />
    </>
  );

};
