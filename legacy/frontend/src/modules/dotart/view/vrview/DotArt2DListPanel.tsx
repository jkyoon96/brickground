import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { Collapse, Icon, Select, Row, Col, Checkbox, Button, Table, InputNumber, Modal, Card, Empty, Steps, Slider, Tooltip } from 'antd';
import $ from 'jquery';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, CART_PATH, LOGIN_PATH, MAIN_PATH, DOTART_EDITOR_PATH, DOTARTS_PATH, storageService } from 'common';

export const DotArt2DListPanel = (props) => {

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

  const [intervalId, setIntervalId] = useState<any>({});
  const [baseDotModel, setBaseDotModel] = useState<number>(4161734);

  const [frameMode, setFrameMode] = useState<boolean>(false);

  const { creation,
          productList,
          dotColorIdList,
          colorDataList,
          dotRowCountContainer,
          dotColumnCountContainer,
          onZoomInOut,
          onSaveAsImage,
          onSaveAsBlock,
          onShowBlock } = props;

  const history = useHistory();

  const copyRightImage = './images/copyright.jpg';


  useEffect(() => {

    setDataSource(getDataSource());

    onWindowResize();
    window.addEventListener( 'resize',onWindowResize, false );

  }, [dotColorIdList]);



  const onWindowResize = () => {

    // if ($('#vrView_vrCanvas').offset().top != undefined) {
    //   $("#vrViewListPanel").css("top", $('#vrView_vrCanvas').offset().top + 10);
    //   $("#vrViewListPanel").css("left", $('#vrView_vrCanvas').offset().left + $('#vrView_vrCanvas').outerWidth() - 505);
    // }

    //$("#vrViewListPanel").css("top", $('html, body').offset().top + 10);
    //$("#vrViewListPanel").css("left", $('html, body').offset().left + $('#vrView_vrCanvas').outerWidth() - 505);

	}

  const getColor = (colorId) => {

    //console.log("colorStr : " + color);

    let color = '#29864A';

    const colorData = colorDataList.find(data => data.id == colorId);
    //const colorData = colorDataList[colorId - 1];

    if(colorData != undefined)
      color = colorData.color;

    return color;
  }

  const getColorTitle = (colorId) => {

    let colorTitle = ''

    const colorData = colorDataList.find(data => data.id == colorId);
    //const colorData = colorDataList[colorId - 1];

    if(colorData != undefined)
      colorTitle = colorData.title;

    return colorTitle;
  }

  const getDataSource = () => {

    var treeData = new Array();

    var colorIdCountMap = new Map<number, number>();
    for (var index = 0; index < dotColorIdList.length; index++) {
      var dotColorId = dotColorIdList[index];

      var dotColorIdCount = colorIdCountMap.get(dotColorId);
      if(dotColorIdCount == undefined) {
        colorIdCountMap.set(dotColorId, 1);
      }
      else {
        colorIdCountMap.set(dotColorId, dotColorIdCount + 1);
      }
    }

    let totalCount = 0;

    colorIdCountMap.forEach((count, colorId) => {

      const colorNode = {
        key: colorId,
        color: getColor(colorId),
        count: count,
        title: getColorTitle(colorId)
      };

      //console.log("colorId : " + colorId);
      totalCount += count;

      treeData.push(colorNode);

    });

    console.log("totalCount : " + totalCount);


    treeData.sort((a, b) => a.key - b.key)

    return treeData;
  }


  const addCartFrame = (userId, carts) => {

    addCartItem(userId, carts, 1000000108);
  	addCartItem(userId, carts, 1000000109);
  	addCartItem(userId, carts, 1000000110);
  	addCartItem(userId, carts, 1000000111);
  	addCartItem(userId, carts, 1000000112);
  	addCartItem(userId, carts, 1000000113);
  	addCartItem(userId, carts, 1000000114);
  	addCartItem(userId, carts, 1000000115);
  	addCartItem(userId, carts, 1000000116);
  	addCartItem(userId, carts, 1000000117);
  	addCartItem(userId, carts, 1000000118);
  	addCartItem(userId, carts, 1000000119);

  }

  const addCartItem = (userId, carts, productId) => {

    var count = 0;
    var rowCount = dotRowCountContainer / 16;
    var columnCount = dotColumnCountContainer / 16;

    var productData = productList.find(element => element.productId == productId);

    if(productData != null) {

      switch (productId) {
          case 1000000106:
              count = rowCount * columnCount;
              break;
          case 1000000107:
              count = 3 * ((rowCount - 1) * columnCount + (columnCount - 1) * rowCount);
              break;
          case 1000000108:
          case 1000000109:
          case 1000000110:
              count = 4;
              break;
          case 1000000111:
              count = 2 * (rowCount + columnCount);
              break;
          case 1000000112:
              count = 12;
              break;
          case 1000000113:
              count = 2 * (rowCount + columnCount);
              break;
          case 1000000114:
              count = 2 * (rowCount - 1 + (columnCount - 1));
              break;
          case 1000000115:
              count = 2 * (rowCount + columnCount + (rowCount - 1 + (columnCount - 1)));
              break;
          case 1000000116:
              count = 2 * (rowCount - 1 + (columnCount - 1));
              break;
          case 1000000117:
              count = 8;
              break;
          case 1000000118:
              count = 4 * (rowCount + columnCount);
              break;
          case 1000000119:
              count = 4
      }

      var cart = {
                  shopId: SHOP_ID,
                  userId: userId,
                  count: count,
                  productId: productData.productId,
                  productName: productData.productName,
                  coverImage: productData.coverImage,
                  price: productData.price
                };
      carts.push(cart);
    }

  }


  const saveCartToServer = () => {

    var userId = -1;
    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined) {
          userId = user.userId;
        }
    }
    else {
      //location.href = LOGIN_PATH;
      history.push(LOGIN_PATH);
    }

    var carts:any[] = [];

    dataSource.forEach(colorData => {
      var productData = productList.find(element => element.productName == 'DOT ' + colorData.key);

      if(productData != null) {
        var cart = {
                    shopId: SHOP_ID,
                    userId: userId,
                    count: colorData.count,
                    productId: productData.productId,
                    productName: productData.productName,
                    coverImage: productData.coverImage,
                    price: productData.price
                  };
        carts.push(cart);
      }
    });

    addCartItem(userId, carts, 1000000106);
    addCartItem(userId, carts, 1000000107);

    if(frameMode) {
      addCartFrame(userId, carts);
    }


    let url = SOPOONG_URL + SHOP_URL + '/carts.do';

    fetch( url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(carts)
    } )
      .then(response => response.json())
      .then(data => {
                      console.log(data);

                      setVisibleCartConfirm(true);
                    })
      .catch(err => console.log(err));

  }




  const handleZoomInOut = (value) => {

    console.log('zoom value : ' + value);

    // if (value > zoomValue )
    //   onZoomInOut(1);
    // else if(value < zoomValue)
    //   onZoomInOut(-1);

    //setZoomValue(value);

    onZoomInOut(value);

  }


  const handleSettingInfo = () => {

  }



  const genModifyExtra = () => {

    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined && user.role == 9) {
          return (<div>
                      <Link to={`${DOTART_EDITOR_PATH }/${creation.creationId}`}>수정하기 </Link>
                  </div>);
        }

        if(user != undefined && user.userId == creation.userId) {
          return (<div>
                      <Link to={`${DOTART_EDITOR_PATH }/${creation.creationId}`}>수정하기 </Link>
                  </div>);
        }
    }

    return (<div></div>);

  };


  //ar dataSource = getDataSource();

  const columns = [
    {
      title: '',
      dataIndex: 'color',
      align: 'center' as 'center', // NOTE: 멍충한 antd 때문에 assertion을 통해 한번 더 타입을 확정해 준다
      width: '30px',
      render: (color, record) => (
          <div id={record.key} style={{marginLeft: '10px', height: '30px', width: '30px', backgroundColor: `${color}`}}>
          </div>
      )
    },
    {
      title: 'Id',
      dataIndex: 'key',
      width: '20px'
    },
    {
      title: '색깔명',
      dataIndex: 'title',
      width: '110px'
    },
    {
      title: '부품수',
      dataIndex: 'count',
      align: 'center' as 'center',
      width: '40px'
    }

  ];



  const { Panel } = Collapse;
  const { Option } = Select;
  const { Step } = Steps;

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


  const getControlIcon = () => {
    return (
        <Row align='middle' style={{paddingTop: '10px', backgroundColor: '#99999e'}}>
          <Col span={3}>
            <div style={{textAlign: 'center'}}><Link to={MAIN_PATH}><Button onClick={e => {$('#MainHeader').show(); $('#MainFooter').show(); }} type="primary" size="small" shape="circle" icon="home" style={homeStyle} ></Button></Link></div>
            <div style={{fontSize: '9px', textAlign: 'center'}}>HOME</div>
          </Col>
          <Col span={3}>
            <div style={{textAlign: 'center'}}><Link to={`${DOTARTS_PATH}?categoryId=${creation.categoryId}`}><Button onClick={e => {$('#MainHeader').show(); $('#MainFooter').show();}} type="primary" size="small" shape="circle" icon="menu-unfold" style={controlStyle} ></Button></Link></div>
            <div style={{fontSize: '9px', textAlign: 'center'}}>목록보기</div>
          </Col>
          <Col span={3} >
            <div style={{textAlign: 'center'}}><Button onClick={ e => handleZoomInOut(-1) } type="primary" size="small"  shape="circle" icon="zoom-in" style={controlStyle} ></Button></div>
            <div style={{fontSize: '9px', textAlign: 'center'}}>확대</div>
          </Col>
          <Col span={3}>
            <div style={{textAlign: 'center'}}><Button onClick={ e => handleZoomInOut(1) } type="primary" size="small"  shape="circle" icon="zoom-out" style={controlStyle}></Button></div>
            <div style={{fontSize: '9px', textAlign: 'center'}}>축소</div>
          </Col>
          <Col span={3}>
            <div style={{textAlign: 'center'}}><Button onClick={ e => onSaveAsBlock() } type="primary" size="small"  shape="circle" icon="border-outer" style={controlStyle}></Button></div>
            <div style={{fontSize: '9px', textAlign: 'center'}}>매뉴얼</div>
          </Col>
          <Col span={3}>
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
        </Row>
      );

  }

  return (
    <div>
      <div id="dotartListPanel" className='vrview-container' style={{ height: "100vh" }}>
        <Collapse
          activeKey={[1, 2, 3]}
        >
          <Panel header={getControlIcon()}  key="1" showArrow={false} style={{height: '75px'}} >

          </Panel>
          <Panel header="기본설정"  key="2" >
            <Row type="flex" align="middle">
              <Col span={24} style={{paddingLeft: '10px', fontWeight: 'bold'}}>
                도트블럭 보기 <Checkbox onChange={e => onShowBlock(e.target.checked)} />
              </Col>
            </Row>
          </Panel>
          <Panel header="부품목록"  key="3" style={{ maxHeight: "95vh", overflow: "auto" }} >
            <Row type="flex" justify="space-around" align="middle">
              <Col span={24}>
                <Table
                  className='vr-table-row-select'
                  columns={columns}
                  dataSource={dataSource}
                  pagination={false}
                  size="small"
                />
              </Col>
            </Row>
            <Row type="flex" justify="center" align="middle" style={{marginTop: '12px'}}>
              <Col span={8}>
                <Checkbox onChange={e => setFrameMode(e.target.checked)} /> 액자포함
              </Col>
              <Col span={8}>
                <Button type='danger' onClick={() => saveCartToServer()} > 장바구니 담기 </Button>
              </Col>
              <Modal
                visible={visibleCartConfirm}
                closable={false}
                title=""
                footer={[
                  <Button key="back" onClick={() => setVisibleCartConfirm(false)}>
                    계속 쇼핑하기
                  </Button>,
                  <Button key="submit" type="primary" onClick={() => {$('#MainHeader').show(); $('#MainFooter').show();}} ><NavLink to={CART_PATH}>
                    장바구니 이동하기</NavLink>
                  </Button>,
                ]}
              >
                <div style={{ paddingTop: '20px', margin: 'auto', textAlign: 'center' }} >
                  <p>장바구니에 상품이 등록되었습니다</p>
                  <p>장바구니로 이동하시겠습니까?</p>
                </div>

              </Modal>
            </Row>

          </Panel>
        </Collapse>
      </div>
    </div>

  );
}
