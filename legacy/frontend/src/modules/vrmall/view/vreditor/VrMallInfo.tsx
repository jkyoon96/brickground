import React, { useState, useCallback, FC, useEffect } from 'react';
import { useHistory} from 'react-router-dom';
import { Button, Table, InputNumber, Input, Tag, Row, Col, Pagination, Select, DatePicker } from 'antd';
import $ from 'jquery';
import moment from 'moment';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, VR_MALLS_PATH, storageService } from 'common';

export const VrMallInfo = (props) => {

  const history = useHistory();

  const [vrMallId, setVrMallId] = useState<number>(0);
  const [shopId, setShopId] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number>(101);
  const [vrMallName, setVrMallName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [visible, setVisible] = useState<number>(1);
  const [introImage, setIntroImage] = useState<string>('');
  const [coverImage, setCoverImage] = useState<string>('');
  const [videoImage, setVideoImage] = useState<string>('');
  const [videoData, setVideoData] = useState<string>('');
  const [manualData, setManualData] = useState<string>('');
  const [programData, setProgramData] = useState<string>('');
  const [programExeData, setProgramExeData] = useState<string>('');
//const [setNames, setSetNames] = useState<string>('45678,45680');
  const [setName, setSetName] = useState<number>(45678);
  const [extSetName, setExtSetName] = useState<number>(0);
  const [setNames, setSetNames] = useState<number>(45678);
  const [extSetNames, setExtSetNames] = useState<number>(45680);

  const [viewCount, setViewCount] = useState<number>(0);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [commentCount, setCommentCount] = useState<number>(0);

  const [backgroundPath, setBackgroundPath] = useState<string>('');
  const [groundPath, setGroundPath] = useState<string>('');

  const [cameraPosition, setCameraPosition] = useState<string>('');
  const [cameraTarget, setCameraTarget] = useState<string>('');

  const [vrModels, setVrModels] = useState<string>('');
  const [createDate, setCreateDate] = useState<string>('');
  const [updateDate, setUpdateDate] = useState<string>('');


  useEffect(() => {

    scroll(0, 0);

    if(props.match.params.vrMallId != undefined && props.match.params.vrMallId != 0)
      getVrMall(props.match.params.vrMallId);

    $("#coverImage").hide();
    $("#introImage").hide();
    $("#videoImage").hide();

  }, [props.match.params.vrMallId]);



  const getVrMall = (vrMallId) => {

      var searchUrl = SOPOONG_URL + SHOP_URL + '/vrMall.do?' + 'vrMallId=' + vrMallId ;

      fetch(
        searchUrl
      ).then(response => response.json())
       .then(data => {
                      console.log(data);

                      if(data != undefined && data != null){

                        setVrMallId(data.vrMallId);
                        setShopId(data.shopId);
                        setVrMallName(data.vrMallName);
                        setCoverImage(data.coverImage);
                        setIntroImage(data.introImage);
                        setVideoImage(data.videoImage);

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

                        if(data.manualData != null)
                          setManualData(data.manualData);

                        if(data.programData != null)
                          setProgramData(data.programData);

                        if(data.programExeData != null)
                          setProgramExeData(data.programExeData);

                        setCreateDate(data.createDate);
                        setUpdateDate(data.updateDate);

                        if(data.coverImage != undefined && data.coverImage != null) {
                          $("#coverImage").show();
                        }

                        if(data.introImage != undefined && data.introImage != null)
                          $("#introImage").show();

                        if(data.videoImage != undefined && data.videoImage != null)
                          $("#videoImage").show();

                      }
                    })
       .catch(err => console.log(err));

  };


  const createVrMall = () => {

    let url = SOPOONG_URL + SHOP_URL + '/vrMall.do';

    let setNames = setName.toString();
    if(extSetName != 0) {
      setNames += "," + extSetName.toString();
    }

    let params = {
                  shopId: Number.parseInt(SHOP_ID),
                  categoryId: categoryId,
                  vrMallName: vrMallName,
                  visible: visible,
                  introImage: introImage,
                  coverImage: coverImage,
                  videoImage: videoImage,
                  description: description,
                  videoData: videoData,
                  manualData: manualData,
                  programData: programData,
                  programExeData: programExeData,
                  setNames: setNames,
                  viewCount: viewCount,
                  likeCount: likeCount,
                  commentCount: commentCount,
                  backgroundPath: backgroundPath,
                  groundPath: groundPath,
                  cameraPosition: cameraPosition,
                  cameraTarget: cameraTarget
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

  }


  const updateVrMall = () => {

    let url = SOPOONG_URL + SHOP_URL + '/vrMallUpdate.do';

    let setNames = setName.toString();
    if(extSetName != 0) {
      setNames += "," + extSetName.toString();
    }

    let params = {
                  vrMallId: vrMallId,
                  shopId: shopId,
                  categoryId: categoryId,
                  vrMallName: vrMallName,
                  visible: visible,
                  introImage: introImage,
                  coverImage: coverImage,
                  videoImage: videoImage,
                  description: description,
                  videoData: videoData,
                  manualData: manualData,
                  programData: programData,
                  programExeData: programExeData,
                  setNames: setNames,
                  viewCount: viewCount,
                  likeCount: likeCount,
                  commentCount: commentCount,
                  backgroundPath: backgroundPath,
                  groundPath: groundPath,
                  cameraPosition: cameraPosition,
                  cameraTarget: cameraTarget
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


  const uploadIntroImage = () => {

    let uploadUrl = SOPOONG_URL + '/fileupload/insertIntroImage.do'

    var formData = new FormData();
    formData.append("imageFile", $("#uploadIntroImageFile")[0].files[0]);

    fetch( uploadUrl, {
      method: "POST",
      headers: {
      },
      body: formData
    } )
      .then(response => response.json())
      .then(data => {
                      console.log(data);
                      setIntroImage(data.url);

                      $("#introImage").show();
                    })
      .catch(err => console.log(err));

  };


  const uploadVideoImage = () => {

    let uploadUrl = SOPOONG_URL + '/fileupload/insertThumbnailImage.do'

    var formData = new FormData();
    formData.append("imageFile", $("#uploadVideoImageFile")[0].files[0]);

    fetch( uploadUrl, {
      method: "POST",
      headers: {
      },
      body: formData
    } )
      .then(response => response.json())
      .then(data => {
                      console.log(data);
                      setVideoImage(data.url);

                      $("#videoImage").show();
                    })
      .catch(err => console.log(err));

  };

  const uploadManualPdf = () => {

    let uploadUrl = SOPOONG_URL + '/fileupload/insertManualPdf.do'

    var formData = new FormData();
    formData.append("pdfFile", $("#uploadManualPdfFile")[0].files[0]);

    fetch( uploadUrl, {
      method: "POST",
      headers: {
      },
      body: formData
    } )
      .then(response => response.json())
      .then(data => {
                      console.log(data);
                      setManualData(data.url);
                    })
      .catch(err => console.log(err));

  };


  const uploadAssemblyManualImages = () => {

    let uploadUrl = SOPOONG_URL + '/fileupload/insertAssemblyManualImages.do'

    var formData = new FormData();
    formData.append("vrMallId", vrMallId.toString());

    var files = $("#uploadAssemblyManualImageFiles")[0].files;
    for(var i = 0; i < files.length; i ++)
      formData.append("imageFile" + i.toString(), files[i]);

    fetch( uploadUrl, {
      method: "POST",
      headers: {
      },
      body: formData
    } )
      .then(response => response.json())
      .then(data => {
                      setManualData(files.length);
                    })
      .catch(err => console.log(err));

  };


  const uploadProgramManualImages = () => {

    let uploadUrl = SOPOONG_URL + '/fileupload/insertProgramManualImages.do'

    var formData = new FormData();
    formData.append("vrMallId", vrMallId.toString());

    var files = $("#uploadProgramManualImageFiles")[0].files;
    for(var i = 0; i < files.length; i ++)
      formData.append("imageFile" + i.toString(), files[i]);

    fetch( uploadUrl, {
      method: "POST",
      headers: {
      },
      body: formData
    } )
      .then(response => response.json())
      .then(data => {
                      setProgramData(files.length);
                    })
      .catch(err => console.log(err));

  };


  const uploadProgramExe = () => {

    let uploadUrl = SOPOONG_URL + '/fileupload/insertProgramExe.do'

    var formData = new FormData();
    formData.append("vrMallId", vrMallId.toString());
    formData.append("imageFile", $("#uploadProgramExeFile")[0].files[0]);

    fetch( uploadUrl, {
      method: "POST",
      headers: {
      },
      body: formData
    } )
      .then(response => response.json())
      .then(data => {
                      console.log(data);
                      setProgramExeData(data.programExeData);
                    })
      .catch(err => console.log(err));

  };


  const changeSetNames = (setNameId) => {

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
            <Col span={3} style={{fontWeight: 'bold'}}>
                조립품명
            </Col>
            <Col span={21} style={{backgroundColor: '#ffffff', height: '40px'}}>
              <Input
                placeholder=" 조립품명을 입력하세요."
                style={{height: '40px', minWidth: '200px', maxWidth:'400px'}}
                value={vrMallName}
                onChange={e => setVrMallName(e.target.value)}
              />
            </Col>
          </Row>
          <Row type='flex' align='middle' justify='center' style={{ marginBottom: '7px'}}>
            <Col span={3} style={{fontWeight: 'bold'}}>
              대표 이미지
            </Col>
            <Col span={21} style={{backgroundColor: '#ffffff', height: '40px'}}>

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
            <Col span={3} style={{fontWeight: 'bold'}}>
              소개 이미지
            </Col>
            <Col span={21} style={{backgroundColor: '#ffffff', height: '40px'}}>

              <Input
                type="file"
                id="uploadIntroImageFile"
                style={{height: '40px', minWidth: '200px', maxWidth:'400px', verticalAlign: 'middle'}}
                onChange={() => uploadIntroImage()}
              />

              <img id="introImage" src={introImage} style={{marginLeft: '10px', height: '40px', width:'70px'}} alt="소개 이미지" />
            </Col>
          </Row>
          <Row type='flex' align='middle' justify='center'  style={{ marginBottom: '7px'}}>
            <Col span={3} style={{fontWeight: 'bold',}}>
              조립품 범주
            </Col>
            <Col span={21} style={{backgroundColor: '#ffffff', height: '40px' }}>
              <Select value={categoryId} style={{ height: '40px', width: '300px'}} onChange={value => setCategoryId(value)}>
                <Option value={101}>기초</Option>
                <Option value={102}>초급</Option>
                <Option value={103}>중급</Option>
                <Option value={104}>고급</Option>
              </Select>
            </Col>
          </Row>
          <Row type='flex' align='middle' justify='center'  style={{ marginBottom: '7px'}}>
            <Col span={3} style={{fontWeight: 'bold'}}>
              세트번호
            </Col>
            <Col span={21} style={{backgroundColor: '#ffffff', height: '40px'}}>
              <Select value={setName} style={{ height: '40px', width: '300px'}} onChange={value => setSetName(value)}>
                <Option value={2000471}>BricQ 모션 에센셜 개인 학습 키트</Option>
                <Option value={2000470}>BricQ 모션 프라임 개인 학습 키트</Option>
                <Option value={45401}>BricQ 모션 에센셜 세트</Option>
                <Option value={45400}>BricQ 모션 프라임 세트</Option>
                <Option value={45678}>스파이크 프라임 코어 세트</Option>
                <Option value={51515}>로봇 인벤터 세트</Option>
                <Option value={45544}>마인드스톰 EV3</Option>
                <Option value={9102}>애니멀 세트(곤충)</Option>
                <Option value={9103}>애니멀 세트(물고기)</Option>
                <Option value={9106}>애니멀 세트(공룡)</Option>
              </Select>
            </Col>
          </Row>
          <Row type='flex' align='middle' justify='center'  style={{ marginBottom: '7px'}}>
            <Col span={3} style={{fontWeight: 'bold'}}>
              확장세트번호
            </Col>
            <Col span={21} style={{backgroundColor: '#ffffff', height: '40px'}}>
              <Select value={extSetName} style={{ height: '40px', width: '300px'}} onChange={value => setExtSetName(value)}>
                <Option value={45680}>스파이크 프라임 코어 확장세트</Option>
                <Option value={45560}>마인드스톰 EV3 확장세트</Option>
                <Option value={0}>사용하지 않음</Option>
              </Select>
            </Col>
          </Row>
          <Row type='flex' align='middle' justify='center'  style={{ marginBottom: '7px'}}>
            <Col span={3} style={{fontWeight: 'bold'}}>
              화면보기
            </Col>
            <Col span={21} style={{backgroundColor: '#ffffff', height: '40px'}}>
              <Select value={visible} style={{ height: '40px', width: '300px' }} onChange={value => setVisible(value)}>
                <Option value={0}>숨기기</Option>
                <Option value={1}>보여주기</Option>
              </Select>
            </Col>
          </Row>
          <Row type='flex' align='middle' justify='center' style={{ marginBottom: '7px'}}>
            <Col span={3} style={{fontWeight: 'bold'}}>
              동영상 이미지
            </Col>
            <Col span={21} style={{backgroundColor: '#ffffff', height: '40px'}}>

              <Input
                type="file"
                id="uploadVideoImageFile"
                style={{height: '40px', minWidth: '200px', maxWidth:'400px', verticalAlign: 'middle'}}
                onChange={() => uploadVideoImage()}
              />

              <img id="videoImage" src={videoImage} style={{marginLeft: '10px', height: '40px', width:'70px'}} alt="동영상 이미지" />
            </Col>
          </Row>
          <Row type='flex' align='middle' justify='center' style={{ marginBottom: '7px'}}>
            <Col span={3} style={{fontWeight: 'bold'}}>
              동영상 정보
            </Col>
            <Col span={21} style={{backgroundColor: '#ffffff', height: '40px'}}>
              <Input
                placeholder="동영상 정보를 입력하세요."
                style={{height: '40px', minWidth: '200px', maxWidth:'400px'}}
                value={videoData}
                onChange={e => setVideoData(e.target.value)}
              />
            </Col>
          </Row>
          <Row type='flex' align='middle' justify='center' style={{ marginBottom: '7px'}}>
            <Col span={3} style={{fontWeight: 'bold'}}>
              조립설명서 이미지
            </Col>
            <Col span={21} style={{backgroundColor: '#ffffff', height: '40px'}}>
              <input
                type="file"
                multiple
                id="uploadAssemblyManualImageFiles"
                style={{height: '40px', minWidth: '200px', maxWidth:'400px', marginTop: '8px'}}
                onChange={() => uploadAssemblyManualImages()}
              />
            </Col>
          </Row>
          <Row type='flex' align='middle' justify='center' style={{ marginBottom: '7px'}}>
            <Col span={3} style={{fontWeight: 'bold'}}>
              조립설명서
            </Col>
            <Col span={21} style={{backgroundColor: '#ffffff', height: '40px'}}>
              <Input
                placeholder="조립설명서 페이지 수를 입력하세요."
                style={{height: '40px', minWidth: '200px', maxWidth:'400px'}}
                value={manualData}
                onChange={e => setManualData(e.target.value)}
              />
            </Col>
          </Row>
          <Row type='flex' align='middle' justify='center' style={{ marginBottom: '7px'}}>
            <Col span={3} style={{fontWeight: 'bold'}}>
              프로그램설명서 이미지
            </Col>
            <Col span={21} style={{backgroundColor: '#ffffff', height: '40px'}}>
              <input
                type="file"
                multiple
                id="uploadProgramManualImageFiles"
                style={{height: '40px', minWidth: '200px', maxWidth:'400px', marginTop: '8px'}}
                onChange={() => uploadProgramManualImages()}
              />
            </Col>
          </Row>
          <Row type='flex' align='middle' justify='center' style={{ marginBottom: '7px'}}>
            <Col span={3} style={{fontWeight: 'bold'}}>
              프로그램설명서
            </Col>
            <Col span={21} style={{backgroundColor: '#ffffff', height: '40px'}}>
              <Input
                placeholder="프로그램설명서 페이지 수를 입력하세요."
                style={{height: '40px', minWidth: '200px', maxWidth:'400px'}}
                value={programData}
                onChange={e => setProgramData(e.target.value)}
              />
            </Col>
          </Row>
          <Row type='flex' align='middle' justify='center' style={{ marginBottom: '4px'}}>
            <Col span={3} style={{fontWeight: 'bold'}}>
              프로그램 실행 파일
            </Col>
            <Col span={21} style={{backgroundColor: '#ffffff', height: '40px'}}>

              <input
                type="file"
                id="uploadProgramExeFile"
                style={{height: '40px', minWidth: '200px', maxWidth:'400px', marginTop: '8px'}}
                onChange={() => uploadProgramExe()}
              />

            </Col>
          </Row>
          <Row type='flex' align='middle' justify='center' style={{ marginBottom: '4px'}}>
            <Col span={3} style={{fontWeight: 'bold'}}>
            </Col>
            <Col span={21} style={{backgroundColor: '#ffffff', height: '40px'}}>
              {programExeData}
            </Col>
          </Row>
          <Row type='flex' align='middle' justify='center' >
            <Col span={3} style={{fontWeight: 'bold'}}>
              조립품 소개
            </Col>
            <Col span={21} style={{height: '40px'}}>
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
              <Button type="primary" onClick={()=>{if(shopId == 0) createVrMall(); else updateVrMall(); }} style={{ marginTop: '10px', width:'100%', height: '50px', fontSize: '16px', fontWeight: 800, borderRadius: '10px'}}>
                {(shopId == 0)?(<span>조립정보 등록</span>):(<span>조립정보 수정</span>)}
              </Button>
            </Col>
          </Row>

        </Col>
      </Row>
    );
}
