import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interfaces/product';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { Category } from 'src/app/core/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { WishlistService } from 'src/app/core/services/wishlist.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink,FormsModule,CuttextPipe,CarouselModule, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
  private _ProductService:ProductService ,
  private _CartService:CartService ,
  private _ToastrService:ToastrService ,
  private _Renderer2 :Renderer2,
  private _WishlistService:WishlistService
){}
products:Product [] = []
categories:Category [] = []
term:string=``
wishListData:string[]=[]

  ngOnInit(): void {
    
    this._ProductService.getProducts().subscribe({
      next: (response) => {
        //console.log(response.data);
        this.products = response.data;
      },
      /*error: (err) => {
        //console.log(err);
      },*/
    });

    this._ProductService.getCategories().subscribe({
      next: (response) => {
        console.log('Categories',response.data);
        this.categories = response.data;
      },
      /*error: (err) => {
        //console.log(err);
      },*/
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



  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3 
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false,
    autoplay: true,
    autoplayTimeout: 7000,
    autoplaySpeed:1000
  }
  

  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000
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
