import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Link, useHistory } from 'react-router-dom';
import { Card, Tabs, Row, Col, Button, Empty, Checkbox, Select, Pagination } from 'antd';
import $ from 'jquery';
import queryString from 'query-string';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, LOGIN_PATH, CREATION_INFO_PATH, CREATION_EDITOR_PATH, storageService } from 'common';

import { CreationCard } from '.';


export const CreationListView = (props) => {

  const params = queryString.parse(props.location.search);
  console.log('params : ' , params);

  const [userId, setUserId] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [userNickname, setUserNickname] = useState<string>('');

  const [checkedProductList, setCheckedProductList] = useState<string[]>(['BricQ', '스파이크 프라임', '로봇 인벤터', 'EV3', '스테파니의집']);
  const [indeterminateProduct, setIndeterminateProduct] = useState<boolean>(true);
  const [checkAllProduct, setCheckAllProduct] = useState<boolean>(false);

  const [checkedList, setCheckedList] = useState<string[]>(['기초', '초급', '중급', '고급']);
  const [indeterminate, setIndeterminate] = useState<boolean>(true);
  const [checkAll, setCheckAll] = useState<boolean>(false);

  const [creationList, setCreationList] = useState<any[]>([]);

  const [categoryList, setCategoryList] = useState<string>('101,102,103,104');
  const [size, setSize] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(10);
  const [sortType, setSortType] = useState<number>(1);

  const [cardGridStyle, setCardGridStyle] = useState<any>({});


  const history = useHistory();

  useEffect(() => {
    scroll(0, 0);

    $('#MainHeader').show();
    $('#MainFooter').show();

    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined) {
          setUserId(user.userId);
          setUserName(user.userName);
          setUserNickname(user.userNickname);
        }
    }

    getCreationCount();


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


  const getCreationCount = () => {

    var searchUrl = SOPOONG_URL + SHOP_URL + '/creationCountByProuductAndCatetory.do?shopId=' + SHOP_ID;

    var product = '31199';

    searchUrl += '&productList=' + product;

    var category = '101,102,103,104';

    setCategoryList(category);

    searchUrl += '&categoryList=' + category;

    fetch(
      searchUrl
    ).then(response => response.json())
     .then(data => {
                      console.log(data);

                      setTotalCount(data);
                      //getVrMallsData(category, currentPage, size);
                      getCreationsData(currentPage, size);
                     })
     .catch(err => console.log(err));

  };


  const getCreationsData = (page, size) => {

    scroll(0, 0);

    var searchUrl = SOPOONG_URL + SHOP_URL + '/creationsByProductAndCategory.do?' + 'shopId=' + SHOP_ID ;
    searchUrl += '&page=' + (page - 1) + '&size=' + size;
    searchUrl += '&sortType=' + sortType;


    var product = '31199';

    searchUrl += '&productList=' + product;

    var category = '101,102,103,104';

    setCategoryList(category);

    searchUrl += '&categoryList=' + category;


    fetch(
      searchUrl
    ).then(res => res.json())
     .then(json => {
                    console.log(json);
                    setCreationList(Object.assign(json));

                  })
     .catch(err => console.log(err));

  };


  const getCreationsDataByPage = (page, pageSize) => {

    getCreationsData(page, pageSize);

  };


  const onTabChange = (key) => {
    console.log(key);

  };

  const handleRefresh = () => {

    console.log("handleRefresh Start..");
    getCreationsData(currentPage, size);
  };

  const { TabPane } = Tabs;
  const { Meta } = Card;
  const { Option } = Select;

  const CheckboxGroup = Checkbox.Group;


  return (
    <div className='card-container' style={{backgroundColor: '#ffffff', marginTop: '20px'}}>
      <Row>
        <Col span={24}>
          <Card style={{border: '0px', margin: '2px'}}>
            {creationList ? (
              creationList.map(creation => (
                <Card.Grid className='card-grid'  style={cardGridStyle} key={creation.creationId}>
                  <div className='content'>
                    <CreationCard
                      userId={userId}
                      userName={userName}
                      onRefresh={handleRefresh}
                      creation={creation}
                    />
                  </div>
                </Card.Grid>
              ))
            ) : (
              <Empty />
            )}
          </Card>
        </Col>
        <Pagination defaultCurrent={currentPage} pageSize={size} total={totalCount} onChange={getCreationsDataByPage} style={{float: 'right', margin: '16px'}}/>
      </Row>

      <br/><br/><br/><br/>
    </div>
  );

}
