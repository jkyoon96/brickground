import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { Button, Tabs, Modal } from 'antd';
import $ from 'jquery';

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import { SOPOONG_URL, SHOP_URL, SHOP_ID } from 'common';

export const ImageEditorDialog = (props) => {

  const { imageData, aspectRatio, thumbMode, visibleImageEditorConfirm, onCoverImage, onImageEditorConfirm } = props;

  const [image, setImage] = useState<string>('./images/copyright.jpg');
  const [originImage, setOriginImage] = useState<string>('./images/copyright.jpg');
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<any>();
  const [ratio, setRatio] = useState<number>(1);

  useEffect(() => {

    //imageEditor.addImageObject(image);

    if(imageData.data != undefined) {
      setImage(imageData.data);
      setOriginImage(imageData.data);

    }

    if(thumbMode)
      setRatio(aspectRatio);
    else
      setRatio(0);

  }, [imageData.data, thumbMode]);


  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      //setCropData(cropper.getCroppedCanvas().toDataURL());
      setImage(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const setCoverImage = () => {

    //handleThumbImage(image);

    if (typeof cropper !== "undefined") {
      let coverImage = cropper.getCroppedCanvas().toDataURL();

      uploadCoverImage(coverImage);
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

  const uploadCoverImage = (coverImage) => {

    let uploadUrl = SOPOONG_URL + '/fileupload/insertThumbnailImage.do'


    var blobBin = atob(coverImage.split(',')[1]);	// base64 데이터 디코딩
    var array:any[] = [];
    for (var i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
    }
    //var file = new Blob([new Uint8Array(array)], {type: 'image/jpg'});	// Blob 생성
    var file = new File([new Uint8Array(array)], 'dotart.jpg', {type: 'image/jpg'});	// Blob 생성

    var formData = new FormData();
    formData.append("imageFile", file);

    fetch( uploadUrl, {
      method: "POST",
      headers: {
      },
      body: formData
    } )
      .then(response => response.json())
      .then(data => {
                      console.log(data);

                      onCoverImage(data.url);
                    })
      .catch(err => console.log(err));

  };

  const getActionMenu = () => {

    if(thumbMode == undefined || !thumbMode) {
      return (
        <Button key="image_cover" type='primary' onClick={() =>{saveCropImage(); onImageEditorConfirm(false);} } >
          저장하기
        </Button>);
    }
    else {
      return (
        <Button key="image_cover" type='primary' onClick={() =>{setCoverImage(); onImageEditorConfirm(false);} } >
          썸네일만들기
        </Button>);
    }
  }


  const getImageDialog = () => {

    console.log('thumbMode : ' + thumbMode);

    if(thumbMode == undefined || !thumbMode) {  // 스크리샷 이미지 생성하여 로컬 PC에 다운로드 하기
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
             initialAspectRatio={ratio}
             aspectRatio={ratio}
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
    }
    else {   // 썸네일 이미지 생성하여 서버에 업로드 하기
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
                      <Button key="image_cover" type='primary' onClick={() =>{setCoverImage(); onImageEditorConfirm(false);} } >
                        썸네일만들기
                      </Button>,
                      <Button key="image_cancel" type='primary' onClick={() =>{onImageEditorConfirm(false);} } >
                        취소
                      </Button>,
                    ]}
          >

          <Cropper
             style={{ height: "400px", width: "100%" }}
             zoomTo={0.5}
             initialAspectRatio={ratio}
             aspectRatio={ratio}
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
    }
  }

  return getImageDialog();

};
