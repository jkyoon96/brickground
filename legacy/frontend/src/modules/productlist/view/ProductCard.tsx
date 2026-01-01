import React, { FC, useCallback, useState, useEffect } from 'react';
import { NavLink, useHistory} from 'react-router-dom';
import { Card, Icon, Typography, Tooltip, Button, Modal } from 'antd';
import $ from 'jquery';

import { ProductModel } from 'modules/main/model';
import { SOPOONG_URL, SHOP_URL, PRODUCT_LIST_PATH, LOGIN_PATH, CART_PATH, storageService } from 'common';
import { PriceLabel } from 'components';


/**
 * @description 상점 리스트 페이지에서 사용되는 상점 카드
 * @param {MartModel} mart
 */

export const ProductCard = props => {
  const { Meta } = Card;
  const { shopId, categoryId, productId, productName, productFullName, vrModelName, coverImage, price } = props.product;
  const [visibleCartConfirm, setVisibleCartConfirm] = useState<boolean>(false);

  const history = useHistory();


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
                count: 1
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

  return (
    <Card
      style={{ width: '100%', height: '100%'}}
      cover={
        <div>
          <NavLink to={`${PRODUCT_LIST_PATH}/${productId}`}>
            <img id={vrModelName}
              alt={productName}
              src={coverImage}
              style={{width: '97%', height: '100%', margin: '5px', borderRadius: '8px 8px 0 0'}}
            />
          </NavLink>
        </div>
      }

      actions={[

        <span>
          <NavLink to={`${PRODUCT_LIST_PATH}/${productId}`}>
            {price.toLocaleString()}원
          </NavLink>
        </span>,
        <span>
          <a onClick={saveCartToServer} >
            <Icon
              type="shopping-cart"
              style={{ width: '18px', height:'18px'}}
            />
          </a>
        </span>

      ]}

      hoverable={false}
    >
      <Tooltip placement="bottom" title={productName}>
        <Meta title={productName}
              style={{ marginTop: '17px', marginBottom: '13px', textAlign: 'center', fontSize: '12px'}}
              description={<div>
                             {productFullName}
                         </div>}
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
