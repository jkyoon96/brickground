import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Button, Divider, Tabs, Menu } from 'antd';
import $ from 'jquery';

import { storageService } from 'common';
import { NoticeTable, FaqTable, QnaTable } from '.';

export const HelpCenterView = (props) => {

  //var currentMenu ='notice';
  //var currentMenu =props.match.params.service;

  const [currentMenu, setCurrentMenu] = useState<string>('notice');
  const [userId, setUserId] = useState<number>(-1);
  const [userRole, setUserRole] = useState<number>(0);

  useEffect(() => {

    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined) {
          setUserId(user.userId);
          setUserRole(user.role);
        }
    }

    setCurrentMenu(props.match.params.service);

   }, []);

  useEffect(() => {
    changeMenu();

   }, [currentMenu]);


  const handleMenuClick = menu => {
    setCurrentMenu(menu.key);
  };

  const changeMenu = () => {

    $("#noticeTable").hide();
    $("#faqTable").hide();
    $("#qnaTable").hide();

    if(currentMenu == 'notice')
      $("#noticeTable").show();
    else if(currentMenu == 'faq')
      $("#faqTable").show();
    else if(currentMenu == 'qna')
      $("#qnaTable").show();
  }

  return (
    <>
      <div className='help-container' style={{marginTop: '20px'}}>
        <Row type="flex" justify="space-around">
          <Col xs={24} style={{ backgroundColor: '#ffffff', color: '#e6e0e0', paddingLeft: '10px'}}>
            <Menu mode="horizontal" onClick={handleMenuClick} >
              <Menu.Item key="notice" style={{fontSize: '14px', fontWeight: 600 }}>공지사항
              </Menu.Item>
              <Menu.Item key="faq" style={{fontSize: '14px', fontWeight: 600 }}>FAQ
              </Menu.Item>
              <Menu.Item key="qna" style={{fontSize: '14px', fontWeight: 600 }}>문의하기
              </Menu.Item>
            </Menu>,
          </Col>
          <Col xs={24} >
            <div>
              <Row style={{ marginBottom: 50}}>
                <Col span={24} style={{paddingLeft: '20px'}}>
                  <div id='noticeTable'>
                    <NoticeTable userId={userId} userRole={userRole} role/>
                  </div>
                  <div  id='faqTable'>
                    <FaqTable userId={userId} userRole={userRole} />
                  </div>
                  <div id='qnaTable'>
                    <QnaTable currentMenu={currentMenu} userId={userId} />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>

    </>
  );
};
