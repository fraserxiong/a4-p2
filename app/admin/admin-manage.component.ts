import { Component, OnInit }       from 'angular2/core';
import {AppHeaderComponent} from '../app-header.component';
import {AppFooterComponent} from '../app-footer.component';
import {AppOfferService} from '../app-offer.service';
import {FullOffer} from '../app-offer.service';
import {user_db, user} from '../user/user.service';

@Component({
	selector: 'admin-manage',
	templateUrl: 'app/admin/admin-manage.component.html',
	styleUrls:['app/admin/admin-manage.component.css', 'app/user/user-profile.component.css', 'app/search/search-display.component.css'],
	directives: [AppHeaderComponent, AppFooterComponent],
	providers: [AppOfferService, user_db]
})

export class AdminManageComponent implements OnInit{

		results: FullOffer[] = [];
		user_list: user[] = [];

		constructor(
			private _offerService: AppOfferService,
			private _db: user_db
		){}

		ngOnInit(){
			this._offerService.search_by_query('abc')
				.then(results => this.results = results);
			this.user_list = this._db.get_list();
		}
}
