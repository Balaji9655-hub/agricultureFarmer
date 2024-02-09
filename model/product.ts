export class Product {
  code: string | null = null;
  productName: string | null = null;
  category: string | null = null;
  image: any | null = null;
  description: string | null = null;

  constructor(product?: Product) {
    if (product) {
      this.deserialize(product);
    }
  }

  public deserialize(product: Product) {
    const keys = Object.keys(this);
    for (const key of keys) {
      if (product?.hasOwnProperty(key)) {
        switch (key) {
          default:
            (this as any)[key] = (product as any)[key];
        }
      }
    }
  }
}