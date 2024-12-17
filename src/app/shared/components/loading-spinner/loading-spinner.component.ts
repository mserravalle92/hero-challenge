import { Component } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  imports: [MatProgressSpinnerModule, CommonModule],
})
export class LoadingSpinnerComponent {
  isLoading$: Observable<boolean>;

  constructor(private loadingService: LoadingService) {
    this.isLoading$ = this.loadingService.isLoading$;
  }
}
