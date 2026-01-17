export enum UserRole {
  DONOR = 'DONOR',
  NGO = 'NGO',
  GUEST = 'GUEST'
}

export enum FoodStatus {
  AVAILABLE = 'Available',
  NOTIFIED = 'Notified',
  ACCEPTED = 'Accepted',
  ON_THE_WAY = 'On the way',
  PICKED_UP = 'Picked up',
  DELIVERED = 'Delivered'
}

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
  expiry: string;
  status: FoodStatus;
  donorName: string;
  image: string;
  timestamp: number;
}

export interface ImpactStats {
  foodSavedKg: number;
  peopleFed: number;
  co2SavedKg: number;
}