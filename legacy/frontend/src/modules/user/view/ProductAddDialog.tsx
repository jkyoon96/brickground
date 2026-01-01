import React, { useState, useCallback, FC, useEffect } from 'react';
import { Button, Table, InputNumber, Input, Tag, Row, Col, Pagination, Select, Modal } from 'antd';
import $ from 'jquery';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, storageService  } from 'common';
import { PriceLabel } from 'components/PriceLabel';


export const ProductAddDialog= (props) => {

  const { userId, shopId, visibleAddProductConfirm, handleCancelAddProduct, handleRefreshProduct } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [productId, setProductId] = useState<number>(0);
  const [productType, setProductType] = useState<number>(0);
  const [productName, setProductName] = useState<string>('');
  const [productSetName, setProductSetName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number>(101);
  const [levelId, setLevelId] = useState<number>(101);
  const [price, setPrice] = useState<number>(0);
  const [vrModelName, setVrModelName] = useState<string>('');
  const [coverImage, setCoverImage] = useState<string>('');
  const [remainder, setRemainder] = useState<number>(0);
  const [visible, setVisible] = useState<number>(1);


  useEffect(() => {

    $("#coverImage2").hide();

  }, []);

  const createProduct = () => {

    let url = SOPOONG_URL + SHOP_URL + '/product.do';

    let params = {
                  shopId: Number.parseInt(SHOP_ID),
                  productType: productType,
                  productName: productName,
                  productSetName: productSetName,
                  levelId: levelId,
                  description: description,
                  categoryId: categoryId,
                  price: price,
                  vrModelName: vrModelName,
                  coverImage: coverImage,
                  remainder: remainder,
                  visible: visible
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
                    })
      .catch(err => console.log(err));

  }


  const uploadCoverImage = () => {

    let uploadUrl = SOPOONG_URL + '/fileupload/insertThumbnailImage.do'

    var formData = new FormData();
    formData.append("imageFile", $("#coverImageFile2")[0].files[0]);


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

                      $("#coverImage2").show();
                    })
      .catch(err => console.log(err));
  };


  const { Option } = Select;

  return (
      <Modal
        visible={visibleAddProductConfirm}
        closable={false}
        title="상품등록"
        width='800px'
        footer={[
                  <Button key="save_back" type='primary' onClick={() => { handleCancelAddProduct();} } >
                    취소하기
                  </Button>,
                  <Button key="save_submit" type='primary' onClick={e => {createProduct(); } } >
                    등록하기
                  </Button>,
                  <Button key="refresh_list" type='primary' onClick={() => { handleRefreshProduct();} } >
                    목록보기
                  </Button>,
                ]}
      >
        <Row type='flex' justify='center'>
          <Col lg={24} md={24} xs={24}  style={{ margin: '20px', padding: '20px', width:'95%', border: 'solid 1px rgba(0, 0, 0, 0.4) ', borderRadius: '10px'}}>
            <Row type='flex' align='middle' justify='center' >
              <Col span={8} style={{height: '40px'}}>
                상품명
              </Col>
              <Col span={16} style={{backgroundColor: '#ffffff', height: '40px'}}>
                <Input
                  placeholder=" 상품명 입력하세요."
                  style={{height: '40px', minWidth: '200px', maxWidth:'400px'}}
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                />
              </Col>
            </Row>
            <Row type='flex' align='middle' justify='center' style={{marginTop: '10px'}} >
              <Col span={8} style={{height: '40px'}}>
                모델명
              </Col>
              <Col span={16} style={{backgroundColor: '#ffffff', height: '40px'}}>
                <Input
                  placeholder=" 모델명 입력하세요."
                  style={{height: '40px', minWidth: '200px', maxWidth:'400px'}}
                  value={vrModelName}
                  onChange={e => setVrModelName(e.target.value)}
                />
              </Col>
            </Row>
            <Row type='flex' align='middle' justify='center' style={{marginTop: '10px'}}>
              <Col span={8} style={{height: '40px'}}>
                상품세트 모델번호
              </Col>
              <Col span={16} style={{backgroundColor: '#ffffff', height: '40px'}}>
                <Input
                  placeholder=" 상품세트 모델번호 입력하세요."
                  style={{height: '40px', minWidth: '200px', maxWidth:'400px'}}
                  value={productSetName}
                  onChange={e => setProductSetName(e.target.value)}
                />
              </Col>
            </Row>
            <Row type='flex' align='middle' justify='center' style={{marginTop: '10px'}} >
              <Col span={8} style={{height: '40px'}}>
                등급
              </Col>
              <Col span={16} style={{backgroundColor: '#ffffff', height: '46px'}}>
                <Select defaultValue={levelId} style={{ height: '46px', width: '200px'}} onChange={value => setLevelId(value)}>
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
              <Col span={16} style={{backgroundColor: '#ffffff', height: '46px'}}>
                <Select defaultValue={categoryId} style={{ height: '46px', width: '200px'}} onChange={value => setCategoryId(value)}>
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
              <Col span={16} style={{backgroundColor: '#ffffff', height: '46px', marginBottom: '7px'}}>
                <Input
                  type="file"
                  id="coverImageFile2"
                  style={{height: '40px', width: '80%'}}
                  onChange={() => uploadCoverImage()}
                />
                <img id="coverImage2" src={coverImage} style={{ marginLeft: '10px', height: '40px', width:'40px'}} />
              </Col>
            </Row>
            <Row type='flex' align='middle' justify='center' >
              <Col span={8} style={{height: '46px'}}>
                상품가격
              </Col>
              <Col span={16} style={{backgroundColor: '#ffffff', height: '46px'}}>
                <InputNumber
                  style={{height: '36px'}}
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
              <Col span={16} style={{backgroundColor: '#ffffff', height: '46px'}}>
                <InputNumber
                  style={{height: '36px'}}
                  min={0}
                  step={1}
                  onChange={value => {if(value != undefined) setRemainder(value)}}
                />
              </Col>
            </Row>
            <Row type='flex' align='middle' justify='center' >
              <Col span={8} style={{height: '46px'}}>
                화면보기
              </Col>
              <Col span={16} style={{backgroundColor: '#ffffff', height: '46px'}}>
                <Select value={visible} style={{ height: '46px', width: '200px' }} onChange={value => setVisible(value)}>
                  <Option value={0}>숨기기</Option>
                  <Option value={1}>보여주기</Option>
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    );

}
