import { useEffect, useState, Fragment } from 'react';
import { getEmployeesByCompanyID } from '../services/global';

/******************
* Render Employees
*******************/
const Employees = (props) => {

    let company_id = props.companyID;
    const [employees, setEmployees] = useState([]);

    const loadEmployees = (company_id) => {
        getEmployeesByCompanyID(company_id)
        .then((data) => {
                setEmployees(data.sort((a,b)=> a.jobArea.localeCompare(b.jobArea)));
            })
        };
    
    // Load Employees
    useEffect(() => {
        loadEmployees(company_id);
    }, [company_id]);

    // Group Employee to Job Area
    let employeeGroup = [];
    employees.map((item, index) => {
        let job_area = item.jobArea;
        let job_employee_name = item.firstName + ' ' + item.lastName;
        if (index !== 0 && employees[index].jobArea === employees[index-1].jobArea) {
            return employeeGroup[employeeGroup.length - 1][job_area].push(item.id + ',' + job_employee_name);
        }

        let obj = {};
        obj[job_area] = [item.id + ',' + job_employee_name];
        return employeeGroup.push(obj);
    });

    // Render
    return (
        <>
        <ul>
            {employeeGroup.length !== 0 && (
                employeeGroup.map((item, i) => {
                    let obj_key = Object.keys(item);
                    return (
                        <Fragment key={company_id + obj_key + i}>
                        <li data-job-area={obj_key} onClick = {(e) => props.updateDetail(e)}>{obj_key}</li>
                        <ul>
                            {item[obj_key].map((x,i) => {
                                let employee = x.split(',');
                                return <li key={company_id + employee + i} data-employee-id={employee[0]} onClick = {(e) => props.updateDetail(e)}>{employee[1]}</li>
                            })}
                        </ul>
                        </Fragment>
                    )
                })
            )}
        </ul>
        </>
    )
}

export default Employees