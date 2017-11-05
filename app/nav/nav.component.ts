import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'ng-nav',
	templateUrl: 'nav.template.html',
	styleUrls: ['nav.styles.css']
})

export class NavbarComponent {
	appName: string = "Kocherla Art Materials";
}
