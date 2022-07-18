export interface IRating {
  star: number;
  userId: number;
  restaurantId: number;
  menuId: number;
}

export interface IRatingResponse extends IRating {
  id: number;
}
