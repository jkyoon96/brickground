import React, { Component, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { Button, Tabs, Modal, Input, Row, Col, Select } from 'antd';
import $ from 'jquery';

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import RgbQuant from 'rgbquant';

import { SOPOONG_URL, SHOP_URL, SHOP_ID } from 'common';

export const Pixel2DEditorDialog = (props) => {

  const { imageData, visibleImageEditorConfirm, onCoverImage, onPixelCanvas, onImageEditorConfirm } = props;

  const [image, setImage] = useState<string>('./images/copyright.jpg');
  const [originImage, setOriginImage] = useState<string>('./images/copyright.jpg');
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<any>();
  const [aspectRatio, setAspectRatio] = useState<number>(1);

  const [rowCount, setRowCount] = useState<number>(16);
  const [columnCount, setColumnCount] = useState<number>(16);

  useEffect(() => {

    //imageEditor.addImageObject(image);

    if(imageData.data != undefined) {
      setImage(imageData.data);
      setOriginImage(imageData.data);

    }

  }, [imageData.data]);


  const handleRowCount = (count) => {

    setRowCount(count);

    let ratio = count/columnCount;

    console.log("ratio1 : " + ratio);

    cropper.setAspectRatio(ratio);

    //setAspectRatio(ratio);

  };


  const handleColumnCount = (count) => {

    setColumnCount(count);

    let ratio = rowCount/count;

    console.log("ratio2 : " + ratio);

    cropper.setAspectRatio(ratio);
    //setAspectRatio(ratio);

  };



  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      //setCropData(cropper.getCroppedCanvas().toDataURL());
      setImage(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const setCoverImage = () => {

    //handleThumbImage(image);

    if (typeof cropper !== "undefined") {



      //let coverImage = cropper.getCroppedCanvas().toDataURL();
      let coverImage = downScaleImage(cropper.getCroppedCanvas(), 0.01).toDataURL();

/*
      var opts = {
          //colors: 256,             // desired palette size
          //method: 2,               // histogram method, 2: min-population threshold within subregions; 1: global top-population
          //boxSize: [64,64],        // subregion dims (if method = 2)
          //boxPxls: 2,              // min-population threshold (if method = 2)
          //initColors: 4096,        // # of top-occurring colors  to start with (if method = 1)
          minHueCols: 0,           // # of colors per hue group to evaluate regardless of counts, to retain low-count hues
          dithKern: null,          // dithering kernel name, see available kernels in docs below
          //dithDelta: 0,            // dithering threshhold (0-1) e.g: 0.05 will not dither colors with <= 5% difference
          dithSerp: false,         // enable serpentine pattern dithering
          palette: [[254, 236, 108], [250, 200, 10], [252, 172 ,0], [252, 172, 0], [180, 0, 0], [72, 0, 12],
                    [255, 158, 205], [211, 53, 157], [144, 31 ,118], [205, 164, 222], [160, 110, 185], [68, 26, 145],
                    [255, 201, 149], [187, 128, 90], [170, 125, 85], [145, 80, 28], [95, 49, 9], [55, 33, 0],
                    [226, 249, 154], [165, 202, 24], [88, 171, 65], [0, 133, 43], [0, 69, 2], [112, 142, 124],
                    [211, 242, 234], [104, 195, 226], [70, 155, 195], [157, 195, 247], [115, 150, 200], [30, 90, 16],
                    [176, 160, 111], [137, 125, 98], [119, 119, 78], [170, 127, 46], [112, 129, 154], [25, 50, 90],
                    [244, 244, 244], [150, 150, 150], [140, 140, 14], [100, 100, 100], [62, 60, 57], [27, 42, 52]
                  ],             // a predefined palette to start with in r,g,b tuple format: [[r,g,b],[r,g,b]...]
          //reIndex: false,          // affects predefined palettes only. if true, allows compacting of sparsed palette once target palette size is reached. also enables palette sorting.
          //useCache: true,          // enables caching for perf usually, but can reduce perf in some cases, like pre-def palettes
          //cacheFreq: 10,           // min color occurance count needed to qualify for caching
          colorDist: "euclidean",  // method used to determine color distance, can also be "manhattan"
      };
*/
      var opts = {
          //colors: 256,             // desired palette size
          //method: 2,               // histogram method, 2: min-population threshold within subregions; 1: global top-population
          //boxSize: [64,64],        // subregion dims (if method = 2)
          //boxPxls: 2,              // min-population threshold (if method = 2)
          //initColors: 4096,        // # of top-occurring colors  to start with (if method = 1)
          minHueCols: 0,           // # of colors per hue group to evaluate regardless of counts, to retain low-count hues
          dithKern: null,          // dithering kernel name, see available kernels in docs below
          //dithDelta: 0,            // dithering threshhold (0-1) e.g: 0.05 will not dither colors with <= 5% difference
          dithSerp: false,         // enable serpentine pattern dithering
          palette: [
                  [248, 248, 248],[217, 208, 151],[223, 205, 119],[222, 188, 26],[230, 163, 33],[241, 86, 7],[198, 178, 153],[208, 161, 89],[215, 145, 31],[235, 51, 0],
                  [161, 0, 0],[85, 0, 2],[210, 200, 216],[210, 156, 96],[157, 123, 96],[165, 111, 65],[192, 91, 49],[182, 70, 66],[223, 193, 167],[196, 136, 86],
                  [198, 116, 104],[92, 58, 49],[85, 51, 49],[56, 39, 32],[184, 170, 123],[182, 154, 104],[205, 211, 125],[107, 200, 93],[47, 167, 95],[23, 131, 76],
                  [188, 216, 132],[139, 171, 48],[130, 149, 57],[60, 104, 43],[50, 68, 46],[38, 47, 44],[208, 156, 195],[202, 127, 150],[216, 76, 163],[212, 75, 121],
                  [172, 44, 92],[88, 57, 72],[196, 180, 207],[169, 121, 145],[180, 75, 115],[161, 49, 108],[135, 49, 142],[63, 49, 137],[172, 141, 157],[170, 158, 208],
                  [136, 142, 166],[157, 114, 185],[126, 120, 161],[84, 96, 168],[180, 216, 212],[60, 171, 201],[5, 152, 193],[62, 119, 190],[18, 133, 201],[21, 78, 178],
                  [134, 188, 164],[96, 151, 132],[102, 157, 164],[41, 110, 126],[20, 95, 158],[26, 53, 100],[161, 182, 209],[130, 165, 207],[72, 149, 201],[57, 80, 94],
                  [51, 56, 62],[24, 28, 31],[164, 166, 144],[134, 145, 151],[102, 111, 110],[102, 133, 151],[79, 84, 90],[207, 205, 201],[228, 213, 211],[243, 207, 179],
                  [236, 199, 205],[250, 187, 203],[232, 146, 124],[237, 136, 0],[173, 202, 187],[124, 128, 52],[92, 127, 113],[0, 178, 169],[205, 160, 119],[137, 83, 47],
                  [113, 197, 232],[0, 59, 92]
                ],                  // a predefined palette to start with in r,g,b tuple format: [[r,g,b],[r,g,b]...]
          //reIndex: false,          // affects predefined palettes only. if true, allows compacting of sparsed palette once target palette size is reached. also enables palette sorting.
          //useCache: true,          // enables caching for perf usually, but can reduce perf in some cases, like pre-def palettes
          //cacheFreq: 10,           // min color occurance count needed to qualify for caching
          colorDist: "euclidean",  // method used to determine color distance, can also be "manhattan"
      };

      var quant = new RgbQuant(opts);

      let clopImage = cropper.getCroppedCanvas();

      let reduceRatio = 0.1;

      if(clopImage.width > clopImage.height)
        reduceRatio = rowCount / clopImage.width;
      else
        reduceRatio = columnCount / clopImage.height;


      let downImage = downScaleImage(clopImage, reduceRatio);
      quant.sample(downImage);

      var coverImage2 = quant.reduce(downImage);

      var pixelCanvas = drawPixels(coverImage2, downImage.width, downImage.width);

      var pixelData = {
        rowCount: rowCount,
        columnCount: columnCount,
        pixelCanvas: pixelCanvas
      }

      onPixelCanvas(pixelData);

      //saveCoverImage(pixelCanvas.toDataURL(), 'sopoong_thumb.jpg');
    }

  };

  const saveCoverImage = (strData, filename) => {

      var link = document.createElement('a');
      if (typeof link.download === 'string') {
          document.body.appendChild(link); //Firefox requires the link to be in the body
          link.download = filename;
          link.href = strData;
          link.click();

          document.body.removeChild(link); //remove the link when done
      }
  }

  const uploadCoverImage = () => {

    //var file = document.getElementById('uploadCoverImageFile');
    var file = $("#uploadCoverImageFile")[0].files[0];

    if(file == undefined)
      return;

    var reader:any  = new FileReader();

    reader.onload = function () {

      if(reader.result != null)
        setImage(reader.result);
    }

    reader.readAsDataURL(file);


    //var filePath = file.value;
    //formData.append("imageFile", $("#uploadCoverImageFile")[0].files[0]);

  };



  // --------------------------------

  // scales the image by (float) scale < 1
  // returns a canvas containing the scaled image.
  const downScaleImage = (img, scale) => {
      var imgCV = document.createElement('canvas');

      imgCV.width = img.width;
      imgCV.height = img.height;
      var imgCtx = imgCV.getContext('2d');
      if(imgCtx != null) {
        imgCtx.drawImage(img, 0, 0);
      }
      return downScaleCanvas(imgCV, scale);
  }

  // scales the canvas by (float) scale < 1
  // returns a new canvas containing the scaled image.
  const downScaleCanvas = (cv, scale) => {
      if (!(scale < 1) || !(scale > 0))
        throw ('scale must be a positive number <1 ');

      scale = normaliseScale(scale);

      var sqScale = scale * scale; // square scale =  area of a source pixel within target
      var sw = cv.width; // source image width
      var sh = cv.height; // source image height
      var tw = Math.floor(sw * scale); // target image width
      var th = Math.floor(sh * scale); // target image height
      var sx = 0, sy = 0, sIndex = 0; // source x,y, index within source array
      var tx = 0, ty = 0, yIndex = 0, tIndex = 0; // target x,y, x,y index within target array
      var tX = 0, tY = 0; // rounded tx, ty
      var w = 0, nw = 0, wx = 0, nwx = 0, wy = 0, nwy = 0; // weight / next weight x / y
      // weight is weight of current source point within target.
      // next weight is weight of current source point within next target's point.
      var crossX = false; // does scaled px cross its current px right border ?
      var crossY = false; // does scaled px cross its current px bottom border ?
      var sBuffer = cv.getContext('2d').
      getImageData(0, 0, sw, sh).data; // source buffer 8 bit rgba
      var tBuffer = new Float32Array(3 * tw * th); // target buffer Float32 rgb
      var sR = 0, sG = 0,  sB = 0; // source's current point r,g,b

      for (sy = 0; sy < sh; sy++) {
          ty = sy * scale; // y src position within target
          tY = 0 | ty;     // rounded : target pixel's y
          yIndex = 3 * tY * tw;  // line index within target array
          crossY = (tY !== (0 | ( ty + scale )));
          if (crossY) { // if pixel is crossing botton target pixel
              wy = (tY + 1 - ty); // weight of point within target pixel
              nwy = (ty + scale - tY - 1); // ... within y+1 target pixel
          }
          for (sx = 0; sx < sw; sx++, sIndex += 4) {
              tx = sx * scale; // x src position within target
              tX = 0 |  tx;    // rounded : target pixel's x
              tIndex = yIndex + tX * 3; // target pixel index within target array
              crossX = (tX !== (0 | (tx + scale)));
              if (crossX) { // if pixel is crossing target pixel's right
                  wx = (tX + 1 - tx); // weight of point within target pixel
                  nwx = (tx + scale - tX - 1); // ... within x+1 target pixel
              }
              sR = sBuffer[sIndex    ];   // retrieving r,g,b for curr src px.
              sG = sBuffer[sIndex + 1];
              sB = sBuffer[sIndex + 2];
              if (!crossX && !crossY) { // pixel does not cross
                  // just add components weighted by squared scale.
                  tBuffer[tIndex    ] += sR * sqScale;
                  tBuffer[tIndex + 1] += sG * sqScale;
                  tBuffer[tIndex + 2] += sB * sqScale;
              } else if (crossX && !crossY) { // cross on X only
                  w = wx * scale;
                  // add weighted component for current px
                  tBuffer[tIndex    ] += sR * w;
                  tBuffer[tIndex + 1] += sG * w;
                  tBuffer[tIndex + 2] += sB * w;
                  // add weighted component for next (tX+1) px
                  nw = nwx * scale
                  tBuffer[tIndex + 3] += sR * nw;
                  tBuffer[tIndex + 4] += sG * nw;
                  tBuffer[tIndex + 5] += sB * nw;
              } else if (!crossX && crossY) { // cross on Y only
                  w = wy * scale;
                  // add weighted component for current px
                  tBuffer[tIndex    ] += sR * w;
                  tBuffer[tIndex + 1] += sG * w;
                  tBuffer[tIndex + 2] += sB * w;
                  // add weighted component for next (tY+1) px
                  nw = nwy * scale
                  tBuffer[tIndex + 3 * tw    ] += sR * nw;
                  tBuffer[tIndex + 3 * tw + 1] += sG * nw;
                  tBuffer[tIndex + 3 * tw + 2] += sB * nw;
              } else { // crosses both x and y : four target points involved
                  // add weighted component for current px
                  w = wx * wy;
                  tBuffer[tIndex    ] += sR * w;
                  tBuffer[tIndex + 1] += sG * w;
                  tBuffer[tIndex + 2] += sB * w;
                  // for tX + 1; tY px
                  nw = nwx * wy;
                  tBuffer[tIndex + 3] += sR * nw;
                  tBuffer[tIndex + 4] += sG * nw;
                  tBuffer[tIndex + 5] += sB * nw;
                  // for tX ; tY + 1 px
                  nw = wx * nwy;
                  tBuffer[tIndex + 3 * tw    ] += sR * nw;
                  tBuffer[tIndex + 3 * tw + 1] += sG * nw;
                  tBuffer[tIndex + 3 * tw + 2] += sB * nw;
                  // for tX + 1 ; tY +1 px
                  nw = nwx * nwy;
                  tBuffer[tIndex + 3 * tw + 3] += sR * nw;
                  tBuffer[tIndex + 3 * tw + 4] += sG * nw;
                  tBuffer[tIndex + 3 * tw + 5] += sB * nw;
              }
          } // end for sx
      } // end for sy

      // create result canvas
      var resCV = document.createElement('canvas');
      resCV.width = tw;
      resCV.height = th;
      let resCtx = resCV.getContext('2d');

      let imgRes;
      if(resCtx != null)
        imgRes = resCtx.getImageData(0, 0, tw, th);

      var tByteBuffer = imgRes.data;
      // convert float32 array into a UInt8Clamped Array
      var pxIndex = 0; //
      for (sIndex = 0, tIndex = 0; pxIndex < tw * th; sIndex += 3, tIndex += 4, pxIndex++) {
          tByteBuffer[tIndex] = 0 | ( tBuffer[sIndex]);
          tByteBuffer[tIndex + 1] = 0 | (tBuffer[sIndex + 1]);
          tByteBuffer[tIndex + 2] = 0 | (tBuffer[sIndex + 2]);
          tByteBuffer[tIndex + 3] = 255;
      }
      // writing result to canvas.
      if(resCtx != null)
        resCtx.putImageData(imgRes, 0, 0);
      return resCV;
  }

  const log2 = (v) => {
    // taken from http://graphics.stanford.edu/~seander/bithacks.html
    var b =  [ 0x2, 0xC, 0xF0, 0xFF00, 0xFFFF0000 ];
    var S =  [1, 2, 4, 8, 16];
    var i=0, r=0;

    for (i = 4; i >= 0; i--) {
      if (v & b[i])  {
        v >>= S[i];
        r |= S[i];
      }
    }
    return r;
  }
  // normalize a scale <1 to avoid some rounding issue with js numbers
  const normaliseScale = (s) => {
      if (s>1)
        throw('s must be <1');
      s = 0 | (1/s);
      var l = log2(s);
      var mask = 1 << l;
      var accuracy = 4;

      while(accuracy && l) {
        l--;
        mask |= 1<<l;
        accuracy--;
      }

      return 1 / ( s & mask );
  }

  const drawPixels = (idxi8, width0, width1)  => {
  	var idxi32 = new Uint32Array(idxi8.buffer);

  	width1 = width1 || width0;

  	var can:any = document.createElement("canvas");
  	var	can2:any = document.createElement("canvas");
  	var	ctx:any = can.getContext("2d");
  	var	ctx2:any = can2.getContext("2d");

  	can.width = width0;
  	can.height = Math.ceil(idxi32.length / width0);
  	can2.width = width1;
  	can2.height = Math.ceil(can.height * width1 / width0);

    if(ctx != null)
  	 ctx.imageSmoothingEnabled = ctx.mozImageSmoothingEnabled = ctx.webkitImageSmoothingEnabled = ctx.msImageSmoothingEnabled = false;

    if(ctx2 != null)
  	 ctx2.imageSmoothingEnabled = ctx2.mozImageSmoothingEnabled = ctx2.webkitImageSmoothingEnabled = ctx2.msImageSmoothingEnabled = false;

  	var imgd = ctx.createImageData(can.width, can.height);

  	if (typeOf(imgd.data) == "CanvasPixelArray") {
  		var data = imgd.data;
  		for (var i = 0, len = data.length; i < len; ++i)
  			data[i] = idxi8[i];
  	}
  	else {
  		var buf32 = new Uint32Array(imgd.data.buffer);
  		buf32.set(idxi32);
  	}

  	ctx.putImageData(imgd, 0, 0);

  	ctx2.drawImage(can, 0, 0, can2.width, can2.height);

  	return can2;
  }

  const typeOf = (val) => {
  	return Object.prototype.toString.call(val).slice(8,-1);
  }


  const { Option } = Select;

   return (
     <Modal
         visible={visibleImageEditorConfirm}
         closable={false}
         title="사진 편집기"
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
                     도트아트 만들기
                   </Button>,
                   <Button key="image_cancel" type='primary' onClick={() =>{onImageEditorConfirm(false);} } >
                     취소
                   </Button>,
                 ]}
       >
       <Row>
         <Cropper
            style={{ height: "400px", width: "100%" }}
            zoomTo={0.5}
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
              instance.setAspectRatio(1);
            }}
            guides={true}
          />
        </Row>
       <Row>

        <Col span={22} style={{backgroundColor: '#ffffff', height: '40px'}}>

          <input
            type="file"
            id="uploadCoverImageFile"
            style={{height: '40px', minWidth: '200px', maxWidth:'400px' ,marginTop: '10px'}}
            onChange={() => uploadCoverImage()}
          />
        </Col>
      </Row>
      <Row type="flex" align="middle">
        <Col span={4} style={{paddingLeft: '10px', fontWeight: 'bold'}}>
          가로 픽셀
        </Col>
        <Col span={8} style={{backgroundColor: '#ffffff', height: '40px'}}>
          <Select value={rowCount} style={{ height: '40px', width: '100px' }} onChange={value => handleRowCount(value)}>
            <Option value={16}>16 </Option>
            <Option value={32}>32 </Option>
            <Option value={48}>48 </Option>
            <Option value={64}>64 </Option>
            <Option value={80}>80 </Option>
            <Option value={96}>96 </Option>
            <Option value={112}>112 </Option>
            <Option value={128}>128 </Option>
            <Option value={144}>144 </Option>
            <Option value={160}>160 </Option>
            <Option value={176}>176 </Option>
            <Option value={192}>192 </Option>
            <Option value={208}>208 </Option>
            <Option value={224}>224 </Option>
            <Option value={240}>240 </Option>
            <Option value={256}>256 </Option>
            <Option value={272}>272 </Option>
            <Option value={288}>288 </Option>
            <Option value={304}>304 </Option>
            <Option value={320}>320 </Option>
          </Select>
        </Col>
        <Col span={4} style={{paddingLeft: '10px', fontWeight: 'bold'}}>
          세로 픽셀
        </Col>
        <Col span={8} style={{backgroundColor: '#ffffff', height: '40px'}}>
          <Select value={columnCount} style={{ height: '40px', width: '100px'  }} onChange={value => handleColumnCount(value)}>
            <Option value={16}>16 </Option>
            <Option value={32}>32 </Option>
            <Option value={48}>48 </Option>
            <Option value={64}>64 </Option>
            <Option value={80}>80 </Option>
            <Option value={96}>96 </Option>
            <Option value={112}>112 </Option>
            <Option value={128}>128 </Option>
            <Option value={144}>144 </Option>
            <Option value={160}>160 </Option>
            <Option value={176}>176 </Option>
            <Option value={192}>192 </Option>
            <Option value={208}>208 </Option>
            <Option value={224}>224 </Option>
            <Option value={240}>240 </Option>
            <Option value={256}>256 </Option>
            <Option value={272}>272 </Option>
            <Option value={288}>288 </Option>
            <Option value={304}>304 </Option>
            <Option value={320}>320 </Option>
          </Select>
        </Col>
      </Row>

    </Modal>
  );
};
