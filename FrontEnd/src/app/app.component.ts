import {Component} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {HeaderComponent} from './components/header/index';
import {AboutComponent} from './components/+about/index';
import {HomeComponent} from './components/home-page/home/home.component';
import {ConnectionContentComponent} from "./components/connection/connection-content/connection-content.component";
import {UserComponent} from "./components/models/user/user.component";
import {NewsComponent} from "./components/news/news/news.component";
import {ManageNewsService} from "./shared/services/src/manage-news.service";
import {AddUserComponent} from "./components/user-components/add-user/add-user.component";
import {UserListComponent} from "./components/user-components/user-list/user-list.component";
import {MetricsComponent} from "./components/metrics/metrics.component";
import {AddLanguageComponent} from "./components/+language/add-language/add-language.component";
import {LanguageListComponent} from "./components/+language/language-list/language-list.component";
import {LanguageComponent} from "./components/+language/language.component";

@Component({
    selector: 'app',
    moduleId: module.id,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    directives: [
        ROUTER_DIRECTIVES,
        HeaderComponent,
        ConnectionContentComponent,
        NewsComponent,
        HomeComponent,
        MetricsComponent
    ],
    providers:[ManageNewsService]
})

/**
 * Routing configuration. The decorator @RouteConfig defines the path, the name and the component
 * for each route. This decorator is directly linked to the header.component.html which contains
 * the clickable links and to the tag router-outlet. The tag router-outlet will displays the
 * component according to user choices. If user clicks on Metrics, router-outlet will show the
 * component.
 */
@RouteConfig([
    {path: '/', name: 'Metrics', component: HomeComponent},
    {path: '/about', name: 'About', component: AboutComponent},
    {path: '/user-components/add-user', name: 'AddUser', component: AddUserComponent},
    {path: '/user-components/user-list', name: 'UserList', component: UserListComponent},
    {path: '/languages', name: 'Language', component: LanguageComponent}
])
export class AppComponent {

    public user;
    public userManager_error = false;
    /**
     * Page to show is variable which contains an integer
     * If pageToShow = 0 => user is not connected => show connection content
     * If pageToShow = 1 => user is connected and we show the home page
     * If pageToShow = 2 => user is connected and the user has choosen the part of the website
     * IF pageToShow = 3 => user is connected and want to see the news
     * IF pageToShow = 4 => metrics home page
     * from the home page.
     */
    public pageToShow;
    public message="Doesn't work";
    public pageName:string;
    public linksName:string[];
    public routerLinks:string[];

    constructor(){
        this.pageToShow=2;
        this.user = new UserComponent("", "", "",
            "", false, false, false, false, "","");
        this.instantiateSettings();
    }

    /**
     * Function instanciateUser
     * @param user
     */
    instantiateUser(user:UserComponent){
        this.user=user;
        if(this.user.userId>=0){
            this.pageToShow=1;
        }
    }

    instantiateSettings(){
        this.pageName="Settings";
        this.linksName=["Add user", "User list"];
        this.routerLinks=["AddUser", "UserList"];
    }
}