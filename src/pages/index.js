import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { bindActionCreators } from "redux"
import { getCompanies } from '../services/global';
import Employees from '../components/Employees';
import ItemDetail from '../components/ItemDetail';
import { viewDetail } from '../redux/actions/actions';
import * as actions from '../redux/actions/actionType';
import styles from '../styles/Home.module.css';

/*************
 * Listeners 
 *************/
function handleViewItemClick (e) {
  let is_company = e.currentTarget.hasAttribute('data-company-id');
  let is_job_area = e.currentTarget.hasAttribute('data-job-area');
  let is_employee = e.currentTarget.hasAttribute('data-employee-id');

  if (is_company) {
    let company_id = e.currentTarget.getAttribute('data-company-id')
    return viewDetail(actions.VIEW_COMPANY, company_id);
  }
  if (is_job_area) {
    let job_area = e.currentTarget.getAttribute('data-job-area');

    return viewDetail(actions.VIEW_JOB_AREA, job_area)
  }
  if (is_employee) {
    let employee_id = e.currentTarget.getAttribute('data-employee-id');
    return viewDetail(actions.VIEW_EMPLOYEE, employee_id)
  }
}

/********
 * Redux 
 *********/
const mapDispatchToProps = (dispatch) => {
  return(bindActionCreators({
    updateDetail: (e) => handleViewItemClick(e)
}, dispatch))
};


/******************
 * Render Home page 
 ******************/
function Home(props) {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getCompanies().then((data) => setCompanies(data));
  }, []);

  return (
    <>
      <div className={styles.companyList}>    
        <h1>Companies</h1>
        <p className={styles.instruction}><em>Click to view detail</em></p>
        {companies && (
          companies.map((item, index) => (
            <div className={styles.companyCard} key={index}>
              <p data-company-id = {item.id} onClick = {(e) => props.updateDetail(e)} ><strong>{item.name}</strong></p>
              <Employees companyID = {item.id} updateDetail = {props.updateDetail}></Employees>
            </div>
          ))
        )}
        <ItemDetail></ItemDetail>
      </div>
    </>
  )
}

export default connect(null, mapDispatchToProps)(Home);