import React, { useState, useCallback, FC, useEffect } from 'react';
import { useHistory} from 'react-router-dom';
import { Button, Table, InputNumber, Input, Tag, Row, Col, Pagination, Select, DatePicker, Modal } from 'antd';
import $ from 'jquery';
import moment from 'moment';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, VR_MALLS_PATH, storageService } from 'common';
import { InfoModal } from 'components';

export const ProductSetInfo = (props) => {

  const history = useHistory();

  const [productId, setProductId] = useState<number>(0);
  const [shopId, setShopId] = useState<number>(0);

  const [productType, setProductType] = useState<number>(0);
  const [productName, setProductName] = useState<string>('');
  const [productSetName, setProductSetName] = useState<string>('');
  const [coverImage, setCoverImage] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number>(101);
  const [subjectId, setSubjectId] = useState<number>(101);
  const [price, setPrice] = useState<number>(0);
  const [remainder, setRemainder] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [visible, setVisible] = useState<number>(1);

  const [levelId, setLevelId] = useState<number>(101);
  const [vrModelName, setVrModelName] = useState<string>('');

  const [createDate, setCreateDate] = useState<string>('');
  const [updateDate, setUpdateDate] = useState<string>('');

  const [visibleAlarmConfirm, setVisibleAlarmConfirm] = useState<boolean>(false);
  const [alarmMessage, setAlarmMessage] = useState<string>('');

  useEffect(() => {

    scroll(0, 0);

    if(props.match.params.productId != undefined && props.match.params.productId != 0)
      getProduct(props.match.params.productId);

    $("#coverImage").hide();


  }, [props.match.params.productId]);



  const getProduct = (productId) => {

      var searchUrl = SOPOONG_URL + SHOP_URL + '/product.do?' + 'productId=' + productId ;

      fetch(
        searchUrl
      ).then(response => response.json())
       .then(data => {
                      console.log(data);

                      if(data != undefined && data != null){

                        setProductId(data.productId);
                        setShopId(data.shopId);
                        setProductName(data.vrMallName);
                        setCoverImage(data.coverImage);

                        setSubjectId(data.subjectId);
                        setVisible(data.visible);

                        setPrice(data.price);
                        setRemainder(data.remainder);

                        if(data.description != null)
                          setDescription(data.description);

                        setCreateDate(data.createDate);
                        setUpdateDate(data.updateDate);

                        if(data.coverImage != undefined && data.coverImage != null) {
                          $("#coverImage").show();
                        }


                      }
                    })
       .catch(err => console.log(err));

  };


  const createProduct = () => {

    if (!storageService.getItem('brickground-user')){
      //setAlarmMessage('로그인후 저장하세요.')
      //setVisibleAlarmConfirm(true);
      InfoModal('warning', '알림', '로그인후 저장하세요.');
      return;
    }
    else if(productName === "") {
      //setAlarmMessage('상품명을 입력해주세요.')
      //setVisibleAlarmConfirm(true);
      InfoModal('warning', '알림', '상품명을 입력해주세요.');
      return;
    }
    else if(coverImage === "") {
      //setAlarmMessage('대표이미지를 저장해주세요.')
      //setVisibleAlarmConfirm(true);
      InfoModal('warning', '알림', '대표이미지를 저장해주세요.');
      return;
    }


    let url = SOPOONG_URL + SHOP_URL + '/product.do';

    let params = {
                  shopId: Number.parseInt(SHOP_ID),
                  productType: productType,
                  productName: productName,
                  productSetName: productSetName,
                  levelId: levelId,
                  description: description,
                  categoryId: categoryId,
                  subjectId: subjectId,
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



  const updateProduct = () => {

    let url = SOPOONG_URL + SHOP_URL + '/productUpdate.do';


    let params = {
                  productId: productId,
                  roductName: productName,
                  productSetName: productSetName,
                  levelId: levelId,
                  description: description,
                  categoryId: categoryId,
                  subjectId: subjectId,
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
                      history.push(VR_MALLS_PATH);
                    })
      .catch(err => console.log(err));

  };


  const uploadCoverImage = () => {

    let uploadUrl = SOPOONG_URL + '/fileupload/insertThumbnailImage.do'

    var formData = new FormData();
    formData.append("imageFile", $("#uploadCoverImageFile")[0].files[0]);

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



  const { Option } = Select;

  const editorConfiguration = {
      ckfinder: {
        // Upload the images to the server using the CKFinder QuickUpload command.
        uploadUrl: SOPOONG_URL + '/fileupload/insertProductImage.do'
      },

      toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|', 'alignment', 'fontBackgroundColor', 'fontColor', 'fontSize', '|', 'imageUpload','mediaEmbed', 'insertTable' ],
      image: {
            // Configure the available styles.
            styles: [
                'alignLeft', 'alignCenter', 'alignRight'
            ],

            // Configure the available image resize options.
            resizeOptions: [
                {
                    name: 'imageResize:original',
                    label: 'Original',
                    value: null
                },
                {
                    name: 'imageResize:50',
                    label: '50%',
                    value: '50'
                },
                {
                    name: 'imageResize:75',
                    label: '75%',
                    value: '75'
                }
            ],

            // You need to configure the image toolbar, too, so it shows the new style
            // buttons as well as the resize buttons.
            toolbar: [
                'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
                '|',
                'imageResize',
                '|',
                'imageTextAlternative'
            ]
        }

  };


  return (
      <Row type='flex' justify='center' className='productinfo-container'>
        <Col lg={24} md={24} xs={24}  style={{ margin: '20px', padding: '20px', width:'95%', border: 'solid 1px rgba(0, 0, 0, 0.4) ', borderRadius: '10px'}}>
          <Row type='flex' align='middle' justify='center' style={{ marginBottom: '7px'}}>
            <Col span={2} style={{fontWeight: 'bold'}}>
                상품명
            </Col>
            <Col span={22} style={{backgroundColor: '#ffffff', height: '40px'}}>
              <Input
                placeholder=" 상품명을 입력하세요."
                style={{height: '40px', minWidth: '200px', maxWidth:'400px'}}
                value={productName}
                onChange={e => setProductName(e.target.value)}
              />
            </Col>
          </Row>
          <Row type='flex' align='middle' justify='center' style={{ marginBottom: '7px'}}>
            <Col span={2} style={{fontWeight: 'bold'}}>
              대표 이미지
            </Col>
            <Col span={22} style={{backgroundColor: '#ffffff', height: '40px'}}>

              <Input
                type="file"
                id="uploadCoverImageFile"
                style={{height: '40px', minWidth: '200px', maxWidth:'400px'}}
                onChange={() => uploadCoverImage()}
              />
              <img id="coverImage" src={coverImage} style={{marginLeft: '10px', height: '40px', width:'40px'}} alt="대표 이미지" />
            </Col>
          </Row>

          <Row type='flex' align='middle' justify='center'  style={{ marginBottom: '7px'}}>
            <Col span={2} style={{fontWeight: 'bold'}}>
              상품 분류
            </Col>
            <Col span={22} style={{backgroundColor: '#ffffff', height: '40px' }}>
              <Select value={categoryId} style={{ height: '40px', width: '200px'}} onChange={value => setCategoryId(value)}>
                <Option value={101}>브릭 낱개</Option>
                <Option value={102}>패키지</Option>
              </Select>
            </Col>
          </Row>
          <Row type='flex' align='middle' justify='center'  style={{ marginBottom: '7px'}}>
            <Col span={2} style={{fontWeight: 'bold'}}>
              주제 분류
            </Col>
            <Col span={22} style={{backgroundColor: '#ffffff', height: '40px' }}>
              <Select value={subjectId} style={{ height: '40px', width: '200px'}} onChange={value => setSubjectId(value)}>
                <Option value={101}>인물</Option>
                <Option value={102}>풍경</Option>
                <Option value={103}>명화</Option>
                <Option value={104}>캐릭터</Option>
                <Option value={105}>식물</Option>
                <Option value={106}>동물</Option>
                <Option value={107}>이벤트</Option>
              </Select>
            </Col>
          </Row>
          <Row type='flex' align='middle' justify='center'  style={{ marginBottom: '7px'}}>
            <Col span={2} style={{fontWeight: 'bold'}}>
              상품가격
            </Col>
            <Col span={22} style={{backgroundColor: '#ffffff', height: '40px' }}>
              <InputNumber
                style={{height: '36px', width: '200px'}}
                min={0}
                step={10}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + `원`}
                onChange={value => {if(value != undefined) setPrice(value)}}
              />
            </Col>
          </Row>
          <Row type='flex' align='middle' justify='center'  style={{ marginBottom: '7px'}}>
            <Col span={2} style={{fontWeight: 'bold'}}>
              잔여갯수
            </Col>
            <Col span={22} style={{backgroundColor: '#ffffff', height: '40px' }}>
              <InputNumber
                style={{height: '36px', width: '200px'}}
                min={0}
                step={1}
                onChange={value => {if(value != undefined) setRemainder(value)}}
              />
            </Col>
          </Row>
          <Row type='flex' align='middle' justify='center' >
            <Col span={2} style={{fontWeight: 'bold'}}>
              상품 소개
            </Col>
            <Col span={22} style={{height: '40px'}}>
            </Col>
          </Row>
          <Row type='flex' align='middle' justify='center' style={{marginTop: '0px'}}>
            <Col span={24} style={{backgroundColor: '#ffffff'}}>
              <CKEditor
                  editor={ ClassicEditor }
                  data={description}
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
                  config={editorConfiguration}
              />
            </Col>
          </Row>
          <Row type='flex' align='middle'  justify='center' >
            <Col span={8}>
              <Button type="primary" onClick={()=>{if(shopId == 0) createProduct(); else updateProduct(); }} style={{ marginTop: '10px', width:'100%', height: '50px', fontSize: '16px', fontWeight: 800, borderRadius: '10px'}}>
                {(shopId == 0)?(<span>상품정보 등록</span>):(<span>상품정보 수정</span>)}
              </Button>
            </Col>
          </Row>

        </Col>
      </Row>
    );
}
