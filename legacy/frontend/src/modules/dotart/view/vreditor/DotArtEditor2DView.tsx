import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Icon, Select, Row, Col, Modal, Button } from 'antd';
import * as THREE from 'three';
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { OrbitControls } from 'plugins/OrbitControls.js';
//import { TransformControls } from 'plugins/TransformControls.js';


import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';


import { ModalManager} from 'react-dynamic-modal';
import $ from 'jquery';
import * as Tone from "tone";

import GifPlayer from "react-gif-player";

import { InfoModal, SnapshotImageEditorDialog, ThumbImageEditorDialog } from 'components';
import { SOPOONG_URL, SHOP_URL, SHOP_ID, storageService } from 'common';

import { DotArtEditorPropertyPanel, DotArtEditorListPanel, PixelEditorDialog } from '.';

declare global {
  interface Window {
    IMP: any;
  }
}


/**
 * @description 상품 목록 페이지
 */

export const DotArtEditor2DView = (props) => {

  const [vrAssetsContainer, setVrAssetsContainer ] = useState<any[]>([]);
  const [assetGroup, setAssetGroup] = useState<THREE.Group>(new THREE.Group());
  const [vrModelList, setVrModelList] = useState<any>([]);
  const [refreshMode, setRefreshMode] = useState<boolean>(true);

  const [visibleSaveConfirm, setVisibleSaveConfirm] = useState<boolean>(false);
  const [saveResult, setSaveResult] = useState<string>('');
  const [cameraContainer, setCameraContainer] = useState<any>({});

  const [sceneState, setSceneState] = useState<any>({});
  const [transformControlContainer, setTransformControlContainer] = useState<any>({});
  const [orbitControlContainer, setOrbitControlContainer] = useState<any>({});
  const [selectedAsset, setSelectedAsset] = useState<any>({});
  const [dotRowCountContainer, setDotRowCountContainer] = useState<number>(16);
  const [dotColumnCountContainer, setDotColumnCountContainer] = useState<number>(16);
  const [vrModelContainer, setVrModelContainer] = useState<any>({});

  const [imageData, setImageData] = useState<any>({});
  const [creationName, setCreationName] = useState<string>('');
  const [setName, setSetName] = useState<string>("21226");
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

  const [traceMode, setTraceMode] = useState<boolean>(false);
  const [musicModeContainer, setMusicModeContainer] = useState<boolean>(false);
  const [dotColorContainer, setDotColorContainer] = useState<string>('');
  const [dotColorIdContainer, setDotColorIdContainer] = useState<number>(1);

/*
  const [colorDataList, setColorDataList] = useState<any[]>([
          {id:1, title:'White', color:'#FEFEFE', pitch: 'C1'},
          {id:2, title:'Sand Yellow', color:'#E8DA8C', pitch: 'C1'},
          {id:3, title:'Light Yellow', color:'#D1BD43', pitch: 'C1'},
          {id:4, title:'Yellow', color:'#F4BD00', pitch: 'C1'},
          {id:5, title:'Orange Yellow 1', color:'#F3A313', pitch: 'C1'},
          {id:6, title:'Orange', color:'#F15607', pitch: 'C1'},

          {id:7, title:'Apricot', color:'#BE9D83', pitch: 'C1'},
          {id:8, title:'Orange Yellow 2', color:'#C68E24', pitch: 'C1'},
          {id:9, title:'Egg Yolk', color:'#D37201', pitch: 'C1'},
          {id:10, title:'Dark Orange', color:'#E03103', pitch: 'C1'},
          {id:11, title:'Red', color:'#A10000', pitch: 'C1'},
          {id:12, title:'Jujube Red', color:'#550002', pitch: 'C1'},

          {id:13, title:'White Skin', color:'#CCB7B6', pitch: 'C1'},
          {id:14, title:'Light Skin', color:'#CF8D40', pitch: 'C1'},
          {id:15, title:'Brown / Morphine', color:'#795D46', pitch: 'C1'},
          {id:16, title:'Light Coffee', color:'#8D5E11', pitch: 'C1'},
          {id:17, title:'Brown Yellow', color:'#993705', pitch: 'C1'},
          {id:18, title:'Tomato Red', color:'#8E2C21', pitch: 'C1'},

          {id:19, title:'Skin', color:'#D7AD88', pitch: 'C1'},
          {id:20, title:'Dark Skin', color:'#C97E47', pitch: 'C1'},
          {id:21, title:'Red Skin', color:'#B35938', pitch: 'C1'},
          {id:22, title:'Brown Red', color:'#4E1316', pitch: 'C1'},
          {id:23, title:'Coffee', color:'#461900', pitch: 'C1'},
          {id:24, title:'Dark Brown', color:'#2D0000', pitch: 'C1'},

          {id:25, title:'Beige', color:'#B0A076', pitch: 'C1'},
          {id:26, title:'Earthy Yellow', color:'#937A1C', pitch: 'C1'},
          {id:27, title:'Light Grass Green', color:'#A8B444', pitch: 'C1'},
          {id:28, title:'Verdure', color:'#4AA223', pitch: 'C1'},
          {id:29, title:'Light Green', color:'#048600', pitch: 'C1'},
          {id:30, title:'Green', color:'#004D07', pitch: 'C1'},

          {id:31, title:'Pale Green', color:'#A0C263', pitch: 'C1'},
          {id:32, title:'Apple Green', color:'#7E9A0D', pitch: 'C1'},
          {id:33, title:'Grass Green', color:'#587A16', pitch: 'C1'},
          {id:34, title:'Turquoise', color:'#275400', pitch: 'C1'},
          {id:35, title:'Dark Green', color:'#1A3300', pitch: 'C1'},
          {id:36, title:'Army Green', color:'#001800', pitch: 'C1'},

          {id:37, title:'Pink', color:'#C187BB', pitch: 'C1'},
          {id:38, title:'Peach Red', color:'#B76D8C', pitch: 'C1'},
          {id:39, title:'Dark Pink', color:'#BC2A92', pitch: 'C1'},
          {id:40, title:'Plum Red', color:'#C22C66', pitch: 'C1'},
          {id:41, title:'Rose Red', color:'#780038', pitch: 'C1'},
          {id:42, title:'Bear Sand Red', color:'#3E0014', pitch: 'C1'},

          {id:43, title:'Powder Purple', color:'#D3B2DB', pitch: 'C1'},
          {id:44, title:'Dull Purple', color:'#834961', pitch: 'C1'},
          {id:45, title:'Light Rose Red', color:'#8D335D', pitch: 'C1'},
          {id:46, title:'Amaranthine', color:'#83006E', pitch: 'C1'},
          {id:47, title:'Auberqine', color:'#570068', pitch: 'C1'},
          {id:48, title:'Purple', color:'#1F005F', pitch: 'C1'},

          {id:49, title:'Dull Pink', color:'#967890', pitch: 'C1'},
          {id:50, title:'Pale Purple', color:'#8673AD', pitch: 'C1'},
          {id:51, title:'Grey Purple', color:'#5C5668', pitch: 'C1'},
          {id:52, title:'Light Purple', color:'#72437A', pitch: 'C1'},
          {id:53, title:'Medium Purple', color:'#533D64', pitch: 'C1'},
          {id:54, title:'Purplish Blue', color:'#413A8F', pitch: 'C1'},

          {id:55, title:'Mint Green', color:'#92CFC5', pitch: 'C1'},
          {id:56, title:'Aqua Blue', color:'#31A1BA', pitch: 'C1'},
          {id:57, title:'Sea Blue', color:'#007B8A', pitch: 'C1'},
          {id:58, title:'Cerulean', color:'#144D7E', pitch: 'C1'},
          {id:59, title:'Sky Blue', color:'#0164A1', pitch: 'C1'},
          {id:60, title:'Blue', color:'#003489', pitch: 'C1'},

          {id:61, title:'Power Green', color:'#76AA8B', pitch: 'C1'},
          {id:62, title:'Pea Green', color:'#3C7A61', pitch: 'C1'},
          {id:63, title:'Light Lake Blue', color:'#416F7C', pitch: 'C1'},
          {id:64, title:'Lake Blue', color:'#005653', pitch: 'C1'},
          {id:65, title:'Dark Blue', color:'#004069', pitch: 'C1'},
          {id:66, title:'Sappine Blue', color:'#002158', pitch: 'C1'},

          {id:67, title:'Powder Blue', color:'#86A0BA', pitch: 'C1'},
          {id:68, title:'Dark Powder Blue', color:'#5F7F9F', pitch: 'C1'},
          {id:69, title:'Light Blue', color:'#376FA0', pitch: 'C1'},
          {id:70, title:'Dark Gray Blue', color:'#19384B', pitch: 'C1'},
          {id:71, title:'Black Gray', color:'#404040', pitch: 'C1'},
          {id:72, title:'Black', color:'#000000', pitch: 'C1'},

          {id:73, title:'Gray White', color:'#82826C', pitch: 'C1'},
          {id:74, title:'Light Gray', color:'#757877', pitch: 'C1'},
          {id:75, title:'Medium Gray', color:'#4E5350', pitch: 'C1'},
          {id:76, title:'Gray Blue', color:'#454E64', pitch: 'C1'},
          {id:77, title:'Dark Gray', color:'#606060', pitch: 'C1'}
        ]);
*/


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

  //const vrModelList:VrModel[] = Object.assign(vrModels);
  //var vrModelList:VrModel[] = [];
  let vrModelMap;
  let vrAssets;

  //console.log("start......................................");

  const dotartEditorRef = React.createRef<HTMLDivElement>();

  var scene = new THREE.Scene();

  //private camera = new THREE.PerspectiveCamera( 75, canvasWidth / canvasHeight, 1, 1100 );
  //var camera = new THREE.PerspectiveCamera( 75, 10, 1, 11000 );
  //var renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true, antialias: true});
  let camera;
  let renderer;

  let orbitControl;
  let transformControl;

  var outline = false;
  let outlineEffect;

  var loader = new FBXLoader();
  var gltfLoader = new GLTFLoader();
  var exporter = new STLExporter();
  var gltfExporter = new GLTFExporter();

  var skyMesh = new THREE.Mesh();
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  var axis = new THREE.Vector3( 0, 1, 0 ).normalize();

  var textureLoader = new THREE.TextureLoader();
  var clock = new THREE.Clock();

  var vrMaterialMap = new Map();

  var animationCount: number = 0;

  let backgroundTexture;
  let backgroundColor;
  let groundMaterial;

  let plateObject;
  let plateColor;
  let baseDotColor;
  let baseDotModelMap;

  let dotObject;
  let dotColor;
  let dotColorId;
  let dotPitch;
  let dotRowCount;
  let dotColumnCount;
  let dotColorMap;

  let musicMode = false;

  var snapMode = 'technic';

  let changeHistory = new Array();
  let changeIndex = -1;


  let scaleRatio;

  let colorEditMode = 'paint';

  const synth = new Tone.Synth().toDestination();

  useEffect(() => {

    $('#MainHeader').hide();
    $('#MainFooter').hide();

    dotColorMap = new Map();
    colorDataList.forEach(colorData => dotColorMap.set(colorData.color, colorData));

    initVrControls();
    initEnvironment(undefined, undefined, undefined, undefined);

    if(props.match.params.creationId > 0)
      getCreationDotArtData();
    else {
      makeDotPanel(16, 16, undefined);
      $("#editor_dotart_loading").hide();
    }

    initGizmoControls();

    window.addEventListener( 'resize',onWindowResize, false );

    window.addEventListener('beforeunload', (event) => {
      // Cancel the event as stated by the standard.
      event.preventDefault();
      // Chrome requires returnValue to be set.
       event.returnValue = '';
     });


     return () => {

       // Scene에 추가된 Object들을 제거함
       clearVrObject();

       clearPlayObject();

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
                      setCoverImage(data.coverImage);
                      setVisible(data.visible);

                      if(data.vrModels != undefined)

                      var vrModel = JSON.parse(data.vrModels);
                      console.log('vrModel : ', vrModel);

                      if(vrModel == null)
                        return;

                      setDotArtObject(vrModel);
                      setVrModelContainer(vrModel);

                    })
      .catch(err => {console.log(err); $("#editor_dotart_loading").hide();});

  };


  // VR 초기화
  const initVrControls = () => {

    renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true, antialias: true});

 		renderer.setPixelRatio( window.devicePixelRatio * 1 );

 		var canvasWidth = $('#dotartEditor_vrCanvas').width();
 		var canvasHeight = $('#dotartEditor_vrCanvas').height() ;

 		renderer.setSize( canvasWidth, canvasHeight );

    renderer.shadowMap.enabled = true;
    renderer.physicallyCorrectLights = true;
    renderer.gammaFactor = 1.18;
    renderer.outputEncoding = THREE.sRGBEncoding;


    outlineEffect = new OutlineEffect(renderer, {defaultThickness:0.002});



    camera = new THREE.PerspectiveCamera( 30, canvasWidth / canvasHeight, 0.1, 3000 );
    //camera = new THREE.PerspectiveCamera( 75, 10, 1, 11000 );
    camera.position.set( 25, 25, 25);
    //camera.lookAt( scene.position );
 		camera.lookAt( 0,0, 0 );
 		camera.updateMatrix();

    setCameraContainer(camera);

    orbitControl = new OrbitControls( camera, renderer.domElement );
    orbitControl.screenSpacePanning = true;
    orbitControl.target.set( 0, 0, 0 );
    orbitControl.update();
    orbitControl.addEventListener( 'change', renderVr );
    setOrbitControlContainer(orbitControl);

    transformControl = new TransformControls( camera, renderer.domElement );
		transformControl.addEventListener( 'change', renderVr );
		transformControl.addEventListener( 'dragging-changed', function ( event ) {
			orbitControl.enabled = ! event.value;
		} );
    //transformControl.setSpace( "local");
    transformControl.setSpace( "world");
    transformControl.setTranslationSnap(0.4);
    transformControl.setRotationSnap(15*Math.PI/180);
    transformControl.setSize(1);

    setTransformControlContainer(transformControl);

		scene.add( transformControl );


 		scene.add( assetGroup );

    scene.background = new THREE.Color( 0xeeeeee );
    scene.environment = new RoomEnvironment( renderer );

    // var directLight = new THREE.DirectionalLight( 0xffffff );
    // directLight.position.set( 0, 1, 1 ).normalize();
    // scene.add(directLight);


    const ambientLight = new THREE.AmbientLight( 0xdeebed, 0.4 );
		scene.add( ambientLight );

		const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
		directionalLight.position.set( 1, 1, -1 ).normalize();
		scene.add( directionalLight );

    const directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
		directionalLight2.position.set( 1, 1, 1 ).normalize();
		scene.add( directionalLight2 );


    const directionalLight3 = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight3.position.set( -1, 1, -1 ).normalize();
    scene.add( directionalLight3 );

    const directionalLight4 = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight4.position.set( 1, 1, -1 ).normalize();
    scene.add( directionalLight4 );




 	    //////////////////////sky end /////////////////////////////////


    const htmlDivElement = dotartEditorRef.current;
    if(htmlDivElement) {
     htmlDivElement.insertBefore(renderer.domElement, htmlDivElement.firstChild);
    }

    animate();

    onWindowResize();

    var gridHelper: any = new THREE.GridHelper( 1000, 1000, 0x000000, 0x000000 );
    gridHelper.material.opacity = 0.1;
    gridHelper.material.depthWrite = false;
    gridHelper.material.transparent = true;
    //scene.add( gridHelper );


    $('#dotartEditor_vrCanvas').on("click", onDocumentMouseClick);
    $('#dotartEditor_vrCanvas').on("save_asset", onDocumentSaveAsset);
    $('#dotartEditor_vrCanvas').on("trace_color", onDocumentTraceColor);
    $('#dotartEditor_vrCanvas').on("music_play", onDocumentMusicPlay);
    $('#dotartEditor_vrCanvas').on("pixel_canvas", onDocumentPixelCanvas);
    $('#dotartEditor_vrCanvas').on("touchend", onDocumentTouchClick);

    $('#dotartEditor_vrCanvas').on("setting_background", onDocumentSettingBackground);
    $('#dotartEditor_vrCanvas').on("save_image", onDocumentSaveAsImage);
    $('#dotartEditor_vrCanvas').on("save_thumb_image", onDocumentSaveAsThumbImage);
    $('#dotartEditor_vrCanvas').on("upload_pixel_image", onDocumentUploadPixelImage);
    $('#dotartEditor_vrCanvas').on("setting_info", onDocumentSettingInfo);
    $('#dotartEditor_vrCanvas').on("export_stl", onDocumentExportToStl);
    $('#dotartEditor_vrCanvas').on("export_gltf", onDocumentExportToGltf);

    $('#dotartEditor_vrCanvas').on("change_base_color", onDocumentChangeBaseColor);
    $('#dotartEditor_vrCanvas').on("change_base_dot_color", onDocumentChangeBaseDotColor);
    $('#dotartEditor_vrCanvas').on("change_base_dot_model", onDocumentChangeBaseDotModel);
    $('#dotartEditor_vrCanvas').on("change_dot_color", onDocumentChangeDotColor);
    $('#dotartEditor_vrCanvas').on("change_dot_count", onDocumentChangeDotCount);
    $('#dotartEditor_vrCanvas').on("change_color_edit_mode", onDocumentChangeColorEditMode);


    setSceneState(scene);



 	}


  // 배경 및 바닥 초기화

  const initEnvironment = (cameraPosition, cameraTarget, backgroundPath, groundPath) => {

    if(cameraPosition != undefined) {
      var cposition = JSON.parse(cameraPosition);

      camera.position.set( cposition.x, cposition.y, cposition.z);
    }

    if(cameraTarget != undefined) {
      var ctarget = JSON.parse(cameraTarget);

      camera.lookAt( ctarget.x, ctarget.y, ctarget.z );
      orbitControl.target.set( ctarget.x, ctarget.y, ctarget.z );
    }

    let  groundTexture;
    if(groundPath != undefined)
      groundTexture = textureLoader.load( groundPath);
    else
      groundTexture = textureLoader.load( './images/brickground/background/baseplate.png');

		groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
		groundTexture.repeat.set( 30, 30 );
		groundTexture.anisotropy = 16;
		groundTexture.encoding = THREE.sRGBEncoding;

    // let normalPath = groundPath.replace('.jpg', '_normal.jpg');
    // let normalTexture = textureLoader.load( normalPath);
    // normalTexture.wrapS = normalTexture.wrapT = THREE.RepeatWrapping;
		// normalTexture.repeat.set( 10, 10 );
    // normalTexture.anisotropy = 16;
		// normalTexture.encoding = THREE.sRGBEncoding;
    //
		// var groundMaterial = new THREE.MeshStandardMaterial( { map: groundTexture, normalMap: normalTexture } );

    groundMaterial = new THREE.MeshStandardMaterial( { map: groundTexture, transparent: true, opacity: 1 } );

		var groundMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 50, 50 ), groundMaterial );
		//groundMesh.position.y = - 250;
    groundMesh.position.y = -0.4;
    groundMesh.position.z = 0;
		groundMesh.rotation.x = - Math.PI / 2;
		groundMesh.receiveShadow = true;
		//scene.add( groundMesh );

    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
	   scene.add( ambientLight );


    backgroundColor = new THREE.Color( 0xdeebed );

    if(backgroundPath != undefined)
      backgroundTexture = textureLoader.load( backgroundPath);
    else
      backgroundTexture = textureLoader.load( './images/brickground/background/default_background.jpg');
    //scene.background = backgroundTexture;

  }


  const makeDotPanel = (dotrow, dotcol, vrModels) => {

    let i = 0;
    let j = 0;

    let platerow = dotrow/16;
    let platecol = dotcol/16;


    if(gizmoCamera != undefined) {
      if(dotrow > dotcol) {
        camera.position.set( 0, dotrow * 1.5 , dotrow);
        gizmoCamera.position.set( 0, dotrow * 1.5 , dotrow);
      }
      else {

        camera.position.set( 0, dotcol * 1.5, dotcol);
        gizmoCamera.position.set( 0, dotcol * 1.5, dotcol);
      }

      camera.lookAt(0,0,0);
      orbitControl.target.set(0, 0, 0);
      renderVr();
    }


    dotRowCount = dotrow;
    dotColumnCount = dotcol;

    setDotRowCountContainer(dotRowCount);
    setDotColumnCountContainer(dotColumnCount);

    if(plateObject == undefined && dotObject == undefined) {

      gltfLoader.load( './images/brickground/models/41314/dotart_plate_16.glb', function ( object:any ) {

        object.scene.traverse( function ( child ) {
  				if ( child.isMesh ) {
  					child.castShadow = true;
  					child.receiveShadow = true;
            //child.material.color.set("#1b2a34");
            child.material.color.copySRGBToLinear(new THREE.Color("#1B2A34"));

            plateColor = child.material.color;
  				}
  			} );


        object.scene.scale.set(100, 100, 100);
        plateObject = object.scene;

        for (i = 0; i < platerow ; i++) {
          for(j = 0; j < platecol; j ++) {

            let plateAsset = object.scene.clone();
            plateAsset.position.set((i - (platerow - 1)/2) * 12.8, 0, (j - (platecol - 1)/2) * 12.8);
            plateAsset.name = "base_" + i + "_" + j;
            assetGroup.add(plateAsset);
          }
        }


        if(vrModels != undefined && vrModels.plateColor != undefined) {
          plateColor = new THREE.Color(vrModels.plateColor);
          changeBaseColor(plateColor, 'base');
        }

      });

      gltfLoader.load( './images/brickground/models/41314/4159553.glb', function ( object:any ) {

        object.scene.traverse( function ( child ) {
  				if ( child.isMesh ) {
            child.castShadow = true;
  					child.receiveShadow = true;
            child.material.color.copySRGBToLinear(new THREE.Color("#F8F8F8"));

            if(baseDotModelMap == undefined)
              baseDotModelMap = new Map();

            baseDotModelMap.set(4159553, object.scene.clone());
  				}
  			});
      });

      //fbxLoader.load( './images/brickground/models/41314/4141607.fbx', function ( object ) {
      gltfLoader.load( './images/brickground/models/41314/4161734.glb', function ( object:any ) {

        object.scene.traverse( function ( child ) {
  				if ( child.isMesh ) {
  					child.castShadow = true;
  					child.receiveShadow = true;
            //child.material.color.setHex(0xf4f4f4);
            child.material.color.copySRGBToLinear(new THREE.Color("#F8F8F8"));

            baseDotColor = child.material.color;

            if(baseDotModelMap == undefined)
              baseDotModelMap = new Map();

            baseDotModelMap.set(4161734, object.scene.clone());
  				}
  			} );

        object.scene.scale.set(100, 100, 100);
        dotObject = object.scene;

        const geometry:any = new THREE.CylinderGeometry( 0.4, 0.4, 0.32, 32 );
        const material:any = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        const cylinder:any = new THREE.Mesh( geometry, material );
        const tempObject:any = new THREE.Group();
        tempObject.add(cylinder);
        dotObject = tempObject;

        for (i = 0; i < dotrow ; i++) {
          for(j = 0; j < dotcol; j ++) {
            //let dotAsset = object.scene.clone();
            let dotAsset = tempObject.clone();
            dotAsset.position.set((i - (dotrow - 1)/2) * 0.8, 0.32, (j - (dotcol - 1)/2) * 0.8);
            dotAsset.name = "dot_" + i + "_" + j;

            //dotAsset.children[0].material = object.scene.children[0].material.clone();
            dotAsset.children[0].material = material.clone();
            dotAsset.children[0].userData.colorId = 1;
            dotAsset.children[0].userData.pitch = 'C1';
            assetGroup.add(dotAsset);
          }
        }

        if(vrModels != undefined) {
          if(vrModels.baseDotColor != undefined) {
            baseDotColor = new THREE.Color(vrModels.baseDotColor);
            changeBaseColor(baseDotColor, 'dot');
          }

/*
          if(vrModels.instances != undefined) {

            vrModels.instances.forEach(instance => {

              if( instance.instanceName == undefined ||
                  instance.color == undefined)
                  return;

              changeHistory.push({dotName: instance.instanceName, dotColor: instance.color});

              let asset:any = assetGroup.getObjectByName(instance.instanceName);

              if(asset != undefined) {
                asset.children[0].material.color.set(instance.color).convertSRGBToLinear();
                asset.children[0].userData.colorId = instance.colorId;
                asset.children[0].userData.pitch = instance.pitch;
                //asset.children[0].material.color.set(instance.color);
              }

            });
          }
*/

          if(vrModels.instances != null) {

            let index;
            let rowIndex;
            let columnIndex;
            let color;
            let colorId;
            let dotName;

            var colorList = vrModels.instances[0].pitch.split(',');
            var colorIdList = vrModels.instances[1].pitch.split(',');

            colorList.pop();
            colorIdList.pop();

            for(rowIndex = 0; rowIndex < dotrow; rowIndex ++) {
              for(columnIndex = 0; columnIndex < dotcol; columnIndex ++) {
                index = rowIndex * dotcol + columnIndex;
                color = colorList[index];
                colorId = colorIdList[index];

                dotName = "dot_" + rowIndex + "_" + columnIndex;

                let asset:any = assetGroup.getObjectByName(dotName);



                if(asset != undefined) {
                  //console.log("dotName : " + dotName + " , color : " + color + " , colorId : " + colorId);
                  asset.children[0].material.color.set(Number(color)).convertSRGBToLinear();
                  asset.children[0].userData.color = Number(color);
                  if(colorId == 0)
                     asset.children[0].userData.colorId = 1;
                  else
                     asset.children[0].userData.colorId = Number(colorId);
                  asset.children[0].userData.pitch = Number(colorId);
                }
              }
            }
          }


        }

        $("#editor_dotart_loading").hide();

      });
    }
    else {  // plate 확장

      for (i = assetGroup.children.length - 1; i >= 0; i--) {
  			var childAsset = assetGroup.children[i];
        childAsset.userData.used = false;
  		}

      for (i = 0; i < platerow ; i++) {
        for(j = 0; j < platecol; j ++) {

          let plateName = "base_" + i + "_" + j;

          var asset: any = assetGroup.getObjectByName( plateName );

          if (asset == undefined) {
            asset = plateObject.clone();
            asset.name = plateName;
            asset.position.set((i - (platerow - 1)/2) * 12.8, 0, (j - (platecol - 1)/2) * 12.8);
            asset.userData.used = true;
            assetGroup.add(asset);

          }
          else {
            asset.position.set((i - (platerow - 1)/2) * 12.8, 0, (j - (platecol - 1)/2) * 12.8);
            asset.userData.used = true;
          }

        }
      }

      for (i = 0; i < dotrow ; i++) {
        for(j = 0; j < dotcol; j ++) {

          let dotName = "dot_" + i + "_" + j;

          var asset: any = assetGroup.getObjectByName( dotName );

          if (asset == undefined) {
            asset = dotObject.clone();
            asset.name = dotName;
            asset.position.set((i - (dotrow - 1)/2) * 0.8, 0.32, (j - (dotcol - 1)/2) * 0.8);
            asset.children[0].material = dotObject.children[0].material.clone();
            asset.children[0].userData.colorId = dotObject.children[0].userData.colorId;
            asset.children[0].userData.pitch = dotObject.children[0].userData.pitch;
            asset.userData.used = true;
            assetGroup.add(asset);

          }
          else {
            asset.position.set((i - (dotrow - 1)/2) * 0.8, 0.32, (j - (dotcol - 1)/2) * 0.8);
            asset.userData.used = true;
          }
        }
      }

      for (var index = assetGroup.children.length - 1; index >= 0; index--) {
  			var childAsset = assetGroup.children[index];

        if(!childAsset.userData.used)
          assetGroup.remove(childAsset);
  		}

    }

  }


  const setDotArtObject = (vrModels) => {

    if(vrModels == null)
      return;

    makeDotPanel(vrModels.dotRowCount, vrModels.dotColumnCount, vrModels);


/*
    if(vrModels.plateColor != undefined) {
      plateColor = new THREE.Color(vrModels.plateColor);
      changeBaseColor(plateColor, 'base');
    }

    if(vrModels.baseDotColor != undefined) {
      baseDotColor = new THREE.Color(vrModels.baseDotColor);
      changeBaseColor(baseDotColor, 'dot');
    }


    vrModels.instances.forEach(instance => {

      if( instance.instanceName == undefined ||
          instance.color == undefined)
          return;

      changeHistory.push({dotName: instance.instanceName, dotColor: instance.color});

      let asset:any = assetGroup.getObjectByName(instance.instanceName);

      if(asset != undefined) {
        asset.children[0].material.color.set(instance.color).convertSRGBToLinear();
      }

    });
*/
  }


  const clearVrObject = () => {

    // dispose
    console.log('dispose renderer!')
    renderer.dispose()

    scene.traverse((object:any) => {
    	if (!object.isMesh) return

    	//console.log('dispose geometry!')
    	object.geometry.dispose()

    	if (object.material.isMaterial) {
    		cleanMaterial(object.material)
    	} else {
    		// an array of materials
    		for (const material of object.material) cleanMaterial(material)
    	}
    });

    // remove all children
    console.info('Removing all children...')
    for (let i = scene.children.length - 1; i >= 0 ; i--) {

      //console.info('children. : ' , i);

      let child = scene.children[ i ];

      scene.remove(child);

    }

    while (renderer.domElement.lastChild) // `renderer` is stored earlier
      renderer.domElement.removeChild(renderer.domElement.lastChild)




    // modelmap 삭제
    if(vrModelMap != undefined)
      vrModelMap.clear();

    if(vrMaterialMap != undefined)
      vrMaterialMap.clear();

  }

  const cleanMaterial = material => {
  	//console.log('dispose material!')
  	material.dispose()

  	// dispose textures
  	for (const key of Object.keys(material)) {
  		const value = material[key]
  		if (value && typeof value === 'object' && 'minFilter' in value) {
  			console.log('dispose texture!')
  			value.dispose()
  		}
  	}
  }

  const clearPlayObject = () => {

    if(synth != undefined)
      synth.dispose();

  }


  const onWindowResize = () => {

		var canvasWidth = $('#dotartEditor_vrCanvas').width() - 2;
		var canvasHeight = $('#dotartEditor_vrCanvas').height();
    // var canvasWidth = window.innerWidth;
		// var canvasHeight = window.innerHeight;

		//camera.aspect = window.innerWidth / window.innerHeight;
		camera.aspect = canvasWidth / canvasHeight;
		camera.updateProjectionMatrix();

		//renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setSize( canvasWidth, canvasHeight );


    $("#dotartEditor_vrGizmoCanvas").css("top", $('html, body').offset().top + 30);
    $("#dotartEditor_vrGizmoCanvas").css("left", $('html, body').offset().left + $('#dotartEditor_vrCanvas').outerWidth() - 130);

		//renderVr();

	}


  /*
  const renderVr = () => {

		renderer.render( scene, camera );


    if(gizmoTarget != undefined){
      gizmoTarget.rotation.x = -camera.rotation.x;
      gizmoTarget.rotation.y = -camera.rotation.y;
      gizmoTarget.rotation.z = -camera.rotation.z;
    }

    if(outline){
      outlineEffect.render( scene, camera );
    }

	}
  */


  const renderVr = () => {

		renderer.render( scene, camera );

    if(gizmoCamera != undefined){

      var deltax = camera.position.x - gizmoCamera.position.x;
      var deltay = camera.position.y - gizmoCamera.position.y;
      var deltaz = camera.position.z - gizmoCamera.position.z;

      //gizmoCamera.rotation.x = camera.rotation.x;
      //gizmoCamera.rotation.y = camera.rotation.y;
      //gizmoCamera.rotation.z = camera.rotation.z;

      gizmoCamera.position.x = camera.position.x;
      gizmoCamera.position.y = camera.position.y;
      gizmoCamera.position.z = camera.position.z;

      console.log("orbitControl  point : " +  orbitControl.target.x + "," +  orbitControl.target.y + "," +  orbitControl.target.z);

      if(gizmoTarget != undefined){

        var gdistance = 43.3;
        var distance = camera.position.distanceTo(orbitControl.target);

        scaleRatio = distance / gdistance;

        gizmoTarget.position.set(orbitControl.target.x, orbitControl.target.y, orbitControl.target.z);
        gizmoTarget.scale.set(1.1*scaleRatio, 1.1*scaleRatio, 1.1*scaleRatio);
        gizmoCamera.lookAt(orbitControl.target.x, orbitControl.target.y, orbitControl.target.z);
      }

    }

    if(outline){
      outlineEffect.render( scene, camera );
    }

	}




  const animate = () => {
		window.requestAnimationFrame( animate );
		//orbitControl.update();

    animationCount ++

    if(animationCount > 5) {

	    renderer.render( scene, camera );

      animationCount = 0;
    }

    if(outline){
      outlineEffect.render( scene, camera );
    }

	}


  const initAsset = () => {

		camera.position.set( 100, 0, 0 );
		camera.lookAt( scene.position );


		for (var i = assetGroup.children.length - 1; i >= 0; i--) {

			//assetGroup.remove(assetGroup.children[i]);

			var childAsset = assetGroup.children[i];

			for(var j = childAsset.children.length -1; j >= 0; j--)
				childAsset.remove(childAsset.children[j]);

			assetGroup.remove(childAsset);
		}

	}


  const onDocumentMouseClick = (event) => {

    console.log( 'CreationMallEditor onDocumentMouseClick start' );

    var rect = renderer.domElement.getBoundingClientRect();

    var mouse = new THREE.Vector2();

    mouse.x =((( event.clientX - rect.left ) / rect.width) * 2) - 1;
    mouse.y =  -((( event.clientY - rect.top ) / rect.height) * 2) + 1;

    var raycaster = new THREE.Raycaster();

    raycaster.setFromCamera(mouse, camera);

    var intersects:any = raycaster.intersectObjects(assetGroup.children, true);


    if (intersects.length > 0) {


      let name;

      for (var i = 0; i < intersects.length; i++) {

        if( intersects[i].object == undefined || intersects[i].object.parent == undefined)
          continue;

        name = intersects[i].object.parent.name;

        let dotName = name.substring(0, name.indexOf('_'));

        if(dotName == 'dot') {

          //intersects[i].object.material.color.copySRGBToLinear(dotColor);

          if (event.altKey || colorEditMode == 'pick') { // Alt + 객체 선택시 객체색깔을 dotColor로  변경
            //dotColor = intersects[i].object.material.color.clone();
            //setDotColorContainer(dotColor.clone().convertLinearToSRGB().getHexString());

            dotColor = intersects[i].object.material.color.clone();
            dotColorId = intersects[i].object.userData.colorId;
            dotPitch = intersects[i].object.userData.pitch;
            setDotColorIdContainer(dotColorId);
            setDotColorContainer(dotColor.clone().convertLinearToSRGB().getHexString());
          }
          else {
            if(dotColor != undefined) {
              intersects[i].object.material.color.copy(dotColor);
              intersects[i].object.userData.colorId = dotColorId;
              intersects[i].object.userData.pitch = dotPitch;

              console.log('objectColor 1 : ' + intersects[i].object.material.color.getHexString());
              console.log('objectColor 2 : ' + intersects[i].object.material.color.clone().convertLinearToSRGB().getHexString());

              let changeData = {dotName: intersects[i].object.parent.name, dotColor: dotColor.clone().convertLinearToSRGB().getHex(), colorId: dotColorId, pitch: dotPitch }
              changeHistory.push(changeData);
            }

            if(musicMode)
              synth.triggerAttackRelease(dotPitch, "8n");
          }

          break;
        }
      }
    }
  }


  const onDocumentTouchClick = (event) => {

    console.log( 'CreationMallEditor onDocumentTouchClick start' );

    var rect = renderer.domElement.getBoundingClientRect();

    var mouse = new THREE.Vector2();

    mouse.x =((( event.changedTouches[0].clientX - rect.left ) / rect.width) * 2) - 1;
    mouse.y =  -((( event.changedTouches[0].clientY - rect.top ) / rect.height) * 2) + 1;

    var raycaster = new THREE.Raycaster();

    raycaster.setFromCamera(mouse, camera);

    var intersects:any = raycaster.intersectObjects(assetGroup.children, true);


    if (intersects.length > 0) {


      let name;

      for (var i = 0; i < intersects.length; i++) {

        if( intersects[i].object == undefined || intersects[i].object.parent == undefined)
          continue;

        name = intersects[i].object.parent.name;

        let dotName = name.substring(0, name.indexOf('_'));

        if(dotName == 'dot') {

          //intersects[i].object.material.color.copySRGBToLinear(dotColor);

          if (event.altKey || colorEditMode == 'pick') { // Alt + 객체 선택시 객체색깔을 dotColor로  변경
            //dotColor = intersects[i].object.material.color.clone();
            //setDotColorContainer(dotColor.clone().convertLinearToSRGB().getHexString());

            dotColor = intersects[i].object.material.color.clone();
            dotColorId = intersects[i].object.userData.colorId;
            dotPitch = intersects[i].object.userData.pitch;
            setDotColorIdContainer(dotColorId);
            setDotColorContainer(dotColor.clone().convertLinearToSRGB().getHexString());
          }
          else {
            if(dotColor != undefined) {
              intersects[i].object.material.color.copy(dotColor);
              intersects[i].object.userData.colorId = dotColorId;
              intersects[i].object.userData.pitch = dotPitch;

              console.log('objectColor 1 : ' + intersects[i].object.material.color.getHexString());
              console.log('objectColor 2 : ' + intersects[i].object.material.color.clone().convertLinearToSRGB().getHexString());

              let changeData = {dotName: intersects[i].object.parent.name, dotColor: dotColor.clone().convertLinearToSRGB().getHex(), colorId: dotColorId, pitch: dotPitch }
              changeHistory.push(changeData);
            }

            if(musicMode)
              synth.triggerAttackRelease(dotPitch, "8n");
          }

          break;
        }
      }
    }
  }


  const handleBaseColor = (baseColor) => {

    var event = new CustomEvent('change_base_color', { detail: {baseColor: baseColor} });

    var element = document.getElementById('dotartEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentChangeBaseColor = (event) => {

    plateColor = new THREE.Color(event.detail.baseColor);
    changeBaseColor(plateColor, 'base');
  }


  const handleBaseDotColor = (baseColor) => {

    var event = new CustomEvent('change_base_dot_color', { detail: {baseColor: baseColor} });

    var element = document.getElementById('dotartEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentChangeBaseDotColor = (event) => {

    Modal.confirm({
      title: '배경도트색을 바꾸시겠습니까?',
      content: '도트색 및 작업이력이 초기화 됩니다.',
      okText: '확인',
      cancelText: '취소',
      onOk() {
        return changeBaseDotColor(event.detail.baseColor);
      },
      onCancel() {},
    });

  }

  const changeBaseDotColor = (color) => {

    baseDotColor = new THREE.Color(color);
    changeBaseColor(baseDotColor, 'dot');

    changeHistory = new Array();

  }

  const changeBaseColor = (baseColor, type) => {

    if(baseColor != undefined) {

      for (var i = assetGroup.children.length - 1; i >= 0; i--) {

        var childAsset:any = assetGroup.children[i];

        const name = childAsset.name.substring(0, childAsset.name.indexOf('_'));

        if(name == type)
          childAsset.children[0].material.color.copySRGBToLinear(baseColor);
      }
    }
  }



  const handleDotColor = (dotColor) => {

    var event = new CustomEvent('change_dot_color', { detail: {dotColor: dotColor} });

    var element = document.getElementById('dotartEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentChangeDotColor = (event) => {

    console.log('event.detail.dotColor : ' + event.detail.dotColor );
    dotPitch = getPitch(event.detail.dotColor.color);
    dotColor = new THREE.Color(event.detail.dotColor.color);
    dotColor.convertSRGBToLinear();

    dotColorId = event.detail.dotColor.id;

  }


  const handleBaseDotModel = (baseModel) => {

    var event = new CustomEvent('change_base_dot_model', { detail: {baseModel: baseModel} });

    var element = document.getElementById('dotartEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentChangeBaseDotModel = (event) => {

    console.log('event.detail.baseModel : ' + event.detail.baseModel );

    let dotObjectGroup = new THREE.Group();

    for (var i = assetGroup.children.length - 1; i >= 0; i--) {

      var childAsset:any = assetGroup.children[i];

      const name = childAsset.name.substring(0, childAsset.name.indexOf('_'));

      if(name == 'dot') {

        let dotObject = baseDotModelMap.get(event.detail.baseModel).clone();

        dotObject.name = childAsset.name;
        dotObject.scale.set(childAsset.scale.x, childAsset.scale.y, childAsset.scale.z);
        dotObject.position.set(childAsset.position.x, childAsset.position.y, childAsset.position.z);
        dotObject.children[0].material = childAsset.children[0].material.clone();
        dotObject.children[0].userData.colorId = childAsset.children[0].userData.colorId;
        dotObject.children[0].userData.pitch = childAsset.children[0].userData.pitch;

        dotObjectGroup.add(dotObject);
      }
    }

    for (var i = assetGroup.children.length - 1; i >= 0; i--) {

      var childAsset:any = assetGroup.children[i];

      const name = childAsset.name.substring(0, childAsset.name.indexOf('_'));

      if(name == 'dot') {
        assetGroup.remove(childAsset);
      }
    }


    for (var i = dotObjectGroup.children.length - 1; i >= 0; i--) {

      var childAsset:any = dotObjectGroup.children[i];

      assetGroup.add(childAsset);

    }

  }



  const handleDotCount = (rowCount, columnCount) => {

    var event = new CustomEvent('change_dot_count', { detail: {rowCount: rowCount, columnCount: columnCount} });

    var element = document.getElementById('dotartEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentChangeDotCount = (event) => {

    makeDotPanel(event.detail.rowCount, event.detail.columnCount, undefined);

  }

  const onDocumentTraceColor = (event) => {

    if(event.detail.traceMode) {
      if(changeIndex == -1) {

        for (let i = assetGroup.children.length - 1; i >= 0; i--) {
    			var childAsset:any = assetGroup.children[i];
          childAsset.userData.color = childAsset.children[0].material.color.clone();

          const name = childAsset.name.substring(0, childAsset.name.indexOf('_'));

          if(name == 'base')
            childAsset.children[0].material.color.copySRGBToLinear(plateColor);
          else if(name == 'dot')
            childAsset.children[0].material.color.copySRGBToLinear(baseDotColor);
    		}

      }
      else if(changeIndex < changeHistory.length) {

        let colorData = changeHistory[changeIndex];

        var asset:any = assetGroup.getObjectByName( colorData.dotName );

        if(asset != undefined) {
          //asset.children[0].material.color.copySRGBToLinear(new THREE.Color(colorData.dotColor));
          asset.children[0].material.color.set(colorData.dotColor).convertSRGBToLinear();

          //synth.triggerAttackRelease(getPitch(asset.children[0].material.color.clone().convertLinearToSRGB().getHexString()), "8n");
        }
      }
      else {
        setTraceMode(false);
      }

      changeIndex ++;
    }
    else {

      changeIndex = -1;

      for (let i = assetGroup.children.length - 1; i >= 0; i--) {
        var childAsset:any = assetGroup.children[i];
        childAsset.children[0].material.color.set(childAsset.userData.color);
      }
    }

  }


  const handleTraceColor = (mode) => {
    console.log("creation handleTraceColor: ");

    setTraceMode(mode);

    var event = new CustomEvent('trace_color', {detail: {traceMode:mode} });

    var element = document.getElementById('dotartEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);
  }

  const handleMusicPlay = (mode) => {
    console.log("creation handleMusicPlay: ");

    setTraceMode(mode);

    var event = new CustomEvent('music_play', {detail: {musicMode:mode} });

    var element = document.getElementById('dotartEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentMusicPlay = (event) => {

    musicMode = event.detail.musicMode;
    setMusicModeContainer(event.detail.musicMode);

  }


  const handlePixelCanvas = (pixelCanvas) => {

    var event = new CustomEvent('pixel_canvas', { detail: {pixelCanvas: pixelCanvas} });

    var element = document.getElementById('dotartEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentPixelCanvas = (event) => {

    let pixelCanvas:any = event.detail.pixelCanvas;
    let	pixelContext:any = pixelCanvas.getContext("2d");

    let widthReminder = pixelCanvas.width%16;
    let heightReminder = pixelCanvas.height%16;

    let imageData = pixelContext.getImageData(0, 0, pixelCanvas.width, pixelCanvas.height);

    let dotrow = pixelCanvas.width - widthReminder;
    let dotcol = pixelCanvas.height - heightReminder;

    console.log("dotrow : " + dotrow + " , dotcol : " + dotcol);

    dotRowCount = dotrow;
    dotColumnCount = dotcol;

    setDotRowCountContainer(dotrow);
    setDotColumnCountContainer(dotcol);

    makeDotPanel(dotrow, dotcol, undefined);

    let i, j, index;
    let dotName;

    let history = new Array();

    let deltaRow = widthReminder/2;
    let deltaCol = heightReminder/2;

    for (i = 0; i < dotrow ; i++) {
      for(j = 0; j < dotcol; j ++) {

        dotName = "dot_" + i + "_" + j;

        let asset:any = assetGroup.getObjectByName(dotName);

        if(asset != undefined) {

          const data:any  = pixelContext.getImageData(i + deltaRow, j + deltaCol, 1, 1).data;

          let red = data[0];
          let green = data[1];
          let blue = data[2];
          let alpha = data[3];

          let colorStr = ConvertRGBtoHex(red, green, blue);

          switch(colorStr.toUpperCase()) {
            case "#FFCDD6" : colorStr = "#D3B2DB"; break;
            case "#C8E7D8" : colorStr = "#92CFC5"; break;
            case "#606060" : colorStr = "#666F6E"; break;
            default : break;
          }

          let color = new THREE.Color( colorStr );

          let colorId = 1;
          let pitch = 'C1';

          const colorData = dotColorMap.get(colorStr.toUpperCase());
          if(colorData != undefined) {
            colorId = colorData.id;
            pitch = colorData.pitch;
          }
          else {
            console.log("colorData undefined : colorStr : " + colorStr.toUpperCase() );
          }

          asset.children[0].material.color.set(color).convertSRGBToLinear();
          asset.children[0].userData.colorId = colorId;
          asset.children[0].userData.pitch = pitch;

          let dotData = {dotName: asset.name, dotColor: color.getHex(), colorId: colorId, pitch: pitch};
          history.push(dotData);
        }
      }
    }

    //changeHistory.push(changeData);
    changeHistory = history.sort(() => Math.random() - 0.5);

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

    var element = document.getElementById('dotartEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }


  const saveAssetToServer = (creationInfo) => {

    console.log("creation saveAssetToServer: ");

    var assetModel: any = {
          dotRowCount: dotRowCount,
          dotColumnCount: dotColumnCount,
          frameType: 1,
          frameColor: 0x000000,
          plateColor: plateColor.getHex(),
          baseDotColor: baseDotColor.getHex(),
          backgroundColor: backgroundColor.getHex(),
          instances:[]};


/*
    for (var i = assetGroup.children.length - 1; i >= 0; i--) {

      var childAsset:any = assetGroup.children[i];

      if(childAsset != undefined) {

        const instanceNode:any = {
          instanceName: childAsset.name,
          color : childAsset.children[0].material.color.getHex()
        };

        assetModel.instances.push(instanceNode);
      }
    }
*/
    // dot color 변경 이력중 중복된 dot에 대해서 최종이력을 적용하도록 함
    var changeMap = new Map<string, number>();
    for (var index = 0; index < changeHistory.length; index++) {
      var historyData:any = changeHistory[index];
      changeMap.set(historyData.dotName, index);
    }


    for (var i = 0; i < changeHistory.length; i++) {

      var colorData:any = changeHistory[i];

      // 중복이력 제거
      var indexObj = changeMap.get(colorData.dotName);
      if(index == undefined || i != indexObj)
        continue;

      var childAsset:any = assetGroup.getObjectByName( colorData.dotName );

      if(childAsset != undefined) {

        const instanceNode:any = {
          instanceName: childAsset.name,
          color : childAsset.children[0].material.color.clone().convertLinearToSRGB().getHex(),
          colorId : childAsset.children[0].userData.colorId,
          pitch : childAsset.children[0].userData.pitch
        };

        assetModel.instances.push(instanceNode);
      }
    }

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

    var element = document.getElementById('dotartEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentSettingBackground = (event) => {

    var mode = event.detail.mode;

    console.log('creation setting background mode : ', mode);

    if(mode) {
      scene.background = backgroundTexture;
      groundMaterial.opacity = 1;
    }
    else {
      scene.background = backgroundColor;
      //scene.background = new THREE.Color( 0x7eebed );
      groundMaterial.opacity = 0;
    }

  }


  const handleSaveAsImage = () => {

    console.log("handleSaveAsImage start")

    var event = new CustomEvent('save_image');

    var element = document.getElementById('dotartEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentSaveAsImage = (event) => {

      var imgData, imgNode;
      var strDownloadMime = "image/octet-stream";

      try {
          var strMime = "image/jpg";
          imgData = renderer.domElement.toDataURL(strMime);

          setVisibleSnapshotImageEditorConfirm(true);
          imageData.data = imgData;
          setImageData(imageData);
          //saveFile(imgData.replace(strMime, strDownloadMime), "sopoong.jpg");

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

    var element = document.getElementById('dotartEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentSaveAsThumbImage = (event) => {

      var imgData, imgNode;
      var strDownloadMime = "image/octet-stream";

      try {
          var strMime = "image/jpg";
          imgData = renderer.domElement.toDataURL(strMime);

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

    var element = document.getElementById('dotartEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentUploadPixelImage = (event) => {

      var imgData, imgNode;
      var strDownloadMime = "image/octet-stream";

      try {
          var strMime = "image/jpg";
          imgData = renderer.domElement.toDataURL(strMime);

          setVisiblePixelEditorConfirm(true);
          imageData.data = imgData;
          setImageData(imageData);

      } catch (e) {
          console.log(e);
          return;
      }

  }


  const onDocumentExportToStl = (event) => {

    try{

      var result = exporter.parse( assetGroup, { binary: true } );

      var blob = new Blob( [ result ], { type: 'application/octet-stream' } );
      var link = document.createElement('a');
      link.style.display = 'none';
      document.body.appendChild( link );
      link.href = URL.createObjectURL( blob );
      link.download = 'sopoong.stl';
      link.click();

    } catch (e) {
        console.log(e);
        return;
    }


  }

  const onDocumentExportToGltf = (event) => {

    try{

      const options = {
					trs: true,
					onlyVisible: true,
					truncateDrawRange: true,
					binary: true,
					maxTextureSize: 4096 || Infinity // To prevent NaN value
				};

      gltfExporter.parse( assetGroup, function ( result ) {

          var blob;
          var fileName;

					if ( result instanceof ArrayBuffer ) {
            blob = new Blob( [ result ], { type: 'application/octet-stream' } );
            fileName = 'sopoong.glb';
          }
          else {
            var output = JSON.stringify( result, null, 2 );
            blob = new Blob( [ output ], { type: 'text/plain' } );
            fileName = 'sopoong.gltf';
          }



        var link = document.createElement('a');
        link.style.display = 'none';
        document.body.appendChild( link );
        link.href = URL.createObjectURL( blob );
        link.download = fileName;
        link.click();
      }, options);


    } catch (e) {
        console.log(e);
        return;
    }


  }



  const handleExportToStl = () => {

    console.log("handleExportToStl start")

    var event = new CustomEvent('export_stl');

    var element = document.getElementById('dotartEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const handleExportToGltf = () => {

    console.log("handleExportToGltf start")

    var event = new CustomEvent('export_gltf');

    var element = document.getElementById('dotartEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }


  const handleSettingInfo = (antialias: boolean, pixelRatio: number, outline: boolean) => {

    console.log("handleSettingInfo start")

    var event = new CustomEvent('setting_info', { detail: {antialias: antialias, pixelRatio: pixelRatio, outline: outline} });

    var element = document.getElementById('dotartEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentSettingInfo = (event) => {

    var antialias = event.detail.antialias;
    var pixelRatio = event.detail.pixelRatio;
    outline = event.detail.outline;

    console.log("pixelRatio : " + pixelRatio);



    renderer.setPixelRatio( window.devicePixelRatio * pixelRatio );

    var canvasWidth = $('#dotartEditor_vrCanvas').width();
 		var canvasHeight = $('#dotartEditor_vrCanvas').height() ;

 		renderer.setSize( canvasWidth, canvasHeight );

    renderVr();
    //renderer.antialias = antialias;
  }


  const handleColorEditMode = (colorEditMode: string) => {

    console.log("handleSettingInfo start")

    var event = new CustomEvent('change_color_edit_mode', { detail: {colorEditMode: colorEditMode} });

    var element = document.getElementById('dotartEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentChangeColorEditMode = (event) => {

    colorEditMode = event.detail.colorEditMode;

  }



  const handleSaveCreation = () => {

    console.log("handleSaveCreation start");

    if(traceMode){

      Modal.info({
        title: '도트색 시뮬레이션중입니다.',
        content: '시뮬레이션을 중지하시고 저장해 주세요. ',
        okText: '확인',
        onOk() {},
      });

    }
    else{

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


  const getPitch = (color) => {

    let pitch = 'C1';

    color = color.toUpperCase();

    const colorData = colorDataList.find(data => data.color == color);

    if(colorData != undefined)
      pitch = colorData.pitch;


    return pitch;
  }



  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///                                             Gizmo  Start                                                     //
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const myGizmoRef = React.createRef<HTMLDivElement>()

  var gizmoScene = new THREE.Scene();

  //private camera = new THREE.PerspectiveCamera( 75, canvasWidth / canvasHeight, 1, 1100 );
  //var gizmoCamera = new THREE.PerspectiveCamera( 75, 10, 1, 11000 );
  //var gizmoRenderer = new THREE.WebGLRenderer();
  let gizmoCamera;
  let gizmoRenderer;
  let gizmoOrbitControl;
  var gizmoAssetGroup = new THREE.Group();

  let focusMaterial;
  let INTERSECTED;
  let gizmoTarget;

  var gizmoAnimationCount: number = 0;

  const initGizmoControls = () => {
    console.log("gizmo start")

    gizmoRenderer = new THREE.WebGLRenderer({antialias: true});

 		gizmoRenderer.setPixelRatio( window.devicePixelRatio );

 		var canvasWidth = $('#dotartEditor_vrGizmoCanvas').width();
 		var canvasHeight = $('#dotartEditor_vrGizmoCanvas').height() ;

 		gizmoRenderer.setSize( canvasWidth, canvasHeight );
    gizmoRenderer.shadowMap.enabled = true;
    gizmoRenderer.physicallyCorrectLights = true;
    gizmoRenderer.gammaFactor = 1.18;
    gizmoRenderer.outputEncoding = THREE.sRGBEncoding;



    gizmoCamera = new THREE.PerspectiveCamera( 30, canvasWidth / canvasHeight, 0.1, 1000 );
    //camera = new THREE.PerspectiveCamera( 75, 10, 1, 11000 );
    gizmoCamera.position.set( 25, 25, 25);
    //camera.lookAt( scene.position );
 		gizmoCamera.lookAt( 0,0, 0 );
 		gizmoCamera.updateMatrix();

    gizmoOrbitControl = new OrbitControls( gizmoCamera, gizmoRenderer.domElement );
    gizmoOrbitControl.target.set( 0, 0, 0 );
    gizmoOrbitControl.enablePan = false;
    gizmoOrbitControl.enableZoom = false;
    gizmoOrbitControl.update();
    gizmoOrbitControl.addEventListener( 'change', gizmoRenderVr );

    gizmoScene.add( gizmoAssetGroup );

    gizmoScene.background = new THREE.Color( 0xeeeeee );
    //scene.environment = new RoomEnvironment( renderer );

    var directLight = new THREE.DirectionalLight( 0xffffff );
      directLight.position.set( 1, 1, 1 ).normalize();
      gizmoScene.add(directLight);

 	    //////////////////////sky end /////////////////////////////////


    const htmlDivElement = myGizmoRef.current;
    if(htmlDivElement) {
     htmlDivElement.insertBefore(gizmoRenderer.domElement, htmlDivElement.firstChild);
    }

    gizmoAnimate();


    var sourceUrl = "./images/smartfarm/prefabs/env.fbx";

    var gridHelper: any = new THREE.GridHelper( 1000, 1000, 0x000000, 0x000000 );
    gridHelper.material.opacity = 0.1;
    gridHelper.material.depthWrite = false;
    gridHelper.material.transparent = true;
    //scene.add( gridHelper );


    let  groundTexture = textureLoader.load( './images/brickground/background/baseplate.png');

		groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
		groundTexture.repeat.set( 30, 30 );
		groundTexture.anisotropy = 16;
		groundTexture.encoding = THREE.sRGBEncoding;

    // let normalPath = groundPath.replace('.jpg', '_normal.jpg');
    // let normalTexture = textureLoader.load( normalPath);
    // normalTexture.wrapS = normalTexture.wrapT = THREE.RepeatWrapping;
		// normalTexture.repeat.set( 10, 10 );
    // normalTexture.anisotropy = 16;
		// normalTexture.encoding = THREE.sRGBEncoding;
    //
		// var groundMaterial = new THREE.MeshStandardMaterial( { map: groundTexture, normalMap: normalTexture } );
    var groundMaterial = new THREE.MeshStandardMaterial( { map: groundTexture } );

		var groundMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 50, 50 ), groundMaterial );
		//groundMesh.position.y = - 250;
    groundMesh.position.y = -0.4;
    groundMesh.position.z = 0;
		groundMesh.rotation.x = - Math.PI / 2;
		groundMesh.receiveShadow = true;
		//scene.add( groundMesh );

    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
	   gizmoScene.add( ambientLight );


    let  backgroundTexture = textureLoader.load( './images/brickground/background/default_background.jpg');

    //scene.background = backgroundTexture;


    // names.forEach((name, index) => {
    //
    //   const cube = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), new THREE.MeshBasicMaterial( {color: colors[index]} ) );
    //   cube.name = name;
    //   cube.position.set(positions[index][0], positions[index][1], positions[index][2]);
    //   cube.scale.set(scales[index][0], scales[index][1], scales[index][2]);
    //   scene.add(cube);
    //
    // });

    focusMaterial = new THREE.MeshPhysicalMaterial( { opacity: 1, transparent: true,  color: 0x00ffff} );

    var fbxLoader = new FBXLoader();
    fbxLoader.load( './images/brickground/models/gizmo.fbx', ( gizmoObject:any ) => {
                                                                                  gizmoTarget = gizmoObject;
                                                                                  gizmoTarget.position.set(0,0,0);
                                                                                  gizmoTarget.scale.set(1.1, 1.1, 1.1);
                                                                                  gizmoAssetGroup.add(gizmoObject);
                                                                                });

    $('#dotartEditor_vrGizmoCanvas').on("mousemove", onDocumentGizmoMouseMove);
    $('#dotartEditor_vrGizmoCanvas').on("mouseup", onDocumentGizmoMouseUp);

 	}

  const gizmoRenderVr = (event) => {

    gizmoCamera.lookAt( gizmoTarget.position.x, gizmoTarget.position.y, gizmoTarget.position.z );
    //gizmoTarget.position.set(0, 0, 0);
    gizmoOrbitControl.target.set(gizmoTarget.position.x, gizmoTarget.position.y, gizmoTarget.position.z);

		gizmoRenderer.render( gizmoScene, gizmoCamera );


    if(camera != undefined){
      camera.position.x = gizmoCamera.position.x;
      camera.position.y = gizmoCamera.position.y;
      camera.position.z = gizmoCamera.position.z;
      camera.lookAt(gizmoTarget.position.x, gizmoTarget.position.y, gizmoTarget.position.z);
    }


    // if(camera != undefined){
    //   camera.rotation.x = gizmoCamera.rotation.x;
    //   camera.rotation.y = gizmoCamera.rotation.y;
    //   camera.rotation.z = gizmoCamera.rotation.z;
    //
    //   camera.position.x = gizmoCamera.position.x;
    //   camera.position.y = gizmoCamera.position.y;
    //   camera.position.z = gizmoCamera.position.z;
    // }

	}

  const gizmoAnimate = () => {
		window.requestAnimationFrame( gizmoAnimate );
		//orbitControl.update();

    gizmoAnimationCount ++

    if(gizmoAnimationCount > 5) {
	    gizmoRenderer.render( gizmoScene, gizmoCamera );
      gizmoAnimationCount = 0;
    }
	}

  const onDocumentGizmoMouseMove = (event) => {
    console.log('creationEditor onDocumentGizmoMouseMove start');

    console.log("gizmo move button : " + event.button);

    var rect = gizmoRenderer.domElement.getBoundingClientRect();

    var mouse = new THREE.Vector2();

    mouse.x =((( event.clientX - rect.left ) / rect.width) * 2) - 1;
    mouse.y =  -((( event.clientY - rect.top ) / rect.height) * 2) + 1;

    var raycaster = new THREE.Raycaster();

    raycaster.setFromCamera(mouse, gizmoCamera);

    var intersects = raycaster.intersectObjects(gizmoAssetGroup.children, true);

    if (intersects.length > 0) {

      if( intersects[0].object == undefined || intersects[0].object.parent == undefined)
        return;

      var assetName = intersects[0].object.name;

      if(assetName == undefined)
        return;

      var focusAsset = gizmoScene.getObjectByName( assetName );

      if( INTERSECTED != undefined ) {
        if(INTERSECTED != focusAsset) {

          INTERSECTED.material = INTERSECTED.currentMaterial;

					INTERSECTED = focusAsset;
					INTERSECTED.currentMaterial = INTERSECTED.material;
					INTERSECTED.material = focusMaterial;
        }
			}
      else {
        INTERSECTED = focusAsset;
        INTERSECTED.currentMaterial = INTERSECTED.material;
        INTERSECTED.material = focusMaterial;
      }

    }
    else {

      if ( INTERSECTED != undefined ) {
        INTERSECTED.material = INTERSECTED.currentMaterial;
			  INTERSECTED = undefined;
      }
    }

  }


  const onDocumentGizmoMouseUp = (event) => {

    console.log( 'creationEditor onDocumentGizmoMouseUp start' );

    if( event.button != 0)
      return;

    var rect = gizmoRenderer.domElement.getBoundingClientRect();

    var mouse = new THREE.Vector2();

    mouse.x =((( event.clientX - rect.left ) / rect.width) * 2) - 1;
    mouse.y =  -((( event.clientY - rect.top ) / rect.height) * 2) + 1;

    var raycaster = new THREE.Raycaster();

    raycaster.setFromCamera(mouse, gizmoCamera);

    var intersects = raycaster.intersectObjects(gizmoAssetGroup.children, true);


    if (intersects.length > 0) {

      if( intersects[0].object == undefined || intersects[0].object.parent == undefined)
        return;

      var name = intersects[0].object.name;


      console.log("click .........." + name);

      gizmoCamera.position.x = gizmoTarget.position.x;
      gizmoCamera.position.y = gizmoTarget.position.y;
      gizmoCamera.position.z = gizmoTarget.position.z;
      gizmoTarget.scale.set(1.1, 1.1, 1.1);

      if(name == 'FrontMiddleMiddle') {
        gizmoCamera.position.z += 40;
      }
      else if(name == 'BackMiddleMiddle') {
        gizmoCamera.position.z += -40;
      }
      else if(name == 'MiddleTopMiddle') {
        gizmoCamera.position.y += 40;
      }
      else if(name == 'MiddleBottomMiddle') {
        gizmoCamera.position.y += -40;
      }
      else if(name == 'MiddleMiddleLeft') {
        gizmoCamera.position.x += -40;
      }
      else if(name == 'MiddleMiddleRight') {
        gizmoCamera.position.x += 40;
      }
      else if(name == 'FrontTopLeft') {
        gizmoCamera.position.x += -25;
        gizmoCamera.position.y += 25;
        gizmoCamera.position.z += 25;
      }
      else if(name == 'FrontTopMiddle') {
        gizmoCamera.position.x += 0;
        gizmoCamera.position.y += 30;
        gizmoCamera.position.z += 30;
      }
      else if(name == 'FrontTopRight') {
        gizmoCamera.position.x += 25;
        gizmoCamera.position.y += 25;
        gizmoCamera.position.z += 25;
      }
      else if(name == 'FrontMiddleLeft') {
        gizmoCamera.position.x += -30;
        gizmoCamera.position.y += 0;
        gizmoCamera.position.z += 30;
      }
      else if(name == 'FrontMiddleRight') {
        gizmoCamera.position.x += 30;
        gizmoCamera.position.y += 0;
        gizmoCamera.position.z += 30;
      }
      else if(name == 'FrontBottomLeft') {
        gizmoCamera.position.x += -25;
        gizmoCamera.position.y += -25;
        gizmoCamera.position.z += 25;
      }
      else if(name == 'FrontBottomMiddle') {
        gizmoCamera.position.x += 0;
        gizmoCamera.position.y += -30;
        gizmoCamera.position.z += 30;
      }
      else if(name == 'FrontBottomRight') {
        gizmoCamera.position.x += 25;
        gizmoCamera.position.y += -25;
        gizmoCamera.position.z += 25;
      }
      else if(name == 'MiddleTopLeft') {
        gizmoCamera.position.x += -30;
        gizmoCamera.position.y += 30;
        gizmoCamera.position.z += 0;
      }
      else if(name == 'MiddleTopRight') {
        gizmoCamera.position.x += 30;
        gizmoCamera.position.y += 30;
        gizmoCamera.position.z += 0;
      }
      else if(name == 'MiddleBottomLeft') {
        gizmoCamera.position.x += 30;
        gizmoCamera.position.y += -30;
        gizmoCamera.position.z += 0;
      }
      else if(name == 'MiddleBottomRight') {
        gizmoCamera.position.x += -30;
        gizmoCamera.position.y += -30;
        gizmoCamera.position.z += 0;
      }
      else if(name == 'BackTopLeft') {
        gizmoCamera.position.x += -25;
        gizmoCamera.position.y += 25;
        gizmoCamera.position.z += -25;
      }
      else if(name == 'BackTopMiddle') {
        gizmoCamera.position.x += 0;
        gizmoCamera.position.y += 30;
        gizmoCamera.position.z += -30;
      }
      else if(name == 'BackTopRight') {
        gizmoCamera.position.x += 25;
        gizmoCamera.position.y += 25;
        gizmoCamera.position.z += -25;
      }
      else if(name == 'BackMiddleLeft') {
        gizmoCamera.position.x += -30;
        gizmoCamera.position.y += 0;
        gizmoCamera.position.z += -30;
      }
      else if(name == 'BackMiddleRight') {
        gizmoCamera.position.x += 30;
        gizmoCamera.position.y += 0;
        gizmoCamera.position.z += -30;
      }
      else if(name == 'BackBottomLeft') {
        gizmoCamera.position.x += -25;
        gizmoCamera.position.y += -25;
        gizmoCamera.position.z += -25;
      }
      else if(name == 'BackBottomMiddle') {
        gizmoCamera.position.x += 0;
        gizmoCamera.position.y += -30;
        gizmoCamera.position.z += -30;
      }
      else if(name == 'BackBottomRight') {
        gizmoCamera.position.x += 25;
        gizmoCamera.position.y += -25;
        gizmoCamera.position.z += -25;
      }

      gizmoCamera.lookAt( gizmoTarget.position.x, gizmoTarget.position.y, gizmoTarget.position.z );
      //gizmoTarget.position.set(0, 0, 0);
      gizmoOrbitControl.target.set(gizmoTarget.position.x, gizmoTarget.position.y, gizmoTarget.position.z);



      if(camera != undefined){

        camera.position.x = gizmoCamera.position.x * scaleRatio;
        camera.position.y = gizmoCamera.position.y * scaleRatio;
        camera.position.z = gizmoCamera.position.z * scaleRatio;
        camera.lookAt(gizmoTarget.position.x, gizmoTarget.position.y, gizmoTarget.position.z);
      }

    }

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///                                             Gizmo  End                                                    //
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const getCanvase = () => {

    return (<div ref={dotartEditorRef} id="dotartEditor_vrCanvas" style={{height:'100vh'}}>
                <div ref={myGizmoRef} id="dotartEditor_vrGizmoCanvas" style={{position: 'absolute', height:'100px', width:'100px', opacity: 1 }}>
                </div>
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
                    <DotArtEditorListPanel
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
                                        traceMode={traceMode}
                                        musicMode={musicModeContainer}
                                        dotRowCountContainer={dotRowCountContainer}
                                        dotColumnCountContainer={dotColumnCountContainer}
                                        dotColorContainer={dotColorContainer}
                                        dotColorIdContainer={dotColorIdContainer}
                                        onCreationName={(name) => setCreationName(name)}
                                        onCategoryId={(id) => setCategoryId(id)}
                                        onSubjectId={(id) => setSubjectId(id)}
                                        onSizeId={(id) => setSizeId(id)}
                                        onVisible={(value) => setVisible(value)}
                                        onUploadPixelImage={handleUploadPixelImage}
                                        onBaseColor={handleBaseColor}
                                        onBaseDotColor={handleBaseDotColor}
                                        onBaseDotModel={handleBaseDotModel}
                                        onDotColor={handleDotColor}
                                        onDotCount={handleDotCount}
                                        onSaveCreation={handleSaveCreation}
                                        onTraceColor={handleTraceColor}
                                        onMusicPlay={handleMusicPlay}
                                        onSaveAsImage={handleSaveAsImage}
                                        onSaveAsThumbImage={handleSaveAsThumbImage}
                                        onSettingInfo={handleSettingInfo}
                                        onExportToStl={handleExportToStl}
                                        onExportToGltf={handleExportToGltf}
                                        onColorEditMode={handleColorEditMode}
                    > </DotArtEditorListPanel>
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

                <PixelEditorDialog
                    visibleImageEditorConfirm={visiblePixelEditorConfirm}
                    imageData={imageData}
                    aspectRatio={1}
                    onPixelCanvas={handlePixelCanvas}
                    onImageEditorConfirm={(value)=>{setVisiblePixelEditorConfirm(value)}}
                  />

              </Row>

      );



};
