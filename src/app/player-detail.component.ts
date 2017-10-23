import { Component, Input } from '@angular/core';
import { Player } from 'app/model/player';

@Component({
  selector: 'player-detail',
  template:`
  	<div *ngIf="selectedPlayer">
  	<h2>{{selectedPlayer.name}} details!</h2>
	  <div><label>id: </label>{{selectedPlayer.id}}</div>
	  <div><label>name: </label>{{selectedPlayer.name}}</div>
	  <div><label>raiting: </label>{{selectedPlayer.raiting}}</div>
		<input [(ngModel)]="selectedPlayer.name" placeholder="player">
		</div>
  `
})
export class playerDetailComponent {
	@Input() selectedPlayer: Player;
}