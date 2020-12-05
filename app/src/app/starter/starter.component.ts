import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { ChartModule, UIChart } from 'primeng/chart';
import { MessageService } from 'primeng/api';
import { ReportService } from '../core/services/report.service';
import { BaseComponent } from '../shared/components/base-component/base-component.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent extends BaseComponent implements AfterViewInit, OnInit {

  public dataEvaluate: any;
  public dataAverageScore: any;

  public dataPerson = [];
  public dataWater = [];
  public dataElectric = [];
  data: any =[];
  dataChartBill: any =[];
  dataChartEmployee: any =[];
  listYear : any = [];
  listMonth : any = [];  year : any;
  yearPerson : any;
  yearBill : any;
  empty : any;
  active : any;
  totalPerson : any;
  @ViewChild("chart") chart: UIChart; 
  @ViewChild("chartBill") chartBill: UIChart; 
  
  constructor(private messageService: MessageService,
    private reportService : ReportService) {
      super(null);
      var year = new Date().getFullYear();
      this.setMainService(reportService);  
      this.formSearch = this.buildForm({},{
        yearPerson: [year],
        yearBill: [year],
      });
      this.reportService.getDashBoard().subscribe(response => {
        this.empty = response.data.empty;
        this.active = response.data.active;
        this.totalPerson = response.data.totalPerson;
      });
      
  }
  ngOnInit() {

    this.buildChartPerson();
    // this.buildChartBill();
    this.buildChartEmployee();
  }

  ngAfterViewInit() {
  }

  public get f() {
    return this.formSearch.controls;
  }
  public changeYearPerson(){
    this.buildChartPerson();
  }
  public changeYearBill(){
    // this.buildChartBill();
  }

  public buildChartPerson(){
    var data1 = [];
    this.yearPerson = this.formSearch.controls['yearPerson'].value;
    this.reportService.getPersonAmountByYear(this.yearPerson).subscribe(response => {
      response.data.forEach(element => {
        data1.push(element.data);
      });

      const dataChart = {
        labels: ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6'
                ,'Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
        datasets: [
          {
            label: 'Cư dân',
            data: data1,
            fill: false,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      }
      this.data = Object.assign({}, dataChart);
      this.chart.reinit(); 
    });
   
  }

  public buildChartEmployee(){
    var data = [];
    var labels =[];
    this.reportService.getEmployeeAmountByYear(this.formSearch.controls['yearPerson'].value).subscribe(response => {
      response.data.forEach(element => {
        data.push(element.data);
        labels.push(element.label);
      });
      
      const dataChart = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#43eb34",
                    "#b82cdb",
                    "#f50290",
                    "#fbff00",
                    "#ff7700",
                    "#6fff00"
                ],
                hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#43eb34",
                  "#b82cdb",
                  "#f50290",
                  "#fbff00",
                  "#ff7700",
                  "#6fff00"
                ]
            }]    
        };
      this.dataChartEmployee = Object.assign({}, dataChart);
    });
    
  }

  // public buildChartBill(){
  //   this.dataWater = [];
  //   this.dataElectric = [];
  //   this.yearBill = this.formSearch.controls['yearBill'].value;
  //   this.reportService.getTotalPriceByYear(this.yearBill,2).subscribe(response => {
  //     response.data.forEach(element => {
  //       this.dataWater.push(element.data);
  //     });
  //     this.reportService.getTotalPriceByYear(this.yearBill,1).subscribe(response => {
  //       response.data.forEach(element => {
  //         this.dataElectric.push(element.data);
  //       });
  //       const dataChart = {
  //         labels: ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6'
  //                 ,'Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
  //         datasets: [
  //           {
  //             label: 'Tiền nước',
  //             data: this.dataWater,
  //             fill: false,
  //             borderColor: '#4bc0c0'
  //           },
  //           {
  //             label: 'Tiền điện',
  //             data: this.dataElectric,
  //             fill: false,
  //             borderColor: '#ff2200'
  //           }
  //         ]
  //       }
  //       this.dataChartBill = Object.assign({}, dataChart);
  //       this.chartBill.reinit(); 
  //     });
  //   });
    
    
  // }
}
