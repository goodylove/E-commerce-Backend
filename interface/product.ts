export interface ProductTypes {
     name: string
    slug?:string
    description: string
    stock: number,
    price:number
    imageUrl?: string
    categoryId: string
    brandId: string
    status:"IN_STOCK" | "OUT_OF_STOCK"
}