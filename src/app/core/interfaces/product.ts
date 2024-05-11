export interface Product {
    title : string,
    category : { name: string},
    imageCover:string,
    ratingsAverage:number,
    price:number
    _id?:string,
    
    
}

/*export interface productDetails{
    
        sold: number
        images: string[]
        ratingsQuantity: number
        _id: string
        title: string
        slug: string
        description: string
        quantity: number
        price: number
        imageCover: string
        ratingsAverage: number
        createdAt: string
        updatedAt: string
        __v: number
        reviews: any[]
        id: string
}*/