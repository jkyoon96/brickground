
export interface ShopModel {
  shopId: number;
  shopName: string;
  shopAlias?: string;
  coverImage?: string;
  description?: string;
  managerId: number;
  shopAddress?: string;
  shopDetailAddress?: string;
  shopZip?: string;
  shopTelephone?: string;
  shopFax?: string;
  shopEmail?: string;
  shopStatusCode?: string;
  createDate?: string;
  updateDate?: string;
}
