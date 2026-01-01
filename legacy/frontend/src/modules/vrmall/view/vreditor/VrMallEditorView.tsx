import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Icon, Select, Row, Col, Modal, Button } from 'antd';
import * as THREE from 'three';
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { OrbitControls } from 'plugins/OrbitControls.js';
//import { TransformControls } from 'plugins/TransformControls.js';
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox.js';
//import { SelectionHelper } from 'three/examples/jsm/interactive/SelectionHelper.js';
import { SelectionHelper } from 'plugins/SelectionHelper.js';

import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';


import { ModalManager} from 'react-dynamic-modal';
import $ from 'jquery';

import { InfoModal } from 'components';
import { SOPOONG_URL, SHOP_URL, SHOP_ID, storageService } from 'common';

import { ProductModel } from 'modules/main/model';
import { VrModel, VrInstance } from 'modules/vrmall/model';

import { VrEditorPropertyPanel, VrEditorListPanel, VrEditorAssemblyPanel, VrGizmoComponent } from '.';

declare global {
  interface Window {
    IMP: any;
  }
}


/**
 * @description 상품 목록 페이지
 */

export const VrMallEditorView = (props) => {


  const [vrAssetsContainer, setVrAssetsContainer ] = useState<any[]>([]);
  const [assetGroup, setAssetGroup] = useState<THREE.Group>(new THREE.Group());
  const [vrModelList, setVrModelList] = useState<VrModel[]>([]);
  const [refreshMode, setRefreshMode] = useState<boolean>(true);

  const [visibleSaveConfirm, setVisibleSaveConfirm] = useState<boolean>(false);
  const [saveResult, setSaveResult] = useState<string>('');
  const [cameraContainer, setCameraContainer] = useState<any>({});

  const [px, setPx] = useState<number>(0);
  const [py, setPy] = useState<number>(0);
  const [pz, setPz] = useState<number>(0);
  const [rx, setRx] = useState<number>(0);
  const [ry, setRy] = useState<number>(0);
  const [rz, setRz] = useState<number>(0);



  //const vrModelList:VrModel[] = Object.assign(vrModels);
  //var vrModelList:VrModel[] = [];
  let vrModelMap;
  let vrAssets;

  //console.log("start......................................");

  const myRef = React.createRef<HTMLDivElement>()

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
  var selectedAssetId: number = 0;
  var targetAsset: any;

  var editorHistory: any[] = [];
  var historyIndex: number = 0;

  var mixerArray: THREE.AnimationMixer[] = [];
  var linkArray: THREE.Mesh[] = [];

  var vrMaterialMap = new Map();



  const ROTATE_UP: number = 1;
	const ROTATE_DOWN: number = 2;
	const ROTATE_RIGHT: number = 3;
	const ROTATE_LEFT: number = 4;
	const ZOOM_IN: number = 5;
	const ZOOM_OUT: number = 6;

  var animationCount: number = 0;

  const selectedMatrix = new THREE.Matrix4();
  const selectedGroup = new THREE.Group();

  let copyMode;
  let multiSelectionMode;
  let selectionMode;
  let transformMode;

  let selectionBox;
  let selectionHelper;

  let backgroundTexture;
  let backgroundColor;
  let groundMaterial;
  let hideMaterial;
  let glassMaterial;

  var startStep = 0;
  var endStep = 0;

  var snapMode = 'technic';

  const [sceneState, setSceneState] = useState<any>({});
  const [transformControlContainer, setTransformControlContainer] = useState<any>({});
  const [orbitControlContainer, setOrbitControlContainer] = useState<any>({});
  const [selectedAsset, setSelectedAsset] = useState<any>({});

  const [targetInfo, setTargetInfo] = useState<any>({});

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

  let colorMap = new Map();

  let vrMallInfo;

  let scaleRatio;
  let modelList;

  useEffect(() => {

    $('#MainHeader').hide();
    $('#MainFooter').hide();

    initVrControls();
    getVrMallData();

    initGizmoControls();

    initColorMap();

    window.addEventListener( 'resize',onWindowResize, false );

    window.addEventListener('beforeunload', (event) => {
      // Cancel the event as stated by the standard.
      event.preventDefault();
      // Chrome requires returnValue to be set.
       event.returnValue = '';
     });


  }, [props.match.params.vrMallId]);


  const getVrMallData = () => {

    console.log('vrMallId : ', props.match.params.vrMallId);

    let url = SOPOONG_URL + SHOP_URL + '/vrMall.do?vrMallId=' + props.match.params.vrMallId;

    fetch( url )
      .then(response => response.json())
      .then(data=> {
                      console.log(data);

                      initEnvironment(data.cameraPosition, data.cameraTarget, data.backgroundPath, data.groundPath);

                      vrMallInfo = data;

                      var vrAssetList = JSON.parse(data.vrModels);
                      console.log('vrAssetList : ', vrAssetList);
                      setVrObject(vrAssetList);

                      //setVrAssets(vrAssetList);
                      initVrModels(vrAssetList, data.setNames);

                    })
      .catch(err => console.log(err));

  };


  // VR 초기화
  const initVrControls = () => {

    renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true, antialias: true});

 		renderer.setPixelRatio( window.devicePixelRatio * 1 );

 		var canvasWidth = $('#vrEditor_vrCanvas').width();
 		var canvasHeight = $('#vrEditor_vrCanvas').height() ;

 		renderer.setSize( canvasWidth, canvasHeight );

    renderer.shadowMap.enabled = true;
    renderer.physicallyCorrectLights = true;
    renderer.gammaFactor = 1.18;
    renderer.outputEncoding = THREE.sRGBEncoding;


    outlineEffect = new OutlineEffect(renderer, {defaultThickness:0.002});


    camera = new THREE.PerspectiveCamera( 30, canvasWidth / canvasHeight, 0.1, 1000 );
    //camera = new THREE.PerspectiveCamera( 75, 10, 1, 11000 );
    camera.position.set( 25, 25, 25);
    //camera.lookAt( scene.position );
 		camera.lookAt( 0,0, 0 );
 		camera.updateMatrix();

    setCameraContainer(camera);

    selectionBox = new SelectionBox( camera, scene );
		selectionHelper = new SelectionHelper( selectionBox, renderer, 'selectBox' );

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

    //selectedMatrix = new THREE.Matrix4();
    //selectedGroup = new THREE.Group();

    //var tempgeometry = new THREE.BoxGeometry( 1, 1, 1 );
    //selectedGroup = new THREE.Mesh( tempgeometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
    //selectedGroup.geometry.translate( 5, 5, 5 );
    //selectedGroup.geometry.applyMatrix( new THREE.Matrix4().makeTranslation(5, 5, 5) );

    scene.add(selectedGroup);

    selectedGroup.name='selectedGroup';
    selectedGroup.userData.selected = [];
    selectedGroup.userData.prevParent = [];
    selectedGroup.userData.box = [];


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


    const htmlDivElement = myRef.current;
    if(htmlDivElement) {
     htmlDivElement.insertBefore(renderer.domElement, htmlDivElement.firstChild);
    }

    animate();

    var mapUrl = "./images/legomall/textures/clamp_base.jpg";
    var mapTexture = textureLoader.load(mapUrl)
    mapTexture.wrapS = THREE.RepeatWrapping;
    mapTexture.wrapT = THREE.RepeatWrapping;
    mapTexture.repeat.x = 1/10;
    mapTexture.repeat.y = 1/10;

    var normalMap = textureLoader.load( "./images/legomall/textures/clamp_normal.png" );
    normalMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.repeat.x = 1/10;
    normalMap.repeat.y = 1/10;


    hideMaterial = new THREE.MeshPhysicalMaterial( { opacity: 0, transparent: true,  color: 0xffffff, side: THREE.DoubleSide, depthWrite: false } );
    hideMaterial.name = 'hide';
    glassMaterial = new THREE.MeshPhysicalMaterial( { opacity: 0.15, transparent: true,  color: 0x003333, side: THREE.DoubleSide, depthWrite: false} );

    onWindowResize();

    var gridHelper: any = new THREE.GridHelper( 1000, 1000, 0x000000, 0x000000 );
    gridHelper.material.opacity = 0.1;
    gridHelper.material.depthWrite = false;
    gridHelper.material.transparent = true;
    //scene.add( gridHelper );


    $('#vrEditor_vrCanvas').on("mousedown", onDocumentMouseDown);
    $('#vrEditor_vrCanvas').on("mousemove", onDocumentMouseMove);
    $('#vrEditor_vrCanvas').on("mouseup", onDocumentMouseUp);
    //$('#vrEditor_vrCanvas').on("click", onDocumentMouseClick);
    $('#vrEditor_vrCanvas').on("dblclick", onDocumentMouseDblClick);
    $('#vrEditor_vrCanvas').on("select_asset", onDocumentSelectAsset);
    $('#vrEditor_vrCanvas').on("save_asset", onDocumentSaveAsset);
    $('#vrEditor_vrCanvas').on("add_asset", onDocumentAddAsset);
    $('#vrEditor_vrCanvas').on("delete_asset", onDocumentDeleteAsset);
    $('#vrEditor_vrCanvas').on("copy_asset", onDocumentCopyAsset);
    $('#vrEditor_vrCanvas').on("transform_asset", onDocumentTransformAsset);
    $('#vrEditor_vrCanvas').on("snap_mode", onDocumentSnapMode);
    $('#vrEditor_vrCanvas').on("focus_asset", onDocumentFocusAsset);
    $('#vrEditor_vrCanvas').on("display_asset", onDocumentDisplayAsset);
    $('#vrEditor_vrCanvas').on("assembly_level_asset", onDocumentAssemblyLevelAsset);
    $('#vrEditor_vrCanvas').on("assembly_asset", onDocumentAssemblyAsset);
    $('#vrEditor_vrCanvas').on("color_asset", onDocumentColorAsset);
    $('#vrEditor_vrCanvas').on("save_assembly_asset", onDocumentAssemblySaveAsset);
    $('#vrEditor_vrCanvas').on("init_assembly", onDocumentInitAssembly);
    $('#vrEditor_vrCanvas').on("setting_background", onDocumentSettingBackground);
    $('#vrEditor_vrCanvas').on("save_image", onDocumentSaveAsImage);
    $('#vrEditor_vrCanvas').on("setting_info", onDocumentSettingInfo);
    $('#vrEditor_vrCanvas').on("export_stl", onDocumentExportToStl);
    $('#vrEditor_vrCanvas').on("export_gltf", onDocumentExportToGltf);

    $('#vrEditor_vrCanvas').on("keydown", onDocumentKeyDown);
    $('#vrEditor_vrCanvas').on("keyup", onDocumentKeyUp);


    // document.addEventListener( 'keydown', onDocumentKeyDown, false );
    // document.addEventListener( 'keyup', onDocumentKeyUp, false );

    setSceneState(scene);

 	}

  const initColorMap = () => {

    //var tempColorMap = new Map();

    colorDataList.forEach(item => {
      var color:any = new THREE.Color(item.color);
      color.convertSRGBToLinear();

      colorMap.set(color.getHex(), item);
      //console.log("linearColor : " + color.getHex() + " , " + item)
    });

    //setColorMap(tempColorMap)
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

    //var  groundTexture = textureLoader.load( './images/legomall/textures/grasslight-big.jpg');
    let  groundTexture;
    if(groundPath != undefined)
      groundTexture = textureLoader.load( groundPath);
    else
      groundTexture = textureLoader.load( './images/legomall/background/baseplate.png');

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
		scene.add( groundMesh );

    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
	   scene.add( ambientLight );


    backgroundColor = new THREE.Color( 0xdeebed );

    if(backgroundPath != undefined)
      backgroundTexture = textureLoader.load( backgroundPath);
    else
      backgroundTexture = textureLoader.load( './images/legomall/background/default_background.jpg');
    scene.background = backgroundTexture;

  }


  // VR Model 초기화
  const initVrModels = (vrAssetList, setNames) => {

    if(vrAssetList == null)
      vrAssetList = [];

    //let url = SOPOONG_URL + SHOP_URL + '/vrModels.do?shopId=' + SHOP_ID;
    //let url = SOPOONG_URL + SHOP_URL + '/vrModelsBySetNames.do?setNames=51515,99998';
    let url = SOPOONG_URL + SHOP_URL + '/vrModelsBySetNames.do?setNames=' + setNames;

    fetch( url )
      .then(response => response.json())
      .then(data=> {
                      console.log(data);

                      modelList = data;
                      console.log('vrModelList : ', modelList);
                      setVrModelList(modelList);

                      var loader = new FBXLoader();

                      var normalMap = textureLoader.load( "./images/legomall/textures/clamp_normal.png" );
                      normalMap.wrapS = THREE.RepeatWrapping;
                      normalMap.wrapT = THREE.RepeatWrapping;
                      normalMap.repeat.x = 1/10;
                      normalMap.repeat.y = 1/10;

                      if(vrModelMap == undefined)
                        vrModelMap = new Map();

                      modelList.forEach(vrModel => {

                        const vrAsset = vrAssetList.find(vrAsset => vrAsset.vrModelName == vrModel.vrModelName);

                        if(vrAsset == undefined)
                          vrAssetList.push(vrModel);

                        if(vrModel.modelPath.includes('fbx')) {

                          loader.load( vrModel.modelPath, ( object:any ) => {
                            vrModelMap.set(vrModel.vrModelName, object)
                          });
                        }
                        else if(vrModel.modelPath.includes('glb')) {

                          gltfLoader.load( vrModel.modelPath, ( object:any ) => {

                            object.scene.traverse( function ( child ) {
                      				if ( child.isMesh ) {
                      					child.castShadow = true;
                      					child.receiveShadow = true;

                                child.scale.set(100, 100, 100);
                      				}
                      			} );

                            vrModelMap.set(vrModel.vrModelName, object.scene)
                          });
                        }
                      });


                      vrAssetList.sort(function(a,b) { return a.vrModelId - b.vrModelId });

                      vrAssets = vrAssetList;

                      var assetList = new Array();

                      vrAssets.forEach(vrModel => {
                        if(vrModel.instances != undefined && vrModel.instances.length > 0)
                          assetList.push(vrModel);
                      });

                      setRefreshMode(true);
                      setVrAssetsContainer(assetList);

                    })
      .catch(err => console.log(err));

 	}

  const setVrObject = (vrAssetList) => {

    console.log('setVrObject start..');

    if(vrAssetList == null)
      return;

    vrAssetList.forEach(vrAsset => {

      if(vrAsset.modelPath.includes('fbx')) {
        loader.load( vrAsset.modelPath, ( object:any ) => {


          object.traverse( function ( child ) {

            if ( child.isMesh ) {
              child.castShadow = true;
              child.receiveShadow = true;

/*
              if(child.material){
                if(Array.isArray(child.material)) {
                  child.material.forEach((material, index) => child.material[index].color.convertLinearToSRGB());
                }
                else {
                  child.material.color.convertLinearToSRGB();
                  child.material.shininess = 20;
                }
              }
*/
              if (vrAsset.vrModelType.substring(0, 4) == 'lego'){

                let vrMaterial;

                if(vrAsset.material != undefined) {

                  //vrMaterial = new THREE.MeshPhysicalMaterial( vrAsset.material  );

                  //child.material = vrMaterial;
                  vrMaterialMap.set(vrAsset.vrModelName, child.material);

                }
              }
            }
          } );


          if(vrModelMap == undefined)
            vrModelMap = new Map();

          vrModelMap.set(vrAsset.modelName, object);


          if(vrAsset.instances == undefined)
            return;


          vrAsset.instances.forEach(instance => {

            //var vrInstance = Object.assign(object);
            var vrInstance = object.clone();

            if( instance.position == undefined ||
                instance.rotation == undefined ||
                instance.scale == undefined)
                return;

            vrInstance.name = instance.instanceName;
            vrInstance.position.set(instance.position.x, instance.position.y, instance.position.z);
    				vrInstance.rotation.set(instance.rotation._x * Math.PI/180, instance.rotation._y * Math.PI/180, instance.rotation._z * Math.PI/180);
    				//vrInstance.scale.set(instance.scale.x * 1, instance.scale.y * 1, instance.scale.z * 1);
            vrInstance.scale.set(1, 1, 1);

    				assetGroup.add( vrInstance );

            var bbox = new THREE.Box3().setFromObject( assetGroup );
  					var size = bbox.getSize( new THREE.Vector3() );
  					var radius = Math.max( size.x, Math.max( size.y, size.z ) ) * 0.5;

  					orbitControl.target0.copy( bbox.getCenter( new THREE.Vector3() ) );
  					orbitControl.position0.set( - 2.3, 2, 2 ).multiplyScalar( radius ).add( orbitControl.target0 );
  					orbitControl.reset();
          });
        });
      }
      else if(vrAsset.modelPath.includes('glb')) {
        gltfLoader.load( vrAsset.modelPath, ( object:any ) => {

          object.scene.traverse( function ( child ) {

            if ( child.isMesh ) {
              child.castShadow = true;
              child.receiveShadow = true;

              child.scale.set(100, 100, 100);
            }
          } );


          if(vrModelMap == undefined)
            vrModelMap = new Map();

          vrModelMap.set(vrAsset.modelName, object);


          if(vrAsset.instances == undefined)
            return;


          vrAsset.instances.forEach(instance => {

            //var vrInstance = Object.assign(object);
            var vrInstance:any = object.scene.clone();

            if( instance.position == undefined ||
                instance.rotation == undefined ||
                instance.scale == undefined ||
                instance.color == undefined)
                return;

            vrInstance.name = instance.instanceName;
            vrInstance.position.set(instance.position.x, instance.position.y, instance.position.z);
            vrInstance.rotation.set(instance.rotation._x * Math.PI/180, instance.rotation._y * Math.PI/180, instance.rotation._z * Math.PI/180);
            //vrInstance.scale.set(instance.scale.x * 1, instance.scale.y * 1, instance.scale.z * 1);
            vrInstance.scale.set(1, 1, 1);

            var colors: [] = instance.color.split(',');

            if(vrInstance.children[0] != undefined) {

              if(vrInstance.children[0].material){

                vrInstance.children[0].material = vrInstance.children[0].material.clone();

                console.log("instance.color : " + instance.color);

                if(Array.isArray(vrInstance.children[0].material)) {
                  //child.material.forEach((material, index) => child.material[index].color.convertLinearToSRGB());
                  vrInstance.children[0].material.forEach((material, index) => {
                    vrInstance.children[0].material[index].color.set(Number(colors[index]));
                  });
                }
                else {
                  vrInstance.children[0].material.color.set(Number(instance.color));
                }
              }
            }

            assetGroup.add( vrInstance );

            var bbox = new THREE.Box3().setFromObject( assetGroup );
            var size = bbox.getSize( new THREE.Vector3() );
            var radius = Math.max( size.x, Math.max( size.y, size.z ) ) * 0.5;

            orbitControl.target0.copy( bbox.getCenter( new THREE.Vector3() ) );
            orbitControl.position0.set( - 2.3, 2, 2 ).multiplyScalar( radius ).add( orbitControl.target0 );
            orbitControl.reset();

          });

        });
      }
    });

    setSceneState(scene);
  }

  const onWindowResize = () => {

		var canvasWidth = $('#vrEditor_vrCanvas').width() - 2;
		var canvasHeight = $('#vrEditor_vrCanvas').height();
    // var canvasWidth = window.innerWidth;
		// var canvasHeight = window.innerHeight;

		//camera.aspect = window.innerWidth / window.innerHeight;
		camera.aspect = canvasWidth / canvasHeight;
		camera.updateProjectionMatrix();

		//renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setSize( canvasWidth, canvasHeight );


    $("#vrEditor_vrGizmoCanvas").css("top", $('html, body').offset().top + 30);
    $("#vrEditor_vrGizmoCanvas").css("left", $('html, body').offset().left + $('#vrEditor_vrCanvas').outerWidth() - 130);

		//renderVr();

	}


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

		update();

    moveToTarget();

    animationCount ++

    if(animationCount > 5) {

	    renderer.render( scene, camera );

      animationCount = 0;
    }

    if(outline){
      outlineEffect.render( scene, camera );
    }

	}


	const update = () => {

		var delta = clock.getDelta();

		for(var index = 0; index < mixerArray.length; index ++) {

			mixerArray[index].update( delta);
		}

    rotateLink();
	}


  const rotateLink = () => {

		var SPEED = 0.01;

		for(var index = 0; index < linkArray.length; index ++) {

			//linkArray[index].rotation.x -= SPEED * 3;
			//linkArray[index].rotation.y -= SPEED * 3;
			//linkArray[index].rotation.z -= SPEED * 3;
      linkArray[index].rotateOnAxis( axis, Math.PI * 0.01 )
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


  const addCommandHistory = (mode, group) => {

    var assets: any [] = [];

    if (selectedGroup.userData.selected.length == 0) {
      editorHistory.push({mode:"translate", assets:assets});
      return;
    }


    var selectedAssets = selectedGroup.userData.selected.slice();
    var parentAssets = selectedGroup.userData.prevParent.slice();

    const matrix = new THREE.Matrix4();

    for (var i = 0; i < selectedAssets.length; i++) {
      var asset = selectedAssets[i].clone();

      var parentAsset = parentAssets[i];
      asset.matrixWorldNeedsUpdate = true;
      parentAsset.matrixWorldNeedsUpdate = true;
      matrix.getInverse(parentAsset.matrixWorld);
      var asset_matrix_old = asset.matrixWorld.premultiply(matrix);
      asset_matrix_old.decompose(asset.position, asset.quaternion, asset.scale);

      assets.push(asset);
    }

    editorHistory = editorHistory.slice(0, historyIndex);

    if(mode == "translate"){

      editorHistory.push({mode:"translate", assets:assets});

      transformMode = true;
      transformControl.attach( targetAsset );
      transformControl.setMode( "translate" );

      historyIndex ++;
    }
    else if(mode == "add"){
      editorHistory.push({mode:"add", assets:assets});

      transformMode = true;
      transformControl.attach( targetAsset );
      transformControl.setMode( "translate" );

      historyIndex ++;
    }
    else if(mode == "delete"){
      editorHistory.push({mode:"delete", assets:assets});
      historyIndex ++;
    }

  }


  const onGrouping = (asset) => {
    console.log( 'VrMallEditor onGrouping start' );

    var isFirstAsset = false;

    selectedGroup.matrixWorldNeedsUpdate = true;
    if (asset !== undefined) {
      var intersectedObject = asset;

      //Return if object was already selected before
      if (selectedGroup.userData.selected.includes(intersectedObject)) {
          return;
      }


      var objectClone = intersectedObject.clone();

      intersectedObject.matrixWorldNeedsUpdate = true;

      if (selectedGroup.userData.selected.length == 0) {
        //selectedMatrix.getInverse(selectedGroup.matrixWorld);
        selectedMatrix.getInverse(intersectedObject.matrixWorld);
        isFirstAsset = true;
        //console.log("onGrouping asset name : " + asset.name  + "asset x : " + asset.position.x + " , y : " + asset.position.y + " , z : " + asset.position.z);
      }


      var intersectedObject_matrix_new = intersectedObject.matrixWorld.premultiply(selectedMatrix);
      intersectedObject_matrix_new.decompose(intersectedObject.position, intersectedObject.quaternion, intersectedObject.scale);

      var box = new THREE.BoxHelper(intersectedObject, 0xff0000);
      box.matrixWorldNeedsUpdate = true;
      var box_matrix_new = box.matrixWorld.premultiply(selectedMatrix);
      box_matrix_new.decompose(box.position, box.quaternion, box.scale);

      selectedGroup.userData.selected.push(intersectedObject);
      selectedGroup.userData.prevParent.push(intersectedObject.parent);
      selectedGroup.userData.box.push(box);
      selectedGroup.add(intersectedObject);


      //console.log("after x : " + intersectedObject.position.x + " , y : " + intersectedObject.position.y + " , z : " + intersectedObject.position.z);

      //console.log("after box x : " + box.position.x + " , y : " + box.position.y + " , z : " + box.position.z);

      selectedGroup.add(box);

      if (isFirstAsset) {
        //console.log("objectClone first name : " + objectClone.name  + "objectClone x : " + objectClone.position.x + " , y : " + objectClone.position.y + " , z : " + objectClone.position.z);
        selectedGroup.position.set(objectClone.position.x, objectClone.position.y, objectClone.position.z);
        selectedGroup.rotation.set(objectClone.rotation.x, objectClone.rotation.y, objectClone.rotation.z);
      }

      targetAsset = selectedGroup;

    }
  }




  const onGroupingRelease = (asset) => {
    console.log( 'VrMallEditor onGroupingRelease start' );

    selectedGroup.matrixWorldNeedsUpdate = true;
    if (asset !== undefined) {

      var index = selectedGroup.userData.selected.findIndex((element, index) => {
                                                                          if(element.name == asset.name)
                                                                            return index;
                                                                          return -1;
                                                                        });

      if(index > -1){

        var intersectedObject = selectedGroup.userData.selected[index];
        var parentObject = selectedGroup.userData.prevParent[index];
        var boxObject = selectedGroup.userData.box[index];

        intersectedObject.matrixWorldNeedsUpdate = true;
        parentObject.matrixWorldNeedsUpdate = true;
        selectedMatrix.getInverse(parentObject.matrixWorld);
        var intersectedObject_matrix_old = intersectedObject.matrixWorld.premultiply(selectedMatrix);
        intersectedObject_matrix_old.decompose(intersectedObject.position, intersectedObject.quaternion, intersectedObject.scale);

        parentObject.add(intersectedObject);


        selectedGroup.userData.selected.splice(index, 1);
        selectedGroup.userData.prevParent.splice(index, 1);
        selectedGroup.userData.box.splice(index, 1);

        //selectedGroup.remove(intersectedObject);
        selectedGroup.remove(boxObject);
      }

    }
  }

  //Deselecting
  const onGroupingEnd = () => {

      console.log( 'VrMallEditor onGroupingEnd start' );

      if (selectedGroup.userData.selected !== []) {
          var intersectedObject;
          for (var i = 0; i < selectedGroup.userData.selected.length; i++) {
              intersectedObject = selectedGroup.userData.selected[i];

              //Recalculate local transform (pos, rot, scale) of intersectedObject for switching back to old parent (prevParent = previous parent)
              intersectedObject.matrixWorldNeedsUpdate = true;
              selectedGroup.userData.prevParent[i].matrixWorldNeedsUpdate = true;
              selectedMatrix.getInverse(selectedGroup.userData.prevParent[i].matrixWorld);
              var intersectedObject_matrix_old = intersectedObject.matrixWorld.premultiply(selectedMatrix);
              intersectedObject_matrix_old.decompose(intersectedObject.position, intersectedObject.quaternion, intersectedObject.scale);

              selectedGroup.userData.prevParent[i].add(intersectedObject);
              // Coloring intersectedObject normal when deselecting
              //intersectedObject.material.emissive.b = 0;
          }



          selectedGroup.position.set( 0, 0, 0);
          selectedGroup.rotation.set( 0, 0, 0);

          selectedGroup.children = [];
          selectedGroup.userData.selected = [];
          selectedGroup.userData.prevParent = [];
          selectedGroup.userData.box = [];

      }
      transformControl.detach();
  }


  const onDocumentMouseClick = (event) => {

    console.log( 'VrMallEditor onDocumentMouseClick start' );

    var rect = renderer.domElement.getBoundingClientRect();

    var mouse = new THREE.Vector2();

    mouse.x =((( event.clientX - rect.left ) / rect.width) * 2) - 1;
    mouse.y =  -((( event.clientY - rect.top ) / rect.height) * 2) + 1;

    var raycaster = new THREE.Raycaster();

    raycaster.setFromCamera(mouse, camera);

    var intersects:any = raycaster.intersectObjects(assetGroup.children, true);


    if (intersects.length > 0) {

      let name;
      let multiMaterialMeshGroup;

      for (var i = 0; i < intersects.length; i++) {

        if( intersects[i].object == undefined || intersects[i].object.parent == undefined)
          continue;

        name = intersects[i].object.parent.name;

        if(intersects[i].object.parent.children.length > 1) {
          multiMaterialMeshGroup = intersects[i].object.parent;
          name = multiMaterialMeshGroup.parent.name;
        }

        if(event.ctrlKey && intersects.length > (i + 1) && intersects[i + 1].object != undefined && intersects[i + 1].object.parent != undefined) {
          name = intersects[i + 1].object.parent.name;

          if(intersects[i + 1].object.parent.children.length > 1) {
            multiMaterialMeshGroup = intersects[i + 1].object.parent;
            name = multiMaterialMeshGroup.parent.name;
          }
        }

        if(name == undefined) {
          continue;
        }

        console.log("click .........." + name)

        var asset: any = scene.getObjectByName( name );

        if(asset == undefined)
          continue;

        if(asset.children[0].isMesh != undefined && asset.children[0].material.name != undefined && asset.children[0].material.name == 'hide')
          continue;

        if(!event.ctrlKey) {

          if(!event.shiftKey)
            onGroupingEnd();

          onGrouping(asset);
        }
        else{
          onGroupingRelease(asset);
        }

        updateTransfromValue();

        break;
      }

    }
    else {
      onGroupingEnd();
    }


  }

  const onDocumentMouseDown = (event) => {

    console.log( 'VrMallEditor onDocumentMouseDown start' );

    if (!transformMode) {

      var canvasWidth = $('#vrEditor_vrCanvas').width() - 2;
      var canvasHeight = $('#vrEditor_vrCanvas').height();

  		//selectionBox.startPoint.set(
      //  	( event.clientX / window.innerWidth ) * 2 - 1,
  		//	- ( event.clientY / window.innerHeight ) * 2 + 1,
  		//	0.5 );
      selectionBox.startPoint.set(
        	( event.clientX / canvasWidth ) * 2 - 1,
  			- ( event.clientY / canvasHeight ) * 2 + 1,
  			0.5 );

      console.log("start window width, height : " + window.innerWidth + ", " + window.innerHeight);
      console.log("canvas width, height : " + canvasWidth + ", " + canvasHeight);
      console.log("event x, y : " + event.clientX + ", " + event.clientY );
    }
    else {

      console.log( "snapMode : " + snapMode + " , transformControl.axis : " + transformControl.axis);

/*
      if(snapMode == "brick" && transformControl.axis == "Y")
        transformControl.setTranslationSnap(0.32);
      else
        transformControl.setTranslationSnap(0.4);
*/

      transformControl.setTranslationSnap(0.08);

    }

  }


  const onDocumentMouseMove = (event) => {
    //console.log(targetAsset.position.x + "," + targetAsset.position.y + "," +targetAsset.position.z);

    if( transformMode && event.button == 0 ) {

      if(targetAsset != undefined)
        updateTransfromValue();
    }
  }


  const onDocumentMouseUp = (event) => {

    console.log( 'VrMallEditor onDocumentMouseUp start' );

    if( event.button == 0) {

      if(transformMode) {

        if(targetAsset != undefined) {

          addCommandHistory("translate", targetAsset);
          return;
        }
      }

      //pointerUp(event);

      var canvasWidth = $('#vrEditor_vrCanvas').width() - 2;
      var canvasHeight = $('#vrEditor_vrCanvas').height();

      selectionBox.endPoint.set(
        	( event.clientX / canvasWidth ) * 2 - 1,
  			- ( event.clientY / canvasHeight ) * 2 + 1,
  			0.5 );

      if(selectionBox.startPoint.equals(selectionBox.endPoint)) {
        onDocumentMouseClick(event);
        return;
      }

  		const allSelected = selectionBox.select();

      //console.log("allSelected length : " + allSelected.length );

      if(!event.ctrlKey){  // 다중 선택 추가

        if(!event.shiftKey) // 다중 선택 갱신
          onGroupingEnd();

        for ( let i = 0; i < allSelected.length; i ++ ) {

          if(allSelected[ i ].isMesh){
            //console.log("select object name2 : " + allSelected[ i ].name);
            //console.log("parenet name2 : " + allSelected[ i ].parent.name);

            if(allSelected[ i ].parent.name == "")
              continue;

            if(allSelected[i].material.name != undefined && allSelected[i].material.name == 'hide')
              continue;

            if(allSelected[ i ].parent.children.length > 1) {
              // Multi Meterial Mesh Group
              var multiMeterialMeshGroup = allSelected[ i ].parent;
              onGrouping(multiMeterialMeshGroup.parent);
            }
            else {
              onGrouping(allSelected[ i ].parent);
            }
          }
    		}
      }
      else { // 선택 취소

        for ( let i = 0; i < allSelected.length; i ++ ) {

          if(allSelected[ i ].isMesh){
            //console.log("select object name2 : " + allSelected[ i ].name);
            //console.log("parenet name2 : " + allSelected[ i ].parent.name);

            if(allSelected[ i ].parent.name == "")
              continue;

            if(allSelected[ i ].parent.children.length > 1) {
              // Multi Meterial Mesh Group
              var multiMeterialMeshGroup = allSelected[ i ].parent;
              onGroupingRelease(multiMeterialMeshGroup.parent);
            }
            else {
              onGroupingRelease(allSelected[ i ].parent);
            }
          }
    		}

      }
    }

  }


  const onDocumentMouseDblClick = (event) => {

    console.log( 'VrMallEditor onDocumentMouseDblClick start' );

    //onGroupingEnd();
    //transformControl.detach();
    selectionMode = false;
    multiSelectionMode = false;
    transformMode = false;
    selectionHelper.selectionMode = true;


    transformControl.detach();
    copyMode = false;

/*
    for (var i = assetGroup.children.length - 1; i >= 0; i--) {

      var childAsset:any = assetGroup.children[i];

      if(childAsset.children[0].isMesh) {

        if(childAsset.children[0].currentMaterial != undefined)
          childAsset.children[0].material = childAsset.children[0].currentMaterial;
      }

    }
*/
    for (var i = assetGroup.children.length - 1; i >= 0; i--) {

      var childAsset:any = assetGroup.children[i];

      const vrModelName = childAsset.name.substring(0, childAsset.name.lastIndexOf('_'));
      var assetModel = vrAssets.find(element => element.vrModelName == vrModelName);

      if(assetModel == undefined || assetModel.instances == undefined)
        continue;

      if(childAsset.children[0].currentMaterial == undefined)
        childAsset.traverse( function ( child ) {
         if ( child.isMesh ) {
           if(child.currentMaterial == undefined)
             child.currentMaterial = child.material;
         }
       });
      //childAsset.children[0].currentMaterial = childAsset.children[0].material;


      var assetInstance = assetModel.instances.find(element => element.instanceName == childAsset.name);

      if(assetInstance != undefined) {

        if(assetInstance.assemblyLevel != undefined) {

          if(Number.parseInt(assetInstance.assemblyLevel) >= startStep && Number.parseInt(assetInstance.assemblyLevel) <= endStep) {
            //childAsset.children[0].material = childAsset.children[0].currentMaterial;
            childAsset.traverse( function ( child ) {
              if ( child.isMesh ) {
                child.material = child.currentMaterial;
              }
            });
          }
          else {
            //childAsset.children[0].material = hideMaterial;
            childAsset.traverse( function ( child ) {
              if ( child.isMesh ) {
                child.material = hideMaterial;
              }
            });
          }
        }
        else {
          //childAsset.children[0].material = childAsset.children[0].currentMaterial;

          childAsset.traverse( function ( child ) {
            if ( child.isMesh ) {
              child.material = child.currentMaterial;
            }
          });
        }
      }
    }
  }


  const onDocumentKeyDown = (event) => {

    console.log(event.ctrlKey, event.keyCode);

    if (event.keyCode == 77)  // M 이동
    {
      transformMode = true;
      selectionHelper.selectionMode = false;

      if(targetAsset != undefined) {
        addCommandHistory("translate", targetAsset);
      }

      transformControl.setMode("translate");
    }
    else if (event.keyCode == 82)  // R 회전
    {
      transformMode = true;
      selectionHelper.selectionMode = false;

      if(targetAsset != undefined) {
        addCommandHistory("translate", targetAsset);
      }

      transformControl.setMode("rotate");

    }
    else if (event.keyCode == 72)  // H 숨기기
    {

      if(!transformMode) {

        var selectedAssets = selectedGroup.userData.selected.slice();

        if (selectedAssets !== []) {
          var asset;
          for (var i = 0; i < selectedAssets.length; i++) {
            asset = selectedAssets[i];

            asset.traverse( function ( child ) {
              if ( child.isMesh ) {
                if(child.currentMaterial == undefined)
                  child.currentMaterial = child.material;
              }
            });

            asset.traverse( function ( child ) {
              if ( child.isMesh ) {
                child.material = hideMaterial;
              }
            });

            //asset.children[0].currentMaterial = asset.children[0].material;
            //asset.children[0].material = hideMaterial;
          }
        }

        onGroupingEnd();

      }

    }
    else if (event.keyCode == 13 )  // ENTER 이동/회전 모드 해제
    {
      if(transformMode) {
        transformMode = false;
        selectionHelper.selectionMode = true;

        transformControl.detach();
        onGroupingEnd();
      }
    }
    else if (event.keyCode == 27)  // ESC 이동/회전 모드 해제
    {
      transformMode = false;
      selectionHelper.selectionMode = true;

      transformControl.detach();
      onGroupingEnd();
    }
    else if (event.ctrlKey && event.keyCode == 67)  // CTRL + C 복사
    {
      copyMode = true;
    }
    else if (event.ctrlKey && event.keyCode == 86)  // CTRL + V 붙여넣기
    {
      if(copyMode){

        if(targetAsset == undefined)
          return;

        copyAssetGroup(undefined);

        /*

        const modelKey = targetAsset.name.substring(0, targetAsset.name.lastIndexOf('_'));
        var assetModel = vrAssets.find(element => element.vrModelName == modelKey);

        if(assetModel == undefined)
          return

        var lastIndex = "100";

        if(assetModel.instances != undefined && assetModel.instances.length > 0){

          var lastInstance = assetModel.instances[assetModel.instances.length -1];

          if(lastInstance != undefined)
            lastIndex = lastInstance.key.substring(lastInstance.key.lastIndexOf('_') + 1);
        }

        var index = parseInt(lastIndex) + 1;
        const assetKey = assetModel.vrModelName + '_' + index;

        copyAsset(targetAsset, assetKey, undefined);
        */

        copyMode = false;

      }
    }
    else if (event.ctrlKey && event.keyCode == 90)  // CTRL + Z 되돌리기
    {
      console.log("editorHistory length : " + editorHistory.length + ", historyIndex : " + historyIndex);

      if( (historyIndex > 1) &&
          (historyIndex <= editorHistory.length ) ){
        //editorHistory.pop();
        //var editorInfo = editorHistory[editorHistory.length - 1];
        historyIndex --;
        var editorInfo = editorHistory[historyIndex - 1];

        if(editorInfo != undefined){

          console.log("mode : " + editorInfo.mode + " , assets.length : " + editorInfo.assets.length);

          if (editorInfo.mode == "translate") {

            onGroupingEnd();

            editorInfo.assets.forEach(element => {
                                                  var asset: any = scene.getObjectByName( element.name );

                                                  if(asset == undefined)
                                                    return;
                                                  asset.position.set(element.position.x, element.position.y, element.position.z);
                                                  asset.rotation.set(element.rotation.x, element.rotation.y, element.rotation.z);
                                                  onGrouping(asset)
                                                });

            //var asset: any = scene.getObjectByName( editorInfo.asset.name );
            //asset.position.set(editorInfo.asset.position.x, editorInfo.asset.position.y, editorInfo.asset.position.z);
    				//asset.rotation.set(editorInfo.asset.rotation.x, editorInfo.asset.rotation.y, editorInfo.asset.rotation.z);
    				//asset.scale.set(editorInfo.asset.scale.x, editorInfo.asset.scale.y, editorInfo.asset.scale.z);

            transformControl.attach( targetAsset );
            transformControl.setMode( "translate" );
            //targetAsset = asset;
            updateTransfromValue();

          } else if (editorInfo.mode == "add") {
            onGroupingEnd();
            editorInfo.assets.forEach(asset => onGrouping(asset));
            deleteAssetGroup("history");

          } else if (editorInfo.mode == "delete") {
            restoreAssetGroup(editorInfo.assets);
          }

        }

      }

    }
    else if (event.ctrlKey && event.keyCode == 89)  // CTRL + Y 되돌리기 취소
    {
      console.log("editorHistory length : " + editorHistory.length + ", historyIndex : " + historyIndex);

      if( (historyIndex > 0) &&
          (historyIndex < editorHistory.length ) ){
        //editorHistory.pop();
        //var editorInfo = editorHistory[editorHistory.length - 1];
        historyIndex ++;
        var editorInfo = editorHistory[historyIndex - 1];

        if(editorInfo != undefined){

          console.log("mode : " + editorInfo.mode + " , assets.length : " + editorInfo.assets.length);

          if (editorInfo.mode == "translate") {

            onGroupingEnd();

            editorInfo.assets.forEach(element => {
                                                  var asset: any = scene.getObjectByName( element.name );
                                                  asset.position.set(element.position.x, element.position.y, element.position.z);
                                                  asset.rotation.set(element.rotation.x, element.rotation.y, element.rotation.z);
                                                  onGrouping(asset)
                                                });

            //var asset: any = scene.getObjectByName( editorInfo.asset.name );
            //asset.position.set(editorInfo.asset.position.x, editorInfo.asset.position.y, editorInfo.asset.position.z);
            //asset.rotation.set(editorInfo.asset.rotation.x, editorInfo.asset.rotation.y, editorInfo.asset.rotation.z);
            //asset.scale.set(editorInfo.asset.scale.x, editorInfo.asset.scale.y, editorInfo.asset.scale.z);

            transformControl.attach( targetAsset );
            transformControl.setMode( "translate" );
            //targetAsset = asset;
            updateTransfromValue();

          } else if (editorInfo.mode == "add") {
            onGroupingEnd();
            editorInfo.assets.forEach(asset => onGrouping(asset));
            deleteAssetGroup("history");
          } else if (editorInfo.mode == "delete") {
            restoreAssetGroup(editorInfo.assets);
          }

        }

      }

    }
    else if (event.keyCode == 46)  // Delete 삭제
    {
      deleteAssetGroup(undefined);
      /*
      deleteAsset(targetAsset.name, undefined);

      targetAsset = undefined;
      */
    }
    else if (event.keyCode == 16){  // Shift

      selectionMode = true;
      multiSelectionMode = true;
    }
  }

  const copyAssetGroup = (historyMode) => {

    var tempAssetArr:any [] = [];
    var selectedAssets = selectedGroup.userData.selected.slice();

    onGroupingEnd();

    if (selectedAssets !== []) {
        var asset;
        for (var i = 0; i < selectedAssets.length; i++) {
            asset = selectedAssets[i];

            const modelKey = asset.name.substring(0, asset.name.lastIndexOf('_'));
            var assetModel = vrAssets.find(element => element.vrModelName == modelKey);

            if(assetModel == undefined)
              return

            var lastIndex = "100";

            if(assetModel.instances != undefined && assetModel.instances.length > 0){

              var lastInstance = assetModel.instances[assetModel.instances.length -1];

              if(lastInstance != undefined)
                lastIndex = lastInstance.key.substring(lastInstance.key.lastIndexOf('_') + 1);
            }

            var index = parseInt(lastIndex) + 1;
            const assetKey = assetModel.vrModelName + '_' + index;

            var assetInstance = copyAsset(asset, assetKey, undefined);

            tempAssetArr.push(assetInstance);


        }

        tempAssetArr.forEach(element => onGrouping(element));
    }



    //targetAsset = selectedGroup;

    if(historyMode == undefined) {
      addCommandHistory("add", targetAsset);
      addCommandHistory("translate", targetAsset);
    }

    transformMode = true;
    selectionHelper.selectionMode = false;

    transformControl.attach( targetAsset );
    transformControl.setMode( "translate" );
  }


  const deleteAssetGroup = (historyMode) => {

    if(historyMode == undefined) {

      addCommandHistory("delete", targetAsset);
      addCommandHistory("translate", targetAsset);
    }

    var tempAssetArr:any [] = [];
    var selectedAssets = selectedGroup.userData.selected.slice();

    transformMode = false;
    selectionHelper.selectionMode = true;

    //onGroupingEnd();

    if (selectedAssets !== []) {
        var asset;
        for (var i = 0; i < selectedAssets.length; i++) {
          asset = selectedAssets[i];

          deleteAsset(asset.name, undefined);
        }

        selectedGroup.position.set( 0, 0, 0);
        selectedGroup.rotation.set( 0, 0, 0);

        selectedGroup.children = [];
        selectedGroup.userData.selected = [];
        selectedGroup.userData.prevParent = [];
        selectedGroup.userData.box = [];

        transformControl.detach();
        targetAsset = undefined;
    }
  }

  const restoreAssetGroup = (selectedAssets) => {

    var tempAssetArr:any [] = [];

    onGroupingEnd();

    if (selectedAssets !== []) {
        var asset;
        for (var i = 0; i < selectedAssets.length; i++) {
            asset = selectedAssets[i];

            var assetInstance = copyAsset(asset, asset.name, "history");

            tempAssetArr.push(assetInstance);

        }

        tempAssetArr.forEach(tempAsset => onGrouping(tempAsset));

        tempAssetArr = [];

    }

    targetAsset = selectedGroup;

    transformControl.attach( targetAsset );
    transformControl.setMode( "translate" );
  }


  const onDocumentKeyUp = (event) => {

    console.log(event.shiftKey, event.keyCode);

    if (event.keyCode == 16){  // shift key

      //onGroupingEnd();
      //transformControl.detach();
      //selectionMode = false;
      multiSelectionMode = false;
    }
  }



  const onDocumentSelectAsset = (event) => {

    var selectedAsset = event.detail.selectedAsset;

    if(selectedAsset != undefined) {

      var asset = scene.getObjectByName( selectedAsset.key );

      if(asset == undefined)
        return;

      targetAsset = asset;
      //transformControl.attach( asset );
      //transformControl.setMode( "translate" );

      updateTransfromValue();

    }
  }


/*
  const onDocumentFocusAsset = (event) => {


    for (var i = assetGroup.children.length - 1; i >= 0; i--) {

      var childAsset:any = assetGroup.children[i];

      if(childAsset.children[0].isMesh) {

        if(Array.isArray(childAsset.children[0].material)) {
          childAsset.children[0].material.forEach(material => {material.transparent = true;
                                                                material.opacity = 0.2;
                                                                material.side = THREE.DoubleSide;
                                                                material.emissive.b = 0;
                                                                material.depthWrite = false;
                                                              });

        } else {
          childAsset.children[0].material.transparent = true;
          childAsset.children[0].material.opacity = 0.2;
          childAsset.children[0].material.side = THREE.DoubleSide;
          childAsset.children[0].material.emissive.b = 0;
          childAsset.children[0].material.depthWrite = false;

        }

      }

    }


    var selectedAsset = event.detail.selectedAsset;

    if(selectedAsset != undefined) {

      var asset:any = scene.getObjectByName( selectedAsset.key );

      if(asset == undefined)
        return;


      if(Array.isArray(asset.children[0].material)) {
        asset.children[0].material.forEach(material => {material.transparent = true;
                                                                material.opacity = 1;
                                                                material.side = THREE.DoubleSide;
                                                                material.emissive.b = 1;
                                                                material.depthWrite = false;
                                                              })

      } else {
        asset.children[0].material.transparent = true;
        asset.children[0].material.opacity = 1;
        asset.children[0].material.side = THREE.DoubleSide;
        asset.children[0].material.emissive.b = 1;
        asset.children[0].material.depthWrite = false;
      }

      onGroupingEnd();
      onGrouping(asset);


      transformControl.attach( targetAsset );
      transformControl.setMode( "translate" );

      updateTransfromValue();

    }

  }

*/
  const onDocumentFocusAsset = (event) => {


    for (var i = assetGroup.children.length - 1; i >= 0; i--) {

      var childAsset:any = assetGroup.children[i];

      childAsset.traverse( function ( child ) {
        if ( child.isMesh ) {
          if(child.currentMaterial == undefined)
            child.currentMaterial = child.material;
        }
      });

      childAsset.traverse( function ( child ) {
        if ( child.isMesh ) {
          child.material = glassMaterial;
        }
      });

      /*
      if(childAsset.children[0].isMesh && childAsset.children[0].currentMaterial == undefined) {

        childAsset.children[0].currentMaterial = childAsset.children[0].material;

      }
      childAsset.children[0].material = glassMaterial;
      */

    }


    var selectedAsset = event.detail.selectedAsset;

    if(selectedAsset != undefined) {

      var asset:any = scene.getObjectByName( selectedAsset.key );

      if(asset == undefined)
        return;

      //asset.children[0].material = asset.children[0].currentMaterial;
      asset.traverse( function ( child ) {
        if ( child.isMesh ) {
          child.material = child.currentMaterial;
        }
      });

      onGroupingEnd();
      onGrouping(asset);

      transformControl.attach( targetAsset );
      transformControl.setMode( "translate" );

      updateTransfromValue();

    }

  }


  const onDocumentDisplayAsset = (event) => {

    var selectedAsset = event.detail.selectedAsset;
    var checked = event.detail.checked;

    if(selectedAsset != undefined) {

      var asset:any = scene.getObjectByName( selectedAsset.key );

      if(asset == undefined)
        return;

      if(checked) {
        asset.children[0].material = asset.children[0].currentMaterial;
      }
      else {
        asset.children[0].currentMaterial = asset.children[0].material;

        asset.children[0].material = hideMaterial;
      }

    }

  }

  const onDocumentSaveAsset = (event) => {

    onGroupingEnd();

    saveAssetToServer();
  }

  const onDocumentAddAsset = (event) => {

    addAsset(event.detail.vrModelName, event.detail.instanceName)
  }

  const onDocumentDeleteAsset = (event) => {

    deleteAsset(event.detail.instanceName, undefined);
  }

  const onDocumentCopyAsset = (event) => {

    copyAsset(event.detail.selectedAsset, event.detail.instanceName, undefined);
  }

  const onDocumentTransformAsset = (event) => {

    transformValueChange(event.detail.mode, event.detail.axis, event.detail.value);
  }

  const onDocumentSnapMode = (event) => {

    console.log("onDocumentSnapMode : " + event.detail.mode);

    snapMode = event.detail.mode;
  }

  const onDocumentAssemblyLevelAsset = (event) => {

    assemblyLevelAsset(event.detail.selectedAsset, event.detail.level)
  }

  const onDocumentAssemblySaveAsset = (event) => {

    saveAssemblyAssetToFile(event.detail.maxLevel);
  }

  const onDocumentInitAssembly = () => {

    for (var i = assetGroup.children.length - 1; i >= 0; i--) {

      var childAsset:any = assetGroup.children[i];

      const vrModelName = childAsset.name.substring(0, childAsset.name.lastIndexOf('_'));
      var assetModel = vrAssets.find(element => element.vrModelName == vrModelName);

      if(assetModel == undefined || assetModel.instances == undefined)
        continue;

      childAsset.traverse( function ( child ) {
        if ( child.isMesh ) {
          if(child.currentMaterial == undefined)
            child.currentMaterial = child.material;
        }
      });

      var assetInstance = assetModel.instances.find(element => element.instanceName == childAsset.name);

      if(assetInstance != undefined) {
        assetInstance.assemblyLevel = 0;

        childAsset.traverse( function ( child ) {
          if ( child.isMesh ) {
            if(child.currentMaterial == undefined)
              child.material = child.currentMaterial;
          }
        });

        //childAsset.children[0].material = childAsset.children[0].currentMaterial;

      }
    }

    var assetList = new Array();

    vrAssets.forEach(vrModel => {
      if(vrModel.instances != undefined && vrModel.instances.length > 0)
        assetList.push(vrModel);
    });

    //setVrAssetsContainer(JSON.parse(JSON.stringify(vrAssets)));

    setRefreshMode(true);
    setVrAssetsContainer(assetList);
  }


  const updateTransfromValue = () => {

    $("#vrEditor_Properties_Px").val(selectedGroup.position.x.toFixed(4));
    $("#vrEditor_Properties_Py").val(selectedGroup.position.y.toFixed(4));
    $("#vrEditor_Properties_Pz").val(selectedGroup.position.z.toFixed(4));

    $("#vrEditor_Properties_Rx").val((selectedGroup.rotation.x * 180/Math.PI).toFixed(4));
    $("#vrEditor_Properties_Ry").val((selectedGroup.rotation.y * 180/Math.PI).toFixed(4));
    $("#vrEditor_Properties_Rz").val((selectedGroup.rotation.z * 180/Math.PI).toFixed(4));

    if(selectedGroup.userData.selected.length > 0)
      $("#vrEditor_Asset_Name").text(selectedGroup.userData.selected[0].name);
    else
      $("#vrEditor_Asset_Name").text('');


    //setTargetInfo({position:selectedGroup.position, rotation:selectedGroup.rotation});

    //checkCollision();

  }


  const checkCollision = () => {

    for (var vertexIndex = 0; vertexIndex < targetAsset.geometry.vertices.length; vertexIndex++) {
        var ray = new THREE.Raycaster( targetAsset.position, targetAsset.geometry.vertices[vertexIndex] );
        var collisionResults = ray.intersectObjects( assetGroup.children, true );
        if ( collisionResults.length > 0 && collisionResults[0].distance < 3)  {
          console.log("collision Object Name : " + collisionResults[0].object.name);
           return true;
        }
    }

    return false;
  }


    //////////////////////////
  	// Auto Moving to Target
  	//////////////////////////

  	// var tempLine: THREE.CatmullRomCurve3 = new THREE.CatmullRomCurve3();
  	// var tempPosition: number = 0;
  	// var moveTargetAsset: THREE.Object3D = new THREE.Object3D() ;
  	// var moveMode: boolean = false;

    let tempLine;
    let moveTargetAsset;
    let moveMode = false;
    let tempPosition = 0;



  	const moveInit = (asset:THREE.Object3D) => {

  		moveTargetAsset = asset;
  		tempPosition = 0;

  		var material = new THREE.LineBasicMaterial({
  			color: 0x0000ff
  		});

  		var points: THREE.Vector3[] = [];
  		points.push( camera.position );
  		points.push( asset.position );

      tempLine = new THREE.CatmullRomCurve3(points)


  		var points2 = tempLine.getPoints(1000);


  		camera.lookAt( asset.position );
  		orbitControl.target = asset.position;

  		moveMode = true;
      //console.log('moveMode1 : ' + moveMode);
  	}


  	const moveToTarget = () => {
      //console.log('moveMode2 : ' + moveMode);

  		if(!moveMode)
  			return;


  		// add up to position for movement
  		tempPosition += 0.0005;

  		// get the point at position
  		var point = new THREE.Vector3();
  		tempLine.getPointAt(tempPosition, point);

  		var distance = camera.position.distanceTo(moveTargetAsset.position);

  		if(distance < 5) {
  			moveMode = false;
        tempLine = null;

        orbitControl.saveState();
        orbitControl.reset();

        setOrbitControlContainer(orbitControl);

  			return;
  		}


  		//orbitControl.zoomIn();
  		camera.position.set(point.x, point.y, point.z);
  		//camera.position.x = point.x;
  		//camera.position.y = point.y;
  		//camera.position.z = point.z;

  	}


  const handleAddAsset = (vrModelName, instanceName) => {
    console.log("vrMart handleAddAsset: instanceName" , instanceName);

    var event = new CustomEvent('add_asset', { detail: {vrModelName: vrModelName, instanceName: instanceName} });

    var element = document.getElementById('vrEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);
  };

  const addAsset = (vrModelName, instanceName) => {
    console.log("vrMall handleAddAsset vrModel : " + vrModelName + ", instanceName" , instanceName);

    var object = vrModelMap.get(vrModelName);

    if(object == undefined && modelList != undefined) {

      const vrModel = modelList.find(vrModel => vrModel.vrModelName == vrModelName)

      if(vrModel != undefined) {

        if(vrModel.modelPath.includes('fbx')) {
          loader.load( vrModel.modelPath, ( object:any ) => {
            vrModelMap.set(vrModel.vrModelName, object);
            cloneAsset(vrModelName, instanceName, object);
          });
        }
        else if(vrModel.modelPath.includes('glb')) {
          gltfLoader.load( vrModel.modelPath, ( object:any ) => {

            object.scene.traverse( function ( child ) {
      				if ( child.isMesh ) {
      					child.castShadow = true;
      					child.receiveShadow = true;
                //child.material.color.set("#1b2a34");
                //child.material.color.copySRGBToLinear(new THREE.Color("#1B2A34"));
                //child.material.color.convertLinearToSRGB();

                //plateColor = child.material.color;
                child.scale.set(100, 100, 100);
      				}
      			} );

            //object.scene.scale.set(100, 100, 100);
            vrModelMap.set(vrModel.vrModelName, object.scene);
            cloneAsset(vrModelName, instanceName, object.scene);
          });
        }
      }
    }
    else {
      cloneAsset(vrModelName, instanceName, object)
    }

  }


  const cloneAsset = (vrModelName, instanceName, object) => {

    var vrInstance = object.clone();

    vrInstance.name = instanceName;
    vrInstance.position.set(0, 0, 0);
    vrInstance.rotation.set(0, 0, 0);
    //vrInstance.scale.set(1, 1, 1);

    assetGroup.add( vrInstance );

    onGroupingEnd();
    onGrouping(vrInstance);

    addCommandHistory("add", targetAsset);
    addCommandHistory("translate", targetAsset);

    updateTransfromValue();

    //targetAsset = vrInstance;
    transformMode = true;
    selectionHelper.selectionMode = false;

    transformControl.attach(targetAsset);
    transformControl.setMode( "translate" );

    var assetModel = vrAssets.find(element => element.vrModelName == vrModelName);

    if(assetModel != undefined) {

      if(assetModel.instances == undefined)
        assetModel.instances = new Array();

      const instanceNode:VrInstance = {
        key: vrInstance.name,
        instanceName: vrInstance.name,
        position: {x:Number(vrInstance.position.x.toFixed(4)),
                   y:Number(vrInstance.position.y.toFixed(4)),
                   z:Number(vrInstance.position.z.toFixed(4))},
        rotation : {_x:Number((vrInstance.rotation.x * 180/Math.PI).toFixed(4)),
                    _y:Number((vrInstance.rotation.y * 180/Math.PI).toFixed(4)),
                    _z:Number((vrInstance.rotation.z * 180/Math.PI).toFixed(4)),
                    _order:'XYZ'},
        scale : {x:Number(vrInstance.scale.x.toFixed(4)),
                 y:Number(vrInstance.scale.y.toFixed(4)),
                 z:Number(vrInstance.scale.z.toFixed(4))},
        color : '0xffffff',
        assemblyLevel : '0'
      };

      assetModel.instances.push(instanceNode);

      var assetList = new Array();

      vrAssets.forEach(vrModel => {
        if(vrModel.instances != undefined && vrModel.instances.length > 0)
          assetList.push(vrModel);
      });

      setRefreshMode(false);
      setVrAssetsContainer(assetList);
    }
  }



  const deleteAsset = (instanceName, historyMode) => {
    console.log("vrMart handleDeleteAsset: instanceName =  " , instanceName);

    var asset = scene.getObjectByName( instanceName );

    if(asset != undefined) {

      transformControl.detach();
      //setTransformControlState(transformControl);

      assetGroup.remove( asset );

    }

    const vrModelName = instanceName.substring(0, instanceName.lastIndexOf('_'));
    var assetModel = vrAssets.find(element => element.vrModelName == vrModelName);

    if(assetModel == undefined || assetModel.instances == undefined)
      return;

    const findIndex= assetModel.instances.findIndex(element => element.instanceName == instanceName);

    if(findIndex > -1) {
      assetModel.instances.splice(findIndex, 1);

      var assetList = new Array();

      vrAssets.forEach(vrModel => {
        if(vrModel.instances != undefined && vrModel.instances.length > 0)
          assetList.push(vrModel);
      });

      //setVrAssetsContainer(JSON.parse(JSON.stringify(vrAssets)));

      setRefreshMode(false);
      setVrAssetsContainer(assetList);

    }

  };


  const copyAsset = (selectedAsset, instanceName, historyMode) => {
    console.log("vrMall copyAsset selectedAsset : " + selectedAsset + ", instanceName" , instanceName);

    //var asset = scene.getObjectByName( selectedAsset.key );
    var asset = selectedAsset;

    if(asset == undefined)
      return;

    var vrInstance = asset.clone();

    vrInstance.name = instanceName;

    assetGroup.add( vrInstance );

    //targetAsset = vrInstance;
    //updateTransfromValue();

    //transformMode = true;

    //transformControl.attach( targetAsset );
    //transformControl.setMode( "translate" );

    const vrModelName = instanceName.substring(0, instanceName.lastIndexOf('_'));
    var assetModel = vrAssets.find(element => element.vrModelName == vrModelName);

    if(assetModel != undefined) {

      if(assetModel.instances == undefined)
        assetModel.instances = new Array();

      const instanceNode:VrInstance = {
        key: vrInstance.name,
        instanceName: vrInstance.name,
        position: {x:Number(vrInstance.position.x.toFixed(4)),
                   y:Number(vrInstance.position.y.toFixed(4)),
                   z:Number(vrInstance.position.z.toFixed(4))},
        rotation : {_x:Number((vrInstance.rotation.x * 180/Math.PI).toFixed(4)),
                    _y:Number((vrInstance.rotation.y * 180/Math.PI).toFixed(4)),
                    _z:Number((vrInstance.rotation.z * 180/Math.PI).toFixed(4)),
                    _order:'XYZ'},
        scale : {x:Number(vrInstance.scale.x.toFixed(4)),
                 y:Number(vrInstance.scale.y.toFixed(4)),
                 z:Number(vrInstance.scale.z.toFixed(4))},
        color : '0xffffff',
        assemblyLevel : '0'
      };

      assetModel.instances.push(instanceNode);


      var assetList = new Array();

      vrAssets.forEach(vrModel => {
        if(vrModel.instances != undefined && vrModel.instances.length > 0)
          assetList.push(vrModel);
      });


      setRefreshMode(false);
      setVrAssetsContainer(assetList);

    }

    return vrInstance;

  };


  const handleSelectAsset =  (selectedAsset: any) => {
          // antd에서 타입을 any로 해놔서 일단, any로 받음. 나머지 로직에서 타입 체크를 차라리 제대로 하자.
    console.log(`vrMart handleSelectChange: ${selectedAsset}`);


    var event = new CustomEvent('select_asset', { detail: {selectedAsset: selectedAsset} });

    var element = document.getElementById('vrEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);


  }

  const handleFocusAsset =  (selectedAsset: any) => {
          // antd에서 타입을 any로 해놔서 일단, any로 받음. 나머지 로직에서 타입 체크를 차라리 제대로 하자.
    console.log(`vrMart handleSelectChange: ${selectedAsset}`);


    var event = new CustomEvent('focus_asset', { detail: {selectedAsset: selectedAsset} });

    var element = document.getElementById('vrEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);


  }

  const handleDisplayAsset = (selectedAsset: any, checked: boolean) => {
          // antd에서 타입을 any로 해놔서 일단, any로 받음. 나머지 로직에서 타입 체크를 차라리 제대로 하자.
    console.log(`vrMart handleDisplayAsset: ${selectedAsset}`, 'checked: ', checked);

    var event = new CustomEvent('display_asset', { detail: {selectedAsset: selectedAsset, checked: checked } });

    var element = document.getElementById('vrEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const handleColorAsset = (assetColor: any) => {
    console.log(`vrMart handleColorAsset: `, 'assetColor: ', assetColor);

    var event = new CustomEvent('color_asset', { detail: {assetColor: assetColor.color} });

    var element = document.getElementById('vrEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);
  }

  const onDocumentColorAsset = (event) => {

    var assetColor = event.detail.assetColor;

    for (var i = selectedGroup.userData.selected.length - 1; i >= 0; i--) {

      var childAsset:any = selectedGroup.userData.selected[i];
/*
      const vrModelName = childAsset.name.substring(0, childAsset.name.lastIndexOf('_'));
      var assetModel = vrAssets.find(element => element.vrModelName == vrModelName);

      if(assetModel == undefined || assetModel.instances == undefined)
        continue;
*/
      if(childAsset.children[0].material.color) {
        childAsset.children[0].material.color.copySRGBToLinear(new THREE.Color(assetColor));
        //childAsset.children[0].material.specular.copySRGBToLinear(new THREE.Color('#333333'));
        childAsset.children[0].material.shininess = 30;

        //console.log("assetColor : " + assetColor + ", childAsset.children[0].material.color : " + childAsset.children[0].material.color.getHex());
      }
    }
  }

  const handleAssemblyLevelAsset = (selectedAsset: any, level: string) => {
    console.log(`vrMart handleAssemblyLevelAsset: ${selectedAsset}`, 'level: ', level);

    var event = new CustomEvent('assembly_level_asset', { detail: {selectedAsset: selectedAsset, level: level} });

    var element = document.getElementById('vrEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }


  const assemblyLevelAsset = (selectedAsset: any, level: string) => {
    console.log(`vrMall assemblyLevelAsset: ${selectedAsset}`, 'level: ', level);

    if(selectedAsset == undefined)
      return;

    const vrModelName = selectedAsset.key.substring(0, selectedAsset.key.lastIndexOf('_'));
    var assetModel = vrAssets.find(element => element.vrModelName == vrModelName);

    if(assetModel == undefined || assetModel.instances == undefined)
      return;

    var assetInstance = assetModel.instances.find(element => element.instanceName == selectedAsset.key);

    if(assetInstance != undefined)
      assetInstance.assemblyLevel = level;
  }


  const handleAssemblyAsset = (startStep: number, endStep: number) => {
    console.log('vrMall handleAssemblyAsset startStep : ', startStep, ', endStep : ', endStep);

    var event = new CustomEvent('assembly_asset', { detail: {startStep: startStep, endStep: endStep} });

    var element = document.getElementById('vrEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);
  }


  const onDocumentAssemblyAsset = (event) => {

    startStep = event.detail.startStep;
    endStep = event.detail.endStep;

    console.log('vrMall assembleyAsset startStep : ', startStep, ', endStep : ', endStep);

    for (var i = assetGroup.children.length - 1; i >= 0; i--) {

      var childAsset:any = assetGroup.children[i];

      const vrModelName = childAsset.name.substring(0, childAsset.name.lastIndexOf('_'));
      var assetModel = vrAssets.find(element => element.vrModelName == vrModelName);

      if(assetModel == undefined || assetModel.instances == undefined)
        continue;

      childAsset.traverse( function ( child ) {
        if ( child.isMesh ) {
          if(child.currentMaterial == undefined)
            child.currentMaterial = child.material;
        }
      });

      var assetInstance = assetModel.instances.find(element => element.instanceName == childAsset.name);

      if(assetInstance != undefined) {

        if(assetInstance.assemblyLevel != undefined) {

          if(Number.parseInt(assetInstance.assemblyLevel) >= startStep && Number.parseInt(assetInstance.assemblyLevel) <= endStep) {
            //childAsset.children[0].material = childAsset.children[0].currentMaterial;

            childAsset.traverse( function ( child ) {
              if ( child.isMesh ) {
                  child.material = child.currentMaterial;
              }
            });
          }
          else {

            childAsset.traverse( function ( child ) {
              if ( child.isMesh ) {
                  child.material = hideMaterial;
              }
            });

            //childAsset.children[0].material = hideMaterial;
          }
        }
        else {
          childAsset.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.material = child.currentMaterial;
            }
          });
          //childAsset.children[0].material = childAsset.children[0].currentMaterial;
        }
      }
    }
  }


  const handleSaveAsset = () => {
    console.log("vrMart handleSaveAsset: ");

    var event = new CustomEvent('save_asset');

    var element = document.getElementById('vrEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }


  const saveAssetToServer = () => {

    console.log("vrMart saveAssetToServer: ");

    var endStep = 0;

    for (var i = assetGroup.children.length - 1; i >= 0; i--) {

      var childAsset:any = assetGroup.children[i];

      const vrModelName = childAsset.name.substring(0, childAsset.name.lastIndexOf('_'));
      var assetModel: any = vrAssets.find(element => element.vrModelName == vrModelName);


      if(assetModel == undefined || assetModel.instances == undefined || assetModel.instances.length == 0 )
        continue;

      var assetInstance = assetModel.instances.find(element => element.instanceName == childAsset.name);

      if(assetInstance != undefined) {

        assetInstance.position.x = Number(childAsset.position.x.toFixed(4));
        assetInstance.position.y = Number(childAsset.position.y.toFixed(4));
        assetInstance.position.z = Number(childAsset.position.z.toFixed(4));

        assetInstance.rotation._x = Number((childAsset.rotation.x * 180/Math.PI).toFixed(4));
        assetInstance.rotation._y = Number((childAsset.rotation.y * 180/Math.PI).toFixed(4));
        assetInstance.rotation._z = Number((childAsset.rotation.z * 180/Math.PI).toFixed(4));

        assetInstance.scale.x = Number(childAsset.scale.x.toFixed(4));
        assetInstance.scale.y = Number(childAsset.scale.y.toFixed(4));
        assetInstance.scale.z = Number(childAsset.scale.z.toFixed(4));

        if(childAsset.children[0].material){
          if(Array.isArray(childAsset.children[0].material)) {
            childAsset.children[0].material.forEach((material:any, index) => {
              if(index == 0)
                assetInstance.color = material.color.getHex();
              else
                assetInstance.color += "," + material.color.getHex();
            });
          }
          else {
            //child.material.color.convertLinearToSRGB();
            assetInstance.color = childAsset.children[0].material.color.getHex();
          }
        }
      }
      else {

        const instanceNode:VrInstance = {
          key: childAsset.name,
          instanceName: childAsset.name,
          position: {x:Number(childAsset.position.x.toFixed(4)),
                     y:Number(childAsset.position.y.toFixed(4)),
                     z:Number(childAsset.position.z.toFixed(4))},
          rotation : {_x:Number((childAsset.rotation.x * 180/Math.PI).toFixed(4)),
                      _y:Number((childAsset.rotation.y * 180/Math.PI).toFixed(4)),
                      _z:Number((childAsset.rotation.z * 180/Math.PI).toFixed(4)),
                      _order:'XYZ'},
          scale : {x:Number(childAsset.scale.x.toFixed(4)),
                   y:Number(childAsset.scale.y.toFixed(4)),
                   z:Number(childAsset.scale.z.toFixed(4))},
          color : '0xffffff',
          assemblyLevel : '0'
        };

        assetModel.instances.push(instanceNode);
      }
    }


    var assetList = new Array();

    vrAssets.forEach(vrModel => {
      if(vrModel.instances != undefined && vrModel.instances.length > 0)
        assetList.push(vrModel);
    });

    console.log("vrMart saveAssetToServer: ",JSON.stringify(assetList));

    vrMallInfo.vrModels = assetList;

    let url = SOPOONG_URL + SHOP_URL + '/vrMallAssetUpdate.do';

    fetch( url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(vrMallInfo)
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


  const handleAssemblySaveAsset = (maxLevel) => {
    console.log("vrMart handleAssemblySaveAsset: ");

    var event = new CustomEvent('save_assembly_asset', { detail: {maxLevel: maxLevel} });

    var element = document.getElementById('vrEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const handleInitAssembly = () => {
    console.log("vrMart handleInitAssembly: ");

    var event = new CustomEvent('init_assembly', { });

    var element = document.getElementById('vrEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const saveAssemblyAssetToFile = (maxLevel) => {


    var assemblyArr = new Array(maxLevel + 1);

    console.log('vrMall saveAssemblyAssetToFile maxLevel : ', maxLevel);

    for (var i = assetGroup.children.length - 1; i >= 0; i--) {

      var childAsset:any = assetGroup.children[i];

      var vrModelName = childAsset.name.substring(0, childAsset.name.lastIndexOf('_'));



      var assetModel = vrAssets.find(element => element.vrModelName == vrModelName);

      if(assetModel == undefined || assetModel.instances == undefined)
        continue;


      var assetInstance = assetModel.instances.find(element => element.instanceName == childAsset.name);

      if(assetInstance != undefined) {


        if(childAsset.children[0].material){
          if(Array.isArray(childAsset.children[0].material)) {
            childAsset.children[0].material.forEach((material:any, index) => {
              var colorInfo = colorMap.get(material.color.getHex());

              if(colorInfo)
                vrModelName += "_" + colorInfo.id + "." + colorInfo.title;
              else
                vrModelName += "_#" + material.color.getHexString();
            });
          }
          else {
            var colorInfo = colorMap.get(childAsset.children[0].material.color.getHex());

            if(colorInfo)
              vrModelName += "_" + colorInfo.id + "." + colorInfo.title;
            else
              vrModelName += "_#" + childAsset.children[0].material.color.getHex();
          }

        }


        if(assetInstance.assemblyLevel != undefined) {

          var assemblyMap = assemblyArr[parseInt(assetInstance.assemblyLevel)];
          if( assemblyMap == undefined)
            assemblyMap = new Array();

          var modelCount = assemblyMap[vrModelName];

          if(modelCount == undefined)
            modelCount = 0;

          modelCount ++;

          assemblyMap[vrModelName] = modelCount;

          assemblyArr[parseInt(assetInstance.assemblyLevel)] = assemblyMap;

        }
      }
    }

    var assemblySaveData = "";

    for(var j = 0; j <= endStep ; j++) {

      assemblySaveData += j ;

      var assemblyMap = assemblyArr[j];
      for (const key in assemblyMap) {
        assemblySaveData += "," + key + "," + assemblyMap[key];
      }

      assemblySaveData += "\n";
    }

    console.log('assemblySaveData : ' + assemblySaveData);

    var blob = new Blob([assemblySaveData], { type: "text/csv;charset=utf-8" });
		var url = URL.createObjectURL(blob);
    saveFile(url, "assemblyAsset.csv");

  }



  const handleControlModeChange =  (controlMode: string) => {

    const mode = controlMode;
    console.log(`vrMart controlMode: ${mode}`, transformControlContainer.getMode());

    transformControlContainer.setMode( mode );

  }


  const handleTransformValueChange =  (mode: string, axis: string, value: number) => {

    console.log("handleTransformValueChange start")

    var event = new CustomEvent('transform_asset', { detail: {mode: mode, axis: axis, value: value} });

    var element = document.getElementById('vrEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const handleSnapModeChange =  (mode: string) => {

    console.log("handleTransformValueChange start")

    var event = new CustomEvent('snap_mode', { detail: {mode: mode} });

    var element = document.getElementById('vrEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const transformValueChange =  (mode: string, axis: string, value: number) => {

    console.log("transformValueChange start");

    if(isNaN(value))
      return;

    if(mode == "position") {
      if(axis == "x")
        targetAsset.position.set(value, targetAsset.position.y, targetAsset.position.z);
      else if(axis == "y")
        targetAsset.position.set(targetAsset.position.x, value, targetAsset.position.z);
      else if(axis == "z")
        targetAsset.position.set(targetAsset.position.x, targetAsset.position.y, value);
    }
    else if(mode == "rotation") {
      if(axis == "x")
        targetAsset.rotation.set(value * (Math.PI/180), targetAsset.rotation.y, targetAsset.rotation.z);
      else if(axis == "y")
        targetAsset.rotation.set(targetAsset.rotation.x, value * (Math.PI/180), targetAsset.rotation.z);
      else if(axis == "z")
        targetAsset.rotation.set(targetAsset.rotation.x, targetAsset.rotation.y, value * (Math.PI/180));
    }
    else if(mode == "scale") {
      if(axis == "x")
        targetAsset.scale.set(value * 1, targetAsset.scale.y, targetAsset.scale.z);
      else if(axis == "y")
        targetAsset.scale.set(targetAsset.scale.x, value * 1, targetAsset.scale.z);
      else if(axis == "z")
        targetAsset.scale.set(targetAsset.scale.x, targetAsset.scale.y, value * 1);
    }


    addCommandHistory("translate", targetAsset);


    updateTransfromValue();

  }

  const handleZoomInOut = (value) => {

    //console.log('zoom value : ' + value);

    if(value < 0)
      orbitControlContainer.zoomOut();
    else if(value > 0)
      orbitControlContainer.zoomIn();

  }


  const handleSettingBackground =  (mode: boolean) => {

    console.log("handleTransformValueChange start")

    var event = new CustomEvent('setting_background', { detail: {mode: mode} });

    var element = document.getElementById('vrEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentSettingBackground = (event) => {

    var mode = event.detail.mode;

    console.log('vrMall setting background mode : ', mode);

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

    var element = document.getElementById('vrEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentSaveAsImage = (event) => {

      var imgData, imgNode;
      var strDownloadMime = "image/octet-stream";

      try {
          var strMime = "image/jpg";
          imgData = renderer.domElement.toDataURL(strMime);

          saveFile(imgData.replace(strMime, strDownloadMime), "sopoong.jpg");

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

    var element = document.getElementById('vrEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const handleExportToGltf = () => {

    console.log("handleExportToGltf start")

    var event = new CustomEvent('export_gltf');

    var element = document.getElementById('vrEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }


  const handleSettingInfo = (antialias: boolean, pixelRatio: number, outline: boolean) => {

    console.log("handleSettingInfo start")

    var event = new CustomEvent('setting_info', { detail: {antialias: antialias, pixelRatio: pixelRatio, outline: outline} });

    var element = document.getElementById('vrEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentSettingInfo = (event) => {

    var antialias = event.detail.antialias;
    var pixelRatio = event.detail.pixelRatio;
    outline = event.detail.outline;

    console.log("pixelRatio : " + pixelRatio);



    renderer.setPixelRatio( window.devicePixelRatio * pixelRatio );

    var canvasWidth = $('#vrEditor_vrCanvas').width();
 		var canvasHeight = $('#vrEditor_vrCanvas').height() ;

 		renderer.setSize( canvasWidth, canvasHeight );

    renderVr();
    //renderer.antialias = antialias;
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

 		var canvasWidth = $('#vrEditor_vrGizmoCanvas').width();
 		var canvasHeight = $('#vrEditor_vrGizmoCanvas').height() ;

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

    var gridHelper: any = new THREE.GridHelper( 1000, 1000, 0x000000, 0x000000 );
    gridHelper.material.opacity = 0.1;
    gridHelper.material.depthWrite = false;
    gridHelper.material.transparent = true;
    //scene.add( gridHelper );


    let  groundTexture = textureLoader.load( './images/legomall/background/baseplate.png');

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


    let  backgroundTexture = textureLoader.load( './images/legomall/background/default_background.jpg');

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
    fbxLoader.load( './images/legomall/models/gizmo.fbx', ( gizmoObject:any ) => {
                                                                                  gizmoTarget = gizmoObject;
                                                                                  gizmoTarget.position.set(0,0,0);
                                                                                  gizmoTarget.scale.set(1.1, 1.1, 1.1);
                                                                                  gizmoAssetGroup.add(gizmoObject);
                                                                                });

    $('#vrEditor_vrGizmoCanvas').on("mousemove", onDocumentGizmoMouseMove);
    $('#vrEditor_vrGizmoCanvas').on("mouseup", onDocumentGizmoMouseUp);

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
    console.log('VrMallEditor onDocumentGizmoMouseMove start');

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

    console.log( 'VrMallEditor onDocumentGizmoMouseUp start' );

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

    return (<div ref={myRef} id="vrEditor_vrCanvas" style={{height:'100vh'}}>
                <VrEditorPropertyPanel
                                    onControlModeChange={handleControlModeChange}
                                    onTransformValueChange={handleTransformValueChange}
                                    onSnapModeChange={handleSnapModeChange}
                > </VrEditorPropertyPanel>
                <div ref={myGizmoRef} id="vrEditor_vrGizmoCanvas" style={{position: 'absolute', height:'100px', width:'100px', opacity: 1 }}>
                </div>
            </div>);
  }


  return (
              <Row gutter={[0,0]} style={{ position: 'fixed', top: '0px', left:'0px', bottom: '0px',  width:'100vw', height:'100vh', opacity: '1' }} >
                <Col xxl={19} xl={18} lg={16} md={14} sm={24}>
                  { getCanvase() }
                </Col>

                <Col xxl={5} xl={6} lg={8} md={10} sm={24} style={{height:'100vh'}}>
                    <VrEditorListPanel
                                        vrModelList={vrModelList}
                                        vrAssets={vrAssetsContainer}
                                        refreshMode={refreshMode}
                                        colorDataList={colorDataList}
                                        onAddAsset={handleAddAsset}
                                        onSaveAsset={handleSaveAsset}
                                        onSelectAsset={handleSelectAsset}
                                        onFocusAsset={handleFocusAsset}
                                        onDisplayAsset={handleDisplayAsset}
                                        onColorAsset={handleColorAsset}
                                        onAssemblyLevelAsset={handleAssemblyLevelAsset}
                                        onTransformValueChange={handleTransformValueChange}
                                        onAssemblyAsset={handleAssemblyAsset}
                                        onAssemblySaveAsset={handleAssemblySaveAsset}
                                        onInitAssembly={handleInitAssembly}
                                        onBackground={handleSettingBackground}
                                        onSaveAsImage={handleSaveAsImage}
                                        onSettingInfo={handleSettingInfo}
                                        onExportToStl={handleExportToStl}
                                        onExportToGltf={handleExportToGltf}
                    > </VrEditorListPanel>
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
              </Row>

      );



};
