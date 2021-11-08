/**
 * Retrieve companies list
 *
 * @return {object} Array containing company objects
*/

/****************
 * Get Companies
 ***************/
export const getCompanies = async () => {
  const API = process.env.REACT_APP_API_URI;

  const resp = await fetch(`${API}/api/companies`, { method: 'GET' }),
        data = await resp.json();

  return data;
};

/**********************
 * Get Company Address
 *********************/
export const getCompanyAddressByCompanyID = async (companyID) => {
  const API = process.env.REACT_APP_API_URI;

  const resp = await fetch(`${API}/api/address/by_company/${companyID}`, { method: 'GET' }),
        data = await resp.json();

  return data;
};

/**********************
 * Get Company Projects
 *********************/
export const getCompanyProjectsByCompanyID = async (companyID) => {
  const API = process.env.REACT_APP_API_URI;

  const resp = await fetch(`${API}/api/projects/${companyID}`, { method: 'GET' }),
        data = await resp.json();

  return data;
};

/**********************
 * Get Company Employees
 *********************/
export const getEmployeesByCompanyID = async (companyID) => {
  const API = process.env.REACT_APP_API_URI;

  const resp = await fetch(`${API}/api/employee/by_company/${companyID}`, { method: 'GET' }),
        data = await resp.json();

  return data;
};

/**********************
 * Get Employee
 *********************/
 export const getEmployee = async (employeeID) => {
  const API = process.env.REACT_APP_API_URI;

  const resp = await fetch(`${API}/api/employee/${employeeID}`, { method: 'GET' }),
        data = await resp.json();

  return data;
};

/**********************
 * Get Employees
 *********************/
export const getEmployees = async () => {
  const API = process.env.REACT_APP_API_URI;

  const resp = await fetch(`${API}/api/employee/`, { method: 'GET' }),
        data = await resp.json();

  return data;
};

/**********************
 * Get Projects
 *********************/
export const getProjects = async () => {
  const API = process.env.REACT_APP_API_URI;

  const resp = await fetch(`${API}/api/projects/`, { method: 'GET' }),
        data = await resp.json();

  return data;
};


/**********************
 * Update Project
 *********************/
export const updateProject = async (project) => {
  const API = process.env.REACT_APP_API_URI;

  const input = {
    projectID: project.id,
    projectName: project.name,
    employees: project.employeesId
  }

  const resp = await fetch(`${API}/api/projects/update_project`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input)
    }),
    
    data = await resp.json();

    return data;
};



