import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { bindActionCreators } from "redux"
import { getEmployees, updateProject } from '../services/global';
import { editProject } from '../redux/actions/actions';
import * as actions from '../redux/actions/actionType';
import styles from '../styles/EditProject.module.css';


/*************
 * Listeners * 
 **************/
function onProjectNameChange (e, project, setProject, setOutputMessage) {
    // Clear message
    setOutputMessage('');

    // Update project name
    let updated_project = Object.assign({}, project);
    updated_project['name'] = e.currentTarget.value

    // Set status
    setProject(updated_project);
}

function onEmployeeTagRemoveButtonClick(e, project, setProject) {
    e.preventDefault();
    let employee_id = e.currentTarget.parentElement.getAttribute('data-employee-tag-id');

    let updated_project = Object.assign({}, project);
    let employee_index = project.employeesId.findIndex((x) => x === employee_id);

    // Remove employee from project
    updated_project.employeesId.splice(employee_index, 1);

    // Set status
    setProject(updated_project)
}

function onEmployeeTagSelectChange (e, project, setProject) {
    e.preventDefault();
    let employee_id = e.target.value;
    if (!employee_id) {
        return;
    }
    let updated_project = Object.assign({}, project);
    let employee_index = project.employeesId.findIndex((x) => x === employee_id);

    if (employee_index !==  -1) {
        return;
    }
    // Add employee to project
    updated_project.employeesId.push(employee_id);

    // Set status
    setProject(updated_project);

}

async function onEditFormSubmit(e, initialProject, project, setOutputMessage, updateProjectState) {

    e.preventDefault();

    // Check changes
    if (initialProject === project) {
        return setOutputMessage('No Changes found!');
    }
    // Check empty project name
    if (project && !project.name.trim()) {
        return setOutputMessage('Failed! Project name is empty!');
    }

    // update project api call
    const data = await updateProject(project);
    updateProjectState(actions.EDIT_PROJECT, data);
    return setOutputMessage('Saved!');
}

/*******
 * Redux 
 ********/
const mapDispatchToProps = (dispatch) => {
    return(bindActionCreators({
      updateProjectState: (item, data) => editProject(item, data)
  }, dispatch))
  };
  

/**************************
* Render Edit Project Form 
***************************/
const EditProject = (props) => {
    const [employees, setEmployees] = useState([]);
    const [project, setProject] = useState(props.project);
    const [outputMessage, setOutputMessage] = useState('');

    useEffect(() => {
        getEmployees().then((data) => setEmployees(data.sort((a,b)=> a.firstName.localeCompare(b.firstName))));
    }, []);

    return (
        <>
        <form className={styles.editProjectForm}>
        <h4>Edit Project</h4>
            <p>
                <label>Project Name*: 
                    <input type="text" name="name" defaultValue = {project.name} onChange = {(e) => onProjectNameChange(e, project, setProject, setOutputMessage)}/>
                </label>
            </p>
            <p>Employee(s):</p>
            {project.employeesId && project.employeesId.map((x) => {
                let employee = employees.find((y) => y.id === x)
                if (!employee) {
                    return (null)
                }
                let employee_name = employee.firstName + ' ' + employee.lastName;
                    return (
                    <div key= {employee_name} data-employee-tag-id = {x} className={styles.employeeTag}>
                        <p>{employee_name}</p>
                        <button onClick = {(e) => onEmployeeTagRemoveButtonClick(e, project, setProject)}></button>
                    </div>
                )})
            }

            <select onChange = {(e) => onEmployeeTagSelectChange(e, project, setProject)}>
                <option value=''>[Select Employee]</option>
                {employees && employees.map((x, index) => {
                    let employee_name = x.firstName + ' ' + x.lastName; 
                    return (<option key= {employee_name + index} value = {x.id}>{employee_name}</option>)
                })}
            </select>
            <p className={styles.outputMessage}>{outputMessage}</p>
            <p className={styles.actionButton}>
                <button type="submit" onClick = {(e) => onEditFormSubmit(e, props.project, project, setOutputMessage, props.updateProjectState)}>Save</button>
            </p>
        </form>
        </>
    );

}

export default connect(null, mapDispatchToProps)(EditProject);