import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Exercise } from '@bod/shared/models';
import { ExercisesFacade } from '@bod/training/domain';
import { ExerciseTableDataSource } from './exercise-table-datasource';

@Component({
  selector: 'training-exercise-table',
  templateUrl: './exercise-table.component.html',
  styleUrls: ['./exercise-table.component.scss'],
})
export class ExerciseTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Exercise>;
  dataSource: ExerciseTableDataSource;

  constructor(private exerciseState: ExercisesFacade) {}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'push/pull', 'intensities'];

  ngOnInit() {
    this.dataSource = new ExerciseTableDataSource(this.exerciseState);
  }

  displayPushPull(exercise: Exercise) {
    return exercise.categories[0].name;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
