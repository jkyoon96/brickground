import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { Button, Tabs, Modal } from 'antd';
import $ from 'jquery';
import YouTube from 'react-youtube';

export const VideoDialog = (props) => {

  const { videoData, visibleVideoConfirm, handleVideoConfirm } = props;

  const [videoUrl, setVideoUrl] = useState<string>("");
  const [player, setPlayer] = useState<any>();

  useEffect(() => {

    setVideoUrl(videoData);

  }, [videoData]);


  const onReady = (event) => {

    setPlayer(event.target);
  }

  const videoOptions:any = {
    playerVars: {
      autoplay: 1,
    },

  };


   return (
     <Modal
         visible={visibleVideoConfirm}
         closable={false}
         title="동영상설명"
         width='696px'
         centered
         footer={[
                   <Button key="save_back" type='primary' onClick={() =>{player.pauseVideo(); handleVideoConfirm(false);} } >
                     닫기
                   </Button>,
                 ]}
       >

       <YouTube
             videoId={videoUrl}
             opts={videoOptions}
             onReady={onReady}
           />

    </Modal>
  );

};
