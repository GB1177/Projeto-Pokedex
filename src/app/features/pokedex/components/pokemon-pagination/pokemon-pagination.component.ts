import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pokemon-pagination',
  standalone: true,
  templateUrl: './pokemon-pagination.component.html',
  styleUrl: './pokemon-pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonPaginationComponent {
  @Input({ required: true }) currentPage = 1;
  @Input({ required: true }) totalPages = 1;
  @Input() hasPreviousPage = false;
  @Input() hasNextPage = false;
  @Input() isLoading = false;

  @Output() pageChange = new EventEmitter<number>();

  protected goToPreviousPage(): void {
    if (this.hasPreviousPage && !this.isLoading) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  protected goToPage(page: number): void {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages && !this.isLoading) {
      this.pageChange.emit(page);
    }
  }

  protected goToNextPage(): void {
    if (this.hasNextPage && !this.isLoading) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  protected get paginationItems(): Array<number | 'ellipsis'> {
    const pages = new Set<number>([1, this.totalPages]);
    const start = Math.max(1, this.currentPage - 1);
    const end = Math.min(this.totalPages, this.currentPage + 1);

    for (let page = start; page <= end; page++) {
      pages.add(page);
    }

    const sortedPages = Array.from(pages).sort((firstPage, secondPage) => firstPage - secondPage);
    const items: Array<number | 'ellipsis'> = [];

    sortedPages.forEach((page, index) => {
      const previousPage = sortedPages[index - 1];

      if (previousPage && page - previousPage > 1) {
        items.push('ellipsis');
      }

      items.push(page);
    });

    return items;
  }
}
