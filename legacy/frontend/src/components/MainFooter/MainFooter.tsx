import React, {CSSProperties} from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Divider } from 'antd';
import { TERMS_OF_SERVICE_PATH ,
        PRIVACY_PATH
      } from 'common';

/**
 * @description NomalLayout에서 사용되는 메인 푸터 컴포넌트
 */
export const MainFooter = () => {

  const getCompanyInfo = () => {
    var filter = "win16|win32|win64|mac|macintel";
    if(navigator.platform) {
      if(filter.indexOf(navigator.platform.toLowerCase()) < 0) {

        return (<div style={{paddingLeft: '20px'}}>
                  강원도 춘천시 동내면 동내로 102-6, 나동 101호<br/>
                  (주)소풍앤컴퍼니 / 대표 윤정관<br/>
                  통신판매업 신고번호 : 제 2017-서울광진-0956호 <br/>
                  사업자등록증 : 199-40-001557 <br/>
                  개인 정보책임자 : 윤정관<br/>
                  대표번호 : 070-4272-0405 <br/>
                  메일 help@gosopoong.co.kr
                </div>
              );

      }
    }

    return (<div style={{marginTop: '10px', paddingBottom: '30px', paddingTop: '30px'}}>
              강원도 춘천시 동내면 동내로 102-6, 나동 101호 (주)소풍앤컴퍼니 / 대표 윤정관<br/>
              통신판매업 신고번호 : 제 2017-서울광진-0956호 / 사업자등록증 : 199-40-001557 / 개인 정보책임자 : 윤정관<br/>
              대표번호 : 070-4272-0405 /  메일 help@gosopoong.co.kr
            </div>
          );
  }

  return (
    <>
      <div className='footer-container'>
        <Divider />
        <div className='footer-menu' >
          <span> </span>
          <span> | </span>
          <span><NavLink to={PRIVACY_PATH}> 개인정보처리방침 </NavLink></span>
          <span> | </span>
          <span><NavLink to={TERMS_OF_SERVICE_PATH}> 이용약관</NavLink></span>
          <span> | </span>
          <span>  </span>
        </div>
        <div className='company-area'>

            <Row className='company-info'>
              <Col md={8} xs={0}>
              <img className='company-logo'  src="images/logo004.png" />
              </Col>
              <Col md={16} xs={24} className='company-description'>
                { getCompanyInfo() }
              </Col>

            </Row>

        </div>
      </div>
    </>
  );
};
