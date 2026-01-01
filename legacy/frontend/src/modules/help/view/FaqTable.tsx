import React, { useState, useCallback, FC, useEffect } from 'react';
import { Table, Pagination } from 'antd';

import { SOPOONG_URL, SHOP_URL, SHOP_ID } from 'common';
import { FaqInput } from '.';

export const FaqTable = props => {

  const { userId, userRole } = props;

  const [faqList, setFaqList] = useState<any[]>([]);
  const [size, setSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(10);

  useEffect(() => {
    getFaqCount();
  }, []);

  const getFaqsData = (page, pageSize) => {

    console.log('page : ' + page + ' , pageSize : ' + pageSize);

    //var searchUrl = 'http://localhost/lianmall/faqs.do?' + 'shopId=' + SHOP_ID ;
    var searchUrl = SOPOONG_URL + SHOP_URL + '/faqs.do?' + 'shopId=' + SHOP_ID ;
    searchUrl += '&page=' + (page - 1) + '&size=' + size;

    fetch(
      searchUrl
    ).then(response => response.json())
     .then(data => {
                    console.log(data);
                    setFaqList(Object.assign(data));
                  })
     .catch(err => console.log(err));

  };


  const getFaqCount = () => {

    var searchUrl = SOPOONG_URL + SHOP_URL + '/faqCount.do';

    fetch(
      searchUrl
    ).then(response => response.json())
     .then(data => {
                      console.log(data);
                      setTotalCount(data);
                      getFaqsData(currentPage, size);
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
      dataIndex: 'faqId',
      align: 'center' as 'center',
      width: '10%',
    },
    {
      title: '분류',
      dataIndex: 'faqType',
      align: 'center' as 'center',
      width: '20%',
      render: text => {
        if(text == 'order')
          return '주문/결제';
        else if(text == 'delivery')
          return '배송';
      }
    },
    {
      title: '제목',
      dataIndex: 'faqTitle',
      align: 'left' as 'left',
    },

  ];

  const getFaqInput = () => {
    if(userRole == 9)
      return (<div>
                <FaqInput> </FaqInput>
              </div>);
  }


  return (
    <>
      { getFaqInput() }
      <Table
        rowKey='faqId'
        columns={columns}
        dataSource={faqList}
        pagination = {false}
        expandedRowRender={record => <p style={{ margin: 0 }}>{record.faqDescription}</p>}
      />
      <Pagination defaultCurrent={currentPage} total={totalCount} onChange={getFaqsData} style={{float: 'right', margin: '16px'}}/>
    </>
  );
};
