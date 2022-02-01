import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from "@angular/animations";

@Component({
  selector: 'rm-card',
  templateUrl: './rm-card.component.html',
  styleUrls: ['./rm-card.component.css'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger("flippedState", [
      state("default", style({ transform: "rotate(0)" })),
      state("flipped", style({ transform: "rotateY(180deg)" })),
      transition("flipped => default", animate("400ms ease-out")),
      transition("default => flipped", animate("600ms ease-in"))
    ])
  ]
})
export class RmCardComponent implements OnInit {
  @Input() index: number;
  @Input() id: number;
  @Input() pairID: number;
  @Input() image: string;
  @Input() text: string;
  @Input() isStatic: boolean;
  @Input() isTextBoxOpen: boolean;
  @Input() isCardFlipped: boolean;
  @Input() frontImage: string;
  @Output() onFlip: EventEmitter<any> = new EventEmitter();
  @Output() onOpenLocked: EventEmitter<any> = new EventEmitter();
  
  state: string = "default";
  locked = false;
  turned = false;
  isFlipped = false;

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    console.log("TextBox: ",this.isTextBoxOpen, ", Static: ",this.isStatic,
      ", Locked: ",this.locked, ", CardFlipped: ",this.isCardFlipped, " Turned: ",
      this.turned, "Flipped: ",this.isFlipped);
    if (!this.isTextBoxOpen && !this.isFlipped) {
      if (!this.isStatic) {
        if (!this.locked) {
          this.state = "flipped";
          this.isFlipped = true;
          setTimeout(() => {
            this.onFlip.emit({
              index: this.index,
              id: this.id,
              pairID: this.pairID
            });
          }, 500);
        }
      } else {
        if (!this.isCardFlipped) {
          this.onOpenLocked.emit({
            pairID: 10
          });
        }
      }
    } else if (this.isFlipped && this.turned && !this.isTextBoxOpen && !this.locked) {
      this.onOpenLocked.emit({
        pairID: this.pairID
      });
    }
  }

  public flipBack() {
    this.isFlipped = false;
    this.state = "default";
  }

  public setTurned() {
    this.turned = true;
  }

  public isTurned() {
    return this.turned;
  }

  public lock() {
    this.locked = true;
  }

  public unlock() {
    this.locked = false;
  }
}
