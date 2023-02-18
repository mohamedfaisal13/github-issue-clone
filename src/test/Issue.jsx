import React, { useState, useEffect } from "react";

function IssueList() {
  const [issues, setIssues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const circle = (
    <svg
      className="main"
      viewBox="0 0 16 16"
      version="1.1"
      width="25"
      height="25"
      aria-hidden="true"
    >
      <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
      <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
    </svg>
  );
  useEffect(() => {
    const fetchIssues = async () => {
      const response = await fetch(
        `https://api.github.com/repos/prometheus/prometheus/issues`
      );
      const data = await response.json();
      console.log(data)
      const finaldata = data.filter((x)=>{
        return !("pull_request" in x)
      })
      setIssues(finaldata);
    };
    fetchIssues();
  }, [currentPage, perPage]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const IssueListItem = ({ issue }) => {
    
      return (
      <li>
        <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
          {issue.title}
        </a>
      </li>
    );
    
  };
  const IssueListPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <=issues.length/perPage; i++) {
      pageNumbers.push(i);
    }
    return (
      <nav>
        <ul class="pagination justify-content-center">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              class="page-item active page-link"
              aria-current="page"
            >
              {pageNumber}
            </button>
          ))}
        </ul>
      </nav>
    );
  };
  function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }
  let finalIssues=paginate(issues,perPage,currentPage) 
  return (
    <div>
      <h1 className="head">{circle} Issues</h1>
      <ul className="Box-header">
        {finalIssues.map((issue) => (
          <>
            <div className="flex">
              <div>
                <svg
                  className="sub"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
                </svg>
              </div>
              <div>
                <IssueListItem key={issue.id} issue={issue} />
              </div>
            </div>
          </>
        ))}
      </ul>
      <IssueListPagination />
    </div>
  );
}

export default IssueList;
