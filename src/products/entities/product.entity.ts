import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()    
    id: number

    @Column({type: 'varchar', length: 255, unique: true})
    name: string;    

    @Column({type: 'text'})
    description: string;

    @Column({type: 'money'})
    price: number;

    @Column({type: 'smallint'})
    stock: number;

    @Column({type: 'boolean'})
    avaliable: boolean;

    @Column({type: 'varchar'})
    image: string
}
