export interface IMenu {
  menu: string;
  menuPrice: string;
  menutype: string;
  menuImageUrl: string;
  description: string;
  id?: number;
  restaurantId?: number;
  favorite: false;
  rating: number;
}
