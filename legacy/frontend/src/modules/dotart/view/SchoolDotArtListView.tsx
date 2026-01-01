import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Link, useHistory } from 'react-router-dom';
import { Card, Tabs, Row, Col, Button, Empty, Checkbox, Select, Pagination } from 'antd';
import $ from 'jquery';
import queryString from 'query-string';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, LOGIN_PATH, DOTART_INFO_PATH, DOTART_EDITOR_PATH, DOTART_EDITOR_2D_PATH, storageService } from 'common';

import { DotArtCard } from '.';


export const SchoolDotArtListView = (props) => {

  const params = queryString.parse(props.location.search);
  console.log('params : ' , params);

  const [userId, setUserId] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [userNickname, setUserNickname] = useState<string>('');

  const [checkedSubjectList, setCheckedSubjectList] = useState<string[]>(['인물','풍경', '명화', '캐릭터', '식물', '동물', '이벤트', '기타']);
  const [indeterminateSubject, setIndeterminateSubject] = useState<boolean>(true);
  const [checkAllSubject, setCheckAllSubject] = useState<boolean>(false);

  const [checkedSizeIdList, setCheckedSizeIdList] = useState<string[]>(['16x16','16x32', '32x32']);
  const [indeterminateSizeId, setIndeterminateSizeId] = useState<boolean>(true);
  const [checkAllSizeId, setCheckAllSizeId] = useState<boolean>(false);


  const [creationList, setCreationList] = useState<any[]>([]);

  const [categoryList, setCategoryList] = useState<string>('301');
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
      getCreationCount(params.categoryId, checkedSubjectList, checkedSizeIdList);


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


  const getCreationCount = (categoryId, list1, list2) => {

    var searchUrl = SOPOONG_URL + SHOP_URL + '/creationCountBySubjectAndSize.do?shopId=' + SHOP_ID;

    var product = '21226,21226C'; // lego dot model
    searchUrl += '&productList=' + product;

    setCategoryList(categoryId);
    searchUrl += '&categoryList=' + categoryId;

    var subject = '';
    list1.forEach(element => {
        if(element == '인물')
          subject += '101,';
        else if(element == '풍경')
          subject += '102,';
        else if(element == '명화')
          subject += '103,';
        else if(element == '캐릭터')
          subject += '104,';
        else if(element == '식물')
          subject += '105,';
        else if(element == '동물')
          subject += '106,';
        else if(element == '이벤트')
          subject += '107,';
        else if(element == '기타')
          subject += '108,';
    });

    if(subject.length > 0)
      subject = subject.substring(0, subject.length - 1);
    else{
      setCreationList([]);
      return;
    }

    searchUrl += '&subjectIdList=' + subject;


    var sizeId = '';
    list2.forEach(element => {
        if(element == '16x16')
          sizeId += '101,';
        else if(element == '16x32')
          sizeId += '102,';
        else if(element == '32x32')
          sizeId += '103,';
    });

    if(sizeId.length > 0)
      sizeId = sizeId.substring(0, sizeId.length - 1);
    else{
      setCreationList([]);
      return;
    }

    searchUrl += '&sizeIdList=' + sizeId;


    fetch(
      searchUrl
    ).then(response => response.json())
     .then(data => {
                      console.log(data);

                      setTotalCount(data);
                      //getVrMallsData(category, currentPage, size);
                      getCreationsData(categoryId, list1, list2, currentPage, size);
                     })
     .catch(err => console.log(err));

  };


  const getCreationsData = (categoryId, list1, list2, page, size) => {

    scroll(0, 0);

    var searchUrl = SOPOONG_URL + SHOP_URL + '/creationsBySubjectAndSize.do?' + 'shopId=' + SHOP_ID ;
    searchUrl += '&page=' + (page - 1) + '&size=' + size;
    searchUrl += '&sortType=' + sortType;


    var product = '21226,21226C'; // lego dot model
    searchUrl += '&productList=' + product;

    searchUrl += '&categoryList=' + categoryId;

    var subject = '';
    list1.forEach(element => {
        if(element == '인물')
          subject += '101,';
        else if(element == '풍경')
          subject += '102,';
        else if(element == '명화')
          subject += '103,';
        else if(element == '캐릭터')
          subject += '104,';
        else if(element == '식물')
          subject += '105,';
        else if(element == '동물')
          subject += '106,';
        else if(element == '이벤트')
          subject += '107,';
        else if(element == '기타')
          subject += '108,';
    });

    if(subject.length > 0)
      subject = subject.substring(0, subject.length - 1);
    else{
      setCreationList([]);
      return;
    }

    searchUrl += '&subjectIdList=' + subject;


    var sizeId = '';
    list2.forEach(element => {
        if(element == '16x16')
          sizeId += '101,';
        else if(element == '16x32')
          sizeId += '102,';
        else if(element == '32x32')
          sizeId += '103,';
    });

    if(sizeId.length > 0)
      sizeId = sizeId.substring(0, sizeId.length - 1);
    else{
      setCreationList([]);
      return;
    }

    searchUrl += '&sizeIdList=' + sizeId;


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

    getCreationsData(categoryList, checkedSubjectList, checkedSizeIdList, page, pageSize);

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


    var subject = '';
    checkedSubjectList.forEach(element => {
        if(element == '인물')
          subject += '101,';
        else if(element == '풍경')
          subject += '102,';
        else if(element == '명화')
          subject += '103,';
        else if(element == '캐릭터')
          subject += '104,';
        else if(element == '식물')
          subject += '105,';
        else if(element == '동물')
          subject += '106,';
        else if(element == '이벤트')
          subject += '107,';
        else if(element == '기타')
          subject += '108,';
    });

    if(subject.length > 0)
      subject = subject.substring(0, subject.length - 1);
    else{
      setCreationList([]);
      return;
    }

    searchUrl += '&subjectList=' + subject;

    var sizeId = '';
    checkedSizeIdList.forEach(element => {
        if(element == '16x16')
          sizeId += '101,';
        else if(element == '16x32')
          sizeId += '102,';
        else if(element == '32x32')
          sizeId += '103,';
    });

    if(sizeId.length > 0)
      sizeId = sizeId.substring(0, subject.length - 1);
    else{
      setCreationList([]);
      return;
    }

    searchUrl += '&sizeIdList=' + sizeId;


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
    getCreationsData(categoryList, checkedSubjectList, checkedSizeIdList, currentPage, size);
  };


  const { TabPane } = Tabs;
  const { Meta } = Card;
  const { Option } = Select;

  const subjectOptions = ['인물','풍경', '명화', '캐릭터', '식물', '동물', '이벤트', '기타'];

  const onSubjectChange = list => {
    setCheckedSubjectList(list);
    setIndeterminateSubject(!!list.length && list.length < subjectOptions.length);
    setCheckAllSubject(list.length === subjectOptions.length);

    getCreationCount(categoryList, list, checkedSizeIdList);


  };

  const onCheckAllSubjectChange = e => {

    setCheckedSubjectList(e.target.checked ? subjectOptions : []);
    setIndeterminateSubject(false);
    setCheckAllSubject(e.target.checked);

    getCreationCount(categoryList, e.target.checked ? subjectOptions : [], checkedSizeIdList);
  };

  const sizeIdOptions = ['16x16','16x32', '32x32'];

  const onSizeIdChange = list => {
    setCheckedSizeIdList(list);
    setIndeterminateSizeId(!!list.length && list.length < sizeIdOptions.length);
    setCheckAllSizeId(list.length === sizeIdOptions.length);

    getCreationCount(categoryList, checkedSubjectList, list);

  };

  const onCheckAllSizeIdChange = e => {

    setCheckedSizeIdList(e.target.checked ?sizeIdOptions : []);
    setIndeterminateSizeId(false);
    setCheckAllSizeId(e.target.checked);

    getCreationCount(categoryList, checkedSubjectList, e.target.checked ? sizeIdOptions : []);
  };


  const genAddExtra = () => {

    let user;

    if (storageService.getItem('brickground-user')) {

        user = JSON.parse( storageService.getItem('brickground-user') as string );
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
              </span> &nbsp;&nbsp;
            </div>);

  };

  const CheckboxGroup = Checkbox.Group;


  return (
    <div className='card-container' style={{backgroundColor: '#ffffff', marginTop: '20px'}}>

      <Row style={{ paddingBottom: '10px', paddingTop: '10px', border: 'solid 1px rgba(112, 112, 112, 0.4)', borderStyle: 'solid none solid none', borderRadius: '0px', margin: '0px 20px 0px 20px' }}>
        <Col span={3} style={{textAlign: 'center'}}>
          주제별
        </Col>
        <Col span={1} style={{textAlign: 'left'}}>
          |
        </Col>
        <Col span={20} style={{textAlign: 'left'}}>
          <Checkbox
              indeterminate={indeterminateSubject}
              onChange={onCheckAllSubjectChange}
              checked={checkAllSubject}
          >전체 &nbsp;&nbsp;&nbsp;
          </Checkbox>

          <CheckboxGroup
            options={subjectOptions}
            value={checkedSubjectList}
            onChange={onSubjectChange}
          />
        </Col>
      </Row>
      <Row style={{ paddingBottom: '10px', paddingTop: '10px', border: 'solid 1px rgba(112, 112, 112, 0.4)', borderStyle: 'none none solid none', borderRadius: '0px', margin: '0px 20px 20px 20px' }}>
        <Col span={3} style={{textAlign: 'center'}}>
          크기별
        </Col>
        <Col span={1} style={{textAlign: 'left'}}>
          |
        </Col>
        <Col span={20} style={{textAlign: 'left'}}>
          <Checkbox
              indeterminate={indeterminateSizeId}
              onChange={onCheckAllSizeIdChange}
              checked={checkAllSizeId}
          >전체 &nbsp;&nbsp;&nbsp;
          </Checkbox>

          <CheckboxGroup
            options={sizeIdOptions}
            value={checkedSizeIdList}
            onChange={onSizeIdChange}
          />
        </Col>
      </Row>
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
