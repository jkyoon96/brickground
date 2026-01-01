import React, { useState, useCallback, FC, useEffect, CSSProperties  } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Button, Table, InputNumber, Input, Tag, Row, Col, Pagination, Select, DatePicker, Anchor, Divider, Icon, Modal } from 'antd';
import $ from 'jquery';
import moment from 'moment';

import { SOPOONG_URL, SHOP_URL, LOGIN_PATH, storageService } from 'common';

export const CreationCommunityComponent = (props) => {

  const { creationId, onRefresh} = props;

  const [userId, setUserId] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [userNickname, setUserNickname] = useState<string>('');
  const [shopId, setShopId] = useState<number>(0);

  const [creationComments, setCreationComments] = useState<any>([]);
  const [comment, setComment] = useState<string>("");
  const [commentReply, setCommentReply] = useState<string>("");

  const history = useHistory();


  useEffect(() => {

    scroll(0, 0);

    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined) {
          setUserId(user.userId);
          setUserName(user.userName);
          setUserNickname(user.userNickname);
          setShopId(user.shopId);
        }
    }

    if(creationId > 0)
      getCommentData();

  }, [props.creationId]);



  const createComment = () => {

    if(userId == 0)
      history.push(LOGIN_PATH);

    if(comment.length == 0)
      return;

    let url = SOPOONG_URL + SHOP_URL + '/creationComment.do';

    let params = { creationId: creationId,
                    userId: userId,
                    userName: userNickname,
                    content: comment
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
                      setComment('');
                      console.log(data);
                      getCommentData();
                      onRefresh();
                    })
      .catch(err => console.log(err));

  };


  const createCommentReply = (creationCommentId) => {

    if(userId == 0)
      history.push(LOGIN_PATH);

    if(commentReply.length == 0)
      return;

    let url = SOPOONG_URL + SHOP_URL + '/creationCommentReply.do';

    let params = { creationCommentId: creationCommentId,
                    userId: userId,
                    userName: userNickname,
                    content: commentReply
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
                      setComment('');
                      console.log(data);
                      getCommentData();
                      onRefresh();
                    })
      .catch(err => console.log(err));

  };


  const getCommentData = () => {

    let searchUrl = SOPOONG_URL + SHOP_URL + '/creationComments.do?' + 'creationId=' + creationId ;

    fetch(
      searchUrl
    ).then(response => response.json())
     .then(data => {
                      console.log(data);
                      setCreationComments(data);
                    })
      .catch(err => console.log(err));

  };

  const contentStyle:CSSProperties = {marginTop: '10px', fontSize: '14px', lineHeight: '24px'};

  return (
    <Row style={contentStyle}>
      <Col span={24}>
        <Row type='flex' align='middle' justify='center' >
          <Col span={24} style={{height: '46px'}}>
            <Input
              addonBefore={<Icon type="edit" />}
              addonAfter={<Icon type="caret-right" onClick={()=>createComment()} />}
              placeholder="댓글을 입력해주세요."
              style={{height: '40px', width: '99%'}}
              value={comment}
              onChange={e => {
                                if(userId == 0)
                                  history.push(LOGIN_PATH);

                                setComment(e.target.value);
                              }
                        }
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {creationComments ? (
              creationComments.map(creationComment => (
                <Row key={creationComment.creationCommentId}>
                  <Divider style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}}/>
                  <Col lg={24} md={24} xs={24}>
                    <Row style={{fontSize: '14px', fontWeight: 300}}>
                      <Col offset={1} lg={23} md={23} xs={23}>
                        <Row style={{fontSize: '12px', fontWeight: 300}}>
                          <Icon type="user" />&nbsp;{creationComment.userName}&nbsp;&nbsp;&nbsp;&nbsp;{creationComment.createDate.substring(0, 10)}
                        </Row>
                        <Row>
                          {creationComment.content}&nbsp;
                          <Icon
                            type="form"
                            style={{ width: '18px', height:'18px'}}
                            onClick={()=> $('#' + creationComment.creationCommentId).show()}
                          />
                        </Row>
                      </Col>
                      <div id={creationComment.creationCommentId} style={{display: "none"}}>
                        <Col offset={1} lg={22} md={22} xs={22}>
                          <Input
                            addonBefore={<Icon type="right" />}
                            addonAfter={<Icon type="caret-right" onClick={()=>createCommentReply(creationComment.creationCommentId)} />}
                            placeholder="답글을 입력해주세요."
                            style={{height: '40px', width: '99%', marginTop: '5px'}}
                            onChange={e => {
                                              if(userId == 0)
                                                history.push(LOGIN_PATH);

                                              setCommentReply(e.target.value);
                                            }
                                      }
                          />
                        </Col>
                      </div>
                    </Row>
                    <Row>
                      <Col span={24}>
                        { creationComment.replies? (
                          creationComment.replies.map(reply => (
                            <Row key={reply.creationCommentReplyId}>
                              <Row style={{marginTop: '5px', paddingLeft: '10px', fontSize: '14px', fontWeight: 300}}>
                                <Col offset={2} lg={22} md={22} xs={22}>
                                  <Row style={{fontSize: '12px', fontWeight: 300}}>
                                    <Icon type="user" />&nbsp;{reply.userName}&nbsp;&nbsp;&nbsp;&nbsp;{reply.createDate.substring(0, 10)}
                                  </Row>
                                  <Row>
                                    {reply.content}
                                  </Row>
                                </Col>
                              </Row>
                            </Row>
                          ))
                        ) : (
                          <div />
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ))
            ) : (
              <div />
            )}

          </Col>
        </Row>
      </Col>
    </Row>
  );
}
