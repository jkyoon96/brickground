import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Icon, Select, Row, Col, Modal, Button } from 'antd';

import { ModalManager} from 'react-dynamic-modal';
import $ from 'jquery';
import * as Tone from "tone";

import GifPlayer from "react-gif-player";

import { InfoModal, SnapshotImageEditorDialog, ThumbImageEditorDialog } from 'components';
import { SOPOONG_URL, SHOP_URL, SHOP_ID, storageService } from 'common';

import { DotArtEditor2DListPanel, Pixel2DEditorDialog } from '.';

declare global {
  interface Window {
    IMP: any;
  }
}


/**
 * @description 상품 목록 페이지
 */

export const DotArtEditor2DViewOrg = (props) => {

  const [vrAssetsContainer, setVrAssetsContainer ] = useState<any[]>([]);
  const [vrModelList, setVrModelList] = useState<any>([]);
  const [refreshMode, setRefreshMode] = useState<boolean>(true);

  const [visibleSaveConfirm, setVisibleSaveConfirm] = useState<boolean>(false);
  const [saveResult, setSaveResult] = useState<string>('');
  const [cameraContainer, setCameraContainer] = useState<any>({});

  const [dotRowCountContainer, setDotRowCountContainer] = useState<number>(32);
  const [dotColumnCountContainer, setDotColumnCountContainer] = useState<number>(32);
  const [vrModelContainer, setVrModelContainer] = useState<any>({});

  const [imageData, setImageData] = useState<any>({});
  const [creationName, setCreationName] = useState<string>('');
  const [setName, setSetName] = useState<string>("21226C");
  const [categoryId, setCategoryId] = useState<number>(101);
  const [subjectId, setSubjectId] = useState<number>(108);
  const [sizeId, setSizeId] = useState<number>(101);
  const [sizeName, setSizeName] = useState<string>("16x16");

  const [visible, setVisible] = useState<number>(1);
  const [coverImage, setCoverImage] = useState<string>('./images/dotart.jpg');
  const [creation, setCreation] = useState<any>({});

  const [visibleAlarmConfirm, setVisibleAlarmConfirm] = useState<boolean>(false);
  const [alarmMessage, setAlarmMessage] = useState<string>('');

  const [visibleSnapshotImageEditorConfirm, setVisibleSnapshotImageEditorConfirm] = useState<boolean>(false);
  const [visibleThumbImageEditorConfirm, setVisibleThumbImageEditorConfirm] = useState<boolean>(false);
  const [visiblePixelEditorConfirm, setVisiblePixelEditorConfirm] = useState<boolean>(false);

  const [dotColorContainer, setDotColorContainer] = useState<string>('');
  const [dotColorIdContainer, setDotColorIdContainer] = useState<number>(1);
  const [cameraZoomContainer, setCameraZoomContainer] = useState<number>(10);
  const [pixelSizeContainer, setPixelSizeContainer] = useState<number>(1);

  const [colorDataList, setColorDataList] = useState<any[]>([
              {id:1,title:"White",color:"#F8F8F8",pitch:"C1"},
              {id:2,title:"Sand Yellow",color:"#D9D097",pitch:"C1"},
              {id:3,title:"Light Yellow",color:"#DFCD77",pitch:"C1"},
              {id:4,title:"Yellow",color:"#DEBC1A",pitch:"C1"},
              {id:5,title:"Yellow Deep",color:"#E6A321",pitch:"C1"},
              {id:84,title:"Yellow Orange",color:"#ED8800",pitch:"C1"},
              {id:6,title:"Orange",color:"#F15607",pitch:"C1"},
              {id:10,title:"Dark Orange",color:"#EB3300",pitch:"C1"},
              {id:16,title:"Raw Sienna",color:"#A56F41",pitch:"C1"},
              {id:17,title:"Brown Yellow",color:"#C05B31",pitch:"C1"},

              {id:90,title:"Burnt Umber",color:"#89532F",pitch:"C1"},
              {id:22,title:"Coffee",color:"#5C3A31",pitch:"C1"},
              {id:24,title:"Dark Brown",color:"#382720",pitch:"C1"},
              {id:23,title:"Brown Red",color:"#553331",pitch:"C1"},
              {id:12,title:"Bordeaux",color:"#550002",pitch:"C1"},
              {id:11,title:"Red",color:"#A10000",pitch:"C1"},
              {id:15,title:"Grayish Brown",color:"#9D7B60",pitch:"C1"},
              {id:89,title:"Mono Warm",color:"#CDA077",pitch:"C1"},
              {id:19,title:"Light Peach",color:"#DFC1A7",pitch:"C1"},
              {id:7,title:"Apricot",color:"#C6B299",pitch:"C1"},

              {id:80,title:"Shell Pink",color:"#F3CFB3",pitch:"C1"},
              {id:79,title:"Rose White",color:"#E4D5D3",pitch:"C1"},
              {id:13,title:"Pale Peach",color:"#D2C8D8",pitch:"C1"},
              {id:43,title:"Powder Purple",color:"#C4B4CF",pitch:"C1"},
              {id:39,title:"Dark Pink",color:"#D84CA3",pitch:"C1"},
              {id:40,title:"Plum Red",color:"#D44B79",pitch:"C1"},
              {id:41,title:"Rose Red",color:"#AC2C5C",pitch:"C1"},
              {id:42,title:"Bean Sand Red",color:"#583948",pitch:"C1"},
              {id:46,title:"Magenta",color:"#A1316C",pitch:"C1"},
              {id:45,title:"Light Rose Red",color:"#B44B73",pitch:"C1"},

              {id:44,title:"Lavender",color:"#A97991",pitch:"C1"},
              {id:49,title:"Lilac",color:"#AC8D9D",pitch:"C1"},
              {id:38,title:"Peach Red",color:"#CA7F96",pitch:"C1"},
              {id:37,title:"Pink",color:"#D09CC3",pitch:"C1"},
              {id:82,title:"Portrait Pink",color:"#FABBCB",pitch:"C1"},
              {id:81,title:"Buff Titanium",color:"#ECC7CD",pitch:"C1"},
              {id:18,title:"Tomato Red",color:"#B64642",pitch:"C1"},
              {id:21,title:"Caramel Rose",color:"#C67468",pitch:"C1"},
              {id:83,title:"Bisque",color:"#E8927C",pitch:"C1"},
              {id:20,title:"Caramel",color:"#C48856",pitch:"C1"},

              {id:85,title:"Compose Green",color:"#ADCABB",pitch:"C1"},
              {id:78,title:"Gray White",color:"#CFCDC9",pitch:"C1"},
              {id:73,title:"Beige Gray",color:"#A4A690",pitch:"C1"},
              {id:25,title:"Beige",color:"#B8AA7B",pitch:"C1"},
              {id:26,title:"Earthy Yellow",color:"#B69A68",pitch:"C1"},
              {id:8,title:"Sand Storm",color:"#D0A159",pitch:"C1"},
              {id:9,title:"Egg Yellow",color:"#D7911F",pitch:"C1"},
              {id:14,title:"Medium Wood",color:"#D29C60",pitch:"C1"},
              {id:31,title:"Pale Green",color:"#BCD884",pitch:"C1"},
              {id:32,title:"Apple Green",color:"#8BAB30",pitch:"C1"},

              {id:33,title:"Grass Green",color:"#829539",pitch:"C1"},
              {id:86,title:"Olive Green",color:"#7C8034",pitch:"C1"},
              {id:34,title:"Sap Green",color:"#3C682B",pitch:"C1"},
              {id:35,title:"Deep Olive Green",color:"#32442E",pitch:"C1"},
              {id:36,title:"Army Green",color:"#262F2C",pitch:"C1"},
              {id:87,title:"Medium Green",color:"#5C7F71",pitch:"C1"},
              {id:65,title:"Dark Blue",color:"#145F9E",pitch:"C1"},
              {id:57,title:"Sea Blue",color:"#0598C1",pitch:"C1"},
              {id:56,title:"Aqua Blue",color:"#3CABC9",pitch:"C1"},
              {id:91,title:"Compose Blue",color:"#71C5E8",pitch:"C1"},

              {id:63,title:"Light Lake Blue",color:"#669DA4",pitch:"C1"},
              {id:55,title:"Mint Green",color:"#B4D8D4",pitch:"C1"},
              {id:61,title:"Emerald Green",color:"#86BCA4",pitch:"C1"},
              {id:62,title:"Pea Green",color:"#609784",pitch:"C1"},
              {id:64,title:"Lake Blue",color:"#296E7E",pitch:"C1"},
              {id:88,title:"Turquoise Blue",color:"#00B2A9",pitch:"C1"},
              {id:30,title:"Green",color:"#17834C",pitch:"C1"},
              {id:29,title:"Light Green",color:"#2FA75F",pitch:"C1"},
              {id:28,title:"Fresh Green",color:"#6BC85D",pitch:"C1"},
              {id:27,title:"Light Grass Green",color:"#CDD37D",pitch:"C1"},

              {id:67,title:"Powder Blue",color:"#A1B6D1",pitch:"C1"},
              {id:68,title:"Dark Powder Blue",color:"#82A5CF",pitch:"C1"},
              {id:76,title:"Gray Blue",color:"#668597",pitch:"C1"},
              {id:70,title:"Dark Gray Blue",color:"#39505E",pitch:"C1"},
              {id:92,title:"Indigo",color:"#003B5C",pitch:"C1"},
              {id:66,title:"Marine Blue",color:"#1A3564",pitch:"C1"},
              {id:60,title:"Blue",color:"#154EB2",pitch:"C1"},
              {id:59,title:"Sky Blue",color:"#1285C9",pitch:"C1"},
              {id:58,title:"Cerulean",color:"#3E77BE",pitch:"C1"},
              {id:69,title:"Light Blue",color:"#4895C9",pitch:"C1"},

              {id:51,title:"Gray Purple",color:"#888EA6",pitch:"C1"},
              {id:53,title:"Medium Purple",color:"#7E78A1",pitch:"C1"},
              {id:50,title:"Pale Purple",color:"#AA9ED0",pitch:"C1"},
              {id:52,title:"Light Purple",color:"#9D72B9",pitch:"C1"},
              {id:47,title:"Medium Violet",color:"#87318E",pitch:"C1"},
              {id:48,title:"Purple",color:"#3F3189",pitch:"C1"},
              {id:54,title:"Purplish Blue",color:"#5460A8",pitch:"C1"},
              {id:74,title:"Light Gray",color:"#869197",pitch:"C1"},
              {id:-1,title:"empty",color:"#000000",pitch:"C1"},
              {id:-2,title:"empty",color:"#000000",pitch:"C1"},

              {id:-3,title:"empty",color:"#000000",pitch:"C1"},
              {id:-4,title:"empty",color:"#000000",pitch:"C1"},
              {id:72,title:"Black",color:"#181C1F",pitch:"C1"},
              {id:71,title:"Black Gray",color:"#33383E",pitch:"C1"},
              {id:77,title:"Dark Gray",color:"#4F545A",pitch:"C1"},
              {id:75,title:"Medium Gray",color:"#666F6E",pitch:"C1"}
      ]);


  let dotColor = '#F8F8F8';
  let dotColorId = 1;
  let cameraZoom = 10;
  let pixelSize = 1;

  let dotRowCount = 32;
  let dotColumnCount = 32;
  let dotColorMap;

  let colorEditMode = 'paint';

  let drawMode = false;

  let canvas, context, canvasOrg, contextOrg, canvasHelper, contextHelper;



  useEffect(() => {

    $('#MainHeader').hide();
    $('#MainFooter').hide();

    dotColorMap = new Map();
    colorDataList.forEach(colorData => dotColorMap.set(colorData.color, colorData));

    initControls();

    if(props.match.params.creationId > 0)
      getCreationDotArtData();
    else
      $("#editor_dotart_loading").hide();


    window.addEventListener( 'resize',onWindowResize, false );

    window.addEventListener('beforeunload', (event) => {
      // Cancel the event as stated by the standard.
      event.preventDefault();
      // Chrome requires returnValue to be set.
       event.returnValue = '';
     });


     return () => {

       $('#MainHeader').show();
       $('#MainFooter').show();
     }


  }, [props.match.params.creationId]);


  const getCreationDotArtData = () => {

    console.log('creationId : ', props.match.params.creationId);

    let url = SOPOONG_URL + SHOP_URL + '/creation.do?creationId=' + props.match.params.creationId;

    fetch( url )
      .then(response => response.json())
      .then(data=> {
                      console.log(data);

                      setCreation(data);

                      setCreationName(data.creationName);
                      setCategoryId(data.categoryId);
                      setSubjectId(data.subjectId);
                      setSizeId(data.sizeId);
                      setSizeName(data.sizeName);
                      setCoverImage(data.coverImage);
                      setVisible(data.visible);

                      if(data.vrModels != undefined) {
                        var vrModel = JSON.parse(data.vrModels);
                        console.log('vrModel : ', vrModel);

                        if(vrModel == null)
                          return;

                        setDotArtObject(vrModel);

                      }

                      $("#editor_dotart_loading").hide();
                    })
      .catch(err => {console.log(err); $("#editor_dotart_loading").hide();});

  };


  // VR 초기화
  const initControls = () => {

    canvas = document.getElementById("dotartEditor_2dCanvas");
    if(canvas != null) {
      canvas.width = dotRowCount * cameraZoom;
      canvas.height = dotColumnCount * cameraZoom;

      context = canvas.getContext("2d");
      context.mozImageSmoothingEnabled = false;
      context.webkitImageSmoothingEnabled = false;
      context.msImageSmoothingEnabled = false;
      context.imageSmoothingEnabled = false;
      context.filter = 'none';
    }

    canvasOrg = document.getElementById("dotartEditor_2dCanvasOrg");
    if(canvasOrg != null) {
      canvasOrg.width = dotRowCount * cameraZoom;
      canvasOrg.height = dotColumnCount * cameraZoom;

      contextOrg = canvasOrg.getContext("2d");
    }

    canvasHelper = document.getElementById("dotartEditor_2dCanvasHelper");
    if(canvasHelper != null) {
      canvasHelper.width = cameraZoom;
      canvasHelper.height = cameraZoom;
    }


    canvas.addEventListener("touchstart", onDocumentTouchDown, false);
    canvas.addEventListener("touchmove", onDocumentTouchMove, false);
    canvas.addEventListener("mousedown", onDocumentMouseDown, false);
    canvas.addEventListener("mousemove", onDocumentMouseMove, false);
    canvas.addEventListener("touchend", onDocumentMouseUp, false);
    canvas.addEventListener("mouseup", onDocumentMouseUp, false);
    canvas.addEventListener("mouseout", onDocumentMouseUp, false);
    canvas.addEventListener("wheel", onDocumentMouseWheel, false);

    canvasOrg.addEventListener("touchstart", onDocumentTouchDown, false);
    canvasOrg.addEventListener("touchmove", onDocumentTouchMove, false);
    canvasOrg.addEventListener("mousedown", onDocumentMouseDown, false);
    canvasOrg.addEventListener("mousemove", onDocumentMouseMove, false);
    canvasOrg.addEventListener("touchend", onDocumentMouseUp, false);
    canvasOrg.addEventListener("mouseup", onDocumentMouseUp, false);
    canvasOrg.addEventListener("mouseout", onDocumentMouseUp, false);
    canvasOrg.addEventListener("wheel", onDocumentMouseWheel, false);

    canvasHelper.addEventListener("touchstart", onDocumentTouchDown, false);
    canvasHelper.addEventListener("touchmove", onDocumentTouchMove, false);
    canvasHelper.addEventListener("mousedown", onDocumentMouseDown, false);
    canvasHelper.addEventListener("mousemove", onDocumentMouseMove, false);
    canvasHelper.addEventListener("touchend", onDocumentMouseUp, false);
    canvasHelper.addEventListener("mouseup", onDocumentMouseUp, false);
    canvasHelper.addEventListener("wheel", onDocumentMouseWheel, false);


    $('#dotartEditor_2dCanvas').on("click", onDocumentMouseClick);
    $('#dotartEditor_2dCanvas').on("save_asset", onDocumentSaveAsset);
    $('#dotartEditor_2dCanvas').on("pixel_canvas", onDocumentPixelCanvas);

    $('#dotartEditor_2dCanvas').on("setting_background", onDocumentSettingBackground);
    $('#dotartEditor_2dCanvas').on("save_image", onDocumentSaveAsImage);
    $('#dotartEditor_2dCanvas').on("save_thumb_image", onDocumentSaveAsThumbImage);
    $('#dotartEditor_2dCanvas').on("upload_pixel_image", onDocumentUploadPixelImage);
    $('#dotartEditor_2dCanvas').on("setting_info", onDocumentSettingInfo);

    $('#dotartEditor_2dCanvas').on("change_dot_color", onDocumentChangeDotColor);
    $('#dotartEditor_2dCanvas').on("change_dot_count", onDocumentChangeDotCount);
    $('#dotartEditor_2dCanvas').on("change_camera_zoom", onDocumentChangeCameraZoom);
    $('#dotartEditor_2dCanvas').on("change_pixel_size", onDocumentChangePixelSize);
    $('#dotartEditor_2dCanvas').on("sync_pixel_color", onDocumentSyncPixelColor);
    $('#dotartEditor_2dCanvas').on("change_color_edit_mode", onDocumentChangeColorEditMode);

 	}


  const setDotArtObject = (vrModels) => {

    if(vrModels == null)
      return;

    if(canvas == undefined) {
      canvas = document.getElementById("dotartEditor_2dCanvas");
      context = canvas.getContext("2d");
      canvasOrg = document.getElementById("dotartEditor_2dCanvasOrg");
    }

    dotRowCount = vrModels.dotRowCount;
    dotColumnCount = vrModels.dotColumnCount;

    if(canvas != null) {
      canvas.width = dotRowCount;
      canvas.height = dotColumnCount;

      if(context != null) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    if(canvasOrg != null) {
      canvasOrg.width = dotRowCount;
      canvasOrg.height = dotColumnCount;

      if(contextOrg != null) {
        contextOrg.clearRect(0, 0, canvasOrg.width, canvasOrg.height);
      }
    }

    if(vrModels.instances != null) {

      let index;
      let rowIndex;
      let columnIndex;
      let color;
      let colorId;

      var colorList = vrModels.instances[0].pitch.split(',');
      var colorIdList = vrModels.instances[1].pitch.split(',');

      colorList.pop();
      colorIdList.pop();

      for(rowIndex = 0; rowIndex < dotRowCount; rowIndex ++) {
        for(columnIndex = 0; columnIndex < dotColumnCount; columnIndex ++) {
          index = rowIndex * dotColumnCount + columnIndex;
          color = colorList[index];
          colorId = colorIdList[index];

          if(color != null && colorId != null){
            context.fillStyle = "#" + Number(color).toString(16);
            context.fillRect(rowIndex, columnIndex, 1, 1);

            contextOrg.fillStyle = ConvertRGBtoHex(Number(colorId), 0, 0);
            contextOrg.fillRect(rowIndex, columnIndex, 1, 1);
          }
        }
      }
    }

    setDotRowCountContainer(dotRowCount);
    setDotColumnCountContainer(dotColumnCount);

    var canvasWidth = $('#dotartEditor_Canvas').width() - 2;
		var canvasHeight = $('#dotartEditor_Canvas').height();
    var zoom = 1;

    if(dotRowCount > dotColumnCount)
      zoom = (canvasWidth - canvasWidth/dotRowCount)/dotRowCount;
    else
      zoom = (canvasHeight - canvasHeight/dotColumnCount)/dotColumnCount;

    cameraZoom = zoom;
    setCameraZoomContainer(zoom);

    drawImage(canvas, context, zoom);
    drawImage(canvasOrg, contextOrg, zoom);

  }


  const drawImage = (pcanvas, pcontext, zoom) => {

    var tempCanvas = document.createElement("canvas");
    var tempContext = tempCanvas.getContext("2d");

    tempCanvas.width = dotRowCount * zoom;
    tempCanvas.height = dotColumnCount * zoom;

    if(tempContext != null) {
      //tempContext.mozImageSmoothingEnabled = false;
      //tempContext.webkitImageSmoothingEnabled = false;
      //tempContext.msImageSmoothingEnabled = false;
      tempContext.imageSmoothingEnabled = false;
      tempContext.drawImage(pcanvas, 0, 0, tempCanvas.width, tempCanvas.height);
    }

    pcanvas.width = dotRowCount * zoom;
    pcanvas.height = dotColumnCount * zoom;

    pcontext.mozImageSmoothingEnabled = false;
    pcontext.webkitImageSmoothingEnabled = false;
    pcontext.msImageSmoothingEnabled = false;
    pcontext.imageSmoothingEnabled = false;
    pcontext.drawImage(tempCanvas, 0, 0, pcanvas.width, pcanvas.height)

  }


  const onWindowResize = () => {

	}


  const onDocumentMouseClick = (event) => {

    console.log( 'DotArtEditor2DView onDocumentMouseClick start' );

    if (event.altKey || colorEditMode == 'pick') { // Alt + 객체 선택시 객체색깔을 dotColor로  변경

      let mousex = event.clientX - canvas.offsetLeft + canvas.width/2
      let mousey = event.clientY - canvas.offsetTop + canvas.height/2;

      mousex -= mousex%cameraZoom;
      mousey -= mousey%cameraZoom;

      var imageData = context.getImageData(mousex, mousey, 1, 1).data;



      var red = imageData[0];
      var green = imageData[1];
      var blue = imageData[2];

      var colorId = 1;
      var colorStr = ConvertRGBtoHex(red, green, blue);

      console.log( 'DotArtEditor2DView colorStr : ' + colorStr);

      colorStr = colorStr.toUpperCase();
      var colorData = dotColorMap.get(colorStr);

      if(colorData != null){
        dotColorId = colorData.id;
        dotColor = colorData.color;

        setDotColorIdContainer(colorData.id);
      }
    }
  }



  const onDocumentMouseDown = (event) => {

    console.log( 'DotArtEditor2DView onDocumentMouseDown start' );

    if (!event.altKey && colorEditMode != 'pick') {

      drawMode = true;

      context.beginPath();

      let mousex = event.clientX - canvas.offsetLeft + canvas.width/2
      let mousey = event.clientY - canvas.offsetTop + canvas.height/2;

      mousex -= mousex%cameraZoom;
      mousey -= mousey%cameraZoom;

      var dotSize = Number(pixelSize) * Number(cameraZoom);
      context.fillStyle = dotColor;
      context.fillRect(mousex, mousey, dotSize, dotSize);

      contextOrg.beginPath();
      contextOrg.fillStyle = ConvertRGBtoHex(dotColorId, 0, 0)
      contextOrg.fillRect(mousex, mousey, dotSize, dotSize);

      event.preventDefault();
    }
  }


  const onDocumentMouseMove = (event) => {

    console.log( 'DotArtEditor2DView onDocumentMouseMove start' );

    let mousex = event.clientX - canvas.offsetLeft + canvas.width/2
    let mousey = event.clientY - canvas.offsetTop + canvas.height/2;

    mousex -= mousex%cameraZoom;
    mousey -= mousey%cameraZoom;

    var dotSize = Number(pixelSize) * Number(cameraZoom);
    canvasHelper.style.left = event.clientX + 'px';
    canvasHelper.style.top = event.clientY + 'px';

    if(drawMode) {
      context.fillRect(mousex, mousey, dotSize, dotSize);
      contextOrg.fillRect(mousex, mousey, dotSize, dotSize);
    }

  }


  const onDocumentMouseUp = (event) => {

    console.log( 'DotArtEditor2DView onDocumentMouseUp start' );

    if(drawMode) {
      context.closePath();
      contextOrg.closePath();
      drawMode = false;
    }

    event.preventDefault();
  }


  const onDocumentMouseWheel = (event) => {

    console.log( 'DotArtEditor2DView onDocumentMousWheel start' );

    cameraZoom += 0.01 * event.deltaY;
    cameraZoom = Math.min(cameraZoom, 20);
    cameraZoom = Math.max(cameraZoom, 1);

    drawImage(canvas, context, cameraZoom);
    drawImage(canvasOrg, contextOrg, cameraZoom);

    canvasHelper.width = cameraZoom * pixelSize;
    canvasHelper.height = cameraZoom * pixelSize;

    setCameraZoomContainer(cameraZoom);

    event.preventDefault();
  }




  const onDocumentTouchClick = (event) => {

    console.log( 'CreationMallEditor onDocumentTouchClick start' );

    if (event.altKey || colorEditMode == 'pick') { // Alt + 객체 선택시 객체색깔을 dotColor로  변경

      let mousex =((( event.changedTouches[0].clientX - canvas.left ) / canvas.width) * 2) - 1;
      let mousey =  -((( event.changedTouches[0].clientY - canvas.top ) / canvas.height) * 2) + 1;

      mousex -= mousex/cameraZoom;
      mousey -= mousey/cameraZoom;

      var imageData = context.getImageData(mousex, mousey, 1, 1).data;

      var red = imageData[0];
      var green = imageData[1];
      var blue = imageData[2];

      var colorId = 1;
      var color = ConvertRGBtoHex(red, green, blue);

      color = color.toUpperCase();
      var colorData = dotColorMap.get(color);

      if(colorData != null){
        dotColorId = colorData.id;
        dotColor = colorData.color;

        setDotColorIdContainer(colorData.id);
        setDotColorContainer(colorData.color);
      }
    }
  }



  const onDocumentTouchDown = (event) => {

    console.log( 'DotArtEditor2DView onDocumentTouchDown start' );

    if (!event.altKey && colorEditMode != 'pick') {

      drawMode = true;

      context.beginPath();

      let mousex = event.changedTouches[0].clientX - canvas.offsetLeft + canvas.width/2
      let mousey = event.changedTouches[0].clientY - canvas.offsetTop + canvas.height/2;

      mousex -= mousex/cameraZoom;
      mousey -= mousey/cameraZoom;

      var dotSize = Number(pixelSize) * Number(cameraZoom);
      context.fillStyle = dotColor;
      context.fillRect(mousex, mousey, dotSize, dotSize);

      contextOrg.beginPath();
      contextOrg.fillStyle = ConvertRGBtoHex(dotColorId, 0, 0)
      contextOrg.fillRect(mousex, mousey, dotSize, dotSize);

      event.preventDefault();
    }
  }


  const onDocumentTouchMove = (event) => {

    console.log( 'DotArtEditor2DView onDocumentTouchMove start' );

    let mousex = event.changedTouches[0].clientX - canvas.offsetLeft + canvas.width/2
    let mousey = event.changedTouches[0].clientY - canvas.offsetTop + canvas.height/2;

    mousex -= mousex/cameraZoom;
    mousey -= mousey/cameraZoom;

    var dotSize = Number(pixelSize) * Number(cameraZoom);
    canvasHelper.style.left = event.clientX + 'px';
    canvasHelper.style.top = event.clientY + 'px';

    if(drawMode) {
      context.fillRect(mousex, mousey, dotSize, dotSize);
      contextOrg.fillRect(mousex, mousey, dotSize, dotSize);
    }

  }



  const handleDotColor = (dotColor) => {

    var event = new CustomEvent('change_dot_color', { detail: {dotColor: dotColor} });

    var element = document.getElementById('dotartEditor_2dCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentChangeDotColor = (event) => {

    console.log('event.detail.dotColor : ' + event.detail.dotColor );

    dotColor = event.detail.dotColor.color;
    dotColorId = event.detail.dotColor.id;

    setDotColorIdContainer(dotColorId);

  }


  const handleDotCount = (rowCount, columnCount) => {

    var event = new CustomEvent('change_dot_count', { detail: {rowCount: rowCount, columnCount: columnCount} });

    var element = document.getElementById('dotartEditor_2dCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentChangeDotCount = (event) => {

    Modal.info({
      title: '해상도를 바꾸시겠습니까?',
      content: '픽셀 작업이력이 초기화 됩니다.',
      okText: '확인',
      cancelText: '취소',
      onOk: function() {
          changeDotCount(event);
      },
      onCancel: function() {}
    });

  }

  const changeDotCount = (event) => {

    dotRowCount = event.detail.rowCount;
		dotColumnCount = event.detail.columnCount;

		canvas.width = dotRowCount * cameraZoom,
		canvas.height = dotColumnCount * cameraZoom,

		context.clearRect(0, 0, canvas.width, canvas.height)

  }


  const handlePixelCanvas = (pixelData) => {

    var event = new CustomEvent('pixel_canvas', { detail: {pixelData: pixelData} });

    var element = document.getElementById('dotartEditor_2dCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }


  const handleCameraZoom = (cameraZoom) => {

    console.log("handleCameraZoom : " + cameraZoom);

    var event = new CustomEvent('change_camera_zoom', { detail: {cameraZoom: cameraZoom} });

    var element = document.getElementById('dotartEditor_2dCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }


  const onDocumentChangeCameraZoom = (event) => {

    cameraZoom = event.detail.cameraZoom;

    console.log("cameraZoom : " + cameraZoom);

    drawImage(canvas, context, cameraZoom);
    drawImage(canvasOrg, contextOrg, cameraZoom);

    canvasHelper.width = cameraZoom * pixelSize;
    canvasHelper.height = cameraZoom * pixelSize;

    setCameraZoomContainer(cameraZoom);
  }


  const handleShowPixelGuide = (value) => {

    var helper = document.getElementById("dotartEditor_2dCanvasHelper");

    if(helper != null) {
      if(value)
        helper.style.display = "";
      else
        helper.style.display = "none";
    }
  }


  const handleSyncColor = () => {

    var event = new CustomEvent('sync_pixel_color');

    var element = document.getElementById('dotartEditor_2dCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentSyncPixelColor = (event) => {

    for (var rowIndex = 0; rowIndex < canvas.width ; rowIndex++) {
      for(var columnIndex = 0; columnIndex < canvas.width; columnIndex ++) {

        const data:any  = context.getImageData(rowIndex, columnIndex, 1, 1).data;

        let red = data[0];
        let green = data[1];
        let blue = data[2];
        let alpha = data[3];


        let colorId = 1;
        let colorStr = ConvertRGBtoHex(red, green, blue);

        const colorData = dotColorMap.get(colorStr.toUpperCase());

        if(colorData != null) {
          colorId = colorData.id;
        }
        else {
          switch(colorStr.toUpperCase()) {
            case "#ED8B00" : colorId = 84; break;
            case "#ADCAA4" : colorId = 85; break;
            default : break;
          }

        }

        contextOrg.fillStyle = ConvertRGBtoHex(colorId, 0, 0);
        contextOrg.fillRect(rowIndex, columnIndex, 1, 1);
      }
    }
  }



  const handlePixelSize = (pixelSize) => {

    var event = new CustomEvent('change_pixel_size', { detail: {pixelSize: pixelSize} });

    var element = document.getElementById('dotartEditor_2dCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }


  const onDocumentChangePixelSize = (event) => {

    pixelSize = event.detail.pixelSize;

    canvasHelper.width = cameraZoom * pixelSize;
    canvasHelper.height = cameraZoom * pixelSize;

    setPixelSizeContainer(pixelSize);
  }

  const onDocumentPixelCanvas = (event) => {

    console.log("onDocumentPixelCanvas");

    let pixelCanvas:any = event.detail.pixelData.pixelCanvas;
    let	pixelContext:any = pixelCanvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    dotRowCount = event.detail.pixelData.rowCount;
    dotColumnCount = event.detail.pixelData.columnCount;

    canvas.width = dotRowCount * cameraZoom;
    canvas.height = dotColumnCount * cameraZoom;

    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
    context.drawImage(pixelCanvas, 0, 0, canvas.width, canvas.height);

    setDotRowCountContainer(dotRowCount);
    setDotColumnCountContainer(dotColumnCount);

    contextOrg.clearRect(0, 0, canvasOrg.width, canvasOrg.height);
    contextOrg.width = dotRowCount;
    contextOrg.height = dotColumnCount;

    for (var rowIndex = 0; rowIndex < dotRowCount ; rowIndex++) {
      for(var columnIndex = 0; columnIndex < dotColumnCount; columnIndex ++) {

        const data:any  = pixelContext.getImageData(rowIndex, columnIndex, 1, 1).data;

        let red = data[0];
        let green = data[1];
        let blue = data[2];
        let alpha = data[3];


        let colorId = 1;
        let colorStr = ConvertRGBtoHex(red, green, blue);

        const colorData = dotColorMap.get(colorStr.toUpperCase());

        if(colorData != null) {
          colorId = colorData.id;
        }
        else {
          switch(colorStr.toUpperCase()) {
            case "#ED8B00" : colorId = 84; break;
            case "#ADCAA4" : colorId = 85; break;
            default : break;
          }

        }

        contextOrg.fillStyle = ConvertRGBtoHex(colorId, 0, 0);
        contextOrg.fillRect(rowIndex, columnIndex, 1, 1)
      }
    }
  }


  const ColorToHex = (color) => {
    var hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
  }

  const ConvertRGBtoHex = (red, green, blue) => {
    return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
  }


  const onDocumentSaveAsset = (event) => {

    saveAssetToServer(event.detail.creationInfo);
  }


  const handleSaveAsset = (data) => {
    console.log("creation handleSaveAsset: ");

    var event = new CustomEvent('save_asset', {detail: {creationInfo:data} });

    var element = document.getElementById('dotartEditor_2dCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }


  const saveAssetToServer = (creationInfo) => {

    console.log("creation saveAssetToServer: ");

    var assetModel: any = {
          dotRowCount: dotRowCount,
          dotColumnCount: dotColumnCount,
          frameType: 1,
          frameColor: 0,
          plateColor: 0,
          baseDotColor: 0,
          backgroundColor: 0,
          instances:[]};


    drawImage(canvas, context, 1);
    drawImage(canvasOrg, contextOrg, 1);

    var colorList = '';
    var colorIdList = '';

    for (var rowIndex = 0; rowIndex < dotRowCount ; rowIndex++) {
      for(var columnIndex = 0; columnIndex < dotColumnCount; columnIndex ++) {

        var colorData = context.getImageData(rowIndex, columnIndex, 1, 1).data;
        var colorIdData = contextOrg.getImageData(rowIndex, columnIndex, 1, 1).data;

        var color = colorData[0] << 16 + colorData[1] << 8 + colorData[2];
        var colorId = colorIdData[0];

        //colorList += color + ',';
        colorList += color + ',';
        colorIdList += colorId + ',';
      }
    }

    var colorItem = {
      instanceName : 'colorList',
      color : 0,
      colorId : 0,
      pitch: colorList
    };

    var colorIdItem = {
      instanceName : 'colorIdList',
      color : 0,
      colorId : 0,
      pitch: colorIdList
    };

    assetModel.instances.push(colorItem);
    assetModel.instances.push(colorIdItem);

    console.log("creation saveAssetToServer: ",JSON.stringify(assetModel));

    creationInfo.vrModels = assetModel;

    let url = SOPOONG_URL + SHOP_URL + '/creationDotArtAssetUpdate.do';

    fetch( url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(creationInfo)
    } )
      .then(response => response.json())
      .then(data => {
                      setVisibleSaveConfirm(true);
                      setSaveResult("저장이 성공되었습니다");
                      console.log('업데이트 성공 : ' + data);
                    })
      .catch(err => {
          setVisibleSaveConfirm(true);
          setSaveResult("저장이 실패되었습니다 " + err);
          console.log(err);
        });

  }


  const handleSettingBackground =  (mode: boolean) => {

    console.log("handleTransformValueChange start")

    var event = new CustomEvent('setting_background', { detail: {mode: mode} });

    var element = document.getElementById('dotartEditor_2dCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentSettingBackground = (event) => {

    var mode = event.detail.mode;

  }


  const handleSaveAsImage = () => {

    console.log("handleSaveAsImage start")

    var event = new CustomEvent('save_image');

    var element = document.getElementById('dotartEditor_2dCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentSaveAsImage = (event) => {

      var imgData, imgNode;
      var strDownloadMime = "image/octet-stream";

      try {
          var strMime = "image/jpg";
          imgData = canvas.toDataURL(strMime);

          setVisibleSnapshotImageEditorConfirm(true);
          imageData.data = imgData;
          setImageData(imageData);

      } catch (e) {
          console.log(e);
          return;
      }

  }

  const saveFile = (strData, filename) => {
      var link = document.createElement('a');
      if (typeof link.download === 'string') {
          document.body.appendChild(link); //Firefox requires the link to be in the body
          link.download = filename;
          link.href = strData;



          link.click();

          document.body.removeChild(link); //remove the link when done
      }
  }


  const handleSaveAsThumbImage = () => {

    console.log("handleSaveAsThumbImage start")

    var event = new CustomEvent('save_thumb_image');

    var element = document.getElementById('dotartEditor_2dCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentSaveAsThumbImage = (event) => {

      var imgData, imgNode;
      var strDownloadMime = "image/octet-stream";

      try {
          var strMime = "image/jpg";
          imgData = canvas.toDataURL(strMime);

          setVisibleThumbImageEditorConfirm(true);
          imageData.data = imgData;
          setImageData(imageData);

      } catch (e) {
          console.log(e);
          return;
      }

  }


  const handleUploadPixelImage = () => {

    console.log("handleUploadPixelImage start")

    var event = new CustomEvent('upload_pixel_image');

    var element = document.getElementById('dotartEditor_2dCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentUploadPixelImage = (event) => {

      var imgData, imgNode;
      var strDownloadMime = "image/octet-stream";

      try {
          var strMime = "image/jpg";
          imgData = canvas.toDataURL(strMime);

          setVisiblePixelEditorConfirm(true);
          imageData.data = imgData;
          setImageData(imageData);

      } catch (e) {
          console.log(e);
          return;
      }

  }


  const handleSettingInfo = (antialias: boolean, pixelRatio: number, outline: boolean) => {

    console.log("handleSettingInfo start")

    var event = new CustomEvent('setting_info', { detail: {antialias: antialias, pixelRatio: pixelRatio, outline: outline} });

    var element = document.getElementById('dotartEditor_2dCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentSettingInfo = (event) => {

    var antialias = event.detail.antialias;
    var pixelRatio = event.detail.pixelRatio;

    console.log("pixelRatio : " + pixelRatio);

    var canvasWidth = $('#dotartEditor_2dCanvas').width();
 		var canvasHeight = $('#dotartEditor_2dCanvas').height() ;
  }


  const handleColorEditMode = (colorEditMode: string) => {

    console.log("handleColorEditMode start")

    var event = new CustomEvent('change_color_edit_mode', { detail: {colorEditMode: colorEditMode} });

    var element = document.getElementById('dotartEditor_2dCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentChangeColorEditMode = (event) => {

    colorEditMode = event.detail.colorEditMode;

  }



  const handleSaveCreation = () => {

    console.log("handleSaveCreation start");

    if (!storageService.getItem('brickground-user')){
      setAlarmMessage('로그인후 저장하세요.')
      setVisibleAlarmConfirm(true);
      return;
    }
    else if(creationName === "") {
      setAlarmMessage('작품명을 입력해주세요.')
      setVisibleAlarmConfirm(true);
      return;
    }
    else if(coverImage === "") {
      setAlarmMessage('대표이미지를 저장해주세요.')
      setVisibleAlarmConfirm(true);
      return;
    }

    if(creation.creationId == undefined)
      createCreation();
    else
      updateCreation();


  }


  const createCreation = () => {

    if (storageService.getItem('brickground-user')) {

      var user = JSON.parse( storageService.getItem('brickground-user') as string );

      if(user != undefined) {

        let url = SOPOONG_URL + SHOP_URL + '/creation.do';

        let params = {
                      shopId: Number.parseInt(SHOP_ID),
                      categoryId: categoryId,
                      creationName: creationName,
                      subjectId: subjectId,
                      sizeId: sizeId,
                      sizeName: sizeName,
                      visible: visible,
                      coverImage: coverImage,
                      description: '',
                      videoData: '',
                      setNames: setName,
                      viewCount: 0,
                      likeCount: 0,
                      shareCount: 0,
                      cloneCount: 0,
                      commentCount: 0,
                      rootId: 0,
                      parentId: 0,
                      userId: user.userId,
                      userName: user.userNickname
                    };

        fetch( url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify(params)
        } )
          .then(response => response.json())
          .then(data => {
                          console.log(data);
                          setCreation(data);

                          handleSaveAsset(data);
                        })
          .catch(err => console.log(err));

      }
    }
  }


  const updateCreation = () => {

    let url = SOPOONG_URL + SHOP_URL + '/creationUpdate.do';

    let params = {
                  creationId: creation.creationId,
                  shopId: creation.shopId,
                  categoryId: creation.categoryId,
                  creationName: creationName,
                  subjectId: subjectId,
                  sizeId: sizeId,
                  sizeName: sizeName,
                  visible: visible,
                  coverImage: coverImage,
                  description: creation.description,
                  videoData: creation.videoData,
                  setNames: creation.setNames,
                  viewCount: creation.viewCount,
                  likeCount: creation.likeCount,
                  shareCount: creation.shareCount,
                  cloneCount: creation.cloneCount,
                  rootId: creation.rootId,
                  parentId: creation.parentId,
                  userId: creation.userId,
                  userName: creation.userNickname
                };

    fetch( url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(params)
    } )
      .then(response => response.json())
      .then(data => {
                      console.log(data);
                      setCreation(data);
                      handleSaveAsset(data);
                    })
      .catch(err => console.log(err));

  };


  const getCanvase = () => {

    return (<div  id="dotartEditor_Canvas" style={{height:'100vh'}}>
                <canvas id="dotartEditor_2dCanvas" style={{backgroundColor: '#181C1F', position: 'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)' }}>
                </canvas>
                <canvas id="dotartEditor_2dCanvasOrg" style={{display: 'none', backgroundColor: '#181C1F', position: 'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)' }}>
                </canvas>
                <canvas id="dotartEditor_2dCanvasHelper" style={{display: 'none', backgroundColor: '#888888', position: 'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)' }}>
                </canvas>
            </div>);
  }


  return (
              <Row gutter={[0,0]} style={{ position: 'fixed', top: '0px', left:'0px', bottom: '0px',  width:'100vw', height:'100vh', opacity: '1' }} >
                <Col span={24}>
                  <div id='editor_dotart_loading' style={{height: '100vh'}}>
                    <div style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '300px', textAlign: 'center'}}>
                      <GifPlayer gif='./images/loading.gif' still='./images/copyright.jpg' autoplay />
                    </div>
                  </div>
                </Col>
                <Col xxl={19} xl={18} lg={16} md={14} sm={24}>
                  { getCanvase() }
                </Col>

                <Col xxl={5} xl={6} lg={8} md={10} sm={24} style={{height:'100vh'}}>
                    <DotArtEditor2DListPanel
                                        vrModelList={vrModelList}
                                        vrAssets={vrAssetsContainer}
                                        vrModel={vrModelContainer}
                                        colorDataList={colorDataList}
                                        refreshMode={refreshMode}
                                        creation={creation}
                                        creationName={creationName}
                                        categoryId={categoryId}
                                        subjectId={subjectId}
                                        sizeId={sizeId}
                                        coverImage={coverImage}
                                        visible={visible}
                                        dotRowCountContainer={dotRowCountContainer}
                                        dotColumnCountContainer={dotColumnCountContainer}
                                        dotColorContainer={dotColorContainer}
                                        dotColorIdContainer={dotColorIdContainer}
                                        cameraZoomContainer={cameraZoomContainer}
                                        pixelSizeContainer={pixelSizeContainer}
                                        onShowPixelGuide={handleShowPixelGuide}
                                        onSyncColor={handleSyncColor}
                                        onPixelSize={handlePixelSize}
                                        onCameraZoom={handleCameraZoom}
                                        onCreationName={(name) => setCreationName(name)}
                                        onCategoryId={(id) => setCategoryId(id)}
                                        onSubjectId={(id) => setSubjectId(id)}
                                        onSizeId={(id) => setSizeId(id)}
                                        onVisible={(value) => setVisible(value)}
                                        onUploadPixelImage={handleUploadPixelImage}
                                        onDotColor={handleDotColor}
                                        onDotCount={handleDotCount}
                                        onSaveCreation={handleSaveCreation}
                                        onSaveAsImage={handleSaveAsImage}
                                        onSaveAsThumbImage={handleSaveAsThumbImage}
                                        onSettingInfo={handleSettingInfo}
                                        onColorEditMode={handleColorEditMode}
                    > </DotArtEditor2DListPanel>
                </Col>
                <Modal
                  visible={visibleSaveConfirm}
                  closable={false}
                  title=""
                  footer={[
                    <Button key="back" onClick={() => setVisibleSaveConfirm(false)}>
                      확인
                    </Button>,
                  ]}
                >
                  <div style={{ margin: 'auto', textAlign: 'center' }} >
                    <p>{saveResult}</p>
                  </div>

                </Modal>

                <Modal
                  visible={visibleAlarmConfirm}
                  closable={false}
                  title=""
                  footer={[
                    <Button key="back_alarm" onClick={() => setVisibleAlarmConfirm(false)}>
                      확인
                    </Button>,
                  ]}
                >
                  <div style={{ margin: 'auto', textAlign: 'center' }} >
                    <p>{alarmMessage}</p>
                  </div>

                </Modal>


                <SnapshotImageEditorDialog
                    visibleImageEditorConfirm={visibleSnapshotImageEditorConfirm}
                    imageData={imageData}
                    aspectRatio={0}
                    onImageEditorConfirm={(value)=>{setVisibleSnapshotImageEditorConfirm(value)}}
                  />

                <ThumbImageEditorDialog
                    visibleImageEditorConfirm={visibleThumbImageEditorConfirm}
                    imageData={imageData}
                    aspectRatio={1}
                    onCoverImage={(image) => setCoverImage(image)}
                    onImageEditorConfirm={(value)=>{setVisibleThumbImageEditorConfirm(value)}}
                  />

                <Pixel2DEditorDialog
                    visibleImageEditorConfirm={visiblePixelEditorConfirm}
                    imageData={imageData}
                    aspectRatio={1}
                    onPixelCanvas={handlePixelCanvas}
                    onImageEditorConfirm={(value)=>{setVisiblePixelEditorConfirm(value)}}
                  />

              </Row>

      );

};
