import React, { useState, useCallback, FC, useEffect } from 'react';
import { useHistory} from 'react-router-dom';
import { Button, Table, InputNumber, Input, Tag, Row, Col, Pagination, Select, Modal, DatePicker } from 'antd';
import $ from 'jquery';
import moment from 'moment';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, CREATIONS_PATH, storageService } from 'common';

export const CreationInfo = (props) => {

  const history = useHistory();

  const [userId, setUserId] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [userNickname, setUserNickname] = useState<string>('');

  const [creationId, setCreationId] = useState<number>(0);
  const [shopId, setShopId] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number>(101);
  const [creationName, setCreationName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [visible, setVisible] = useState<number>(1);
  const [coverImage, setCoverImage] = useState<string>('');
  const [videoData, setVideoData] = useState<string>('');
//const [setNames, setSetNames] = useState<string>('45678,45680');
  const [setName, setSetName] = useState<number>(45678);
  const [extSetName, setExtSetName] = useState<number>(0);
  const [setNames, setSetNames] = useState<number>(45678);
  const [extSetNames, setExtSetNames] = useState<number>(45680);

  const [viewCount, setViewCount] = useState<number>(0);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [shareCount, setShareCount] = useState<number>(0);
  const [cloneCount, setCloneCount] = useState<number>(0);
  const [commentCount, setCommentCount] = useState<number>(0);

  const [rootId, setRootId] = useState<number>(0);
  const [parentId, setParentId] = useState<number>(0);

  const [cameraPosition, setCameraPosition] = useState<string>('');
  const [cameraTarget, setCameraTarget] = useState<string>('');

  const [vrModels, setVrModels] = useState<string>('');
  const [createDate, setCreateDate] = useState<string>('');
  const [updateDate, setUpdateDate] = useState<string>('');

  const [visibleExtSetNameConfirm, setVisibleExtSetNameConfirm] = useState<boolean>(false);


  useEffect(() => {

    scroll(0, 0);

    if (storageService.getItem('brickground-user')) {

      var user = JSON.parse( storageService.getItem('brickground-user') as string );

      if(user != undefined) {

        var currentTime = (new Date()).getTime();

        if(currentTime - user.loginTime > 3600000) {
          storageService.removeItem('brickground-user');
          return;
        }

        setUserId(user.userId);
        setUserName(user.userName);
        setUserNickname(user.userNickname);
      }
    }

    if(props.match.params.creationId != undefined && props.match.params.creationId != 0)
      getCreation(props.match.params.creationId);

    $("#coverImage").hide();

  }, [props.match.params.creationId]);



  const getCreation = (creationId) => {

      var searchUrl = SOPOONG_URL + SHOP_URL + '/creation.do?' + 'creationId=' + creationId ;

      fetch(
        searchUrl
      ).then(response => response.json())
       .then(data => {
                      console.log(data);

                      if(data != undefined && data != null){

                        setCreationId(data.creationId);
                        setShopId(data.shopId);
                        setCreationName(data.creationName);
                        setCoverImage(data.coverImage);

                        setCategoryId(data.categoryId);
                        setVisible(data.visible);

                        if(data.videoData != undefined && data.videoData != null)
                          setVideoData(data.videoData);

                        if(data.description != null)
                          setDescription(data.description);

                        if(data.setNames != null) {

                          var names = data.setNames.split(',');

                          setSetName(Number(names[0]));

                          if(names.length > 1)
                            setExtSetName(Number(names[1]));
                        }

                        setRootId(data.rootId);
                        setParentId(data.parentId);
                        setUserId(data.userId);
                        setUserNickname(data.userName);

                        setCreateDate(data.createDate);
                        setUpdateDate(data.updateDate);

                        if(data.coverImage != undefined && data.coverImage != null) {
                          $("#coverImage").show();
                        }

                      }
                    })
       .catch(err => console.log(err));

  };


  const createCreation = () => {

    let url = SOPOONG_URL + SHOP_URL + '/creation.do';

    let setNames = setName.toString();
    if(extSetName != 0) {

      if(!checkExtSetName(setName, extSetName)) {
        setVisibleExtSetNameConfirm(true);
        return;
      }

      setNames += "," + extSetName.toString();
    }

    let params = {
                  shopId: Number.parseInt(SHOP_ID),
                  categoryId: categoryId,
                  creationName: creationName,
                  visible: visible,
                  coverImage: coverImage,
                  description: description,
                  videoData: videoData,
                  setNames: setNames,
                  viewCount: viewCount,
                  likeCount: likeCount,
                  shareCount: shareCount,
                  cloneCount: cloneCount,
                  commentCount: commentCount,
                  rootId: rootId,
                  parentId: parentId,
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
                      history.push(CREATIONS_PATH);
                    })
      .catch(err => console.log(err));

  }


  const updateCreation = () => {

    let url = SOPOONG_URL + SHOP_URL + '/creationUpdate.do';

    let setNames = setName.toString();
    if(extSetName != 0) {

      if(!checkExtSetName(setName, extSetName)) {
        setVisibleExtSetNameConfirm(true);
        return;
      }

      setNames += "," + extSetName.toString();
    }

    let params = {
                  creationId: creationId,
                  shopId: shopId,
                  categoryId: categoryId,
                  creationName: creationName,
                  visible: visible,
                  coverImage: coverImage,
                  description: description,
                  videoData: videoData,
                  setNames: setNames,
                  viewCount: viewCount,
                  likeCount: likeCount,
                  shareCount: shareCount,
                  cloneCount: cloneCount,
                  rootId: rootId,
                  parentId: parentId,
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
                      history.push(CREATIONS_PATH);
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



  const checkExtSetName = (psetName, pextSetName) => {

    if(psetName == 45678 && pextSetName == 45680)
      return true;
    else if(psetName == 45544 && pextSetName == 45560)
      return true;

    return false;
  }


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
      <Row type='flex' justify='center' className='vrmallinfo-container'>
        <Col lg={24} md={24} xs={24}  style={{ margin: '20px', padding: '20px', width:'95%', border: 'solid 1px rgba(0, 0, 0, 0.4) ', borderRadius: '10px'}}>
          <Row type='flex' align='middle' justify='center' style={{ marginBottom: '7px'}}>
            <Col span={2} style={{fontWeight: 'bold'}}>
                창작품명
            </Col>
            <Col span={22} style={{backgroundColor: '#ffffff', height: '40px'}}>
              <Input
                placeholder=" 조립품명을 입력하세요."
                style={{height: '40px', minWidth: '200px', maxWidth:'400px'}}
                value={creationName}
                onChange={e => setCreationName(e.target.value)}
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
              세트번호
            </Col>
            <Col span={22} style={{backgroundColor: '#ffffff', height: '40px'}}>
              <Select value={setName} style={{ height: '40px', width: '300px'}} onChange={value => setSetName(value)}>
                <Option value={2000471}>BricQ 모션 에센셜 개인 학습 키트</Option>
                <Option value={2000470}>BricQ 모션 프라임 개인 학습 키트</Option>
                <Option value={45401}>BricQ 모션 에센셜 세트</Option>
                <Option value={45400}>BricQ 모션 프라임 세트</Option>
                <Option value={45678}>스파이크 프라임 코어 세트</Option>
                <Option value={51515}>로봇 인벤터 세트</Option>
                <Option value={45544}>마인드스톰 EV3</Option>
              </Select>
            </Col>
          </Row>
          <Row type='flex' align='middle' justify='center'  style={{ marginBottom: '7px'}}>
            <Col span={2} style={{fontWeight: 'bold'}}>
              확장세트번호
            </Col>
            <Col span={22} style={{backgroundColor: '#ffffff', height: '40px'}}>
              <Select value={extSetName} style={{ height: '40px', width: '300px'}} onChange={value => setExtSetName(value)}>
                <Option value={45680}>스파이크 프라임 코어 확장세트</Option>
                <Option value={45560}>마인드스톰 EV3 확장세트</Option>
                <Option value={0}>사용하지 않음</Option>
              </Select>
            </Col>
          </Row>
          <Row type='flex' align='middle' justify='center'  style={{ marginBottom: '7px'}}>
            <Col span={2} style={{fontWeight: 'bold'}}>
              화면보기
            </Col>
            <Col span={22} style={{backgroundColor: '#ffffff', height: '40px'}}>
              <Select value={visible} style={{ height: '40px', width: '300px' }} onChange={value => setVisible(value)}>
                <Option value={0}>숨기기</Option>
                <Option value={1}>보여주기</Option>
              </Select>
            </Col>
          </Row>
          <Row type='flex' align='middle' justify='center' style={{ display: 'none', marginBottom: '7px'}}>
            <Col span={2} style={{fontWeight: 'bold'}}>
              유튜브 URL
            </Col>
            <Col span={22} style={{ backgroundColor: '#ffffff', height: '40px'}}>
              <Input
                placeholder="유튜브 URL 정보를 입력하세요."
                style={{height: '40px', minWidth: '200px', maxWidth:'400px'}}
                value={videoData}
                onChange={e => setVideoData(e.target.value)}
              />
            </Col>
          </Row>
          <Row type='flex' align='middle' justify='center' >
            <Col span={2} style={{fontWeight: 'bold'}}>
              창작품 소개
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
            <Col span={6}>
              <Button type="primary" onClick={()=>{if(shopId == 0) createCreation(); else updateCreation(); }} style={{ marginTop: '10px', width:'100%', height: '50px', fontSize: '16px', fontWeight: 800, borderRadius: '10px'}}>
                {(shopId == 0)?(<span>등록</span>):(<span>수정</span>)}
              </Button>
            </Col>
          </Row>

        </Col>

        <Modal
          visible={visibleExtSetNameConfirm}
          closable={false}
          title=""
          footer={[
            <Button type="primary" key='confirm' onClick={() => setVisibleExtSetNameConfirm(false)} style={{width: '110px'}}>
              확인
            </Button>,
          ]}
        >
          <div style={{ paddingTop: '20px', margin: 'auto', textAlign: 'center' }} >
            확장세트가 맞지 않습니다. 확장세트를 확인하세요.
          </div>

        </Modal>
      </Row>
    );
}
