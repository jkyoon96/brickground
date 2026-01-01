import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { Button, Tabs, Modal } from 'antd';
import $ from 'jquery';

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import { SOPOONG_URL, SHOP_URL, SHOP_ID } from 'common';

export const SnapshotImageEditorDialog = (props) => {

  const { imageData, aspectRatio, visibleImageEditorConfirm, onImageEditorConfirm } = props;

  const [image, setImage] = useState<string>('./images/copyright.jpg');
  const [originImage, setOriginImage] = useState<string>('./images/copyright.jpg');
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<any>();

  useEffect(() => {

    if(imageData.data != undefined) {
      setImage(imageData.data);
      setOriginImage(imageData.data);
    }

  }, [imageData.data]);


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

  return (
      <Modal
          visible={visibleImageEditorConfirm}
          closable={false}
          title="이미지 편집기"
          width='800px'
          centered
          footer={[

                    <Button key="image_cut" type='primary' onClick={() =>{getCropData();} } >
                      잘라내기
                    </Button>,
                    <Button key="image_restore" type='primary' onClick={() =>{setImage(originImage);} } >
                      복구하기
                    </Button>,
                    <Button key="image_cover" type='primary' onClick={() =>{saveCropImage(); onImageEditorConfirm(false);} } >
                      저장하기
                    </Button>,
                    <Button key="image_cancel" type='primary' onClick={() =>{onImageEditorConfirm(false);} } >
                      취소
                    </Button>,
                  ]}
        >

        <Cropper
           style={{ height: "400px", width: "100%" }}
           zoomTo={0.5}
           initialAspectRatio={aspectRatio}
           aspectRatio={aspectRatio}
           src={image}
           viewMode={1}
           minCropBoxHeight={10}
           minCropBoxWidth={10}
           background={false}
           responsive={true}
           autoCropArea={1}
           cropBoxResizable={true}
           checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
           onInitialized={(instance) => {
             setCropper(instance);
           }}
           guides={true}
         />

     </Modal>
   );

};
