import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../services/account';

@Component({
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: 'home.html'
})
export class HomeComponent {

    account: any;

    constructor(public accountService: AccountService) {
        this.account = this.accountService.accountValue;
    }
}