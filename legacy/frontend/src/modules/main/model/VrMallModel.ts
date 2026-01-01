
export interface VrMallModel {
  vrMallId: number;
  userId: number;
  categoryId?: number;
  vrMallName: string;
  description?: string;
  coverImage?: string;
  likeCount?: number;
  commentCount?: number;
  backgroundPath?: string;
  groundPath?: string;
  cameraPosition?: string;
  cameraTarget?: string;
  createDate?: string;
  updateDate?: string;
}
