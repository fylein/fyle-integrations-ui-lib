import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QBDExportSettingFormOption } from '../../../../../core/models/qbd/qbd-configuration/export-setting.model';

@Component({
  selector: 'fyle-integrations-ui-lib-app-configuration-label',
  templateUrl: './configuration-label.component.html',
  styleUrls: ['./configuration-label.component.scss']
})
export class ConfigurationLabelComponent implements OnInit {

  @Input() labelValue: QBDExportSettingFormOption;

  @Input() iconPath: string;

  @Input() label: string;

  @Input() subLabel: string;

  @Input() placeholder: string;

  constructor() { }

  ngOnInit(): void {
  }

}
