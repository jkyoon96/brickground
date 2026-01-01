import React, { useState, useCallback, FC, useEffect } from 'react';
import $ from 'jquery';
import { Button, Table, InputNumber, Input, Tag, Row, Col, Pagination, Select } from 'antd';
import CKEditor from '@ckeditor/ckeditor5-react';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';

import { SOPOONG_URL, SHOP_URL } from 'common';
import { PriceLabel } from 'components/PriceLabel';
import { ProductAddDialog } from '.';


/**
 * @description Cart페이지에서 장바구니 제품를 표시해 주는 테이블
 */
export const ProductManagementTable = (props) => {

  const { userId, shopId, tabKey } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [productSetName, setProductSetName] = useState<string>("none");
  const [price, setPrice] = useState<number>(-1);
  const [remainder, setRemainder] = useState<number>(-1);
  const [description, setDescription] = useState<string>("none");
  const [categoryId, setCategoryId] = useState<number>(-1);
  const [levelId, setLevelId] = useState<number>(-1);
  const [coverImage, setCoverImage] = useState<string>("none");
  const [vrModelName, setVrModelName] = useState<string>("none");
  const [visible, setVisible] = useState<number>(-1);

  const [size, setSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(10);

  const [visibleAddProductConfirm, setVisibleAddProductConfirm] = useState<boolean>(false);

  useEffect(() => {

    if(tabKey == "product-management") {
      getProductCount();
    }

  }, [tabKey]);

  const getProductCount = () => {

    var searchUrl = SOPOONG_URL + SHOP_URL + '/productCountByShopId.do?shopId=' + shopId;

    fetch(
      searchUrl
    ).then(response => response.json())
     .then(data => {
                      console.log(data);

                      setProductSetName("none");
                      setPrice(-1);
                      setRemainder(-1);
                      setDescription("none");
                      setCategoryId(-1);
                      setLevelId(-1);
                      setCoverImage("none");
                      setVrModelName("none");

                      setTotalCount(data);
                      getProductList(currentPage, size);
                     })
     .catch(err => console.log(err));

  };

  const getProductList = (page, pageSize) => {

    let searchUrl = SOPOONG_URL + SHOP_URL + '/products.do?' + 'shopId=' + shopId ;
    searchUrl += '&page=' + (page - 1) + '&size=' + size;

    fetch( searchUrl )
      .then(response => response.json())
      .then(data => {
                      console.log(data);

                      if(data != undefined && data.length > 0) {
                        setDataSource(data);
                      }



                    })
      .catch(err => console.log(err));
  }

  const updateProduct = (record) => {

    let url = SOPOONG_URL + SHOP_URL + '/productUpdate.do';

    let params = JSON.parse(JSON.stringify(record));

    if(productSetName != "none")
      params.productSetName = productSetName;

    if(description != "none")
      params.description = description;

    if(price != -1)
      params.price = price;

    if(remainder != -1)
      params.remainder = remainder;

    if(categoryId != -1)
      params.categoryId = categoryId;

    if(levelId != -1)
      params.levelId = levelId;

    if(coverImage != "none")
      params.coverImage = coverImage;

    if(visible != -1)
      params.visible = visible;

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
                      getProductCount();
                    })
      .catch(err => console.log(err));

  }

  const uploadCoverImage = () => {

    let uploadUrl = SOPOONG_URL + '/fileupload/insertThumbnailImage.do'

    var formData = new FormData();
    formData.append("imageFile", $("#coverImageFile")[0].files[0]);

    fetch( uploadUrl, {
      method: "POST",
      headers: {
      },
      body: formData
    } )
      .then(response => response.json())
      .then(data => {
                      console.log(data);
                      setCoverImage(data.url);

                      $("#coverImage").show();
                    })
      .catch(err => console.log(err));

  };

  const getTitle = () => {
    return (
      <Row style={{width: '500px', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
        <Col md={4} xs={4} >
          이미지
        </Col>
        <Col md={12} xs={12}>
          상품명
        </Col>
        <Col md={4} xs={4}>
          상품가격
        </Col>
        <Col md={4} xs={4}>
          잔여갯수
        </Col>

      </Row>
    );
  }

  const columns = [
    {
      title: '',
      dataIndex: 'productId',
      render: (text, record) => (
        <Row type='flex' align='middle' >
          <Col md={4} xs={4} >
            <img
              style={{ width: '40px', height: '40px', marginBottom: '10px' }}
              src={record.coverImage}
            />
          </Col>
          <Col md={12} xs={12}>
            {record.productName}
          </Col>

          <Col md={4} xs={4}>
            <PriceLabel value={record.price} strong={true} />
          </Col>

          <Col md={4} xs={4}>
            {record.remainder}
          </Col>

        </Row>
      ),
    },
  ];

  const { Option } = Select;

  const expandedRowRender = (record) => {

    return (
        <Row type='flex' justify='center'>
          <Col lg={24} md={24} xs={24}  style={{ margin: '20px', padding: '20px', width:'95%', border: 'solid 1px rgba(0, 0, 0, 0.4) ', borderRadius: '10px'}}>
            <Row type='flex' align='middle' justify='center' >
              <Col span={8} style={{height: '40px'}}>
                상품명
              </Col>
              <Col span={8} style={{backgroundColor: '#ffffff', height: '40px'}}>
                {record.productName}
              </Col>
            </Row>
            <Row type='flex' align='middle' justify='center' style={{marginTop: '10px'}} >
              <Col span={8} style={{height: '40px'}}>
                모델명
              </Col>
              <Col span={8} style={{backgroundColor: '#ffffff', height: '40px'}}>
                {record.vrModelName}
              </Col>
            </Row>
            <Row type='flex' align='middle' justify='center' >
              <Col span={8} style={{height: '40px'}}>
                상품세트 모델번호
              </Col>
              <Col span={8} style={{backgroundColor: '#ffffff', height: '40px'}}>
                <Input
                  placeholder=" 상품세트 모델번호 입력하세요."
                  style={{height: '40px', minWidth: '200px', maxWidth:'400px'}}
                  defaultValue={record.productSetName}
                  onChange={e => setProductSetName(e.target.value)}
                />
              </Col>
            </Row>
            <Row type='flex' align='middle' justify='center' style={{marginTop: '10px'}} >
              <Col span={8} style={{height: '40px'}}>
                등급
              </Col>
              <Col span={8} style={{backgroundColor: '#ffffff', height: '46px'}}>
                <Select defaultValue={record.levelId} style={{ height: '46px', width: '200px'}} onChange={value => setLevelId(value)}>
                  <Option value={101}>기초</Option>
                  <Option value={102}>초급</Option>
                  <Option value={103}>중급</Option>
                  <Option value={104}>고급</Option>
                </Select>
              </Col>
            </Row>
            <Row type='flex' align='middle' justify='center' style={{marginTop: '10px'}} >
              <Col span={8} style={{height: '40px'}}>
                카테고리
              </Col>
              <Col span={8} style={{backgroundColor: '#ffffff', height: '46px'}}>
                <Select defaultValue={record.categoryId} style={{ height: '46px', width: '200px'}} onChange={value => setCategoryId(value)}>
                  <Option value={101}>브릭</Option>
                  <Option value={102}>빔</Option>
                  <Option value={103}>연결</Option>
                  <Option value={104}>핀</Option>
                  <Option value={105}>축</Option>
                  <Option value={106}>기어</Option>
                  <Option value={107}>바퀴</Option>
                  <Option value={108}>전기</Option>
                  <Option value={201}>조립설명서</Option>
                  <Option value={301}>마인드스톰</Option>
                </Select>
              </Col>
            </Row>
            <Row type='flex' align='middle' justify='center' style={{marginTop: '10px'}} >
              <Col span={8} style={{height: '46px'}}>
                대표 이미지
              </Col>
              <Col span={8} style={{backgroundColor: '#ffffff', height: '46px', marginBottom: '7px'}}>
                <Input
                  type="file"
                  id="coverImageFile"
                  style={{height: '40px', width: '80%'}}
                  onChange={() => uploadCoverImage()}
                />
                <img id="coverImage" src={record.coverImage} style={{ marginLeft: '10px', height: '40px', width:'40px'}} />
              </Col>
            </Row>
            <Row type='flex' align='middle' justify='center' >
              <Col span={8} style={{height: '46px'}}>
                상품가격
              </Col>
              <Col span={8} style={{backgroundColor: '#ffffff', height: '46px'}}>
                <InputNumber
                  style={{height: '36px'}}
                  defaultValue={record.price}
                  min={0}
                  step={10}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + `원`}
                  onChange={value => {if(value != undefined) setPrice(value)}}
                />
              </Col>
            </Row>
            <Row type='flex' align='middle' justify='center' >
              <Col span={8} style={{height: '46px'}}>
                잔여갯수
              </Col>
              <Col span={8} style={{backgroundColor: '#ffffff', height: '46px'}}>
                <InputNumber
                  style={{height: '36px'}}
                  min={0}
                  step={1}
                  defaultValue={record.remainder}
                  onChange={value => {if(value != undefined) setRemainder(value)}}
                />
              </Col>
            </Row>
            <Row type='flex' align='middle' justify='center' >
              <Col span={8} style={{height: '46px'}}>
                화면보기
              </Col>
              <Col span={16} style={{backgroundColor: '#ffffff', height: '46px'}}>
                <Select value={record.visible} style={{ height: '46px', width: '200px' }} onChange={value => setVisible(value)}>
                  <Option value={0}>숨기기</Option>
                  <Option value={1}>보여주기</Option>
                </Select>
              </Col>
            </Row>
            <Row type='flex' align='middle' justify='center' >
              <Col span={24} style={{backgroundColor: '#ffffff', height: '600px'}}>
                <CKEditor
                    editor={ ClassicEditor }
                    data={record.description}
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setDescription(data);

                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                    config={{ckfinder: {
                      // Upload the images to the server using the CKFinder QuickUpload command.
                      uploadUrl: SOPOONG_URL + '/fileupload/insertProductImage.do'
                    }}}
                />
              </Col>
            </Row>
            <Row type='flex' align='middle'  justify='center' >
              <Col span={8}>
                <Button type="primary" onClick={()=>updateProduct(record)} style={{ marginTop: '10px', width:'100%', height: '50px', fontSize: '16px', fontWeight: 800, borderRadius: '10px'}}>
                  수정
                </Button>
              </Col>
            </Row>

          </Col>
        </Row>
      );

  };

  return (
    <>
      <Row type='flex' justify='end'>
        <Button  type="primary" onClick={()=>setVisibleAddProductConfirm(true)} style={{ marginBottom: 16 }}>
          상품추가
        </Button>
      </Row>
      <Row>
        <Table
          rowKey='productId'
          columns={columns}
          dataSource={dataSource}
          expandedRowRender={expandedRowRender}
          pagination={false}
        />
        <Pagination defaultCurrent={currentPage} total={totalCount} onChange={getProductList} style={{float: 'right', margin: '16px'}}/>
      </Row>
      <ProductAddDialog
        userId={userId}
        shopId={shopId}
        visibleAddProductConfirm={visibleAddProductConfirm}
        handleCancelAddProduct={()=>setVisibleAddProductConfirm(false)}
        handleRefreshProduct={()=>{setVisibleAddProductConfirm(false); getProductCount();}}
      />
    </>
  );
};
