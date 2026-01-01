import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { Icon, Select, Row, Col, Menu, Card, Divider, InputNumber, Button, Tabs, Tooltip, Empty } from 'antd';
import $ from 'jquery';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, LOGIN_PATH, CREATIONS_PATH, CREATION_VIEW_PATH, CREATION_INFO_PATH, CREATION_EDITOR_PATH, storageService } from 'common';
import { ConfirmModal } from 'components';
import { CreationCommunityComponent, CreationRemixCard, BlacklistAddDialog } from '.';

export const CreationCommunityView = (props) => {

  const [creationId, setCreationId] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [userNickname, setUserNickname] = useState<string>('');

  const [creation, setCreation] = useState<any>({});
  const [count, setCount] = useState<number>(1);
  const [createDate, setCreateDate] = useState<string>('');
  const [setNames, setSetNames] = useState<string>('');
  const [coverImage, setCoverImage] = useState<string>('');

  const [visibleAddBlacklistConfirm, setVisibleAddBlacklistConfirm] = useState<boolean>(false);

  const [likeThemeType, setLikeThemeType] = useState<any>("outlined");
  const [likeCount, setLikeCount] = useState<number>(0);
  const [commentCount, setCommentCount] = useState<number>(0);

  const [creationOrigin, setCreationOrigin] = useState<any>({});
  const [creationRemixList, setCreationRemixList] = useState<any[]>([]);
  const [size, setSize] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(10);

  const history = useHistory();

  useEffect(() => {

    $('#MainHeader').show();
    $('#MainFooter').show();

    scroll(0, 0);

    setCreationId(props.match.params.creationId);

    let user;

    if (storageService.getItem('brickground-user')) {

        user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined) {
          setUserId(user.userId);
          setUserName(user.userName);
          setUserNickname(user.userNickname);
        }
    }

    getCreationData();

    if(user != undefined)
      getCreationLikeData(props.match.params.creationId, user.userId);

  }, [props.match.params.creationId]);


  const getCreationData = () => {

    console.log('creationId : ', props.match.params.creationId);

    let url = SOPOONG_URL + SHOP_URL + '/creation.do?creationId=' + props.match.params.creationId;

    fetch( url )
      .then(response => response.json())
      .then(data=> {
                      console.log(data);

                      setCreation(data);
                      setLikeCount(data.likeCount);
                      setCommentCount(data.commentCount);
                      setCreateDate(data.createDate.substring(0, 10));

                      if(data.coverImage != null) {
                        setCoverImage(data.coverImage.replace(".", "_m."));
                      }

                      if(data.setNames != null) {

                        var setName = "";

                        var names = data.setNames.split(',');

                        setName += getSetName(Number(names[0]));

                        if(names.length > 1)
                          setName += " + " + getSetName(Number(names[1]));

                        setSetNames(setName);
                      }


                      var rootId = data.rootId;
                      if(rootId == 0)
                        rootId = data.creationId;

                      getCreationOriginData(rootId);
                      getCreationRemixsData(rootId, currentPage, size);

                    })
      .catch(err => console.log(err));

  };

  const getCreationLikeData = (creationId, userId) => {

    console.log('creationId : ', props.match.params.creationId);

    let url = SOPOONG_URL + SHOP_URL + '/creationLike.do?';
    url += 'creationId=' + creationId;
    url += '&userId=' + userId;

    fetch( url )
      .then(response => response.json())
      .then(data=> {
                      console.log(data);

                      if(data.likeType == 1)
                        setLikeThemeType("filled");
                      else
                        setLikeThemeType("outlined");
                    })
      .catch(err => console.log(err));

  };


  const getCreationOriginData = (rootId) => {

    var searchUrl = SOPOONG_URL + SHOP_URL + '/creation.do?' + 'creationId=' + rootId ;

    fetch(
      searchUrl
    ).then(res => res.json())
     .then(data => {
                    console.log(data);
                    setCreationOrigin(data);
                  })
     .catch(err => console.log(err));

  };

  const getCreationRemixsData = (rootId, page, size) => {

    var searchUrl = SOPOONG_URL + SHOP_URL + '/creationRemixs.do?' + 'rootId=' + rootId ;
    searchUrl += '&page=' + (page - 1) + '&size=' + size;


    fetch(
      searchUrl
    ).then(res => res.json())
     .then(json => {
                    console.log(json);
                    setCreationRemixList(Object.assign(json));
                  })
     .catch(err => console.log(err));

  };



  const getSetName = (name) => {

    var setName = "";

    if(name == 2000471)
      setName = "BricQ 모션 에센셜 개인 학습 키트";
    else if(name == 2000471)
      setName = "BricQ 모션 프라임 개인 학습 키트";
    else if(name == 45401)
      setName = "BricQ 모션 에센셜 세트";
    else if(name == 45400)
      setName = "BricQ 모션 프라임 세트";
    else if(name == 45678)
      setName = "스파이크 프라임 코어 세트";
    else if(name == 51515)
      setName = "로봇 인벤터 세트";
    else if(name == 45544)
      setName = "마인드스톰 EV3";
    else if(name == 45680)
      setName = "프라임 확장세트";
    else if(name == 45680)
      setName = "EV3 확장세트";

    return setName;

  }




  const onTabChange = (key) => {
    console.log(key);

  };


  const doLike = () => {

    if(userId == 0) {
      history.push(LOGIN_PATH);
    }
    else {
      let url = SOPOONG_URL + SHOP_URL + '/creationLikeUpdate.do';

      let likeType = 0;
      if(likeThemeType == "outlined")
        likeType = 1;

      let params = { creationId: creationId,
                      userId: userId,
                      likeType: likeType
                    };

      fetch( url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(params)
      } )
        .then(response => response.json())
        .then(data=> {
                        setCreation(data);
                        setLikeCount(data.likeCount);
                        setCommentCount(data.commentCount);

                        getCreationLikeData(creationId, userId)

                      })
        .catch(err => console.log(err));
    }

  };


  const doCopy = (text) => {
        // 흐름 1.
    if (!document.queryCommandSupported("copy")) {
      return alert("복사하기가 지원되지 않는 브라우저입니다.");
    }

    // 흐름 2.
    const textarea = document.createElement("textarea");
    textarea.value = text;
    //textarea.style.top = 0;
    //textarea.style.left = 0;
    textarea.style.position = "fixed";

    // 흐름 3.
    document.body.appendChild(textarea);
    // focus() -> 사파리 브라우저 서포팅
    textarea.focus();
    // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
    textarea.select();
    // 흐름 4.
    document.execCommand("copy");
    // 흐름 5.
    document.body.removeChild(textarea);
    alert("클립보드에 복사되었습니다.");
  };


  const editCreation = () => {
    history.push(CREATION_EDITOR_PATH + '/' + creation.creationId);
  }

  const copyCreation = () => {

    let url = SOPOONG_URL + SHOP_URL + '/creationCopy.do';

    let params = {
                  creationId: creation.creationId,
                  userId: userId,
                  userName: userNickname
                };

    fetch( url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(params)
    } )
      .then(response => response.json())
      .then(data => {
                      console.log(data);
                      //history.push(VR_MALLS_PATH);
                      history.push(CREATIONS_PATH);
                    })
      .catch(err => console.log(err));

  }

  const deleteCreation = () => {

    let url = SOPOONG_URL + SHOP_URL + '/creationDelete.do';

    let params = {
                  creationId: creation.creationId,
                };

    fetch( url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(params)
    } )
      .then(response => response.json())
      .then(data => {
                      console.log(data);
                      //history.push(VR_MALLS_PATH);
                      history.push(CREATIONS_PATH);
                    })
      .catch(err => console.log(err));

  }

  const handleDeleteCreation = () => {
    console.log("창작품 삭제");

    ConfirmModal('창작품을 삭제하시겠습니까?', deleteCreation);
  };



  const { TabPane } = Tabs;

  const genViewCount = () => {

    return (
              <Tooltip title="조회수">
                <Icon
                  type="read"
                /> {creation.viewCount}
              </Tooltip>
            );

  };

  const genLikeCount = () => {

    return (
              <Tooltip title="추천하기">
                <span onClick={()=>doLike()}>
                  <Icon
                    type="heart"
                    theme={likeThemeType}
                    style={{cursor: 'pointer'}}
                  /> {likeCount}
                </span>
              </Tooltip>
            );

  };

  const genShareCount = () => {

    return (
              <Tooltip title="링크 복사하기">
                <span onClick={()=>doCopy(window.location.href)}>
                  <Icon
                    type="share-alt"
                    style={{cursor: 'pointer'}}
                  />
                </span>
              </Tooltip>
            );

  };

  const genCloneCount = () => {

    return (
              <Tooltip title="리믹스된 작품수">
                <Icon
                  type="apartment"
                /> {creation.cloneCount}
              </Tooltip>
            );

  };

  const genCommentCount = () => {

    return (
              <Tooltip title="댓글/답글수">
                <Icon
                  type="message"
                /> {commentCount}
              </Tooltip>
            );

  };

  const genBlacklistMenu = () => {

    return (
              <Tooltip title="신고하기">
                <span style={{cursor: 'pointer'}} onClick={()=> {if(userId == 0) history.push(LOGIN_PATH); else setVisibleAddBlacklistConfirm(true);}}>
                  <Icon
                    type="alert"
                  /> 신고하기
                </span>
              </Tooltip>
            );

  };



  const getCommunity = () => {
    return (
      <Row style={{ paddingLeft: '40px'}}>
        <Row style={{paddingTop: '25px', fontSize: '20px', fontWeight: 'bold', lineHeight: '34px'}}  id='title-class-community'>
          댓글/답글 쓰기
        </Row>
        <CreationCommunityComponent
                                  creationId={creation.creationId}
                                  onRefresh={getCreationData}
        ></CreationCommunityComponent>
      </Row>
    );
  };


  const getOrigin = () => {
    return (
      <Row style={{ paddingLeft: '40px'}}>
        <Row style={{paddingTop: '25px', fontSize: '20px', fontWeight: 'bold', lineHeight: '34px'}}  id='title-class-remix'>
          원본 작품
        </Row>
        <Row>
          <CreationRemixCard
            key={creationOrigin.creationId}
            creation={creationOrigin}
          />
        </Row>
      </Row>
    );
  };

  const getRemix = () => {
    return (
      <Row style={{ paddingLeft: '40px'}}>
        <Row style={{paddingTop: '25px', fontSize: '20px', fontWeight: 'bold', lineHeight: '34px'}}  id='title-class-remix'>
          리믹스 작품
        </Row>
        <Row>
          {creationRemixList ? (
            creationRemixList.map(creationRemix => { return (
                <CreationRemixCard
                  key={creationRemix.creationId}
                  creation={creationRemix}
                />
            )})
          ) : (
            <Empty />
          )}

        </Row>
      </Row>
    );
  };

  const genModifyExtra = () => {

    if (storageService.getItem('brickground-user')) {

      var user = JSON.parse( storageService.getItem('brickground-user') as string );

      if(user != undefined) {

        if(user.userId == creation.userId || user.role > 8) {
          return (<Row type="flex" justify="end" style={{marginTop:"10px", marginRight:"10px"}}>
                    <Tooltip title="수정하기">
                      <Button shape="circle" icon="edit" size="small" onClick={editCreation} />
                    </Tooltip>
                    <Tooltip title="복사하기">
                      <Button shape="circle" icon="copy" size="small" onClick={copyCreation} style={{marginLeft:'10px', marginRight:'10px'}}/>
                    </Tooltip>
                    <Tooltip title="삭제하기">
                      <Button shape="circle" icon="delete" size="small" onClick={handleDeleteCreation} />
                    </Tooltip>
                  </Row>);
        }
        else {
          return (<Row type="flex" justify="end" style={{marginTop:"10px", marginRight:"10px"}}>
                    <Tooltip title="복사하기">
                      <Button shape="circle" icon="copy" size="small" onClick={copyCreation} />
                    </Tooltip>
                  </Row>);
        }
      }
    }

    return (<Row></Row>);

  };


  const getHtml = (id, content) => {

    //$('#content-course-introduce').html(text);
    let element = document.getElementById(id);

    if(element != null && content != undefined)
      element.innerHTML = content;

    return ;
  }


   return (
     <>

      <Row>
        <Col md={16} xs={24}>
          <Row style={{textAlign: 'center', paddingTop: '40px', paddingBottom: '20px'}}>
            <Link to={`${CREATION_VIEW_PATH}/${creation.creationId}`}>
              <img
                id ={creation.creationId}
                src={creation.coverImage}
                style={{ width: '100%', height: '100%', maxWidth: '480px', maxHeight: '400px', margin: '0 auto', borderRadius: '10px' }}
              />
            </Link>
          </Row>
          <Row type="flex" justify="center" style={{ fontSize: '16px' }}>
            <Col>
              {genLikeCount()}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {genViewCount()}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {genCommentCount()}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {genCloneCount()}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {genShareCount()}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {genBlacklistMenu()}
            </Col>
          </Row>
        </Col>
        <Col md={8} xs={24}>
          {genModifyExtra()}
          <div style={{ maxHeight: '480px', borderLeft: '1px solid #d9dadb', padding: '20px 0px 30px 40px'}}>
            <div>
              <span style={{ fontSize: '16px'}} >작품명</span> &nbsp;&nbsp;
              <span style={{ fontSize: '16px', fontWeight: 800}}>{creation.creationName} </span>
            </div>
            <div style={{marginTop: '15px'}}>
              <span style={{ fontSize: '16px'}} >창작자</span> &nbsp;&nbsp;
              <span style={{ fontSize: '16px', fontWeight: 800}}>{creation.userName}</span>
            </div>
            <div style={{marginTop: '15px'}}>
              <span style={{ fontSize: '16px'}} >창작일</span> &nbsp;&nbsp;
              <span style={{ fontSize: '15px', fontWeight: 600}}>{createDate}</span>
            </div>
            <div style={{marginTop: '15px'}}>
              <span style={{ fontSize: '16px'}} >세트명</span> &nbsp;&nbsp;
              <span style={{ fontSize: '15px', fontWeight: 600}}>{setNames}</span>
            </div>
            <div style={{marginTop: '15px'}}>
              <span style={{ fontSize: '16px'}} >설명</span> &nbsp;&nbsp;
            </div>
            <div style={{marginTop: '5px'}}>
                {getHtml('creation-description', creation.description)}
                <div id='creation-description' className='ck-content' style={{width: '95%', height: '300px', overflow: 'auto', backgroundColor: 'rgba(77, 151, 255, 0.1)'}}/>
            </div>
          </div>

        </Col>
      </Row>

      <Divider />

      <Row style={{ marginTop: '20px', paddingBottom: '20px'}}>
        <Col md={20} xs={24}>
          {getCommunity()}
        </Col>
        <Col md={4} xs={24}>
          {getOrigin()}
          {getRemix()}
        </Col>
      </Row>


      <br/>
      <br/>

      <BlacklistAddDialog
                    userId={userId}
                    userName={userName}
                    creation={creation}
                    visibleAddBlacklistConfirm={visibleAddBlacklistConfirm}
                    handleCancelBlacklistConfirm={value => setVisibleAddBlacklistConfirm(value)}

      />

    </>
  );

};
