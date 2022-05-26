import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewComponent.css";
function ViewComponent() {
  const [employeeData, setemployeeData] = useState([]);
  const [dataErr, setdataErr] = useState("");
  const [initialdataErr, setinitialdataErr] = useState(false);
  const [pageNo, setpageNo] = useState(1);
  useEffect(() => {
    var config = {
      method: "get",
      url: `http://localhost:8080/data?page=${pageNo}`,
    };

    axios(config)
      .then((response) => {
        console.log(response.data["data"]);
        setemployeeData(response.data["data"]);
        setinitialdataErr(false);
      })
      // .then((data) => console.log(data["data"]))
      .catch(function (error) {
        console.log(error.message);
        setdataErr(error.message);
        setinitialdataErr(true);
      });
  }, [pageNo]);
  // console.log(employeeData);
  let empList = employeeData.map((emp, index) => {
    return (
      <tr key={index}>
        <th scope="row">{emp.id}</th>
        <td>{emp.employee_name}</td>
        <td>{emp.employee_salary}</td>
        <td>{emp.employee_age}</td>
      </tr>
    );
  });
  const pageHandler = (event) => {
    // event.currentTarget.parentElement.classList.add("active");
    // console.log(a);
    setpageNo(event.currentTarget.textContent);
  };
  const colorHandler = (event) => {
    event.currentTarget.classList.add("active");
  };
  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col" className="table-top">
              Id
            </th>
            <th scope="col" className="table-top">
              Name
            </th>
            <th scope="col" className="table-top">
              Employee Salary{" "}
            </th>
            <th scope="col" className="table-top">
              Age
            </th>
          </tr>
        </thead>
        {/* {employeeData.length != 0 ? (
          employeeData.map((emp, index) => {
            // console.log(
            //   emp["employee_age"],
            //   emp["employee_salary"],
            //   emp["employee_name"],
            //   emp["id"]
            // );
            <tbody>
              <tr>
                <td>{emp["id"]}</td>
                <td>{emp["employee_name"]}</td>
                <td>{emp["employee_salary"]}</td>
                <td>{emp["employee_age"]}</td>
              </tr>
            </tbody>;
          })
        ) : (
          <div className="no-res"> No Results Found</div>
        )} */}
        {!initialdataErr ? (
          <tbody>{empList}</tbody>
        ) : (
          <div className="err-msg">{`${dataErr}`}</div>
        )}
      </table>
      {/* { (employeeData.length==0)?{<p>{`${dataErr}`}</p>}} */}
      <nav aria-label="Page navigation example bottom">
        <ul class="pagination pagination-lg justify-content-center pageval">
          <li class="page-item " onClick={colorHandler}>
            <a class="page-link" href="#" onClick={pageHandler}>
              1
            </a>
          </li>
          <li class="page-item " onClick={() => colorHandler(2)}>
            <a class="page-link " href="#" onClick={pageHandler}>
              2
            </a>
          </li>
          <li class="page-item" onClick={colorHandler}>
            <a class="page-link" href="#" onClick={pageHandler}>
              3
            </a>
          </li>
          <li class="page-item" onClick={colorHandler}>
            <a class="page-link" href="#" onClick={pageHandler}>
              4
            </a>
          </li>
          <li class="page-item" onClick={colorHandler}>
            <a class="page-link" href="#" onClick={pageHandler}>
              5
            </a>
          </li>
        </ul>
      </nav>
      {/* {if(!initialDataErr){
        <p>{`${dataErr}`}</p>
      }} */}
      {/* {dataErr && !employeeData && <p>Hi No records</p>} */}
    </div>
  );
}

export default ViewComponent;
