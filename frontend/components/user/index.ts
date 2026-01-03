// Layout components
export { Header, Footer, Layout, MypageSidebar, SellerSidebar } from './layout';

// Card components
export { ProductCard, BrickArtCard, DotArtCard, CreationCard, ManualCard } from './cards';

// Section components
export { HeroSection, FilterBar, SectionTitle, GridLayout, Banner } from './sections';

// Auth components
export {
  BrandSection,
  SocialLoginButtons,
  AgreementCheckbox,
  RegisterForm,
  LoginForm,
  VerificationSteps,
  PasswordFindForm,
  PasswordResetForm,
  PasswordChangeForm,
} from './auth';
export type { Agreement, Step } from './auth';

// Mypage common components
export { StatCard, OrderItem, QuickActionGrid } from './mypage/common';

// Seller components
export { SellerStatCard, TodoItem, SellerOrderRow } from './seller';

// BrickArt viewer components
export { ViewerHeader, ViewerControls, AssemblyGuidePanel, ViewerSidebar } from './brickart/viewer';

// BrickArt editor components
export {
  EditorSidebarLeft,
  EditorToolbar,
  EditorSidebarRight,
  EditorStatusBar,
  EditorCanvas,
  SaveWizardModal,
} from './brickart/editor';

// BrickArt list components
export {
  BrickArtHeroSection,
  BrickArtFilterBar,
  BrickArtCreateFAB,
} from './brickart/list';
export type {
  BrickArtCategory,
  BrickArtSortOption,
  ViewMode,
} from './brickart/list';

// BrickArt detail components
export {
  BrickArtDetailPreview,
  BrickArtDetailInfo,
  BrickArtDetailActions,
} from './brickart/detail';

// Product detail components
export {
  ProductGallery,
  ProductHeader,
  ProductPriceBox,
  ProductPrice,
  ProductOptions,
  ProductActions,
  DeliveryInfo,
  SellerInfo,
  ProductDetailTabs,
  RelatedProductCard,
  Breadcrumb,
  VRPreviewFAB,
} from './product/detail';

// Product list components
export {
  ProductListHero,
  ProductStatsSection,
  ProductFilterBar,
  ProductListCard,
  CartFAB,
} from './product/list';

// Product search components
export {
  SearchHero,
  SearchResultsHeader,
  ActiveFilters,
  SearchPagination,
  RelatedSearches,
  SearchProductCard,
} from './product/search';

// DotArt editor components
export {
  DotArtToolbar,
  DotArtSideTools,
  DotArtCanvas,
  DotArtRightPanel,
  DotArtSaveWizard,
  DotArt3DPreviewModal,
  DotArtExportModal,
  DotArtSizeModal,
} from './dotart/editor';

// DotArt viewer components
export {
  DotArtViewerHeader,
  DotArt3DScene,
  DotArtViewerPanel,
} from './dotart/viewer';

// DotArt detail components
export {
  DotArtDetailPreview,
  DotArtDetailActions,
  DotArtComments,
  DotArtAuthorCard,
  DotArtInfoCard,
  DotArtRelatedWorks,
} from './dotart/detail';
export type { Comment } from './dotart/detail';

// DotArt list components
export {
  DotArtHeroSection,
  DotArtFilterBar,
  DotArtGalleryCard,
  DotArtCreateFAB,
} from './dotart/list';
export type {
  DotArtCategory,
  DotArtSortOption,
  DotArtViewMode,
  DotArtGalleryCardProps,
} from './dotart/list';

// Creation list components
export {
  CreationHeroSection,
  CreationStatsSection,
  CreationFilterBar,
  CreationGalleryCard,
} from './creation/list';

// Creation editor components
export {
  CreationEditorToolbar,
  CreationElementPanel,
  Creation3DCanvas,
  CreationPropertiesPanel,
  CreationExportModal,
  CreationSaveWizard,
} from './creation/editor';

// Creation viewer components
export {
  CreationViewerHeader,
  CreationViewer3DScene,
  CreationViewerPanel,
} from './creation/viewer';

// Creation detail components
export {
  CreationDetailHero,
  CreationDetailComments,
  CreationDetailAuthor,
  CreationDetailRemixes,
  CreationDetailRelated,
} from './creation/detail';
export type { CreationComment } from './creation/detail';

// Cart components
export {
  CartPageHeader,
  CartItemCard,
  CartSelectAll,
  OrderSummary,
  ContinueShopping,
  EmptyCart,
} from './cart';

// Checkout components
export {
  CheckoutPageHeader,
  DeliveryAddressCard,
  CheckoutOrderItem,
  DiscountSection,
  PaymentMethodSelector,
  CheckoutSummary,
  AgreementCheckboxes,
} from './checkout';
export type { PaymentMethodType } from './checkout';

// Order complete components
export {
  OrderCompleteSuccess,
  OrderInfoCard,
  DeliveryTimeline,
  OrderCompleteActions,
} from './order/complete';

// Order detail components
export {
  OrderDetailHeader,
  OrderDeliveryStatus,
  OrderDetailItem,
  OrderPaymentSummary,
  OrderActionCard,
} from './order/detail';
export type { OrderStatus } from './order/detail';

// Manual list components
export {
  ManualListHero,
  ManualStatsSection,
  ManualFilterBar,
  ManualListCard,
  RecentManuals,
} from './manual/list';

// Manual viewer components
export {
  ManualViewerTopBar,
  ManualViewerSidebar,
  ManualViewerContent,
  ManualViewerInfoPanel,
  ManualViewerFloatingNav,
} from './manual/viewer';

// Help center components
export {
  HelpCenterHero,
  HelpCategoryGrid,
  HelpNoticeCard,
  HelpFaqCard,
  HelpContactSection,
  HelpPopularFaq,
} from './help-center';

// FAQ page components
export {
  FaqPageHeader,
  FaqSidebar,
  FaqListItem,
  FaqPagination,
} from './faq';

// Mypage dashboard components
export {
  MypageProfileCard,
  MypageMenu,
  MypageStatCard,
  MypageOrderStatus,
  MypageRecentOrder,
  MypageQuickMenu,
  MypageActivity,
} from './mypage/dashboard';
export type { MypageOrderItemStatus } from './mypage/dashboard';

// Mypage orders components
export {
  OrdersFilterSection,
  OrderProductItem,
  OrderCard,
  OrdersPageHeader,
} from './mypage/orders';
export type { OrderFilterStatus, OrderProductStatus } from './mypage/orders';

// Mypage wishlist components
export {
  WishlistPageHeader,
  WishlistFilterBar,
  WishlistCard,
} from './mypage/wishlist';
export type { WishlistCategory, WishlistBadgeType } from './mypage/wishlist';

// Mypage points components
export {
  PointsPageHeader,
  PointsHeroCard,
  PointsExpirationWarning,
  PointsFilterSection,
  PointHistoryItem,
  PointsTipBox,
} from './mypage/points';
export type { PointsFilterType, PointsPeriod, PointTransactionType } from './mypage/points';

// Mypage coupons components
export {
  CouponsPageHeader,
  CouponRegisterBox,
  CouponsFilterTabs,
  CouponCard,
  CouponInfoBox,
} from './mypage/coupons';
export type { CouponStatusFilter, CouponType, CouponCategory } from './mypage/coupons';

// Mypage profile components
export {
  ProfilePageHeader,
  ProfilePhotoCard,
  ProfileBasicInfoForm,
  ProfilePasswordForm,
  ProfileSocialLinks,
  ProfileNotificationSettings,
  ProfileDangerZone,
} from './mypage/profile';
export type {
  ProfileBasicInfo,
  PasswordFormData,
  SocialProvider,
  SocialLinkStatus,
  NotificationSettings,
} from './mypage/profile';

// Class list components
export {
  ClassListHero,
  ClassStatsSection,
  ClassFilterBar,
  ClassCard,
  UpcomingClassSection,
} from './class/list';
export type {
  ClassCategory,
  ClassSortOption,
  UpcomingClass,
} from './class/list';

// Class detail components
export {
  ClassDetailHero,
  ClassInfoSection,
  ClassDescriptionSection,
  ClassCurriculumSection,
  ClassInstructorCard,
  ClassReviewsSection,
  ClassApplyCard,
  ClassScheduleCard,
  ClassLocationCard,
} from './class/detail';
export type {
  ClassBadgeType,
  ClassStatusType,
  ClassType,
  ClassIconType,
  ClassInfoItem,
  CurriculumItem,
  InstructorInfo,
  ReviewRatingDistribution,
  ClassReview,
  ScheduleItem,
} from './class/detail';

// Class apply components
export {
  ApplyPageHeader,
  ScheduleSelection,
  ParticipantForm,
  GuardianForm,
  PaymentMethodSelect,
  ApplyAgreements,
  ClassSummaryCard,
  ApplyPaymentSummary,
  ApplyNotesCard,
} from './class/apply';
export type {
  ApplyScheduleOption,
  ParticipantData,
  GuardianRelation,
  GuardianData,
  PaymentMethod,
  AgreementItem,
  PaymentRow,
} from './class/apply';

// Home page components
export {
  HomeHero,
  QuickAccessGrid,
  HomeSectionTitle,
  HomeBrickArtCard,
  HomeDotArtCard,
  HomeProductCard,
  HomeManualCard,
  CategoryPills,
  NewsletterSection,
} from './home';
export type {
  BannerSlide,
  QuickAccessItem,
  HomeBrickArtItem,
  BrickArtBadgeType,
  HomeDotArtItem,
  DotArtBadgeType,
  HomeProductItem,
  ProductBadgeType,
  HomeManualItem,
  ManualCategoryType,
  CategoryPillItem,
} from './home';
