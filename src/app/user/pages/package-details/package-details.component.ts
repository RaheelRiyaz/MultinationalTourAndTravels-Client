import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrl: './package-details.component.scss',
})
export class PackageDetailsComponent {
  @ViewChild('item') item: any;
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
  ngAfterViewInit(): void {
    this.item.nativeElement.classList.add('hidden');
  }
}
