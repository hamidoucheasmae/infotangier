import { Category } from './../models/category';
import { CategoryService } from '../services/category.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryArray : any = [];
  formCategory !: string;
  formStatus : string = "Add";
  categoryId !: string
  


  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void
  {
    this.categoryService.loadData().subscribe((val:any) =>{
      
      this.categoryArray = val;
    })
  }

  addCategory(categoryForm: any){
    let categoryData: Category = {
      category : categoryForm.value.category,
    }

    if (this.formStatus == 'Add') {
      this.categoryService.saveData(categoryData);
      categoryForm.reset();
    }

    else if (this.formStatus == 'Edit') {
      this.categoryService.updateData(this.categoryId, categoryData);
      categoryForm.reset();
      this.formStatus = 'Add'
    }

    
  }

  editCategory(category: any, id: any){

    this.formCategory = category;
    this.formStatus = "Edit";
    this.categoryId = id;
    
  }

  deleteCategory(id: any){

    if ((confirm('Are you sure you want to delete this category'))) {
      this.categoryService.deleteData(id)
    }
  }
}
