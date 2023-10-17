 
  import { PieChart } from 'react-chartkick'

  import 'chartkick/chart.js' 


  const ChartAnalysis = (props)=>{

    const {data } = props
 
    return <>
            <PieChart data = {Object.entries(data)}/>
        </>
  }

  export default ChartAnalysis