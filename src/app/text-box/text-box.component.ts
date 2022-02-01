import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export class Slide {
  image: string;
}
export class SlideGroup {
  pairID: number;
  slides: Slide[];
}

@Component({
  selector: 'text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css']
  /*,
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger("popup", [
      state("hidden", style({ opacity: 0, zIndex: 49 })),
      state("visible", style({ opacity: 1, zIndex: 100 })),
      transition("hidden => visible", animate("1s 1s ease-out"))
    ])
  ]*/
})
export class TextBoxComponent implements OnInit {
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  slides: SlideGroup[] = [
    {
      pairID: 20, //Questions
      slides: [
        {
          image: "/frontend/assets/Slide29.jpg"
        }
      ]
    },
    {
      pairID: 10, //Reggio Emilia
      slides: [
        {
          image: "/frontend/assets/Slide1.jpg"
        }
      ]
    },
    {
      pairID: 0, //Historical Setting
      slides: [
        {
          image: "/frontend/assets/Slide2.jpg"
        },
        {
          image: "/frontend/assets/Slide3.jpg"
        },
        {
          image: "/frontend/assets/Slide4.jpg"
        },
        {
          image: "/frontend/assets/Slide5.jpg"
        },
        {
          image: "/frontend/assets/Slide6.jpg"
        }
      ]
    },
    {
      pairID: 7, //Philosophy and Values
      slides: [
        {
          image: "/frontend/assets/Slide7.jpg"
        },
        {
          image: "/frontend/assets/Slide8.jpg"
        }
      ]
    },
    {
      pairID: 1, //Loris Malaguzzi
      slides: [
        {
          image: "/frontend/assets/Slide9.jpg"
        },
        {
          image: "/frontend/assets/Slide10.jpg"
        },
        {
          image: "/frontend/assets/Slide11.jpg"
        },
        {
          image: "/frontend/assets/Slide12.jpg"
        },
      ]
    },
    {
      pairID: 4, //Nutshell
      slides: [
        {
          image: "/frontend/assets/Slide13.jpg"
        },
        {
          image: "/frontend/assets/Slide14.jpg"
        }
      ]
    },
    {
      pairID: 6, //Documentation
      slides: [
        {
          image: "/frontend/assets/Slide15.jpg"
        }
      ]
    },
    {
      pairID: 5, //Third Teacher
      slides: [
        {
          image: "/frontend/assets/Slide16.jpg"
        },
        {
          image: "/frontend/assets/Slide17.jpg"
        }
      ]
    },
    {
      pairID: 3, //Role of the Teacher
      slides: [
        {
          image: "/frontend/assets/Slide18.jpg"
        },
        {
          image: "/frontend/assets/Slide19.jpg"
        },
        {
          image: "/frontend/assets/Slide20.jpg"
        },
        {
          image: "/frontend/assets/Slide21.jpg"
        }
      ]
    },
    {
      pairID: 2, //Environment
      slides: [
        {
          image: "/frontend/assets/Slide22.jpg"
        },
        {
          image: "/frontend/assets/Slide23.jpg"
        },
        {
          image: "/frontend/assets/Slide24.jpg"
        },
        {
          image: "/frontend/assets/Slide25.jpg"
        },
        {
          image: "/frontend/assets/Slide26.jpg"
        },
        {
          image: "/frontend/assets/Slide27.jpg"
        },
        {
          image: "/frontend/assets/Slide28.jpg"
        }
      ]
    },
  ];

  state: string = "hidden";
  image: string = undefined;
  currentPairID: number = undefined;
  currentSlideGroup: SlideGroup = undefined;
  slidesRemaining: number = 0;
  currentSlideIndex: number = 0;

  constructor() { }

  ngOnInit() {
  }

  setPairID(pairID: number): string {
    this.currentPairID = pairID;
    this.currentSlideGroup = this.slides.find((slideGroup) => slideGroup.pairID === pairID);
    this.slidesRemaining = this.currentSlideGroup.slides.length-1;
    this.image = this.currentSlideGroup.slides[this.currentSlideIndex].image;
    this.state = "visible";
    return "visible";
  }

  previousSlide() {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
      this.image = this.currentSlideGroup.slides[this.currentSlideIndex].image;
      this.slidesRemaining++;
    }
  }

  nextSlide() {
    if (this.slidesRemaining > 0) {
      this.currentSlideIndex++;
      this.image = this.currentSlideGroup.slides[this.currentSlideIndex].image;
      this.slidesRemaining--;
    }
  }

  close() {
    this.image = undefined;
    this.currentPairID = undefined;
    this.currentSlideGroup = undefined;
    this.slidesRemaining = 0;
    this.currentSlideIndex = 0;
    this.state = "hidden";
    this.onClose.emit();
  }
}
