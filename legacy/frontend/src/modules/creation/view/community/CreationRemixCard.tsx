import React, { FC, useCallback, useState, useEffect } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Card, Icon, Typography, Tooltip, Row, Col, Button } from 'antd';
import $ from 'jquery';
import { VrMallModel } from 'modules/main/model';
import { SOPOONG_URL, SHOP_URL, CREATION_VIEW_PATH, CREATION_INFO_PATH, CREATION_COMMUNITY_PATH, storageService } from 'common';
import { ConfirmModal } from 'components';


/**
 * @description 상점 리스트 페이지에서 사용되는 상점 카드
 * @param {MartModel} mart
 */

export const CreationRemixCard = props => {
  const { Meta } = Card;
  const { creationId, creationName, coverImage, viewCount, description, categoryId, userId, userName, setNames } = props.creation;
  const history = useHistory();

  const genTitle = () => {


    return (<div  style={{fontSize: '12px'}}>
              <div>
                <span> {creationName} </span>
              </div>
              <div>
                <Icon
                  type="read"
                  style={{ width: '18px', height:'18px'}}
                />
                <span> {viewCount}</span>
                <span>&nbsp;/&nbsp;</span>
                <span>{userName}</span>
              </div>
            </div>);

  };

  return (
    <Card
      style={{width: '95%', marginTop: '5px', marginBottom: '5px'}}
      cover={
        <Link to={`${CREATION_COMMUNITY_PATH }/${creationId}`}>
          <img
            alt={creationName}
            src={coverImage}
            style={{ width: '95%',  margin: '5px', borderRadius: '8px 8px 0 0' }}
          />
        </Link>
      }
      hoverable={false}
    >

      <Meta title={genTitle()} style={{ textAlign: 'center'}} />

    </Card>
  );
};
