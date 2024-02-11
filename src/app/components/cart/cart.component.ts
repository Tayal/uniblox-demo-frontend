import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() cart: any;
  discount: string = "";
  validDiscount: boolean = false;
  
  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  //fn to check total current cart value
  getTotal(): number {
    let total=0;
    for(let item of this.cart) {
      total += item[1].count*item[1].rate;
    }
    return total;
  }

  //makes call to discount API and gets true/false response as to discount is applicable or not
  checkDiscount() {
    this.appService.getDiscount(this.discount).subscribe(res => {
      console.log(res);
      this.validDiscount = res;
    })
  }

  //makes call to checkout API and sends cart and discount data as request body.
  checkOut() {
    if(this.cart.size==0) return;

    const reqBody = {
      "items": [...this.cart.values()],
      "total cart value": this.getTotal(),
      "discount": this.validDiscount,
      "discount amount": this.validDiscount ? 0.1*this.getTotal() : 0,
      "amount paid": this.validDiscount ? 0.9*this.getTotal() : this.getTotal()
    }
    this.appService.checkout(reqBody).subscribe(res => {
      console.log("checkout response", res);
    });

    //clear cart and discount
    this.cart.clear();
    this.validDiscount=false;
  }
}
