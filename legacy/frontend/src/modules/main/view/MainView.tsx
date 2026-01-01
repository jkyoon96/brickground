import React, { Component, useEffect, useState, useCallback, CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import { Link, NavLink, useLocation, useHistory } from 'react-router-dom';
import { Icon, Select, Row, Col, Menu, Carousel, Modal, Button } from 'antd';
import $ from 'jquery';
import queryString from 'query-string';

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
        SEARCH_PATH,
        HELP_MAIN_PATH,
      storageService } from 'common';

import { ManualBookDialog, ProgramBookDialog } from 'modules/vrmall/view';
import { VrMallCardList, ManualCardList, ProductCardList, ProductSetCardList } from '.'

export const MainView = (props) => {


  const [vrMallList, setVrMallList] = useState<any[]>([]);
  const [productList, setProductList] = useState<any[]>([]);
  const [manualList, setManualList] = useState<any[]>([]);
  const [autoplay, setAutoplay] = useState<boolean>(false);
  const [carousePage, setCarousePage] = useState<number>(0);
  const [bannerSize, setBannerSize] = useState<string>("40%");

  const [visibleManualConfirm, setVisibleManualConfirm] = useState<boolean>(false);
  const [visibleProgramConfirm, setVisibleProgramConfirm] = useState<boolean>(false);
  const [visibleBannerConfirm, setVisibleBannerConfirm] = useState<boolean>(false);

  const history = useHistory();

  useEffect(() => {

    $('#MainHeader').show();
    $('#MainFooter').show();

    /*
    if(storageService.getItem('brickground-banner') != undefined) {

      var banner = JSON.parse( storageService.getItem('brickground-banner') as string );
      var currentTime = (new Date()).getTime();
      if(currentTime - banner.checkTime > 3600000) {
        setVisibleBannerConfirm(true);
      }
    }
    else {
      setVisibleBannerConfirm(true);
    }
    */



    window.addEventListener( 'orientationchange',onOrientationChange, false );

  }, []);


  const onOrientationChange = () => {

    var filter = "win16|win32|win64|mac|macintel";
    if(navigator.platform) {
      if(filter.indexOf(navigator.platform.toLowerCase()) < 0) {
        if (window.orientation == 0)
          setBannerSize("80%");
        else
          setBannerSize("40%");
      }
    }

	}

  const getBannerSize = () => {

    var filter = "win16|win32|win64|mac|macintel";
    var size = "40%";

    if(navigator.platform) {
      if(filter.indexOf(navigator.platform.toLowerCase()) < 0) {
        if (window.orientation == 0)
          size = "80%";
        else
          size = "40%";
      }
    }

    return size;

	}

  const cardStyle: CSSProperties = {padding: '15px'};
  const imageStyle: CSSProperties = {width: '100%', cursor:'pointer', border: '0px solid rgba(170, 170, 170, 1)', borderRadius: '0px' };


   return (
    <>
      <Row type='flex' justify='center' style={{marginTop: '20px', marginLeft: '20px', marginRight: '20px'}} >
        <Col lg={8} md={8} xs={24} style={cardStyle}  >
          <img src="images/content_product_set.jpg" style={imageStyle} onClick={e=>history.push(PRODUCT_SET_LIST_PATH)} />
        </Col>
        <Col lg={8} md={8} xs={24} style={cardStyle}  >
          <img src="images/content_product_package.jpg" style={imageStyle} onClick={e=>history.push(PRODUCT_PACKAGE_LIST_PATH)} />
        </Col>
        <Col lg={8} md={8} xs={24} style={cardStyle}  >
          <img src="images/content_product_frame.jpg" style={imageStyle} onClick={e=>history.push(PRODUCT_SET_LIST_PATH)} />
        </Col>
      </Row>
      <Row type='flex' justify='center' style={{marginLeft: '20px', marginRight: '20px', marginBottom: '30px'}} >
        <Col lg={8} md={8} xs={24} style={cardStyle}  >
          <img src="images/content_creation_expert.jpg" style={imageStyle} onClick={e=>history.push(DOTARTS_PATH + '?categoryId=201')} />
        </Col>
        <Col lg={8} md={8} xs={24} style={cardStyle}  >
          <img src="images/content_creation_general.jpg" style={imageStyle} onClick={e=>history.push(DOTARTS_PATH + '?categoryId=101')} />
        </Col>
        <Col lg={8} md={8} xs={24} style={cardStyle}  >
          <img src="images/content_vr_manual.jpg" style={imageStyle} onClick={e=>history.push(CREATIONS_PATH)} />
        </Col>
      </Row>

      <ManualBookDialog
          vrMallId={0}
          visibleManualConfirm={visibleManualConfirm}
          manualData={4}
          handleManualConfirm={(value)=>{setVisibleManualConfirm(value)}}
        />

    </>
  );

};
