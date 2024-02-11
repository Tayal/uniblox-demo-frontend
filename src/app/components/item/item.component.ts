import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: any;
  @Output() toCart = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  addToCart() {
    //app-item and app-cart components are siblings and app-body is their parent.
    //items selected by user are emitted to the parent component (app-body) which is then shared to the app-cart component by the app-body.
    console.log(this.item.name+" added to cart.");
    this.toCart.emit(this.item);
  }
}
