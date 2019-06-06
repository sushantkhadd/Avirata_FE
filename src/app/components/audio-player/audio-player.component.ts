import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: "app-audio-player-component",
  templateUrl: "./audio-player.component.html",
  styleUrls: ["./audio-player.component.scss"]
})
export class AudioPlayerComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer) {}
  audioSrc: SafeResourceUrl;
  @Input("src") public src;
  @Output("finishAudio") public finishAudio = new EventEmitter<any>();
  nextFlag;
  playFlag;
  player; secondUrlFlag;
  ngOnInit() {
    // this.pause();
    // this.ended();
   
    this.player = document.getElementById("audio") as HTMLAudioElement;
    this.nextFlag = true;
    this.player.onended = event => {
      console.log(
        "Video stopped either because 1) it was over, " +
          "or 2) no further data is available.",
        event
      );
      if (event.type == "ended") {
        this.nextFlag = false;
        this.playFlag = false;
      }
    };
  }

  ngOnChanges() {
    if (Object.keys(this.src).length != 0)
    {
      if (this.src.state == "dynamic")
      {
        if (window.localStorage.getItem('mainFlagModule5') == '2' || window.localStorage.getItem('mainFlagModule5') == '4' || window.localStorage.getItem('mainFlagModule5') == '5' ||  window.localStorage.getItem('mainFlagModule1') == '10')
        {
            this.audioSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
              this.src.url
            );
          this.secondUrlFlag = false;
        } else
        {
          this.secondUrlFlag = true;
          this.audioSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.src.url1
          );
        }
      } else if (this.src.state == "static")
      {
        this.audioSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.src.url
        );
        this.secondUrlFlag = false;
      }
      console.log(this.audioSrc,this.src);
      this.nextFlag = true;
      setTimeout(() => {
        this.play();
      }, 500);
    }
  }


  next() {
    this.secondUrlFlag = false;
    this.audioSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.src.url2
    );
    this.nextFlag = true;
    setTimeout(() => {
      this.play();
    }, 500);
  }

  audioFinish() {
    this.audioSrc = "";
    this.finishAudio.emit(true);
  }

  play() {
    if (this.player.paused) {
      this.player.play();
      this.playFlag = true;
      console.log("play");
    } else {
      this.player.pause();
      this.playFlag = false;
      console.log("pause");
    }
  }

  handleBackword() {
    let elapsed = this.player.currentTime;
    console.log(elapsed);
    if (elapsed >= 10) {
      this.player.currentTime = elapsed - 10;
    }
  }

  ngDoCheck() {
    // this.ended();
  }

  ended() {
    this.player.addEventListener("ended", event => {
      console.log("ended", event);
    });
  }
}
