import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Icon, Input, Button, Checkbox, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

interface QnaFormProps extends FormComponentProps {
  record: any;
}

import { SOPOONG_URL, SHOP_URL, SHOP_ID, LOGIN_PATH, HELP_PATH, storageService } from 'common';

class QnaAnswerInputForm extends React.Component<QnaFormProps, any> {

  handleSubmit = e => {
    e.preventDefault();
    var props: any = this.props;

    if(props.form != undefined) {
      props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.saveQnaToServer(values.qnaAnswer);
        }
      });
    }

  };

  saveQnaToServer = (qnaAnswer) => {

    var qna = { qnaId: this.props.record.qnaId, qnaAnswer: qnaAnswer}

    let url = SOPOONG_URL + SHOP_URL + '/qnaAnswer.do';

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
                      // location.href = HELP_PATH + '/qna';
                    })
      .catch(err => console.log(err));

  };

  render() {
    var props: any = this.props;
    const { getFieldDecorator } = props.form;

    const layout = {
      labelCol: { span: 0 },
      wrapperCol: { span: 24 },
    };
    const tailLayout = {
      wrapperCol: { offset: 4, span: 20 },
    };

    const { Option } = Select;
    const { TextArea } = Input;

    return (

      <div className='qna-answer-input-container'>
          <div className='input-form'>
            <Form {...layout} onSubmit={this.handleSubmit} >

              <Form.Item
                label=''
                style={{marginBottom: '15px'}}>
                {getFieldDecorator('qnaAnswer', {
                  rules: [{ required: true, message: '문의에 대한 답변사항을 입력하세요!' }],
                })(
                  <TextArea
                    rows={10}
                    placeholder="문의에 대한 답변사항을 입력하세요."
                  />,
                )}
              </Form.Item>

              <div style={{textAlign: 'center'}}>
                <Button type="primary" htmlType="submit" className="submit" >
                  저장하기
                </Button>
              </div>

            </Form>
          </div>

      </div>
    );
  }
}

export const QnaAnswerInput = Form.create<QnaFormProps>({ name: 'qnaAnswer' })(QnaAnswerInputForm);
