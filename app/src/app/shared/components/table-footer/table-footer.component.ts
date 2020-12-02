import { Component, OnInit, Input } from '@angular/core';
import { CommonUtils } from '../../service/common-utils.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'table-footer',
  templateUrl: './table-footer.component.html'
})
export class TableFooterComponent implements OnInit {
  @Input()
  public resultList: any;
  parseInt = parseInt;
  commonUtils: CommonUtils;
  constructor() { }

  ngOnInit() {
  }

}
