import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QBDExportSettingFormOption } from '../../../../../core/models/qbd/qbd-configuration/export-setting.model';

@Component({
  selector: 'fyle-integrations-ui-lib-app-configuration-radio-field',
  templateUrl: './configuration-radio-field.component.html',
  styleUrls: ['./configuration-radio-field.component.scss']
})
export class ConfigurationRadioFieldComponent implements OnInit {

  constructor() { }

  @Input() options: QBDExportSettingFormOption[];

  @Input() form: FormGroup;

  @Input() iconPath: string;

  @Input() label: string;

  @Input() subLabel: string;

  @Input() placeholder: string;

  @Input() formControllerName: string;

  @Input() isFieldMandatory: boolean;

  @Input() mandatoryErrorListName: string;

  @Input() customErrorMessage: string;

  ngOnInit(): void {
  }

}
