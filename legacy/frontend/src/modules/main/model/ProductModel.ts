
export interface ProductModel {
  productId: number;
  shopId: number;
  categoryId?: number;
  productName: string;
  price?: number;
  remainder?: number;
  vrModelName?: string;
  coverImage?: string;
  description?: string;
  createDate?: string;
  updateDate?: string;
}
