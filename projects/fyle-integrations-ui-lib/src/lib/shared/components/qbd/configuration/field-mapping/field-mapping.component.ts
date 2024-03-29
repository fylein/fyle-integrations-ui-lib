import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QBDConfigurationCtaText, QBDOnboardingState, QBDFyleField, ToastSeverity, ClickEvent, Page, QBDProgressPhase, UpdateEvent } from '../../../../../core/models/enum/enum.model';
import { QBDExportSettingFormOption } from '../../../../../core/models/qbd/qbd-configuration/export-setting.model';
import { FieldMappingModel, QBDFieldMappingGet } from '../../../../../core/models/qbd/qbd-configuration/field-mapping.model';
import { TrackingService } from '../../../../../core/services/integration/tracking.service';
import { QbdFieldMappingService } from '../../../../../core/services/qbd/qbd-configuration/qbd-field-mapping.service';
import { QbdToastService } from '../../../../../core/services/qbd/qbd-core/qbd-toast.service';
import { QbdWorkspaceService } from '../../../../../core/services/qbd/qbd-core/qbd-workspace.service';

@Component({
  selector: 'fyle-integrations-ui-lib-app-field-mapping',
  templateUrl: './field-mapping.component.html',
  styleUrls: ['./field-mapping.component.scss']
})
export class FieldMappingComponent implements OnInit {

  isLoading: boolean;

  saveInProgress: boolean;

  fieldMappingForm: FormGroup;

  isOnboarding: boolean = true;

  ConfigurationCtaText = QBDConfigurationCtaText;

  representationOption: QBDExportSettingFormOption[] = [
    {
      label: 'Project',
      value: QBDFyleField.PROJECT
    },
    {
      label: 'Cost Center',
      value: QBDFyleField.COST_CENTER
    }
  ];

  private sessionStartTime = new Date();

  fieldMapping: QBDFieldMappingGet;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private fieldMappingService: QbdFieldMappingService,
    private workspaceService: QbdWorkspaceService,
    private toastService: QbdToastService,
    private trackingService: TrackingService
  ) { }

  mappingFieldFormOptionsFunction(formControllerName: string): QBDExportSettingFormOption[] {
    return this.representationOption.filter(option => {
      return option.value !== this.fieldMappingForm.value[formControllerName];
    });
  }

  private getPhase(): QBDProgressPhase {
    return this.isOnboarding ? QBDProgressPhase.ONBOARDING : QBDProgressPhase.POST_ONBOARDING;
  }

  constructPayloadAndSave(): void {
    this.saveInProgress = true;
    const fieldMappingPayload = FieldMappingModel.constructPayload(this.fieldMappingForm);

    this.fieldMappingService.postQbdFieldMapping(fieldMappingPayload).subscribe((response: QBDFieldMappingGet) => {
      this.saveInProgress = false;
      this.toastService.displayToastMessage(ToastSeverity.SUCCESS, 'Field mapping saved successfully');
      this.trackingService.trackTimeSpent(Page.FIELD_MAPPING_QBD, this.sessionStartTime);
      if (this.workspaceService.getOnboardingState() === QBDOnboardingState.FIELD_MAPPINGS) {
        this.trackingService.onOnboardingStepCompletion(QBDOnboardingState.FIELD_MAPPINGS, 3, fieldMappingPayload);
      } else {
        this.trackingService.onUpdateEvent(
          UpdateEvent.ADVANCED_SETTINGS_QBD,
          {
            phase: this.getPhase(),
            oldState: this.fieldMapping,
            newState: response
          }
        );
      }

      if (this.isOnboarding) {
        this.workspaceService.setOnboardingState(QBDOnboardingState.ADVANCED_SETTINGS);
        this.router.navigate([`/integrations/qbd/onboarding/advanced_settings`]);
      }
    }, () => {
      this.saveInProgress = false;
      this.toastService.displayToastMessage(ToastSeverity.ERROR, 'Error saving field mapping, please try again later');
      });
  }

  save(): void {
    if (this.fieldMappingForm.valid) {
      this.constructPayloadAndSave();
    }
  }

  private getSettingsAndSetupForm(): void {
    this.isLoading = true;
    this.isOnboarding = this.router.url.includes('onboarding');
    this.fieldMappingService.getQbdFieldMapping().subscribe((fieldMappingResponse : QBDFieldMappingGet) => {
      this.fieldMapping = fieldMappingResponse;
      this.fieldMappingForm = this.formBuilder.group({
        classType: [this.fieldMapping?.class_type ? this.fieldMapping?.class_type : null],
        customerType: [this.fieldMapping?.project_type ? this.fieldMapping?.project_type : null]
      });
      this.isLoading = false;
    }, () => {
        this.fieldMappingForm = this.formBuilder.group({
          classType: [null],
          customerType: [null]
        });
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.getSettingsAndSetupForm();
  }
}
