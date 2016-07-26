import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { SvgLinearGradient } from '../common/SvgLinearGradient.js';
import { formatNumber } from 'common/utils/number/format.js';

@Component({
  selector: 'g[cell]',
  directives: [SvgLinearGradient],
  template: `
    <svg:g [attr.transform]="transform" class="cell">
      <defs>
        <svg:g svg-linear-gradient
          [color]="fill"
          orientation="vertical"
          [name]="gradientId"
          [startOpacity]="startOpacity"
        />
      </defs>

      <svg:rect
        [attr.fill]="gradientUrl"
        rx="3"
        [attr.width]="width"
        [attr.height]="height"
        class="viz cell"
        style="cursor: pointer"
        (click)="click()"
      />

    </svg:g>
  `
})
export class Cell {
  @Input() fill;
  @Input() x;
  @Input() y;
  @Input() width;
  @Input() height;
  @Input() data;
  @Input() label;

  @Output() clickHandler = new EventEmitter();

  constructor(element: ElementRef){
    this.element = element.nativeElement;
  }

  ngOnInit() {
    this.transform = `translate(${this.x} , ${this.y})`;

    let value = this.data.value;
    let range = this.activeRange;

    let pageUrl = window.location.href;
    this.startOpacity = 0.3;
    this.gradientId = 'grad' + ObjectId().toString();
    this.gradientUrl = `url(${pageUrl}#${this.gradientId})`;

    this.loadAnimation()
  }

  loadAnimation() {
    let node = d3.select(this.element).select('.cell');

    node
      .attr('opacity', 0)

    this.animateToCurrentForm();
  }

  animateToCurrentForm(){
    let node = d3.select(this.element).select('.cell');

    node.transition().duration(750)
      .attr('opacity', 1);
  }

  click(){
    this.clickHandler.emit(this.data);
  }

}