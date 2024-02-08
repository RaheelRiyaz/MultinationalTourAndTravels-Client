import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import {  BookingWithPackageName } from '../../../models/booking';
import { ToastSwal } from '../../../utilis/swal';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
})
export class BookingsComponent {
  constructor(private service: BaseService) {}

  bookings: BookingWithPackageName[] = [];

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings(): void {
    this.service.Fetch<BookingWithPackageName>('bookings').subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.bookings = response.result;
        }
      },
      error: (err: Error) => {
        ToastSwal.fireSwal(err.message, false);
      },
    });
  }

  toggleBookingStatus(id: string): void {
    this.service.Update<any, number>({ id }, 'bookings/status').subscribe({
      next: (response) => {
        if (response.isSuccess) {
          ToastSwal.fireSwal(response.message);
        }
      },
      error: (err: Error) => {
        ToastSwal.fireSwal(err.message, false);
      },
    });
  }

  deleteBooking(id: string): void {
    ToastSwal.fireConfirmSwal().then((res) => {
      if (res.isConfirmed) {
        this.service.Delete<number>(`bookings/${id}`).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              ToastSwal.fireSwal(response.message);
              this.getBookings();
            }
          },
          error: (err: Error) => {
            ToastSwal.fireSwal(err.message);
          },
        });
      }
    });
  }
}
