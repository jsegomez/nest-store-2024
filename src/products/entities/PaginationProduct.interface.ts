import { Product } from "./product.entity";

export interface PaginationProduct{    
    products: Product[],
    page: Page
}

interface Page{
    currentPage: string | number,    
    totalElements: number,
    totalPages:number,
    lastPage: boolean,
    size: number
}


