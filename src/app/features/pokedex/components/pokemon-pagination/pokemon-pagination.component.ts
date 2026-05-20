import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pokemon-pagination',
  standalone: true,
  templateUrl: './pokemon-pagination.component.html',
  styleUrl: './pokemon-pagination.component.scss'
})
export class PokemonPaginationComponent {
  @Input({ required: true }) currentPage = 1;
  @Input() hasPreviousPage = false;
  @Input() hasNextPage = false;
  @Input() isLoading = false;

  @Output() pageChange = new EventEmitter<number>();

  protected goToPreviousPage(): void {
    if (this.hasPreviousPage && !this.isLoading) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  protected goToNextPage(): void {
    if (this.hasNextPage && !this.isLoading) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
}
