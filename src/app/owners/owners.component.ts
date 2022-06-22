import { Component, OnInit } from '@angular/core';
import { OwnerService } from './../_services/owner.service';
import { OwnerModel } from './../_models/owners.model';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { ProvinceModel } from '../_models/province.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent implements OnInit {
  owners: OwnerModel[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'dateOfBirth', 'address'];
  datasource = new MatTableDataSource<OwnerModel>(this.owners);
  page: {} | undefined;
  dataExists = true;
  length: number = 0;
  currentPage: number = 0;
  pageEvent: PageEvent = new PageEvent();
  isLoading: boolean = true;

  provinces: ProvinceModel[] = [
    { name: 'Newfoundland and Labrador', code: 'NL' },
    { name: 'Prince Edward Island', code: 'PE' },
    { name: 'Nova Scotia', code: 'NS' },
    { name: 'New Brunswick', code: 'NB' },
    { name: 'Quebec', code: 'QC' },
    { name: 'Ontario', code: 'ON' },
    { name: 'Manitoba', code: 'MB' },
    { name: 'Saskatchewan', code: 'SK' },
    { name: 'Alberta', code: 'AB' },
    { name: 'British Columbia', code: 'BC' },
    { name: 'Yukon', code: 'YT' },
    { name: 'Northwest Territories', code: 'NT' },
  ];
  codes = new FormControl('');
  selectedCodes: string[] = [];

  constructor(private _ownerService: OwnerService) { }
  ngOnInit(): void {
    this.getOwners();
  }

  getOwners() {
    this.isLoading = true;
    this.page = { provinceCode: this.handleCode(), maxPageSize: 20, PageNumber: this.currentPage + 1, PageSize: 10 }
    this._ownerService.getOwners(this.page).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.owners = res.owners as OwnerModel[];
          this.length = res.length as number;
          this.datasource = new MatTableDataSource<OwnerModel>(this.owners);
          this.isLoading = false;
        },
        error: (err) => { this.dataExists = false; }
      }
    )
  }

  changePage(event?: PageEvent) {
    console.log(event);
    let previousPage = event?.previousPageIndex || 0;
    let pageIndex = event?.pageIndex || 0;
    this.currentPage = previousPage < pageIndex ? this.currentPage + 1 : this.currentPage - 1
    this.getOwners()
  }

  slectCode(code: string) {
    if (!this.selectedCodes.includes(code))
      this.selectedCodes.push(code);
    else
      this.selectedCodes.splice(this.selectedCodes.indexOf(code), 1);
    this.getOwners();
    console.log(this.handleCode())
  }

  handleCode() {
    return this.selectedCodes.length > 0 ? this.selectedCodes.toString() : "";
  }
}
