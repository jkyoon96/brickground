import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { Icon, Select, Row, Col, Menu, Breadcrumb, Card, Divider, Checkbox, Slider, InputNumber, Button, Tabs, Modal, Table } from 'antd';
import $ from 'jquery';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, LOGIN_PATH, CART_PATH, PAYMENT_PATH, storageService } from 'common';
import { VrMallModel, ProductModel } from 'modules/main/model';
import { ManualCardList, ProductCardList } from 'modules/productlist/view';
import { ProductCardGrid } from '.';

export const ProductDotView = (props) => {

  const [product, setProduct] = useState<ProductModel>({productId: 0, shopId:0, productName:''});
  const [manualList, setManualList] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [count, setCount] = useState<number>(1);

  const [paymentDisable, setPaymentDisable] = useState<string>("");
  const [cartDisable, setCartDisable] = useState<string>("");

  const [visibleCartConfirm, setVisibleCartConfirm] = useState<boolean>(false);

  const [dataSource, setDataSource] = useState<any[]>([
          {key:1, id:1, productId: 1000000001, title:'White', color:'#F8F8F8', price: 20, count: 0},
          {key:2, id:2, productId: 1000000002, title:'Sand Yellow', color:'#D9D097', price: 20, count: 0},
          {key:3, id:3, productId: 1000000003, title:'Light Yellow', color:'#DFCD77', price: 20, count: 0},
          {key:4, id:4, productId: 1000000004, title:'Yellow', color:'#DEBC1A', price: 20, count: 0},
          {key:5, id:5, productId: 1000000005, title:'Yellow Deep', color:'#E6A321', price: 20, count: 0},
          {key:6, id:6, productId: 1000000006, title:'Orange', color:'#F15607', price: 20, count: 0},

          {key:7, id:7, productId: 1000000007, title:'Apricot', color:'#C6B299', price: 20, count: 0},
          {key:8, id:8, productId: 1000000008, title:'Sand Storm', color:'#D0A159', price: 20, count: 0},
          {key:9, id:9, productId: 1000000009, title:'Egg Yellow', color:'#D7911F', price: 20, count: 0},
          {key:10, id:10, productId: 1000000010, title:'Dark Orange', color:'#DA4F30', price: 20, count: 0},
          {key:11, id:11, productId: 1000000011, title:'Red', color:'#A10000', price: 20, count: 0},
          {key:12, id:12, productId: 1000000012, title:'Bordeaux', color:'#550002', price: 20, count: 0},

          {key:13, id:13, productId: 1000000013, title:'Pale Peach', color:'#D2C8D8', price: 20, count: 0},
          {key:14, id:14, productId: 1000000014, title:'Medium Wood', color:'#D29C60', price: 20, count: 0},
          {key:15, id:15, productId: 1000000015, title:'Grayish Brown', color:'#9D7B60', price: 20, count: 0},
          {key:16, id:16, productId: 1000000016, title:'Raw Sienna', color:'#A56F41', price: 20, count: 0},
          {key:17, id:17, productId: 1000000017, title:'Brown Yellow', color:'#C05B31', price: 20, count: 0},
          {key:18, id:18, productId: 1000000018, title:'Tomato Red', color:'#B64642', price: 20, count: 0},

          {key:19, id:19, productId: 1000000019, title:'Light Peach', color:'#DFC1A7', price: 20, count: 0},
          {key:20, id:20, productId: 1000000020, title:'Caramel', color:'#C48856', price: 20, count: 0},
          {key:21, id:21, productId: 1000000021, title:'Caramel Rose', color:'#C67468', price: 20, count: 0},
          {key:22, id:22, productId: 1000000022, title:'Coffee', color:'#5C3A31', price: 20, count: 0},
          {key:23, id:23, productId: 1000000023, title:'Brown Red', color:'#553331', price: 20, count: 0},
          {key:24, id:24, productId: 1000000024, title:'Dark Brown', color:'#382720', price: 20, count: 0},

          {key:25, id:25, productId: 1000000025, title:'Beige', color:'#B8AA7B', price: 20, count: 0},
          {key:26, id:26, productId: 1000000026, title:'Earthy Yellow', color:'#B69A68', price: 20, count: 0},
          {key:27, id:27, productId: 1000000027, title:'Light Grass Green', color:'#CDD37D', price: 20, count: 0},
          {key:28, id:28, productId: 1000000028, title:'Fresh Green', color:'#6BC85D', price: 20, count: 0},
          {key:29, id:29, productId: 1000000029, title:'Light Green', color:'#2FA75F', price: 20, count: 0},
          {key:30, id:30, productId: 1000000030, title:'Green', color:'#17834C', price: 20, count: 0},

          {key:31, id:31, productId: 1000000031, title:'Pale Green', color:'#BCD884', price: 20, count: 0},
          {key:32, id:32, productId: 1000000032, title:'Apple Green', color:'#8BAB30', price: 20, count: 0},
          {key:33, id:33, productId: 1000000033, title:'Grass Green', color:'#829539', price: 20, count: 0},
          {key:34, id:34, productId: 1000000034, title:'Sap Green', color:'#3C682B', price: 20, count: 0},
          {key:35, id:35, productId: 1000000035, title:'Deep Olive Green', color:'#32442E', price: 20, count: 0},
          {key:36, id:36, productId: 1000000036, title:'Army Green', color:'#262F2C', price: 20, count: 0},

          {key:37, id:37, productId: 1000000037, title:'Pink', color:'#D09CC3', price: 20, count: 0},
          {key:38, id:38, productId: 1000000038, title:'Peach Red', color:'#CA7F96', price: 20, count: 0},
          {key:39, id:39, productId: 1000000039, title:'Dark Pink', color:'#D84CA3', price: 20, count: 0},
          {key:40, id:40, productId: 1000000040, title:'Plum Red', color:'#D44B79', price: 20, count: 0},
          {key:41, id:41, productId: 1000000041, title:'Rose Red', color:'#AC2C5C', price: 20, count: 0},
          {key:42, id:42, productId: 1000000042, title:'Bean Sand Red', color:'#583948', price: 20, count: 0},

          {key:43, id:43, productId: 1000000043, title:'Powder Purple', color:'#C4B4CF', price: 20, count: 0},
          {key:44, id:44, productId: 1000000044, title:'Lavender', color:'#A97991', price: 20, count: 0},
          {key:45, id:45, productId: 1000000045, title:'Light Rose Red', color:'#B44B73', price: 20, count: 0},
          {key:46, id:46, productId: 1000000046, title:'Magenta', color:'#A1316C', price: 20, count: 0},
          {key:47, id:47, productId: 1000000047, title:'Medium Violet', color:'#87318E', price: 20, count: 0},
          {key:48, id:48, productId: 1000000048, title:'Purple', color:'#3F3189', price: 20, count: 0},

          {key:49, id:49, productId: 1000000049, title:'Lilac', color:'#AC8D9D', price: 20, count: 0},
          {key:50, id:50, productId: 1000000050, title:'Pale Purple', color:'#AA9ED0', price: 20, count: 0},
          {key:51, id:51, productId: 1000000051, title:'Gray Purple', color:'#888EA6', price: 20, count: 0},
          {key:52, id:52, productId: 1000000052, title:'Light Purple', color:'#9D72B9', price: 20, count: 0},
          {key:53, id:53, productId: 1000000053, title:'Medium Purple', color:'#7E78A1', price: 20, count: 0},
          {key:54, id:54, productId: 1000000054, title:'Purplish Blue', color:'#5460A8', price: 20, count: 0},

          {key:55, id:55, productId: 1000000055, title:'Mint Green', color:'#B4D8D4', price: 20, count: 0},
          {key:56, id:56, productId: 1000000056, title:'Aqua Blue', color:'#3CABC9', price: 20, count: 0},
          {key:57, id:57, productId: 1000000057, title:'Sea Blue', color:'#0598C1', price: 20, count: 0},
          {key:58, id:58, productId: 1000000058, title:'Cerulean', color:'#3E77BE', price: 20, count: 0},
          {key:59, id:59, productId: 1000000059, title:'Sky Blue', color:'#1285C9', price: 20, count: 0},
          {key:60, id:60, productId: 1000000060, title:'Blue', color:'#154EB2', price: 20, count: 0},

          {key:61, id:61, productId: 1000000061, title:'Emerald Green', color:'#86BCA4', price: 20, count: 0},
          {key:62, id:62, productId: 1000000062, title:'Pea Green', color:'#609784', price: 20, count: 0},
          {key:63, id:63, productId: 1000000063, title:'Light Lake Blue', color:'#669DA4', price: 20, count: 0},
          {key:64, id:64, productId: 1000000064, title:'Lake Blue', color:'#296E7E', price: 20, count: 0},
          {key:65, id:65, productId: 1000000065, title:'Dark Blue', color:'#145F9E', price: 20, count: 0},
          {key:66, id:66, productId: 1000000066, title:'Marine Blue', color:'#1A3564', price: 20, count: 0},

          {key:67, id:67, productId: 1000000067, title:'Powder Blue', color:'#A1B6D1', price: 20, count: 0},
          {key:68, id:68, productId: 1000000068, title:'Dark Powder Blue', color:'#82A5CF', price: 20, count: 0},
          {key:69, id:69, productId: 1000000069, title:'Light Blue', color:'#4895C9', price: 20, count: 0},
          {key:70, id:70, productId: 1000000070, title:'Dark Gray Blue', color:'#39505E', price: 20, count: 0},
          {key:71, id:71, productId: 1000000071, title:'Black Gray', color:'#33383E', price: 20, count: 0}, // 171616
          {key:72, id:72, productId: 1000000072, title:'Black', color:'#181C1F', price: 20, count: 0},

          {key:73, id:73, productId: 1000000073, title:'Gray White', color:'#A4A690', price: 20, count: 0},
          {key:74, id:74, productId: 1000000074, title:'Light Gray', color:'#869197', price: 20, count: 0},
          {key:75, id:75, productId: 1000000075, title:'Medium Gray', color:'#666F6E', price: 20, count: 0},
          {key:76, id:76, productId: 1000000076, title:'Gray Blue', color:'#668597', price: 20, count: 0},
          {key:77, id:77, productId: 1000000077, title:'Dark Gray', color:'#4F545A', price: 20, count: 0} // 26282A
        ]);

  const history = useHistory();

  useEffect(() => {

    scroll(0, 0);

    getProductData();
    getManualsData();

  }, []);

  useEffect(() => {

    scroll(0, 0);

    getProductData();

  }, [props.match.params.productId]);


  const getProductData = () => {

    console.log('productId : ', props.match.params.productId);

    let url = SOPOONG_URL + SHOP_URL + '/product.do?productId=' + props.match.params.productId;

    fetch( url )
      .then(res => res.json())
      .then(json => {
                      console.log(json);
                      var data = Object.assign(json);
                      setProduct(data);

                    })
      .catch(err => console.log(err));


  };

  const getManualsData = () => {

      var searchUrl = SOPOONG_URL + SHOP_URL + '/productsByCategory.do?' + 'shopId=' + SHOP_ID ;
      searchUrl += '&categoryList=201';
      searchUrl += '&page=0&size=4';

      fetch(
        searchUrl
      ).then(res => res.json())
       .then(json => {console.log(json); setManualList(Object.assign(json));})
       .catch(err => console.log(err));

  };


  const hover = (vrModelName, coverImage) => {

    var element = document.getElementById(vrModelName);

    if(element != undefined) {
      element.setAttribute('src', coverImage.replace('.png', '_ani.gif'));
      element.style.width = '480px';
      element.style.height = '400px';
      element.style.borderRadius = '10px';
    }
  }

  const unhover = (vrModelName, coverImage) => {
    var element = document.getElementById(vrModelName);

    if(element != undefined) {
      element.setAttribute('src', coverImage);
      element.style.width = '480px';
      element.style.height = '400px';
      element.style.borderRadius = '10x';
    }
  }

  const saveCartToServer = () => {

    var userId = -1;
    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined) {
          userId = user.userId;

          let url = SOPOONG_URL + SHOP_URL + '/cart.do';

          var cart = {
                      shopId: product.shopId,
                      userId: userId,
                      categoryId: product.categoryId,
                      productId: product.productId,
                      productName: product.productName,
                      coverImage: product.coverImage,
                      price: product.price,
                      count: count
                    };

          fetch( url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(cart)
          } )
            .then(response => response.json())
            .then(data => {
                            console.log(data);
                            setVisibleCartConfirm(true);
                          })
            .catch(err => console.log(err));

        }
    }
    else {
      //location.href = LOGIN_PATH;
      history.push(LOGIN_PATH);
    }
  }

  const handlePaymentClick = () => {

    var userId = -1;
    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined) {
          userId = user.userId;

          var payment = [{
                      cartId: -1,
                      shopId: product.shopId,
                      userId: userId,
                      categoryId: product.categoryId,
                      productId: product.productId,
                      productName: product.productName,
                      coverImage: product.coverImage,
                      price: product.price,
                      count: count
                    }];

          storageService.setItem('brickground-payment', JSON.stringify(payment));

          history.push(PAYMENT_PATH);
        }
    }
    else {
      //location.href = LOGIN_PATH;
      history.push(LOGIN_PATH);
    }

  }


  const onTabChange = (key) => {
    console.log(key);

  };

  const { TabPane } = Tabs;

  const getProductInfo = () => {

    if(product.vrModelName == undefined)
      return;
    else
      return (
        <img
          src={`images/brickground/product/${product.vrModelName}.jpg`}
          style={{ width: '100%', height: '100%', maxWidth: '700px', maxHeight: '415px', border: '0px', padding: '0px'}}
        />
      );
  }

  const getTotalPrice = () => {

    let price = 0;

    dataSource.forEach(product => {price += product.price * product.count;})

    setTotalPrice(price);

  }

  const getRemainder = () => {
    if(product.remainder == undefined)
      return 0;

    return product.remainder.toLocaleString();
  }

  const handleCountChange = (record, count) => {


    var productInfo = dataSource.find(product =>(product.key == record.key))

    if(productInfo == undefined)
      return;

    productInfo.count = count;

    //updateCartToServer(modelInfo);

    //onChangeCartTable(dataSource);

    getTotalPrice();

  };


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
      title: '번호',
      dataIndex: 'key',
      width: '40px'
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
      width: '40px',
      render: (count, record) => (
        <span style={{ fontSize: '14px', color: '#4b5157'}}>
          <InputNumber step={1} min={0} size="large" defaultValue={count} onChange={value => { if(value !== undefined) handleCountChange(record, value) }} >
          </InputNumber>
        </span>
      )
    }

  ];




   return (
     <>

      <Row>
        <Col md={16} xs={24}>
          <Row>
            <div style={{textAlign: 'center', paddingTop: '40px', paddingBottom: '20px'}}>
              <img
                id = {product.vrModelName}
                src={product.coverImage}
                style={{ width: '100%', height: '100%', maxWidth: '480px', maxHeight: '400px', margin: '0 auto', borderRadius: '10px' }}
              />
            </div>
            <div style={{textAlign: 'center', paddingTop: '10px'}}>
              * 본 상품 이미지는 실제와 다를 수 있습니다.
            </div>
          </Row>
          <Row>
            <Col span={24}>
              <div className='product-container' style={{marginTop: '30px'}}>
                <Tabs onChange={onTabChange} animated={false} >
                  <TabPane tab="상세설명" key="1">

                    <div style={{textAlign: 'center', paddingTop: '10px'}}>
                     * 본 상품 이미지는 실제와 다를 수 있습니다.
                    </div>

                  </TabPane>
                </Tabs>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={8} xs={24}>
          <div style={{ maxHeight: '480px', borderLeft: '1px solid #d9dadb', padding: '40px', marginTop: '20px'}}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'RobotoSlab'}}>
              {product.productName}
            </div>
            <div style={{marginTop: '15px'}}>
              <span style={{ fontSize: '16px'}} >택배</span> &nbsp;&nbsp;&nbsp;
              <span style={{ fontSize: '16px', fontWeight: 800}}>주문시 결제 (0원)</span>
            </div>
            <div style={{marginTop: '15px'}}>
              <span style={{ fontSize: '16px'}} >배송</span> &nbsp;&nbsp;&nbsp;
              <span style={{ fontSize: '16px', fontWeight: 800}}>CJ 택배</span>
            </div>
            <div style={{marginTop: '10px', paddingLeft: '46px'}}>
              <span style={{ fontSize: '16px', color: '#939699'}} >내일 출발 예정</span>
            </div>
            <div style={{marginTop: '15px'}}>
              <span style={{ fontSize: '16px'}} >수입처</span> &nbsp;&nbsp;
              <span style={{ fontSize: '16px', fontWeight: 800}}>소풍앤에듀</span>
            </div>
            <div style={{marginTop: '15px'}}>
              <span style={{ fontSize: '16px'}} >판매자</span> &nbsp;&nbsp;
              <span style={{ fontSize: '16px', fontWeight: 800}}>소풍앤에듀 </span>
              <span style={{ fontSize: '16px', color: '#939699'}}>(010-3650-9339)</span>
            </div>
            <div style={{marginTop: '15px', display: 'none'}}>
              <span style={{ fontSize: '16px'}} >수량</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{ fontSize: '14px', color: '#4b5157'}}>
                <InputNumber step={1} min={0} size="large" value={count} onChange={value => { if(value !== undefined) setCount(value) }} >
                </InputNumber>
              </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{ fontSize: '16px', color: '#829089'}} > (남은수량 {getRemainder()} 개) </span>
            </div>
            <div style={{marginTop: '15px'}}>
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
            </div>

            <div style={{marginTop: '15px', maxWidth: '620px', maxHeight: '200px', borderRadius: '10px', backgroundColor: '#f5f5f5'}}>
              <div style={{paddingTop: '20px', marginLeft: '30px'}}>
                 <span style={{fontSize: '18px', fontWeight: 800, color: '#262d33'}}> { totalPrice.toLocaleString() } 원 </span>
              </div>
              <Divider style={{ height: '1px', border: 'solid 0px #797777', padding: '0px', marginTop: '20px', marginBottom: '20px' }} />

              <Row style={{width: '100%', height: '60px'}}>
                <Col span={12} style={{textAlign: 'center'}}>
                  <Button type="default" title="구매하기" disabled={!product.remainder} onClick={handlePaymentClick} style={{ width: '100%', minHeight: '40px', maxWidth: '160px', maxHeight: '50px', border: '0px', borderRadius: '20px', backgroundColor: '#f2770b', color: '#ffffff', fontSize: '14px', fontWeight: 800}}>구매하기</Button>
                </Col>
                <Col span={12} style={{textAlign: 'center'}}>
                  <Button  type="default" icon='shopping-cart' title="장바구니 담기" disabled={!product.remainder} onClick={saveCartToServer} style={{ width: '100%', minHeight: '40px', maxWidth: '160px', maxHeight: '50px', border: 'solid 1px #d9dadb', borderRadius: '20px', backgroundColor: '#f5f5f5', color: '#262d33', fontSize: '14px', fontWeight: 800}} >장바구니 담기</Button>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>



      <Modal
        visible={visibleCartConfirm}
        title=""
        footer={[
          <Button key="back"  onClick={() => setVisibleCartConfirm(false)}>
            계속 쇼핑하기
          </Button>,
          <Button key="submit"  type="primary"><NavLink to={CART_PATH}>
            장바구니 이동하기</NavLink>
          </Button>,
        ]}
      >
        <div style={{ margin: 'auto', textAlign: 'center' }} >
          <p>장바구니에 상품이 등록되었습니다</p>
          <p>장바구니로 이동하시겠습니까?</p>
        </div>

      </Modal>

      <br/><br/><br/><br/><br/>

    </>
  );

};
