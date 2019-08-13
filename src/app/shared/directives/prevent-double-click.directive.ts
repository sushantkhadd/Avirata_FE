import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Directive({
  selector: "[appPreventDoubleClick]"
})
export class PreventDoubleClickDirective {
  // constructor() { }

  // @HostListener('click', ['$event'])
  // clickEvent(event) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   event.srcElement.setAttribute('disabled', true);
  //   setTimeout(function(){
  //     event.srcElement.removeAttribute('disabled');
  //   }, 2000);
  // }

  @Input() throttleTime = 700;
  @Output() debounceClick = new EventEmitter();
  private clicks = new Subject();
  private subscription: Subscription;

  constructor() {}

  ngOnInit() {
    this.subscription = this.clicks
      .pipe(throttleTime(this.throttleTime))
      .subscribe(e => this.debounceClick.emit(e));
  }

  ngOnDestroy() {
    if(this.subscription != null && this.subscription != undefined)
    {
      this.subscription.unsubscribe();
    }
    
  }

  @HostListener("click", ["$event"])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
}
