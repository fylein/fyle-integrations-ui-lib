import { Component, Input, OnInit } from '@angular/core';
import { RedirectLink } from '../../../../../core/models/enum/enum.model';
import { WindowService } from '../../../../../core/services/core/window.service';

@Component({
  selector: 'fyle-integrations-ui-lib-app-configuration-step-header',
  templateUrl: './configuration-step-header.component.html',
  styleUrls: ['./configuration-step-header.component.scss']
})
export class ConfigurationStepHeaderComponent implements OnInit {

  @Input() headerText: string;

  @Input() contentText: string;

  RedirectLink = RedirectLink;

  constructor(
    public windowService: WindowService
  ) { }

  ngOnInit(): void {
  }

}
