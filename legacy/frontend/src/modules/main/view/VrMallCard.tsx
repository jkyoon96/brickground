import React, { FC, useCallback, useState, useEffect } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Card, Icon, Typography, Tooltip, Row, Col, Button } from 'antd';
import $ from 'jquery';
import { VrMallModel } from 'modules/main/model';
import { SOPOONG_URL, SHOP_URL, VR_MALLS_PATH, VR_MALL_VIEW_PATH, VR_MALL_BASE_VIEW_PATH, storageService } from 'common';
import { PriceLabel,ConfirmModal } from 'components';


/**
 * @description 상점 리스트 페이지에서 사용되는 상점 카드
 * @param {MartModel} mart
 */

export const VrMallCard = props => {
  const { Meta } = Card;
  const { onRefresh } = props;
  const { vrMallId, vrMallName, coverImage, viewCount, description, categoryId } = props.vrMall;
  const history = useHistory();



  return (
    <Card
      style={{ width: '100%', height: '100%'}}
      cover={
        <div>

        </div>
      }

      actions={[

        <div>

        </div>

      ]}

      hoverable={false}
    >
      <Tooltip placement="top" visible={false} title={vrMallName}>
        <Meta title={vrMallName} style={{ marginTop: '20px', marginBottom: '2px', textAlign: 'center'}} />
      </Tooltip>

    </Card>
  );
};
