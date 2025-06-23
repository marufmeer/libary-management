import { Model, Types } from "mongoose"


export interface BorrowI {
    book:Types.ObjectId;
    quantity:number;
    dueDate:Date 
}
export interface BorrowModelType extends Model<BorrowI>{
    updateAvailable(bookId:Types.ObjectId | string):void;
}