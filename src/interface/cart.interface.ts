import {Document, ObjectId} from "mongoose"
export interface CartInterface extends Document{
  userId:ObjectId,
  cartItems:[{productId:ObjectId, quantity:number,price:number}],
  
}