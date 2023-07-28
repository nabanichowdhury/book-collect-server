import { Model, ObjectId } from "mongoose";



export type IBook= {
    image: string;
    title: string;
    author: string;
    genre: string;
    publicationYear: string;
    owner:ObjectId;
    reviews: string[];

  }



  export type BookModel = Model<IBook, Record<string,unknown>>;

  export type IBookFilters={
    searchTerm?:string; 
    genre?:string;
    publicationYear?:string; 
  }