import { NgModule } from '@angular/core';
import { PlaceholderComponent } from 'src/app/shared/placeholder/placeholder.component';

@NgModule({
  declarations: [PlaceholderComponent],
  exports: [PlaceholderComponent]
})
export class SharedModule {}
