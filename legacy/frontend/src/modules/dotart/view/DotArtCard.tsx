import React, { FC, useCallback, useState, useEffect } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Card, Icon, Typography, Tooltip, Row, Col, Button } from 'antd';
import $ from 'jquery';
import { VrMallModel } from 'modules/main/model';
import { SOPOONG_URL, SHOP_URL, DOTART_VIEW_PATH, DOTART_INFO_PATH, DOTART_COMMUNITY_PATH, storageService } from 'common';
import { ConfirmModal } from 'components';


export const DotArtCard = props => {
  const { Meta } = Card;
  const { onRefresh } = props;
  const { creationId, creationName, coverImage, viewCount, likeCount, commentCount, cloneCount, description, categoryId, userId, userName, setNames, sizeName } = props.creation;
  const history = useHistory();


  const getSetName = (name) => {

    var setName = "";

    if(name == 2000471)
      setName = "BricQ 모션 에센셜 개인 학습 키트";
    else if(name == 2000471)
      setName = "BricQ 모션 프라임 개인 학습 키트";
    else if(name == 45401)
      setName = "BricQ 모션 에센셜 세트";
    else if(name == 45400)
      setName = "BricQ 모션 프라임 세트";
    else if(name == 45678)
      setName = "스파이크 프라임 코어 세트";
    else if(name == 51515)
      setName = "로봇 인벤터 세트";
    else if(name == 45544)
      setName = "마인드스톰 EV3";
    else if(name == 45680)
      setName = "프라임 확장세트";
    else if(name == 45680)
      setName = "EV3 확장세트";

    return setName;

  }

  const genCoverLinkMenu = () => {

    return (<Link to={`${DOTART_COMMUNITY_PATH }/${creationId}`}>
              <img
                alt={creationName}
                src={coverImage}
                style={{ width: '97%', height: '100%', margin: '5px', borderRadius: '8px 8px 0 0' }}
              />
            </Link>);


  };


  const genTitle = () => {

    var setName = "";

    if(setNames != null) {

      var names = setNames.split(',');

      setName += getSetName(Number(names[0]));

      if(names.length > 1)
        setName += " + " + getSetName(Number(names[1]));
    }

    return (<div style={{fontSize: '12px', fontWeight: 400}}>
              <div>
                <span style={{fontSize: '14px', fontWeight: 600}} > {creationName} </span>
              </div>
              <div>
                <span style={{fontSize: '12px', marginTop: '5px'}} > {sizeName} </span>
              </div>
              <div style={{marginTop:'5px'}}>
                <Icon
                  type="read"
                  style={{ width: '18px', height:'18px'}}
                />
                <span> {viewCount}</span>
                <span>&nbsp;&nbsp;&nbsp;</span>
                  <Icon
                    type="heart"
                    theme="filled"
                    style={{ width: '18px', height:'18px'}}
                  />
                <span> {likeCount}</span>
                <span>&nbsp;&nbsp;&nbsp;</span>
                  <Icon
                    type="message"
                    style={{ width: '18px', height:'18px'}}
                  />
                <span> {commentCount}</span>
                <span>&nbsp;&nbsp;&nbsp;</span>
                  <Icon
                    type="apartment"
                    style={{ width: '18px', height:'18px'}}
                  />
                <span> {cloneCount}</span>
              </div>
              <div style={{marginTop:'5px'}}>
                <span>{userName}</span>
              </div>
              <div style={{marginTop:'5px', marginBottom:'10px'}}>
                <span>{setName}</span>
              </div>

            </div>);

  };


  return (
    <Card
      style={{ width: '100%', height: '100%'}}
      cover={
        <div>
          {genCoverLinkMenu()}
        </div>
      }

      hoverable={false}
    >
      <Tooltip placement="top" visible={false} title={creationName}>
        <Meta title={genTitle()} style={{ marginTop: '20px', marginBottom: '2px', textAlign: 'center'}} />
      </Tooltip>

    </Card>
  );
};
