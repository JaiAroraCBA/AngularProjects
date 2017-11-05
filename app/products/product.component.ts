import { Component, OnInit } from '@angular/core';

import { ProductService } from './product.service';
import { Product } from './product';
import { jqxGridComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxgrid';

import { clone } from 'lodash';


@Component({
	moduleId: module.id,
	templateUrl: 'product.template.html'
})

export class ProductComponent implements OnInit {

	products: Product[];
	productForm: boolean = false;
	editProductForm: boolean = false;
	isNewForm: boolean;
	newProduct: any = {};
	editedProduct: any = {};

	constructor(private _productService: ProductService) { }

	source: any =
	{
		datatype: 'JSON',
		datafields: [
			{ name: 'ID', type: 'number' },
			{ name: 'Name', type: 'string' },
			{ name: 'Description', type: 'string' },
			{ name: 'Price', type: 'float' },
		],
		root: 'Products',
		record: 'Product',
		id: 'ProductID',
		url: 'product-data.json'
	};

	dataAdapter: Product = new jqx.dataAdapter(this.source);

	cellsrenderer = (row: number, columnfield: string, value: string | number, defaulthtml: string, columnproperties: any, rowdata: any): string => {
		if (value < 20) {
			return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
		}
		else {
			return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
		}
	};

	columns: any[] =
	[
		{ text: 'Product ID', datafield: 'ID', width: 250 },
		{ text: 'Product Name', datafield: 'Name', cellsalign: 'right', align: 'right' },
		{ text: 'Description', datafield: 'Description', align: 'right', cellsalign: 'right', cellsformat: 'c2' },
		{ text: 'Price', datafield: 'Price', cellsalign: 'right', cellsrenderer: this.cellsrenderer, width: 100 },
	];



	ngOnInit() {
		this.getProducts();
	}

	getProducts() {

		this.products = this._productService.getProductsFromData();
	}

	showEditProductForm(product: Product) {
		if (!product) {
			this.productForm = false;
			return;
		}
		this.editProductForm = true;
		this.editedProduct = clone(product);
	}

	showAddProductForm() {

		//resets the form if edited product
		if (this.products.length) {
			this.newProduct = {};
		}
		this.productForm = true;
		this.isNewForm = true;
	}

	saveProduct(product: Product) {
		if (this.isNewForm) {
			//add new product
			this._productService.addProduct(product);

		}
		this.productForm = false;
	}

	updateProduct() {
		this._productService.updateProduct(this.editedProduct);
		this.editProductForm = false;
		this.editedProduct = {};
	}

	cancelEdits() {
		this.editedProduct = {};
		this.editProductForm = false;
	}

	removeProduct(product: Product) {
		this._productService.deleteProduct(product);
	}

	cancelNewProduct() {
		this.newProduct = {};
		this.productForm = false;
	}
}
