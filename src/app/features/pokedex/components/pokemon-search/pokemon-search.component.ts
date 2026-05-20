import {
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ChangeDetectionStrategy,
  computed,
  inject,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { PokemonListItem } from '../../interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pokemon-search.component.html',
  styleUrl: './pokemon-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonSearchComponent implements OnChanges {
  @Input() suggestions: PokemonListItem[] = [];

  @Output() searchChange = new EventEmitter<string>();

  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly searchTerm = signal('');
  readonly isFocused = signal(false);
  readonly suggestionIndex = signal<PokemonListItem[]>([]);
  readonly filteredSuggestions = computed(() => {
    const term = this.searchTerm().toLowerCase();

    if (!term) {
      return [];
    }

    return this.suggestionIndex()
      .filter((pokemon) => pokemon.name.toLowerCase().includes(term))
      .slice(0, 5);
  });
  readonly shouldShowSuggestions = computed(
    () => this.isFocused() && this.searchTerm().length > 0 && this.filteredSuggestions().length > 0
  );

  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        const term = value.trim();

        this.searchTerm.set(term);
        this.searchChange.emit(term);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['suggestions']) {
      this.suggestionIndex.set(this.suggestions);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target;

    if (target instanceof Node && !this.elementRef.nativeElement.contains(target)) {
      this.isFocused.set(false);
    }
  }

  onFocus(): void {
    this.isFocused.set(true);
  }

  onBlur(): void {
    window.setTimeout(() => this.isFocused.set(false), 120);
  }

  selectSuggestion(pokemon: PokemonListItem): void {
    this.searchControl.setValue(pokemon.name, { emitEvent: false });
    this.searchTerm.set(pokemon.name);
    this.isFocused.set(false);
    this.searchChange.emit(pokemon.name);
  }

  clearSearch(): void {
    this.searchControl.setValue('', { emitEvent: false });
    this.searchTerm.set('');
    this.isFocused.set(false);
    this.searchChange.emit('');
  }
}
