export interface Car {
  id: number;
  title: string;
  price: string;
  year: string;
  mileage: string;
  transmission: string;
  fuel: string;
  engine: string;
  description: string;
  images: string[];
  status: 'available' | 'sold';
  make?: string;
  model?: string;
}
