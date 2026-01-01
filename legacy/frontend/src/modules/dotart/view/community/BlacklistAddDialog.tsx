import React, { useState, useCallback, FC, useEffect } from 'react';
import { Button, Table, InputNumber, Input, Tag, Row, Col, Pagination, Select, Modal, Radio, Divider } from 'antd';
import $ from 'jquery';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, storageService  } from 'common';


export const BlacklistAddDialog= (props) => {

  const { userId, userName, creation, visibleAddBlacklistConfirm, handleCancelBlacklistConfirm } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [blacklistType, setBlacklistType] = useState<number>(101);
  const [blacklistState, setBlacklitState] = useState<number>(1);
  const [description, setDescription] = useState<string>('');


  useEffect(() => {

    $("#coverImage2").hide();

  }, []);

  const createBlacklist = () => {

    let url = SOPOONG_URL + SHOP_URL + '/creationBlacklist.do';

    let params = {
                  creationId: creation.creationId,
                  creationName: creation.creationName,
                  reporterId: userId,
                  reporterName: userName,
                  userId: creation.userId,
                  blacklistType: blacklistType,
                  blacklistState: blacklistState,
                  description: description
                };

    fetch( url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(params)
    } )
      .then(response => response.json())
      .then(data => {
                      console.log(data);
                      handleCancelBlacklistConfirm(false);
                    })
      .catch(err => console.log(err));

  }



  const { Option } = Select;
  const { TextArea } = Input;

  return (
      <Modal
        visible={visibleAddBlacklistConfirm}
        closable={false}
        title="창작품 신고"
        width='800px'
        footer={[
                  <Button key="save_back" type='primary' onClick={() => { handleCancelBlacklistConfirm(false);} } >
                    취소하기
                  </Button>,
                  <Button key="save_submit" type='primary' onClick={e => {createBlacklist(); } } >
                    신고하기
                  </Button>,
                ]}
      >
        <Row type='flex' justify='center'>
          <Col lg={24} md={24} xs={24}  style={{ margin: '20px', padding: '20px', width:'95%', border: 'solid 1px rgba(0, 0, 0, 0.4) ', borderRadius: '10px'}}>

            <Row type='flex' align='middle' justify='center' style={{marginTop: '10px'}} >
              <Col>
                창작품 신고는 소풍앤에듀 이용수칙에 맞지 않는 작품을 신고하는 기능이며, 반대의견을 표시하는 것이 아닙니다.
                회원님의 관심과 신고가 건전하고 올바른 소풍앤에듀 문화를 만듭니다.
                허위 신고의 경우 신고자가 제재받을 수 있음을 유념해주세요.
              </Col>
            </Row>
            <Divider />
            <Row type='flex' align='middle' justify='center' style={{marginTop: '10px'}} >
              <Col span={4} style={{height: '20px'}}>
                창작품명
              </Col>
              <Col span={20} style={{backgroundColor: '#ffffff', height: '20px'}}>
                {creation.creationName}
              </Col>
            </Row>
            <Row type='flex' align='middle' justify='center' style={{marginTop: '10px'}}>
              <Col span={4} style={{height: '20px'}}>
                작성자
              </Col>
              <Col span={20} style={{backgroundColor: '#ffffff', height: '20px'}}>
                {userName}
              </Col>
            </Row>
            <Row type='flex' align='middle' justify='center' style={{marginTop: '10px'}} >
              <Col span={4} style={{height: '40px'}}>
                신고사유
              </Col>
              <Col span={20} style={{backgroundColor: '#ffffff', height: '46px'}}>
                <Radio.Group defaultValue={blacklistType} onChange={event => setBlacklistType(event.target.value)}>
                  <Radio value={101}>영리목적/홍보성</Radio>
                  <Radio value={102}>개인정보노출</Radio>
                  <Radio value={103}>불법정보</Radio>
                  <Radio value={104}>음란성/선정성</Radio>
                  <Radio value={105}>욕설/인신공격</Radio>
                  <Radio value={106}>아이디/DB거래</Radio>
                  <Radio value={107}>같은 내용 반복(도배)</Radio>
                  <Radio value={108}>기타</Radio>
                </Radio.Group>
              </Col>
            </Row>

            <Row type='flex' align='middle' justify='center' >
              <Col span={4} >
                상세내용(선택)
              </Col>
              <Col span={20} style={{height: '40px'}}>
              </Col>
            </Row>
            <Row type='flex' align='middle' justify='center' style={{marginTop: '0px'}}>
              <Col span={24} style={{backgroundColor: '#ffffff'}}>
                <TextArea
                          maxLength={200}
                          style={{ height: 60 }}
                          onChange={event => setDescription(event.target.value)}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    );

}
