import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Icon, Select, Button, Row, Col } from 'antd';
import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { OrbitControls } from 'plugins/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { SpriteText2D, textAlign } from 'three-text2d';

import { ModalManager} from 'react-dynamic-modal';
import $ from 'jquery';
import * as Tone from "tone";
import * as JSZip from 'jszip';

import { InfoModal, SnapshotImageEditorDialog } from 'components';
import { SOPOONG_URL, SHOP_URL, SHOP_ID, storageService } from 'common';

import { DotArtPropertyPanel, DotArt2DListPanel, BlockImageDialog } from '.';

declare global {
  interface Window {
    IMP: any;
  }
}

interface MaterialColor {
  key :string;
  color: number;
}

/**
 * @description 상품 목록 페이지
 */

export const DotArt2DViewOrg = (props) => {

  const [creation, setCreation] = useState<any>({});

  const [vrModelList, setVrModelList] = useState<any[]>([]);
  const [vrAssetsContainer, setVrAssetsContainer ] = useState<any[]>([]);
  const [productList, setProductList] = useState<any[]>([]);

  const [videoData, setVideoData] = useState<string>('');
  const [videoImage, setVideoImage] = useState<string>('');
  const [manualData, setManualData] = useState<string>('');

  const [dotColorIdList, setDotColorIdList] = useState<any[]>([]);

  const [imageData, setImageData] = useState<any>({});
  const [visibleSnapshotImageEditorConfirm, setVisibleSnapshotImageEditorConfirm] = useState<boolean>(false);

  const [blockImageName, setBlockImageName] = useState<string>('');
  const [blockImageData, setBlockImageData] = useState<any>({});
  const [visibleBlockImageConfirm, setVisibleBlockImageConfirm] = useState<boolean>(false);

  const [traceMode, setTraceMode] = useState<boolean>(false);
  const [musicModeContainer, setMusicModeContainer] = useState<boolean>(false);

  const [dotRowCountContainer, setDotRowCountContainer] = useState<number>(16);
  const [dotColumnCountContainer, setDotColumnCountContainer] = useState<number>(16);


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


  let creationName = "도트아트";
  let cameraZoom = 10;
  let dotRowCount = 32;
  let dotColumnCount = 32;

  let blockVisible = false;

  let canvas, context, canvasOrg, contextOrg;


  useEffect(() => {

    $('#MainHeader').hide();
    $('#MainFooter').hide();

    initControls();

    getProductsData();
    getCreationDotArtData();

    window.addEventListener( 'resize',onWindowResize, false );
    window.addEventListener( 'orientationchange',onOrientationChange, false );

    return () => {

      $('#MainHeader').show();
      $('#MainFooter').show();
    }

  }, [props.match.params.creationId]);


  const getCreationDotArtData = () => {

    console.log('creationId : ', props.match.params.creationId);

    let url = SOPOONG_URL + SHOP_URL + '/creationAsset.do?creationId=' + props.match.params.creationId;

    fetch( url )
      .then(response => response.json())
      .then(data=> {
                      console.log(data);

                      setCreation(data);

                      var vrModel = JSON.parse(data.vrModels);
                      console.log('vrModel : ', vrModel);

                      setDotArtObject(vrModel);

                      creationName = data.creationName;
                      dotRowCount = vrModel.dotRowCount;
                      dotColumnCount = vrModel.dotColumnCount;

                      setDotRowCountContainer(vrModel.dotRowCount);
                      setDotColumnCountContainer(vrModel.dotColumnCount);

                      makeBlockButton(vrModel);

                      $("#view_dotart_loading").hide();

                    })
      .catch(err => console.log(err));

  };


  const getProductsData = () => {

    let url = SOPOONG_URL + SHOP_URL + '/products.do?shopId=' + SHOP_ID;
    url += '&page=0&size=200';

    fetch( url )
      .then(response => response.json())
      .then(data=> {
                      console.log(data);
                      setProductList(data);

                    })
      .catch(err => console.log(err));

  };


  // 2D 초기화
  const initControls = () => {


 		var canvasWidth = $('#dotartView_2dCanvas').width();
 		var canvasHeight = $('#dotartView_2dCanvas').height() ;

    canvas = document.getElementById("dotartView_2dCanvas");
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

    canvasOrg = document.getElementById("dotartView_2dCanvasOrg");
    if(canvasOrg != null) {
      canvasOrg.width = dotRowCount * cameraZoom;
      canvasOrg.height = dotColumnCount * cameraZoom;

      contextOrg = canvasOrg.getContext("2d");
    }

    $('#dotartView_2dCanvas').on("change_zoom_inout", onDocumentZoomInOut);
    $('#dotartView_2dCanvas').on("save_block", onDocumentSaveAsBlock);

 	}


 const setDotArtObject = (vrModels) => {

   if(vrModels == null)
     return;

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

   var canvasWidth = $('#dotartView_Canvas').width() - 2;
		var canvasHeight = $('#dotartView_Canvas').height();
   var zoom = 1;

   if(dotRowCount > dotColumnCount)
     zoom = (canvasWidth - canvasWidth/dotRowCount)/dotRowCount;
   else
     zoom = (canvasHeight - canvasHeight/dotColumnCount)/dotColumnCount;

   cameraZoom = zoom;

   drawImage(canvas, context, zoom);

   setDotColorIdList(colorIdList);

 }


  const onWindowResize = () => {

	}

  const onOrientationChange = () => {

    var filter = "win16|win32|win64|mac|macintel";
    if(navigator.platform) {
      if(filter.indexOf(navigator.platform.toLowerCase()) < 0) {
        if (window.orientation == 0){
          $('#dotartView_2dCanvas').css('height', '70vh');
          $('#dotartView_2dCanvasOrg').css('height', '70vh');
        }
        else{
          $('#dotartView_2dCanvas').css('height', '100vh');
          $('#dotartView_2dCanvasOrg').css('height', '100vh');
        }
      }
    }
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



  const ColorToHex = (color) => {
    var hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
  }

  const ConvertRGBtoHex = (red, green, blue) => {
    return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
  }

  const handleSaveAsImage = () => {
      var imgData, imgNode;
      var strDownloadMime = "image/octet-stream";

      try {
          var strMime = "image/jpeg";
          imgData = canvas.toDataURL(strMime);

          setVisibleSnapshotImageEditorConfirm(true);
          imageData.data = imgData;
          setImageData(imageData);
          //saveFile(imgData.replace(strMime, strDownloadMime), "test.jpg");

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

  const saveAs = (blob, filename) => {
      var link = document.createElement('a');
      link.download = filename;

      if (typeof blob === 'string') {
          document.body.appendChild(link); //Firefox requires the link to be in the body
          link.href = blob;
          link.click();
          document.body.removeChild(link); //remove the link when done
      }
      else {
        link.href = URL.createObjectURL(blob);
        setTimeout(function () { URL.revokeObjectURL(link.href) }, 4E4) // 40s
        setTimeout(function () { click(link) }, 0)
      }

  }

  // `a.click()` doesn't work for all browsers (#465)
  const click = (node)  => {
    try {
      node.dispatchEvent(new MouseEvent('click'))
    } catch (e) {
      var evt = document.createEvent('MouseEvents')
      evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80,
                            20, false, false, false, false, 0, null)
      node.dispatchEvent(evt)
    }
  }



  const handleZoomInOut = (zoom) => {

    console.log('handleZoomInOut start ');

    var event = new CustomEvent('change_zoom_inout', {detail : {zoom:zoom}});

    var element = document.getElementById('dotartView_2dCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }


  const onDocumentZoomInOut = (event) => {

    console.log( 'DotArt2DView onDocumentZoomInOut start' );

    cameraZoom -= event.detail.zoom;
    cameraZoom = Math.min(cameraZoom, 20);
    cameraZoom = Math.max(cameraZoom, 1);

    drawImage(canvas, context, cameraZoom);

    event.preventDefault();
  }


  const handleSaveAsBlock = () => {

    console.log('handleSaveAsBlock start ');

    var event = new CustomEvent('save_block');

    var element = document.getElementById('dotartView_2dCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }



  const onDocumentSaveAsBlock = ()  => {

    let blockRowCount = dotRowCount / 16;
    let blockColumnCount = dotColumnCount / 16;

    var zipFile:any = require('jszip')();

    for(let i = 0; i < blockRowCount; i ++) {
      for(let j = 0; j < blockColumnCount; j ++) {
        saveDotBlock(i, j, zipFile)
      }
    }


    zipFile.generateAsync({type:"blob"})
            .then(function(content) {
                // see FileSaver.js
                saveAs(content, creationName + ".zip");
                //saveFile(content, creationName + ".zip");
            });

  }


  const saveDotBlock = (rowBlockIndex, columnBlockIndex, zipFile)  => {

    //let dotrow = vrModels.dotRowCount;
    //let dotcol = vrModels.dotColumnCount;

    let startRowIndex = rowBlockIndex * 16;
    let startColumnIndex = columnBlockIndex * 16;
    let endRowIndex = startRowIndex + 16;
    let endColumnIndex = startColumnIndex + 16;
    let title = creationName + ' - ' + (columnBlockIndex + 1) + ' - ' + (rowBlockIndex + 1) + ' 블럭'

    var tempCanvas = document.createElement('canvas');
    tempCanvas.width  = 680;
    tempCanvas.height = 720;

    var w = 40;

    var tempContext:any = tempCanvas.getContext("2d");
    tempContext.moveTo(200, 24);
    tempContext.font = '20pt Calibri';
    tempContext.textAlign = 'left';
    tempContext.fillText(title , 200, 30);

    for (let i = startRowIndex; i < endRowIndex ; i++) {
      for(let j = startColumnIndex; j < endColumnIndex; j ++) {

        let dotName = "dot_" + i + "_" + j;

        let x = 40 + (i - startRowIndex) * 40  ;
        let y = 80 + (j - startColumnIndex) * 40;

        let colorStr = "#FFFFFF";
        let colorId = contextOrg.getImageData(i, j, 1, 1).data[0];
        let colorData = colorDataList.find(data => data.id == colorId );

        if(colorData != undefined)
          colorStr = colorData.color;

        //console.log('x : ' + x + ', y : ' + y + ' color : ' + colorStr + ', colorId : ' + colorId + ' , dotName : ' + dotName);

        tempContext = canvas.getContext("2d");
        tempContext.beginPath();
        tempContext.moveTo(x, y);
        tempContext.fillStyle = colorStr;
        tempContext.arc(x, y, w/2, 0, 2 * Math.PI, false);
        //if(colorId == 1)
          tempContext.stroke();
        tempContext.fill();

        //ctx = canvas.getContext("2d");
        tempContext.font = '16pt Calibri';
        switch(colorId) {

          case 1: case 2: case 3:
          case 7:
          case 13:
          case 19:
          case 25: case 27:
          case 31:
          case 43:
          case 49:
          case 55:
          case 61:
          case 67:
          case 73:
                  tempContext.fillStyle = 'black'; break;
          default:
                  tempContext.fillStyle = 'white'; break;
        }


        tempContext.textAlign = 'center';
        tempContext.fillText('' + colorId + '' , x, y+6);
        //ctx.fillText('1' , x, y+3);


      }
    }

    var imageData = tempCanvas.toDataURL("image/jpg");


    //zipFile.file(title + '.jpg', imageData.replace(/^data:image\/(png|jpg);base64,/,""), {base64: true});
    zipFile.file(title + '.jpg', imageData.split(",")[1], {base64: true});

  }


  const makeBlockButton = (vrModel)  => {

    let blockRowCount = vrModel.dotRowCount / 16;
    let blockColumnCount = vrModel.dotColumnCount / 16;

    let blockGuide = document.getElementById("dotartView_blockGuide");

    if(blockGuide == null)
      return;

    var dotBlockElement = document.createElement('div');
    dotBlockElement.className = "dot-block";
    dotBlockElement.style.left = "10px"
    dotBlockElement.style.top = "10px"
    dotBlockElement.style.width = "" + (blockRowCount * 60) + "px";


    blockGuide.appendChild(dotBlockElement);

    var label = document.createElement('div');
    label.innerHTML = "도트블럭 보기";
    label.style.position = "absolute";
    label.style.color = "white";
    label.style.left = "46px"
    label.style.top = "5px"

    dotBlockElement.appendChild(label);

    for(let i = 0; i < blockRowCount; i ++) {
      for(let j = 0; j < blockColumnCount; j ++) {
        let btn = document.createElement("button");
        btn.innerHTML = "" + (j + 1) + " - " + (i + 1);
        btn.className = "dot-block-button";
        //btn.style.position = "absolute";
        //btn.style.height = "20px";
        //btn.style.width = "40px";
        btn.style.left = "" + (10 + i * 60) + "px";
        btn.style.top = "" + (36 + j * 20) + "px";

        btn.onclick = function () {
          //alert("Button is clicked : " + (j + 1) + " - " + (i + 1));

          makeImageDotBlock(i, j);
        };
        blockGuide.appendChild(btn);
      }
    }

  }


  const makeImageDotBlock = (rowBlockIndex, columnBlockIndex)  => {

    //let dotrow = vrModels.dotRowCount;
    //let dotcol = vrModels.dotColumnCount;

    let startRowIndex = rowBlockIndex * 16;
    let startColumnIndex = columnBlockIndex * 16;
    let endRowIndex = startRowIndex + 16;
    let endColumnIndex = startColumnIndex + 16;
    let title = creationName + ' - ' + (columnBlockIndex + 1) + ' - ' + (rowBlockIndex + 1) + ' 블럭'

    var tempCanvas = document.createElement('canvas');
    tempCanvas.width  = 680;
    tempCanvas.height = 720;

    var w = 40;


    var tempContext:any = tempCanvas.getContext("2d");
    tempContext.moveTo(200, 24);
    tempContext.font = '20pt Calibri';
    tempContext.textAlign = 'left';
    tempContext.fillText(title , 200, 30);

    for (let i = startRowIndex; i < endRowIndex ; i++) {
      for(let j = startColumnIndex; j < endColumnIndex; j ++) {

        let dotName = "dot_" + i + "_" + j;

        let x = 40 + (i - startRowIndex) * 40  ;
        let y = 80 + (j - startColumnIndex) * 40;

        let colorStr = "#FFFFFF";
        let colorId = contextOrg.getImageData(i, j, 1, 1).data[0];
        let colorData = colorDataList.find(element => element.id == colorId)
        if(colorData != undefined)
          colorStr = colorData.color;

        //console.log('x : ' + x + ', y : ' + y + ' color : ' + colorStr + ', colorId : ' + colorId + ' , dotName : ' + dotName);

        tempContext = tempCanvas.getContext("2d");
        tempContext.beginPath();
        tempContext.moveTo(x, y);
        tempContext.fillStyle = colorStr;
        tempContext.arc(x, y, w/2, 0, 2 * Math.PI, false);
        //if(colorId == 1)
          tempContext.stroke();
        tempContext.fill();

        //ctx = canvas.getContext("2d");
        tempContext.font = '16pt Calibri';
        switch(colorId) {

          case 1: case 2: case 3:
          case 7:
          case 13:
          case 19:
          case 25: case 27:
          case 31:
          case 43:
          case 49:
          case 55:
          case 61:
          case 67:
          case 73:
                  tempContext.fillStyle = 'black'; break;
          default:
                  tempContext.fillStyle = 'white'; break;
        }


        tempContext.textAlign = 'center';
        tempContext.fillText('' + colorId + '' , x, y+6);
        //ctx.fillText('1' , x, y+3);


      }
    }

    var blockImage = tempCanvas.toDataURL("image/jpg");

    blockImageData.data = blockImage;
    setBlockImageData(blockImageData);
    setBlockImageName(title);
    setVisibleBlockImageConfirm(true);

  }


  const showDotBlock = (visible)  => {

  }


  const handleShowBlock = (value) => {

    console.log('handleShowBlock start ');

    var event = new CustomEvent('show_block');

    var element = document.getElementById('dotartView_blockGuide');
    if( element != null) {

      if(value){
        element.style.display = '';
      }
      else {
        element.style.display = 'none';
      }

    }
  }


  // return ( <div ref={myRef} id="vrBaseView_vrCanvas" style={{ marginTop: '2px', minHeight: '730px', maxHeight: '730px' }} >
  // <div ref={myRef} id="vrBaseView_vrCanvas" style={{ position: 'fixed', top: '0px', left: '0px', bottom: '-10px', right: '-10px', overflow: 'auto', opacity: '1' }} >
// return (<div>
//           <div ref={myRef} id="vrBaseView_vrCanvas" style={{ position: 'fixed', top: '0px', left: '0px', height: '100vh', width: '80vw', overflow: 'auto', opacity: '1' }} >
//
//               <VrViewPropertyPanel
//                                   onZoomInOut={handleZoomInOut}
//                                   onSaveAsImage={handleSaveAsImage}
//                                   onAutoRotate={handleAutoRotate}
//               > </VrViewPropertyPanel>
//
//             </div>
//             <div style={{ position: 'fixed', top: '0px', height: '100vh', width: '20vw', overflow: 'auto', opacity: '1' }} >
//               <VrViewListPanel    productList={productList}
//                                   vrAssets={vrAssetsContainer}
//                                   vrMallId={props.match.params.vrMallId}
//                                   onDisplayAsset={handleDisplayAsset}
//                                   onAssemblyAsset={handleAssemblyAsset}
//               > </VrViewListPanel>
//             </div>
//           </div>
//    );

const getCanvase = () => {
  var filter = "win16|win32|win64|mac|macintel";
  if(navigator.platform) {
    if(filter.indexOf(navigator.platform.toLowerCase()) < 0) {
      if (window.orientation == 0)
        $('#dotartView_Canvas').css('height', '70vh');
      else
        $('#dotartView_Canvas').css('height', '100vh');
      // if (window.innerWidth <= window.innerHeight)
      //   return (<div ref={myRef} id="vrBaseView_vrCanvas" style={{height:'70vh'}}>
      //           </div>);
      // else
      //   return (<div ref={myRef} id="vrBaseView_vrCanvas" style={{height:'100vh'}}>
      //           </div>);
    }
  }

  return (<div id="dotartView_Canvas" style={{height:'100vh'}}>
            <canvas id="dotartView_2dCanvas" style={{backgroundColor: '#181C1F', position: 'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)' }}>
            </canvas>
            <canvas id="dotartView_2dCanvasOrg" style={{display: 'none', backgroundColor: '#181C1F', position: 'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)' }}>
            </canvas>
            <div id="dotartView_blockGuide" style={{display: 'none'}} />
          </div>);
}

return (
            <Row gutter={[0,0]} style={{ position: 'fixed', top: '0px', left:'0px', bottom: '-10px',  width:'100vw', overflow: 'auto', opacity: '1' }} >
              <Col xxl={19} xl={18} lg={16} md={14} sm={24}>
                { getCanvase() }
              </Col>

              <Col xxl={5} xl={6} lg={8} md={10} sm={24} style={{height:'100vh'}}>
                <DotArt2DListPanel
                                     dotColorIdList={dotColorIdList}
                                     productList={productList}
                                     creation={creation}
                                     colorDataList={colorDataList}
                                     dotRowCountContainer={dotRowCountContainer}
                                     dotColumnCountContainer={dotColumnCountContainer}
                                     onZoomInOut={handleZoomInOut}
                                     onSaveAsImage={handleSaveAsImage}
                                     onSaveAsBlock={handleSaveAsBlock}
                                     onShowBlock={handleShowBlock}
               > </DotArt2DListPanel>
              </Col>
              <SnapshotImageEditorDialog
                  visibleImageEditorConfirm={visibleSnapshotImageEditorConfirm}
                  imageData={imageData}
                  aspectRatio={0}
                  onImageEditorConfirm={(value)=>{setVisibleSnapshotImageEditorConfirm(value)}}
                />

              <BlockImageDialog
                  visibleBlockImageConfirm={visibleBlockImageConfirm}
                  blockImageName={blockImageName}
                  blockImageData={blockImageData}
                  aspectRatio={0}
                  onBlockImageConfirm={(value)=>{setVisibleBlockImageConfirm(value)}}
                />
            </Row>

    );

};
