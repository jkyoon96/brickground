import React, { FC, useCallback, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Card, Icon, Typography, Tooltip } from 'antd';
import $ from 'jquery';
import { ROOT_PATH, storageService } from 'common';


/**
 * @description 상점 리스트 페이지에서 사용되는 상점 카드
 * @param {MartModel} mart
 */

export const ShopCard = props => {
  const { Meta } = Card;
  const { shopId, shopName, shopAlias, coverImage, description } = props.shop;

  return (
    <Card
      style={{ width: '240px', marginTop: '16px', border: '0px' }}
      cover={
        <div style={{ overflow: 'hidden', width: '240px', height: '210px' }}>
          <Link to={`${ROOT_PATH}${shopName}`}>
            <img
              alt={shopAlias}
              src={coverImage}
              style={{ width: '240px', height: '200px', paddingTop: '10px' }}
            />
          </Link>
        </div>
      }

      hoverable={false}
    >
    <Tooltip placement="bottom" title={shopAlias}>
      <Meta title={shopAlias} description={description} style={{ marginTop: '25px', marginBottom: '23px', textAlign: 'center'}} />
    </Tooltip>
    </Card>
  );
};
