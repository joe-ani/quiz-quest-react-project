import { red } from "@mui/material/colors";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import data from "./mockdata.json";
import "./QuizQuestions.css";

function QuizQuestions({ question }) {
  const [users, setUsers] = useState(data.slice(0, 9));
  const [pageNumber, setPageNumber] = useState(0);
  const [sec, setSec] = useState(0);
  const userPerPage = 1;
  const pagesVisited = pageNumber * userPerPage;
  const displayUsers = users
    .slice(pagesVisited, pagesVisited + userPerPage)
    .map((user) => {
      return (
        <div
          style={{
            color: "red",
            padding: "20px",
            background: "#fff",
            margin: "30px",
            textAlign: "center",
            borderRadius: "10px",
            fontWeight: "800",
          }}
        >
          {user.firstName}
        </div>
      );
    });

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const pageCount = Math.ceil(users.length / userPerPage);

  return (
    <div
      style={{
        overflowY: "scroll",
      }}
    >
      <div style={{
        textAlign: "center",
        color: "#fff",
        fontSize: "30px",
      }} > {pagesVisited + 1} / {pageCount}</div>
      {displayUsers}
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        previousClassName={"prevClass"}
        nextClassName={"nextClass"}
        containerClassName={"paginationButton"}
        disabledClassName={"paginationDisable"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}

export default QuizQuestions;
