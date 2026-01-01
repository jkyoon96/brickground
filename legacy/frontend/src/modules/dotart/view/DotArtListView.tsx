import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Link, useHistory } from 'react-router-dom';
import { Card, Tabs, Row, Col, Button, Empty, Checkbox, Select, Pagination } from 'antd';
import $ from 'jquery';
import queryString from 'query-string';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, LOGIN_PATH, DOTART_INFO_PATH, DOTART_EDITOR_PATH, DOTART_EDITOR_2D_PATH, storageService } from 'common';

import { DotArtCard } from '.';


export const DotArtListView = (props) => {

  const params = queryString.parse(props.location.search);
  console.log('params : ' , params);

  const [userId, setUserId] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [userNickname, setUserNickname] = useState<string>('');

  const [checkedProductList, setCheckedProductList] = useState<string[]>(['BricQ', '스파이크 프라임', '로봇 인벤터', 'EV3']);
  const [indeterminateProduct, setIndeterminateProduct] = useState<boolean>(true);
  const [checkAllProduct, setCheckAllProduct] = useState<boolean>(false);

  const [checkedList, setCheckedList] = useState<string[]>(['기초', '초급', '중급', '고급']);
  const [indeterminate, setIndeterminate] = useState<boolean>(true);
  const [checkAll, setCheckAll] = useState<boolean>(false);

  const [creationList, setCreationList] = useState<any[]>([]);

  const [categoryList, setCategoryList] = useState<string>('201');
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

    if (params != undefined && params.categoryId != undefined)
      getCreationCount(params.categoryId);


    window.addEventListener( 'resize',onWindowResize, false );
    onWindowResize();

  }, [props.location.search]);

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


  const getCreationCount = (categoryId) => {

    var searchUrl = SOPOONG_URL + SHOP_URL + '/creationCountByProuductAndCatetory.do?shopId=' + SHOP_ID;

    var product = '21226,21226C'; // lego dot model
    searchUrl += '&productList=' + product;

    setCategoryList(categoryId);
    searchUrl += '&categoryList=' + categoryId;

    fetch(
      searchUrl
    ).then(response => response.json())
     .then(data => {
                      console.log(data);

                      setTotalCount(data);
                      //getVrMallsData(category, currentPage, size);
                      getCreationsData(categoryId, currentPage, size);
                     })
     .catch(err => console.log(err));

  };


  const getCreationsData = (categoryId, page, size) => {

    scroll(0, 0);

    var searchUrl = SOPOONG_URL + SHOP_URL + '/creationsByProductAndCategory.do?' + 'shopId=' + SHOP_ID ;
    searchUrl += '&page=' + (page - 1) + '&size=' + size;
    searchUrl += '&sortType=' + sortType;


    var product = '21226,21226C'; // lego dot model
    searchUrl += '&productList=' + product;

    searchUrl += '&categoryList=' + categoryId;

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

    getCreationsData(categoryList, page, pageSize);

  };

  const getCreationsDataBySortType = (type) => {

    scroll(0, 0);

    setSortType(type);
    setCurrentPage(1);

    var searchUrl = SOPOONG_URL + SHOP_URL + '/creationsByProductAndCategory.do?' + 'shopId=' + SHOP_ID ;
    searchUrl += '&page=0&size=' + size;
    searchUrl += '&sortType=' + type;


    var product = '21226'; // lego dot model
    searchUrl += '&productList=' + product;

    searchUrl += '&categoryList=' + categoryList;

    fetch(
      searchUrl
    ).then(res => res.json())
     .then(json => {
                    console.log(json);
                    setCreationList(Object.assign(json));

                  })
     .catch(err => console.log(err));

  };


  const handleRefresh = () => {

    console.log("handleRefresh Start..");
    getCreationsData(categoryList, currentPage, size);
  };


  const { TabPane } = Tabs;
  const { Meta } = Card;
  const { Option } = Select;

  const genAddExtra = () => {

    let user;

    if (storageService.getItem('brickground-user')) {

        user = JSON.parse( storageService.getItem('brickground-user') as string );
    }

    if(params.categoryId == '101') {
      return (<div>
                <span>보기 &nbsp;
                  <Select value={sortType} style={{ height: '40px', width: '130px'}} onChange={value => {getCreationsDataBySortType(value);}}>
                    <Option value={1}>최신순</Option>
                    <Option value={2}>조회순</Option>
                    <Option value={3}>추천순</Option>
                    <Option value={4}>댓글/답글순</Option>
                    <Option value={5}>리믹스순</Option>
                  </Select>
                </span> &nbsp;&nbsp;
                <span>
                  <Button type="primary" onClick={()=>{history.push(`${DOTART_EDITOR_PATH}/0`); }}
                    style={{ marginTop: '10px', fontSize: '16px', fontWeight: 800, borderRadius: '5px'}}>
                    3D 작품 추가
                  </Button>
                </span>
                &nbsp;
                <span>
                  <Button type="primary" onClick={()=>{history.push(`${DOTART_EDITOR_2D_PATH}/0`); }}
                    style={{ display:'none', marginTop: '10px', fontSize: '16px', fontWeight: 800, borderRadius: '5px'}}>
                    2D 작품 추가
                  </Button>
                </span>
              </div>);
    }

    return (<div>
              <span>보기 &nbsp;
                <Select value={sortType} style={{ height: '40px', width: '130px'}} onChange={value => {getCreationsDataBySortType(value);}}>
                  <Option value={1}>최신순</Option>
                  <Option value={2}>조회순</Option>
                  <Option value={3}>추천순</Option>
                  <Option value={4}>댓글/답글순</Option>
                  <Option value={5}>리믹스순</Option>
                </Select>
              </span>
            </div>);
  };

  const CheckboxGroup = Checkbox.Group;


  return (
    <div className='card-container' style={{backgroundColor: '#ffffff', marginTop: '20px'}}>
      <Row>
        <Col span={24}>
          <Card style={{border: '0px', margin: '2px'}} extra={genAddExtra()}>
            {creationList ? (
              creationList.map(creation => (
                <Card.Grid className='card-grid'  style={cardGridStyle} key={creation.creationId}>
                  <div className='content'>
                    <DotArtCard
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
