import { Component, Output, EventEmitter, OnInit } from 'angular2/core';
import { State } from './admin-dashboard.state';

@Component({
	selector: 'admin-sidebar',
	templateUrl: 'app/admin/admin-sidebar.component.html',
	styleUrls: ['app/admin/admin-sidebar.component.css'],
})
export class AdminSidebarComponent implements OnInit{
	@Output('stateSelected') stateEmitter= new EventEmitter<State>();

	private stateEnum = State;

	private curState: State;

	private stateEnumArray = [];

	private gotoState(state: State){
		this.curState = state;
		this.stateEmitter.emit(state);
	}

	ngOnInit(){
		// for (var i = 0; i < State.Count; i++){
		// 	this.stateEnumArray.push(i);
		// }
	}
}
