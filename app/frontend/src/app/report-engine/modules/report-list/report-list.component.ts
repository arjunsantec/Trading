import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ReportListService } from './services/report-list.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  reportList: any = [];

  constructor(private _sharedService: SharedService,
    public translate: TranslateService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private _reportService: ReportListService) { }

  ngOnInit(): void {
    this.getReportList();
  }

  getReportList() {
    this._reportService.getReports().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          let t = response?.results.filter(a => {
            if(a.is_active) {
              return a;
            }
          })
          this.reportList = t;
          console.log("REPORT LIST : ", this.reportList);
        }
      }
    )
  }

  goToReportViewer(report: any) {
    if(report) {
      let report_id = report.id;
      console.log("This is the selected Report : ", report);
      this.router.navigateByUrl('/report/viewer?report_id='+report_id +"&filter_columns="+report?.filter_columns);
    }
    // else {
      // this.nbToasterService.info("No Report's Selected!");
    // }
  }

}
