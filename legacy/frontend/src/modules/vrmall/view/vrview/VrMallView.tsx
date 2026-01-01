import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Icon, Select, Button, Row, Col } from 'antd';
import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { OrbitControls } from 'plugins/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TGALoader } from 'three/examples/jsm/loaders/TGALoader';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { EffectComposer }  from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

import { ModalManager} from 'react-dynamic-modal';
import $ from 'jquery';

import { InfoModal } from 'components';
import { SOPOONG_URL, SHOP_URL, SHOP_ID, storageService } from 'common';

import { ProductModel } from 'modules/main/model';
import { VrModel, VrInstance } from 'modules/vrmall/model';
import { vrItems } from 'modules/vrmall/service/dummyData/vrItems';
import { vrModels } from 'modules/vrmall/service/dummyData/vrModels';
import { productItems } from 'modules/main/service/dummyData/productItems';

import { VrViewPropertyPanel, VrViewListPanel, VrViewYoutubePanel, ManualBookView } from '.';

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

export const VrMallView = (props) => {

  var cartItems: ProductModel['productId'][] = [];

  //let vrAssets:VrModel[] = Object.assign(vrItems);
  //const productList:ProductModel[] = Object.assign(productItems);

  const [vrModelList, setVrModelList] = useState<VrModel[]>([]);
  const [vrAssetsContainer, setVrAssetsContainer ] = useState<VrModel[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<THREE.Object3D>(targetAsset);
  const [productList, setProductList] = useState<any[]>([]);
  const [assetGroup, setAssetGroup] = useState<THREE.Group>(new THREE.Group());
  const [selectedMaterial, setSelectedMaterial] = useState<any>({key:'default', color: 0xffffff });
  const [vrMaterialMap, setVrMaterialMap] = useState<any>(new Map());

  const [videoData, setVideoData] = useState<string>('');
  const [videoImage, setVideoImage] = useState<string>('');
  const [manualData, setManualData] = useState<string>('');
  const [programData, setProgramData] = useState<string>('');
  const [programExeData, setProgramExeData] = useState<string>('');

  const [assemblyGuideContainer, setAssemblyGuideContainer] = useState<boolean>(true);


  //var scene = new THREE.Scene();
  //var renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});

  //const [rendererContainer, setRendererContainer] = useState<THREE.WebGLRenderer>(renderer)
  //const [orbitControlContainer, setOrbitControlContainer] = useState<OrbitControls>(new OrbitControls(new THREE.PerspectiveCamera( 45, 1280 / 1024, 1, 1000 ),  renderer.domElement));

  var scene = new THREE.Scene();
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

  //let selectedMaterial;
  let fbxLoader = new FBXLoader();;
  var gltfLoader = new GLTFLoader();
  let tgaLoader;

  var groundMaterial;
  let clampMaterial;
  let glassMaterial;
  let focusMaterial;
  let displayMaterial;
  let hideMaterial;

  let INTERSECTED;

  var axis = new THREE.Vector3( 0, 1, 0 ).normalize();
  var clock = new THREE.Clock();

  var textureLoader = new THREE.TextureLoader();
  //var assetGroup = new THREE.Group();
  var selectedAssetId: number = 0;
  var targetAsset: any ;

  var mixerArray: THREE.AnimationMixer[] = [];
  var linkArray: THREE.Mesh[] = [];
  var vrModelMap = new Map();
  //var vrMaterialMap = new Map();

  const ROTATE_UP: number = 1;
	const ROTATE_DOWN: number = 2;
	const ROTATE_RIGHT: number = 3;
	const ROTATE_LEFT: number = 4;
	const ZOOM_IN: number = 5;
	const ZOOM_OUT: number = 6;

  var intervalCount = 0;
  let composer;
  let outlinePass;
  let shaderPass;

  let assemblyGuide = true;

  let productModelName;


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

    scroll(0, 0);

    $('#MainHeader').hide();
    $('#MainFooter').hide();

    initVrControls();
    //initComposer();
    //initVrModels();

    //getVrModelsData();
    getProductsData();
    getVrMallData();

    window.addEventListener( 'resize',onWindowResize, false );
    window.addEventListener( 'orientationchange',onOrientationChange, false );

    return () => {

      clearVrObject();
    }

  }, [props.match.params.vrMallId]);


  const getVrMallData = () => {

    console.log('vrMallId : ', props.match.params.vrMallId);

    let url = SOPOONG_URL + SHOP_URL + '/vrMall.do?vrMallId=' + props.match.params.vrMallId;

    fetch( url )
      .then(response => response.json())
      .then(data=> {
                      console.log(data);

                      initEnvironment(data.cameraPosition, data.cameraTarget, data.backgroundPath, data.groundPath);

                      var vrAssetList = JSON.parse(data.vrModels);
                      console.log('vrAssetList : ', vrAssetList);
                      setVrObject(vrAssetList);
                      setVrAssetsContainer(vrAssetList);

                      setVrAssets(vrAssetList);

                      if(data.videoImage != null)
                        setVideoImage(data.videoImage);

                      if(data.videoData != null)
                        setVideoData(data.videoData);

                      if(data.manualData != null)
                        setManualData(data.manualData);

                      if(data.programData != null)
                        setProgramData(data.programData);

                      if(data.programExeData != null)
                        setProgramExeData(data.programExeData);

                      if(data.setNames != null)
                        handleProductModelName(data.setNames);

                      getVrModelsData(data.setNames);

                    })
      .catch(err => console.log(err));

  };


  const getVrModelsData = (setNames) => {

    //let url = SOPOONG_URL + SHOP_URL + '/vrModels.do?shopId=' + SHOP_ID;
    //let url = SOPOONG_URL + SHOP_URL + '/vrModelsBySetNames.do?setNames=51515,99998,45678,45680,45544,45560,31313';
    let url = SOPOONG_URL + SHOP_URL + '/vrModelsBySetNames.do?setNames=' + setNames;

    fetch( url )
      .then(response => response.json())
      .then(data=> {
                      console.log(data);

                      var modelList = data;
                      console.log('vrModelList : ', modelList);
                      setVrModelList(modelList);

                    })
      .catch(err => console.log(err));

 	}

  const getProductsData = () => {

      var searchUrl = SOPOONG_URL + SHOP_URL + '/products.do?' + 'shopId=' + SHOP_ID ;
      searchUrl += '&page=0&size=1000';

      fetch(
        searchUrl
      ).then(response => response.json())
       .then(data => {console.log(data); setProductList(Object.assign(data));})
       .catch(err => console.log(err));

  };

  const setVrAssets = (vrAssetList) => {
    vrAssets = vrAssetList;
  }



  // VR 초기화
  const initVrControls = () => {


 		var canvasWidth = $('#vrView_vrCanvas').width();
 		var canvasHeight = $('#vrView_vrCanvas').height() ;

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
    scene = new THREE.Scene();

 		renderer.setPixelRatio( window.devicePixelRatio );
 		renderer.setSize( canvasWidth, canvasHeight );
    renderer.shadowMap.enabled = true;
    renderer.physicallyCorrectLights = true;
    renderer.gammaFactor = 1.18;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.NoToneMapping;

    setRendererContainer(renderer);

    camera = new THREE.PerspectiveCamera( 30, canvasWidth / canvasHeight, 0.1, 1000 );
    //camera = new THREE.PerspectiveCamera( 75, 10, 1, 11000 );
    camera.position.set( 0, 10, 30);
    //camera.lookAt( scene.position );
 		camera.lookAt( 0,0, 0 );
 		camera.updateMatrix();


    orbitControl = new OrbitControls( camera, renderer.domElement );
    orbitControl.screenSpacePanning = true;
    orbitControl.target.set( 0, 0, 0 );
    orbitControl.maxDistance = 200;
    //orbitControl.autoRotate = true;
    orbitControl.update();
    //orbitControl.addEventListener( 'change', renderVr );

    var filter = "win16|win32|win64|mac|macintel";
    if(navigator.platform) {
      if(filter.indexOf(navigator.platform.toLowerCase()) < 0)
        orbitControl.rotateSpeed = 0.5;
    }

    setOrbitControlContainer(orbitControl);

    transformControl = new TransformControls( camera, renderer.domElement );
		//transformControl.addEventListener( 'change', renderVr );
		transformControl.addEventListener( 'dragging-changed', function ( event ) {
			orbitControl.enabled = ! event.value;
		} );
    //transformControl.setSpace( "local");
    transformControl.setSpace( "world");

		scene.add( transformControl );


 		scene.add( assetGroup );


    //scene.background = new THREE.Color( 0xeeeeee );
    // scene.background = new THREE.CubeTextureLoader()
    //                               .setPath('./images/legomall/background/chicken_cage/')
    //                               .load(['front_x.jpg', 'back_x.jpg',
    //                                       'front_y.jpg', 'back_y.jpg',
    //                                       'front_z.jpg', 'back_z.jpg'
    //                                     ]);

    //scene.background = new THREE.Color( 0xB9D9EB );


    scene.background = new THREE.Color( 0xeeeeee );
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

    var sourceUrl = "./images/smartfarm/prefabs/env.fbx";

    fbxLoader = new FBXLoader();
    tgaLoader = new TGALoader();

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

    // color : white => 0xe4e4e4, black => 0x0e1010
    clampMaterial = new THREE.MeshPhysicalMaterial( {
       color: 0xe4e4e4, roughness: 0.8, metalness: 0.6,  normalMap: normalMap
     } );

    glassMaterial = new THREE.MeshPhysicalMaterial( { opacity: 0.5, transparent: true,  color: 0x003333} );

    focusMaterial = new THREE.MeshPhysicalMaterial( { opacity: 1, transparent: true,  color: 0x00ffff} );

    displayMaterial = new THREE.MeshPhysicalMaterial( { opacity: 1, transparent: true,  color: 0xff0000, side: THREE.DoubleSide, depthWrite: false} );

    hideMaterial = new THREE.MeshPhysicalMaterial( { opacity: 0, transparent: true,  color: 0xffffff, side: THREE.DoubleSide, depthWrite: false } );
    hideMaterial.name = 'hide';


    var gridHelper: any = new THREE.GridHelper( 1000, 1000, 0x000000, 0x000000 );
    gridHelper.material.opacity = 0.1;
    gridHelper.material.depthWrite = false;
    gridHelper.material.transparent = true;
    //scene.add( gridHelper );


    //$('#vrView_vrCanvas').on("mousemove", onDocumentMouseMove);
    $('#vrView_vrCanvas').on("mousedown", onDocumentMouseDown);
    //$('#vrView_vrCanvas').on("click", onDocumentMouseClick);
    //$('#vrView_vrCanvas').on("dblclick", onDocumentMouseDblClick);
    //$('#vrView_vrCanvas').on("touchend", onDocumentTouchClick);
    $('#vrView_vrCanvas').on("display_asset", onDocumentDisplayAsset);
    $('#vrView_vrCanvas').on("assembly_asset", onDocumentAssemblyAsset);
    $('#vrView_vrCanvas').on("assembly_guide", onDocumentAssemblyGuide);
    $('#vrView_vrCanvas').on("change_product_model_name", onDocumentProductModelName);

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

    if(productModelName == '9102' ||
      productModelName == '9103' ||
      productModelName == '9106') {
      groundMaterial = new THREE.MeshStandardMaterial( { map: groundTexture, transparent: true, opacity: 1 } );
    }
    else {
      groundMaterial = new THREE.MeshStandardMaterial( { map: groundTexture } );
      groundMaterial.emissive.setHex(0x888888);
      groundMaterial.emissiveIntensity = 0.5;
    }

		var groundMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 50, 50 ), groundMaterial );
		//groundMesh.position.y = - 250;
    groundMesh.position.y = -0.4;
    groundMesh.position.z = 0;
		groundMesh.rotation.x = - Math.PI / 2;
		groundMesh.receiveShadow = true;
    groundMesh.renderOrder= 0;
		scene.add( groundMesh );

    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
	  scene.add( ambientLight );


    let  backgroundTexture;
    if(backgroundPath != undefined)
      backgroundTexture = textureLoader.load( backgroundPath);
    else
      backgroundTexture = textureLoader.load( './images/legomall/background/default_background.jpg');
    scene.background = backgroundTexture;

  }


  // VR Model 초기화
  const initVrModels = () => {

    var normalMap = textureLoader.load( "./images/legomall/textures/clamp_normal.png" );
    normalMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.repeat.x = 1/10;
    normalMap.repeat.y = 1/10;

    // color : white => 0xe4e4e4, black => 0x0e1010
    var clampMaterial = new THREE.MeshPhysicalMaterial( {
       color: 0xe4e4e4, roughness: 0.8, metalness: 0.6,  normalMap: normalMap
     } );

    vrModelList.forEach(vrModel => {

      if(vrModel.modelPath.includes('fbx')) {

        fbxLoader.load( vrModel.modelPath, ( object:any ) => {

          object.traverse( function ( child ) {
            if ( child.isMesh ) {
              //child.castShadow = true;
              //child.receiveShadow = true;
            }
          });

          vrModelMap.set(vrModel.vrModelName, object);
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

 	}

  const initComposer = () => {
    var renderPass, copyPass;

    composer = new EffectComposer(renderer);

    // 기본 씬 렌더링 패스 추가
    renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // 아웃라인 효과 추가
    outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
    outlinePass.edgeStrength = 10;
    outlinePass.edgeThickness = 1;
    outlinePass.downSampleRatio = 2;
    outlinePass.visibleEdgeColor.set('#ff0000');
    outlinePass.hiddenEdgeColor.set("#ff0000");

    composer.addPass(outlinePass);

    const fxaaPass = new ShaderPass(FXAAShader);
    var canvasWidth = $('#vrView_vrCanvas').width();
 		var canvasHeight = $('#vrView_vrCanvas').height() ;
    fxaaPass.uniforms['resolution'].value.set(1 / canvasWidth, 1 / canvasHeight);
    composer.addPass(fxaaPass);

    // **감마 보정 패스 추가**
    if(productModelName == '9102' ||
      productModelName == '9103' ||
      productModelName == '9106' ) {
      const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
      composer.addPass(gammaCorrectionPass);
    }
  }

  const setVrObject = (vrAssetList) => {

    vrAssetList.forEach(vrAsset => {

      let texture;

      if(vrAsset.texture != undefined) {
        texture = textureLoader.load( vrAsset.texture);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

        if(vrAsset.texture.indexOf('bed') > -1)
          texture.repeat.set( 0.02, 0.02 );
        else
          texture.repeat.set( 10, 10 );

        texture.anisotropy = 16;
        texture.encoding = THREE.sRGBEncoding;
      }

      if(vrAsset.modelPath.includes('fbx')) {
        fbxLoader.load( vrAsset.modelPath, ( object:any ) => {

            object.traverse( function ( child ) {

              if ( child.isMesh ) {
                child.castShadow = true;
                child.receiveShadow = true;

                if(Array.isArray(child.material)){
                   child.material.forEach(material => { material.emissive.setHex(0x888888); material.emissiveIntensity = 0.5;});
                }
                else {
                  child.material.emissive.setHex(0x888888);
                  child.material.emissiveIntensity = 0.5;
                }

                if(vrAsset.vrModelType == 'clamp' || vrAsset.vrModelType == 'pipe') {
                  var vrMaterial = clampMaterial.clone();

                  child.material = vrMaterial;
                  vrMaterialMap.set(vrAsset.vrModelName, vrMaterial);

                } else if (vrAsset.vrModelType == 'environment'){

                  let vrMaterial;

                  if(vrAsset.material != undefined) {

                    vrMaterial = new THREE.MeshPhysicalMaterial( vrAsset.material  );

                    child.material = vrMaterial;
                    vrMaterialMap.set(vrAsset.vrModelName, vrMaterial);

                  } else if (vrAsset.texture != undefined && texture != undefined) {
                    vrMaterial = new THREE.MeshStandardMaterial( { map: texture } );
                    child.material = vrMaterial;
                    vrMaterialMap.set(vrAsset.vrModelName, vrMaterial);
                  }
                  else {
                    vrMaterial = glassMaterial.clone();
                  }

                }
                else if (vrAsset.vrModelType.substring(0, 4) == 'lego'){
                  vrMaterialMap.set(vrAsset.vrModelName, child.material);
                }
              }

            } );

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
      				//vrInstance.scale.set(instance.scale.x, instance.scale.y, instance.scale.z);
              vrInstance.scale.set(1, 1, 1);

              vrInstance.traverse( function ( child ) {
                if ( child.isMesh ) {
                  child.currentMaterial = child.material;
                }
              });

      				assetGroup.add( vrInstance );


              if(vrAsset.vrModelType == 'clamp' && instance.instanceName.indexOf('clamp') > -1) {
                var clickMaterial = new THREE.MeshBasicMaterial( { opacity: 0, transparent: true, color: 0xff0000} );
                //var clickMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff,  side: THREE.DoubleSide } );
                var clickGeometry = new THREE.BoxGeometry( 1, 1, 1 );

                var clickCube = new THREE.Mesh( clickGeometry, clickMaterial );

                clickCube.name = instance.instanceName + '_click';
                //clickCube.position.set(instance.position.x, instance.position.y, instance.position.z);
                //clickCube.rotation.set(instance.rotation._x * Math.PI/180, instance.rotation._y * Math.PI/180, instance.rotation._z * Math.PI/180);
                //clickCube.scale.set(0.5, 0.5, 0.5);

                var box = new THREE.Box3().setFromObject(vrInstance);
                clickCube.position.set((box.min.x + box.max.x)/2, (box.min.y + box.max.y)/2, (box.min.z + box.max.z)/2);
                clickCube.scale.set((box.max.x - box.min.x) * 0.5, (box.max.y - box.min.y) * 0.5, (box.max.z - box.min.z) * 0.5);
                clickCube.visible = false;
                assetGroup.add(clickCube);
              }

            });

            var bbox = new THREE.Box3().setFromObject( assetGroup );
  					var size = bbox.getSize( new THREE.Vector3() );
  					var radius = Math.max( size.x, Math.max( size.y, size.z ) ) ;

            console.log("radius : " + radius);

            if(radius > 20)
              radius = radius * 0.5;
            else if(radius > 15)
              radius = radius * 0.8;

  					orbitControl.target0.copy( bbox.getCenter( new THREE.Vector3() ) );
  					orbitControl.position0.set( - 2.3, 2, 2 ).multiplyScalar( radius ).add( orbitControl.target0 );
  					orbitControl.reset();

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

            if(vrInstance.children[0] != undefined) {

              if(vrInstance.children[0].isMesh){

                vrInstance.children[0].material = vrInstance.children[0].material.clone();
                vrInstance.children[0].material.color.set(Number(instance.color));
                vrInstance.children[0].currentMaterial = vrInstance.children[0].material;
                vrInstance.renderOrder = 1;

              }
            }

            vrInstance.traverse( function ( child ) {
              if ( child.isMesh ) {
                child.currentMaterial = child.material;
              }
            });

            assetGroup.add( vrInstance );

            var bbox = new THREE.Box3().setFromObject( assetGroup );
  					var size = bbox.getSize( new THREE.Vector3() );
  					var radius = Math.max( size.x, Math.max( size.y, size.z ) ) ;

            console.log("radius : " + radius);

            if(radius > 20)
              radius = radius * 0.5;
            else if(radius > 15)
              radius = radius * 0.8;

  					orbitControl.target0.copy( bbox.getCenter( new THREE.Vector3() ) );
  					orbitControl.position0.set( - 2.3, 2, 2 ).multiplyScalar( radius ).add( orbitControl.target0 );
  					orbitControl.reset();

          });

        });
      }

    });

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




  const onWindowResize = () => {

    orbitControl.autoRotate = false;

		var canvasWidth = $('#vrView_vrCanvas').width();
		var canvasHeight = $('#vrView_vrCanvas').height();
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
          $('#vrView_vrCanvas').css('height', '70vh');
        else
          $('#vrView_vrCanvas').css('height', '100vh');
      }
    }

	}


  const renderVr = () => {

		renderer.render( scene, camera );

	}

  const animate = () => {
		window.requestAnimationFrame( animate );
		//orbitControl.update();

		update();

    moveToTarget();

    orbitControl.update();

    intervalCount ++;

    if(intervalCount > 1){
      intervalCount = 0;

      if(composer)
        composer.render();
      else
        renderer.render( scene, camera );
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


  const onDocumentMouseDown = (event) => {

    if(event.button == 2)  {//right button, pan move

      if(!panMode) {

        var delta = new THREE.Vector3(moveTargetAsset.position.x, moveTargetAsset.position.y, moveTargetAsset.position.z);
        orbitControl.target = delta;

        panMode = true;
      }

    }

  }


  const onDocumentMouseClick = (event) => {

    var rect = renderer.domElement.getBoundingClientRect();

    var mouse = new THREE.Vector2();

    mouse.x =((( event.clientX - rect.left ) / rect.width) * 2) - 1;
    mouse.y =  -((( event.clientY - rect.top ) / rect.height) * 2) + 1;

    var raycaster = new THREE.Raycaster();

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(assetGroup.children, true);

    if (intersects.length > 0) {

      if( intersects[0].object == undefined || intersects[0].object.parent == undefined)
        return;

      var assetName = intersects[0].object.parent.name;

      if(assetName == undefined)
        return;

      var selectAsset = scene.getObjectByName( assetName );

      if(selectAsset != undefined){
        moveInit(selectAsset);

        panMode = false;
      }

    }

    console.log('camera postion : ' + camera.position.x + ',' + camera.position.y + ',' + camera.position.z + ', target  : '  + orbitControl.target.x + ','  + orbitControl.target.y + ','  + orbitControl.target.z);

  }


  const onDocumentMouseDblClick = (event) => {

    var rect = renderer.domElement.getBoundingClientRect();

    var mouse = new THREE.Vector2();

    mouse.x =((( event.clientX - rect.left ) / rect.width) * 2) - 1;
    mouse.y =  -((( event.clientY - rect.top ) / rect.height) * 2) + 1;

    var raycaster = new THREE.Raycaster();

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(assetGroup.children, true);

    if (intersects.length > 0) {

      if( intersects[0].object == undefined || intersects[0].object.parent == undefined)
        return;

      var assetName = intersects[0].object.parent.name;

      if(assetName == undefined)
        return;

      var selectAsset = scene.getObjectByName( assetName );

      if(selectAsset != undefined){
        moveInit(selectAsset);

        panMode = false;
      }

    }

    console.log('camera postion : ' + camera.position.x + ',' + camera.position.y + ',' + camera.position.z + ', target  : '  + orbitControl.target.x + ','  + orbitControl.target.y + ','  + orbitControl.target.z);

  }


/*
  const onDocumentMouseDblClick = (event) => {

    for (var i = assetGroup.children.length - 1; i >= 0; i--) {

      var childAsset:any = assetGroup.children[i];


      if(childAsset.children[0].isMesh) {

        if(childAsset.children[0].currentMaterial == undefined) {
          childAsset.children[0].currentMaterial = childAsset.children[0].material;
        }
        else {
          childAsset.children[0].material = childAsset.children[0].currentMaterial;
        }

      }

    }
  }
*/

  const onDocumentTouchClick = (event) => {

    var rect = renderer.domElement.getBoundingClientRect();

    var mouse = new THREE.Vector2();

    mouse.x =((( event.changedTouches[0].clientX - rect.left ) / rect.width) * 2) - 1;
    mouse.y =  -((( event.changedTouches[0].clientY - rect.top ) / rect.height) * 2) + 1;

    var raycaster = new THREE.Raycaster();

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(assetGroup.children);


    if (intersects.length > 0) {

      moveInit(intersects[intersects.length - 1].object);

      panMode = false;

    }

    console.log('camera postion : ' + camera.position.x + ',' + camera.position.y + ',' + camera.position.z + ', target  : '  + orbitControl.target.x + ','  + orbitControl.target.y + ','  + orbitControl.target.z);

  }


  const onDocumentMouseMove = (event) => {

    var rect = renderer.domElement.getBoundingClientRect();

    var mouse = new THREE.Vector2();

    mouse.x =((( event.clientX - rect.left ) / rect.width) * 2) - 1;
    mouse.y =  -((( event.clientY - rect.top ) / rect.height) * 2) + 1;

    var raycaster = new THREE.Raycaster();

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(assetGroup.children, true);

    if (intersects.length > 0) {

      if( intersects[0].object == undefined || intersects[0].object.parent == undefined)
        return;

      var assetName = intersects[0].object.parent.name;

      if(assetName == undefined)
        return;

      var focusAsset = scene.getObjectByName( assetName );

      if( INTERSECTED != undefined ) {
        if(INTERSECTED != focusAsset) {

          //INTERSECTED.children[0].material = INTERSECTED.currentMaterial;

          INTERSECTED.traverse( function ( child ) {
             if ( child.isMesh ) {
                child.material = child.currentMaterial;
             }
          });

					INTERSECTED = focusAsset;

          INTERSECTED.traverse( function ( child ) {
             if ( child.isMesh ) {
                child.material = child.focusMaterial;
             }
          });

          //INTERSECTED.currentMaterial = INTERSECTED.children[0].material;
					//INTERSECTED.children[0].material = focusMaterial;
        }
			}
      else {
        INTERSECTED = focusAsset;

        INTERSECTED.traverse( function ( child ) {
           if ( child.isMesh ) {
              child.material = child.focusMaterial;
           }
        });

        //INTERSECTED.currentMaterial = INTERSECTED.children[0].material;
        //INTERSECTED.children[0].material = focusMaterial;
      }

    }
    else {

      if ( INTERSECTED != undefined ) {

        INTERSECTED.traverse( function ( child ) {
           if ( child.isMesh ) {
              child.material = child.currentMaterial;
           }
        });

        //INTERSECTED.children[0].material = INTERSECTED.currentMaterial;
			  INTERSECTED = undefined;
      }
    }

  }



  //////////////////////////
	// Auto Moving to Target
	//////////////////////////

	var tempLine: THREE.CatmullRomCurve3 = new THREE.CatmullRomCurve3();
	var tempPosition: number = 0;
	var moveTargetAsset: THREE.Object3D = new THREE.Object3D() ;
	var moveMode: boolean = false;
  	var panMode:boolean = true;

	const moveInit = (asset:THREE.Object3D) => {

		moveTargetAsset = asset;
		tempPosition = 0;

		var material = new THREE.LineBasicMaterial({
			color: 0x0000ff
		});

		var points: THREE.Vector3[] = [];
		points.push( camera.position );
		points.push( moveTargetAsset.position );

		tempLine = new THREE.CatmullRomCurve3(points);

		var points2 = tempLine.getPoints(1000);


		camera.lookAt( moveTargetAsset.position );
		orbitControl.target = moveTargetAsset.position;

		moveMode = true;
	}


	const moveToTarget = () => {

		if(!moveMode)
			return;


		// add up to position for movement
		tempPosition += 0.0005;

		// get the point at position
		var point = new THREE.Vector3();
		tempLine.getPointAt(tempPosition, point);

		var distance = camera.position.distanceTo(moveTargetAsset.position);

		if(distance < 10) {
			moveMode = false;
			tempLine = new THREE.CatmullRomCurve3();

      //orbitControl.saveState();
      //orbitControl.reset();

      setOrbitControlContainer(orbitControl);


			return;
		}


		//orbitControl.zoomIn();
		camera.position.set(point.x, point.y, point.z);
		//camera.position.x = point.x;
		//camera.position.y = point.y;
		//camera.position.z = point.z;

	}


  const handleProductModelName = (productModelName) => {
          // antd에서 타입을 any로 해놔서 일단, any로 받음. 나머지 로직에서 타입 체크를 차라리 제대로 하자.
    console.log(`vrMart handleProductModelName: ${productModelName}`);

    var event = new CustomEvent('change_product_model_name', { detail: {productModelName: productModelName} });

    var element = document.getElementById('vrView_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);
  }

  const onDocumentProductModelName = (event) => {
    productModelName = event.detail.productModelName;

    if(productModelName == '9102' ||
        productModelName == '9103' ||
        productModelName == '9106'  ) {
      groundMaterial.transparent = true;
      groundMaterial.opacity = 0.6;
      groundMaterial.emissiveIntensity = 0;
    }

    initComposer();
  }


  const handleDisplayAsset = (selectedModel: any, checked: boolean) => {
          // antd에서 타입을 any로 해놔서 일단, any로 받음. 나머지 로직에서 타입 체크를 차라리 제대로 하자.
    console.log(`vrMart handleDisplayAsset: ${selectedModel}`, 'checked: ', checked);

    var event = new CustomEvent('display_asset', { detail: {selectedModel: selectedModel, checked: checked} });

    var element = document.getElementById('vrView_vrCanvas');
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

    console.log(`vrMart onDocumentDisplayAsset: ${selectedModel}`, 'checked: ', checked);

    var selectedObjects:any[] = [];

    for (var i = assetGroup.children.length - 1; i >= 0; i--) {

      var childAsset:any = assetGroup.children[i];

      if(selectedModel.key == undefined) {
        childAsset.traverse( function ( child ) {
          if ( child.isMesh && child.currentMaterial) {
              child.material = child.currentMaterial;
          }
        });
      }
      else {
        childAsset.traverse( function ( child ) {
          if ( child.isMesh ) {
              child.material = glassMaterial;
          }
        });

        if(childAsset.name.indexOf(selectedModel.key) > -1) {
          //childAsset.children[0].material = displayMaterial;

          childAsset.traverse( function ( child ) {
            if ( child.isMesh && child.currentMaterial) {
                child.material = child.currentMaterial;
            }
          });

          selectedObjects.push(childAsset.children[0]);
        }
      }


      /*
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

        if(childAsset.name.indexOf(selectedModel.key) > -1) {
          //childAsset.children[0].material = displayMaterial;

          childAsset.children[0].material = childAsset.children[0].currentMaterial;

          selectedObjects.push(childAsset.children[0]);
        }
      }
      */
    }

    outlinePass.selectedObjects = selectedObjects;

  }



  const handleAssemblyAsset = (step: number) => {
    console.log('vrMart handleAssemblyAsset step : ', step);

    var event = new CustomEvent('assembly_asset', { detail: {step: step} });

    var element = document.getElementById('vrView_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);
  }

  const onDocumentAssemblyAsset = (event) => {

    var step = event.detail.step;

    console.log('vrMart assembleyAsset step : ', step);

    var selectedObjects:any[] = [];

    for (var i = assetGroup.children.length - 1; i >= 0; i--) {

      var childAsset:any = assetGroup.children[i];

      if(childAsset.name.indexOf('_click') > -1)
        continue;

      childAsset.traverse( function ( child ) {
        if ( child.isMesh ) {
          if(child.currentMaterial == undefined)
            child.currentMaterial = child.material;
        }
      });

      const vrModelName = childAsset.name.substring(0, childAsset.name.lastIndexOf('_'));
      var assetModel = vrAssets.find(element => element.vrModelName == vrModelName);

      if(assetModel == undefined || assetModel.instances == undefined)
        continue;

      var assetInstance = assetModel.instances.find(element => element.instanceName == childAsset.name);

      if(assetInstance != undefined) {

        if(assetInstance.assemblyLevel != undefined) {

          if(Number.parseInt(assetInstance.assemblyLevel) < step) {

            childAsset.traverse( function ( child ) {
              if ( child.isMesh ) {
                  child.material = child.currentMaterial;
              }
            });
          }
          else if(Number.parseInt(assetInstance.assemblyLevel) == step) {

            childAsset.traverse( function ( child ) {
              if ( child.isMesh ) {
                  child.material = child.currentMaterial;
              }
            });

            if(assemblyGuide)
              selectedObjects.push(childAsset.children[0]);
          }
          else{

            childAsset.traverse( function ( child ) {
              if ( child.isMesh ) {
                  child.material = hideMaterial;
              }
            });
          }
        }
        else {
          childAsset.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.material = child.material;
            }
          });
        }
      }
    }

    outlinePass.selectedObjects = selectedObjects;
  }


  const handleAssemblyGuide = (guide: boolean) => {
    console.log('vrMart handleAssemblyGuide guide : ', guide);

    var event = new CustomEvent('assembly_guide', { detail: {guide: guide} });

    var element = document.getElementById('vrView_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);
  }

  const onDocumentAssemblyGuide = (event) => {

    console.log('vrMart onDocumentAssemblyGuide guide : ', event.detail.guide);

    assemblyGuide = event.detail.guide;
    setAssemblyGuideContainer(event.detail.guide);

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

          saveFile(imgData.replace(strMime, strDownloadMime), "test.jpg");

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




  // return ( <div ref={myRef} id="vrView_vrCanvas" style={{ marginTop: '2px', minHeight: '730px', maxHeight: '730px' }} >
  // <div ref={myRef} id="vrView_vrCanvas" style={{ position: 'fixed', top: '0px', left: '0px', bottom: '-10px', right: '-10px', overflow: 'auto', opacity: '1' }} >
// return (<div>
//           <div ref={myRef} id="vrView_vrCanvas" style={{ position: 'fixed', top: '0px', left: '0px', height: '100vh', width: '80vw', overflow: 'auto', opacity: '1' }} >
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
        $('#vrView_vrCanvas').css('height', '70vh');
      else
        $('#vrView_vrCanvas').css('height', '100vh');
      // if (window.innerWidth <= window.innerHeight)
      //   return (<div ref={myRef} id="vrView_vrCanvas" style={{height:'70vh'}}>
      //           </div>);
      // else
      //   return (<div ref={myRef} id="vrView_vrCanvas" style={{height:'100vh'}}>
      //           </div>);
    }
  }



  return (<div ref={myRef} id="vrView_vrCanvas" style={{height:'100vh'}}>

            <VrViewYoutubePanel
                                vrMallId={props.match.params.vrMallId}
                                videoImage={videoImage}
                                videoData={videoData}
                                manualData={manualData}
                                programData={programData}
                                programExeData={programExeData}
            > </VrViewYoutubePanel>

          </div>);
}

return (
            <Row gutter={[0,0]} style={{ position: 'fixed', top: '0px', left:'0px', bottom: '-10px',  width:'100vw', overflow: 'auto', opacity: '1' }} >
              <Col xxl={20} xl={18} lg={16} md={14} sm={24}>
                { getCanvase() }
              </Col>

              <Col xxl={4} xl={6} lg={8} md={10} sm={24} style={{height:'100vh'}}>
                <VrViewListPanel    vrModelList={vrModelList}
                                     productList={productList}
                                     vrAssets={vrAssetsContainer}
                                     vrMallId={props.match.params.vrMallId}
                                     assemblyGuide={assemblyGuideContainer}
                                     onDisplayAsset={handleDisplayAsset}
                                     onAssemblyAsset={handleAssemblyAsset}
                                     onZoomInOut={handleZoomInOut}
                                     onSaveAsImage={handleSaveAsImage}
                                     onAutoRotate={handleAutoRotate}
                                     onAssemblyGuide={handleAssemblyGuide}
               > </VrViewListPanel>
              </Col>
            </Row>

    );

};
