import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private isOpenSignal = signal<boolean>(false);
  private resolveFn: ((value: boolean) => void) | null = null;

  isOpen() {
    return this.isOpenSignal();
  }

  open(): Promise<boolean> {
    this.isOpenSignal.set(true);
    return new Promise<boolean>((resolve) => {
      this.resolveFn = resolve;
    });
  }

  confirm() {
    if (this.resolveFn) this.resolveFn(true);
    this.close();
  }

  cancel() {
    if (this.resolveFn) this.resolveFn(false);
    this.close();
  }

  private close() {
    this.isOpenSignal.set(false);
  }
}
