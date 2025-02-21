export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  image?: string | File;
}

export type TfomrProduct = {
  name: string;
  description: string;
  price: number;
  image?: string | File;
};
