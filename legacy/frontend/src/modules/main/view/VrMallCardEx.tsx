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

export const VrMallCardEx = props => {
  const { Meta } = Card;
  const { vrMallId, vrMallName, coverImage, viewCount } = props.vrMall;

  return (
    <Card

      style={{ width: '400px', marginTop: '0px', border: '0px' }}
      cover={

        <Row type='flex' align='middle' >

          <Col span={16}>
            <Link to={`${VR_MALL_VIEW_PATH }/${vrMallId}`}>
              <img
                alt={vrMallName}
                src={coverImage}
                style={{ width: '240px', height: '200px', paddingLeft: '3px', paddingTop: '3px' }}
              >
              </img>
            </Link>
          </Col>
          <Col span={8} style={{textAlign: 'left'}}>
            <div style={{padding: '5px', fontSize: '15px', fontWeight: 600}}>
              {vrMallName}
            </div>
            <div style={{padding: '5px'}} >
              조회수 {viewCount}
            </div>
          </Col>
        </Row>

      }
    >

    </Card>
  );
};
