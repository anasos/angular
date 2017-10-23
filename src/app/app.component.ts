import { Component } from '@angular/core';
import { Player } from './model/player';
import { playerDetailComponent } from './player-detail.component';
import { playerListComponent } from './player-list.component'
import { PlayerService } from './player.service';


@Component({
  selector: 'app-root',
  template: `
  <h1>{{title}}</h1>
  <player-detail [selectedPlayer]="selectedPlayer"></player-detail>
  <!--<players-list [playersList]="players" (selectedPlayerChange)="onVoted($event)"></players-list>-->
  <router-outlet></router-outlet>
  `,
  providers: [PlayerService]
})

export class AppComponent {
  title = 'fifa players';

  player: Player = {
  	id: 1,
  	name: 'Anas',
  	raiting: 92
  };

  players: Player[];

  selectedPlayer: Player;

  constructor(private playerService: PlayerService) { }
 
  getPlayers(): void {
    this.playerService.getPlayers().then(players => { this.players = players });
  }

  ngOnInit(): void {
    this.getPlayers();
  }

  onVoted(player: Player) {
    this.selectedPlayer = player;
  }
}

const PLAYERS: Player[] = [
  { id: 11, name: 'Mr. Nice', raiting: 85 },
  { id: 12, name: 'Narco', raiting: 81 },
  { id: 13, name: 'Bombasto', raiting: 90 },
  { id: 14, name: 'Celeritas', raiting: 41 },
  { id: 15, name: 'Magneta', raiting: 83 },
  { id: 16, name: 'RubberMan', raiting: 61 },
  { id: 17, name: 'Dynama', raiting: 80 },
  { id: 18, name: 'Dr IQ', raiting: 88 },
  { id: 19, name: 'Magma', raiting: 71 },
  { id: 20, name: 'Tornado', raiting: 77 }
];
