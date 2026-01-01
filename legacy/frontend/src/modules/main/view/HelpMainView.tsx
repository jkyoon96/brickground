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
        VR_MALLS_PATH,
        DOTARTS_PATH,
        MANUALS_LIST_PATH,
        SEARCH_PATH,
      storageService } from 'common';

import { InfoModal } from 'components';
import { ManualBookDialog, ProgramBookDialog } from 'modules/vrmall/view';
import { VrMallCardList, ManualCardList, ProductCardList, ProductSetCardList } from '.';

export const HelpMainView = (props) => {



  const [vrMallList, setVrMallList] = useState<any[]>([]);
  const [productList, setProductList] = useState<any[]>([]);
  const [manualList, setManualList] = useState<any[]>([]);
  const [autoplay, setAutoplay] = useState<boolean>(false);
  const [carousePage, setCarousePage] = useState<number>(0);
  const [bannerSize, setBannerSize] = useState<string>("40%");

  const [coord1, setCoord1] = useState<string>("384,258,75");
  const [coord2, setCoord2] = useState<string>("928,258,75");
  const [coord3, setCoord3] = useState<string>("219,746,75");
  const [coord4, setCoord4] = useState<string>("1077,746,75");
  const [coord5, setCoord5] = useState<string>("655,1060,75");

  const [visibleManualConfirm, setVisibleManualConfirm] = useState<boolean>(false);
  const [visibleProgramConfirm, setVisibleProgramConfirm] = useState<boolean>(false);
  const [visibleBannerConfirm, setVisibleBannerConfirm] = useState<boolean>(false);

  const history = useHistory();


  useEffect(() => {

    $('#MainHeader').show();
    $('#MainFooter').show();

    $('#mainHelp').on("click", onDocumentMouseClick);

    window.addEventListener( 'load',onWindowResize, false );
    window.addEventListener( 'resize',onWindowResize, false );

  }, []);


  const onWindowResize = () => {

    let maxWidth = 1320;
    let resizeRatio = $('#mainHelp').width()/maxWidth;

    console.log('sizeRatio : ' + resizeRatio);

    const c1 = "384,258,75";
    const c2 = "928,258,75";
    const c3 = "219,746,75";
    const c4 = "1077,746,75";
    const c5 = "655,1060,75";

    setCoord1(getCoords(c1, resizeRatio));
    setCoord2(getCoords(c2, resizeRatio));
    setCoord3(getCoords(c3, resizeRatio));
    setCoord4(getCoords(c4, resizeRatio));
    setCoord5(getCoords(c5, resizeRatio));

	}

  const getCoords = (coord, ratio) => {

    const coords = coord.split(',');

    let result = "";

    coords.forEach(data => {result += Math.floor((parseInt(data) * ratio)).toString() + ","});

    console.log("result coord : " + result.substring(0, result.length - 1));

    return result;

  }


  const onDocumentMouseClick = (event) => {

    console.log("offsetX : " + event.offsetX + " , offsetY : " + event.offsetY);

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

  const cardStyle: CSSProperties = {padding: '15px' };
  const imageStyle: CSSProperties = {width: '100%', cursor:'pointer', border: '1px solid rgba(170, 170, 170, 1)', borderRadius: '25px' };

/*
   return (
    <>
      <Row type='flex' justify='center' style={{marginTop: '50px', marginBottom: '50px'}} >
        <Col span={24} id='mapContainer'>
          <Row type='flex' justify='center' style={{width: '100%'}}>
            <div>
              <img id='mainHelp' src="/images/brickground/front/manual_main.jpg" style={{width: '1280px'}} alt="" useMap="#HelpArea" />
              <map id="HelpArea" name="HelpArea">
                <area alt="레고VR조립 사용설명서" title=""  shape="circle" coords="384,258,75" onClick={()=>setVisibleManualConfirm(true)} style={{outline: 'none', cursor:'pointer'}}  />
                <area alt="브릭아트 사용설명서" title=""   shape="circle" coords="928,258,75" onClick={()=>setVisibleManualConfirm(true)} style={{outline: 'none', cursor:'pointer'}}  />
                <area alt="미니홈 사용설명서" title=""   shape="circle" coords="219,746,75" onClick={()=>setVisibleManualConfirm(true)} style={{outline: 'none', cursor:'pointer'}}  />
                <area alt="브릭뮤직 사용설명서" title=""   shape="circle" coords="1077,746,75" onClick={()=>setVisibleManualConfirm(true)} style={{outline: 'none', cursor:'pointer'}}  />
                <area alt="브릭광장 사용설명서" title=""   shape="circle" coords="655,1060,75" onClick={()=>setVisibleManualConfirm(true)} style={{outline: 'none', cursor:'pointer'}}  />
              </map>
            </div>
          </Row>
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
*/

const noticeInfo = (content) => {

  let message = content + ' 사용설명서를 업데이트중입니다.';

  window.speechSynthesis.speak(new SpeechSynthesisUtterance(message));

  InfoModal('info', '알림', message);

}

  return (
   <>
     <Row type='flex' justify='center' style={{marginTop: '50px', marginBottom: '50px'}} >
       <Col span={24} id='mapContainer'>
         <Row type='flex' justify='center' style={{width: '100%'}}>
           <div>
             <img id='mainHelp' src="/images/brickground/front/manual_main.jpg" style={{width: '100%'}} alt="" useMap="#HelpArea" />
             <map id="HelpArea" name="HelpArea">
               <area alt="브릭아트 사용설명서" title=""   shape="circle" coords={coord2} onClick={()=>noticeInfo('브릭아트')} style={{outline: 'none', cursor:'pointer'}}  />
             </map>
           </div>
         </Row>
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
