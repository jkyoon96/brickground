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
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';


import { ModalManager} from 'react-dynamic-modal';
import $ from 'jquery';

import { InfoModal, SnapshotImageEditorDialog, ThumbImageEditorDialog } from 'components';
import { SOPOONG_URL, SHOP_URL, SHOP_ID, storageService } from 'common';

import { CreationEditorPropertyPanel, CreationEditorListPanel, CreationSetNameDialog } from '.';

declare global {
  interface Window {
    IMP: any;
  }
}


/**
 * @description 상품 목록 페이지
 */

export const CreationEditorView = (props) => {


  const [vrAssetsContainer, setVrAssetsContainer ] = useState<any[]>([]);
  const [assetGroup, setAssetGroup] = useState<THREE.Group>(new THREE.Group());
  const [vrModelList, setVrModelList] = useState<any[]>([]);
  const [refreshMode, setRefreshMode] = useState<boolean>(true);

  const [visibleSaveConfirm, setVisibleSaveConfirm] = useState<boolean>(false);
  const [saveResult, setSaveResult] = useState<string>('');
  const [cameraContainer, setCameraContainer] = useState<any>({});

  const [sceneState, setSceneState] = useState<any>({});
  const [transformControlContainer, setTransformControlContainer] = useState<any>({});
  const [orbitControlContainer, setOrbitControlContainer] = useState<any>({});
  const [selectedAsset, setSelectedAsset] = useState<any>({});

  const [targetInfo, setTargetInfo] = useState<any>({});


  const [imageData, setImageData] = useState<any>({});
  const [creationName, setCreationName] = useState<string>('');
  const [setName, setSetName] = useState<string>('45678');
  const [setNameTitle, setSetNameTitle] = useState<string>('스파이크 프라임 코어 세트');
  const [visible, setVisible] = useState<number>(1);
  const [coverImage, setCoverImage] = useState<string>('./images/creation.jpg');
  const [creation, setCreation] = useState<any>({});

  const [visibleCreationSetNameConfirm, setVisibleCreationSetNameConfirm] = useState<boolean>(false);
  const [visibleSnapshotImageEditorConfirm, setVisibleSnapshotImageEditorConfirm] = useState<boolean>(false);
  const [visibleThumbImageEditorConfirm, setVisibleThumbImageEditorConfirm] = useState<boolean>(false);
  const [visibleAlarmConfirm, setVisibleAlarmConfirm] = useState<boolean>(false);
  const [alarmMessage, setAlarmMessage] = useState<string>('');

  const [lightColor, setLightColor] = useState<string>('#FFFFFFF');
  const [lightIntensity, setLightIntensity] = useState<number>(0.5);


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

  let scaleRatio;
  let modelList;

  let directionalLight1, directionalLight2, directionalLight3, directionalLight4;

  useEffect(() => {

    $('#MainHeader').hide();
    $('#MainFooter').hide();

    initVrControls();
    initEnvironment(undefined, undefined, undefined, undefined);

    if(props.match.params.creationId > 0)
      getCreationData();
    else
      setVisibleCreationSetNameConfirm(true);

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
     }


  }, [props.match.params.creationId]);


  const getCreationData = () => {

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

                      if(data.setNames == '2000471')
                        setSetNameTitle('BricQ 모션 에센셜 개인 학습 키트');
                      else if(data.setNames == '2000470')
                        setSetNameTitle('BricQ 모션 프라임 개인 학습 키트');
                      else if(data.setNames == '45401')
                        setSetNameTitle('BricQ 모션 에센셜 세트');
                      else if(data.setNames == '45400')
                        setSetNameTitle('BricQ 모션 프라임 세트');
                      else if(data.setNames == '45678')
                        setSetNameTitle('스파이크 프라임 코어 세트');
                      else if(data.setNames == '51515')
                        setSetNameTitle('로봇 인벤터 세트');
                      else if(data.setNames == '45544')
                        setSetNameTitle('마인드스톰 EV3');
                      else if(data.setNames == '45678,45680')
                        setSetNameTitle('스파이크 프라임 코어 + 확장 세트');
                      else if(data.setNames == '45544,45560')
                        setSetNameTitle('마인드스톰 EV3 코어 + 확장 세트');


                      var vrAssetList = JSON.parse(data.vrModels);
                      console.log('vrAssetList : ', vrAssetList);
                      setVrObject(vrAssetList);

                      //setVrAssets(vrAssetList);

                      initVrModels(vrAssetList, data.setNames);

                      if(data.lightColor != null) {

                        setLightColor(data.lightColor);

                        var color = new THREE.Color(data.lightColor);
                        directionalLight1.color = color;
                        directionalLight2.color = color;
                        directionalLight3.color = color;
                        directionalLight4.color = color;
                      }

                      if(data.lightIntensity != null) {

                        setLightIntensity(data.lightIntensity);
                        var intensity = parseFloat(data.lightIntensity);
                        directionalLight1.intensity = intensity;
                        directionalLight2.intensity = intensity;
                        directionalLight3.intensity = intensity;
                        directionalLight4.intensity = intensity;
                      }

                    })
      .catch(err => console.log(err));

  };


  // VR 초기화
  const initVrControls = () => {

    renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true, antialias: true});

 		renderer.setPixelRatio( window.devicePixelRatio * 1 );

 		var canvasWidth = $('#creationEditor_vrCanvas').width();
 		var canvasHeight = $('#creationEditor_vrCanvas').height() ;

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

		directionalLight1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
		directionalLight1.position.set( 1, 1, -1 ).normalize();
		scene.add( directionalLight1 );

    directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
		directionalLight2.position.set( 1, 1, 1 ).normalize();
		scene.add( directionalLight2 );


    directionalLight3 = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight3.position.set( -1, 1, -1 ).normalize();
    scene.add( directionalLight3 );

    directionalLight4 = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight4.position.set( 1, 1, -1 ).normalize();
    scene.add( directionalLight4 );





 	    //////////////////////sky end /////////////////////////////////


    const htmlDivElement = myRef.current;
    if(htmlDivElement) {
     htmlDivElement.insertBefore(renderer.domElement, htmlDivElement.firstChild);
    }

    animate();


    var sourceUrl = "./images/smartfarm/prefabs/env.fbx";



    var mapUrl = "./images/brickground/textures/clamp_base.jpg";
    var mapTexture = textureLoader.load(mapUrl)
    mapTexture.wrapS = THREE.RepeatWrapping;
    mapTexture.wrapT = THREE.RepeatWrapping;
    mapTexture.repeat.x = 1/10;
    mapTexture.repeat.y = 1/10;

    var normalMap = textureLoader.load( "./images/brickground/textures/clamp_normal.png" );
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


    $('#creationEditor_vrCanvas').on("mousedown", onDocumentMouseDown);
    $('#creationEditor_vrCanvas').on("mousemove", onDocumentMouseMove);
    $('#creationEditor_vrCanvas').on("mouseup", onDocumentMouseUp);
    //$('#creationEditor_vrCanvas').on("click", onDocumentMouseClick);
    $('#creationEditor_vrCanvas').on("dblclick", onDocumentMouseDblClick);
    $('#creationEditor_vrCanvas').on("init_vrmodels", onDocumentInitVrModels);
    $('#creationEditor_vrCanvas').on("select_asset", onDocumentSelectAsset);
    $('#creationEditor_vrCanvas').on("save_asset", onDocumentSaveAsset);
    $('#creationEditor_vrCanvas').on("add_asset", onDocumentAddAsset);
    $('#creationEditor_vrCanvas').on("delete_asset", onDocumentDeleteAsset);
    $('#creationEditor_vrCanvas').on("copy_asset", onDocumentCopyAsset);
    $('#creationEditor_vrCanvas').on("transform_asset", onDocumentTransformAsset);
    $('#creationEditor_vrCanvas').on("snap_mode", onDocumentSnapMode);
    $('#creationEditor_vrCanvas').on("focus_asset", onDocumentFocusAsset);
    $('#creationEditor_vrCanvas').on("display_asset", onDocumentDisplayAsset);
    $('#creationEditor_vrCanvas').on("assembly_level_asset", onDocumentAssemblyLevelAsset);
    $('#creationEditor_vrCanvas').on("assembly_asset", onDocumentAssemblyAsset);
    $('#creationEditor_vrCanvas').on("save_assembly_asset", onDocumentAssemblySaveAsset);
    $('#creationEditor_vrCanvas').on("init_assembly", onDocumentInitAssembly);
    $('#creationEditor_vrCanvas').on("setting_background", onDocumentSettingBackground);
    $('#creationEditor_vrCanvas').on("save_image", onDocumentSaveAsImage);
    $('#creationEditor_vrCanvas').on("save_thumb_image", onDocumentSaveAsThumbImage);
    $('#creationEditor_vrCanvas').on("setting_info", onDocumentSettingInfo);
    $('#creationEditor_vrCanvas').on("export_stl", onDocumentExportToStl);
    $('#creationEditor_vrCanvas').on("export_gltf", onDocumentExportToGltf);
    $('#creationEditor_vrCanvas').on("light_color", onDocumentLightColor);
    $('#creationEditor_vrCanvas').on("light_intensity", onDocumentLightIntensity);

    $('#creationEditor_vrCanvas').on("keydown", onDocumentKeyDown);
    $('#creationEditor_vrCanvas').on("keyup", onDocumentKeyUp);


    // document.addEventListener( 'keydown', onDocumentKeyDown, false );
    // document.addEventListener( 'keyup', onDocumentKeyUp, false );

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
		scene.add( groundMesh );


    backgroundColor = new THREE.Color( 0xdeebed );

    if(backgroundPath != undefined)
      backgroundTexture = textureLoader.load( backgroundPath);
    else
      backgroundTexture = textureLoader.load( './images/brickground/background/default_background.jpg');
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

                      var normalMap = textureLoader.load( "./images/brickground/textures/clamp_normal.png" );
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

                        /*

                        loader.load( vrModel.modelPath, ( object:any ) => {

                          //vrModelMap.set(vrModel.vrModelName, object)
                        });
                        */
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

    if(vrAssetList == null)
      return;

    vrAssetList.forEach(vrAsset => {

      loader.load( vrAsset.modelPath, ( object:any ) => {


        object.traverse( function ( child ) {

          if ( child.isMesh ) {
            child.castShadow = true;
            child.receiveShadow = true;

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
    });

    setSceneState(scene);

  }

  const onWindowResize = () => {

		var canvasWidth = $('#creationEditor_vrCanvas').width() - 2;
		var canvasHeight = $('#creationEditor_vrCanvas').height();
    // var canvasWidth = window.innerWidth;
		// var canvasHeight = window.innerHeight;

		//camera.aspect = window.innerWidth / window.innerHeight;
		camera.aspect = canvasWidth / canvasHeight;
		camera.updateProjectionMatrix();

		//renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setSize( canvasWidth, canvasHeight );


    $("#creationEditor_vrGizmoCanvas").css("top", $('html, body').offset().top + 30);
    $("#creationEditor_vrGizmoCanvas").css("left", $('html, body').offset().left + $('#creationEditor_vrCanvas').outerWidth() - 130);

		//renderVr();

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

/*
  const addCommandHistory = (mode, group) => {

    var assets: any [] = [];

    if (selectedGroup.userData.selected.length == 0)
      return;

    var selectedAssets = selectedGroup.userData.selected.slice();

    //console.log("onGroupingEnd before first name : " + selectedAssets[0].name  + "objectClone x : " + selectedAssets[0].position.x + " , y : " + selectedAssets[0].position.y + " , z : " + selectedAssets[0].position.z);
    onGroupingEnd();
    //console.log("onGroupingEnd after first name : " + selectedAssets[0].name  + "objectClone x : " + selectedAssets[0].position.x + " , y : " + selectedAssets[0].position.y + " , z : " + selectedAssets[0].position.z);

    if (selectedAssets !== []) {
      for (var i = 0; i < selectedAssets.length; i++) {
        var asset = selectedAssets[i].clone();
        assets.push(asset);

        onGrouping(selectedAssets[i]);
      }
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
      editorHistory.push({mode:"add", assets:group});

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
*/

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
    console.log( 'CreationMallEditor onGrouping start' );

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
    console.log( 'CreationMallEditor onGroupingRelease start' );

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

      console.log( 'CreationMallEditor onGroupingEnd start' );

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

        if(event.ctrlKey && intersects.length > (i + 1) && intersects[i + 1].object != undefined && intersects[i + 1].object.parent != undefined) {
          name = intersects[i + 1].object.parent.name;
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

    console.log( 'CreationMallEditor onDocumentMouseDown start' );

    if (!transformMode) {

      var canvasWidth = $('#creationEditor_vrCanvas').width() - 2;
      var canvasHeight = $('#creationEditor_vrCanvas').height();

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

      if(snapMode == "brick" && transformControl.axis == "Y")
        transformControl.setTranslationSnap(0.32);
      else
        transformControl.setTranslationSnap(0.4);

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

    console.log( 'CreationMallEditor onDocumentMouseUp start' );

    if( event.button == 0) {

      if(transformMode) {

        if(targetAsset != undefined) {

          addCommandHistory("translate", targetAsset);
          return;
        }
      }

      //pointerUp(event);

      var canvasWidth = $('#creationEditor_vrCanvas').width() - 2;
      var canvasHeight = $('#creationEditor_vrCanvas').height();

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

            onGrouping(allSelected[ i ].parent);

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

            onGroupingRelease(allSelected[ i ].parent);

          }

    		}

      }
    }

  }


  const onDocumentMouseDblClick = (event) => {

    console.log( 'CreationMallEditor onDocumentMouseDblClick start' );

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
        childAsset.children[0].currentMaterial = childAsset.children[0].material;


      var assetInstance = assetModel.instances.find(element => element.instanceName == childAsset.name);

      if(assetInstance != undefined) {

        if(assetInstance.assemblyLevel != undefined) {

          if(Number.parseInt(assetInstance.assemblyLevel) >= startStep && Number.parseInt(assetInstance.assemblyLevel) <= endStep) {
            childAsset.children[0].material = childAsset.children[0].currentMaterial;
          }
          else {
            childAsset.children[0].material = hideMaterial;
          }
        }
        else {
          childAsset.children[0].material = childAsset.children[0].currentMaterial;
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
            asset.children[0].currentMaterial = asset.children[0].material;
            asset.children[0].material = hideMaterial;
            //asset.visible = false;
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

      if(childAsset.children[0].isMesh && childAsset.children[0].currentMaterial == undefined) {

        childAsset.children[0].currentMaterial = childAsset.children[0].material;

      }

      childAsset.children[0].material = glassMaterial;

    }


    var selectedAsset = event.detail.selectedAsset;

    if(selectedAsset != undefined) {

      var asset:any = scene.getObjectByName( selectedAsset.key );

      if(asset == undefined)
        return;

      asset.children[0].material = asset.children[0].currentMaterial;

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

    saveAssetToServer(event.detail.creationInfo);
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

      if(childAsset.children[0].currentMaterial == undefined)
        childAsset.children[0].currentMaterial = childAsset.children[0].material;


      var assetInstance = assetModel.instances.find(element => element.instanceName == childAsset.name);

      if(assetInstance != undefined) {
        assetInstance.assemblyLevel = 0;
        childAsset.children[0].material = childAsset.children[0].currentMaterial;

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

    $("#creationEditor_Properties_Px").val(selectedGroup.position.x.toFixed(4));
    $("#creationEditor_Properties_Py").val(selectedGroup.position.y.toFixed(4));
    $("#creationEditor_Properties_Pz").val(selectedGroup.position.z.toFixed(4));

    $("#creationEditor_Properties_Rx").val((selectedGroup.rotation.x * 180/Math.PI).toFixed(4));
    $("#creationEditor_Properties_Ry").val((selectedGroup.rotation.y * 180/Math.PI).toFixed(4));
    $("#creationEditor_Properties_Rz").val((selectedGroup.rotation.z * 180/Math.PI).toFixed(4));

    if(selectedGroup.userData.selected.length > 0)
      $("#creationEditor_Asset_Name").text(selectedGroup.userData.selected[0].name);
    else
      $("#creationEditor_Asset_Name").text('');


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


  const handleVrModels = (setName) => {
    console.log("creation handleVrModels: setName" , setName);

    var event = new CustomEvent('init_vrmodels', { detail: {setName: setName} });

    var element = document.getElementById('creationEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);
  };


  const onDocumentInitVrModels = (event) => {

    initVrModels(null, event.detail.setName);

  }


  const handleAddAsset = (vrModelName, instanceName) => {
    console.log("creation handleAddAsset: instanceName" , instanceName);

    var event = new CustomEvent('add_asset', { detail: {vrModelName: vrModelName, instanceName: instanceName} });

    var element = document.getElementById('creationEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);
  }

  const addAsset = (vrModelName, instanceName) => {
    console.log("creation handleAddAsset vrModel : " + vrModelName + ", instanceName" , instanceName);

    var object = vrModelMap.get(vrModelName);

    if(object == undefined && modelList != undefined) {

      const vrModel = modelList.find(vrModel => vrModel.vrModelName == vrModelName)

      if(vrModel != undefined) {

        loader.load( vrModel.modelPath, ( object:any ) => {
          vrModelMap.set(vrModel.vrModelName, object);
          cloneAsset(vrModelName, instanceName, object);
        });
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
    vrInstance.scale.set(1, 1, 1);

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

      const instanceNode:any = {
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
    console.log("creation handleDeleteAsset: instanceName =  " , instanceName);

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
    console.log("creation copyAsset selectedAsset : " + selectedAsset + ", instanceName" , instanceName);

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

      const instanceNode:any = {
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
    console.log(`creation handleSelectChange: ${selectedAsset}`);


    var event = new CustomEvent('select_asset', { detail: {selectedAsset: selectedAsset} });

    var element = document.getElementById('creationEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);


  }

  const handleFocusAsset =  (selectedAsset: any) => {
          // antd에서 타입을 any로 해놔서 일단, any로 받음. 나머지 로직에서 타입 체크를 차라리 제대로 하자.
    console.log(`creation handleSelectChange: ${selectedAsset}`);


    var event = new CustomEvent('focus_asset', { detail: {selectedAsset: selectedAsset} });

    var element = document.getElementById('creationEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);


  }

  const handleDisplayAsset = (selectedAsset: any, checked: boolean) => {
          // antd에서 타입을 any로 해놔서 일단, any로 받음. 나머지 로직에서 타입 체크를 차라리 제대로 하자.
    console.log(`creation handleDisplayAsset: ${selectedAsset}`, 'checked: ', checked);

    var event = new CustomEvent('display_asset', { detail: {selectedAsset: selectedAsset, checked: checked } });

    var element = document.getElementById('creationEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const handleColorAsset = (selectedModel: any, color: string) => {
          // antd에서 타입을 any로 해놔서 일단, any로 받음. 나머지 로직에서 타입 체크를 차라리 제대로 하자.
    console.log(`creation handleColorAsset: ${selectedModel}`, 'color: ', color);

    var vrMaterial = vrMaterialMap.get(selectedModel.key)

    if(vrMaterial == undefined)
      return;

    vrMaterial.color.set(color);

  }

  const handleAssemblyLevelAsset = (selectedAsset: any, level: string) => {
    console.log(`creation handleAssemblyLevelAsset: ${selectedAsset}`, 'level: ', level);

    var event = new CustomEvent('assembly_level_asset', { detail: {selectedAsset: selectedAsset, level: level} });

    var element = document.getElementById('creationEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }


  const assemblyLevelAsset = (selectedAsset: any, level: string) => {
    console.log(`creation assemblyLevelAsset: ${selectedAsset}`, 'level: ', level);

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
    console.log('creation handleAssemblyAsset startStep : ', startStep, ', endStep : ', endStep);

    var event = new CustomEvent('assembly_asset', { detail: {startStep: startStep, endStep: endStep} });

    var element = document.getElementById('creationEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);
  }


  const onDocumentAssemblyAsset = (event) => {

    startStep = event.detail.startStep;
    endStep = event.detail.endStep;

    console.log('creation assembleyAsset startStep : ', startStep, ', endStep : ', endStep);

    for (var i = assetGroup.children.length - 1; i >= 0; i--) {

      var childAsset:any = assetGroup.children[i];

      const vrModelName = childAsset.name.substring(0, childAsset.name.lastIndexOf('_'));
      var assetModel = vrAssets.find(element => element.vrModelName == vrModelName);

      if(assetModel == undefined || assetModel.instances == undefined)
        continue;

      if(childAsset.children[0].currentMaterial == undefined)
        childAsset.children[0].currentMaterial = childAsset.children[0].material;


      var assetInstance = assetModel.instances.find(element => element.instanceName == childAsset.name);

      if(assetInstance != undefined) {

        if(assetInstance.assemblyLevel != undefined) {

          if(Number.parseInt(assetInstance.assemblyLevel) >= startStep && Number.parseInt(assetInstance.assemblyLevel) <= endStep) {
            childAsset.children[0].material = childAsset.children[0].currentMaterial;
            //childAsset.visible = true;

          }
          else {
            childAsset.children[0].material = hideMaterial;
            //childAsset.visible = false;
          }
        }
        else {
          childAsset.children[0].material = childAsset.children[0].currentMaterial;
          //childAsset.visible = true;
        }

      }
    }

  }


  const handleSaveAsset = (data) => {
    console.log("creation handleSaveAsset: ");

    var event = new CustomEvent('save_asset', {detail: {creationInfo:data} });

    var element = document.getElementById('creationEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }


  const saveAssetToServer = (creationInfo) => {

    console.log("creation saveAssetToServer: ");

    var endStep = 0;

    for (var i = assetGroup.children.length - 1; i >= 0; i--) {

      var childAsset = assetGroup.children[i];

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

      }
      else {

        const instanceNode:any = {
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

    console.log("creation saveAssetToServer: ",JSON.stringify(assetList));

    creationInfo.vrModels = assetList;

    let url = SOPOONG_URL + SHOP_URL + '/creationAssetUpdate.do';

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


  const handleAssemblySaveAsset = (maxLevel) => {
    console.log("creation handleAssemblySaveAsset: ");

    var event = new CustomEvent('save_assembly_asset', { detail: {maxLevel: maxLevel} });

    var element = document.getElementById('creationEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const handleInitAssembly = () => {
    console.log("creation handleInitAssembly: ");

    var event = new CustomEvent('init_assembly', { });

    var element = document.getElementById('creationEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const saveAssemblyAssetToFile = (maxLevel) => {


    var assemblyArr = new Array(maxLevel + 1);

    console.log('creation saveAssemblyAssetToFile maxLevel : ', maxLevel);

    for (var i = assetGroup.children.length - 1; i >= 0; i--) {

      var childAsset:any = assetGroup.children[i];

      const vrModelName = childAsset.name.substring(0, childAsset.name.lastIndexOf('_'));
      var assetModel = vrAssets.find(element => element.vrModelName == vrModelName);

      if(assetModel == undefined || assetModel.instances == undefined)
        continue;


      var assetInstance = assetModel.instances.find(element => element.instanceName == childAsset.name);

      if(assetInstance != undefined) {

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
    console.log(`creation controlMode: ${mode}`, transformControlContainer.getMode());

    transformControlContainer.setMode( mode );

  }


  const handleTransformValueChange =  (mode: string, axis: string, value: number) => {

    console.log("handleTransformValueChange start")

    var event = new CustomEvent('transform_asset', { detail: {mode: mode, axis: axis, value: value} });

    var element = document.getElementById('creationEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const handleSnapModeChange =  (mode: string) => {

    console.log("handleTransformValueChange start")

    var event = new CustomEvent('snap_mode', { detail: {mode: mode} });

    var element = document.getElementById('creationEditor_vrCanvas');
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

    var element = document.getElementById('creationEditor_vrCanvas');
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

    var element = document.getElementById('creationEditor_vrCanvas');
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

    var element = document.getElementById('creationEditor_vrCanvas');
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

    var element = document.getElementById('creationEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const handleExportToGltf = () => {

    console.log("handleExportToGltf start")

    var event = new CustomEvent('export_gltf');

    var element = document.getElementById('creationEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }


  const handleSettingInfo = (antialias: boolean, pixelRatio: number, outline: boolean) => {

    console.log("handleSettingInfo start")

    var event = new CustomEvent('setting_info', { detail: {antialias: antialias, pixelRatio: pixelRatio, outline: outline} });

    var element = document.getElementById('creationEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);

  }

  const onDocumentSettingInfo = (event) => {

    var antialias = event.detail.antialias;
    var pixelRatio = event.detail.pixelRatio;
    outline = event.detail.outline;

    console.log("pixelRatio : " + pixelRatio);



    renderer.setPixelRatio( window.devicePixelRatio * pixelRatio );

    var canvasWidth = $('#creationEditor_vrCanvas').width();
 		var canvasHeight = $('#creationEditor_vrCanvas').height() ;

 		renderer.setSize( canvasWidth, canvasHeight );

    renderVr();
    //renderer.antialias = antialias;
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
                      categoryId: 101,
                      creationName: creationName,
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
                      userName: user.userNickname,
                      lightColor:lightColor,
                      lightIntensity:lightIntensity
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
                  userName: creation.userNickname,
                  lightColor:lightColor,
                  lightIntensity:lightIntensity
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

  const handleLightColor = (color: string) => {
    console.log('creation handleLightColor lightColor : ', color);

    setLightColor(color);

    var event = new CustomEvent('light_color', { detail: {lightColor: color} });

    var element = document.getElementById('creationEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);
  }

  const onDocumentLightColor = (event) => {

    var color = new THREE.Color(event.detail.lightColor);

    console.log('creation lightColor : ', color);

    directionalLight1.color = color;
    directionalLight2.color = color;
    directionalLight3.color = color;
    directionalLight4.color = color;

  }

  const handleLightIntensity = (intensity: number) => {
    console.log('creation handleLightIntensity lightIntensity : ', intensity);

    setLightIntensity(intensity);
    var event = new CustomEvent('light_intensity', { detail: {lightIntensity: intensity} });

    var element = document.getElementById('creationEditor_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);
  }

  const onDocumentLightIntensity = (event) => {

    var intensity= event.detail.lightIntensity;

    console.log('creation lightIntensity : ', intensity);

    directionalLight1.intensity = intensity;
    directionalLight2.intensity = intensity;
    directionalLight3.intensity = intensity;
    directionalLight4.intensity = intensity;

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

 		var canvasWidth = $('#creationEditor_vrGizmoCanvas').width();
 		var canvasHeight = $('#creationEditor_vrGizmoCanvas').height() ;

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

    $('#creationEditor_vrGizmoCanvas').on("mousemove", onDocumentGizmoMouseMove);
    $('#creationEditor_vrGizmoCanvas').on("mouseup", onDocumentGizmoMouseUp);

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

    return (<div ref={myRef} id="creationEditor_vrCanvas" style={{height:'100vh'}}>
                <CreationEditorPropertyPanel
                                    onControlModeChange={handleControlModeChange}
                                    onTransformValueChange={handleTransformValueChange}
                                    onSnapModeChange={handleSnapModeChange}
                > </CreationEditorPropertyPanel>
                <div ref={myGizmoRef} id="creationEditor_vrGizmoCanvas" style={{position: 'absolute', height:'100px', width:'100px', opacity: 1 }}>
                </div>
            </div>);
  }


  return (
              <Row gutter={[0,0]} style={{ position: 'fixed', top: '0px', left:'0px', bottom: '0px',  width:'100vw', height:'100vh', opacity: '1' }} >
                <Col xxl={19} xl={18} lg={16} md={14} sm={24}>
                  { getCanvase() }
                </Col>

                <Col xxl={5} xl={6} lg={8} md={10} sm={24} style={{height:'100vh'}}>
                    <CreationEditorListPanel
                                        vrModelList={vrModelList}
                                        vrAssets={vrAssetsContainer}
                                        refreshMode={refreshMode}
                                        creationName={creationName}
                                        coverImage={coverImage}
                                        setNameTitle={setNameTitle}
                                        visible={visible}
                                        lightColor={lightColor}
                                        lightIntensity={lightIntensity}
                                        onCreationName={(name) => setCreationName(name)}
                                        onVisible={(value) => setVisible(value)}
                                        onAddAsset={handleAddAsset}
                                        onSaveCreation={handleSaveCreation}
                                        onSelectAsset={handleSelectAsset}
                                        onFocusAsset={handleFocusAsset}
                                        onDisplayAsset={handleDisplayAsset}
                                        onColorAsset={handleColorAsset}
                                        onLightColor={handleLightColor}
                                        onLightIntensity={handleLightIntensity}
                                        onAssemblyLevelAsset={handleAssemblyLevelAsset}
                                        onTransformValueChange={handleTransformValueChange}
                                        onAssemblyAsset={handleAssemblyAsset}
                                        onAssemblySaveAsset={handleAssemblySaveAsset}
                                        onInitAssembly={handleInitAssembly}
                                        onBackground={handleSettingBackground}
                                        onSaveAsThumbImage={handleSaveAsThumbImage}
                                        onSaveAsImage={handleSaveAsImage}
                                        onSettingInfo={handleSettingInfo}
                                        onExportToStl={handleExportToStl}
                                        onExportToGltf={handleExportToGltf}
                    > </CreationEditorListPanel>
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
                    aspectRatio={1.2}
                    onCoverImage={(image) => setCoverImage(image)}
                    onImageEditorConfirm={(value)=>{setVisibleThumbImageEditorConfirm(value)}}
                  />

                <CreationSetNameDialog
                    visibleCreationSetNameConfirm={visibleCreationSetNameConfirm}
                    onSetName={(name, title) => {setSetName(name); setSetNameTitle(title); handleVrModels(name); setVisibleCreationSetNameConfirm(false);}}
                    onCreationSetNameConfirm={(value)=>{setVisibleCreationSetNameConfirm(value)}}
                  />
              </Row>

      );



};
