import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { FileSelectDirective, FileDropDirective, FileUploader, FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { playerDetailComponent } from './player-detail.component'
import { playerListComponent } from './player-list.component'
import { playerImportComponent } from './player-import.component'
import { Login } from './components/login/login.component'
import { newPlayerComponent } from './components/new-player/new-player.component'
import { newGuideComponent } from './components/new-guide/new-guide.component'
import { guideProfileComponent } from './components/guide-profile/guide-profile.component'


import { PlayerService } from './player.service';
import { GuideService } from './service/guide.service';

import { AuthGuard } from './auth-guard.service'
import { AuthService } from './auth.service';

import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'players',
    component: playerListComponent, canActivate: [AuthGuard] 
  },
  {
  	path: 'importPlayers',
  	component: playerImportComponent
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'new-player',
    component: newPlayerComponent
  },
  {
    path: 'new-guide',
    component: newGuideComponent, canActivate: [AuthGuard] 
  },
  {
    path: 'guide-profile',
    component: guideProfileComponent, canActivate: [AuthGuard] 
  }
];

@NgModule({
  declarations: [
    AppComponent,
    playerDetailComponent,
    playerListComponent,
    playerImportComponent,
    Login,
    newPlayerComponent,
    guideProfileComponent,
    newGuideComponent
  ],
  imports: [
  RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    FileUploadModule,
    ReactiveFormsModule
  ],
  providers: [PlayerService, GuideService, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
