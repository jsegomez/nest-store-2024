import { Product } from "src/entities/product.entity";

export const dataProducts: Product[] = [
    {
        id: 1, 
        name: 'Producto 1',
        price: 10.0,
        description: 'Descripción producto 1',
        avaliable: true,
        stock: 10,
        url: 'url producto 1'
    },
    {
        id: 2, 
        name: 'Producto 2',
        price: 20.0,
        description: 'Descripción producto 2',
        avaliable: true,
        stock: 12,
        url: 'url producto 2'
    },
    {
        id: 3, 
        name: 'Producto 3',
        price: 14.0,
        description: 'Descripción producto 3',
        avaliable: true,
        stock: 16,
        url: 'url producto 3'
    },
    {
        id: 4, 
        name: 'Producto 4',
        price: 18.0,
        description: 'Descripción producto 4',
        avaliable: true,
        stock: 18,
        url: 'url producto 4'
    }
]