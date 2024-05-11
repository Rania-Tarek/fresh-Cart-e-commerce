import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { Product } from 'src/app/core/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule , RouterLink, CuttextPipe ],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  products:Product [] = []
  wishListData:string[]=[]

  constructor(private _WishlistService:WishlistService , private _ToastrService:ToastrService , private _Renderer2 : Renderer2 , private _CartService : CartService){}
  ngOnInit(): void {
  this._WishlistService.getWishlist().subscribe({
    next:(response)=>{
      console.log(response);
      this.products=response.data
      
      const newData= response.data.map((item:any)=>item._id)
        
      this.wishListData=newData


    }
  })
}

addFav(prodID:string|undefined):void{
  this._WishlistService.addTowishlist(prodID).subscribe({
    next:(response)=>{
      console.log(response);
      this._ToastrService.success(response.message)
      this.wishListData=response.data;
      this._WishlistService.wishListNumber.next(this.wishListData.length)

    }
  })
}

removeFav(prodID:string|undefined):void{
this._WishlistService.removeWishlist(prodID).subscribe({
next:(response)=>{
  console.log(response);
  this._ToastrService.success(response.message)
  this.wishListData=response.data;
  const newWishList= this.products.filter((item:any)=> this.wishListData.includes(item._id))
  this.products=newWishList

  this._WishlistService.wishListNumber.next(this.wishListData.length)


}
})
}

addProduct(id:any , elemengt:HTMLButtonElement):void
{

  this._Renderer2.setAttribute(elemengt,'disabled','true')
  this._CartService.addTocart(id).subscribe({
    next: (response) => {
      console.log('cart',response);
      this._ToastrService.success(response.message)
      this._Renderer2.removeAttribute(elemengt,'disabled')
      this._CartService.cartNumber.next(response.numOfCartItems)


    },
    error: (err) => {
      this._Renderer2.removeAttribute(elemengt,'disabled')
    },
  })
}



}
