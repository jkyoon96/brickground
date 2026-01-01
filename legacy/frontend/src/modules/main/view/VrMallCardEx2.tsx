import React, { FC, useCallback, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Card, Icon, Typography, Tooltip, Row, Col } from 'antd';
import $ from 'jquery';
import { VrMallModel } from 'modules/main/model';
import { SOPOONG_URL, SHOP_URL, VR_MALL_VIEW_PATH, storageService } from 'common';
import { PriceLabel } from 'components';


/**
 * @description 상점 리스트 페이지에서 사용되는 상점 카드
 * @param {MartModel} mart
 */

export const VrMallCardEx2 = props => {
  const { Meta } = Card;
  const { vrMallId, vrMallName, coverImage, viewCount } = props.vrMall;

  return (
    <Col span={8} >
      <Link to={`${VR_MALL_VIEW_PATH }/${vrMallId}`}>
        <img
          alt={vrMallName}
          src={coverImage}
          style={{width: '100%', height: '100%'}}
        >
        </img>
      </Link>
      <div style={{color: '#000000', textAlign: 'center', fontSize: '12px', marginTop: '2px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>{vrMallName}</div>
    </Col>
  );
};
