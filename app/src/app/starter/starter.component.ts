import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { ChartModule, UIChart } from 'primeng/chart';
import { MessageService } from 'primeng/api';
import { ReportService } from '../core/services/report.service';
import { BaseComponent } from '../shared/components/base-component/base-component.component';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HouseService } from '../core/services/house.service';
import { ACTION_FORM, RESOURCE } from '../core/app-config';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
  export class StarterComponent extends BaseComponent implements OnInit {
    // info
    infoBedroom: any;
    infoBathroom: any;
    infoFloor: any;
    infoArea: any;
    infoFrontWidth: any;
    infoInletWidth: any;
    infoDistanceCenter: any;

    // data
    dataBedroom : any;
    dataBathroom: any;
    dataFloor: any;
    dataArea: any;
    dataFrontWidth: any;
    dataInletWidth: any;
    dataDistanceCenter: any;

  constructor(public actr: ActivatedRoute, public houseService : HouseService) {
    super(actr, RESOURCE.HOUSE, ACTION_FORM.SEARCH);
    this.setMainService(houseService);
    this.getData();
  }

  ngOnInit() {
    this.infoBedroom = {
      title: {
        display: true,
        text: 'Số phòng ngủ',
        fontSize: 16
      },
      legend: {
        position: 'top'
      }
    };

    this.infoBathroom = {
      title: {
        display: true,
        text: 'Số phòng tắm ',
        fontSize: 16
      },
      legend: {
        position: 'top'
      }
    };

    this.infoFloor = {
      title: {
        display: true,
        text: 'Số tầng',
        fontSize: 16
      },
      legend: {
        position: 'top'
      }
    };
    this.infoArea = {
      title: {
        display: true,
        text: 'Diện tích',
        fontSize: 16
      },
      legend: {
        position: 'top'
      }
    };
    this.infoFrontWidth = {
      title: {
        display: true,
        text: 'Độ rộng mặt trước',
        fontSize: 16
      },
      legend: {
        position: 'top'
      }
    };

    this.infoInletWidth = {
      title: {
        display: true,
        text: 'Độ rộng đường vào',
        fontSize: 16
      },
      legend: {
        position: 'top'
      }
    };

    this.infoDistanceCenter = {
      title: {
        display: true,
        text: 'Khoảng cách so với trung tâm',
        fontSize: 16
      },
      legend: {
        position: 'top'
      }
    };

  }

  public getData(){
    debugger
    this.houseService.getStatisticData().subscribe(res =>{
      
      this.dataBedroom = {
        labels: [1,2,3,4,5,6,7,8,9,10],
        datasets: [
          {
            label: 'Số nhà',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: res.dataBed
          }
        ]
      }

      this.dataBathroom = {
        labels: [1,2,3,4,5,6,7,8,9,10],
        datasets: [
          {
            label: 'Số nhà',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: res.dataBath
          }
        ]
      }
      this.dataFloor = {
        labels: [1,2,3,4,5,6,7,8],
        datasets: [
          {
            label: 'Số nhà',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: res.dataFloor
          }
        ]
      }

      this.dataArea = {
        labels: [ "0-20","20-40","40-60","60-80","80-100",
                  "100-120","120-140","140-160","160-180","180-200"
                ],
        datasets: [
          {
            label: 'Số nhà',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: res.dataArea
          }
        ]
      }

      this.dataFrontWidth = {
        labels: ["0-4","4-8","8-12","12-16","16-20"],
        datasets: [
          {
            label: 'Số nhà',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: res.dataFrontWidth
          }
        ]
      }

      this.dataInletWidth = {
        labels: [1,2,3,4,5,6,7,8,9,10],
        datasets: [
          {
            label: 'Số nhà',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: res.dataInletWidth
          }
        ]
      }

      this.dataDistanceCenter = {
        labels: [ "0-2000","2000-4000"
                ,"4000-6000","6000-8000"
                ,"8000-10000","10000-12000"
                ,"12000-14000" ,"14000-16000"
                ,"16000-18000" ,"18000-20000"
              ],
        datasets: [
          {
            label: 'Số nhà',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: res.dataDistanceCenter
          }
        ]
      };

    })
  }
  
}
