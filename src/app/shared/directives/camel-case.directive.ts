import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCamelCase]',
  standalone: true,
})
export class CamelCaseDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event'])
  onInput() {
    const value = this.el.nativeElement.value;
    const camelCasedValue = this.toCamelCase(value);
    this.renderer.setProperty(this.el.nativeElement, 'value', camelCasedValue);
  }

  @HostListener('blur')
  onBlur() {
    const value = this.el.nativeElement.value;
    const camelCasedValue = this.toCamelCase(value);
    this.renderer.setProperty(this.el.nativeElement, 'value', camelCasedValue);
  }

  private toCamelCase(value: string): string {
    return value
      .toLowerCase()
      .split(' ')
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(' ');
  }
}
