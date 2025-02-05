export interface MovementsAttributes {
  id: number;
  productId: number;
  productName: string;
  type: "inBound" | "outBound";
  quantity: number;
  date: Date;
}
