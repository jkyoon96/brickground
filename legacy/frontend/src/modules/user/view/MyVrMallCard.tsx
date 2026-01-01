import React, { FC, useCallback, useState, useEffect } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Card, Icon, Typography, Tooltip, Row, Col, Button } from 'antd';
import $ from 'jquery';
import { VrMallModel } from 'modules/main/model';
import { SOPOONG_URL, SHOP_URL, VR_MALLS_PATH, VR_MALL_VIEW_PATH, storageService } from 'common';
import { PriceLabel } from 'components';


/**
 * @description 상점 리스트 페이지에서 사용되는 상점 카드
 * @param {MartModel} mart
 */

export const MyVrMallCard = props => {
  const { Meta } = Card;
  const { onRefresh } = props;
  const { productName, vrModelName, coverImage, timeStart, timeEnd } = props.vrMall;
  const history = useHistory();


  return (
    <Card
      style={{ width: '100%', height: '100%' }}
      cover={
        <div>
          <Link to={`${VR_MALL_VIEW_PATH }/${vrModelName}`}>
            <img
              alt={productName}
              src={coverImage}
              style={{width: '97%', height: '100%', margin: '5px', borderRadius: '8px 8px 0 0'}}
            />
          </Link>
        </div>
      }

      actions={[
        <span>
          <Link to={`${VR_MALL_VIEW_PATH}/${vrModelName}`}>
            <Icon
              type="read"
              style={{ width: '18px', height:'18px'}}
            />{`${timeStart.substring(0,10)} ~ ${timeEnd.substring(0,10)}`}
          </Link>
        </span>

      ]}

      hoverable={false}
    >
      <Tooltip placement="bottom" title={productName}>
          <Meta title={productName} style={{ marginTop: '15px', marginBottom: '15px', textAlign: 'center'}} />
      </Tooltip>

    </Card>
  );
};
