import { Component}       from 'angular2/core';

@Component(
{
	selector: 'user',
	templateUrl: "app/user/user-profile.component.html",
  styleUrls: ['app/user/user-profile.component.css'],
	providers: [UserProfileComponent]
})

export class UserProfileComponent{
}
