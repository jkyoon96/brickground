
export interface UserModel {
  userId: number;
  userNm: string;
  password: string;
  ihidnum?: string;
  sexdstnCode?: string;
  brthdy?: string;
  areaNo?: string;
  houseAdres?: string;
  detailAdres?: string;
  zip?: string;
  mbtlnum?: string;
  emailAdres: string;
  userSttusCode?: string;
  sbscrbDe?: string;
  lockAt?: string;
  lockCnt?: number;
  lockLastPnttm?: string;
  createDate?: string;
  updateDate?: string;
}
