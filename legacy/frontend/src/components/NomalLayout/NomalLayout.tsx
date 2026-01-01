import React, { FC, ReactNode, CSSProperties } from 'react';
import { Layout } from 'antd';
import { CompleteSearch, MainHeader } from 'components/MainHeader';
import { MainFooter } from 'components/MainFooter';

type PropTypes = {
  children: ReactNode;
};

/**
 * @description 공통 레이아웃
 * @param {ReactNode} children
 */

export const NomalLayout: FC<PropTypes> = ({ children }) => {
  const { Header, Footer, Content } = Layout;

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Layout style={LayoutStyle}>
        <Header id='MainHeader' style={HeaderStyle}>
          <MainHeader />
        </Header>
          <Content style={ContentStyle}>
            <div>{children}</div>
          </Content>
        <Footer id='MainFooter' style={FooterStyle}>
          <MainFooter />
        </Footer>
      </Layout>
    </div>
  );
};

const LayoutStyle = {
  overflow: 'hidden',
  maxWidth: '1320px',
  backgroundColor: '#ffffff'
};

const HeaderStyle: CSSProperties = {
  backgroundColor: '#ffffff',
  width: '100%',
  padding: '0px',
  minHeight: '210px',
};


const ContentStyle: CSSProperties = {
  padding: '0px',
  maxWidth: '1320px', // NOTE: Full Wide XGA / 1366x768 => 16:9
  width: '100%',
  margin: '0 auto',
  minHeight: '540px',
  overflow: 'auto',
};

const FooterStyle: CSSProperties = {
  minHeight: '230px',
  padding: '0px',
  background: '#ffffff'
};
