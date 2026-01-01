import React, { useState, useCallback, FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Button, Pagination } from 'antd';
import $ from 'jquery';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, LOGIN_PATH, storageService } from 'common';
import { QnaInput, QnaAnswerInput } from '.';

export const QnaTable = props => {

  const { userId, currentMenu } = props;
  const [qnaList, setQnaList] = useState<any[]>([]);
  const [size, setSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(10);

  const history = useHistory();

  useEffect(() => {

    if(currentMenu == 'qna') {
      if (userId != -1) {
        getQnaCount(userId);
      }
      else {
        //location.href = LOGIN_PATH;
        history.push(LOGIN_PATH);
      }
    }

  }, [userId, currentMenu]);

  const getQnasData = (userId, page, pageSize) => {

    console.log('page : ' + page + ' , pageSize : ' + pageSize);

    var searchUrl = SOPOONG_URL + SHOP_URL + '/qnas.do?' + 'shopId=' + SHOP_ID ;
    searchUrl += '&userId=' + userId;
    searchUrl += '&page=' + (page - 1) + '&size=' + size;

    fetch(
      searchUrl
    ).then(response => response.json())
     .then(data => {
                    console.log(data);
                    setQnaList(Object.assign(data));
                  })
     .catch(err => console.log(err));

  };


  const getQnaCount = (userId) => {

    var searchUrl = SOPOONG_URL + SHOP_URL + '/qnaCount.do';
    searchUrl += '?userId=' + userId;

    fetch(
      searchUrl
    ).then(response => response.json())
     .then(data => {
                      console.log(data);
                      setTotalCount(data);
                      getQnasData(userId, currentPage, size);
                     })
     .catch(err => console.log(err));

  };

  const dataSource = [
    {
      key: 1,
      faqType: '주문/거래',
      faqTitle: '상품주문은 어떻게 하나요?',
      faqDescription: '주문결제 페이지에서 상품정보, 옵션이 맞는지 다시 한번 확인해 주세요. 배송지 정보, 결제정보 입력 후 결제하기 버튼을 누르면 주문이 완료됩니다.'
    },
    {
      key: 2,
      faqType: '주문/거래',
      faqTitle: '주문번호는 어디서 확인하나요?',
      faqDescription: '마이페이지 > 주문내역 메뉴에서 확인할 수 있습니다.'
    },
    {
      key: 3,
      faqType: '주문/거래',
      faqTitle: '구구매내역은 어디서 확인할 수 있나요?',
      faqDescription: '마이페이지 > 주문내역 메뉴에서 확인할 수 있습니다.'
    },
  ];

  const columns = [
    {
      title: '번호',
      dataIndex: 'qnaId',
      align: 'center' as 'center',
      width: '10%',
    },
    {
      title: '분류',
      dataIndex: 'qnaType',
      align: 'center' as 'center',
      width: '10%',
      render: text => {
        if(text == 'common')
          return '일반';
        else if(text == 'order')
          return '주문/결제';
        else if(text == 'delivery')
          return '배송';
      }
    },
    {
      title: '문의일자',
      dataIndex: 'createDate',
      align: 'center' as 'center',
      width: '20%',
      render: text => text.substring(0, 10)
    },
    {
      title: '제목',
      dataIndex: 'qnaTitle',
      align: 'left' as 'left',
    },
    {
      title: '',
      dataIndex: '',
      key: 'delete',
      render: () => <a>삭제하기</a>,
    },

  ];


  return (
    <>
      <div>
        <QnaInput> </QnaInput>
      </div>
      <div>
        <Table
          rowKey='qnaId'
          columns={columns}
          dataSource={qnaList}
          pagination = {false}
          expandedRowRender={record => {
            if(record.qnaState == 'W')
              return (
                      <div>
                        <div style={{ marginTop: '10px', padding: '10px', border: '1px solid rgba(0, 0, 0, .1) ', borderRadius: '5px'}}>
                          <p>{record.qnaQuestion}</p>
                        </div>
                        <div id='answerButton' style={{ marginTop: '26px', textAlign: 'center'}}>
                          <Button type="primary" onClick={()=> $('#answerContainer').show()} style={{width: '200px', height: '40px', fontSize: '14px',  fontWeight: 600, borderRadius: '5px'}}>
                            답변하기
                          </Button>
                        </div>
                        <div id='answerContainer' style={{display: 'none'}}>
                          <div>
                            <QnaAnswerInput record={record}> </QnaAnswerInput>
                          </div>
                        </div>
                      </div>
                    );
              else if(record.qnaState == 'C')
                return (
                  <div>
                    <div style={{ marginTop: '10px', padding: '10px', border: '1px solid rgba(0, 0, 0, .1) ', borderRadius: '5px'}}>
                      <p style={{fontWeight: 'bold'}}> [질문] </p> <p>{record.qnaQuestion}</p>
                    </div>
                    <div id='answerContent' style={{  marginTop: '10px', padding: '10px', border: '1px solid rgba(0, 0, 0, .1) ', borderRadius: '5px'}}>
                      <p style={{fontWeight: 'bold'}}> [답변] </p> <p>{record.qnaAnswer}</p>
                    </div>
                  </div>
                );
            }
          }
        />
        <Pagination defaultCurrent={currentPage} total={totalCount} onChange={(page, size) => getQnasData(userId, page, size)} style={{float: 'right', margin: '16px'}} />
      </div>
    </>
  );
};
