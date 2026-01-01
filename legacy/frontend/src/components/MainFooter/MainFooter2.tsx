import React from 'react';

/**
 * @description NomalLayout에서 사용되는 메인 푸터 컴포넌트
 */
export const MainFooter2 = () => {
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        VRMart All Contents © {new Date().getFullYear()}. All rights reserved. <br/>
        Proudly made with VRRO
      </div>
    </>
  );
};
