import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {HeaderComponent} from '@modules/main/header/header.component';
import {FooterComponent} from '@modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from '@pages/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import {MessagesComponent} from '@modules/main/header/messages/messages.component';
import {NotificationsComponent} from '@modules/main/header/notifications/notifications.component';
import {ButtonComponent} from './components/button/button.component';

import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {UserComponent} from '@modules/main/header/user/user.component';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {LanguageComponent} from '@modules/main/header/language/language.component';
import {PrivacyPolicyComponent} from './modules/privacy-policy/privacy-policy.component';
import {MainMenuComponent} from './pages/main-menu/main-menu.component';
import {SubMenuComponent} from './pages/main-menu/sub-menu/sub-menu.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {DropdownComponent} from './components/dropdown/dropdown.component';
import {DropdownMenuComponent} from './components/dropdown/dropdown-menu/dropdown-menu.component';
import {ControlSidebarComponent} from './modules/main/control-sidebar/control-sidebar.component';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/auth/reducer';
import {uiReducer} from './store/ui/reducer';
import { SelectComponent } from './components/select/select.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { VtsreportComponent } from './pages/vtsreport/vtsreport.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NetworkInterceptor } from '@services/network.interceptor';
import { MatIconModule } from '@angular/material/icon';
import { VtsreportnewComponent } from './pages/vtsreportnew/vtsreportnew.component';



registerLocaleData(localeEn, 'en-EN');

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        MenuSidebarComponent,
        BlankComponent,
        ProfileComponent,
        RegisterComponent,
        DashboardComponent,
        MessagesComponent,
        NotificationsComponent,
        ButtonComponent,
        UserComponent,
        ForgotPasswordComponent,
        RecoverPasswordComponent,
        LanguageComponent,
        PrivacyPolicyComponent,
        MainMenuComponent,
        SubMenuComponent,
        MenuItemComponent,
        DropdownComponent,
        DropdownMenuComponent,
        ControlSidebarComponent,
        SelectComponent,
        CheckboxComponent,
        VtsreportComponent,
        VtsreportnewComponent,
        
    ],
    imports: [
        BrowserModule,
        FormsModule,
        StoreModule.forRoot({auth: authReducer, ui: uiReducer}),
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,MatIconModule,
        BrowserAnimationsModule,MatDialogModule,OverlayModule,NgxDatatableModule,  MatProgressSpinnerModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
    ],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule {}
