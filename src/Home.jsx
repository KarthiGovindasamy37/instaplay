import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { getSearchData, getTrendingData } from "./Services/Home";
import Loader from "./components/Loader";
import poster from './Assets/homePoster.svg'
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

      const trendingRes = await getTrendingData(currentPage)
       
      setMovieData(trendingRes?.data)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message,{toastId:"trendingError"});
    }
  };

  const getSearchResults = async () => {
    try {
      setLoading(true);
      const searchRes = await getSearchData(search,searchCurrentPage)

      setSearchResults(searchRes?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message,{toastId:"searchError"});
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
      <div className="posterWrapper">
        <div className="poster">
          <img src={poster}alt="poster" className="poster-img" />
        </div>
        <div className="home-bg">
          <p className="trending-t">
            {!search.length  ? "Trending" : `Search movies for "${search}"`}
          </p>
          {loading ? (
            <Loader/>
          ) : (
            <div className="trending-page">
              {search?.length  ? (
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
                  {movieData?.results?.map((movie, i) => {
                    return <Card cardDetails={movie} key={i} currentPage={currentPage} />;
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
