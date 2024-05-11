import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

baseUrl:string=`https://ecommerce.routemisr.com/api/v1/`
//myToken:any={token:localStorage.getItem('etoken')}
cartNumber:BehaviorSubject<number>=new BehaviorSubject(0)

addTocart(prodId:string):Observable<any>{
return this._HttpClient.post(this.baseUrl+`cart` , {productId:prodId}  //,  {headers:this.myToken}
)
}


getCartUser():Observable<any>{
return this._HttpClient.get(this.baseUrl+`cart`//,{headers:this.myToken}

)
}


removeCartItem(prodId:string):Observable<any>{
  return this._HttpClient.delete(this.baseUrl+`cart/${prodId}` //,{headers:this.myToken}

  )
  }


updateCartcount(prodId:string , countNum:number):Observable<any>{
  return this._HttpClient.put(this.baseUrl+`cart/${prodId}` ,{count: countNum}//,{headers:this.myToken}

  )
}  

clearCart():Observable<any>{
return this._HttpClient.delete(this.baseUrl+`cart` //, {headers:this.myToken}

)
}

checkOut(cartID:string|null , orderInfo:object):Observable<any>{
  return this._HttpClient.post(this.baseUrl+`orders/checkout-session/${cartID}?url=http://localhost:4200` , {shippingAddress : orderInfo}) //, {headers:this.myToken}

  
}

}
