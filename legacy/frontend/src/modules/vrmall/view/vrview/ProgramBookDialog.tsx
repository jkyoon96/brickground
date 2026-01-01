import React, { Component, useEffect, useState, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { Button, Tabs, Modal, Row, Col, Carousel, Icon } from 'antd';
import $ from 'jquery';
import HTMLFlipBook from 'react-pageflip';

export const ProgramBookDialog = (props) => {
  const { vrMallId, programData, programExeData } = props;
  const { visibleProgramConfirm, handleProgramConfirm } = props;
  const [ page, setPage ] = useState<number>(0);
  const [ totalPage, setTotalPage ] = useState<number>(0);
  const [ flipBook, setFlipBook ] = useState<any>({});
  const [ programPages, setProgramPages ] = useState<any[]>([]);

  const [ displayMode, setDisplayMode ] = useState<string>('double');
  const [ modalWidth, setModalWidth ] = useState<string>('90%');

  const [ pageWidth, setPageWidth ] = useState<number>(1024);
  const [ pageHeight, setPageHeight ] = useState<number>(724);

  const bookRef = useRef(null);

  const pageSliderRef = useRef(null);


  useEffect(() => {

    console.log('programData : ' + programData);
    //setTotalPage(flipBook.getPageFlip().getPageCount());

    var pages:any[] = [];

    let pageNum = 0;
    let srcPath = "";
    let pageCount = 0;
    let pageId = ""

    if(programData != undefined)
      pageCount = parseInt(programData)


    for (let i = 0; i < pageCount; i++) {
      pageNum++;
      srcPath = "images/legomall/program/" + vrMallId + "/" + pageNum + ".jpg";
      pageId = "programPageId_" + i;
      pages.push(<div className="page" id={pageId} data-density="hard" key={i + 1}><img className="zoomD" src={srcPath} /></div>);
    }

    setProgramPages(pages);

    setTotalPage(pageNum);

    window.addEventListener( 'resize',onWindowResize, false );
    //window.addEventListener( 'orientationchange',onOrientationChange, false );

    return () => {

      clearImageElement();
    }

  }, [vrMallId, programData]);



  const onWindowResize = () => {

    handleDisplayMode('double');

    if(displayMode == 'single') {

      if(document.body.clientWidth < 500)
        setModalWidth('96%');
      else if(document.body.clientWidth < 600)
        setModalWidth('90%');
      else if(document.body.clientWidth < 900)
        setModalWidth('80%');
      else if(document.body.clientWidth < 1300)
        setModalWidth('70%');
      else if(document.body.clientWidth < 1500)
        setModalWidth('60%');
      else if(document.body.clientWidth < 2000)
        setModalWidth('40%');
      else if(document.body.clientWidth < 2500)
        setModalWidth('30%');
      else
        setModalWidth('20%');

    }
    else {
      setModalWidth('90%');
    }


    console.log("document.body.clientWidth : " + document.body.clientWidth + ", document.body.clientHeight : " + document.body.clientHeight)

    var fullPage = document.getElementById("programFullPage");
    if(fullPage != null){
      fullPage.style.width = "" + document.body.clientWidth + "px" ;
      fullPage.style.height = "" + document.body.clientHeight + "px" ;
    }

    var fullPageImage = document.getElementById("programFullPageImage");
    if(fullPageImage != null) {

      if(document.body.clientWidth > document.body.clientHeight) {
        if(document.body.clientHeight < 500)
          fullPageImage.style.width = "500px";
        else if(document.body.clientHeight < 700)
          fullPageImage.style.width = "800px";
      }
    }

  }


  const clearImageElement = () => {

    let pageId;
    let image;

    for (let i = 0; i < totalPage; i++) {
      pageId = "programPageId_" + i;
      image = document.getElementById(pageId);

      console.log ("image : " + image);

      if(image != null){
        image.removeEventListener("click", onZoomImg);
        image.remove();
      }
    }

  }



  const onZoomImg = (event) =>  {
    // (A) CREATE EVIL IMAGE CLONE
    console.log ("event : " + event);
    var imageClone = event.target.cloneNode();
    imageClone.classList.remove("zoomD");

    // (B) PUT EVIL CLONE INTO LIGHTBOX
    var fullPageImage = document.getElementById("programFullPageImage");

    if(fullPageImage != null) {
      fullPageImage.innerHTML = "";
      fullPageImage.appendChild(imageClone);

      // (C) SHOW LIGHTBOX
      var fullPage = document.getElementById("programFullPage");
      if(fullPage != null)
        fullPage.classList.add("show");
    }

    onWindowResize();
  };

  const zoomHideImg = () =>  {
    var fullPage = document.getElementById("programFullPage");

    if(fullPage != null)
      fullPage.classList.remove("show");
  };


  const onOrientationChange = () => {
/*
    var filter = "win16|win32|win64|mac|macintel";
    if(navigator.platform) {
      if(filter.indexOf(navigator.platform.toLowerCase()) < 0) {
        if (window.orientation == 0)
          $('#programBookContainer').css('height', '80vh');
        else
          $('#programBookContainer').css('height', '80vh');
      }
    }
*/
  }

  const onInit = (e) => {

    let pageId;
    let image;

    for (let i = 0; i < totalPage; i++) {
      pageId = "programPageId_" + i;
      image = document.getElementById(pageId);

      console.log ("image : " + image);

      if(image != null)
        image.addEventListener("click", onZoomImg);
    }
  }


  const onPage = (e) => {
   setPage(e.data);
  }

  const PageCover = React.forwardRef((props: any, ref: any) => {
    return (
      <div className="page page-cover" ref={ref} data-density="hard">
        <div className="page-content">
          <h2>{props.children}</h2>
        </div>
      </div>
    );
  });

  const Page = React.forwardRef((props: any, ref: any) => {
    return (
      <div className="page" ref={ref}>
        <div className="page-content">
          <h2 className="page-header">Page header - {props.number}</h2>
          <div className="page-image"></div>
          <div className="page-text">{props.children}</div>
          <div className="page-footer">{props.number + 1}</div>
        </div>
      </div>
    );
  });

  const nextButtonClick = () => {

    if(displayMode == 'double') {
      var bookCurrent:any = bookRef.current;
      if(bookCurrent == null)
        return;

      var pageFlip = bookCurrent.pageFlip();
      if(pageFlip == null)
        return;

      pageFlip.flipNext();
    }
    else {

      if(page >= totalPage)
        return;

      var pageSliderCurrent:any = pageSliderRef.current;
      if(pageSliderCurrent != null) {
        pageSliderCurrent.next();
      }
    }
  };

  const  prevButtonClick = () => {

    if(displayMode == 'double') {
      var bookCurrent:any = bookRef.current;
      if(bookCurrent == null)
        return;

      var pageFlip = bookCurrent.pageFlip();
      if(pageFlip == null)
        return;

      pageFlip.flipPrev();
    }
    else {

      if(page < 1)
        return;

      var pageSliderCurrent:any = pageSliderRef.current;
      if(pageSliderCurrent != null) {
        pageSliderCurrent.prev();
      }
    }
  };

  const onSliderPage = (index) => {
   setPage(index);
  }


  const handleDisplayMode = (mode) => {

    setDisplayMode(mode);

    if(mode == 'double') {

      $('#programFlipBookContainer').show();
      $('#programCarouselBookContainer').hide();

      var bookCurrent:any = bookRef.current;
      if(bookCurrent == null)
        return;

      var pageFlip = bookCurrent.pageFlip();
      if(pageFlip == null)
        return;

      pageFlip.turnToPage(page);

    }
    else {

      $('#programFlipBookContainer').hide();
      $('#programCarouselBookContainer').show();

      var pageSliderCurrent:any = pageSliderRef.current;
      if(pageSliderCurrent != null)
        pageSliderCurrent.goTo(page);
    }

    if(mode == 'single') {

      if(document.body.clientWidth < 500)
        setModalWidth('96%');
      else if(document.body.clientWidth < 600)
        setModalWidth('90%');
      else if(document.body.clientWidth < 900)
        setModalWidth('80%');
      else if(document.body.clientWidth < 1300)
        setModalWidth('70%');
      else if(document.body.clientWidth < 1500)
        setModalWidth('60%');
      else if(document.body.clientWidth < 2000)
        setModalWidth('40%');
      else if(document.body.clientWidth < 2500)
        setModalWidth('30%');
      else
        setModalWidth('20%');

    }
    else {
      setModalWidth('90%');
    }
  }


  const handleExeDownload = () => {

    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        document.body.appendChild(link); //Firefox requires the link to be in the body
        link.download = programExeData;
        var exePath = "images/legomall/program/" + vrMallId + "/" + programExeData;
        link.href = exePath;
        link.click();
        document.body.removeChild(link); //remove the link when done
    }
  }




   return (
     <Modal
         visible={visibleProgramConfirm}
         closable={false}
         title="프로그램 설명서"
         width={modalWidth}
         centered
         footer={[ <Row type="flex" justify="space-between" key="manualkey">
                    <Col style={{padding: '2px'}}>
                      <Button type="primary" icon="profile" onClick={()=>handleDisplayMode('single')}/>
                      <Button type="primary" icon="read" onClick={()=>handleDisplayMode('double')} style={{marginLeft: '4px'}} />
                      <Button type="primary" icon="download" onClick={()=>handleExeDownload()} style={{marginLeft: '4px'}} />
                    </Col>
                    <Col style={{padding: '2px'}}>
                       <Button key="before_page" type='primary' onClick={prevButtonClick} style={{marginRight: "10px"}}>
                         이전 페이지
                       </Button>
                       [<span>{page + 1}</span> of <span>{totalPage}</span>]
                       <Button key="next_page" type='primary' onClick={nextButtonClick} style={{marginLeft: "10px"}}>
                         다음 페이지
                       </Button>
                     </Col>
                     <Col style={{padding: '2px'}}>
                       <Button key="save_back" type='primary' onClick={() =>{handleProgramConfirm(false);} } >
                         닫기
                       </Button>
                      </Col>
                    </Row>,
                 ]}
       >

       <div id="programFlipBookContainer" style={{ width: "100%", height: "100%", position: "relative" }}>
         <HTMLFlipBook
             ref={bookRef}
             width={pageWidth}
             height={pageHeight}
             style={{backgroundImage: "url(images/background.jpg)" }}
             size="stretch"
             startPage={0}
             startZIndex={0}
             autoSize={true}
             drawShadow={true}
             clickEventForward={false}
             useMouseEvents={false}
             swipeDistance={30}
             flippingTime={1000}
             usePortrait={true}
             showPageCorners={true}
             disableFlipByClick={true}
             minWidth={200}
             maxWidth={1000}
             minHeight={100}
             maxHeight={800}
             maxShadowOpacity={0.5}
             showCover={false}
             mobileScrollSupport={true}
             onInit={onInit}
             onFlip={onPage}
             className="flip-book html-book"
           >

          { programPages }

           </HTMLFlipBook>

         </div>
         <div id="programCarouselBookContainer" style={{ display: 'none', width: "100%", position: "relative" }}>
           <Carousel ref={pageSliderRef} effect='fade' dots={false}  afterChange={onSliderPage}>
             {programPages.map(page => {return (page);})}
           </Carousel>
         </div>
         <div id="programFullPage" onClick={()=>zoomHideImg()}>
            <div id="programFullPageImage">
            </div>
         </div>

    </Modal>

  );

};
