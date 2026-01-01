import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { SketchPicker } from 'react-color';
import { Collapse, Icon, Select, Row, Col, Checkbox, Button, Table, Empty, Divider, Slider, Modal, Dropdown, Tooltip, Input } from 'antd';
import $ from 'jquery';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, MAIN_PATH, DOTARTS_PATH, storageService } from 'common';


export const DotArtEditor2DListPanel = (props) => {

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
          dotRowCountContainer,
          dotColumnCountContainer,
          dotColorContainer,
          dotColorIdContainer,
          cameraZoomContainer,
          pixelSizeContainer,
          onShowPixelGuide,
          onSyncColor,
          onPixelSize,
          onCameraZoom,
          onCreationName,
          onCategoryId,
          onSubjectId,
          onSizeId,
          onVisible,
          onUploadPixelImage,
          onDotColor,
          onDotCount,
          onSaveCreation,
          onBackground,
          onSaveAsImage,
          onSaveAsThumbImage,
          onSettingInfo,
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

  const [checkedAssetList, setCheckedAssetList] = useState<string[]>([]);

  const [rowCount, setRowCount] = useState<number>(8);
  const [columnCount, setColumnCount] = useState<number>(8);
  const [baseColor, setBaseColor] = useState<number>(0x1b2a34);

  const [beforeDotId, setBeforeDotId] = useState<string>('');

  const [templeteColor, setTempleteColor] = useState<string>("#121212");
  const [colorRgb, setColorRgb] = useState<string>("");
  const [opacity, setOpacity] = useState<number>(0);

  const copyRightImage = './images/copyright.jpg';


  useEffect(() => {

    setDataSource(colorDataList);

    if(vrModel.dotRowCount != undefined)
      setRowCount(vrModel.dotRowCount);

    if(vrModel.dotColumnCount != undefined)
      setColumnCount(vrModel.dotColumnCount);

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

    console.log("colorId : " + colorId);

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


  const onWindowResize = () => {

    $("#dotartListPanel").css("top", $('html, body').offset().top + 5);
    $("#dotartListPanel").css("left", $('html, body').offset().left + $('#dotartEditor_vrCanvas').outerWidth() - 480);

	}


  const handleDotColor = (dotColor) => {

    console.log("handleDotColor Id : " + dotColor.id);

    if(beforeDotId !== ''){
      let beforeElement = document.getElementById(beforeDotId);
      if( beforeElement != null)
        beforeElement.style.border = "0px";
    }

    let element = document.getElementById(dotColor.id);
    if( element != null)
      element.style.border = "thick solid tomato";
    setBeforeDotId(dotColor.id);

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

  const handleSettinInfo = () => {

    console.log('handleSettinInfo : ');

  }



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
            <div style={{textAlign: 'center'}}><Link to={`${DOTARTS_PATH}?categoryId=${creation.categoryId}`}><Button onClick={e => {$('#MainHeader').show(); $('#MainFooter').show();}} type="primary" size="small" shape="circle" icon="menu-unfold" style={controlStyle} ></Button></Link></div>
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
                <Row style={{ marginTop: 10 }}>
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
          <Col span={5} style={{paddingLeft: '10px', fontWeight: 'bold'}}>
            가로 픽셀
          </Col>
          <Col span={6} style={{backgroundColor: '#ffffff', height: '40px'}}>
            <Select value={rowCount} style={{ height: '40px', width: '100px' }} onChange={value => handleRowCount(value)}>
              <Option value={16}>16 </Option>
              <Option value={32}>32 </Option>
              <Option value={48}>48 </Option>
              <Option value={64}>64 </Option>
              <Option value={80}>80 </Option>
              <Option value={96}>96 </Option>
              <Option value={112}>112 </Option>
              <Option value={128}>128 </Option>
              <Option value={144}>144 </Option>
              <Option value={160}>160 </Option>
              <Option value={176}>176 </Option>
              <Option value={192}>192 </Option>
              <Option value={208}>208 </Option>
              <Option value={224}>224 </Option>
              <Option value={240}>240 </Option>
              <Option value={256}>256 </Option>
              <Option value={272}>272 </Option>
              <Option value={288}>288 </Option>
              <Option value={304}>304 </Option>
              <Option value={320}>320 </Option>
            </Select>
          </Col>
          <Col span={5} offset={1} style={{paddingLeft: '10px', fontWeight: 'bold'}}>
            크기 배율
          </Col>
          <Col span={6} style={{backgroundColor: '#ffffff', height: '40px'}}>
            <Select value={cameraZoomContainer} style={{ height: '40px', width: '100px'}} onChange={value => onCameraZoom(value)}>
              <Option value={1}>100 % </Option>
              <Option value={2}>200 % </Option>
              <Option value={3}>300 % </Option>
              <Option value={4}>400 % </Option>
              <Option value={5}>500 % </Option>
              <Option value={6}>600 % </Option>
              <Option value={7}>700 % </Option>
              <Option value={8}>800 % </Option>
              <Option value={9}>900 % </Option>
              <Option value={10}>1000 % </Option>
              <Option value={11}>1100 % </Option>
              <Option value={12}>1200 % </Option>
              <Option value={13}>1300 % </Option>
              <Option value={14}>1400 % </Option>
              <Option value={15}>1500 % </Option>
              <Option value={16}>1600 % </Option>
              <Option value={17}>1700 % </Option>
              <Option value={18}>1800 % </Option>
              <Option value={19}>1900 % </Option>
              <Option value={20}>2000 % </Option>
            </Select>
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={5} style={{paddingLeft: '10px', fontWeight: 'bold'}}>
            세로 픽셀
          </Col>
          <Col span={6} style={{backgroundColor: '#ffffff', height: '40px'}}>
            <Select value={columnCount} style={{ height: '40px', width: '100px'  }} onChange={value => handleColumnCount(value)}>
              <Option value={16}>16 </Option>
              <Option value={32}>32 </Option>
              <Option value={48}>48 </Option>
              <Option value={64}>64 </Option>
              <Option value={80}>80 </Option>
              <Option value={96}>96 </Option>
              <Option value={112}>112 </Option>
              <Option value={128}>128 </Option>
              <Option value={144}>144 </Option>
              <Option value={160}>160 </Option>
              <Option value={176}>176 </Option>
              <Option value={192}>192 </Option>
              <Option value={208}>208 </Option>
              <Option value={224}>224 </Option>
              <Option value={240}>240 </Option>
              <Option value={256}>256 </Option>
              <Option value={272}>272 </Option>
              <Option value={288}>288 </Option>
              <Option value={304}>304 </Option>
              <Option value={320}>320 </Option>
            </Select>
          </Col>
          <Col span={5}  offset={1}  style={{paddingLeft: '10px', fontWeight: 'bold'}}>
            픽셀 크기
          </Col>
          <Col span={6} style={{backgroundColor: '#ffffff', height: '40px'}}>
            <Select value={pixelSizeContainer} style={{ height: '40px', width: '100px'}} onChange={value => onPixelSize(value)}>
              <Option value={1}>1 </Option>
              <Option value={2}>2 </Option>
              <Option value={3}>3 </Option>
              <Option value={4}>4 </Option>
              <Option value={5}>5 </Option>
              <Option value={6}>6 </Option>
              <Option value={7}>7 </Option>
              <Option value={8}>8 </Option>
              <Option value={9}>9 </Option>
              <Option value={10}>10 </Option>
            </Select>
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={24} style={{paddingLeft: '10px', fontWeight: 'bold', marginTop: '5px'}}>
            픽셀 가이드 <Checkbox onChange={(e) => {e.target.checked ? onShowPixelGuide(1) : onShowPixelGuide(0)}}> </Checkbox>
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
                        <div id={colorSet.id} style={{height: '30px', width: '40px', backgroundColor: colorSet.color, color: '#888888', textAlign: 'center', paddingTop: '5px', border:'thick solid tomato'}}>
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
          <Col span={16}>
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
                  <Col span={7} offset={1}>
                    <Button type="primary" onClick={onSyncColor} style={{ width:'100%', fontWeight: 800}}>
                      <span>색깔 동기화</span>
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
          <Col span={7} offset={1}>
            <Button type="primary" onClick={onSyncColor} style={{ width:'100%', fontWeight: 800}}>
              <span>색깔 동기화</span>
            </Button>
          </Col>
        </Row>
      </>
    );

  }



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

          <Panel header="도트색깔선택"  key="4" >

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
