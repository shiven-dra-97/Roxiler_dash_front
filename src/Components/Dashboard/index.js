import BarChart from "../BarChart"
import DataTable from "../DataTable"


import Statistics from "../Statistics"
import "./index.css"
const Dashboard = () => {
    return (
        <div className="main">
             <div className="container">
            <div className="heading">
                <h1>Transaction Dashboard</h1>
            </div>
                <div className="row">
                    <div className="col-12">
                        <DataTable />
                    </div>
                    <div className=" col-12">
                      <Statistics/>
                    </div>
                    <div className="col-6">
                       <BarChart/>
                    </div>
                  
                </div>
            </div>
        </div>
    )
}

export default Dashboard