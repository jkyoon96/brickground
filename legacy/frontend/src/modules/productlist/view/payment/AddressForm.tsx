import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import $ from 'jquery';

import { SOPOONG_URL, SHOP_URL, storageService } from 'common';

class InputForm extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
         zipNo: '',
         roadAddrPart1: '',
         roadAddrPart2: ''
     };
   }


  handleSubmit = e => {
    e.preventDefault();
    var props: any = this.props;

    if(props.form != undefined) {
      props.form.validateFields((err, values) => {
        if (!err) {

          console.log('Received values of form: ', values);

          let url = SOPOONG_URL + SHOP_URL + '/delivery.do';

          var userId = -1;
          var shopId = -1;

          if (storageService.getItem('brickground-user')) {

              var user = JSON.parse( storageService.getItem('brickground-user') as string );

              if(user != undefined) {
                userId = user.userId;
                shopId = user.shopId;
              }
          }

          var param = {
                        userId: userId,
                        shopId: shopId,
                        address: values.address,
                        phone: values.phone,
                        email: values.email,
                        zip: '1111'
                      };

          fetch( url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              },
              body: JSON.stringify(param)
            } )
              .then(response => response.json())
              .then(data => {
                              console.log(data);
                              $("#deliveryResult").text(' 새로운 배송지가 등록되었습니다. 배송지를 선택해 주세요.');
                            })
              .catch(err => console.log(err));

        }
      });
    }

  };

  findAddress = () => {

    let key = 'devU01TX0FVVEgyMDIwMDcyMDExMzExNDEwOTk2ODc=';
    let findword = '한림대학길';
    let tempAddr = [''];

    fetch(
      `http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=100&keyword=${findword}&confmKey=${key}&resultType=json`
    ).then(res => res.json())
     .then(json => {
       console.log(json);

       let zipNo;
       let roadAddr;

       if(json.results.juso != null)
        json.results.juso.map(addr => {let address = addr.zipNo + " " + addr.roadAddr; tempAddr.push(address)});
     }
   )
     .catch(err => console.log(err))
  };


  render() {
    var props: any = this.props;
    const { getFieldDecorator } = props.form;

    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const tailLayout = {
      wrapperCol: { offset: 4, span: 20 },
    };

    return (

      <Row type='flex' justify='center'>
        <Col lg={18} md={20} xs={23}  style={{marginTop: '30px'}}>
          <Row style={{ padding: '30px', opacity: '0.8', borderRadius: '10px', border: 'solid 1px #707070'}}>
            <Form {...layout} onSubmit={this.handleSubmit} >
              <Form.Item
                label='집주소'
                style={{marginBottom: '15px'}}>
                {getFieldDecorator('address', {
                  rules: [{ required: true, message: '주소를 입력하세요!' }],
                })(
                  <div>
                    <Input
                      placeholder="주소를 입력하세요"
                      style={{height: '40px', width: '80%'}}
                    />
                    <Button icon='search' onClick = {this.findAddress} style={{height: '40px', width: '40px', marginLeft: '5px' }} />
                  </div>,
                )}
              </Form.Item>
              <Form.Item
                label='집주소'
                style={{marginBottom: '15px'}}>
                {getFieldDecorator('detailAddress', {
                  rules: [{ required: true, message: '주소를 입력하세요!' }],
                })(
                  <div>
                    <Input
                      placeholder="상세주소를 입력하세요"
                      style={{height: '40px', width: '80%'}}
                    />
                    <Button icon='search' onClick = {this.findAddress} style={{height: '40px', width: '40px', marginLeft: '5px' }} />
                  </div>,
                )}
              </Form.Item>
              <Form.Item
                label='전화번호'>
                {getFieldDecorator('phone', {
                  rules: [{ required: true, message: '전화번호를 입력하세요!' }],
                })(
                  <Input
                    placeholder="전화번호를 입력하세요"
                    style={{height: '40px'}}
                  />,
                )}
              </Form.Item>
              <Form.Item
                label='이메일'
                style={{marginBottom: '15px'}}>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: '이메일을 입력하세요!' }],
                })(
                  <Input
                    placeholder="이메일을 입력하세요"
                    style={{height: '40px'}}
                  />,
                )}
              </Form.Item>
              <p id='deliveryResult' style={{color:'#0000ff', textAlign: 'center', marginTop: '40px'}}> </p>
              <Button type="primary" htmlType="submit" style={{ marginTop: '30px', width:'100%', height: '50px', fontSize: '16px', fontWeight: 800, borderRadius: '10px'}}>
                배송지 등록
              </Button>
            </Form>
          </Row>

        </Col>
      </Row>
    );
  }
}

export const AddressForm = Form.create({ name: 'address' })(InputForm);
