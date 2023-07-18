
import { Schema, model } from "mongoose";
import { BookModel, IBook } from "./book.interface";


const BookSchema = new Schema<IBook,BookModel >({
    image: {
      type: String,
      
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    
    publicationYear: {
      type: String,
      required: true,
    },
    owner:{
      type:Schema.Types.ObjectId,
      ref:'User',
      required:true
    },
    reviews: {
      type: [String],
      ref: 'Review',
      default: [],
    }
  

    

  });

  export const Book = model<IBook, BookModel>('Book', BookSchema);