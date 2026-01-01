import { userItems } from './dummyData';
import { UserModel } from '../model';


export const userService = {
  /**
   * @description 유저 목록 가져오기
   * @param {number} [pageNumber=1] 가져올 페이지 번호
   * @param {number} [pageSize=4] 서버에 요청할 제품 수
   *
   * NOTE: 별다른 요구사항이 없다면 일단 pageSize는 고정(4) - 짝수가 ui 구성하기 편함(why? antd는 col을 24로 나눈다.)
   */
  getItems: (pageNumber: undefined | number = 1, pageSize: number = 4) => {
    // NOTE: 서버가 없어서 가내 수공업
    const newUserItems: UserModel[] = Object.assign(userItems);
    const totalUsers = newUserItems.length;

    const startIndex: number =
      pageNumber === 1 ? 0 : (pageNumber - 1) * pageSize;

    const endIndex: number =
      pageNumber * pageSize > totalUsers
        ? totalUsers
        : pageNumber * pageSize;

    // NOTE: 최대한 서버가 보내주는 데이터랑 비슷하게 만듬.
    const serverData = {
      items: newUserItems
        .sort((a, b) => b.userId - a.userId)
        .slice(startIndex, endIndex),
      totalUsers,
    };

    return serverData;
  },

};
