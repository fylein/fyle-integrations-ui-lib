import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { WindowService } from '../../../../core/services/core/window.service';
import { TrackingService } from '../../../../core/services/integration/tracking.service';
import { AppName, ClickEvent } from '../../../../core/models/enum/enum.model';

@Component({
  selector: 'fyle-integrations-ui-lib-app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  AppName = AppName;

  @Output() openDialog = new EventEmitter<void>();

  @Output() disconnectIntegration = new EventEmitter<void>();

  @Output() syncEmployees = new EventEmitter<void>();

  @Input() iconPath: string;

  @Input() isIntegrationConnected: boolean | undefined;

  @Input() isIntegrationSetupInProgress: boolean;

  @Input() appName: string;

  @Input() appDescription: string;

  @Input() isLoading: boolean;

  @Input() isRecipeRunning: boolean;

  @Input() showErrorScreen: boolean;

  @Input() hideRefreshIcon: boolean;

  @Input() iframeSourceUrl: SafeResourceUrl | null;

  @Input() redirectLink: string;

  @Input() isConnectionInProgress: boolean;

  constructor(
    private router: Router,
    private trackingService: TrackingService,
    public windowService: WindowService
  ) { }

  syncData(): void {
    this.syncEmployees.emit();
  }

  connect(): void {
    this.openDialog.emit();
  }

  disconnect(): void {
    this.disconnectIntegration.emit();
  }

  connectQBD(): void {
    this.trackingService.onClickEvent(ClickEvent.CONNECT_QBD);
    this.router.navigate(['/integrations/qbd/onboarding/export_settings']);
  }

  ngOnInit(): void {
  }

}