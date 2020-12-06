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
    infoAll: any;

    // data
    dataBedroom : any;
    dataBathroom: any;
    dataFloor: any;
    dataArea: any;
    dataFrontWidth: any;
    dataInletWidth: any;
    dataDistanceCenter: any;
    dataAll: any;


  constructor(public actr: ActivatedRoute, public houseService : HouseService) {
    super(actr, RESOURCE.HOUSE, ACTION_FORM.SEARCH);
    this.setMainService(houseService);
    this.getData();
  }

  ngOnInit() {
    this.infoAll = {
      title: {
        display: true,
        text: 'Thông tin - giá nhà ',
        fontSize: 16
      },
      legend: {
        position: 'top'
      }
    };

    this.infoBedroom = {
      title: {
        display: true,
        text: 'Số phòng ngủ - giá nhà ',
        fontSize: 16
      },
      legend: {
        position: 'top'
      }
    };

    this.infoBathroom = {
      title: {
        display: true,
        text: 'Số phòng tắm - giá nhà ',
        fontSize: 16
      },
      legend: {
        position: 'top'
      }
    };

    this.infoFloor = {
      title: {
        display: true,
        text: 'Số tầng - giá nhà',
        fontSize: 16
      },
      legend: {
        position: 'top'
      }
    };
    this.infoArea = {
      title: {
        display: true,
        text: 'Diện tích - giá nhà ',
        fontSize: 16
      },
      legend: {
        position: 'top'
      }
    };
    this.infoFrontWidth = {
      title: {
        display: true,
        text: 'Độ rộng mặt trước - giá nhà',
        fontSize: 16
      },
      legend: {
        position: 'top'
      }
    };

    this.infoInletWidth = {
      title: {
        display: true,
        text: 'Độ rộng đường vào - giá nhà ',
        fontSize: 16
      },
      legend: {
        position: 'top'
      }
    };

    this.infoDistanceCenter = {
      title: {
        display: true,
        text: 'Khoảng cách so với trung tâm - giá nhà ',
        fontSize: 16
      },
      legend: {
        position: 'top'
      }
    };

  }

  public getData(){
    this.houseService.getStatisticData().subscribe(res =>{
      this.dataBedroom = {
        labels: res.dataPrice,
        datasets: [
          {
            label: 'Số phòng ngủ',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: res.dataBed
          }
        ]
      }

      this.dataBathroom = {
        labels:res.dataPrice,
        datasets: [
          {
            label: 'Số phòng tắm',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: res.dataBath
          }
        ]
      }
      this.dataFloor = {
        labels: res.dataPrice,
        datasets: [
          {
            label: 'Số tầng',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: res.dataFloor
          }
        ]
      }

      this.dataArea = {
        labels: res.dataPrice,
        datasets: [
          {
            label: 'Diện tích',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: res.dataArea
          }
        ]
      }

      this.dataFrontWidth = {
        labels: res.dataPrice,
        datasets: [
          {
            label: 'Độ rộng mặt trước',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: res.dataFrontWidth
          }
        ]
      }

      this.dataInletWidth = {
        labels: res.dataPrice,
        datasets: [
          {
            label: 'Độ rộng đường vào ',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: res.dataInletWidth
          }
        ]
      }

      this.dataDistanceCenter = {
        labels: res.dataPrice,
        datasets: [
          {
            label: 'Khoảng cách so với trung tâm',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: res.dataDistanceCenter
          }
        ]
      };


      this.dataAll = {
        labels: res.dataPrice,
        datasets: [
          {
            label: 'Số phòng ngủ',
            fill: false,
            borderColor: '#02bec9',
            data: res.dataBed
          },
          {
            label: 'Số phòng tắm',
            fill: false,
            borderColor: '#6610f2',
            data: res.dataBath
          },
          {
            label: 'Số tầng',
            fill: false,
            borderColor: '#e83e8c',
            data: res.dataFloor
          },
          {
            label: 'Diện tích',
            fill: false,
            borderColor: '#fd7e14',
            data: res.dataArea
          },
          {
            label: 'Độ rộng mặt trước',
            fill: false,
            borderColor: '#28a745',
            data: res.dataArea
          },
          {
            label: 'Độ rộng đường vào ',
            fill: false,
            borderColor: '#ffb22b',
            data: res.dataInletWidth
          },
          {
            label: 'Khoảng cách so với trung tâm',
            fill: false,
            borderColor: '#eb4b0e',
            data: res.dataDistanceCenter
          }
        ]
      }

      
    })
  }
  
}
