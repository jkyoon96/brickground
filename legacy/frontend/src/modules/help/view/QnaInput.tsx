import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Icon, Input, Button, Checkbox, Select, Row, Col } from 'antd';

import { SOPOONG_URL, SHOP_URL, SHOP_ID, LOGIN_PATH, HELP_PATH, storageService } from 'common';

class QnaInputForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    var props: any = this.props;

    if(props.form != undefined) {
      props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.saveQnaToServer(values.qnaType, values.qnaTitle, values.qnaQuestion);
        }
      });
    }

  };

  saveQnaToServer = (qnaType, qnaTitle, qnaQuestion) => {

    var userId = -1;
    if (storageService.getItem('brickground-user')) {

        var user = JSON.parse( storageService.getItem('brickground-user') as string );

        if(user != undefined) {
          userId = user.userId;
        }
    }
    else {
      location.href = LOGIN_PATH;
    }

    var qna = { shopId: SHOP_ID, userId: userId, qnaType: qnaType, qnaTitle: qnaTitle, qnaQuestion: qnaQuestion}

    let url = SOPOONG_URL + SHOP_URL + '/qna.do';

    console.log('qna : ', qna);

    fetch( url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(qna)
      } )
      .then(response => response.json())
      .then(data => {
                      console.log(data);
                      location.href = HELP_PATH + '/qna';
                    })
      .catch(err => console.log(err));

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

    const { Option } = Select;
    const { TextArea } = Input;

    return (

      <Row type='flex' justify='center'>
          <Col lg={18} md={20} xs={22}  style={{ marginTop: '30px', marginBottom: '20px', padding: '20px', opacity: '0.8', borderRadius: '10px', border: 'solid 1px #707070'}}>
            <Form {...layout} onSubmit={this.handleSubmit} >
              <Form.Item
                label="문의유형"
                style={{marginBottom: '10px'}}>
                {getFieldDecorator('qnaType', {
                  rules: [{ required: true, message: '문의유형을 선택해 주세요!' }],
                })(
                  <Select placeholder="문의유형을 선택해 주세요">
                    <Option value="common">일반</Option>
                    <Option value="order">주문/결제</Option>
                    <Option value="delivery">배송</Option>
                  </Select>,
                )}
              </Form.Item>
              <Form.Item
                label='문의제목'
                style={{marginBottom: '10px'}}>
                {getFieldDecorator('qnaTitle', {
                  rules: [{ required: true, message: '제목을 입력하세요!' }],
                })(
                  <Input
                    placeholder="제목을 입력하세요"
                    style={{height: '40px'}}
                  />,
                )}
              </Form.Item>
              <Form.Item
                label='문의내용'
                style={{marginBottom: '15px'}}>
                {getFieldDecorator('qnaQuestion', {
                  rules: [{ required: true, message: '문의사항을 입력하세요!' }],
                })(
                  <TextArea
                    rows={10}
                    placeholder="문의사항을 입력하세요."
                  />,
                )}
              </Form.Item>

              <div style={{textAlign: 'center'}}>
                <Button type="primary" htmlType="submit" style={{width: '40%', height: '40px',fontSize: '16px',  fontWeight: 800, borderRadius: '10px'}} >
                  등록하기
                </Button>
              </div>

            </Form>
          </Col>

      </Row>
    );
  }
}

export const QnaInput = Form.create({ name: 'qna' })(QnaInputForm);
