import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() limit: number;
  @Input() total: number;
  @Input() pages: number;
  @Input() page: number;

  @Output() onPageChange: EventEmitter<any> = new EventEmitter<any>();

  pageChange(event) {
    event ? this.onPageChange.emit({ page: this.page }) : false
  }

}
