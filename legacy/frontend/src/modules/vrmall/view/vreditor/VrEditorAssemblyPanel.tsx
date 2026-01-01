import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Steps } from 'antd';
import $ from 'jquery';

export const VrEditorAssemblyPanel = (props) => {
  const [current, setCurrent] = useState(3);
  const { onAssembleyAsset } = props;

  useEffect(() => {
    onWindowResize();
    window.addEventListener( 'resize',onWindowResize, false );
  }, []);

  const onWindowResize = () => {

    //$('#vrMenuPanel').offset().top = $('#vrEditor_vrCanvas').offset().top + 5 ;
    //$('#vrMenuPanel').offset().left = $('#vrEditor_vrCanvas').offset().left + $('#vrEditor_vrCanvas').outerWidth() - 400 ;

    $("#vrAssemblyPanel").css("top", $('html, body').offset().top + 5);

    $("#vrAssemblyPanel").css("left", $('html, body').offset().left + 10);

	}

  const handleAssembleyAsset = (current) => {
    console.log("click 조립순서 출력 " , current);

    setCurrent(current);

    onAssembleyAsset(current);
  };


  const { Panel } = Collapse;
  const { Step } = Steps;

  const stepStyle = {
    marginBottom: 0,
    boxShadow: '0px -1px 0 0 #e8e8e8 inset',
  };

  return (

      <div id="vrAssemblyPanel"className='vreditor-container'  style={{ width: '800px', height: '60px', position: 'absolute', opacity: 0.8 }}>
        <Collapse
          defaultActiveKey={[]}
        >
          <Panel header="조립하기" key="1">
            <Steps type="navigation" current={current} onChange={handleAssembleyAsset} size="small" style={stepStyle} >
              <Step title="바닥부" />
              <Step title="몸체부" />
              <Step title="지붕부" />
              <Step title="마감부" />
            </Steps>
          </Panel>
        </Collapse>
      </div>

  );
}
