
import { Component, OnInit } from '@angular/core';
import { BillDataService } from '../shared/dataService/bill-data.service';
import { Bills } from '../models/Bills';

import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';
import { UserDataService } from '../shared/dataService/user-data.service';
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashBoardComponent implements OnInit {
  bills: Bills[];
  billType: String = '';
  isLoggedin: boolean;
  id;
  constructor(
    private dataService: BillDataService,
    private userService: UserDataService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {
    this.checkLoggedIn().then(e=>{
    this.getBills();
    }
    );
  }
  ngOnInit(): void {
    this.checkRoute();

  }
  getBills() {
    this.dataService.getBills(this.id).subscribe(bills => {
      console.log(bills);

      this.bills = bills.documents?.map(b=>{
        return{
          id :b.name.split('/').pop(),
          amount : b.fields.amount.stringValue,
          date : b.fields.date.stringValue,
          dueDate : b.fields.dueDate.stringValue,
          type : b.fields.type.stringValue,
          status : b.fields.status.stringValue,
        }

      });
    })

  }

  getElectricityBills() {
    let ElectricityBills = this.bills.filter(
      (b) => b.type.toLowerCase() === 'electrcity'
    );
    this.bills = ElectricityBills;
    console.log(this.bills);
  }
  getWaterBills() {
    let waterBills = this.bills.filter((b) => b.type.toLowerCase() === 'water');
    this.bills = waterBills;
    console.log(this.bills);
  }

  getTelephoneBills() {
    let telephoneBills = this.bills.filter(
      (b) => b.type.toLowerCase() === 'telephone'
    );
    this.bills = telephoneBills;
    console.log(this.bills);
  }

  recieveBill($event: Bills[]) {
    this.bills = $event;
  }

  checkRoute() {
    this.route.params.subscribe((p) => {
      this.billType = p['id'] || '';
      console.log(this.billType);
      this.getBills();
    });
  }

  checkLoggedIn() {
    return new Promise(res=>{
      this.auth.getCurrentUser().subscribe(user => {
        console.log(user.uid);

        if (user) {
          this.isLoggedin = true;
          this.id = user.uid;
          res(user.uid)
        }
        else {
          this.isLoggedin = false;
          res('')
        }
      })
    })
  }
}
