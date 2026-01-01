import React, { FC, useCallback, useState, useEffect } from 'react';
import { Card, Icon, Typography, Tooltip } from 'antd';
import { ProductModel } from 'modules/product/model';
import { storageService } from 'common';
import { PriceLabel } from 'components';

import { Modal,ModalManager,Effect} from 'react-dynamic-modal';

type PropTypes = {
  product: ProductModel;
  onClick: (productId: ProductModel['productId']) => void;
};

/**
 * @description 상품 리스트 페이지에서 사용되는 제품 카드
 * @param {ProductModel} product
 */

export const ProductCardDialog: FC<PropTypes> = props => {
  const { Meta } = Card;
  const { productId, productNm, coverImage, price } = props.product;
  const { onClick } = props;
  const [carted, setCarted] = useState<boolean>(false);

  useEffect(() => {
    if (storageService.checkCart(productId)) {
      setCarted(true);
    }
  }, [onClick]);

  const handleIconClick = useCallback(
    (productId: ProductModel['productId']) => {
      onClick(productId);
      if (storageService.checkCart(productId)) {
        setCarted(true);
      } else {
        setCarted(false);
      }
    },
    [onClick],
  );

  return (
    <Modal style={{ width: 320, marginBottom: 0, marginRight: 0 }}
      effect={Effect.ScaleUp}>
      <Card
        style={{ width: 320, marginBottom: 0, marginRight: 0 }}
        cover={
          <div style={{ overflow: 'hidden', width: 320, height: 180 }}>
            <img
              alt={productNm}
              src={coverImage}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        }
        actions={[
          <span>
            <PriceLabel value={price} strong={true} />
          </span>,
          <span
            onClick={() => handleIconClick(productId)}
            style={carted ? { color: '#1890ff', fontWeight: 'bold' } : {}}
          >
            <Icon
              type="shopping-cart"
              style={{
                fontSize: '20px',
                marginRight: '4px',
              }}
            />
            {carted ? '빼기' : '담기'}
          </span>,
        ]}
        hoverable={true}      
      >
      <Tooltip placement="bottom" title={productNm}>
        <Meta title={productNm} />
      </Tooltip>
      </Card>
    </Modal>
  );
};
