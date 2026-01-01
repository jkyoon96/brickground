import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useHistory} from 'react-router-dom';
import { Collapse, Row, Col, Button } from 'antd';
import $ from 'jquery';
import YouTube from 'react-youtube';

import { MAIN_PATH, MANUALS_LIST_PATH, VR_MALLS_PATH } from 'common';
import { VideoDialog, ManualBookDialog, ProgramBookDialog } from '.';

export const VrViewYoutubePanel = (props) => {

  const { vrMallId, videoData, videoImage, manualData, programData, programExeData } = props;

  const [current, setCurrent] = useState(3);
  const [videoYoutubeData, setVideoYoutubeoData] = useState<string>('');
  const [player, setPlayer] = useState<any>(undefined);
  const [visibleVideoConfirm, setVisibleVideoConfirm] = useState<boolean>(false);
  const [visibleManualConfirm, setVisibleManualConfirm] = useState<boolean>(false);
  const [visibleProgramConfirm, setVisibleProgramConfirm] = useState<boolean>(false);

  const history = useHistory();

  useEffect(() => {
    onWindowResize();
    window.addEventListener( 'resize',onWindowResize, false );

    setVideoYoutubeoData(videoData.replace('https://www.youtube.com/watch?v=','').substring(0, 11));

    console.log('videoData : ' + videoData);
    console.log('videoImage : ' + videoImage);

  }, [videoData]);

  useEffect(() => {

    console.log('manualData : ' + manualData);

  }, [manualData]);

  const onWindowResize = () => {

    //$("#youtubePanel").width(160);
    //$("#youtubePanel").height(90);
    //$("#youtubePanel").css("top", $('html, body').offset().top + $('#vrView_vrCanvas').outerHeight() - 130);
    //$("#youtubePanel").css("left", $('html, body').offset().left + $('#vrView_vrCanvas').outerWidth() - 170);


	}


  return (

      <div id="youtubePanel" className='vrview-container' style={{ width: '100%', height: '40px', backgroundColor: '#FBC200', position: 'absolute', top: 0, left: 0 }}>

        <Row type='flex' justify='center' style={{padding:'0px', width:'100%', height:'100%'}}>
          <Col span={24} style={{ paddingLeft: '10px', paddingTop: '10px', height: '40px' }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a style={{ color: '#1b1c14', fontWeight: 'bold'}} onClick={e => {if(manualData != undefined && manualData.length > 0) setVisibleManualConfirm(true)}}>
               조립 설명서
            </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a style={{ color: '#1b1c14', fontWeight: 'bold'}} onClick={e => {if(programData != undefined && programData.length > 0) setVisibleProgramConfirm(true)}}>
               프로그램 설명서
            </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a style={{ color: '#1b1c14', fontWeight: 'bold'}} onClick={e => {if(videoData != undefined && videoData.length > 0) setVisibleVideoConfirm(true)}}>
               동영상 설명서
            </a>
          </Col>
          <VideoDialog
              visibleVideoConfirm={visibleVideoConfirm}
              videoData={videoYoutubeData}
              handleVideoConfirm={(value)=>{setVisibleVideoConfirm(value)}}
            />

          <ManualBookDialog
              vrMallId={vrMallId}
              visibleManualConfirm={visibleManualConfirm}
              manualData={manualData}
              handleManualConfirm={(value)=>{setVisibleManualConfirm(value)}}
            />
          <ProgramBookDialog
              vrMallId={vrMallId}
              visibleProgramConfirm={visibleProgramConfirm}
              programData={programData}
              programExeData={programExeData}
              handleProgramConfirm={(value)=>{setVisibleProgramConfirm(value)}}
            />
        </Row>

      </div>

  );
}
