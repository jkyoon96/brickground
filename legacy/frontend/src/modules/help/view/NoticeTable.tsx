import React, { useState, useCallback, FC, useEffect } from 'react';
import { Table, Pagination } from 'antd';

import { SOPOONG_URL, SHOP_URL, SHOP_ID } from 'common';
import { NoticeInput } from '.';

export const NoticeTable = props => {

  const { userId, userRole } = props;

  const [noticeList, setNoticeList] = useState<any[]>([]);
  const [size, setSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(10);

  useEffect(() => {

    getNoticeCount();
  }, []);

  const getNoticesData = (page, pageSize) => {

    console.log('page : ' + page + ' , pageSize : ' + pageSize);

    var searchUrl = SOPOONG_URL + SHOP_URL + '/notices.do?' + 'shopId=' + SHOP_ID ;
    searchUrl += '&page=' + (page - 1) + '&size=' + size;

    fetch(
      searchUrl
    ).then(response => response.json())
     .then(data => {
                    console.log(data);
                    setNoticeList(Object.assign(data));
                  })
     .catch(err => console.log(err));

  };


  const getNoticeCount = () => {

    var searchUrl = SOPOONG_URL + SHOP_URL + '/noticeCount.do';

    fetch(
      searchUrl
    ).then(response => response.json())
     .then(data => {
                      console.log(data);
                      setTotalCount(data);
                      getNoticesData(currentPage, size);
                     })
     .catch(err => console.log(err));

  };


  const dataSource = [
    {
      key: 1,
      noticeType: '일반',
      noticeDate: '2020-06-01',
      noticeTitle: '개인정보처리방침 안내',
      noticeDescription: '개인정보처리방침에 대하여 알려드립니다.'
    },
    {
      key: 2,
      noticeType: '일반',
      noticeDate: '2020-06-03',
      noticeTitle: '사이트 이용 일시 중단',
      noticeDescription: '고객님들께 보다 나은 서비스 제공을 위한 시스템 점검으로 인해 일시적으로 사이트 이용이 불가하오니 양해부탁드립니다.'
    },
    {
      key: 3,
      noticeType: '일반',
      noticeDate: '2020-06-05',
      noticeTitle: '구매회원약관 안내',
      noticeDescription: '구매회원 약관에 대하여 알려드립니다.'
    },
  ];

  const columns = [
    {
      title: '번호',
      dataIndex: 'noticeId',
      align: 'center' as 'center',
      width: '10%',
    },
    {
      title: '공지분류',
      dataIndex: 'noticeType',
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
      title: '공지일자',
      dataIndex: 'createDate',
      align: 'center' as 'center',
      width: '20%',
      render: text => text.substring(0, 10)
    },
    {
      title: '공지내용',
      dataIndex: 'noticeTitle',
      align: 'left' as 'left',
    },

  ];

  const getNoticeInput = () => {
    if(userRole == 9)
      return (<div>
                <NoticeInput> </NoticeInput>
              </div>);
  }

  return (
    <>
      { getNoticeInput() }
      <Table
        rowKey='noticeId'
        columns={columns}
        dataSource={noticeList}
        pagination = {false}
        expandedRowRender={record => <p style={{ margin: 0 }}>{record.noticeDescription}</p>}
      />
      <Pagination defaultCurrent={currentPage} total={totalCount} onChange={getNoticesData} style={{float: 'right', margin: '16px'}}/>
    </>
  );
};
