import { Component, OnInit } from '@angular/core';
import { Celebrity } from '@bod/celebrities/domain';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetCelebritiesService } from './get-celebrities.service';

@Component({
  selector: 'celebrities-display-top-ten',
  templateUrl: './display-top-ten.component.html',
  styleUrls: ['./display-top-ten.component.scss'],
})
export class DisplayTopTenComponent implements OnInit {
  celebs$: Observable<Celebrity[]>;
  constructor(private getCelebritiesService: GetCelebritiesService) {}

  ngOnInit() {
    this.getCelebrities();
  }

  getCelebrities(): void {
    this.celebs$ = this.getCelebritiesService.getAll().pipe(
      map((data) => {
        const records = data.records;
        const celebrities: Celebrity[] = records
          .filter((record) => record.fields.Name)
          .map((record) => {
            return { name: record.fields.Name, followers: 100 };
          });
        return celebrities;
      })
    );
  }
}
