import React, { Component, useEffect, useState, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { Button, Tabs, Modal } from 'antd';
import $ from 'jquery';
import HTMLFlipBook from 'react-pageflip';

export const ManualBookView = (props) => {

  const [ totalPage, setTotalPage ] = useState<number>(0);
  const [ flipBook, setFlipBook ] = useState<any>({});

  const bookRef = useRef(null);


  useEffect(() => {

    //setTotalPage(flipBook.getPageFlip().getPageCount());

  }, []);


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

    var bookCurrent:any = bookRef.current;
    if(bookCurrent == null)
      return;

    var pageFlip = bookCurrent.pageFlip();
    if(pageFlip == null)
      return;

    pageFlip.flipNext();

  };

  const  prevButtonClick = () => {

    var bookCurrent:any = bookRef.current;
    if(bookCurrent == null)
      return;

    var pageFlip = bookCurrent.pageFlip();
    if(pageFlip == null)
      return;

    pageFlip.flipPrev();
  };



   return (
     <div>
       <div className="container-md" style={{ display: "block" }}>

         <HTMLFlipBook
             ref={bookRef}
             width={550}
             height={733}
             style={{}}
             size="stretch"
             startPage={0}
             startZIndex={0}
             autoSize={true}
             drawShadow={true}
             clickEventForward={true}
             useMouseEvents={true}
             swipeDistance={30}
             flippingTime={1000}
             usePortrait={true}
             showPageCorners={true}
             disableFlipByClick={true}
             minWidth={315}
             maxWidth={315}
             minHeight={200}
             maxHeight={200}
             maxShadowOpacity={0.5}
             showCover={true}
             mobileScrollSupport={true}
             className="demo-book"
           >

            <div>BOOK TITLE</div>
            <div>Lorem ipsum 1</div>
            <div>Lorem ipsum 2</div>
            <div>
            aaa1
            </div>
            <div>
            aaa2
            </div>
            <div>
            aaa3
            </div>
            <div>
            aaa4
            </div>
            <div>
            bbbb
            </div>
            <div>THE END</div>

           </HTMLFlipBook>
         </div>

         <div className="container">
           <div>

             <button type="button" onClick={prevButtonClick}>
               Previous page
             </button>

             <button type="button" onClick={nextButtonClick}>
               Next page
             </button>

           </div>
         </div>

    </div>

  );

};
