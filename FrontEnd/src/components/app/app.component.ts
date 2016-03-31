import {Component} from 'angular2/core';
import {MetricsComponent} from "../metrics/metrics.component";
import {PerformanceComponent} from "../performance/performance.component";
import {NewsComponent} from "../news/news.component";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {HomeComponent} from "../home/home.component";
import {LogInComponent} from "../log-in/log-in.component";
import {LogOutComponent} from "../log-out/log-out.component";
import {ManageUsersService} from "../../shared/services/src/manage-users.service";
import {Http} from "angular2/http";
import {HeaderComponent} from "../header/header.component";
import {AddUserComponent} from "../add-user/add-user.component";


/**
 * Component App. With @Component we define the characteristics of our component:
 * the style, the tag name, the assigned html file, directives we would like to use
*/
@Component({
    selector: 'app',
    moduleId: module.id,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    directives: [
        ROUTER_DIRECTIVES,
        HeaderComponent,
    ],
    providers: [ManageUsersService]
})

/**
 * Routing configuration. The decorator @RouteConfig defines the path, the name and the component
 * for each route. This decorator is directly linked to the app.component.html which contains
 * the clickable links and to the tag router-outlet. The tag router-outlet will displays the
 * component according to user choices. If user clicks on Metrics, router-outlet will show the
 * component.
 */
@RouteConfig([
    {path: '/metrics', name: 'Metrics', component: MetricsComponent},
    {path: '/performance', name: 'Performance', component: PerformanceComponent},
    {path: '/news', name: 'News', component: NewsComponent},
    {path: '/add-user', name: 'AddUser', component: AddUserComponent},
    {path: '/log-in', name: 'LogIn', component: LogInComponent},
    {path: '/log-out', name: 'LogOut', component: LogOutComponent}
])

export class AppComponent {
    public userManager;
    public userManager_error = false;
    public message="Doesn't work";

    constructor(private _manageUserService: ManageUsersService){

        this._manageUserService.getUsers().subscribe(
            data => {
                this.userManager = data[0];
            },
            err => { this.userManager_error = true },
            () => console.log('done')
        );

    }

    /*ngOnInit(){
        this.userManager= this._manageUserService.getUsers();
    }*/
}