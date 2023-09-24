import './DashboardComponent.css';

import {useEffect, useState} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Number of interns/Internal supervisor',
    },
  },
};

const options2 = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Number of employees',
    },
  },
};

const DashboardComponent =() => {
  const [data, setData] = useState({
    labels:['20','15', '10', '5', '0'],
    datasets: [
      {
        label: 'Dataset 1',
        data:[],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(25, 90, 13, 0.5)',
      },
      {
        label: 'Dataset 2',
        data:[],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });
  const [data1, setData1] = useState({
    labels:['20','15', '10', '5', '0'],
    datasets: [
      {
        label: 'Dataset 1',
        data:[],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(25, 90, 13, 0.5)',
      },
      {
        label: 'Dataset 2',
        data:[],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });

  useEffect(()=> {
    const fetchData= async()=> {
      const url = 'http://localhost:8888/STAGIAIRE-SERVICE/stagiaires'
      const labelSet = []
      const dataSet1 = [];
      const dataSet2 = [];
      await fetch(url).then((data)=> {
        console.log("Api data", data)
        const res = data.json();
        return res
      }).then((res) => {
        console.log("ressss", res)
        for (const val of res) {
          dataSet1.push(val.id);
          dataSet2.push(val.postId)
          // labelSet.push(val.name)
        }
        setData({
          labels:['20','15', '10', '5', '0'],
          datasets: [
            {
              label: 'Dataset ID',
              data:dataSet1,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(99, 132, 0.5)',
            },
            {
              label: 'Dataset ID2',
              data:dataSet2,
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 235, 0.5)',
            },
          ],
        })
        console.log("arrData", dataSet1, dataSet2)
      }).catch(e => {
        console.log("error", e)
      })
    }
    const fetchData1= async()=> {
      const url1 = 'http://localhost:8888/EMPLOYEE-SERVICE/employees'
      const labelSet = []
      const dataSet3 = [];
      const dataSet4 = [];
      await fetch(url1).then((data1)=> {
        console.log("Api data", data1)
        const res1 = data1.json();
        return res1
      }).then((res1) => {
        console.log("ressss", res1)
        for (const val1 of res1) {
          dataSet3.push(val1.id);
          dataSet4.push(val1.postId)
          // labelSet.push(val.name)
        }
        setData1({
          labels:['20','15', '10', '5', '0'],
          datasets: [
            {
              label: 'Dataset ID',
              data:dataSet3,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(99, 132, 0.5)',
            },
            {
              label: 'Dataset ID2',
              data:dataSet4,
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 235, 0.5)',
            },
          ],
        })
        console.log("arrData", dataSet3, dataSet4)
      }).catch(e => {
        console.log("error", e)
      })
    }
    fetchData1();
    fetchData();
  },[])

  return(
    <div className="dashboard-container">

        {
          console.log("data", data)
        }
        <Bar className="dashboard" data={data} options={options}/>
        <Bar className="dash" data={data1} options={options2}/>
    </div>
  )
}
export default DashboardComponent;