import { IReviews } from "./reviews"
export interface ICourse {
    id:number,
    title:string,
    price:number,
    desc:string,
    image:string,
    rating:number,
    duration:number,
    author:string,
    reviews:IReviews[]
}
