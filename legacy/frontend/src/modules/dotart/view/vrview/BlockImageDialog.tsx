import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { Button, Tabs, Modal } from 'antd';
import $ from 'jquery';

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import { SOPOONG_URL, SHOP_URL, SHOP_ID } from 'common';

export const BlockImageDialog = (props) => {

  const { blockImageName, blockImageData, aspectRatio, visibleBlockImageConfirm, onBlockImageConfirm } = props;

  const [image, setImage] = useState<string>('./images/copyright.jpg');
  const [originImage, setOriginImage] = useState<string>('./images/copyright.jpg');
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<any>();

  useEffect(() => {

    if(blockImageData.data != undefined) {
      setImage(blockImageData.data);
      setOriginImage(blockImageData.data);
    }

  }, [blockImageData.data]);


  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      //setCropData(cropper.getCroppedCanvas().toDataURL());
      setImage(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const saveCropImage = () => {

    if (typeof cropper !== "undefined") {
      let cropImage = cropper.getCroppedCanvas().toDataURL();

      let fileName = 'sopoong.jpg';

      var link = document.createElement('a');
      if (typeof link.download === 'string') {
          document.body.appendChild(link); //Firefox requires the link to be in the body
          link.download = fileName;
          link.href = cropImage;
          link.click();

          document.body.removeChild(link); //remove the link when done
      }
    }
  }


  const saveImage = () => {

    let fileName = 'sopoong.jpg';

    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        document.body.appendChild(link); //Firefox requires the link to be in the body
        link.download = blockImageName;
        link.href = image;
        link.click();

        document.body.removeChild(link); //remove the link when done
    }

  }

  return (
      <Modal
          visible={visibleBlockImageConfirm}
          closable={false}
          title="도트블럭 가이드"
          width='800px'
          centered
          footer={[

                    <Button key="image_cover" type='primary' onClick={() =>{saveImage(); onBlockImageConfirm(false);} } >
                      저장하기
                    </Button>,
                    <Button key="image_cancel" type='primary' onClick={() =>{onBlockImageConfirm(false);} } >
                      취소
                    </Button>,
                  ]}
        >

        <img
           src={image}
         />

     </Modal>
   );

};
