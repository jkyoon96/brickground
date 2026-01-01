import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import { Collapse, Icon, Select, Row, Col, Checkbox, InputNumber, Table, Button, Switch } from 'antd';
import $ from 'jquery';
import { MAIN_PATH } from 'common';


export const CreationEditorPropertyPanel = (props) => {

  const { onControlModeChange, onTransformValueChange, onSnapModeChange } = props;

  useEffect(() => {
    onWindowResize();
    window.addEventListener( 'resize',onWindowResize, false );
  }, []);

  const onWindowResize = () => {

    //$('#vrMenuPanel').offset().top = $('#vrEditor_vrCanvas').offset().top + 5 ;
    //$('#vrMenuPanel').offset().left = $('#vrEditor_vrCanvas').offset().left + $('#vrEditor_vrCanvas').outerWidth() - 400 ;

    $("#creationPropertyPanel").css("top", $('html, body').offset().top + $('#creationEditor_vrCanvas').outerHeight() - 210);
    $("#creationPropertyPanel").css("left", $('html, body').offset().left + $('#creationEditor_vrCanvas').outerWidth() - 430);

    $("#creationPropertySizePanel").css("top", $('html, body').offset().top + 40);
    $("#creationPropertySizePanel").css("left", $('html, body').offset().left + $('#creationEditor_vrCanvas').outerWidth() - 300);

	}

  const onTranslateMode = () => {
    onControlModeChange("translate");
  }

  const onRotationMode = () => {
    onControlModeChange("rotate");
  }

  const onScaleMode = () => {
    onControlModeChange("scale");
  }

  const onSnapMode = (checked) => {

    if(checked)
      onSnapModeChange("technic");
    else
      onSnapModeChange("brick");
  }


  const { Panel } = Collapse;
  const { Option } = Select;

  return (
    <div>
      <div id="creationPropertySizePanel" style={{ width: '300px', height: '20px', position: 'absolute', opacity: 1 }}>
        <Switch checkedChildren="테크닉" unCheckedChildren="브릭 " defaultChecked  onChange={onSnapMode} style={{marginRight: '2px'}} />
        <Button type="primary" onClick={onTranslateMode} icon="drag" style={{marginRight: '1px'}} />
        <Button type="primary" onClick={onRotationMode} icon="redo" />
      </div>
    </div>
  );
}
