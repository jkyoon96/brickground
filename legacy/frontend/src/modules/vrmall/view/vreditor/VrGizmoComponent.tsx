import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Icon, Select, Row, Col, Modal, Button } from 'antd';
import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { OrbitControls } from 'plugins/OrbitControls.js';
//import { TransformControls } from 'plugins/TransformControls.js';
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox.js';
//import { SelectionHelper } from 'three/examples/jsm/interactive/SelectionHelper.js';
import { SelectionHelper } from 'plugins/SelectionHelper.js';

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { ModalManager} from 'react-dynamic-modal';
import $ from 'jquery';

import { InfoModal } from 'components';
import { SOPOONG_URL, SHOP_URL, SHOP_ID, storageService } from 'common';

/**
 * @description 상품 목록 페이지
 */

export const VrGizmoComponent = (props) => {

  const {cameraContainer} = props;


  //const vrModelList:VrModel[] = Object.assign(vrModels);
  //var vrModelList:VrModel[] = [];
  let vrModelMap;
  let vrAssets;

  const names = ['FrontTopLeft', 'FrontTopMiddle', 'FrontTopRight',
                  'FrontMiddleLeft', 'FrontMiddleMiddle', 'FrontMiddleRight',
                  'FrontBottomLeft', 'FrontBottomMiddle', 'FrontBottomRight',
                  'MiddleTopLeft', 'MiddleTopMiddle', 'MiddleTopRight',
                  'MiddleMiddleLeft', 'Center', 'MiddleMiddleRight',
                  'MiddleBottomLeft', 'MiddleBottomMiddle', 'MiddleBottomRight',
                  'BackTopLeft', 'BackTopMiddle', 'BackTopRight',
                  'BackMiddleLeft', 'BackMiddleMiddle', 'BackMiddleRight',
                  'BackBottomLeft', 'BackBottomMiddle', 'BackBottomRight'
                ];

  const colors = [0xc1b2b6, 0xc1b2b6, 0xc1b2b6,
                  0xc1b2b6, 0x0000ff, 0xc1b2b6,
                  0xc1b2b6, 0xc1b2b6, 0xc1b2b6,
                  0xc1b2b6, 0x00ff00, 0xc1b2b6,
                  0xff0000, 0xc1b2b6, 0xee0000,
                  0xc1b2b6, 0x00ee00, 0xc1b2b6,
                  0xc1b2b6, 0xc1b2b6, 0xc1b2b6,
                  0xc1b2b6, 0x0000ee, 0xc1b2b6,
                  0xc1b2b6, 0x685bc7, 0xc1b2b6
                ];

  const positions = [[-1.25,1.25,1], [0,1.25,1], [1.25,1.25,1],
                  [-1.25,0,1], [0,0,1], [1.25,0,1],
                  [-1.25,-1.25,1], [0,-1.25,1], [1.25,-1.25,1],
                  [-1.25,1.25,0], [0,1.25,0], [1.25,1.25,0],
                  [-1,0,0], [0,0,0], [1,0,0],
                  [-1.25,-1.25,0], [0,-1.25,0], [1.25,-1.25,0],
                  [-1.25,1.25,-1], [0,1.25,-1], [1.25,1.25,-1],
                  [-1.25,0,-1], [0,0,-1], [1.25,0,-1],
                  [-1.25,-1.25,-1], [0,-1.25,-1], [1.25,-1.25,-1]
                ];
/*
  const scales = [[0.5,0.5,0.5], [2,0.5,0.5], [0.5,0.5,0.5],
                  [0.5,2,0.5], [2,2,0.5], [0.5,2,0.5],
                  [0.5,0.5,0.5], [2,0.5,0.5], [0.5,0.5,0.5],
                  [0.5,0.5,2], [2,0.5,2], [0.5,0.5,2],
                  [0.5,2,2], [2,2,2], [0.5,2,2],
                  [0.5,0.5,2], [2,0.5,2], [0.5,0.5,2],
                  [0.5,0.5,0.5], [2,0.5,0.5], [0.5,0.5,0.5],
                  [0.5,2,0.5], [2,2,0.5], [0.5,2,0.5],
                  [0.5,0.5,0.5], [2,0.5,0.5], [0.5,0.5,0.5]
                ];
*/
const scales = [[0.5,0.5,0.5], [2,0.5,0.5], [0.5,0.5,0.5],
                [0.5,2,0.5], [2,2,0.5], [0.5,2,0.5],
                [0.5,0.5,0.5], [2,0.5,0.5], [0.5,0.5,0.5],
                [0.5,0.5,2], [2,0.5,2], [0.5,0.5,2],
                [0.5,2,2], [2,2,2], [0.5,2,2],
                [0.5,0.5,2], [2,0.5,2], [0.5,0.5,2],
                [0.5,0.5,0.5], [2,0.5,0.5], [0.5,0.5,0.5],
                [0.5,2,0.5], [2,2,0.5], [0.5,2,0.5],
                [0.5,0.5,0.5], [2,0.5,0.5], [0.5,0.5,0.5]
              ];

  const myRef = React.createRef<HTMLDivElement>()

  var scene = new THREE.Scene();

  //private camera = new THREE.PerspectiveCamera( 75, canvasWidth / canvasHeight, 1, 1100 );
  var camera = new THREE.PerspectiveCamera( 75, 10, 1, 11000 );
  var renderer = new THREE.WebGLRenderer();
  let orbitControl;
  let transformControl;
  var textureLoader = new THREE.TextureLoader();
  var loader = new FBXLoader();

  var skyMesh = new THREE.Mesh();
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  var axis = new THREE.Vector3( 0, 1, 0 ).normalize();

  var animationCount: number = 0;

  let focusMaterial;
  let INTERSECTED;

  const [assetGroup, setAssetGroup] = useState<THREE.Group>(new THREE.Group());
  const [sceneState, setSceneState] = useState<THREE.Scene>(scene);
  const [orbitControlContainer, setOrbitControlContainer] = useState<any>(new OrbitControls(new THREE.PerspectiveCamera( 45, 1280 / 1024, 1, 1000 ),  renderer.domElement));

  useEffect(() => {

    initVrControls();

    onWindowResize();
    window.addEventListener( 'resize',onWindowResize, false );

  }, []);

  const onWindowResize = () => {

    $("#vrEditor_vrGizmoCanvas").css("top", $('html, body').offset().top + 30);
    $("#vrEditor_vrGizmoCanvas").css("left", $('html, body').offset().left + $('#vrEditor_vrCanvas').outerWidth() - 130);

	}



  // VR 초기화
  const initVrControls = () => {
    console.log("gizmo start")

 		renderer.setPixelRatio( window.devicePixelRatio );

 		var canvasWidth = $('#vrEditor_vrGizmoCanvas').width();
 		var canvasHeight = $('#vrEditor_vrGizmoCanvas').height() ;

 		renderer.setSize( canvasWidth, canvasHeight );
    renderer.shadowMap.enabled = true;
    renderer.physicallyCorrectLights = true;
    renderer.gammaFactor = 1.18;
    renderer.outputEncoding = THREE.sRGBEncoding;



    camera = new THREE.PerspectiveCamera( 30, canvasWidth / canvasHeight, 0.1, 1000 );
    //camera = new THREE.PerspectiveCamera( 75, 10, 1, 11000 );
    camera.position.set( 25, 25, 25);
    //camera.lookAt( scene.position );
 		camera.lookAt( 0,0, 0 );
 		camera.updateMatrix();

    orbitControl = new OrbitControls( camera, renderer.domElement );
    orbitControl.target.set( 0, 0, 0 );
    orbitControl.update();
    orbitControl.addEventListener( 'change', renderVr );
    setOrbitControlContainer(orbitControl);

    scene.add( assetGroup );

    scene.background = new THREE.Color( 0xeeeeee );
    //scene.environment = new RoomEnvironment( renderer );

    var directLight = new THREE.DirectionalLight( 0xffffff );
      directLight.position.set( 1, 1, 1 ).normalize();
      scene.add(directLight);

 	    //////////////////////sky end /////////////////////////////////


    const htmlDivElement = myRef.current;
    if(htmlDivElement) {
     htmlDivElement.insertBefore(renderer.domElement, htmlDivElement.firstChild);
    }

    animate();


    var sourceUrl = "./images/smartfarm/prefabs/env.fbx";

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
	   scene.add( ambientLight );


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

    fbxLoader.load( './images/legomall/models/gizmo.fbx', ( gizmoObject:any ) => { assetGroup.add(gizmoObject); });

    setSceneState(scene);

    $('#vrEditor_vrGizmoCanvas').on("mousemove", onDocumentMouseMove);
    $('#vrEditor_vrGizmoCanvas').on("mouseup", onDocumentMouseUp);

 	}


  const onDocumentMouseMove = (event) => {
    console.log('VrMallEditor Gizmo onDocumentMouseMove start');

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

      var assetName = intersects[0].object.name;

      if(assetName == undefined)
        return;

      var focusAsset = scene.getObjectByName( assetName );

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


  const onDocumentMouseUp = (event) => {

    console.log( 'VrMallEditor Gizmo onDocumentMouseUp start' );

    if( event.button != 0)
      return;

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

      var name = intersects[0].object.name;


      console.log("click .........." + name);

      camera.position.x = 0;
      camera.position.y = 0;
      camera.position.z = 0;

      if(name == 'FrontMiddleMiddle') {
        camera.position.z = 40;
      }
      else if(name == 'BackMiddleMiddle') {
        camera.position.z = -40;
      }
      else if(name == 'MiddleTopMiddle') {
        camera.position.y = 40;
      }
      else if(name == 'MiddleBottomMiddle') {
        camera.position.y = -40;
      }
      else if(name == 'MiddleMiddleLeft') {
        camera.position.x = -40;
      }
      else if(name == 'MiddleMiddleRight') {
        camera.position.x = 40;
      }
      else if(name == 'FrontTopLeft') {
        camera.position.x = -25;
        camera.position.y = 25;
        camera.position.z = 25;
      }
      else if(name == 'FrontTopMiddle') {
        camera.position.x = 0;
        camera.position.y = 30;
        camera.position.z = 30;
      }
      else if(name == 'FrontTopRight') {
        camera.position.x = 25;
        camera.position.y = 25;
        camera.position.z = 25;
      }
      else if(name == 'FrontMiddleLeft') {
        camera.position.x = -30;
        camera.position.y = 0;
        camera.position.z = 30;
      }
      else if(name == 'FrontMiddleRight') {
        camera.position.x = 30;
        camera.position.y = 0;
        camera.position.z = 30;
      }
      else if(name == 'FrontBottomLeft') {
        camera.position.x = -25;
        camera.position.y = -25;
        camera.position.z = 25;
      }
      else if(name == 'FrontBottomMiddle') {
        camera.position.x = 0;
        camera.position.y = -30;
        camera.position.z = 30;
      }
      else if(name == 'FrontBottomRight') {
        camera.position.x = 25;
        camera.position.y = -25;
        camera.position.z = 25;
      }
      else if(name == 'MiddleTopLeft') {
        camera.position.x = -30;
        camera.position.y = 30;
        camera.position.z = 0;
      }
      else if(name == 'MiddleTopRight') {
        camera.position.x = 30;
        camera.position.y = 30;
        camera.position.z = 0;
      }
      else if(name == 'MiddleBottomLeft') {
        camera.position.x = 30;
        camera.position.y = -30;
        camera.position.z = 0;
      }
      else if(name == 'MiddleBottomRight') {
        camera.position.x = -30;
        camera.position.y = -30;
        camera.position.z = 0;
      }
      else if(name == 'BackTopLeft') {
        camera.position.x = -25;
        camera.position.y = 25;
        camera.position.z = -25;
      }
      else if(name == 'BackTopMiddle') {
        camera.position.x = 0;
        camera.position.y = 30;
        camera.position.z = -30;
      }
      else if(name == 'BackTopRight') {
        camera.position.x = 25;
        camera.position.y = 25;
        camera.position.z = -25;
      }
      else if(name == 'BackMiddleLeft') {
        camera.position.x = -30;
        camera.position.y = 0;
        camera.position.z = -30;
      }
      else if(name == 'BackMiddleRight') {
        camera.position.x = 30;
        camera.position.y = 0;
        camera.position.z = -30;
      }
      else if(name == 'BackBottomLeft') {
        camera.position.x = -25;
        camera.position.y = -25;
        camera.position.z = -25;
      }
      else if(name == 'BackBottomMiddle') {
        camera.position.x = 0;
        camera.position.y = -30;
        camera.position.z = -30;
      }
      else if(name == 'BackBottomRight') {
        camera.position.x = 25;
        camera.position.y = -25;
        camera.position.z = -25;
      }

      camera.lookAt( 0, 0, 0);

      if(cameraContainer.camera != undefined){
        cameraContainer.camera.position.x = camera.position.x;
        cameraContainer.camera.position.y = camera.position.y;
        cameraContainer.camera.position.z = camera.position.z;
        cameraContainer.camera.lookAt(0,0,0)
      }

    }

  }


  const renderVr = () => {

		renderer.render( scene, camera );

	}

  const animate = () => {
		window.requestAnimationFrame( animate );
		//orbitControl.update();

    animationCount ++

    if(animationCount > 5) {
	    renderer.render( scene, camera );
      animationCount = 0;
    }
	}


/*
  const getCanvase = () => {

    return (<div ref={myRef} id="vrEditor_vrGizmoCanvas" style={{height:'100px'}}>
            </div>);
  }



  return (
              <Row gutter={[0,0]} style={{ position: 'fixed', top: '30px', left:'30px',  width:'100px', height:'100px', opacity: '1' }} >
                <Col span={24}>
                  { getCanvase() }
                </Col>

              </Row>

      );
*/

  return (
      <div ref={myRef} id="vrEditor_vrGizmoCanvas" style={{position: 'absolute', height:'100px', width:'100px', opacity: 1 }}>
      </div>
  );


};
