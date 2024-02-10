import { Component, Input } from '@angular/core';
import { EmitterService } from '../../../services/emiiter.service';
import { Loader } from '../../../enums/enums';

@Component({
  selector: 'app-load-more-btn',
  templateUrl: './load-more-btn.component.html',
  styleUrl: './load-more-btn.component.scss',
})
export class LoadMoreBtnComponent {
  @Input() val!: Loader;
  @Input() show: boolean = false;
  emit(): void {
    if (this.val === Loader.Hotel)
      EmitterService.hotelEmitter.emit('hotel emitter');
    else if(this.val === Loader.Package) EmitterService.packageEmitter.emit('package emitted');
    else if(this.val === Loader.Gallery) EmitterService.galleryEmitter.emit('gallery emitted');
  }
}
