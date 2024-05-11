import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Category } from 'src/app/core/interfaces/category';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
constructor(private _ActivatedRoute : ActivatedRoute , private _ProductService:ProductService){}
CategoryID:string|null='';  
categoryDetails:Category={} as Category;
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
        this.CategoryID = params.get('id')
    }
  })

  this._ProductService.getSpecificCategory(this.CategoryID).subscribe({
    next:(response)=>{
      this.categoryDetails=response.data      
    }
  })
}
}
