import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Analytics from 'react-router-ga';
import { Beforeunload } from 'react-beforeunload';

import { NomalLayout } from 'components';
import { ShopView, MainView, SearchView, HelpMainView } from 'modules/main/view';
import { ProductListView, ProductView, ProductDotView, ProductSetListView, ProductSetInfo, CartView, PaymentView, PaymentResultView, ProductPackageListView, ProductPackageInfo, ProductRentListView, ProductRentInfo } from 'modules/productlist/view';
import { ManualListView, ManualView } from 'modules/manuallist/view';
import { VrMallListView, VrMallView, VrMallBaseView } from 'modules/vrmall/view';
import { CreationListView, CreationEditorView, CreationView } from 'modules/creation/view';
import { DotArtListView, DotArtEditorView, DotArtView, DotArtEditor2DView, DotArt2DView, DotArtCommunityView, SchoolDotArtListView } from 'modules/dotart/view';
import { TermsOfService, Privacy } from 'modules/policy';
import { LoginView, AccountView, MyVrMallListView, MyPageView, PasswordResetView, PasswordChangeView, OrderResultView } from 'modules/user/view';
import { HelpCenterView } from 'modules/help/view';

//export const SOPOONG_URL = 'http://localhost';
export const SOPOONG_URL = 'http://210.115.229.12:8030';   // brickground
//export const SOPOONG_URL = 'http://210.115.229.12:8031';   // brickground_test
//export const SOPOONG_URL = 'http://www.sopoong.shop';
//export const SOPOONG_URL = 'http://3.34.72.25';
export const SOPOONG_WS_URL = 'ws://localhost';
//export const SOPOONG_WS_URL = 'ws://210.115.229.12:8020';


export const SHOP_ID = '1000000001';
export const ROOT_PATH = '/';
export const SHOP_URL = '/brickground';
export const SHOP_URL_INDEX = '/brickground/index.html';
export const MAIN_PATH =  SHOP_URL + '/main';
export const PRODUCTS_LIST_PATH =  SHOP_URL + '/products';
export const PRODUCT_LIST_PATH =  SHOP_URL + '/product';
export const PRODUCT_SET_LIST_PATH =  SHOP_URL + '/productset';
export const PRODUCT_SET_INFO_PATH = SHOP_URL + '/productset/info';
export const PRODUCT_PACKAGE_LIST_PATH= SHOP_URL + '/productpackage';
export const PRODUCT_PACKAGE_INFO_PATH= SHOP_URL + '/productpackage/info';
export const PRODUCT_RENT_LIST_PATH =  SHOP_URL + '/productrent';
export const PRODUCT_RENT_INFO_PATH = SHOP_URL + '/productrent/info';
export const MANUALS_LIST_PATH =  SHOP_URL + '/manuals';
export const MANUAL_LIST_PATH =  SHOP_URL + '/manual';
export const CART_PATH =  SHOP_URL + '/cart';
export const PAYMENT_PATH =  SHOP_URL + '/payment';
export const PAYMENT_RESULT_PATH =  SHOP_URL + '/paymentresult';
export const VR_MALLS_PATH =  SHOP_URL + '/vrmalls';
export const VR_MALL_PATH = SHOP_URL + '/vrmall/:vrMallId';
export const VR_MALL_VIEW_PATH = SHOP_URL + '/vrmall/view';
export const VR_MALL_BASE_VIEW_PATH = SHOP_URL + '/vrmall/baseview';

export const DOTARTS_PATH =  SHOP_URL + '/dotarts';
export const DOTART_EDITOR_PATH = SHOP_URL + '/dotart/editor';
export const DOTART_VIEW_PATH = SHOP_URL + '/dotart/view';
export const DOTART_EDITOR_2D_PATH = SHOP_URL + '/dotart/editor2d';
export const DOTART_VIEW_2D_PATH = SHOP_URL + '/dotart/view2d';
export const DOTART_INFO_PATH = SHOP_URL + '/dotart/info';
export const DOTART_COMMUNITY_PATH = SHOP_URL + '/dotart/community';
export const SCHOOL_DOTARTS_PATH = SHOP_URL + '/schooldotarts';

export const CREATIONS_PATH= SHOP_URL+"/creations";
export const CREATION_EDITOR_PATH= SHOP_URL+"/creation/editor";
export const CREATION_VIEW_PATH= SHOP_URL+"/creation/view";
export const CREATION_INFO_PATH= SHOP_URL+"/creation/info";
export const CREATION_COMMUNITY_PATH= SHOP_URL+"/creation/community";

export const SEARCH_PATH = SHOP_URL + '/search';

export const TERMS_OF_SERVICE_PATH =  SHOP_URL + '/policy/termsofservice';
export const PRIVACY_PATH =  SHOP_URL + '/policy/privacy';

export const LOGIN_PATH =  SHOP_URL + '/login';
export const ACCOUNT_PATH =  SHOP_URL + '/account';
export const MY_VR_MALLS_PATH =  SHOP_URL + '/myvrmalls';
export const MY_PAGE_PATH =  SHOP_URL + '/mypage';
export const ORDER_RESULT_PATH= SHOP_URL+"/orderresult";
export const PASSWORD_CHANGE_PATH =  SHOP_URL + '/passwordchange';
export const PASSWORD_RESET_PATH =  SHOP_URL + '/passwordreset';

export const HELP_PATH =  SHOP_URL + '/help';

export const HELP_MAIN_PATH =  SHOP_URL + '/helpmain';

//export const JUSO_API_KEY =  'devU01TX0FVVEgyMDIwMDcyMDExMzExNDEwOTk2ODc=';
export const JUSO_API_KEY =  'U01TX0FVVEgyMDIwMDcyMDExMjgxNjEwOTk2ODY=';


export const Routes = () => {

  return (
    <Router >
      <Analytics id='UA-172718993-1' debug>
          <Switch>
            <NomalLayout>
              <Route exact path={ROOT_PATH} component={MainView}  />
              <Route exact path={SHOP_URL} component={MainView}  />
              <Route exact path={SHOP_URL_INDEX} component={MainView} />
              <Route exact path={MAIN_PATH} component={MainView}  />
              <Route exact path={PRODUCTS_LIST_PATH} component={ProductListView}  />
              <Route exact path={`${PRODUCT_LIST_PATH}/:productId`} component={ProductView}  />
              <Route exact path={PRODUCT_SET_LIST_PATH} component={ProductSetListView}  />
              <Route exact path={`${PRODUCT_SET_INFO_PATH}/:productId`} component={ProductSetInfo} />

              <Route exact path={PRODUCT_PACKAGE_LIST_PATH} component={ProductPackageListView} />
      				<Route exact path={`${PRODUCT_PACKAGE_INFO_PATH}/:productId`} component={ProductPackageInfo} />
      				<Route exact path={PRODUCT_RENT_LIST_PATH} component={ProductRentListView} />
      				<Route exact path={`${PRODUCT_RENT_INFO_PATH}/:productId`} component={ProductRentInfo} />

              <Route exact path={MANUALS_LIST_PATH} component={ManualListView}  />
              <Route exact path={`${MANUAL_LIST_PATH}/:productId`} component={ManualView}  />
              <Route exact path={CART_PATH} component={CartView} />
              <Route exact path={PAYMENT_PATH} component={PaymentView}  />
              <Route exact path={`${PAYMENT_RESULT_PATH}/:orderSummaryId`} component={PaymentResultView}  />
              <Route exact path={VR_MALLS_PATH} component={VrMallListView}  />
              <Route exact path={`${VR_MALL_VIEW_PATH}/:vrMallId`} component={VrMallView} />
              <Route exact path={`${VR_MALL_BASE_VIEW_PATH}/:vrMallId`} component={VrMallBaseView} />

              <Route exact path={DOTARTS_PATH} component={DotArtListView}  />
              <Route exact path={`${DOTART_EDITOR_PATH}/:creationId`} component={DotArtEditorView}  />
              <Route exact path={`${DOTART_VIEW_PATH}/:creationId`} component={DotArtView} />
              <Route exact path={`${DOTART_EDITOR_2D_PATH}/:creationId`} component={DotArtEditor2DView}  />
              <Route exact path={`${DOTART_VIEW_2D_PATH}/:creationId`} component={DotArt2DView} />
              <Route exact path={`${DOTART_COMMUNITY_PATH}/:creationId`} component={DotArtCommunityView} />
              <Route exact path={SCHOOL_DOTARTS_PATH} component={SchoolDotArtListView}  />

              <Route exact path={CREATIONS_PATH} component={CreationListView}  />
              <Route exact path={`${CREATION_EDITOR_PATH}/:creationId`} component={CreationEditorView} />
              <Route exact path={`${CREATION_VIEW_PATH}/:creationId`} component={CreationView} />

              <Route exact path={SEARCH_PATH} component={SearchView}  />

              <Route exact path={PRIVACY_PATH} component={Privacy}  />
              <Route exact path={TERMS_OF_SERVICE_PATH} component={TermsOfService}  />

              <Route exact path={LOGIN_PATH} component={LoginView}  />
              <Route exact path={ACCOUNT_PATH} component={AccountView}  />
              <Route exact path={PASSWORD_RESET_PATH} component={PasswordResetView}  />
              <Route exact path={MY_VR_MALLS_PATH} component={MyVrMallListView}  />
              <Route exact path={MY_PAGE_PATH} component={MyPageView}  />

              <Route exact path={`${ORDER_RESULT_PATH}/:orderSummaryId`} component={OrderResultView} />

              <Route exact path={PASSWORD_CHANGE_PATH} component={PasswordChangeView}  />
              <Route exact path={HELP_MAIN_PATH} component={HelpMainView}  />
              <Route exact path={`${HELP_PATH}/:service`} component={HelpCenterView}  />

            </NomalLayout>
          </Switch>
      </Analytics>
    </Router>
  );
};
