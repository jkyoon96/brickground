import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useHistory} from 'react-router-dom';
import { Collapse, Row, Col, Button } from 'antd';
import $ from 'jquery';
import YouTube from 'react-youtube';

import { MAIN_PATH, DOTARTS_PATH } from 'common';
import { VideoDialog } from '.';

export const DotArtPropertyPanel = (props) => {

  const { creationId, videoData } = props;

  const [current, setCurrent] = useState(3);
  const [videoYoutubeData, setVideoYoutubeoData] = useState<string>('');
  const [player, setPlayer] = useState<any>(undefined);
  const [visibleVideoConfirm, setVisibleVideoConfirm] = useState<boolean>(false);

  const history = useHistory();

  useEffect(() => {
    onWindowResize();
    window.addEventListener( 'resize',onWindowResize, false );

    setVideoYoutubeoData(videoData.replace('https://www.youtube.com/watch?v=','').substring(0, 11));

    console.log('videoData : ' + videoData);

  }, [videoData]);


  const onWindowResize = () => {

    // $("#youtubeBasePanel").width(160);
    // $("#youtubeBasePanel").height(90);
    // $("#youtubeBasePanel").css("top", $('html, body').offset().top + $('#vrView_vrCanvas').outerHeight() - 130);
    // $("#youtubeBasePanel").css("left", $('html, body').offset().left + $('#vrView_vrCanvas').outerWidth() - 170);

	}


  return (

    <div className='vrview-container' style={{ width: '100%', height: '40px', backgroundColor: '#FBC200', position: 'absolute', top: 0, left: 0 }}>

      <Row type='flex' justify='center' style={{padding:'0px', width:'100%', height:'100%'}}>
        <Col span={24} style={{ paddingLeft: '10px', paddingTop: '10px', height: '40px' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a style={{ color: '#1b1c14', fontWeight: 'bold'}} onClick={e => history.push(`${MAIN_PATH}`)}>
             홈
          </a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a style={{ display: 'none',  color: '#1b1c14', fontWeight: 'bold'}} onClick={e => setVisibleVideoConfirm(true)}>
             동영상 설명서
          </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a style={{ color: '#1b1c14', fontWeight: 'bold'}} onClick={e => history.push(`${DOTARTS_PATH}`) }>
             목록보기
          </a>
        </Col>
        <VideoDialog
            visibleVideoConfirm={visibleVideoConfirm}
            videoData={videoYoutubeData}
            handleVideoConfirm={(value)=>{setVisibleVideoConfirm(value)}}
          />
      </Row>

      </div>

  );
}
