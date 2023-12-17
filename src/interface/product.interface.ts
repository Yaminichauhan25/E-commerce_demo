
import { Document } from "mongoose";
export interface ProductInterface extends Document {
    title:string;
    description:string;
    size:string;
    categories:string;
    color:string;
    price:number;
    image:string
}
