import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient) { }
  baseURL:string = `https://ecommerce.routemisr.com/api/v1/`
  
  getProducts(pageNum: number = 1):Observable<any>{
    return this._HttpClient.get(this.baseURL+`products?page=${pageNum}`);
  }

  getCategories():Observable<any>{
    return this._HttpClient.get(this.baseURL+`categories`);
  }

  //productDetails
  getSpecificProduct(Id:string|null):Observable<any>{
    return this._HttpClient.get(this.baseURL+`products/${Id}`);
  }


  getSpecificCategory(categoryId:string|null):Observable<any>{
    return this._HttpClient.get(this.baseURL+`categories/${categoryId}`);
  }

  
  getAllBrands():Observable<any>{
    return this._HttpClient.get( this.baseURL+`brands`);
  }

}




