import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { serverTimestamp } from '@angular/fire/firestore';
import { AhorcadoService } from 'src/app/services/ahorcado.service';
import { AuthRegisterService } from 'src/app/services/auth-register.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css'],
})
export class AhorcadoComponent implements OnInit {
  question: string = '';
  questions: string[] = [];
  guesses: string[] = [];
  category: string = '';
  restartGameBtnShown = false;
  constructor(
    private hangmanService: AhorcadoService,
    private location: Location,
    private logservice: LogService,
    private auth: AuthRegisterService
  ) {}

  ngOnInit(): void {
    let jsonPath;
    const url = this.location.path();
    if (url.includes('jsonPath')) {
      jsonPath = url.split('jsonPath=')[1];
    }
    this.hangmanService.getQuestions(jsonPath).subscribe((response) => {
      this.questions = response.items;
      this.category = response.category;
      this.pickNewQuestion();
    });
  }

  guess(letter: string) {
    if (!letter || this.guesses.includes(letter)) {
      return;
    }
    this.guesses = [...this.guesses, letter];
  }

  dummyClick() {
    const key = prompt('Enter a key') || '';
    this.guess(key);
  }

  reset() {
    this.guesses = [];
    this.pickNewQuestion();
    this.restartGameBtnShown = false;
  }

  pickNewQuestion() {
    const randomIndex = Math.floor(Math.random() * this.questions.length);
    this.question = this.questions[randomIndex];
    console.log(this.question);
  }

  onGameFinished(mistakesRemaining: number, success: boolean) {
    this.createResult(mistakesRemaining, success)
    this.restartGameBtnShown = true;
  }
  createResult(score: number, succes: boolean) {
    const email = this.auth.getUserEmail();
    if(email){
      let result = {
        game: 'ahorcado',
        user: email,
        score: score + '/7',
        currentDate: serverTimestamp(),
        vitory: succes,
      };
      
      this.logservice
        .registerResultado('ahorcadoResultados', result)
        .then((res: any) => {
          console.log('Resultados Enviados!', res);
        })
        .catch((error: any) => {
          console.log('Error al enviar Resultados!');
        });
    }
  }
}
