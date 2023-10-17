import { PieChart } from 'react-chartkick';
import 'chartkick/chart.js';


function RevenueChart (props){
    const {data,workSpaces} = props

        const chartData = data.workspaceRevenues?.map((item)=>{
            const name = workSpaces.find((ele)=>ele._id === item.workSpaceId? ele:"").name
            return [name,item.totalRevenue]
        })

    return<div className='text-center my-3 py-3'>
            <h4> Revenue Details</h4>
            <PieChart data = {chartData}/>
            <h5 className='my-3'> Total Earnings : &#x20B9; <span className='text-success'>{data.overallRevenue}</span>/-</h5>
        </div>
}

export default RevenueChart