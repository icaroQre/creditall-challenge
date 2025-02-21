export interface Sale {
  id: number;
  quantity: number;
  discount: number;
  status: "completed" | "pending" | "canceled";
  saleDate: Date;
  createdAt: Date;
  clientId: number;
  productId: number;
  client: {
    name: string;
    email: string;
    cpf: string;
  };
  product: {
    name: string;
    description: string;
    price: number;
    image?: string;
  };
}

export type TfomrSale = {
  clientId: number;
  productId: number;
  date: Date;
  quantity: number;
  status: "completed" | "pending" | "canceled";
  discount?: number;
};
