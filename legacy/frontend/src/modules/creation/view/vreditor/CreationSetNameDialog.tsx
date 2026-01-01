import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { Button, Tabs, Modal, Radio, Row, Col, Card, Empty, Tooltip} from 'antd';
import $ from 'jquery';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, storageService } from 'common';

export const CreationSetNameDialog = (props) => {

  const {visibleCreationSetNameConfirm, onCreationSetNameConfirm, onSetName } = props;

  const [creationSetList, setCreationSetList] = useState<any[]>([]);
  const [setName, setSetName] = useState<string>('45678');
  const [id, setId] = useState<number>(4);

  useEffect(() => {

    setCreationSetList(getDataSource());

  }, []);


  const getDataSource = () => {

    let data;

    if(storageService.getItem('brickground-user') != undefined) {
      var user = JSON.parse( storageService.getItem('brickground-user') as string );
      if(user != undefined && user.role > 8) {
        data = [
          {id:0, coverImage: './images/brickground/product/2000471.jpg', setNameTitle :'BricQ 모션 에센셜 개인 학습 키트' , setName : '2000471' },
          {id:1, coverImage: './images/brickground/product/2000470.jpg', setNameTitle :'BricQ 모션 프라임 개인 학습 키트' , setName : '2000470' },
          {id:2, coverImage: './images/brickground/product/45401.jpg', setNameTitle :'BricQ 모션 에센셜 세트' , setName : '45401' },
          {id:3, coverImage: './images/brickground/product/45400.jpg', setNameTitle :'BricQ 모션 프라임 세트' , setName : '45400' },
          {id:4, coverImage: './images/brickground/product/45678.jpg', setNameTitle :'스파이크 프라임 코어 세트' , setName : '45678' },
          {id:5, coverImage: './images/brickground/product/51515.jpg', setNameTitle :'로봇 인벤터 세트' , setName : '51515' },
          {id:6, coverImage: './images/brickground/product/45544.jpg', setNameTitle :'마인드스톰 EV3' , setName : '45544' },
          {id:7, coverImage: './images/brickground/product/45678_45680.jpg', setNameTitle :'스파이크 프라임 코어 + 확장 세트' , setName : '45678,45680' },
          {id:8, coverImage: './images/brickground/product/45544_45560.jpg', setNameTitle :'마인드스톰 EV3 코어 + 확장 세트' , setName : '45544,45560' },
          {id:9, coverImage: './images/brickground/product/41314.jpg', setNameTitle :'스테파니 하우스' , setName : '41314' },
          {id:10, coverImage: './images/brickground/product/31199.jpg', setNameTitle :'아이언맨' , setName : '31199' }
        ];
      }
    }
    else {

      data = [
        {id:0, coverImage: './images/brickground/product/2000471.jpg', setNameTitle :'BricQ 모션 에센셜 개인 학습 키트' , setName : '2000471' },
        {id:1, coverImage: './images/brickground/product/2000470.jpg', setNameTitle :'BricQ 모션 프라임 개인 학습 키트' , setName : '2000470' },
        {id:2, coverImage: './images/brickground/product/45401.jpg', setNameTitle :'BricQ 모션 에센셜 세트' , setName : '45401' },
        {id:3, coverImage: './images/brickground/product/45400.jpg', setNameTitle :'BricQ 모션 프라임 세트' , setName : '45400' },
        {id:4, coverImage: './images/brickground/product/45678.jpg', setNameTitle :'스파이크 프라임 코어 세트' , setName : '45678' },
        {id:5, coverImage: './images/brickground/product/51515.jpg', setNameTitle :'로봇 인벤터 세트' , setName : '51515' },
        {id:6, coverImage: './images/brickground/product/45544.jpg', setNameTitle :'마인드스톰 EV3' , setName : '45544' },
        {id:7, coverImage: './images/brickground/product/45678_45680.jpg', setNameTitle :'스파이크 프라임 코어 + 확장 세트' , setName : '45678,45680' },
        {id:8, coverImage: './images/brickground/product/45544_45560.jpg', setNameTitle :'마인드스톰 EV3 코어 + 확장 세트' , setName : '45544,45560' },
        {id:9, coverImage: './images/brickground/product/41314.jpg', setNameTitle :'스테파니 하우스' , setName : '41314' }
      ];

    }

    console.log(data);

    return data;
  }


/*
  const genTitle = (legoSet) => {

    var setName = "";

    if(setNames != null) {

      var names = setNames.split(',');

      setName += getSetName(Number(names[0]));

      if(names.length > 1)
        setName += " + " + getSetName(Number(names[1]));
    }

    return (<div style={{fontSize: '12px', fontWeight: 400}}>
              <div>
                <span style={{fontSize: '14px', fontWeight: 600}} > {legoSet.setNameTitle} </span>
              </div>


            </div>);

  };


   return (
     <Modal
         visible={visibleImageEditorConfirm}
         closable={false}
         title="이미지 편집기"
         width='800px'
         centered
         footer={[

                   <Button key="lego_education_set_confirm" type='primary' onClick={() =>{setCoverImage(); onImageEditorConfirm(false);} } >
                     선택
                   </Button>,
                   <Button key="lego_education_set_cancel" type='primary' onClick={() =>{onImageEditorConfirm(false);} } >
                     취소
                   </Button>,
                 ]}
       >

       <Col span={24}>
         <Card style={{border: '0px', margin: '2px'}} extra={genAddExtra()}>
           {legoSetList ? (
             legoSetList.map(legoSet => (
               <Card.Grid className='card-grid'  style={cardGridStyle} key={legoSet.id}>
                 <div className='content'>
                   <Card
                     style={{ width: '100%', height: '100%'}}
                     cover={
                       <div>
                         <img
                           alt={legoSet.setNameTitle}
                           src={legoSet.coverImage}
                           style={{ width: '97%', height: '100%', margin: '5px', borderRadius: '8px 8px 0 0' }}
                         />
                       </div>
                     }

                     hoverable={false}
                   >
                     <Tooltip placement="top" visible={false} title={legoSet.setNameTitle}>
                       <Meta title={genTitle(legoSet)} style={{ marginTop: '20px', marginBottom: '2px', textAlign: 'center'}} />
                     </Tooltip>

                   </Card>
                 </div>
               </Card.Grid>
             ))
           ) : (
             <Empty />
           )}
         </Card>
       </Col>

    </Modal>
  );
*/

const handleSetName = (creationSet) => {

  console.log(creationSet.setName + ", " + creationSet.setNameTitle);
  onSetName(creationSet.setName, creationSet.setNameTitle);

};


const genTitle = (creationSet) => {

  return (<Radio value={creationSet.id}> {creationSet.setNameTitle} </Radio>);

};

  return (
    <Modal
        visible={visibleCreationSetNameConfirm}
        closable={false}
        title="창작품 구성품 선택하기"
        width='1100px'
        centered
        footer={[
                  <Button key="lego_education_set_cancel" type='primary' onClick={() =>{onCreationSetNameConfirm(false);} } >
                    취소
                  </Button>,
                ]}
      >

      <Col span={24}>
        <Card style={{border: '0px', margin: '2px'}}>
          <Radio.Group value={id} onChange={e=>setId(e.target.value)}>
            {creationSetList ? (
              creationSetList.map(creationSet => (
                <Card.Grid className='card-grid'  style={{width:'33.3%'}} key={creationSet.id}>

                    <Card
                      style={{ width: '100%', height: '100%'}}
                      cover={
                        <div>
                          <span onClick={()=>handleSetName(creationSet)} style={{cursor: 'pointer'}}>
                            <img
                              alt={creationSet.setNameTitle}
                              src={creationSet.coverImage}
                              style={{ width: '97%', height: '100%', margin: '5px', borderRadius: '8px 8px 0 0' }}
                            />
                          </span>
                        </div>
                      }

                      hoverable={false}
                    >
                      <Tooltip placement="top" visible={false} title={creationSet.setNameTitle}>
                        <Card.Meta title={creationSet.setNameTitle} style={{ marginTop: '10px', marginBottom: '2px', textAlign: 'center'}} />
                      </Tooltip>

                    </Card>

                </Card.Grid>
              ))
            ) : (
              <Empty />
            )}
          </Radio.Group>
        </Card>
      </Col>

   </Modal>
  );
};
