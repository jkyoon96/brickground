import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Collapse, Icon, Select, Row, Col, Checkbox, Button, Table, Empty, Input, InputNumber, Divider, Slider, Modal, Dropdown, Tooltip } from 'antd';
import $ from 'jquery';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, MAIN_PATH, VR_MALLS_PATH, MANUALS_LIST_PATH } from 'common';


export const VrEditorListPanel = (props) => {

  const { vrModelList,
          vrAssets,
          refreshMode,
          colorDataList,
          onAddAsset,
          onSaveAsset,
          onSelectAsset,
          onFocusAsset,
          onDisplayAsset,
          onColorAsset,
          onAssemblyLevelAsset,
          onTransformValueChange,
          onAssemblyAsset,
          onAssemblyHideAsset,
          onAssemblySaveAsset,
          onInitAssembly,
          onBackground,
          onSaveAsImage,
          onSettingInfo,
          onExportToStl,
          onExportToGltf} = props;


  const [dataSource, setDataSource] = useState<any[]>([]);
  const [selectedModelName, setSelectedModelName] = useState<string>('');
  const [productList, setProductList] = useState<any[]>([]);

  const [current, setCurrent] = useState<number>(0);
  const [maxLevel, setMaxLevel] = useState<number>(0);
  const [startStep, setStartStep] = useState<number>(0);
  const [endStep, setEndStep] = useState<number>(0);
  const [stepRange, setStepRange] = useState<[number,number]>([0,0]);

  const [antialias, setAntialias] = useState<boolean>(true);
  const [pixelRatio, setPixelRatio] = useState<number | undefined>(1);
  const [outline, setOutline] = useState<boolean>(false);

  const [visibleSaveImageConfirm, setVisibleSaveImageConfirm] = useState<boolean>(false);
  const [visibleSettingInfoConfirm, setVisibleSettingInfoConfirm] = useState<boolean>(false);
  const [visibleExportStlConfirm, setVisibleExportStlConfirm] = useState<boolean>(false);
  const [visibleExportGltfConfirm, setVisibleExportGltfConfirm] = useState<boolean>(false);
  const [visibleInitAssemblyConfirm, setVisibleInitAssemblyConfirm] = useState<boolean>(false);

  const [positionx, setPositionx] = useState<number | undefined>(0);
  const [positiony, setPositiony] = useState<number | undefined>(0);
  const [positionz, setPositionz] = useState<number | undefined>(0);

  const [rotationx, setRotationx] = useState<number | undefined>(0);
  const [rotationy, setRotationy] = useState<number | undefined>(0);
  const [rotationz, setRotationz] = useState<number | undefined>(0);

  const [checkedAssetList, setCheckedAssetList] = useState<string[]>([]);

  const [color, setColor] = useState<string>('');

  const [assetColor, setAssetColor] = useState<number>(0xFAC80A);
  const [opacity, setOpacity] = useState<number>(0);
  const [beforeAssetId, setBeforeAssetId] = useState<string>('');

  const copyRightImage = './images/copyright.jpg';



  useEffect(() => {

    //getProductsData();
    setDataSource(getDataSource(vrAssets));

    onWindowResize();
    window.addEventListener( 'resize',onWindowResize, false );
  }, [vrAssets]);


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

    $("#vrListPanel").css("top", $('html, body').offset().top + 5);
    $("#vrListPanel").css("left", $('html, body').offset().left + $('#vrEditor_vrCanvas').outerWidth() - 480);

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
      return modelInfo.imagePath.replace('.jpg', '_S.jpg');
    }

    return undefined;

  }


  const handleAddAsset = (vrModel) => {
    console.log("click 추가" , vrModel);

    var lastIndex = "100";

    var assetModel = dataSource.find(element => element.key == vrModel.vrModelName);

    if(assetModel != undefined) {
      const lastInstance = assetModel.children[assetModel.children.length -1];

      if(lastInstance != undefined)
        lastIndex = lastInstance.key.substring(lastInstance.key.lastIndexOf('_') + 1);
    }

    const index = parseInt(lastIndex) + 1;
    const assetKey = vrModel.vrModelName + '_' + index;
    const assetInstance = {
      title: assetKey,
      type: "INSTANCE",
      key: assetKey,
      assemblyLevel: "0"
    };

    if(assetModel != undefined) {
      assetModel.children.push(assetInstance);
      setDataSource(JSON.parse(JSON.stringify(dataSource)));
    }

    setSelectedModelName(assetKey);

    onAddAsset(vrModel.vrModelName, assetKey);

  };


  const handleSelectAsset = (record) => {
    console.log("click 선택" , record);

    setSelectedModelName(record.title);

    onSelectAsset(record);
  };

  const handleFocusAsset = (record) => {
    console.log("click 포커스" , record);

    setSelectedModelName(record.title);

    onFocusAsset(record);
  };


  const handleAssemblyAsset = (values) => {
    console.log("click 조립순서 출력 " , current);

    //setCurrent(current);
    setStartStep(values[0]);
    setEndStep(values[1]);

    setStepRange(values);

    onAssemblyAsset(values[0], values[1]);
  };

  const handleAssemblyStartStep = (value) => {
    console.log("handleAssemblyStartStep : " , value);

    if(endStep < value)
      return;

    setStartStep(value);

    setStepRange([value, endStep]);

    onAssemblyAsset(value, endStep);
  };

  const handleAssemblyEndStep = (value) => {
    console.log("handleAssemblyEndStep : " , value);

    if(startStep > value)
      return;

    setEndStep(value);
    setStepRange([startStep, value]);

    onAssemblyAsset(startStep, value);
  };

  const handleAssembleyLevelAsset = (record, value) => {
    console.log("click 조립순서 저장 " , record, value);

    onAssemblyLevelAsset(record, value);

    if(value > maxLevel) {
      setMaxLevel(value);
      setEndStep(value);
      setStepRange([startStep, value]);
    }

  };

  const handleDisplayAsset = (record, checked) => {
    console.log("click 보이기" , record, checked);

    onDisplayAsset(record, checked);
  };

  const handleInitAssembly = () => {
    console.log("조립단계 초기화 ");

    setDataSource([]);

    onInitAssembly();

  };

/*
  const handleColorAsset = (record, color) => {
    console.log("click 색깔바꾸기" , color);

    const value = color;

    onColorAsset(record, value);
  };
*/
  const handleAssetColor = (assetColor) => {

    if(beforeAssetId !== ''){
      let beforeElement = document.getElementById(beforeAssetId);
      if( beforeElement != null)
        beforeElement.style.border = "0px";
    }

    let element = document.getElementById(assetColor.id);
    if( element != null)
      element.style.border = "thick solid tomato";
    setBeforeAssetId(assetColor.id);

    setAssetColor(assetColor.color);

    onColorAsset(assetColor);
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


  const genSaveExtra = () => (
    <div>
      <a
        onClick={event => {
          onSaveAsset();
          event.stopPropagation();
        }}
      > 저장</a>
    </div>
  );


  const genAssemblySaveExtra = () => (
    <div>
      <a
        onClick={event => {
          onAssemblySaveAsset(maxLevel);
          event.stopPropagation();
        }}
      > 부품저장</a>
    </div>
  );

  const genAssetNameExtra = () => (
    <div id="vrEditor_Asset_Name">
    </div>
  );


  const getDataSource = (vrAssetList) => {

    var treeData = new Array();
    var level = 0;

    console.log('vrAssetList2 : ' + vrAssetList);

    vrAssetList.forEach(vrAsset => {

      if(vrAsset == undefined)
        return;

      var instanceData = new Array();

      if(vrAsset.instances != undefined) {
        vrAsset.instances.forEach(instance => {

          if(instance != undefined) {

            const instanceKey = instance.instanceName;
            const instanceNode = {
              title: instanceKey,
              type: "INSTANCE",
              key: instanceKey,
              assemblyLevel: instance.assemblyLevel
            };

            if(level < Number.parseInt(instance.assemblyLevel))
              level = Number.parseInt(instance.assemblyLevel);

            instanceData.push(instanceNode);
          }

        });
      }

      instanceData.sort(function(a, b) {

                                  if (a.key < b.key) {
                                    return -1;
                                  }
                                  if (a.key > b.key) {
                                    return 1;
                                  }

                                  // 이름이 같을 경우
                                  return 0;
                                });

      const modelKey = vrAsset.vrModelName;
      const modelNode = {
        title: modelKey,
        type: "MODEL",
        key: modelKey,
        coverImage: getModelImageUrl(modelKey),
        children: instanceData
      };

      treeData.push(modelNode);

    });

    if(refreshMode) {
      setMaxLevel(level);
      setEndStep(level);
      setStepRange([0, level]);
      setCurrent(level);

      onAssemblyAsset(0, level);
    }

    return treeData;
  }


  //ar dataSource = getDataSource();

  const columns = [
    {
      title: `모델  ${selectedModelName}`,
      dataIndex: 'title',
      align: 'left' as 'left', // NOTE: 멍충한 antd 때문에 assertion을 통해 한번 더 타입을 확정해 준다
      key: 'title',
      render: (title, record) => {
        if (record.type == "MODEL")
          return (
            <span>
              <img
                style={{ width: '25px', height: '25px' }}
                src={record.coverImage}
              /> {record.title}
            </span>
          )
         else
          return (
            <span> {record.title} </span>
          )
      },

    },
    {
      title: '',
      key: 'action',
      render: (text, record) => {
        if (record.type == "MODEL")
          return (
            <div>
              <span>( {record.children.length} )</span>
            </div>
          )
         else
          return (
            <div>
              <span><InputNumber id="vrEditorAssemblyLevel" size="small" min={0} defaultValue={record.assemblyLevel} onChange={value => handleAssembleyLevelAsset(record, value)} ></InputNumber></span>
              <span><a onClick={e => handleFocusAsset(record)} >포커스</a>
                    <Checkbox defaultChecked={true} onChange={(e) => handleDisplayAsset(record, e.target.checked)} />
              </span>
            </div>
          )
      },
    },
  ];


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
            <div style={{textAlign: 'center'}}><Link to={MANUALS_LIST_PATH}><Button onClick={e => {$('#MainHeader').show(); $('#MainFooter').show();}} type="primary" size="small" shape="circle" icon="menu-unfold" style={controlStyle} ></Button></Link></div>
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
                    Pixel Ratio
                  </Col>
                  <Col span={4}>
                    <InputNumber
                      min={1}
                      max={4}

                      defaultValue={pixelRatio}
                      onChange={(val) => setPixelRatio(val)}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
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
                    조립단계
                  </Col>
                  <Col span={4}>
                    <Button key="init_assembly" onClick={e => { setVisibleSettingInfoConfirm(false); setVisibleInitAssemblyConfirm(true);} }>
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
                        <Button key="assembly_submit" onClick={e => { handleInitAssembly(); setVisibleInitAssemblyConfirm(false); } }>
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

  const getColorSettingMenu = () => {

    return (
      <>
        <Row gutter={[8, 8]} style={{padding: '0px 10px'}}>
          {colorDataList ? (
            colorDataList.map(colorSet => {

              if(colorSet.id == 1) {
                return (
                  <Col span={3} key={colorSet.id} >
                    <a  onClick={e => handleAssetColor(colorSet)}>
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
                    <a  onClick={e => handleAssetColor(colorSet)}>
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
      </>
    );
  }


  return (
    <div>

      <div id="vrListPanel" className='vreditor-container' style={{ height: "100vh" }}>
        <Collapse
          defaultActiveKey={['2', '3', '6']}
        >
          <Panel header={getControlIcon()}  key="1" showArrow={false} style={{height: '75px'}} >

          </Panel>
          <Panel header="레고 부품 목록"  key="2"  style={{ maxHeight: "30vh", overflow: "auto"  }} >

              <Row gutter={[8, 8]} style={{padding: '0px 10px'}}>
                {vrModelList ? (
                  vrModelList.map(vrModel => { return (

                    <Col span={4} key={vrModel.vrModelId} >
                      <a  onClick={e => handleAddAsset(vrModel)}>
                        <div className="img-container">
                          <img
                            alt={vrModel.description}
                            src={vrModel.imagePath.replace('.jpg', '_S.jpg')}
                            style={{width: '100%', height: '100%'}}
                            title={vrModel.description}
                          />
                        </div>
                      </a>
                    </Col>
                  )})
                ) : (
                  <Empty />
                )}

              </Row>

          </Panel>
          <Panel header="선택하기" key="3" extra={genSaveExtra()} style={{ maxHeight: "35vh", overflow: "auto" }} >
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={false}
              scroll={{y: 360 }}
              size="small"
            />
          </Panel>
          <Panel header="조립단계보기"  key="4" extra={genAssemblySaveExtra()} style={{ maxHeight: "15vh", overflow: "auto" }}>
            <Row>
              <Col span={11}>
                <Slider
                  range
                  min={0}
                  max={maxLevel}
                  value={stepRange}
                  onChange={handleAssemblyAsset}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={0}
                  max={maxLevel}
                  style={{ marginLeft: 16 }}
                  value={startStep}
                  onChange={handleAssemblyStartStep}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={0}
                  max={maxLevel}
                  style={{ marginLeft: 8 }}
                  value={endStep}
                  onChange={handleAssemblyEndStep}
                />
              </Col>
            </Row>
          </Panel>
          <Panel header="설정하기" key="5" extra={genAssetNameExtra()} style={{maxHeight: "15vh"}}>
            <Row type="flex" justify="space-around" align="middle" gutter={[16, 16]} >
              <Col span={6}></Col>
              <Col span={6}><span>X</span></Col>
              <Col span={6}><span>Y</span></Col>
              <Col span={6}><span>Z</span></Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle" gutter={[16, 16]} >
              <Col span={6}> 위치</Col>
              <Col span={6}><InputNumber id="vrEditor_Properties_Px" size="small" step={0.4} defaultValue={positionx} onChange={value => setPositionx(value)} onPressEnter={() => onTransformValueChange('position', 'x', positionx)}></InputNumber></Col>
              <Col span={6}><InputNumber id="vrEditor_Properties_Py" size="small" step={0.4} defaultValue={positiony} onChange={value => setPositiony(value)} onPressEnter={() => onTransformValueChange('position', 'y', positiony)}></InputNumber></Col>
              <Col span={6}><InputNumber id="vrEditor_Properties_Pz" size="small" step={0.4} defaultValue={positionz} onChange={value => setPositionz(value)} onPressEnter={() => onTransformValueChange('position', 'z', positionz)}></InputNumber></Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle" gutter={[16, 16]} >
              <Col span={6}> 회전</Col>
              <Col span={6}><InputNumber id="vrEditor_Properties_Rx" size="small" step={15} defaultValue={rotationx} onChange={value => setRotationx(value)} onPressEnter={() => onTransformValueChange('rotation', 'x', rotationx)}></InputNumber></Col>
              <Col span={6}><InputNumber id="vrEditor_Properties_Ry" size="small" step={15} defaultValue={rotationy} onChange={value => setRotationy(value)} onPressEnter={() => onTransformValueChange('rotation', 'y', rotationy)}></InputNumber></Col>
              <Col span={6}><InputNumber id="vrEditor_Properties_Rz" size="small" step={15} defaultValue={rotationz} onChange={value => setRotationz(value)} onPressEnter={() => onTransformValueChange('rotation', 'z', rotationz)}></InputNumber></Col>
            </Row>
          </Panel>

          <Panel header="색깔선택"  key="6" style={{ maxHeight: "30vh", overflow: "auto"  }}>

              {getColorSettingMenu()}

          </Panel>
        </Collapse>
      </div>
    </div>

  );
}
