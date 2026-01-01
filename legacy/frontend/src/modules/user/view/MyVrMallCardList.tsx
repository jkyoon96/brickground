import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useHistory} from 'react-router-dom';
import { Card, Tabs, Row, Col, Button, Empty, Icon } from 'antd';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, VR_MALLS_PATH } from 'common';
import { MyVrMallCard } from '.';

export const MyVrMallCardList = (props) => {

  const { title, userId } = props;
  const [vrMallList, setVrMallList] = useState<any[]>([]);
  const [noTitleKey, setNoTitleKey] = useState<string>('app');

  const history = useHistory();

  useEffect(() => {

    getVrMallsData();

  }, []);


  const onTabChange = (key) => {
    console.log(key);

  };


  const getVrMallsData = () => {

      var searchUrl = SOPOONG_URL + SHOP_URL + '/vrMallsByUser.do?' + 'userId=' + userId ;

      fetch(
        searchUrl
      ).then(res => res.json())
       .then(json => {console.log(json); setVrMallList(Object.assign(json));})
       .catch(err => console.log(err));

  };

  const { TabPane } = Tabs;

  const { Meta } = Card;

  const loading = false;


  return (
    <div className='card-container'>
      <Card style={{border: '0px'}}>

        {vrMallList ? (
          vrMallList.map(vrMall => (
            <Card.Grid className='card-grid' key={vrMall.vrMallUserRoleId}>
              {' '}
              <MyVrMallCard
                vrMall={vrMall}
              />{' '}
            </Card.Grid>
          ))
        ) : (
          <Empty />
        )}

      </Card>
    </div>
  );

}
