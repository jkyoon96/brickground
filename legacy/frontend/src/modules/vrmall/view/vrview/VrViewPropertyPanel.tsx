import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Link, NavLink } from 'react-router-dom';
import { Collapse, Icon, Select, Row, Col, Checkbox, InputNumber, Table, Button, Slider } from 'antd';
import $ from 'jquery';
import { MAIN_PATH } from 'common';


export const VrViewPropertyPanel = (props) => {

  const { onZoomInOut, onSaveAsImage, onAutoRotate } = props;
  const [ zoomValue, setZoomValue ] = useState<number>(0);

  useEffect(() => {
    onWindowResize();
    window.addEventListener( 'resize',onWindowResize, false );

    $('#restore').hide();
    $('#expand').show();

  }, []);

  const onWindowResize = () => {

    // if ($('#vrView_vrCanvas').offset().top != undefined) {
    //   $('#vrPropertySizePanel').css("top", $('#vrView_vrCanvas').offset().top + $('#vrView_vrCanvas').outerHeight() - 50);
    //   $('#vrPropertySizePanel').css("left", $('#vrView_vrCanvas').offset().left + $('#vrView_vrCanvas').outerWidth() - 70);
    //
    //   $('#vrZoomControlPanel').css("top", $('#vrView_vrCanvas').offset().top + $('#vrView_vrCanvas').outerHeight() - 55);
    //   $('#vrZoomControlPanel').css("left", $('#vrView_vrCanvas').offset().left + $('#vrView_vrCanvas').outerWidth() - 350);
    // }

    $('#vrPropertySizePanel').css("top", $('html, body').offset().top + $('#vrView_vrCanvas').outerHeight() - 45);
    //$('#vrPropertySizePanel').css("left", $('html, body').offset().left + $('#vrView_vrCanvas').outerWidth() - 450);
    $('#vrPropertySizePanel').css("left", $('html, body').offset().left + ($('#vrView_vrCanvas').outerWidth() - $('#vrPropertySizePanel').outerWidth())/2);


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

  const handleZoomOrigin = (value) => {

    console.log('zoom value : ' + value);

    setZoomValue(0);
  }

  /* View in fullscreen */
  const onOpenFullscreen = () => {
    var vrCanvas = document.getElementById("vrView_vrCanvas");
    if(vrCanvas == null)
      return;

		if (vrCanvas.requestFullscreen) {
  		vrCanvas.requestFullscreen();

      $('#restore').show();
      $('#expand').hide();
		}
  }

  /* Close fullscreen */
  const onCloseFullscreen = () => {
  		if (document.exitFullscreen) {
    		document.exitFullscreen();

        $('#restore').hide();
        $('#expand').show();
  		}
  }


  const { Panel } = Collapse;
  const { Option } = Select;

  // return (
  //   <div>
  //     <div id="vrPropertySizePanel" style={{ display:'flex', justifyContent: 'space-between', alignItems: 'center', width: '400px', height: '40px', position: 'absolute', opacity: 0.8 }}>
  //
  //         <Button onClick={ e => handleZoomInOut(-1) } type="primary" icon="zoom-in" style={{ flex:'0 0 40px'}}></Button>
  //         <Slider min={-50} max={50} onChange={handleZoomInOut} onAfterChange={handleZoomOrigin} value={typeof zoomValue === 'number' ? zoomValue : 0}
  //             tooltipVisible={false} style={{ flex: '0 0 200px'}} />
  //         <Button onClick={ e => handleZoomInOut(1) } type="primary" icon="zoom-out" style={{ flex:'0 0 40px'}}></Button>
  //         <Button onClick={ onAutoRotate } type="primary" icon="redo" style={{ flex:'0 0 40px', marginLeft: '5px'}}></Button>
  //         <Button onClick={ onSaveAsImage } type="primary" icon="file-image" style={{ flex:'0 0 40px', marginLeft: '5px'}}></Button>
  //         <Link to={MAIN_PATH}><Button id='expand' onClick={e => {$('#MainHeader').show(); $('#MainFooter').show();}} type="primary" icon="home"  style={{ flex:'0 0 40px', marginLeft: '5px'}} ></Button></Link>
  //
  //
  //     </div>
  //
  //   </div>
  // );

  return (
    <div>
      <div  style={{ position: 'fixed', top: '10px', left:'10px', overflow: 'auto', opacity: '1' }}>
        <Link to={MAIN_PATH}><Button  size="large" onClick={e => {$('#MainHeader').show(); $('#MainFooter').show();}} type="primary" icon="home"  ></Button></Link>
      </div>
      <div id="vrPropertySizePanel" style={{ display:'flex', justifyContent: 'space-between', alignItems: 'center', width: '220px', height: '40px', position: 'absolute', opacity: 0.8 }}>
          <Button onClick={ e => handleZoomInOut(-1) } type="primary" icon="zoom-in" style={{ flex:'0 0 40px'}}></Button>
          <Button onClick={ e => handleZoomInOut(1) } type="primary" icon="zoom-out" style={{ flex:'0 0 40px', marginLeft: '5px'}}></Button>
          <Button onClick={ onAutoRotate } type="primary" icon="redo" style={{ flex:'0 0 40px', marginLeft: '5px'}}></Button>
          <Button onClick={ onSaveAsImage } type="primary" icon="file-image" style={{ flex:'0 0 40px', marginLeft: '5px'}}></Button>
          <Button onClick={ onOpenFullscreen } type="primary" id='expand' icon="fullscreen" style={{ flex:'0 0 40px', marginLeft: '5px'}}></Button>
          <Button onClick={ onCloseFullscreen } type="primary" id='restore' icon="fullscreen-exit" style={{ flex:'0 0 40px', marginLeft: '5px'}}></Button>

      </div>

    </div>
  );
}
