import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
constructor(private _ProductService:ProductService){}
brandsData:any = [];

ngOnInit(): void {
  this._ProductService.getAllBrands().subscribe({
    next:(response)=>{
      //console.log(response.data);
      
      this.brandsData=response.data
    }

    
  })
}

}
