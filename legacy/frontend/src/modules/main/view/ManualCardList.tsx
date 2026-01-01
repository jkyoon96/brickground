import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useHistory} from 'react-router-dom';
import { Card, Tabs, Row, Col, Button, Empty } from 'antd';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, MANUALS_LIST_PATH, VR_MALLS_PATH, storageService } from 'common';

import { ManualCard } from '.';

export const ManualCardList = (props) => {

  const { title, productSetId } = props;
  const [noTitleKey, setNoTitleKey] = useState<string>('app');
  const [manualList, setManualList] = useState<any[]>([]);
  const [cardGridStyle, setCardGridStyle] = useState<any>({});

  const history = useHistory();

  useEffect(() => {

    getManualsData();

    window.addEventListener( 'resize',onWindowResize, false );

    onWindowResize();

  }, []);

  const getManualsData = () => {

      var searchUrl = SOPOONG_URL + SHOP_URL + '/manualsByManualsByProuductSetAndLevel.do?' + 'shopId=' + SHOP_ID ;
      searchUrl += '&productSetList=' + productSetId;
      searchUrl += '&levelList=101,102,103,104';
      searchUrl += '&page=0&size=8';

      fetch(
        searchUrl
      ).then(res => res.json())
       .then(json => {console.log(json); setManualList(Object.assign(json));})
       .catch(err => console.log(err));

  };


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

  const { TabPane } = Tabs;


  const handleProductCardClick = (productId) => {

    console.log("click handleProductCardClick");
  };



  const genAddExtra = () => {

    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined && user.role == 9) {
          return (<div>
                    <Link to={`${MANUALS_LIST_PATH}?productSet=${productSetId}`}> <Button
                                icon="plus"
                                style={{width: '100px', height: '30px', backgroundColor: '#ffffff', border: '0px', paddingBottom: '0px', marginBottom : '0px' }}
                              >더보기</Button></Link> &nbsp;&nbsp;&nbsp;
                              <Button
                                icon="plus"
                                style={{width: '100px', height: '30px', backgroundColor: '#ffffff', border: '0px', paddingBottom: '0px', marginBottom : '0px' }}
                                onClick={e => history.push(`${VR_MALLS_PATH}`)}
                              >VR목록</Button>
                  </div>);
        }
    }

    return (<Link to={`${MANUALS_LIST_PATH}?productSet=${productSetId}`}> <Button
              icon="plus"
              style={{width: '100px', height: '30px', backgroundColor: '#ffffff', border: '0px', paddingBottom: '0px', marginBottom : '0px' }}
            >더보기</Button></Link>);

  };


  return (
    <div className='card-container'>

      <Tabs  type="line" tabBarExtraContent={genAddExtra()}>
        <TabPane tab={title} key="1">
          <Card style={{border: '0px'}}>

            {manualList ? (
              manualList.map(manual => (
                <Card.Grid className='card-grid' style={cardGridStyle} key={manual.productId}>
                  <div className='content'>
                    <ManualCard
                      onClick={handleProductCardClick}
                      product={manual}
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
