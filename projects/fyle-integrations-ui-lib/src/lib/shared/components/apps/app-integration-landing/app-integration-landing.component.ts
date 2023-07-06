import { Component, OnInit, Input } from '@angular/core';
import { WindowService } from '../../../../core/services/core/window.service';

@Component({
  selector: 'fyle-integrations-ui-lib-app-app-integration-landing',
  templateUrl: './app-integration-landing.component.html',
  styleUrls: ['./app-integration-landing.component.scss']
})
export class AppIntegrationLandingComponent implements OnInit {
  @Input() headerText: string;

  @Input() svgPath: string;

  @Input() redirectLink: string;


  constructor(
    public windowService: WindowService
  ) { }

  ngOnInit(): void {
  }
}
