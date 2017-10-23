import { Component } from '@angular/core';
import { Player } from 'app/model/player';
import { FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:8080/api/upload';

@Component({
  selector: 'players-import',
  template:`
  	<h2>My Players</h2>
    <input type="file" ng2FileSelect [uploader]="uploader"/>
    <button (click)="clicked()">Click</button>
  `
})

export class playerImportComponent {
	uploader:FileUploader = new FileUploader({url: URL});

  clicked(event) {
    debugger;
    this.uploader.queue[0].withCredentials = false;
    this.uploader.queue[0].upload();
  }

}