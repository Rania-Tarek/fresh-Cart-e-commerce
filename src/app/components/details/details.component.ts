import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,CarouselModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit  {
constructor(private _ActivatedRoute:ActivatedRoute, 
  private _ProductService : ProductService, 
  private _Renderer2 : Renderer2,
  private _CartService : CartService,
  private _ToastrService : ToastrService
){}

productid! : string|null
productDetails : any = null;
ngOnInit(): void{
this._ActivatedRoute.paramMap.subscribe({
  next:(params) =>{
    this.productid  = params.get('id')
    console.log(this.productid);
    
  }


})

this._ProductService.getSpecificProduct(this.productid).subscribe({
  next:(response) =>{
    console.log(response.data);
    
    this.productDetails = response.data;

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

  productDetailsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true
  }

}



