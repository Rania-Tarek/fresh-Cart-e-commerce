import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule , RouterLink , RouterLinkActive ],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit {

  constructor(
    private _Router:Router,
    private _CartService:CartService,
    private _Renderer2:Renderer2 ,
    private _WishlistService:WishlistService ){}

  @ViewChild('navBar') navElement!:ElementRef //navbar element
  @HostListener('window:scroll')
  onScroll():void{
    if(scrollY>500)
      {
        this._Renderer2.addClass(this.navElement.nativeElement, 'px-5')
        this._Renderer2.addClass(this.navElement.nativeElement, 'shadow')
      }
      else{
        this._Renderer2.removeClass(this.navElement.nativeElement, 'px-5')
        this._Renderer2.removeClass(this.navElement.nativeElement, 'shadow')

      }
  }

  cartNum:number=0

  wishListNumber:number=0

  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next:(data)=>{
        this.cartNum=data;    
      },
    })
    
    this._WishlistService.wishListNumber.subscribe({
      next:(data)=>{
        this.wishListNumber= data
      }
    })

    ;

this._CartService.getCartUser().subscribe({
  next:(response)=>{
    //console.log(response);
this.cartNum= response.numOfCartItems
  },
})


this._WishlistService.getWishlist().subscribe({
  next:(response)=>{
    //console.log(response);
    this.wishListNumber=response.count
  }
})

}

  signOut():void{
localStorage.removeItem('etoken');
this._Router.navigate(['/login']);
}



}
