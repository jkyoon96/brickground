import React, { FC, useCallback, useState, useEffect } from 'react';
import { NavLink, useHistory} from 'react-router-dom';
import { Card, Icon, Typography, Tooltip, Button, Modal } from 'antd';
import $ from 'jquery';

import { ProductModel } from 'modules/main/model';
import { SOPOONG_URL, SHOP_URL, VR_MALL_VIEW_PATH,  VR_MALL_BASE_VIEW_PATH, MANUAL_LIST_PATH, LOGIN_PATH, CART_PATH, storageService } from 'common';
import { PriceLabel } from 'components';


/**
 * @description 상점 리스트 페이지에서 사용되는 상점 카드
 * @param {MartModel} mart
 */

export const ManualCard = props => {
  const { Meta } = Card;
  const { shopId, categoryId, productId, productName, productFullName, vrModelName, coverImage, price, levelId } = props.product;
  const [visibleCartConfirm, setVisibleCartConfirm] = useState<boolean>(false);
  const [levelName, setLevelName] = useState<string>('기초');

  const history = useHistory();

  useEffect(() => {


    if(levelId == 101)
      setLevelName('기초');
    else if(levelId == 102)
      setLevelName('초급');
    else if(levelId == 103)
      setLevelName('중급');
    else if(levelId == 104)
      setLevelName('고급');


  }, []);


  const saveCartToServer = () => {

    var userId = -1;
    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined) {
          userId = user.userId;
        }
    }
    else {
      //location.href = LOGIN_PATH;
      history.push(LOGIN_PATH);
    }


    let url = SOPOONG_URL + SHOP_URL + '/cart.do';

    var cart = {
                shopId: shopId,
                userId: userId,
                categoryId: categoryId,
                productId: productId,
                productName: productName,
                coverImage: coverImage,
                price: price,
                count: 1,
                vrMallId: Number(vrModelName)
              };

    fetch( url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(cart)
    } )
      .then(response => response.json())
      .then(data => {
                      console.log(data);
                      setVisibleCartConfirm(true);
                    })
      .catch(err => console.log(err));

  }

  const genCoverLinkMenu = () => {

    //console.log("categoryId : " + categoryId);

    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined && user.role == 9) {
          return (<NavLink to={`${VR_MALL_VIEW_PATH }/${vrModelName}`}>
                    <img id={vrModelName}
                      alt={productName}
                      src={coverImage}
                      style={{width: '97%', height: '100%', margin: '5px', borderRadius: '8px 8px 0 0'}}
                    />
                  </NavLink>);
        }
    }


    if (levelId == 101) {

      return (<NavLink to={`${VR_MALL_VIEW_PATH }/${vrModelName}`}>
                <img id={vrModelName}
                  alt={productName}
                  src={coverImage}
                  style={{width: '97%', height: '100%', margin: '5px', borderRadius: '8px 8px 0 0'}}
                />
              </NavLink>);
    } else {

      return (<NavLink to={`${VR_MALL_BASE_VIEW_PATH }/${vrModelName}`}>
                <img id={vrModelName}
                  alt={productName}
                  src={coverImage}
                  style={{width: '97%', height: '100%', margin: '5px', borderRadius: '8px 8px 0 0'}}
                />
              </NavLink>);
    }

  };

  const genPriceLinkMenu = () => {


    if (levelId == 101) {

      return (<span>무료</span>);
    } else {

      return (<NavLink to={`${MANUAL_LIST_PATH}/${productId}`}>
                <span>{price.toLocaleString()}원</span>
              </NavLink>);
    }

  };

  const genCartLinkMenu = () => {


    if (levelId == 101) {

      return (<span></span>);
    } else {

      return (<a onClick={saveCartToServer} >
                <Icon
                  type="shopping-cart"
                  style={{ fontSize: '20px'}}
                />
              </a>);
    }

  };





  return (
    <Card
      style={{ width: '100%', height: '100%'}}
      cover={
        <div>
          {genCoverLinkMenu()}
        </div>
      }

      actions={[
        <span>
          {genPriceLinkMenu()}
        </span>,
        <span>
          {genCartLinkMenu()}
        </span>

      ]}

      hoverable={false}
    >
      <Tooltip placement="bottom" title={productName}>
        <Meta title={productName}
              description={<div style={{fontSize: '14px',  color: '#5c82a5', fontWeight: 'bold', padding: '3px', margin: '0px 20px 0px 20px', borderTop: '1px solid #d9d9d9', borderBottom: '1px solid #d9d9d9'}}>
                               {levelName}
                           </div>}
              style={{ marginTop: '17px', marginBottom: '13px', textAlign: 'center', fontSize: '12px'}}
         />
      </Tooltip>

      <Modal
        visible={visibleCartConfirm}
        closable={false}
        title=""
        footer={[
          <Button key="back" onClick={() => setVisibleCartConfirm(false)}>
            계속 쇼핑하기
          </Button>,
          <Button key="submit" type="primary"><NavLink to={CART_PATH}>
            장바구니 이동하기</NavLink>
          </Button>,
        ]}
      >
        <div style={{ paddingTop: '20px', margin: 'auto', textAlign: 'center' }} >
          <p>장바구니에 상품이 등록되었습니다</p>
          <p>장바구니로 이동하시겠습니까?</p>
        </div>

      </Modal>
    </Card>
  );
};
