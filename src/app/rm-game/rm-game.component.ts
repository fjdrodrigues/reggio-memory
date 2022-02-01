import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RmCardComponent } from '../rm-card/rm-card.component';
import { TextBoxComponent } from '../text-box/text-box.component';

export class RmCard {
  id: number;
  pairID: number;
  image: string
}

@Component({
  selector: 'rm-game',
  templateUrl: './rm-game.component.html',
  styleUrls: ['./rm-game.component.css'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger("game", [
      state("default", style({ opacity: 1 })),
      state("smoothed", style({ opacity: 0.2 })),
      transition("default => smoothed", animate("1s 1s ease-out")),
      transition("smoothed => default", animate("1s ease-in"))
    ]),
    trigger("popup", [
        state("hidden", style({ opacity: 0, zIndex: 49 })),
        state("visible", style({ opacity: 1, zIndex: 100 })),
        transition("hidden => visible", animate("1s 1s ease-out"))
      ])
  ]
})
export class RmGameComponent implements OnInit, AfterViewInit {

  @ViewChildren('card') cards:QueryList<RmCardComponent>;
  @ViewChild('textBox', {static: false}) textBox: TextBoxComponent;

  rmCards: RmCard[] = [
    {
      id: 0,
      pairID: 0,
      image: "/frontend/assets/pair_1.jpg"
    },
    {
      id: 1,
      pairID: 0,
      image: "/frontend/assets/pair_1.jpg"
    },
    {
      id: 2,
      pairID: 1,
      image: "/frontend/assets/pair_2.jpg"
    },
    {
      id: 3,
      pairID: 1,
      image: "/frontend/assets/pair_2.jpg"
    },
    {
      id: 4,
      pairID: 2,
      image: "/frontend/assets/pair_3.jpg"
    },
    {
      id: 5,
      pairID: 2,
      image: "/frontend/assets/pair_3.jpg"
    },
    {
      id: 6,
      pairID: 3,
      image: "/frontend/assets/pair_4.jpg"
    },
    {
      id: 7,
      pairID: 3,
      image: "/frontend/assets/pair_4.jpg"
    },
    {
      id: 8,
      pairID: 4,
      image: "/frontend/assets/pair_5.jpg"
    },
    {
      id: 9,
      pairID: 4,
      image: "/frontend/assets/pair_5.jpg"
    },
    {
      id: 10,
      pairID: 5,
      image: "/frontend/assets/pair_6.jpg"
    },
    {
      id: 11,
      pairID: 5,
      image: "/frontend/assets/pair_6.jpg"
    },
    {
      id: 12,
      pairID: 6,
      image: "/frontend/assets/pair_7.jpg"
    },
    {
      id: 13,
      pairID: 6,
      image: "/frontend/assets/pair_7.jpg"
    },
    {
      id: 14,
      pairID: 7,
      image: "/frontend/assets/pair_8.jpg"
    },
    {
      id: 15,
      pairID: 7,
      image: "/frontend/assets/pair_8.jpg"
    },
  ];

  state: string = "default";
  popupState: string = "hidden";
  isCardFlipped = false;
  flippedPairID: number = undefined;
  flippedID: number = undefined;
  flippedIndex: number = undefined;
  first = false;
  textBoxOpen = false;
  flippedCount = 0;

  constructor() {
    this.shuffle(this.rmCards);
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  cardFlipped(event: any) {
    if (this.isCardFlipped) {
      this.cards.toArray().forEach(element => {
        element.lock();
      });
      if (this.flippedPairID === event.pairID) {
        this.showPopUpText(event);
      } else {
        this.tryAgain(event);
      }
    } else {
      this.cards.toArray().forEach(element => {
        if (element.isTurned()) {
          element.lock();
        }
      });
      this.isCardFlipped = true;
      this.flippedPairID = event.pairID;
      this.flippedID = event.id;
      this.flippedIndex = event.index;
    }
  }

  openTextBox(event: any, first?:boolean) {
    this.textBoxOpen = true;
    if (first) {
      this.first = true;
    }
    this.cards.toArray().forEach(element => {
      element.lock();
    });
    this.state = "smoothed";
    if (first && this.flippedCount === 8) {
      this.popupState = this.textBox.setPairID(20);
    } else {
      this.popupState = this.textBox.setPairID(event.pairID);
    }
  }

  showPopUpText(event: any) {
    this.flippedCount++;
    this.textBoxOpen = true;
    this.cards.toArray()[event.index].setTurned();
    this.cards.toArray()[this.flippedIndex].setTurned();
    this.state = "smoothed";
    this.popupState = this.textBox.setPairID(event.pairID);
  }

  popUpClosed() {
    if (!this.first) {
      this.flippedID = undefined;
      this.flippedPairID = undefined;
      this.flippedIndex = undefined;
      this.isCardFlipped = false;
    }
    this.first = false;
    this.cards.toArray().forEach(element => {
      element.unlock();
    });
    this.textBoxOpen = false;
    this.popupState = "hidden";
    this.state = "default";
  }

  tryAgain(event: any) {
    setTimeout(() => {
      this.cards.toArray()[event.index].flipBack();
      this.cards.toArray()[this.flippedIndex].flipBack();

      this.flippedID = undefined;
      this.flippedPairID = undefined;
      this.flippedIndex = undefined;
      this.isCardFlipped = false;

      this.cards.toArray().forEach(element => {
        element.unlock();
      });
    }, 2000);
  }
}
