import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  items: any;
  cart = new Map();

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    //get items on app load and assign to the variable. Currently using in-app json file. SHould be loaded from backend.
    this.appService.getItems().subscribe(res => {
      console.log(res);
      this.items = res;
    })
  }

  addToCart(item: any) {
    //the cart var contains name and rate by default, adding/updating count of item here
    //this cart component is passed as input to the app-cart component
    item.count = this.cart.has(item.name) ? this.cart.get(item.name).count+1 : 1;
    this.cart.set(item.name, item);
    console.log(this.cart);
  }
}
