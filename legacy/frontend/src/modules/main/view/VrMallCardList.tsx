import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useHistory} from 'react-router-dom';
import { Card, Tabs, Row, Col, Button, Empty, Icon } from 'antd';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, VR_MALLS_PATH } from 'common';
import { VrMallCard } from '.';

export const VrMallCardList = (props) => {

  const { title, categoryId } = props;
  const [noTitleKey, setNoTitleKey] = useState<string>('app');
  const [vrMallList, setVrMallList] = useState<any[]>([]);
  const [cardGridStyle, setCardGridStyle] = useState<any>({});

  const history = useHistory();

  useEffect(() => {

    getVrMallsData();

    window.addEventListener( 'resize',onWindowResize, false );

    onWindowResize();

  }, []);


  const onWindowResize = () => {

    console.log("document.body.clientWidth : " + document.body.clientWidth);

    if(document.body.clientWidth < 500)
      setCardGridStyle({width: '100%'});
    else if (document.body.clientWidth < 600)
      setCardGridStyle({width: '50%'});
    else if (document.body.clientWidth < 900)
      setCardGridStyle({width: '33.3%'});
    else
      setCardGridStyle({width: '25%'});
	}


  const onTabChange = (key) => {
    console.log(key);

  };


  const getVrMallsData = () => {

      var searchUrl = SOPOONG_URL + SHOP_URL + '/vrMallsByCategory.do?' + 'shopId=' + SHOP_ID + '&categoryList=' + categoryId ;
      searchUrl += '&page=0&size=8';

      fetch(
        searchUrl
      ).then(res => res.json())
       .then(json => {console.log(json); setVrMallList(Object.assign(json));})
       .catch(err => console.log(err));

  };

  const handleRefresh = () => {

    console.log("handleRefresh Start..");
    getVrMallsData();
  };


  const handleVrMallCardClick = (vrMallId) => {

    console.log("click handleVrMallCardClick");
  };




  const { TabPane } = Tabs;

  const { Meta } = Card;

  const loading = false;

  const moreOperations = <Button
                            icon="plus"
                            style={{width: '100px', height: '30px', backgroundColor: '#ffffff', border: '0px', paddingBottom: '0px', marginBottom : '0px' }}
                            onClick={e => history.push(`${VR_MALLS_PATH}`)}
                          >더보기</Button>;

  return (
    <div className='card-container'>

      <Tabs onChange={onTabChange} type="line" tabBarExtraContent={moreOperations}>
        <TabPane tab={title} key="1">
          <Card style={{border: '0px', margin: '2px'}}>

            {vrMallList ? (
              vrMallList.map(vrMall => (
                <Card.Grid className='card-grid' style={cardGridStyle} key={vrMall.vrMallId}>
                  <div className='content'>
                    <VrMallCard
                      onClick={handleVrMallCardClick}
                      onRefresh={handleRefresh}
                      vrMall={vrMall}
                    />
                  </div>
                </Card.Grid>
              ))
            ) : (
              <Empty />
            )}

          </Card>


        </TabPane>
      </Tabs>
    </div>
  );

}
