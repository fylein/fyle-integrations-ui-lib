import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fyle-integrations-ui-lib-app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input() styleClass: string;

  constructor() { }

  ngOnInit(): void {
  }

}
