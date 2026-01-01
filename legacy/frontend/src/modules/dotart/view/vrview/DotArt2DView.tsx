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

import GifPlayer from "react-gif-player";

import { InfoModal, SnapshotImageEditorDialog } from 'components';
import { SOPOONG_URL, SHOP_URL, SHOP_ID, storageService } from 'common';

import { DotArtPropertyPanel, DotArtListPanel, BlockImageDialog } from '.';

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

export const DotArt2DView = (props) => {

  const [creation, setCreation] = useState<any>({});

  const [vrModelList, setVrModelList] = useState<any[]>([]);
  const [vrAssetsContainer, setVrAssetsContainer ] = useState<any[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<THREE.Object3D>(targetAsset);
  const [productList, setProductList] = useState<any[]>([]);
  const [assetGroup, setAssetGroup] = useState<THREE.Group>(new THREE.Group());
  const [selectedMaterial, setSelectedMaterial] = useState<any>({key:'default', color: 0xffffff });
  const [vrMaterialMap, setVrMaterialMap] = useState<any>(new Map());

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
          {id:71, title:'Black Gray', color:'#404040', pitch: 'C1'}, // 171616
          {id:72, title:'Black', color:'#000000', pitch: 'C1'},

          {id:73, title:'Gray White', color:'#82826C', pitch: 'C1'},
          {id:74, title:'Light Gray', color:'#757877', pitch: 'C1'},
          {id:75, title:'Medium Gray', color:'#4E5350', pitch: 'C1'},
          {id:76, title:'Gray Blue', color:'#454E64', pitch: 'C1'},
          {id:77, title:'Dark Gray', color:'#606060', pitch: 'C1'} // 26282A
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


  //var scene = new THREE.Scene();
  //var renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});

  //const [rendererContainer, setRendererContainer] = useState<THREE.WebGLRenderer>(renderer)
  //const [orbitControlContainer, setOrbitControlContainer] = useState<OrbitControls>(new OrbitControls(new THREE.PerspectiveCamera( 45, 1280 / 1024, 1, 1000 ),  renderer.domElement));

  let scene;
  let renderer;

  const [rendererContainer, setRendererContainer] = useState<any>({})
  const [orbitControlContainer, setOrbitControlContainer] = useState<any>({});

  let vrAssets;

  const myRef = React.createRef<HTMLDivElement>()

  //let scene;
  //private camera = new THREE.PerspectiveCamera( 75, canvasWidth / canvasHeight, 1, 1100 );
  let camera;
  //let renderer;


  let orbitControl;
  let transformControl;
  let textureLoader;
  //let selectedMaterial;
  let fbxLoader;
  let gltfLoader ;

  let glassMaterial;
  let focusMaterial;
  let displayMaterial;
  let hideMaterial;

  let INTERSECTED;

  var axis = new THREE.Vector3( 0, 1, 0 ).normalize();
  var clock = new THREE.Clock();

  //var assetGroup = new THREE.Group();
  var selectedAssetId: number = 0;
  var targetAsset: any ;

  let animationCount: number = 0;

  var mixerArray: THREE.AnimationMixer[] = [];
  var linkArray: THREE.Mesh[] = [];
  var vrModelMap = new Map();
  //var vrMaterialMap = new Map();

  let plateObject;
  let plateColor;
  let baseDotColor;
  let baseDotModelMap;

  let dotObject;

  let changeHistory = new Array();
  let changeIndex = -1;

  let musicMode = false;

  const synth = new Tone.Synth().toDestination();

  let creationName = "도트아트";
  let dotRowCount = 0;
  let dotColumnCount = 0;

  let blockVisible = false;

  /*
    useEffect(() => {

      console.log('vrMallView useEffect start..');

      $('#MainHeader').hide();
      $('#MainFooter').hide();

      initVrControls();
      initVrModels();

      window.addEventListener( 'resize',onWindowResize, false );
      onWindowResize();

    }, []);
  */

  useEffect(() => {

    $('#MainHeader').hide();
    $('#MainFooter').hide();

    initVrControls();

    getProductsData();
    getCreationDotArtData();

    window.addEventListener( 'resize',onWindowResize, false );
    window.addEventListener( 'orientationchange',onOrientationChange, false );

    return () => {

      $('#MainHeader').show();
      $('#MainFooter').show();

      clearVrObject();
      clearPlayObject();
    }

  }, [props.match.params.creationId]);


  const getCreationDotArtData = () => {

    console.log('creationId : ', props.match.params.creationId);

    let url = SOPOONG_URL + SHOP_URL + '/creationAsset.do?creationId=' + props.match.params.creationId;

    fetch( url )
      .then(response => response.json())
      .then(data=> {
                      console.log(data);

                      initEnvironment(data.cameraPosition, data.cameraTarget, data.backgroundPath, data.groundPath);

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

                    })
      .catch(err => {console.log(err); $("#view_dotart_loading").hide();});

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


  const setVrAssets = (vrAssetList) => {
    vrAssets = vrAssetList;
  }



  // VR 초기화
  const initVrControls = () => {


 		var canvasWidth = $('#dotartView_vrCanvas').width();
 		var canvasHeight = $('#dotartView_vrCanvas').height() ;

    setVrAssetsContainer([]);
    setSelectedAsset(targetAsset);
    setProductList([]);
    setAssetGroup(new THREE.Group());
    setSelectedMaterial({key:'default', color: 0xffffff });
    setVrMaterialMap(new Map());

    const htmlDivElement = myRef.current;
    if(htmlDivElement) {
      let canvasNodes = document.getElementsByTagName("canvas");

      for( var i = 0; i < canvasNodes.length; i++ ) {
        var canvas = canvasNodes.item(i);

        if(canvas != null)
          htmlDivElement.removeChild(canvas);
      }
    }

    renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true, antialias: true});
    //renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
    scene = new THREE.Scene();

 		renderer.setPixelRatio( window.devicePixelRatio );
 		renderer.setSize( canvasWidth, canvasHeight );
    renderer.shadowMap.enabled = true;
    renderer.physicallyCorrectLights = true;
    renderer.gammaFactor = 1.18;
    renderer.outputEncoding = THREE.sRGBEncoding;

    setRendererContainer(renderer);

    camera = new THREE.PerspectiveCamera( 30, canvasWidth / canvasHeight, 0.1, 1000 );
    //camera = new THREE.PerspectiveCamera( 75, 10, 1, 11000 );
    camera.position.set( 0, 10, 30);
    //camera.lookAt( scene.position );
 		camera.lookAt( 0,0, 0 );
 		camera.updateMatrix();


    orbitControl = new OrbitControls( camera, renderer.domElement );
    orbitControl.target.set( 0, 0, 0 );
    orbitControl.maxDistance = 500;
    orbitControl.autoRotate = false;
    orbitControl.update();
    orbitControl.addEventListener( 'change', renderVr );

    var filter = "win16|win32|win64|mac|macintel";
    if(navigator.platform) {
      if(filter.indexOf(navigator.platform.toLowerCase()) < 0)
        orbitControl.rotateSpeed = 0.5;
    }

    setOrbitControlContainer(orbitControl);

    transformControl = new TransformControls( camera, renderer.domElement );
		transformControl.addEventListener( 'change', renderVr );
		transformControl.addEventListener( 'dragging-changed', function ( event ) {
			orbitControl.enabled = ! event.value;
		} );
    transformControl.setSpace( "local");

		scene.add( transformControl );


 		scene.add( assetGroup );


    var sunLight = new THREE.AmbientLight( 0x404040, 2 );
    //scene.add( sunLight );
    scene.environment = new RoomEnvironment( renderer );

    // var directLight = new THREE.DirectionalLight( 0xffffff );
    // directLight.position.set( 1, 1, 1 ).normalize();
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

    //const htmlDivElement = myRef.current;
    if(htmlDivElement) {
      htmlDivElement.insertBefore(renderer.domElement, htmlDivElement.firstChild);
    }

    animate();

    //selectedMaterial = {key:'default', color: 0xffffff };

    textureLoader = new THREE.TextureLoader();

    fbxLoader = new FBXLoader();
    gltfLoader = new GLTFLoader();

    var gridHelper: any = new THREE.GridHelper( 1000, 1000, 0x000000, 0x000000 );
    gridHelper.material.opacity = 0.1;
    gridHelper.material.depthWrite = false;
    gridHelper.material.transparent = true;
    //scene.add( gridHelper );

    $('#dotartView_vrCanvas').on("trace_color", onDocumentTraceColor);
    $('#dotartView_vrCanvas').on("music_play", onDocumentMusicPlay);
    $('#dotartView_vrCanvas').on("display_color_id", onDocumentDisplayColorId);
    $('#dotartView_vrCanvas').on("change_base_dot_model", onDocumentChangeBaseDotModel);
    $('#dotartView_vrCanvas').on("save_block", onDocumentSaveAsBlock);
    $('#dotartView_vrCanvas').on("display_asset", onDocumentDisplayAsset);
    $('#dotartView_vrCanvas').on("assembly_asset", onDocumentAssemblyAsset);

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
    var groundMaterial = new THREE.MeshStandardMaterial( { map: groundTexture } );

		var groundMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 50, 50 ), groundMaterial );
		//groundMesh.position.y = - 250;
    groundMesh.position.y = -0.4;
    groundMesh.position.z = 0;
		groundMesh.rotation.x = - Math.PI / 2;
		groundMesh.receiveShadow = true;
		//scene.add( groundMesh );

    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
	   scene.add( ambientLight );


    let  backgroundTexture;
    if(backgroundPath != undefined)
      backgroundTexture = textureLoader.load( backgroundPath);
    else
      backgroundTexture = textureLoader.load( './images/brickground/background/default_background.jpg');
    scene.background = backgroundTexture;

  }


  const makeDotPanel = (dotrow, dotcol, vrModels) => {

   let i = 0;
   let j = 0;

   let platerow = dotrow/16;
   let platecol = dotcol/16;


   if(dotrow > dotcol)
     camera.position.set( 0, dotrow * 1.5 , dotrow);
   else
     camera.position.set( 0, dotcol * 1.5, dotcol);


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

           let blockAsset = plateAsset.clone();
           blockAsset.position.y += 1;
           blockAsset.name = "block_" + i + "_" + j;
           blockAsset.children[0].material = plateAsset.children[0].material.clone();
           blockAsset.children[0].material.format = THREE.RGBAFormat;
           blockAsset.children[0].material.transparent = true;
           blockAsset.children[0].material.opacity = 0.7;
           blockAsset.visible = false;

           if(i % 2 == 0) {
             if(j % 2 == 0 )
               blockAsset.children[0].material.color.copySRGBToLinear(new THREE.Color("#D9D9D6"));
             else
               blockAsset.children[0].material.color.copySRGBToLinear(new THREE.Color("#BABBB1"));
           }
           else {
             if(j % 2 == 0 )
               blockAsset.children[0].material.color.copySRGBToLinear(new THREE.Color("#BABBB1"));
             else
              blockAsset.children[0].material.color.copySRGBToLinear(new THREE.Color("#D9D9D6"));
           }

           let blockLabel = "" + (j + 1) + "-" + (i + 1);
           let blockIdObject = new THREE.Object3D();
           let blockIdText = new SpriteText2D(blockLabel , { align: textAlign.center,  font: '20px Arial', fillStyle: '#000000' });
           blockIdText.position.set(0, 0.01, 0);
           blockIdText.scale.set(0.001, 0.001, 0.001);
           blockIdObject.add(blockIdText);
           //blockIdObject.visible = false;
           blockAsset.add(blockIdObject);


           assetGroup.add(blockAsset);
         }
       }

       if(vrModels != undefined && vrModels.plateColor != undefined) {
         plateColor = new THREE.Color(vrModels.plateColor);
         changeBaseColor(plateColor, 'base');
       }

     });

     // Dot Model Loading
     gltfLoader.load( './images/brickground/models/41314/4159553.glb', function ( object:any ) {

       object.scene.traverse( function ( child ) {
         if ( child.isMesh ) {
           child.castShadow = true;
           child.receiveShadow = true;
           child.material.color.copySRGBToLinear(new THREE.Color("#F4F4F4"));

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
           child.material.color.copySRGBToLinear(new THREE.Color("#FEFEFE"));
           baseDotColor = child.material.color;

           if(baseDotModelMap == undefined)
             baseDotModelMap = new Map();

           baseDotModelMap.set(4161734, object.scene.clone());
         }
       } );

       object.scene.scale.set(100, 100, 100);
       dotObject = object.scene;

       const geometry:any = new THREE.CylinderGeometry( 0.4, 0.4, 0.8, 32 );
       const material:any = new THREE.MeshBasicMaterial( {color: 0xffff00} );
       const cylinder:any = new THREE.Mesh( geometry, material );
       const tempObject:any = new THREE.Group();
       tempObject.add(cylinder);


       for (i = 0; i < dotrow ; i++) {
         for(j = 0; j < dotcol; j ++) {
           //let dotAsset = object.scene.clone();
           let dotAsset = tempObject.clone();
           dotAsset.position.set((i - (dotrow - 1)/2) * 0.8, 0.32, (j - (dotcol - 1)/2) * 0.8);
           dotAsset.name = "dot_" + i + "_" + j;

           //dotAsset.children[0].material = object.scene.children[0].material.clone();
           dotAsset.children[0].material = material.clone();
           dotAsset.children[0].userData.color = 0xfefefe;
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

             changeHistory.push({dotName: instance.instanceName, dotColor: instance.color, colorId: instance.colorId, pitch : instance.pitch});

             let asset:any = assetGroup.getObjectByName(instance.instanceName);

             if(asset != undefined) {
               asset.children[0].material.color.set(instance.color).convertSRGBToLinear();
               asset.children[0].userData.color = instance.color;
               if(instance.colorId == 0)
                  asset.children[0].userData.colorId = 1;
               else
                  asset.children[0].userData.colorId = instance.colorId;
               asset.children[0].userData.pitch = instance.pitch;
             }

           });
         }

         let colorIdList = new Array();

         for (var index = assetGroup.children.length - 1; index >= 0; index--) {
           var childAsset:any = assetGroup.children[index];

           const name = childAsset.name.substring(0, childAsset.name.indexOf('_'));

           if(name == 'dot') {
             //console.log("name : " + childAsset.name + " , colorId : " + childAsset.children[0].userData.colorId);
             colorIdList.push(childAsset.children[0].userData.colorId);
           }

         }

         setDotColorIdList(colorIdList);


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

          setDotColorIdList(colorIdList);
         }


       }

       $("#view_dotart_loading").hide();
     });
   }

 }


 const setDotArtObject = (vrModels) => {

   if(vrModels == null)
     return;

   makeDotPanel(vrModels.dotRowCount, vrModels.dotColumnCount, vrModels);

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
    vrModelMap.clear();
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

    orbitControl.autoRotate = false;

		var canvasWidth = $('#dotartView_vrCanvas').width();
		var canvasHeight = $('#dotartView_vrCanvas').height();
    // var canvasWidth = window.innerWidth;
		// var canvasHeight = window.innerHeight;

		//camera.aspect = window.innerWidth / window.innerHeight;
		camera.aspect = canvasWidth / canvasHeight;
		camera.updateProjectionMatrix();

		//renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setSize( canvasWidth, canvasHeight );

		//renderVr();
	}

  const onOrientationChange = () => {

    var filter = "win16|win32|win64|mac|macintel";
    if(navigator.platform) {
      if(filter.indexOf(navigator.platform.toLowerCase()) < 0) {
        if (window.orientation == 0)
          $('#dotartView_vrCanvas').css('height', '70vh');
        else
          $('#dotartView_vrCanvas').css('height', '100vh');
      }
    }

	}


  const renderVr = () => {

		renderer.render( scene, camera );

	}

  const animate = () => {
		window.requestAnimationFrame( animate );
		//orbitControl.update();

    orbitControl.update();


    animationCount ++

    if(animationCount > 5) {

        renderer.render( scene, camera );

        animationCount = 0;
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
          asset.children[0].material.color.set(colorData.dotColor).convertSRGBToLinear();

          if(musicMode)
            synth.triggerAttackRelease(getPitch(asset.children[0].material.color.clone().convertLinearToSRGB().getHexString()), "8n");
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

    var element = document.getElementById('dotartView_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }


  const handleMusicPlay = (mode) => {
    console.log("creation handleMusicPlay: ");

    setTraceMode(mode);

    var event = new CustomEvent('music_play', {detail: {musicMode:mode} });

    var element = document.getElementById('dotartView_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentMusicPlay = (event) => {

    musicMode = event.detail.musicMode;
    setMusicModeContainer(event.detail.musicMode);

  }


  const handleDisplayColorId = (mode) => {
    console.log("creation handleDisplayColorId: ");

    var event = new CustomEvent('display_color_id', {detail: {displayMode:mode} });

    var element = document.getElementById('dotartView_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentDisplayColorId = (event) => {


    for (var index = assetGroup.children.length - 1; index >= 0; index--) {
      var childAsset:any = assetGroup.children[index];

      const name = childAsset.name.substring(0, childAsset.name.indexOf('_'));

      if(name != 'base') {

        if(childAsset.children[0].userData.colorIdObject == undefined) {

          let colorIdObject = new THREE.Object3D();
          let colorIdText = new SpriteText2D(childAsset.children[0].userData.colorId.toString(), { align: textAlign.center,  font: '20px Arial', fillStyle: '#ffffff' });
          colorIdText.position.set(0, 0.006, 0);
          colorIdText.scale.set(0.0001, 0.0001, 0.0001);
          colorIdObject.add(colorIdText);
          colorIdObject.visible = false;
          childAsset.add(colorIdObject);
          childAsset.children[0].userData.colorIdObject = colorIdObject;
        }

        if(event.detail.displayMode)
          childAsset.children[0].userData.colorIdObject.visible = true;
        else
          childAsset.children[0].userData.colorIdObject.visible = false;
      }
    }
  }


  const handleBaseDotModel = (baseModel) => {

    var event = new CustomEvent('change_base_dot_model', { detail: {baseModel: baseModel} });

    var element = document.getElementById('dotartView_vrCanvas');
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



  const handleDisplayAsset = (selectedModel: any, checked: boolean) => {
          // antd에서 타입을 any로 해놔서 일단, any로 받음. 나머지 로직에서 타입 체크를 차라리 제대로 하자.
    console.log(`creation handleDisplayAsset: ${selectedModel}`, 'checked: ', checked);

    var event = new CustomEvent('display_asset', { detail: {selectedModel: selectedModel, checked: checked} });

    var element = document.getElementById('dotartView_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

/*
  const onDocumentDisplayAsset = (event) => {
    var selectedModel = event.detail.selectedModel;
    var checked = event.detail.checked;

    console.log(`vrMart onDocumentDisplayAsset: ${selectedModel}`, 'checked: ', checked);

    if(selectedMaterial.key != 'default') {
      var material = vrMaterialMap.get(selectedMaterial.key)
      if(material != undefined){
        material.color.setHex(selectedMaterial.color)
      }
    }

    var vrMaterial = vrMaterialMap.get(selectedModel.key)

    if(vrMaterial == undefined)
      return;

    selectedMaterial.key = selectedModel.key;
    selectedMaterial.color = vrMaterial.color.getHex();

    setSelectedMaterial(selectedMaterial);

    vrMaterial.color.setHex(0xffff00);

  }
*/

  const onDocumentDisplayAsset = (event) => {
    var selectedModel = event.detail.selectedModel;
    var checked = event.detail.checked;

    console.log(`creation onDocumentDisplayAsset: ${selectedModel}`, 'checked: ', checked);

    for (var i = assetGroup.children.length - 1; i >= 0; i--) {

      var childAsset:any = assetGroup.children[i];


      if(childAsset.children[0].isMesh) {

        if(childAsset.children[0].currentMaterial == undefined) {
          childAsset.children[0].currentMaterial = childAsset.children[0].material;
        }
        else {
          childAsset.children[0].material = childAsset.children[0].currentMaterial;
        }

        childAsset.children[0].material = glassMaterial;

        if(selectedModel.key == undefined) {
          childAsset.children[0].material = childAsset.children[0].currentMaterial;
          continue;
        }

        if(childAsset.name.indexOf(selectedModel.key) > -1)
            childAsset.children[0].material = displayMaterial;

      }

    }

  }



  const handleAssemblyAsset = (step: number) => {
    console.log('creation handleAssemblyAsset step : ', step);

    var event = new CustomEvent('assembly_asset', { detail: {step: step} });

    var element = document.getElementById('dotartView_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);
  }

  const onDocumentAssemblyAsset = (event) => {

    var step = event.detail.step;

    console.log('creation assembleyAsset step : ', step);

    for (var i = assetGroup.children.length - 1; i >= 0; i--) {

      var childAsset:any = assetGroup.children[i];

      if(childAsset.name.indexOf('_click') > -1)
        continue;

      if(childAsset.children[0].currentMaterial == undefined)
        childAsset.children[0].currentMaterial = childAsset.children[0].material;

      const vrModelName = childAsset.name.substring(0, childAsset.name.lastIndexOf('_'));
      var assetModel = vrAssets.find(element => element.vrModelName == vrModelName);

      if(assetModel == undefined || assetModel.instances == undefined)
        continue;


      var assetInstance = assetModel.instances.find(element => element.instanceName == childAsset.name);

      if(assetInstance != undefined) {

        if(assetInstance.assemblyLevel != undefined) {

          if(Number.parseInt(assetInstance.assemblyLevel) < step) {
            childAsset.children[0].material = childAsset.children[0].currentMaterial;
            //childAsset.visible = true;
          }
          else if(Number.parseInt(assetInstance.assemblyLevel) == step) {
            childAsset.children[0].material = displayMaterial;
            //childAsset.visible = true;
          }

          else{
            //childAsset.visible = false;
            childAsset.children[0].material = hideMaterial;
          }

        }
        else {
          //childAsset.visible = true;
          childAsset.children[0].material = childAsset.children[0].material;
        }

      }
    }
  }


  const handleZoomInOut = (value) => {

    //console.log('zoom value : ' + value);

    if(value < 0)
      orbitControlContainer.zoomOut();
    else if(value > 0)
      orbitControlContainer.zoomIn();

  }

  const handleAutoRotate = () => {

        orbitControlContainer.autoRotate = !orbitControlContainer.autoRotate;
  }


  const handleSaveAsImage = () => {
      var imgData, imgNode;
      var strDownloadMime = "image/octet-stream";

      try {
          var strMime = "image/jpeg";
          imgData = rendererContainer.domElement.toDataURL(strMime);

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


  const handleSaveAsBlock = () => {

    console.log('handleSaveAsBlock start ');

    var event = new CustomEvent('save_block');

    var element = document.getElementById('dotartView_vrCanvas');
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

    var canvas = document.createElement('canvas');
    canvas.width  = 680;
    canvas.height = 720;

    var w = 40;


    var ctx:any = canvas.getContext("2d");
    ctx.moveTo(200, 24);
    ctx.font = '20pt Calibri';
    ctx.textAlign = 'left';
    ctx.fillText(title , 200, 30);

    for (let i = startRowIndex; i < endRowIndex ; i++) {
      for(let j = startColumnIndex; j < endColumnIndex; j ++) {

        let dotName = "dot_" + i + "_" + j;

        var asset: any = assetGroup.getObjectByName( dotName );

        if (asset != undefined) {
          let name = asset.name.split('_');
          let x = 40 + (parseInt(name[1]) - startRowIndex) * 40  ;
          let y = 80 + (parseInt(name[2]) - startColumnIndex) * 40;

          let colorId = asset.children[0].userData.colorId;

          let colorStr = "#FFFFFF";
          //let colorData = colorDataList[colorId - 1];
          let colorData = colorDataList.find(element => element.id == colorId)
          if(colorData != undefined)
            colorStr = colorData.color;

          //console.log('x : ' + x + ', y : ' + y + ' color : ' + colorStr + ', colorId : ' + colorId + ' , dotName : ' + dotName);

          ctx = canvas.getContext("2d");
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.fillStyle = colorStr;
          ctx.arc(x, y, w/2, 0, 2 * Math.PI, false);
          //if(colorId == 1)
            ctx.stroke();
          ctx.fill();

          //ctx = canvas.getContext("2d");
          ctx.font = '16pt Calibri';
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
                    ctx.fillStyle = 'black'; break;
            default:
                    ctx.fillStyle = 'white'; break;
          }


          ctx.textAlign = 'center';
          ctx.fillText('' + colorId + '' , x, y+6);
          //ctx.fillText('1' , x, y+3);

        }
      }
    }

    var imageData = canvas.toDataURL("image/jpg");


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

    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "block";
    checkbox.id = "cbid";
    checkbox.style.position = "absolute";
    checkbox.style.left = "20px"
    checkbox.style.top = "5px"
    checkbox.onclick = function () {


      blockVisible = !blockVisible;
      showDotBlock(blockVisible);
      //alert("blockVisible : " + blockVisible);
    };

    var label = document.createElement('div');
    label.innerHTML = "도트블럭 보기";
    label.style.position = "absolute";
    label.style.color = "white";
    label.style.left = "46px"
    label.style.top = "5px"

    dotBlockElement.appendChild(label);
    dotBlockElement.appendChild(checkbox);


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

    var canvas = document.createElement('canvas');
    canvas.width  = 680;
    canvas.height = 720;

    var w = 40;


    var ctx:any = canvas.getContext("2d");
    ctx.moveTo(200, 24);
    ctx.font = '20pt Calibri';
    ctx.textAlign = 'left';
    ctx.fillText(title , 200, 30);

    for (let i = startRowIndex; i < endRowIndex ; i++) {
      for(let j = startColumnIndex; j < endColumnIndex; j ++) {

        let dotName = "dot_" + i + "_" + j;

        var asset: any = assetGroup.getObjectByName( dotName );

        if (asset != undefined) {
          let name = asset.name.split('_');
          let x = 40 + (parseInt(name[1]) - startRowIndex) * 40  ;
          let y = 80 + (parseInt(name[2]) - startColumnIndex) * 40;

          let colorId = asset.children[0].userData.colorId

          let colorStr = "#FFFFFF";


          //let colorData = colorDataList[colorId - 1];
          let colorData = colorDataList.find(element => element.id == colorId)
          if(colorData != undefined)
            colorStr = colorData.color;

          //console.log('x : ' + x + ', y : ' + y + ' color : ' + colorStr + ', colorId : ' + colorId + ' , dotName : ' + dotName);

          ctx = canvas.getContext("2d");
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.fillStyle = colorStr;
          ctx.arc(x, y, w/2, 0, 2 * Math.PI, false);
          //if(colorId == 1)
            ctx.stroke();
          ctx.fill();

          //ctx = canvas.getContext("2d");
          ctx.font = '16pt Calibri';
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
                    ctx.fillStyle = 'black'; break;
            default:
                    ctx.fillStyle = 'white'; break;
          }


          ctx.textAlign = 'center';
          ctx.fillText('' + colorId + '' , x, y+6);
          //ctx.fillText('1' , x, y+3);

        }
      }
    }

    var blockImage = canvas.toDataURL("image/jpg");

    blockImageData.data = blockImage;
    setBlockImageData(blockImageData);
    setBlockImageName(title);
    setVisibleBlockImageConfirm(true);

  }


  const showDotBlock = (visible)  => {

    let blockRowCount = dotRowCount / 16;
    let blockColumnCount = dotColumnCount / 16;

    for(let i = 0; i < blockRowCount; i ++) {
      for(let j = 0; j < blockColumnCount; j ++) {

        let blockName = "block_" + i + "_" + j;

        var asset: any = assetGroup.getObjectByName( blockName );

        if(asset != undefined)
          asset.visible = visible;

      }
    }
  }



  const getPitch = (color) => {

    let pitch = 'C1';

    color = color.replace('#', '').toUpperCase();

    console.log(color);

    switch(color) {
      case 'FEEC6C' :
      case 'FFEC6C' : pitch = 'C1'  ; break;
      case 'FAC807' :
      case 'FAC808' :
      case 'FAC809' :
      case 'FAC80A' : pitch = 'C2'; break;
      case 'FCAC00' : pitch = 'C3'; break;
      case 'D67923' : pitch = 'C4'; break;
      case 'B40000' : pitch = 'C5'; break;
      case '720012' : pitch = 'C6'; break;

      case 'FE9ECD' :
      case 'FF9ECD' : pitch = 'D1'; break;
      case 'D3359D' : pitch = 'D2'; break;
      case '901F76' : pitch = 'D3'; break;
      case 'CDA4DE' : pitch = 'D4'; break;
      case 'A06EB9' : pitch = 'D5'; break;
      case '441A91' : pitch = 'D6'; break;

      case 'FEC995' :
      case 'FFC995' : pitch = 'E1'; break;
      case 'BB805A' : pitch = 'E2'; break;
      case 'AA7D55' : pitch = 'E3'; break;
      case '91501C' : pitch = 'E4'; break;
      case '5F3107' :
      case '5F3108' :
      case '5F3109' : pitch = 'E5'; break;
      case '372100' : pitch = 'E6'; break;

      case 'E2F99A' : pitch = 'F1'; break;
      case 'A5CA18' : pitch = 'F2'; break;
      case '58AB41' : pitch = 'F3'; break;
      case '00852B' : pitch = 'F4'; break;
      case '00451A' : pitch = 'F5'; break;
      case '708E7C' : pitch = 'F6'; break;

      case 'D3F2EA' : pitch = 'G1'; break;
      case '68C3E2' : pitch = 'G2'; break;
      case '469BC3' : pitch = 'G3'; break;
      case '9DC3F7' : pitch = 'G4'; break;
      case '7396C8' : pitch = 'G5'; break;
      case '1E5AA8' : pitch = 'G6'; break;

      case 'B0A06F' : pitch = 'A1'; break;
      case '897D62' : pitch = 'A2'; break;
      case '77774E' : pitch = 'A3'; break;
      case 'AA7F2E' : pitch = 'A4'; break;
      case '70819A' : pitch = 'A5'; break;
      case '19325A' : pitch = 'A6'; break;

      case 'F3F3F3' :
      case 'F4F4F4' : pitch = 'B1'; break;
      case '969696' : pitch = 'B2'; break;
      case '8C8C8C' : pitch = 'B3'; break;
      case '646464' : pitch = 'B4'; break;
      case '3E3C39' : pitch = 'B5'; break;
      case '1B2A34' : pitch = 'B6'; break;
      default : break;
    }

    return pitch;
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
        $('#dotartView_vrCanvas').css('height', '70vh');
      else
        $('#dotartView_vrCanvas').css('height', '100vh');
      // if (window.innerWidth <= window.innerHeight)
      //   return (<div ref={myRef} id="vrBaseView_vrCanvas" style={{height:'70vh'}}>
      //           </div>);
      // else
      //   return (<div ref={myRef} id="vrBaseView_vrCanvas" style={{height:'100vh'}}>
      //           </div>);
    }
  }

  return (<div ref={myRef} id="dotartView_vrCanvas" style={{height:'100vh'}}>
            <div id="dotartView_blockGuide"  />
          </div>);
}

return (
            <Row gutter={[0,0]} style={{ position: 'fixed', top: '0px', left:'0px', bottom: '-10px',  width:'100vw', overflow: 'auto', opacity: '1' }} >
              <Col span={24}>
                <div id='view_dotart_loading' style={{height: '100vh'}}>
                  <div style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '300px', textAlign: 'center'}}>
                    <GifPlayer gif='./images/loading.gif' still='./images/copyright.jpg' autoplay />
                  </div>
                </div>
              </Col>
              <Col xxl={19} xl={18} lg={16} md={14} sm={24}>
                { getCanvase() }
              </Col>

              <Col xxl={5} xl={6} lg={8} md={10} sm={24} style={{height:'100vh'}}>
                <DotArtListPanel   vrModelList={vrModelList}
                                     dotColorIdList={dotColorIdList}
                                     productList={productList}
                                     vrAssets={vrAssetsContainer}
                                     creation={creation}
                                     traceMode={traceMode}
                                     musicMode={musicModeContainer}
                                     colorDataList={colorDataList}
                                     dotRowCountContainer={dotRowCountContainer}
                                     dotColumnCountContainer={dotColumnCountContainer}
                                     onTraceColor={handleTraceColor}
                                     onBaseDotModel={handleBaseDotModel}
                                     onMusicPlay={handleMusicPlay}
                                     onDisplayColorId={handleDisplayColorId}
                                     onDisplayAsset={handleDisplayAsset}
                                     onAssemblyAsset={handleAssemblyAsset}
                                     onZoomInOut={handleZoomInOut}
                                     onSaveAsImage={handleSaveAsImage}
                                     onSaveAsBlock={handleSaveAsBlock}
                                     onAutoRotate={handleAutoRotate}
               > </DotArtListPanel>
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
