import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { getInstanceByDom, connect } from 'echarts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  pizzaChard = {
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '5%',
        left: 'left'
    },
    series: [
        {
            name: 'Resumo do mes',
            type: 'pie',
            radius: ['60%', '50%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'left'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '12',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 1048, name: 'Demo'},
                {value: 735, name: 'Usuários'},
                {value: 580, name: 'Fornecedores'},
                {value: 484, name: 'Clientes'},
                {value: 300, name: 'Chamados'}
            ]
        }
    ]
};


  constructor(private store: Store) { }

  ngOnInit(): void {
    // this.store.dispatch(new GetAllUsers()).subscribe(users => console.log(users))
    setTimeout(() => {
      const chartElement1 = document.getElementById('chart1');
      const chartElement2 = document.getElementById('chart2');
      const chart1 = getInstanceByDom(chartElement1);
      const chart2 = getInstanceByDom(chartElement2);
      connect([chart1, chart2]);
    });
  }
}



