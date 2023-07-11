import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import { toast } from "react-toastify";
import axios from "axios";
import ReactPaginate from "react-paginate";
// import { useNavigate, useLocation } from 'react-router-dom'

function Home() {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(
    sessionStorage.getItem("searchValue") ?? ""
  );
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    sessionStorage.getItem("page") ?? 1
  );
  const [searchCurrentPage, setSearchCurrentPage] = useState(
    sessionStorage.getItem("searchPage") ?? 1
  );
  // let data = useLocation()

  // useEffect(()=>{console.log(data);
  // if(data.state.page){
  //   if(search.length > 0){
  //     setSearchCurrentPage(data.state.page)

  //   }else{
  //     setCurrentPage(data.state.page)

  //   }
  // }
  // },[])

  // useEffect(() => {
  //   if (sessionStorage.getItem("page")) {
  //     setCurrentPage(sessionStorage.getItem("page"));
  //   } else if (sessionStorage.getItem("searchPage")) {
  //     setSearchCurrentPage(sessionStorage.getItem("searchPage"));
  //   }
  // }, []);

  useEffect(() => {
    getDashDetails();
  }, [currentPage]);

  useEffect(() => {
    let debounce;
    if (search) {
      sessionStorage.removeItem("page");
      setCurrentPage(1);
      setLoading(true);
      debounce = setTimeout(() => {
        getSearchResults();
      }, 500);
    } else {
      setLoading(false);
      sessionStorage.removeItem("searchPage");
    }

    return () => {
      clearTimeout(debounce);
    };
  }, [search, searchCurrentPage]);

  const getDashDetails = async () => {
    try {
      setLoading(true);
      let res = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=f2eedd0ef7a8665b0ae82eb6445a77e7&page=${currentPage}`
      );
      setMovieData(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const getSearchResults = async () => {
    try {
      setLoading(true);
      let res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=f2eedd0ef7a8665b0ae82eb6445a77e7&language=en-US&query=${search}&page=${searchCurrentPage}&include_adult=false`
      );
      setSearchResults(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
    sessionStorage.setItem("page", data.selected + 1);
  };

  const handlePageClickSearch = (data) => {
    setSearchCurrentPage(data.selected + 1);
    sessionStorage.setItem("searchPage", data.selected + 1);
  };

  return (
    <div className="home">
      <Navbar
        search={search}
        setSearch={setSearch}
        setSearchCurrentPage={setSearchCurrentPage}
      />
      <div className="class">
        <div className="poster">
          <img src="/assets/homePoster.svg" className="poster-img" />
        </div>
        <div className="home-bg">
          <p className="trending-t">
            {search.length === 0 ? "Trending" : `Search movies for "${search}"`}
          </p>
          {loading ? (
            <div className="loading">
              <img src="/assets/ZZ5H.gif" alt="" className="loading-img" />
            </div>
          ) : (
            <div className="trending-page">
              {search.length > 0 ? (
                <>
                  {searchResults?.results?.length === 0 ? (
                    <div className="noResults">
                      Sorry no videos found for your search
                    </div>
                  ) : (
                    searchResults?.results?.map((e, i) => {
                      return <Card e={e} key={i} />;
                    })
                  )}
                  <div className="pagination-div">
                    {searchResults?.total_results ? (
                      <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClickSearch}
                        marginPagesDisplayed={3}
                        pageCount={searchResults.total_pages}
                        forcePage={searchCurrentPage - 1}
                        containerClassName="page-container"
                        pageClassName="paginate-page"
                        pageLinkClassName="paginate-link"
                        previousClassName="paginate-page"
                        previousLinkClassName="paginate-link"
                        nextClassName="paginate-page"
                        nextLinkClassName="paginate-link"
                        breakClassName="paginate-page"
                        breakLinkClassName="paginate-link"
                        activeClassName="paginate-active"
                        activeLinkClassName="paginate-active-link"
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </>
              ) : (
                <>
                  {movieData?.results?.map((e, i) => {
                    return <Card e={e} key={i} currentPage={currentPage} />;
                  })}
                  <div className="pagination-div">
                    {movieData?.total_results ? (
                      <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        marginPagesDisplayed={3}
                        pageCount={movieData.total_pages / 2}
                        forcePage={currentPage - 1}
                        containerClassName="page-container"
                        pageClassName="paginate-page"
                        pageLinkClassName="paginate-link"
                        previousClassName="paginate-page"
                        previousLinkClassName="paginate-link"
                        nextClassName="paginate-page"
                        nextLinkClassName="paginate-link"
                        breakClassName="paginate-page"
                        breakLinkClassName="paginate-link"
                        activeClassName="paginate-active"
                        activeLinkClassName="paginate-active-link"
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
