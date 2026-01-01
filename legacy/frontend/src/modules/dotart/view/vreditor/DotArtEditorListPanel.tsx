import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { SketchPicker } from 'react-color';
import { Collapse, Icon, Select, Row, Col, Checkbox, Button, Table, Empty, Divider, Slider, Modal, Dropdown, Tooltip, Input } from 'antd';
import $ from 'jquery';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, MAIN_PATH, DOTARTS_PATH, storageService } from 'common';


export const DotArtEditorListPanel = (props) => {

  const { vrModelList,
          vrAssets,
          vrModel,
          colorDataList,
          refreshMode,
          creation,
          creationName,
          categoryId,
          subjectId,
          sizeId,
          coverImage,
          visible,
          traceMode,
          musicMode,
          dotRowCountContainer,
          dotColumnCountContainer,
          dotColorContainer,
          dotColorIdContainer,
          onCreationName,
          onCategoryId,
          onSubjectId,
          onSizeId,
          onVisible,
          onUploadPixelImage,
          onBaseColor,
          onBaseDotColor,
          onBaseDotModel,
          onDotColor,
          onDotCount,
          onSaveCreation,
          onTraceColor,
          onMusicPlay,
          onBackground,
          onSaveAsImage,
          onSaveAsThumbImage,
          onSettingInfo,
          onExportToStl,
          onExportToGltf,
          onColorEditMode } = props;

  const [shopId, setShopId] = useState<number>(0);

  const [dataSource, setDataSource] = useState<any[]>([]);
  const [selectedModelName, setSelectedModelName] = useState<string>('');
  const [productList, setProductList] = useState<any[]>([]);


  const [antialias, setAntialias] = useState<boolean>(true);
  const [pixelRatio, setPixelRatio] = useState<number | undefined>(1);
  const [outline, setOutline] = useState<boolean>(false);

  const [visibleSaveImageConfirm, setVisibleSaveImageConfirm] = useState<boolean>(false);
  const [visibleSaveThumbImageConfirm, setVisibleSaveThumbImageConfirm] = useState<boolean>(false);
  const [visibleSettingInfoConfirm, setVisibleSettingInfoConfirm] = useState<boolean>(false);
  const [visibleExportStlConfirm, setVisibleExportStlConfirm] = useState<boolean>(false);
  const [visibleExportGltfConfirm, setVisibleExportGltfConfirm] = useState<boolean>(false);
  const [visibleInitAssemblyConfirm, setVisibleInitAssemblyConfirm] = useState<boolean>(false);


  const [checkedAssetList, setCheckedAssetList] = useState<string[]>([]);

  const [rowCount, setRowCount] = useState<number>(8);
  const [columnCount, setColumnCount] = useState<number>(8);
  const [baseColor, setBaseColor] = useState<number>(0x1b2a34);
  const [baseDotColor, setBaseDotColor] = useState<number>(0xf4f4f4);
  const [baseDotModel, setBaseDotModel] = useState<number>(4161734);
  const [dotColor, setDotColor] = useState<number>(0xFAC80A);

  const [beforeDotId, setBeforeDotId] = useState<string>('');

  const [current, setCurrent] = useState<number>(0);
  const [maxLevel, setMaxLevel] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1);
  const [displaySpeed, setDisplaySpeed] = useState<number | undefined>(1);

  const [intervalId, setIntervalId] = useState<any>({});

  const [templeteColor, setTempleteColor] = useState<string>("#121212");
  const [colorRgb, setColorRgb] = useState<string>("");
  const [opacity, setOpacity] = useState<number>(0);

  const copyRightImage = './images/copyright.jpg';

  //let intervalId;
  var level = 0;
  var playMode = true;
  var playDirection = true;

  useEffect(() => {

    setDataSource(colorDataList);

    if(vrModel.dotRowCount != undefined)
      setRowCount(vrModel.dotRowCount);

    if(vrModel.dotColumnCount != undefined)
      setColumnCount(vrModel.dotColumnCount);

    if(vrModel.plateColor != undefined)
      setBaseColor(vrModel.plateColor);

    if(vrModel.baseDotColor != undefined)
      setBaseDotColor(vrModel.baseDotColor);

    onWindowResize();
    window.addEventListener( 'resize',onWindowResize, false );


  }, [vrModel]);


  useEffect(() => {

    setRowCount(dotRowCountContainer);

  }, [dotColumnCountContainer]);

  useEffect(() => {

    setColumnCount(dotColumnCountContainer);

  }, [dotColumnCountContainer]);


  useEffect(() => {

    let colorId = dotColorIdContainer; // lego color id

    if(beforeDotId !== ''){
      let beforeElement = document.getElementById(beforeDotId);
      if( beforeElement != null)
        beforeElement.style.border = "0px";
    }

    if(colorId != undefined) {
      let element = document.getElementById(colorId.toString());
      if( element != null)
        element.style.border = "thick solid tomato";
      setBeforeDotId(colorId.toString());
    }

  }, [dotColorIdContainer]);

  useEffect(() => {
    setTempleteColor(dotColorContainer);

  }, [dotColorContainer]);


  useEffect(() => {

    if(!traceMode){
      stopDisplayAssembly();
    }

  }, [traceMode]);


  // useEffect(() => {
  //
  //   if(targetInfo.position != undefined){
  //     setPositionx(targetInfo.position.x);
  //     setPositiony(targetInfo.position.y);
  //     setPositionz(targetInfo.position.z);
  //   }
  //
  //   if(targetInfo.rotationx != undefined){
  //     setRotationx(targetInfo.rotation.x);
  //     setRotationy(targetInfo.rotation.y);
  //     setRotationz(targetInfo.rotation.z);
  //   }
  //
  // }, [targetInfo]);


  const onWindowResize = () => {

    $("#dotartListPanel").css("top", $('html, body').offset().top + 5);
    $("#dotartListPanel").css("left", $('html, body').offset().left + $('#dotartEditor_vrCanvas').outerWidth() - 480);

	}

  const getProductsData = () => {

      var searchUrl = SOPOONG_URL + SHOP_URL + '/products.do?' + 'shopId=' + SHOP_ID ;
      searchUrl += '&page=0&size=5000';

      fetch(
        searchUrl
      ).then(res => res.json())
       .then(json => {console.log(json); setProductList(Object.assign(json));})
       .catch(err => console.log(err));

  };


  const getModelImageUrl = (vrModelName) => {

    var modelInfo = vrModelList.find(vrModel =>(vrModel.vrModelName == vrModelName ))

    if(modelInfo != undefined){
      //return productInfo.coverImage.replace('.png', '_small.jpg');
      //return modelInfo.coverImage.replace('.png', '_thumb.png');
      return modelInfo.imagePath;
    }

    return undefined;

  }


  const handleBaseColor = (color) => {

    setBaseColor(color);

    onBaseColor(color);

  };


  const handleBaseDotColor = (color) => {

    setBaseDotColor(color);

    onBaseDotColor(color);

  };

  const handleBaseDotModel = (model) => {

    setBaseDotModel(model);

    onBaseDotModel(model);

  };

  const handleDotColor = (dotColor) => {

    if(beforeDotId !== ''){
      let beforeElement = document.getElementById(beforeDotId);
      if( beforeElement != null)
        beforeElement.style.border = "0px";
    }

    let element = document.getElementById(dotColor.id);
    if( element != null)
      element.style.border = "thick solid tomato";
    setBeforeDotId(dotColor.id);

    setDotColor(dotColor.color);

    onDotColor(dotColor);

  };

  const handleDotColorRgb = (color) => {

    setColorRgb("" + color.rgb.r + ", " + color.rgb.g + ", " + color.rgb.b);

  };

  const handleRowCount = (count) => {

    setRowCount(count);

    onDotCount(count, columnCount);

  };


  const handleColumnCount = (count) => {

    setColumnCount(count);

    onDotCount(rowCount, count);

  };



  const handleCopyMall = () => {

    console.log('handleCopyMall : ');

    // if (value > zoomValue )
    //   onZoomInOut(1);
    // else if(value < zoomValue)
    //   onZoomInOut(-1);

    //setZoomValue(value);

    //onZoomInOut(value);

  }

  const handleDeleteMall = () => {

    console.log('handleDeleteMall : ');

    // if (value > zoomValue )
    //   onZoomInOut(1);
    // else if(value < zoomValue)
    //   onZoomInOut(-1);

    //setZoomValue(value);

    //onZoomInOut(value);

  }

  const handleSettingMall = () => {

    console.log('handleSettingMall : ');

    // if (value > zoomValue )
    //   onZoomInOut(1);
    // else if(value < zoomValue)
    //   onZoomInOut(-1);

    //setZoomValue(value);

    //onZoomInOut(value);

  }

  const handleSettinInfo = () => {

    console.log('handleSettinInfo : ');

    onSettingInfo(antialias, pixelRatio, outline);

  }

  const startDisplayAssembly = () => {


    $('#dotart_play_assembly_icon').hide();
    $('#dotart_stop_assembly_icon').show();


    if(displaySpeed == undefined)
      return;

    var tempId = setInterval(() => {onTraceColor(true);}, 1000/speed );
    setIntervalId(tempId);

    console.log("startDisplayAssembly tempId : " + tempId);

  }

  const stopDisplayAssembly = () => {

    $('#dotart_play_assembly_icon').show();
    $('#dotart_stop_assembly_icon').hide();

    console.log("stopDisplayAssembly intervalId : " + intervalId);
    clearInterval(intervalId);

    onTraceColor(false);

  }

  const genAssetNameExtra = () => (
    <div id="dotartEditor_Asset_Name">
    </div>
  );


  const { Panel } = Collapse;
  const { Option } = Select;

  const controlStyle = {
    backgroundColor: '#99999e',
    border: '1px solid #ffffff'
  }

  const getControlIcon = () => {
    return (
        <Row align='middle' style={{paddingTop: '10px', backgroundColor: '#99999e'}}>
          <Col span={3}>
            <div style={{textAlign: 'center'}}><Link to={MAIN_PATH}><Button onClick={e => {$('#MainHeader').show(); $('#MainFooter').show();}} type="primary" size="small" shape="circle" icon="home" style={controlStyle} ></Button></Link></div>
            <div style={{fontSize: '9px', textAlign: 'center'}}>HOME</div>
          </Col>
          <Col span={3}>
            <div style={{textAlign: 'center'}}><Link to={`${DOTARTS_PATH}?categoryId=${categoryId}`}><Button onClick={e => {$('#MainHeader').show(); $('#MainFooter').show();}} type="primary" size="small" shape="circle" icon="menu-unfold" style={controlStyle} ></Button></Link></div>
            <div style={{fontSize: '9px', textAlign: 'center'}}>목록보기</div>
          </Col>
          <Col span={3}>
            <div style={{textAlign: 'center'}}><Button onClick={ e => onBackground(true) } type="primary" size="small"  shape="circle" icon="border-outer" style={controlStyle} ></Button></div>
            <div style={{fontSize: '9px', textAlign: 'center'}}>배경설정</div>
          </Col>
          <Col span={3}>
            <div style={{textAlign: 'center'}}><Button onClick={ e => onBackground(false) } type="primary" size="small"  shape="circle" icon="border-inner" style={controlStyle} ></Button></div>
            <div style={{fontSize: '9px', textAlign: 'center'}}>배경해제</div>
          </Col>
          <Col span={3}>
            <div style={{textAlign: 'center'}}><Button onClick={ () =>  setVisibleSaveImageConfirm(true) } type="primary" shape="circle"  size="small"  icon="file-image" style={controlStyle}></Button></div>
            <div style={{fontSize: '9px', textAlign: 'center'}}>스크린샷</div>
            <Modal
              visible={visibleSaveImageConfirm}
              closable={false}
              title=""
              footer={[
                        <Button key="setting_back" onClick={() => setVisibleSaveImageConfirm(false)}>
                          취소하기
                        </Button>,
                        <Button key="setting_submit" onClick={e => { onSaveAsImage(); setVisibleSaveImageConfirm(false); } }>
                          사진찍기
                        </Button>,
                      ]}
              >
              <div style={{ margin: 'auto', textAlign: 'center' }} >
                <img
                  style={{width : '100%', height: '100%', marginTop: '20px'}}
                  src={copyRightImage}
                />
              </div>

            </Modal>
          </Col>
          <Col span={3}>
            <div style={{textAlign: 'center'}}><Button onClick={ () =>  setVisibleExportStlConfirm(true) } type="primary" shape="circle"  size="small"  icon="file-image" style={controlStyle}></Button></div>
            <div style={{fontSize: '9px', textAlign: 'center'}}>STL</div>
            <Modal
              visible={visibleExportStlConfirm}
              closable={false}
              title=""
              footer={[
                        <Button key="export_back" onClick={() => setVisibleExportStlConfirm(false)}>
                          취소하기
                        </Button>,
                        <Button key="export_submit" onClick={e => { onExportToStl(); setVisibleExportStlConfirm(false); } }>
                          STL 내보내기
                        </Button>,
                      ]}
              >
              <div style={{ margin: 'auto', textAlign: 'center' }} >
                <img
                  style={{width : '100%', height: '100%', marginTop: '20px'}}
                  src={copyRightImage}
                />
              </div>

            </Modal>
          </Col>
          <Col span={3}>
            <div style={{textAlign: 'center'}}><Button onClick={ () =>  setVisibleExportGltfConfirm(true) } type="primary" shape="circle"  size="small"  icon="file-image" style={controlStyle}></Button></div>
            <div style={{fontSize: '9px', textAlign: 'center'}}>GLTF</div>
            <Modal
              visible={visibleExportGltfConfirm}
              closable={false}
              title=""
              footer={[
                        <Button key="export_back" onClick={() => setVisibleExportGltfConfirm(false)}>
                          취소하기
                        </Button>,
                        <Button key="export_submit" onClick={e => { onExportToGltf(); setVisibleExportGltfConfirm(false); } }>
                          GLTF 내보내기
                        </Button>,
                      ]}
              >
              <div style={{ margin: 'auto', textAlign: 'center' }} >
                <img
                  style={{width : '100%', height: '100%', marginTop: '20px'}}
                  src={copyRightImage}
                />
              </div>

            </Modal>
          </Col>
          <Col span={3}>
            <div style={{textAlign: 'center'}}><Button onClick={ () =>  setVisibleSettingInfoConfirm(true) } type="primary" shape="circle"  size="small"  icon="setting" style={controlStyle}></Button></div>
            <div style={{fontSize: '9px', textAlign: 'center'}}>설정</div>
            <Modal
              visible={visibleSettingInfoConfirm}
              closable={false}
              title=""
              footer={[
                        <Button key="save_back" onClick={() => setVisibleSettingInfoConfirm(false)}>
                          취소하기
                        </Button>,
                        <Button key="save_submit" onClick={e => { handleSettinInfo(); setVisibleSettingInfoConfirm(false); } }>
                          설정하기
                        </Button>,
                      ]}
              >
              <div style={{ margin: 'auto', textAlign: 'left' }} >
                <Row style={{ marginTop: 5 }}>
                  <Col span={4}>
                    Outline
                  </Col>
                  <Col span={4}>
                    <Checkbox
                      onChange={(e) => setOutline(e.target.checked)}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                  <Col span={4}>
                    뮤직
                  </Col>
                  <Col span={4}>
                    <Checkbox
                      checked={musicMode}
                      onChange={(e) => onMusicPlay(e.target.checked)}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                  <Col span={4}>
                    조립단계
                  </Col>
                  <Col span={4}>
                    <Button key="init_assembly" onClick={e => { setVisibleSettingInfoConfirm(false); setVisibleInitAssemblyConfirm(true); } }>
                      초기화하기
                    </Button>
                  </Col>
                </Row>
              </div>

            </Modal>

            <Modal
              visible={visibleInitAssemblyConfirm}
              closable={false}
              title=""
              footer={[
                        <Button key="assembly_back" onClick={() => setVisibleInitAssemblyConfirm(false)}>
                          취소하기
                        </Button>,
                        <Button key="assembly_submit" onClick={e => { handleSettinInfo(); setVisibleInitAssemblyConfirm(false); } }>
                          초기화하기
                        </Button>,
                      ]}
              >
              <div style={{ margin: 'auto', textAlign: 'left' }} >
                <Row style={{ marginTop: 5 }}>
                    순서를 초기화 하시겠습니까?
                </Row>
              </div>

            </Modal>
          </Col>
        </Row>
      );

  }


  const getBaseSettingMenu = () => {

    return (
      <>
        <Row type="flex" align="middle">
          <Col span={4} style={{paddingLeft: '10px', fontWeight: 'bold'}}>
            가로
          </Col>
          <Col span={8} style={{backgroundColor: '#ffffff', height: '40px'}}>
            <Select value={rowCount} style={{ height: '40px', width: '100px' }} onChange={value => handleRowCount(value)}>
              <Option value={16}>16 dot</Option>
              <Option value={32}>32 dot</Option>
              <Option value={48}>48 dot</Option>
              <Option value={64}>64 dot</Option>
              <Option value={80}>80 dot</Option>
              <Option value={96}>96 dot</Option>
            </Select>
          </Col>
          <Col span={5} style={{fontWeight: 'bold'}}>
            배경색
          </Col>
          <Col span={6} style={{backgroundColor: '#ffffff', height: '40px'}}>
            <Select value={baseColor} style={{ height: '40px', width: '100px'}} onChange={value => handleBaseColor(value)}>
              <Option value={0x1b2a34}><div style={{backgroundColor: '#1b2a34', height: '20px', width: '20px', marginTop: '5px' }}></div></Option>
              <Option value={0xf4f4f4}><div style={{backgroundColor: '#f4f4f4', height: '20px', width: '20px', marginTop: '5px' }}></div></Option>
            </Select>
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={4} style={{paddingLeft: '10px', fontWeight: 'bold'}}>
            세로
          </Col>
          <Col span={8} style={{backgroundColor: '#ffffff', height: '40px'}}>
            <Select value={columnCount} style={{ height: '40px', width: '100px'  }} onChange={value => handleColumnCount(value)}>
              <Option value={16}>16 dot</Option>
              <Option value={32}>32 dot</Option>
              <Option value={48}>48 dot</Option>
              <Option value={64}>64 dot</Option>
              <Option value={80}>80 dot</Option>
              <Option value={96}>96 dot</Option>
            </Select>
          </Col>
          <Col span={5} style={{fontWeight: 'bold'}}>
            배경도트색
          </Col>
          <Col span={6} style={{backgroundColor: '#ffffff', height: '40px'}}>
            <Select value={baseDotColor} style={{ height: '40px', width: '100px'}} onChange={value => handleBaseDotColor(value)}>
              <Option value={0x181c1f}><div style={{backgroundColor: '#181c1f', height: '20px', width: '20px', marginTop: '5px' }}></div></Option>
              <Option value={0xf8f8f8}><div style={{backgroundColor: '#f8f8f8', height: '20px', width: '20px', marginTop: '5px' }}></div></Option>
            </Select>
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={4} style={{paddingLeft: '10px', fontWeight: 'bold'}}>
            모양
          </Col>
          <Col span={8} style={{backgroundColor: '#ffffff', height: '40px'}}>
            <Select value={baseDotModel} style={{ height: '40px', width: '100px'}} onChange={value => handleBaseDotModel(value)}>
              <Option value={4161734}>원형</Option>
              <Option value={4159553}>사각형</Option>
            </Select>
          </Col>
        </Row>
      </>
    );
  }


  const getColorSettingMenu = () => {

    return (
      <>
        <Row gutter={[8, 8]} style={{padding: '0px 10px'}}>
          {dataSource ? (
            dataSource.map(colorSet => {

              if(colorSet.id == 1) {
                return (
                  <Col span={3} key={colorSet.id} >
                    <a  onClick={e => handleDotColor(colorSet)}>
                      <Tooltip title={colorSet.id + "." + colorSet.title} mouseEnterDelay={1}>
                        <div id={colorSet.id} style={{height: '30px', width: '40px', backgroundColor: colorSet.color, color: '#888888', textAlign: 'center', paddingTop: '5px'}}>
                          <span style={{opacity:opacity}}>
                            {colorSet.id}
                          </span>
                        </div>
                      </Tooltip>
                    </a>
                  </Col>
                )
              }
              else if(colorSet.id > 1) {
                return (
                  <Col span={3} key={colorSet.id} >
                    <a  onClick={e => handleDotColor(colorSet)}>
                      <Tooltip title={colorSet.id + "." + colorSet.title} mouseEnterDelay={1}>
                        <div id={colorSet.id} style={{height: '30px', width: '40px', backgroundColor: colorSet.color, color: '#ffffff', textAlign: 'center', paddingTop: '5px'}}>
                          <span style={{opacity:opacity}}>
                            {colorSet.id}
                          </span>
                        </div>
                      </Tooltip>
                    </a>
                  </Col>
                )
              }
              return (
                <Col span={3} key={colorSet.id} >
                </Col>
              )})
            ) : (
              <Empty />
          )
        }

        </Row>
        <Row type='flex' align='middle' style={{padding: '0px 10px'}}>
          <Col span={4}>
            <Button id='paintColor' icon='bg-colors' size='small' style={{display:'none'}} onClick={() => {$("#pickColor").show(); $("#paintColor").hide();  onColorEditMode('paint')}} />
            <Button id='pickColor' icon='edit' size='small' onClick={() => {$("#paintColor").show(); $("#pickColor").hide();  onColorEditMode('pick')}} />
          </Col>
          <Col span={8}>
            <Checkbox onChange={(e) => {e.target.checked ? setOpacity(1) : setOpacity(0)}} style={{fontWeight: 800}}> 색깔번호보기 </Checkbox>
          </Col>
        </Row>
      </>
    );
  }


  const getDotArtInfoMenu = () => {


    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined) {

          if(user.role > 8){

            return (
              <>
                <Row type='flex' align='middle' justify='start' style={{ marginBottom: '7px'}}>
                  <Col span={6} style={{paddingLeft: '10px', fontWeight: 'bold'}}>
                      작품명
                  </Col>
                  <Col span={16} style={{backgroundColor: '#ffffff', height: '40px'}}>
                    <Input
                      placeholder=" 작품명을 입력하세요."
                      value={creationName}
                      onChange={e => onCreationName(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row type='flex' align='middle' justify='start'  style={{ marginBottom: '7px'}}>
                  <Col span={6} style={{paddingLeft: '10px', fontWeight: 'bold'}}>
                    대표 이미지
                  </Col>
                  <Col span={17} style={{backgroundColor: '#ffffff', height: '40px'}}>
                    <a  onClick={() => onSaveAsThumbImage()}>
                      <img id="coverImage" src={coverImage}  style={{height: '40px', width:'40px'}} alt="대표 이미지" />
                    </a>
                  </Col>
                </Row>
                <Row type='flex' align='middle' justify='start'  style={{ marginBottom: '7px'}}>
                  <Col span={6} style={{paddingLeft: '10px', fontWeight: 'bold'}}>
                    사용유형
                  </Col>
                  <Col span={17} style={{backgroundColor: '#ffffff', height: '40px'}}>
                    <Select value={categoryId} style={{ height: '40px', width: '100px'}} onChange={value => onCategoryId(value)}>
                      <Option value={101}>회원</Option>
                      <Option value={201}>회원작가</Option>
                      <Option value={301}>방과후수업</Option>
                    </Select>
                  </Col>
                </Row>
                <Row type='flex' align='middle' justify='start'  style={{ marginBottom: '7px'}}>
                  <Col span={6} style={{paddingLeft: '10px', fontWeight: 'bold'}}>
                    주제유형
                  </Col>
                  <Col span={17} style={{backgroundColor: '#ffffff', height: '40px'}}>
                    <Select value={subjectId} style={{ height: '40px', width: '100px'}} onChange={value => onSubjectId(value)}>
                      <Option value={101}>인물</Option>
                      <Option value={102}>풍경</Option>
                      <Option value={103}>명화</Option>
                      <Option value={104}>캐릭터</Option>
                      <Option value={105}>식물</Option>
                      <Option value={106}>동물</Option>
                      <Option value={107}>이벤트</Option>
                      <Option value={108}>기타</Option>
                    </Select>
                  </Col>
                </Row>
                <Row type='flex' align='middle' justify='start'  style={{ marginBottom: '7px'}}>
                  <Col span={6} style={{paddingLeft: '10px', fontWeight: 'bold'}}>
                    크기유형
                  </Col>
                  <Col span={17} style={{backgroundColor: '#ffffff', height: '40px'}}>
                    <Select value={sizeId} style={{ height: '40px', width: '100px'}} onChange={value => onSizeId(value)}>
                      <Option value={101}>16x16</Option>
                      <Option value={102}>16x32</Option>
                      <Option value={103}>32x32</Option>
                      <Option value={201}>기타</Option>
                    </Select>
                  </Col>
                </Row>
                <Row type='flex' align='middle'  justify='center' >
                  <Col span={7}>
                    <Button type="primary" onClick={onSaveCreation} style={{ width:'100%', fontWeight: 800}}>
                      <span>저장하기</span>
                    </Button>
                  </Col>
                  <Col span={7} offset={1}>
                    <Button type="primary" onClick={onUploadPixelImage} style={{ width:'100%', fontWeight: 800}}>
                      <span>사진올리기</span>
                    </Button>
                  </Col>
                </Row>
              </>
            );
          }
        }
    }


    return (
      <>
        <Row type='flex' align='middle' justify='start' style={{ marginBottom: '7px'}}>
          <Col span={6} style={{paddingLeft: '10px', fontWeight: 'bold'}}>
              작품명
          </Col>
          <Col span={16} style={{backgroundColor: '#ffffff', height: '40px'}}>
            <Input
              placeholder=" 작품명을 입력하세요."
              value={creationName}
              onChange={e => onCreationName(e.target.value)}
            />
          </Col>
        </Row>
        <Row type='flex' align='middle' justify='start'  style={{ marginBottom: '7px'}}>
          <Col span={6} style={{paddingLeft: '10px', fontWeight: 'bold'}}>
            대표 이미지
          </Col>
          <Col span={17} style={{backgroundColor: '#ffffff', height: '40px'}}>
            <a  onClick={() => onSaveAsThumbImage()}>
              <img id="coverImage" src={coverImage}  style={{height: '40px', width:'40px'}} alt="대표 이미지" />
            </a>
          </Col>
        </Row>
        <Row type='flex' align='middle' justify='start'  style={{ marginBottom: '7px'}}>
          <Col span={6} style={{paddingLeft: '10px', fontWeight: 'bold'}}>
            주제유형
          </Col>
          <Col span={17} style={{backgroundColor: '#ffffff', height: '40px'}}>
            <Select value={subjectId} style={{ height: '40px', width: '100px'}} onChange={value => onSubjectId(value)}>
              <Option value={101}>인물</Option>
              <Option value={102}>풍경</Option>
              <Option value={103}>명화</Option>
              <Option value={104}>캐릭터</Option>
              <Option value={105}>식물</Option>
              <Option value={106}>동물</Option>
              <Option value={107}>이벤트</Option>
              <Option value={108}>기타</Option>
            </Select>
          </Col>
        </Row>
        <Row type='flex' align='middle'  justify='center' >

          <Col span={7}>
            <Button type="primary" onClick={onSaveCreation} style={{ width:'100%', fontWeight: 800}}>
              <span>저장하기</span>
            </Button>
          </Col>
          <Col span={7} offset={1}>
            <Button type="primary" onClick={onUploadPixelImage} style={{ width:'100%', fontWeight: 800}}>
              <span>사진올리기</span>
            </Button>
          </Col>
        </Row>
      </>
    );



  }

  const genAssemblyExtra = () => {


    return (<Row>
              <Col>
                <div id='dotart_play_assembly_icon' style={{textAlign: 'center'}}>
                  <Button onClick={ e => startDisplayAssembly() } type="primary" size="small"  shape="circle" icon="retweet" style={controlStyle} />
                </div>
                <div id='dotart_stop_assembly_icon' style={{display: 'none', textAlign: 'center'}}>
                  <Button onClick={ e => stopDisplayAssembly() } type="primary" size="small"  shape="circle" icon="pause" style={controlStyle} />
                </div>
              </Col>
            </Row>);

  };



  return (
    <div>

      <div id="dotartListPanel" className='vreditor-container' style={{ height: "100vh" }}>
        <Collapse
          defaultActiveKey={['2']}
        >
          <Panel header={getControlIcon()}  key="1" showArrow={false} >

          </Panel>

          <Panel header="기본정보"  key="2" >

              {getDotArtInfoMenu()}

          </Panel>

          <Panel header="기본설정"  key="3" >

              {getBaseSettingMenu()}

          </Panel>

          <Panel header="도트색깔선택"  extra={genAssemblyExtra()}  key="4" >

              {getColorSettingMenu()}

          </Panel>
          <Panel header="색깔템플릿"   key="5" style={{display: 'none'}}>
            <Row>

              <SketchPicker
                width={300}
                color={templeteColor}
                onChangeComplete={ (color) => {setTempleteColor(color.hex); handleDotColor({id:100, title:'Green', color:color.hex, pitch: 'C1'});  handleDotColorRgb(color); console.log('color hex : ' + color.hex);} }
              />

            </Row>
            <Row>
              <Input
                value={colorRgb}
              />
            </Row>

          </Panel>

        </Collapse>

      </div>
    </div>

  );
}
