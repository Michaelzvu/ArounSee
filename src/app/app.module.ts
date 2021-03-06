import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BaseRequestOptions, HttpModule,JsonpModule  } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdInputModule, MdButtonModule,
  MdCardModule, MdSidenavModule, MdToolbarModule, MdIconModule, MdListModule, MdMenuModule, MdMenuItem
} from '@angular/material';

import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { LoginComponent } from './login';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import { XLargeDirective } from './home/x-large';

import '../styles/styles.scss';
import '../styles/headings.css';
import '../styles/indigo-pink.css';
import '../styles/normalize.css';
import { AuthGuard } from './_guards';
import { AlertService } from './_services/alert.service';
import { UserService } from './_services/user.service';
import { AuthenticationService } from './_services/authentication.service';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { MockBackend } from '@angular/http/testing';
import { AlertComponent } from './_components/alert/alert.component';
import { RegisterComponent } from './register/register.component';
import { ArounseeNavComponent } from './arounsee-nav/arounsee-nav.component';
import { TrainingComponent } from './training/training.component';
import { FeedListComponent } from './feed-list/feed-list.component';
import { PlacesService } from './_services/places.service';

import { FeedDetailsComponent } from './feed-details/feed-details.component';
import { StarRatingModule } from 'angular-star-rating';


// Services

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    LoginComponent,
    AppComponent,
    AboutComponent,
    HomeComponent,
    ArounseeNavComponent,
    NoContentComponent,
    XLargeDirective,
    AlertComponent,
    RegisterComponent,
    TrainingComponent,
    FeedListComponent,
    FeedDetailsComponent,
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdInputModule,
    MdButtonModule,
    MdCardModule,
    MdSidenavModule,
    MdToolbarModule,
    MdIconModule,
    MdListModule,
    MdMenuModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    StarRatingModule.forRoot(),
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,

    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions,
    PlacesService,

    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    /**
     * Set state
     */
    this.appState._state = store.state;
    /**
     * Set input values
     */
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    /**
     * Save state
     */
    const state = this.appState._state;
    store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues  = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
