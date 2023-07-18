import axios from "axios";
import { useState } from "react";

/* import { DataPieChart } from "./DataPieChart"; */
import {Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {Pie} from 'react-chartjs-2'

export default function DataPieChart(){

    ChartJS.register(ArcElement, Tooltip, Legend)

    const [numToRead, setNumToRead] = useState([])
    const [numLib, setNumLib] = useState([])
    const [numCurrent, setNumCurrent] = useState([])

    async function getNumberOfBooks(booklist, id){
        try {
            const response = await axios(
              `http://localhost:3001/${booklist}?id=${id}`
            );
            /* console.log(booklist) */
            const numBooks = await response.data.length
            if(booklist === "toread"){
                setNumToRead(numBooks)
            }
            else if(booklist === "library"){
                setNumLib(numBooks)
            }
            else if(booklist === "currentlyreading"){
                setNumCurrent(numBooks)
            }
            
        } catch (error) {
            console.log(error);
          }
        
    }
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    getNumberOfBooks("library", loggedUser._id)
    getNumberOfBooks("toread", loggedUser._id)
    getNumberOfBooks("currentlyreading", loggedUser._id)

    const DataPieChart = {
        labels: [
            'To Read',
            'Currently Reading',
            'Library'
        ],
        datasets: [{
            label: 'My Books',
            data: [
                numToRead,
                numCurrent,
                numLib,
            ],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
        }
        ],
       
    }

    return(
    <>
    <div>
      <Pie data={DataPieChart}/>
    </div>
        
    </>

    )
}