import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interfaces/product';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule , RouterLink, CuttextPipe , NgxPaginationModule ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  constructor(
    private _ProductService:ProductService ,
    private _CartService:CartService ,
    private _ToastrService:ToastrService ,
    private _Renderer2 :Renderer2,
    private _WishlistService :WishlistService
  ){}
  products:Product [] = []
  pageSize:number= 0;
  currentPage:number=1;
  total:number=0;
  wishListData:string[]=[]


  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next: (response) => {
        console.log(response.data);
        this.products = response.data;
        this.pageSize=response.metadata.limit
        this.currentPage=response.metadata.currentPage
        this.total=response.results
      },
    });

    this._WishlistService.getWishlist().subscribe({
      next:(response)=>{
        const newData= response.data.map((item:any)=>item._id)
        
        this.wishListData=newData

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


  pageChanged(event:any):void{
    this._ProductService.getProducts(event).subscribe({
      next: (response) => {
        console.log(response.data);
        this.products = response.data;
        this.pageSize=response.metadata.limit
        this.currentPage=response.metadata.currentPage
        this.total=response.results
      },
  }
    )

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
    this._WishlistService.wishListNumber.next(this.wishListData.length)

  }
})
  }
}
