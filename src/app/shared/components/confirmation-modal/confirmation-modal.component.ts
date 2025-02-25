import { Component, inject } from '@angular/core'
import { ModalService } from '../../../services/modal.service'

@Component({
  standalone: true,
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  modalService = inject(ModalService)

  confirm() {
    this.modalService.confirm()
  }

  cancel() {
    this.modalService.cancel()
  }
}
