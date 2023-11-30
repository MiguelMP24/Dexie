import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  Data: Category[] = [];
  Formulario: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  EditForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required)
  });

  editingCategoryId: string | null = null;

  constructor(private readonly categoryService: CategoryService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.categoryService.getAllCategories().then(categories => {
      this.Data = categories;
    });
  }

  addSave() {
    if (this.editingCategoryId) {
      this.editSave();
    } else {
      this.categoryService.addCategory(this.Formulario.value)
        .then(() => {
          this.Formulario.reset();
          this.loadData();
        })
    }
  }

  editCategory(category: Category) {
    this.editingCategoryId = category.id;
    this.EditForm.setValue({ id: category.id, name: category.name });
  }

  deleteCategory(categoryId: string) {
    const confirmDelete = confirm('¿Estás seguro de que quieres eliminar esta categoría?');
    
    if (confirmDelete) {
      this.categoryService.deleteCategory(categoryId)
        .then(() => {
          this.loadData();
        })
    }
  }

  editSave() {
    const editedCategory: Category = {
      id: this.EditForm.value.id,
      name: this.EditForm.value.name
    };

    this.categoryService.updateCategory(editedCategory)
      .then(() => {
        this.editingCategoryId = null;
        this.EditForm.reset();
        this.loadData();
      })
  }

  
}