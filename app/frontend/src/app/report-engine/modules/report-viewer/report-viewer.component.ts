import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ReportListService } from '../report-list/services/report-list.service';
import * as xlsx from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver'

@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.scss']
})
export class ReportViewerComponent implements OnInit {

  report_name: any;
  report_main_header: any;
  report_sub_header: any;
  sql_output: any;
  sql_output2: any;
  report_id: any;
  from_date: any;
  to_date: any;
  from: any;
  to: any;
  length: any;
  columnTotal: any;
  column_needs_total: any;

  columns: any;
  headerColumns: any;
  filter_columns_array = [];
  filter_columns_multiselect = []
  selectedFilterColumn = [];
  filtered_obj_columns: any = [];
  to_filter_column: any;
  filtered_sql_output: any;
  filtered_columns: any = [];
  filtered_sql_output2: any = [];
  selectedColumns: any = [];
  filteredValues: any;
  selectedRows: any;
  customExportHeader: any;

  constructor(private routes: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private datePipe: DatePipe,
    private _reportService: ReportListService) { }

  ngOnInit(): void {
    this.report_id = this.route.snapshot.queryParams['report_id'];
    let filter_columns = this.route.snapshot.queryParams['filter_columns'];
    console.log('snapshot', this.report_id, filter_columns);
    if (filter_columns != 'null') {
      filter_columns.split(",").forEach(ele => {
        this.filter_columns_array.push({ column_name: ele, display_name: ele.split(".")[1], column_value: '' });
      });
    }
    if (filter_columns != 'null') {
      filter_columns.split(",").forEach(ele => {
        console.log('filtered columns', ele);
        this.filter_columns_multiselect.push(ele);
        let eventCreation = { value: this.filter_columns_multiselect};
        this.onChangeHandler(eventCreation);
      });
    }
    this.selectedColumns = this.filter_columns_multiselect;
    console.log('array', this.filter_columns_multiselect);
    this.showAllData();
  }

  globalSearch(event: any, dt: any) {
    return dt.filterGlobal(event.target.value, 'contains');
  }

  showAllData() {
    let filter_data = JSON.stringify(this.selectedFilterColumn)
    filter_data = filter_data === undefined ? '' : filter_data
    this._reportService.getReportbyIDAndType(this.report_id, this.from_date = 'NULL', this.to_date = 'NULL', filter_data).subscribe(
      (data) => {
        console.log("Incoming Data : ", data);
        this.report_name = data.report_name;
        this.report_main_header = data.report_main_header;
        this.report_sub_header = data.report_sub_header;
        this.sql_output = data.sql_output;
        this.columns = Object.keys(this.sql_output);
        this.columns.forEach((ele) => {
          this.filtered_obj_columns.push({ name: ele, value: ele })
        })
        this.to_filter_column = data.sql_output
        this.length = this.sql_output[this.columns[0]].length;
        this.column_needs_total = data.numerical_columns;
        this.headerColumns = Object.keys(this.sql_output);
        for (let i = 0; i < this.headerColumns.length; ++i) {
          let column = this.headerColumns[i];
          column = column.replaceAll('_', ' ');
          this.headerColumns[i] = column.replace(/(?:^|\s)\S/g, (res) => { return res.toUpperCase(); })
        }

        this.columnTotal = [];
        for (let i = 0; i < this.columns.length; i++) {
          let sum: any = 0;
          if (this.column_needs_total.find(element => element == this.columns[i])) {
            for (let j = 0; j < this.sql_output[this.columns[i]].length; j++) {
              sum += Number(this.sql_output[this.columns[i]][j]);
            }
            sum = Math.round(sum * 100) / 100;
          }
          else {
            sum = '';
          }
          this.columnTotal.push(sum);
        }
        this.columnTotal[0] = 'TOTAL';


        // Converting the sql_output for the primeng table
        let converted_sql_output = [[]];
        this.columns = Object.keys(this.sql_output);
        for (let i = 0; i < this.length; ++i) {
          let row = [];
          for (let j = 0; j < this.columns.length; ++j) {
            row[this.columns[j]] = this.sql_output[this.columns[j]][i];
          }
          converted_sql_output.push(row);
        }
        converted_sql_output.shift();
        this.sql_output = converted_sql_output;


        // Converting the sql_output again for the exportPdf()
        let double_converted_output = [[]];
        this.sql_output2 = this.sql_output;
        for (let i = 0; i < this.length; i++) {
          let row = [];
          for (let j = 0; j < this.columns.length; j++) {
            row[j] = this.sql_output2[i][this.columns[j]];
          }
          double_converted_output.push(row);
        }
        double_converted_output.shift();
        this.sql_output2 = double_converted_output;
      }
    );
  }

  showData() {
    this.filtered_obj_columns = [];
    this.from_date = this.datePipe.transform(this.from_date, 'yyyy-MM-dd');
    this.to_date = this.datePipe.transform(this.to_date, 'yyyy-MM-dd');
    this.from = this.from_date;
    this.to = this.to_date;
    console.log("From date ", this.from_date, " To Date ", this.to_date);
    let filter_data = JSON.stringify(this.selectedFilterColumn)
    filter_data = filter_data === undefined ? '' : filter_data

    // After selecting the date range new updated data
    this._reportService.getReportbyIDAndType(this.report_id, this.from_date, this.to_date, filter_data).subscribe(
      (data) => {
        console.log("sql output", this.sql_output)
        this.report_name = data.report_name
        this.sql_output = data.sql_output;
        this.columns = Object.keys(this.sql_output);
        this.columns.forEach((ele) => {
          this.filtered_obj_columns.push({ name: ele, value: ele })
        })
        console.log('option', this.filtered_obj_columns)
        this.to_filter_column = data.sql_output
        this.length = this.sql_output[this.columns[0]].length;
        this.column_needs_total = data.numerical_columns;
        this.columnTotal = [];
        for (let i = 0; i < this.columns.length; i++) {
          let sum: any = 0;
          if (this.column_needs_total.find(element => element == this.columns[i])) {
            for (let j = 0; j < this.sql_output[this.columns[i]].length; j++) {
              sum += Number(this.sql_output[this.columns[i]][j]);
            }
            sum = Math.round(sum * 100) / 100;
          }
          else {
            sum = '';
          }
          this.columnTotal.push(sum);
        }
        this.columnTotal[0] = 'TOTAL';

        // Converting the sql_output for the primeng table
        let converted_sql_output = [[]];
        for (let i = 0; i < this.length; ++i) {
          let row = [];
          for (let j = 0; j < this.columns.length; ++j) {
            row[this.columns[j]] = this.sql_output[this.columns[j]][i];
          }
          converted_sql_output.push(row);
        }
        converted_sql_output.shift();
        this.sql_output = converted_sql_output;

        // Converting the sql_output again for the exportPdf()
        let double_converted_output = [[]];
        this.sql_output2 = this.sql_output;
        for (let i = 0; i < this.length; i++) {
          let row = [];
          for (let j = 0; j < this.columns.length; j++) {
            row[j] = this.sql_output2[i][this.columns[j]];
          }
          double_converted_output.push(row);
        }
        double_converted_output.shift();
        this.sql_output2 = double_converted_output;
      }
    );
  }

  onChangeHandler(event) {
    console.log("chnage", event);
    console.log("onChangeHandler", event.value)
    const _ = require('lodash');
    this.filtered_sql_output = _.pick(this.to_filter_column, event.value)
    this.filtered_columns = Object.keys(this.filtered_sql_output);
    //Numerical columns total 
    this.columnTotal = [];
    for (let i = 0; i < this.filtered_columns.length; i++) {
      let sum: any = 0;
      if (this.column_needs_total.find(element => element == this.filtered_columns[i])) {
        for (let j = 0; j < this.filtered_sql_output[this.filtered_columns[i]].length; j++) {
          sum += Number(this.filtered_sql_output[this.filtered_columns[i]][j]);
        }
        sum = Math.round(sum * 100) / 100;
      }
      else {
        sum = '';
      }
      this.columnTotal.push(sum);
    }
    this.columnTotal[0] = 'TOTAL';

    // Converting the filtered_sql_output for the primeng table
    let converted_sql_output = [[]];
    for (let i = 0; i < this.length; ++i) {
      let row = [];
      for (let j = 0; j < this.filtered_columns.length; ++j) {
        row[this.filtered_columns[j]] = this.filtered_sql_output[this.filtered_columns[j]][i];
      }
      converted_sql_output.push(row);
    }
    converted_sql_output.shift();
    this.filtered_sql_output = converted_sql_output;
    // Converting the filtered_sql_output again for the exportPdf()
    let double_converted_output = [[]];
    this.filtered_sql_output2 = this.filtered_sql_output;
    for (let i = 0; i < this.length; i++) {
      let row = [];
      for (let j = 0; j < this.filtered_columns.length; j++) {
        row[j] = this.filtered_sql_output2[i][this.filtered_columns[j]];
      }
      double_converted_output.push(row);
    }
    double_converted_output.shift();
    this.filtered_sql_output2 = double_converted_output;
    console.log('selectedColumns', this.selectedColumns)
    if (this.selectedColumns.length == 0) {
      this.filtered_sql_output2 = []
    }

  }

  clear(table: Table) {
    table.clear();
    this.selectedFilterColumn = [];
    this.selectedColumns = [];
    this.from_date = '';
    this.to_date = '';
    this.showData();
    console.log('table', table);
  }

  onFilter(event, dt) {
    this.filteredValues = event.filteredValue;
    this.sql_output2 = this.filteredValues;
    this.length = this.sql_output2.length;

    // for updating column totals with filtered values
    this.columnTotal = [];
    for (let i = 0; i < this.columns.length; i++) {
      let sum: any = 0;
      if (this.column_needs_total.find(element => element == this.columns[i])) {
        for (let j = 0; j < this.length; j++) {
          sum += Number(this.sql_output2[j][this.columns[i]]);
        }
        sum = Math.round(sum * 100) / 100;
      }
      else {
        sum = '';
      }
      this.columnTotal.push(sum);
    }
    // this.columnTotal.unshift('TOTAL')
    this.columnTotal[0] = 'TOTAL';

    // Converting the sql_output again for the exportPdf()
    let double_converted_output = [[]];
    for (let i = 0; i < this.length; i++) {
      let row = [];
      for (let j = 0; j < this.columns.length; j++) {
        row[j] = this.sql_output2[i][this.columns[j]];
      }
      double_converted_output.push(row);
    }
    double_converted_output.shift();
    this.sql_output2 = double_converted_output;
  }

  exportToexel(): void {
    let element = document.getElementById("excel-table")
    console.log("check element", element)
    const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(element);
    console.log("check ws", ws)
    //     ws['!cols'][8] = { hidden: true };
    //     ws['!cols'][9] = { hidden: true };
    //     ws['!cols'][10] = { hidden: true };
    //     ws['!cols'][11] = { hidden: true };
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    console.log("check wb", wb)
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    xlsx.writeFile(wb, this.Excelfile)
  }
  Excelfile = "report.xlsx";

  exportPdf() {
    const addHeaders = doc => {
      const pageCount = doc.internal.getNumberOfPages()
      // doc.setFont('helvetica', 'italic')
      doc.setFontSize(5)
      for (var i = 1; i <= pageCount; i++) {
        doc.setFontSize(10)
        // let greet=''
        // doc.text('', doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 200, { align: 'center' });
        // let store_name=''
        // doc.text('', doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 193, { align: 'center' });
        doc.setFontSize(10);
        let from_to: string = this.report_name + ' ' + this.from + ' to ' + this.to;
        doc.text(from_to, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 187, { align: 'center' })
        doc.setPage(i)
      }
    }

    const addFooters = doc => {
      const pageCount = doc.internal.getNumberOfPages()
      // doc.setFont('helvetica', 'italic')
      doc.setFontSize(5)
      for (var i = 1; i <= pageCount; i++) {
        doc.setFontSize(5)
        doc.setPage(i)
        doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 5, {
          align: 'center'
        })
        if (i == pageCount) {
          doc.setFontSize(10)
          let greet = 'Prepared by:                                                                                                                                                                                                                                Officer'
          doc.text(greet, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 45, { align: 'center' });
          let store_name = 'A.G.M-Accounts                                                                                Director-Accounts Admin                                                                                Managing Director'
          doc.text(store_name, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 15, { align: 'center' });

        }
      }
    }

    const doc = new jsPDF({
      orientation: 'landscape'
    });

    doc.setFontSize(16);
    let width = doc.internal.pageSize.getWidth();
    doc.setFontSize(12);
    // let report_name = this.report_name.toUpperCase();
    let report_name = '';
    doc.text(report_name, width / 2, 23, { align: 'center' });

    doc.setFontSize(10)
    // let greet=''
    // doc.text('', doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 200, { align: 'center' });
    // let store_name=''
    // doc.text('', doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 193, { align: 'center' });
    doc.setFontSize(10);
    let from_to: string = this.report_name + ' ' + this.from + ' to ' + this.to;
    doc.text(from_to, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 187, { align: 'center' })

    autoTable(doc, {
      head: [this.filtered_columns.length > 0 ? this.filtered_columns : this.columns],
      body: this.filtered_sql_output2.length > 0 ? this.filtered_sql_output2 : this.sql_output2,
      foot: [this.columnTotal],
      showFoot: 'lastPage',
      styles: {
        fontSize: 7
      },
      theme: "grid",
      headStyles: {
        fillColor: [46, 128, 186]
      },
      footStyles: {
        fillColor: [46, 128, 186]
      },
      startY: 28,
      margin: {
        // top: 30,
        bottom: 50,
      }
    });

    // addHeaders(doc);
    // addFooters(doc);
    doc.save('report.pdf');
  }

  exportExcel() {
    const headers = this.columns;
    console.log("check columns", this.columns)
    console.log("check sql output", this.sql_output2)
    const worksheet = xlsx.utils.json_to_sheet(this.sql_output2);
    // let headerRow = worksheet.addRow(headers);
    console.log("check worksheet", worksheet)
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "products");
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
