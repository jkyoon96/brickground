import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { ChromePicker } from 'react-color';
import { Collapse, Icon, Select, Row, Col, Checkbox, Button, Table, InputNumber, Modal, Card, Empty, Steps, Slider } from 'antd';
import $ from 'jquery';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, CART_PATH, LOGIN_PATH, MAIN_PATH, CREATIONS_PATH, CREATION_EDITOR_PATH, storageService } from 'common';

export const CreationListPanel = (props) => {

  const { creation, vrModelList, productList, vrAssets, lightColor, lightIntensity, onDisplayAsset, onAssemblyAsset, onLightColor, onLightIntensity, onZoomInOut, onSaveAsImage, onAutoRotate, onSettingInfo } = props;

  const [dataSource, setDataSource] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [visibleCartConfirm, setVisibleCartConfirm] = useState<boolean>(false);
  const [visibleSaveImageConfirm, setVisibleSaveImageConfirm] = useState<boolean>(false);
  const [visibleSettingInfoConfirm, setVisibleSettingInfoConfirm] = useState<boolean>(false);

  const [vrMallList, setVrMallList] = useState<any[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [maxLevel, setMaxLevel] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1);
  const [displaySpeed, setDisplaySpeed] = useState<number | undefined>(1);

  const [maxLightIntensity, setMaxLightIntensity] = useState<number>(3);
  const [lightStyle, setLightStyle] = useState<any>({display: ''});

  const [intervalId, setIntervalId] = useState<any>({});

  const history = useHistory();

  const copyRightImage = './images/copyright.jpg';


  //let intervalId;
  var level = 0;
  var playMode = true;
  var playDirection = true;


  useEffect(() => {

    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );
        if(user != undefined) {
          if(user.role > 8)
            setLightStyle({display: ''});
          else
            setLightStyle({display: ''});
        }
    }


    setDataSource(getDataSource());

    onWindowResize();
    window.addEventListener( 'resize',onWindowResize, false );

  }, [vrAssets, vrModelList]);


  const onWindowResize = () => {

    // if ($('#vrView_vrCanvas').offset().top != undefined) {
    //   $("#vrViewListPanel").css("top", $('#vrView_vrCanvas').offset().top + 10);
    //   $("#vrViewListPanel").css("left", $('#vrView_vrCanvas').offset().left + $('#vrView_vrCanvas').outerWidth() - 505);
    // }

    //$("#vrViewListPanel").css("top", $('html, body').offset().top + 10);
    //$("#vrViewListPanel").css("left", $('html, body').offset().left + $('#vrView_vrCanvas').outerWidth() - 505);

	}


  const handleDisplayAsset = (record, checked) => {
    console.log("click 보이기" , record, checked);

    onDisplayAsset(record, checked);
  };


  const handleAssetSum = (record, value) => {
    console.log("click 합계" , record, value);

    var assetModel = dataSource.find(element => element.key == record.key);

    if(assetModel == undefined)
      return;

    assetModel.sum = assetModel.count + value;

    setDataSource(JSON.parse(JSON.stringify(dataSource)));

  };


  // const genSaveExtra = () => (
  //   <Select id='vrViewClampColor' defaultValue={"#e4e4e4"} style={{ width: 70 }} size="small" onChange={value => handleColorAsset(value)}
  //       getPopupContainer={() => document.getElementById('vrViewClampColor') as HTMLElement} >
  //       <Option value="#e4e4e4">흰색</Option>
  //       <Option value="#0e1010">검정</Option>
  //     </Select>
  // );

  const clearSelection = () => {
    console.log('선택해제');

    setCurrent(maxLevel);

    setSelectedRowKeys([]);
    handleDisplayAsset([], true);
  };






  const getDataSource = () => {

    var treeData = new Array();
    var level = 0;

    vrAssets.forEach(vrAsset => {

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

      if(vrAsset.vrModelType.includes('lego') &&  instanceData.length > 0) {

        const modelKey = vrAsset.vrModelName;
        const modelNode = {
          modelKey : modelKey,
          modelSet : getSetName(vrAsset.vrModelId),
          type: "MODEL",
          key: modelKey,
          coverImage: getModelImageUrl(vrAsset.vrModelId),
          count: instanceData.length,

          // children: instanceData
        };

        treeData.push(modelNode);
      }

    });

    setMaxLevel(level + 1);
    setCurrent(level + 1);

    return treeData;
  }


  const getSetName = (vrModelId) => {

    var modelInfo = vrModelList.find(vrModel =>(vrModel.vrModelId == vrModelId ));

    if(modelInfo != undefined){

      if(modelInfo.setName != '99998')
        return modelInfo.setName;
      else
        return "호환부품";
    }

    return "";

  }

  const getModelImageUrl = (vrModelId) => {

    var modelInfo = vrModelList.find(vrModel =>(vrModel.vrModelId == vrModelId ))

    if(modelInfo != undefined){
      //return productInfo.coverImage.replace('.png', '_small.jpg');
      //return modelInfo.coverImage.replace('.png', '_thumb.png');
      return modelInfo.imagePath.replace('.jpg', '_S.jpg');
    }

    return undefined;

  }


  const getModelImageUrl2 = (vrModelName) => {

    var productInfo = productList.find(product =>(product.vrModelName == vrModelName ))

    if(productInfo == undefined)
      return;

    //return productInfo.coverImage.replace('.png', '_small.jpg');
    return productInfo.coverImage;

  }



  const handleAssemblyAsset = (current) => {
    console.log("click 조립순서 출력 " , current);

    stopDisplayAssembly();

    clearSelection();

    setCurrent(current);

    onAssemblyAsset(current);
  };



  const handleZoomInOut = (value) => {

    console.log('zoom value : ' + value);

    // if (value > zoomValue )
    //   onZoomInOut(1);
    // else if(value < zoomValue)
    //   onZoomInOut(-1);

    //setZoomValue(value);

    onZoomInOut(value);

  }

  const handlePlayRotate = () => {

    $('#creation_play_icon').hide();
    $('#creation_play_title').hide();

    $('#creation_pause_icon').show();
    $('#creation_pause_title').show();

    onAutoRotate();
  }

  const handlePauseRotate = () => {

    $('#creation_play_icon').show();
    $('#creation_play_title').show();

    $('#creation_pause_icon').hide();
    $('#creation_pause_title').hide();

    onAutoRotate();
  }

  const startDisplayAssembly = () => {


    $('#creation_play_assembly_icon').hide();
    $('#creation_stop_assembly_icon').show();


    if(displaySpeed == undefined)
      return;

    clearSelection();

    var tempId = setInterval(() => {checkDisplayLevel();}, 1000/speed );
    setIntervalId(tempId);

    console.log("startDisplayAssembly tempId : " + tempId);

  }

  const stopDisplayAssembly = () => {

    $('#creation_play_assembly_icon').show();
    $('#creation_stop_assembly_icon').hide();

    console.log("stopDisplayAssembly intervalId : " + intervalId);
    clearInterval(intervalId);

  }

  const handleSettingInfo = () => {

    if(displaySpeed == undefined)
      return;

    stopDisplayAssembly();

    setSpeed(displaySpeed);

  }


  const checkDisplayLevel = () => {

    //console.log("checkDisplayLevel before : " + playDirection + ", current : " + current + "maxLevel : " + maxLevel);

    if(playMode) {

      if(playDirection) {

        level ++;
        if(level > maxLevel){
          playDirection = false;
          //setPlayDirection(false);
        }
      }
      else {
        level --;

        if(level < 0)
          playDirection = true;
            //setPlayDirection(true);
      }

      //console.log("checkDisplayLevel after : playDirection: " + playDirection + ", level : " + level + "maxLevel : " + maxLevel);

      setCurrent(level);

      onAssemblyAsset(level);
    }

  }


  const genModifyExtra = () => {

    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined && user.role == 9) {
          return (<div>
                      <Link to={`${CREATION_EDITOR_PATH }/${creation.creationId}`}>수정하기 </Link>
                  </div>);
        }

        if(user != undefined && user.userId == creation.userId) {
          return (<div>
                      <Link to={`${CREATION_EDITOR_PATH }/${creation.creationId}`}>수정하기 </Link>
                  </div>);
        }
    }

    return (<div></div>);

  };


  const genAssemblyExtra = () => {


    return (<Row>
              <Col>
                <div id='creation_play_assembly_icon' style={{textAlign: 'center'}}>
                  <Button onClick={ e => startDisplayAssembly() } type="primary" size="small"  shape="circle" icon="retweet" style={controlStyle} />
                </div>
                <div id='creation_stop_assembly_icon' style={{display: 'none', textAlign: 'center'}}>
                  <Button onClick={ e => stopDisplayAssembly() } type="primary" size="small"  shape="circle" icon="pause" style={controlStyle} />
                </div>
              </Col>
            </Row>);

  };


  //ar dataSource = getDataSource();

  const columns = [
    {
      title: '',
      dataIndex: 'coverImage',
      align: 'center' as 'center',
      width: '30px',
      render: (coverImage: string) => (
        <Col span={2}>
        <img
          style={{ width: '25px', height: '25px' }}
          src={coverImage}
        />
        </Col>
      ),
    },
    {
      title: '모델',
      dataIndex: 'modelKey',
      align: 'center' as 'center', // NOTE: 멍충한 antd 때문에 assertion을 통해 한번 더 타입을 확정해 준다
      key: 'modelKey',
      width: '80px',
      render: (text, record) => (
          text.replace('clamp_', ' ')
      )
    },
    {
      title: '세트',
      dataIndex: 'modelSet',
      align: 'center' as 'center', // NOTE: 멍충한 antd 때문에 assertion을 통해 한번 더 타입을 확정해 준다
      key: 'modelSet',
      width: '60px',
      render: (text, record) => (
          text.replace('clamp_', ' ')
      )
    },
    {
      title: '부품수',
      dataIndex: 'count',
      align: 'center' as 'center',
      width: '60px',
      key: 'count'
    }
  ];



  // const gridStyle = {
  //   width: '410px',
  //   height: '220px',
  //   borderRadius: '5px',
  //   border: 'solid 1px rgba(255, 255, 255, 0.5)',
  //   margin: '12px',
  //   padding: '8px'
  // };

  const gridStyle = {
    width: '125px',
    height: '100px',
    borderRadius: '5px',
    border: '0px',
    marginTop: '10px',
    marginLeft: '10px',
    padding: '0px'
  };



  const { Panel } = Collapse;
  const { Option } = Select;
  const { Step } = Steps;

  const stepStyle = {
    paddingTop: '0px',
    paddingLeft: '10px',
    paddingRight: '5px',
    boxShadow: '0px -1px 0 0 #e8e8e8 inset',
  };

  const controlStyle = {
    backgroundColor: '#616365',
    border: '1px solid #616365',
    margin: '0px',
    padding: '0px'
  }

  const homeStyle = {
    backgroundColor: '#99999e',
    border: '1px solid #ffffff'
  }

  const rowSelection = {
    rowKey: 'modelKey',
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

      if(selectedRows.length > 0) {
        stopDisplayAssembly();
        setCurrent(maxLevel);
        handleDisplayAsset(selectedRows[0], true);
        setSelectedRowKeys(selectedRowKeys);
      }
    }
  }

  const getControlIcon = () => {
    return (
        <Row align='middle' style={{paddingTop: '10px', backgroundColor: '#99999e'}}>
          <Col span={3}>
            <div style={{textAlign: 'center'}}><Link to={MAIN_PATH}><Button onClick={e => {$('#MainHeader').show(); $('#MainFooter').show(); stopDisplayAssembly();}} type="primary" size="small" shape="circle" icon="home" style={homeStyle} ></Button></Link></div>
            <div style={{fontSize: '9px', textAlign: 'center'}}>HOME</div>
          </Col>
          <Col span={3}>
            <div style={{textAlign: 'center'}}><Link to={CREATIONS_PATH}><Button onClick={e => {$('#MainHeader').show(); $('#MainFooter').show();}} type="primary" size="small" shape="circle" icon="menu-unfold" style={controlStyle} ></Button></Link></div>
            <div style={{fontSize: '9px', textAlign: 'center'}}>목록</div>
          </Col>
          <Col span={3} offset={1}>
            <div style={{textAlign: 'center'}}><Button onClick={ e => handleZoomInOut(-1) } type="primary" size="small"  shape="circle" icon="zoom-in" style={controlStyle} ></Button></div>
            <div style={{fontSize: '9px', textAlign: 'center'}}>확대</div>
          </Col>
          <Col span={3}>
            <div style={{textAlign: 'center'}}><Button onClick={ e => handleZoomInOut(1) } type="primary" size="small"  shape="circle" icon="zoom-out" style={controlStyle}></Button></div>
            <div style={{fontSize: '9px', textAlign: 'center'}}>축소</div>
          </Col>
          <Col span={3}>
            <div id='creation_play_icon' style={{display: 'none', textAlign: 'center'}}><Button onClick={ handlePlayRotate } type="primary" shape="circle"  size="small" icon="play-circle" style={controlStyle}></Button></div>
            <div id='creation_play_title' style={{display: 'none', fontSize: '9px', textAlign: 'center'}}>회전</div>
            <div id='creation_pause_icon' style={{textAlign: 'center'}}><Button onClick={ handlePauseRotate } type="primary" shape="circle"  size="small" icon="pause-circle" style={controlStyle}></Button></div>
            <div id='creation_pause_title' style={{fontSize: '9px', textAlign: 'center'}}>멈춤</div>
          </Col>
          <Col span={4}>
            <div style={{textAlign: 'center'}}><Button onClick={ () =>  setVisibleSaveImageConfirm(true) } type="primary" shape="circle"  size="small"  icon="file-image" style={controlStyle}></Button></div>
            <div style={{fontSize: '9px', textAlign: 'center'}}>스크린샷</div>
            <Modal
              visible={visibleSaveImageConfirm}
              closable={false}
              title=""
              footer={[
                        <Button key="save_back" onClick={() => setVisibleSaveImageConfirm(false)}>
                          취소하기
                        </Button>,
                        <Button key="save_submit" onClick={e => { onSaveAsImage(); setVisibleSaveImageConfirm(false); } }>
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
          <Col span={3} offset={1}>
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
                        <Button key="save_submit" onClick={e => { handleSettingInfo(); setVisibleSettingInfoConfirm(false); } }>
                          설정하기
                        </Button>,
                      ]}
              >
              <div style={{ margin: 'auto', textAlign: 'center' }} >
                <Row>
                  <Col span={4}>
                    조립속도
                  </Col>
                  <Col span={4}>
                    <InputNumber
                      min={1}
                      max={10}
                      style={{ marginLeft: 16 }}
                      defaultValue={displaySpeed}
                      onChange={(val) => setDisplaySpeed(val)}
                    />
                  </Col>
                </Row>
              </div>

            </Modal>
          </Col>
        </Row>
      );

  }

  return (
    <div>
      <div id="creationListPanel" className='vrview-container' style={{ height: "100vh" }}>
        <Collapse
          defaultActiveKey={[1, 2, 3, 4]}
        >
          <Panel header={getControlIcon()}  key="1" showArrow={false} style={{height: '75px'}} >

          </Panel>
          <Panel header="조립하기"  key="2" extra={genAssemblyExtra()} style={{ minHeight: "90px", maxHeight: "15vh", overflow: "auto" }}>
            <Row>
              <Col span={15}>
                <Slider
                  min={0}
                  max={maxLevel}
                  onChange={handleAssemblyAsset}
                  value={current}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={0}
                  max={maxLevel}
                  style={{ marginLeft: 16 }}
                  value={current}
                  onChange={handleAssemblyAsset}
                />
              </Col>
            </Row>
          </Panel>
          <Panel header="부품목록"  key="3" style={{ maxHeight: "80vh", overflow: "auto" }} >
            <Row type="flex" justify="space-around" align="middle">
              <Col span={24}>
                <Table
                  className='vr-table-row-select'
                  rowSelection={{
                    type: 'radio',
                  ...rowSelection }}
                  columns={columns}
                  dataSource={dataSource}
                  pagination={false}
                  size="small"
                />
              </Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle" style={{ marginTop: '12px' }} >
              <Col span={8}>
                <Button onClick={()=>{stopDisplayAssembly(); clearSelection();}} style={{backgroundColor: '#99999e', border: '0px', color: '#ffffff'}}>포커스 해제</Button>
              </Col>
            </Row>
          </Panel>
          <Panel header="라이트"   key="4" style={lightStyle} >
            <Row type="flex" justify="space-around" align="middle" style={{display: "none"}}>

              <ChromePicker
                width={300}
                color={lightColor}
                onChangeComplete={ (color) => {onLightColor(color.hex); console.log('color hex : ' + color.hex);} }
              />

            </Row>
            <Row type="flex" align="middle" style={{ marginTop: '12px' }} >
              <Col span={3} style={{ marginLeft: '5px' }}>
                강도
              </Col>
              <Col span={12}>
                <Slider
                  min={0}
                  step={0.1}
                  max={maxLightIntensity}
                  onChange={value => onLightIntensity(value)}
                  value={lightIntensity}
                />
              </Col>
              <Col span={3}>
                <InputNumber
                  min={0}
                  step={0.1}
                  max={maxLightIntensity}
                  style={{ marginLeft: 16 }}
                  value={lightIntensity}
                  onChange={value => onLightIntensity(value)}
                />
              </Col>
            </Row>

          </Panel>
        </Collapse>
      </div>
    </div>

  );
}
