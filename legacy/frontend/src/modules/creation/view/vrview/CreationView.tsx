import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Icon, Select, Button, Row, Col } from 'antd';
import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

import { OrbitControls } from 'plugins/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { TGALoader } from 'three/examples/jsm/loaders/TGALoader';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { ModalManager} from 'react-dynamic-modal';
import $ from 'jquery';

import { InfoModal, SnapshotImageEditorDialog } from 'components';
import { SOPOONG_URL, SHOP_URL, SHOP_ID, storageService } from 'common';

import { CreationPropertyPanel, CreationListPanel } from '.';

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

export const CreationView = (props) => {

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

  const [lightColor, setLightColor] = useState<string>('#FFFFFFF');
  const [lightIntensity, setLightIntensity] = useState<number>(2);

  const [imageData, setImageData] = useState<any>({});
  const [visibleSnapshotImageEditorConfirm, setVisibleSnapshotImageEditorConfirm] = useState<boolean>(false);

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
  let tgaLoader;
  let clampMaterial;
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

  let composer;
  let renderPass;    // render pass.
  let outlinePass;    // Outline pass.
  let effectFXAA;     // Antialias pass.
  let selectedObjects:any[] = [];
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  let ambientLight;
  let directionalLight1, directionalLight2, directionalLight3, directionalLight4;


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
    //initVrModels();

    //getVrModelsData();
    getCreationData();

    window.addEventListener( 'resize',onWindowResize, false );
    window.addEventListener( 'orientationchange',onOrientationChange, false );

    return () => {

      $('#MainHeader').show();
      $('#MainFooter').show();

      clearVrObject();
    }

  }, [props.match.params.creationId]);


  const getCreationData = () => {

    console.log('creationId : ', props.match.params.creationId);

    let url = SOPOONG_URL + SHOP_URL + '/creationAsset.do?creationId=' + props.match.params.creationId;

    fetch( url )
      .then(response => response.json())
      .then(data=> {
                      console.log(data);

                      setCreation(data);

                      initEnvironment(data.cameraPosition, data.cameraTarget, data.backgroundPath, data.groundPath, data.lightColor, data.lightIntensity );

                      var vrAssetList = JSON.parse(data.vrModels);
                      console.log('vrAssetList : ', vrAssetList);
                      setVrObject(vrAssetList);
                      setVrAssetsContainer(vrAssetList);

                      setVrAssets(vrAssetList);

                      if(data.videoData != null)
                        setVideoData(data.videoData);

                      getVrModelsData(data.setNames);



                    })
      .catch(err => console.log(err));

  };


  const getVrModelsData = (setNames) => {

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


  const setVrAssets = (vrAssetList) => {
    vrAssets = vrAssetList;
  }



  // VR 초기화
  const initVrControls = () => {


 		var canvasWidth = $('#creationView_vrCanvas').width();
 		var canvasHeight = $('#creationView_vrCanvas').height() ;

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

    //renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true, antialias: true});
    renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
    scene = new THREE.Scene();

 		renderer.setPixelRatio( window.devicePixelRatio );
 		renderer.setSize( canvasWidth, canvasHeight );
    renderer.shadowMap.enabled = true;
    renderer.physicallyCorrectLights = true;
    renderer.gammaFactor = 1.18;
    //renderer.outputEncoding = THREE.sRGBEncoding;

    setRendererContainer(renderer);

    camera = new THREE.PerspectiveCamera( 30, canvasWidth / canvasHeight, 0.1, 1000 );
    //camera = new THREE.PerspectiveCamera( 75, 10, 1, 11000 );
    camera.position.set( 0, 10, 30);
    //camera.lookAt( scene.position );
 		camera.lookAt( 0,0, 0 );
 		camera.updateMatrix();


    // Initial render pass.
    composer = new EffectComposer( renderer );
    renderPass = new RenderPass( scene, camera );
    composer.addPass( renderPass );

    // Outline pass.
    outlinePass = new OutlinePass( new THREE.Vector2( canvasWidth, canvasHeight ), scene, camera );
    outlinePass.edgeStrength = 100;
    outlinePass.edgeGlow = 0;
    outlinePass.edgeThickness = 1;
    outlinePass.pulsePeriod = 0;
    outlinePass.visibleEdgeColor.set( '#ff0000' );
    outlinePass.hiddenEdgeColor.set( '#ff0000' );
    composer.addPass( outlinePass );

    // Antialias pass.
    effectFXAA = new ShaderPass( FXAAShader );
		effectFXAA.uniforms[ 'resolution' ].value.set( 1 / canvasWidth, 1 / canvasHeight );
		composer.addPass( effectFXAA );


    renderer.domElement.addEventListener( 'pointermove',
    (event) => {
      if ( event.isPrimary === false ) return;

			mouse.x = ( event.clientX / canvasWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / canvasHeight ) * 2 + 1;

      raycaster.setFromCamera( mouse, camera );

			const intersects = raycaster.intersectObject( scene, true );

			if ( intersects.length > 0 ) {

				//const selectedObject = intersects[ 0 ].object;
        //selectedObjects = [];
				//selectedObjects.push( selectedObject );
				//outlinePass.selectedObjects = selectedObjects;

			} else {

				// outlinePass.selectedObjects = [];

			}

    } );


    orbitControl = new OrbitControls( camera, renderer.domElement );
    orbitControl.target.set( 0, 0, 0 );
    orbitControl.maxDistance = 200;
    orbitControl.autoRotate = true;
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

    ambientLight = new THREE.AmbientLight( 0xdeebed, 2 );
		scene.add( ambientLight );


    directionalLight1 = new THREE.DirectionalLight( 0xffffff, lightIntensity );
		directionalLight1.position.set( 1, 1, -1 ).normalize();
		scene.add( directionalLight1 );

    directionalLight2 = new THREE.DirectionalLight( 0xffffff, lightIntensity );
		directionalLight2.position.set( 1, 1, 1 ).normalize();
		scene.add( directionalLight2 );


    directionalLight3 = new THREE.DirectionalLight( 0xffffff, lightIntensity );
    directionalLight3.position.set( -1, 1, -1 ).normalize();
    scene.add( directionalLight3 );

    directionalLight4 = new THREE.DirectionalLight( 0xffffff, lightIntensity );
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

    // color : white => 0xe4e4e4, black => 0x0e1010
    clampMaterial = new THREE.MeshPhysicalMaterial( {
       color: 0xe4e4e4, roughness: 0.8, metalness: 0.6,  normalMap: normalMap
     } );

    //glassMaterial = new THREE.MeshPhysicalMaterial( { opacity: 0.5, transparent: true,  color: 0x003333} );
    glassMaterial = new THREE.MeshPhysicalMaterial( { opacity: 0.3, transparent: true,  color: 0x003333} );

    focusMaterial = new THREE.MeshPhysicalMaterial( { opacity: 1, transparent: true,  color: 0x00ffff} );

    displayMaterial = new THREE.MeshPhysicalMaterial( { opacity: 1, transparent: true,  color: 0xff0000, side: THREE.DoubleSide, depthWrite: false} );

    hideMaterial = new THREE.MeshPhysicalMaterial( { opacity: 0, transparent: true,  color: 0xffffff, side: THREE.DoubleSide, depthWrite: false } );
    hideMaterial.name = 'hide';


    var gridHelper: any = new THREE.GridHelper( 1000, 1000, 0x000000, 0x000000 );
    gridHelper.material.opacity = 0.1;
    gridHelper.material.depthWrite = false;
    gridHelper.material.transparent = true;
    //scene.add( gridHelper );


    //$('#vrBaseView_vrCanvas').on("mousemove", onDocumentMouseMove);
    $('#creationView_vrCanvas').on("mousedown", onDocumentMouseDown);
    //$('#vrBaseView_vrCanvas').on("click", onDocumentMouseClick);
    $('#creationView_vrCanvas').on("dblclick", onDocumentMouseDblClick);
    //$('#vrBaseView_vrCanvas').on("touchend", onDocumentTouchClick);
    $('#creationView_vrCanvas').on("display_asset", onDocumentDisplayAsset);
    $('#creationView_vrCanvas').on("assembly_asset", onDocumentAssemblyAsset);
    $('#creationView_vrCanvas').on("light_color", onDocumentLightColor);
    $('#creationView_vrCanvas').on("light_intensity", onDocumentLightIntensity);

 	}

  // 배경 및 바닥 초기화

  const initEnvironment = (cameraPosition, cameraTarget, backgroundPath, groundPath, lightColor, lightIntensity) => {

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
      groundTexture = textureLoader.load( './images/brickground/background/baseplate.jpg');

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

		scene.add( groundMesh );


    let  backgroundTexture;
    if(backgroundPath != undefined)
      backgroundTexture = textureLoader.load( backgroundPath);
    else
      backgroundTexture = textureLoader.load( './images/brickground/background/default_background.jpg');
    scene.background = backgroundTexture;


    if(lightColor != null) {
      setLightColor(lightColor);
      var color = new THREE.Color(lightColor);
      directionalLight1.color = color;
      directionalLight2.color = color;
      directionalLight3.color = color;
      directionalLight4.color = color;
    }

    if(lightIntensity != null) {
      setLightIntensity(lightIntensity);
      var intensity = parseFloat(lightIntensity);
      directionalLight1.intensity = intensity;
      directionalLight2.intensity = intensity;
      directionalLight3.intensity = intensity;
      directionalLight4.intensity = intensity;
    }


  }


  // VR Model 초기화
  const initVrModels = () => {

    var normalMap = textureLoader.load( "./images/brickground/textures/clamp_normal.png" );
    normalMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.repeat.x = 1/10;
    normalMap.repeat.y = 1/10;

    // color : white => 0xe4e4e4, black => 0x0e1010
    var clampMaterial = new THREE.MeshPhysicalMaterial( {
       color: 0xe4e4e4, roughness: 0.8, metalness: 0.6,  normalMap: normalMap
     } );

    vrModelList.forEach(vrModel => {

      fbxLoader.load( vrModel.modelPath, ( object:any ) => {

        object.traverse( function ( child ) {

          if ( child.isMesh ) {
            child.castShadow = true;
            child.receiveShadow = true;

            if(vrModel.vrModelType == 'clamp' || vrModel.vrModelType == 'pipe')
              child.material = clampMaterial;

          }

        } );

        vrModelMap.set(vrModel.vrModelName, object)

      });
    });

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

      fbxLoader.load( vrAsset.modelPath, ( object:any ) => {

          object.traverse( function ( child ) {

            if ( child.isMesh ) {
              child.castShadow = true;
              child.receiveShadow = true;


              if(Array.isArray(child.material)) {
                child.material.forEach(material => {material.color.convertLinearToSRGB();});

              } else {
                child.material.color.convertLinearToSRGB();

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

		var canvasWidth = $('#creationView_vrCanvas').width();
		var canvasHeight = $('#creationView_vrCanvas').height();
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
          $('#creationView_vrCanvas').css('height', '70vh');
        else
          $('#creationView_vrCanvas').css('height', '100vh');
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

    //if(composer != undefined)
    //  composer.render();
		renderer.render( scene, camera );
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

          INTERSECTED.children[0].material = INTERSECTED.currentMaterial;

					INTERSECTED = focusAsset;
					INTERSECTED.currentMaterial = INTERSECTED.children[0].material;
					INTERSECTED.children[0].material = focusMaterial;
        }
			}
      else {
        INTERSECTED = focusAsset;
        INTERSECTED.currentMaterial = INTERSECTED.children[0].material;
        INTERSECTED.children[0].material = focusMaterial;
      }

    }
    else {

      if ( INTERSECTED != undefined ) {
        INTERSECTED.children[0].material = INTERSECTED.currentMaterial;
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


  const handleDisplayAsset = (selectedModel: any, checked: boolean) => {
          // antd에서 타입을 any로 해놔서 일단, any로 받음. 나머지 로직에서 타입 체크를 차라리 제대로 하자.
    console.log(`creation handleDisplayAsset: ${selectedModel}`, 'checked: ', checked);

    var event = new CustomEvent('display_asset', { detail: {selectedModel: selectedModel, checked: checked} });

    var element = document.getElementById('creationView_vrCanvas');
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

        if(childAsset.name.indexOf(selectedModel.key) > -1) {
          //childAsset.children[0].material = displayMaterial;
          childAsset.children[0].material = childAsset.children[0].currentMaterial;
        }

      }

    }

  }



  const handleAssemblyAsset = (step: number) => {
    console.log('creation handleAssemblyAsset step : ', step);

    var event = new CustomEvent('assembly_asset', { detail: {step: step} });

    var element = document.getElementById('creationView_vrCanvas');
    if( element != null)
      element.dispatchEvent(event);
  }

  const onDocumentAssemblyAsset = (event) => {

    var step = event.detail.step;

    console.log('creation assembleyAsset step : ', step);

    selectedObjects = [];

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
            //childAsset.children[0].material = childAsset.children[0].currentMaterial;

            //const selectedObject = childAsset.children[0];

    				//selectedObjects.push( selectedObject );
    				//outlinePass.selectedObjects = selectedObjects;

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

  const handleLightColor = (color: string) => {
    console.log('creation handleLightColor lightColor : ', color);

    setLightColor(color);

    var event = new CustomEvent('light_color', { detail: {lightColor: color} });

    var element = document.getElementById('creationView_vrCanvas');
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

    var element = document.getElementById('creationView_vrCanvas');
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
        $('#creationView_vrCanvas').css('height', '70vh');
      else
        $('#creationView_vrCanvas').css('height', '100vh');
      // if (window.innerWidth <= window.innerHeight)
      //   return (<div ref={myRef} id="vrBaseView_vrCanvas" style={{height:'70vh'}}>
      //           </div>);
      // else
      //   return (<div ref={myRef} id="vrBaseView_vrCanvas" style={{height:'100vh'}}>
      //           </div>);
    }
  }

  return (<div ref={myRef} id="creationView_vrCanvas" style={{height:'100vh'}}>
          </div>);
}

return (
            <Row gutter={[0,0]} style={{ position: 'fixed', top: '0px', left:'0px', bottom: '-10px',  width:'100vw', overflow: 'auto', opacity: '1' }} >
              <Col xxl={20} xl={18} lg={16} md={14} sm={24}>
                { getCanvase() }
              </Col>

              <Col xxl={4} xl={6} lg={8} md={10} sm={24} style={{height:'100vh'}}>
                <CreationListPanel   vrModelList={vrModelList}
                                     productList={productList}
                                     vrAssets={vrAssetsContainer}
                                     creation={creation}
                                     lightColor={lightColor}
                                     lightIntensity={lightIntensity}
                                     onDisplayAsset={handleDisplayAsset}
                                     onAssemblyAsset={handleAssemblyAsset}
                                     onLightColor={handleLightColor}
                                     onLightIntensity={handleLightIntensity}
                                     onZoomInOut={handleZoomInOut}
                                     onSaveAsImage={handleSaveAsImage}
                                     onAutoRotate={handleAutoRotate}
               > </CreationListPanel>
              </Col>

              <SnapshotImageEditorDialog
                  visibleImageEditorConfirm={visibleSnapshotImageEditorConfirm}
                  imageData={imageData}
                  aspectRatio={0}
                  onImageEditorConfirm={(value)=>{setVisibleSnapshotImageEditorConfirm(value)}}
                />
            </Row>

    );

};
