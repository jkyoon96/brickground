import React, { FC, useCallback, useState, useEffect } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Card, Icon, Typography, Tooltip, Row, Col, Button } from 'antd';
import $ from 'jquery';

import { SOPOONG_URL, SHOP_URL, CREATION_VIEW_PATH, CREATION_INFO_PATH, storageService } from 'common';


/**
 * @description 상점 리스트 페이지에서 사용되는 상점 카드
 * @param {MartModel} mart
 */

export const CreationCard = props => {
  const { Meta } = Card;
  const { onRefresh } = props;
  const { creationId, creationName, coverImage, viewCount, likeCount, commentCount, cloneCount, description, categoryId, userId, userName, setNames } = props.creation;
  const history = useHistory();


  const genCoverLinkMenu = () => {

    return (<Link to={`${CREATION_VIEW_PATH}/${creationId}`}>
              <img
                alt={creationName}
                src={coverImage}
                style={{ width: '97%', height: '100%', margin: '5px', borderRadius: '8px 8px 0 0' }}
              />
            </Link>);
  };


  const genTitle = () => {

    return (<div style={{fontSize: '12px', fontWeight: 400}}>
              <div>
                <span style={{fontSize: '14px', fontWeight: 600}} > {creationName} </span>
              </div>
              <div style={{marginTop: '5px', marginBottom: '10px'}}>
                <span> </span>
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
