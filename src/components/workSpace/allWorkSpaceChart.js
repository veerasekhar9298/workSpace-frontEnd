import React from 'react';
import { ColumnChart } from 'react-chartkick';
import 'chartkick/chart.js';


function AllWorkSpaceChart(props) {
  const { data ,workSpaces} = props;
  const availableData = [];
  const occupiedData = [];

 console.log(data)

  data.forEach((item) => {
    const name = workSpaces.find((ele)=> ele._id === item.name? ele :"").name; // Convert ObjectID to string
    const available = item.data.Available || 0;
    const occupied = item.data.Occupied || 0;
    
    availableData.push([name, available]);
    occupiedData.push([name, occupied]);
  });


  // Create an array of datasets
  const datasets = [
    { name: 'Available', data: availableData }, 
    { name: 'Occupied', data: occupiedData }
  ];

  
  
  console.log(datasets)

  return (
    <div className='text-center my-5'>
        <h4 className='my-5'>All WorkSpace Details</h4>
      <ColumnChart data={datasets}  />
    </div>
  );
}

export default AllWorkSpaceChart;
