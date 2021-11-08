import { connect } from 'react-redux';
import { useState, useEffect, Fragment } from 'react';
import { getCompanyAddressByCompanyID, getCompanyProjectsByCompanyID,  getEmployees, getProjects, getEmployee } from '../services/global';
import * as actions from '../redux/actions/actionType';
import EditProject from './EditProject'
import styles from '../styles/Itemdetail.module.css';


/****************
 * Update Details 
 ***************/
async function updateCompanyDetail(action, setItemDetail) {
  let companyID = action.viewId;
  let obj = {item: action.viewItem}

  // Get address and project
  const data = await getCompanyAddressByCompanyID(companyID);
  obj['address'] = data;
  const data_1 = await getCompanyProjectsByCompanyID(companyID);
  obj['projects'] = data_1.length === 0 ? [false] : data_1;

  // Set status
  return setItemDetail(obj);
}

async function updateProjectDetail(action, setItemDetail) {
  let companyID = action.companyId;
  let obj = {item: action.viewItem}

  // Get address and project
  const data = await getCompanyAddressByCompanyID(companyID);
  obj['address'] = data;
  const data_1 = await getCompanyProjectsByCompanyID(companyID);
  obj['projects'] = data_1.length === 0 ? [false] : data_1;

  // Set status
  return setItemDetail(obj);
}

async function updateJobAreaDetail(action, setItemDetail) {
  let job_area = action.viewId;

  let obj = {item: action.viewItem}
  obj['area'] = job_area;

  // Get employees by job area
  const data = await getEmployees();
  let employee = data.filter((item) => item.jobArea === job_area);
  obj['numberOfEmployees'] = employee.length;

  // Get projects
  const data_1 = await getProjects();
  let employee_projects = [];

  // Find projects by employee
  data_1.forEach((project) => {
    if (employee.find((x) => project.employeesId.includes(x.id))) {
      employee_projects.push(project);
    }
  });

  obj['numberOfProjects'] = employee_projects.length;

  // Set state
  setItemDetail(obj);
}

async function updateEmployeeDetail(action, setItemDetail) {
  let employee_id = action.viewId;
  let obj = {item: action.viewItem}
  
  // Get employee by Id
  const data = await getEmployee(employee_id);
  obj['employeeDetail'] = data;

  // Get projects
  const data_1 = await getProjects();
  let employee_projects = [];

  // Get projects by employee
  data_1.forEach((project) => {
    if (project.employeesId.includes(employee_id)) {
      employee_projects.push(project);
    }
  });
  obj['projects'] = employee_projects.length === 0 ? [false] : employee_projects;

  // Set state
  setItemDetail(obj);
}


function handleViewItemChange(action, setItemDetail) {
  switch(action.viewItem) {
    case actions.VIEW_COMPANY:
      return  updateCompanyDetail(action, setItemDetail)
    case actions.VIEW_JOB_AREA:
      return  updateJobAreaDetail(action, setItemDetail)
    case actions.VIEW_EMPLOYEE:
      return  updateEmployeeDetail(action, setItemDetail)
    case actions.EDIT_PROJECT:
      return  updateProjectDetail(action, setItemDetail)
    default:
      return {}
  }

}

/*******
 * Redux 
 ********/
 function mapStateToProps(state) {
  return {
    viewItem: state.viewItem,
    viewId: state.viewId,
    editId: state.editId,
    companyId: state.companyId
  }
}

/**************************
* Render Item Detail 
***************************/
const ItemDetail = (props) => {

  const [itemDetail, setItemDetail] = useState([]);
  const [showEditProject, setShowEditProject] = useState([]);

  useEffect(() => {
    handleViewItemChange(props, setItemDetail);
  }, [props]);

  const onProjectClick = (e) => {
    let project_id = e.currentTarget.getAttribute('data-project-id');
    setShowEditProject(project_id);
  }
  
  switch(itemDetail.item) {
    case actions.VIEW_COMPANY:
    case actions.EDIT_PROJECT:
        return (
          <>
          <div className={styles.itemInformation}>
              <p><strong>Company Address: </strong></p>
              <p>{itemDetail.address.street + ', ' + itemDetail.address.city + ' ' + itemDetail.address.state + ', ' + itemDetail.address.country}</p>
              <p><strong>Projects: </strong><span><em>(Click to edit project)</em></span></p>
              <ul>
                {itemDetail.projects.map((project, index) => {
                  if (!project) {
                    return <p key={index}>No project found!</p>
                  }
                  return (
                    <Fragment key= {project.name + index}>
                      <li  className={styles.project} data-project-id = {project.id} onClick = {(e) => onProjectClick(e)} >{project.department + ': ' + project.name}</li>
                      {showEditProject === project.id ? <EditProject project = {project}/> : null}
                    </Fragment>
                  )
                })}
              </ul>
            </div>
          </>
        )
    case actions.VIEW_JOB_AREA:
      return (
        <>
        <div className={styles.itemInformation}>
            <p>Number of employees work on area "<strong>{itemDetail.area}</strong>": </p>
            <p>{itemDetail.numberOfEmployees}</p>
            <p>Number of projects employees participate: </p>
            <p>{itemDetail.numberOfProjects}</p>
          </div>
        </>
      )
    case actions.VIEW_EMPLOYEE:
      return (
        <>
          <div className={styles.itemInformation}>
          <p><strong>Employee Detail: </strong></p>
            <div className={styles.employeeDetail}>
              <p>First Name: {itemDetail.employeeDetail.firstName}</p>
              <p>Last Name: {itemDetail.employeeDetail.lastName}</p>
              <p>Date of Birth: {itemDetail.employeeDetail.dateOfBirth.substring(0, 10)}</p>
              <p>Job Area: {itemDetail.employeeDetail.jobArea}</p>
              <p>Job Title: {itemDetail.employeeDetail.jobTitle}</p>
              <p>Job Type: {itemDetail.employeeDetail.jobType}</p>
            </div>
            <p><strong>Projects: </strong></p>
            {itemDetail.projects.map((project, index) => {
                if (!project) {
                  return (<p key = {project.name + index}>No project found!</p>)
                }
                return (<li key = {project.name + index} >{project.department + ': ' + project.name}</li>)
            })}
          </div>
        </>
      )        
    default:
      return (null)
  }
}

export default connect(mapStateToProps)(ItemDetail);



