import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import "../assets/css/general.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight,faSearch } from "@fortawesome/free-solid-svg-icons";


const Home = () => {
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [posts, setPosts] = useState([]);
  const [totalPosts, settotalPosts] = useState(0);


  const navigate = useNavigate();

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalPosts);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);

        //api request
        const response = await axios.get(
          `/posts?page=${currentPage}&size=${pageSize}&q=${searchValue}`
        );
        const data = response.data.data;
        setPosts(data.posts);
        setTotalPage(Math.ceil(data.total / pageSize));
        settotalPosts(data.total);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: true,
        });
      }
    };
    getPosts();
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (totalPage > 1) {
      let tempPageCount = [];

      for (let i = 1; i <= totalPage; i++) {
        tempPageCount = [...tempPageCount, i];
      }

      setPageCount(tempPageCount);
    } else {
      setPageCount([]);
    }
  }, [totalPage]);

  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = async (e) => {
    try {
      const input = e.target.value;

      setSearchValue(input);

      const response = await axios.get(`/posts?q=${input}&page=${currentPage}`);
      const data = response.data.data;

      setPosts(data.posts);
      setTotalPage(data.pages);
      settotalPosts(data.total);
    } catch (error) {
      const response = error.response;
      const data = response.data;
      toast.error(data.message, {
        position: "top-right",
        autoClose: true,
      });
    }
  };
  return (
    <div className="main-container">
      <h2 className="table-title">Post list</h2>
     <div className="search-wrapper">
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
      <input 
      type="text" 
      placeholder="Search here" 
      className="search-input"
      onChange={handleSearch}
      
      />
    </div>

      {/* Bootstrap Card Grid */}
      <div className="row">
        {loading ? (
          <div className="col-12 text-center">Loading...</div>
        ) : (
          posts.map((post) => (
            <div className="col-md-4 col-sm-6 g-4" key={post._id}>
              <div
                className="card h-100 shadow-sm post-card"
                onClick={() => navigate(`/posts/detail-post/${post._id}`)}
              >
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text text-muted">{post.desc}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {pageCount.length > 1 && (
        <div className="pag-container">
          <button
            className="pag-button icon-button"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>

          {pageCount.map((pageNumber, index) => (
            <button
              className={`pag-number ${currentPage === pageNumber ? "active-page" : ""}`}
              key={index}
              onClick={() => handlePage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          <button
            className="pag-button icon-button"
            onClick={handleNext}
            disabled={currentPage === totalPage}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      )}
       {totalPosts > 0 && (
        <div className="category-count">
          <div>
            {`${startIndex} - ${endIndex} of ${totalPosts} posts`}
          </div>

        </div>
      )}
    </div>
  );
};

export default Home;
