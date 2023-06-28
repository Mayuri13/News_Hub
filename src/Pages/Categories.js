import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../Components/Spinner";
import LoadingBar from "react-top-loading-bar";

export default function Categories(props) {
  const [articles, setarticles] = useState("");
  const [page, setPage] = useState(1)
  const [progress, setProgress] = useState(10);
  
//To capitalize first letter of category
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=in&category=${props.cat}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        );
        setProgress(60)
        setarticles(response.data.articles);
        document.title = `${capitalizeFirstLetter(props.cat)} - News Hub`
        setProgress(100)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [page,props.pageSize,props.cat,props.apiKey]);

  const updateNews = async ()=> {
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.cat}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`; 
    let data = await fetch(url);
    setProgress(60)
    let parsedData = await data.json()
    setarticles(parsedData.articles)
    setProgress(100)
}
//For prev button
const handlePrev = async()=>{
  setPage(page=>page-1)
  updateNews()
}

//For next button
const handleNext = async()=>{
  setPage(page=>page+1)
  updateNews()
}

  return (
    <>
      <LoadingBar
        height={2}
        color="rgb(187 246 96)"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <h2 className="container-fluid bg-dark text-white d-flex justify-content-center align-items-center flex-column" style = {{height: "20vh"}}><span style={{color:"rgb(187 246 96)"}}>Top Headlines on {capitalizeFirstLetter(props.cat)}</span></h2>
      <div
        className="container d-flex justify-content-center align-items-center flex-column my-2"
        style={{ minHeight: "100vh" }}
      >
        {articles
          ? articles.map((element, index) => {
              return (
                <div
                  className=" container my-3 p-3"
                  style={{ width: "600px", boxShadow:"2px 2px 10px silver", borderRadius:"10px" }}
                  key={element.url}
                >
                  <span className="badge bg-dark my-2">{element.source.name}</span>
                  <h5 className="container my-1">{element.title}</h5>
                  <div className="d-flex justify-content-center align-items center">
                    <img
                      src={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://img.freepik.com/free-vector/realistic-news-studio-background_23-2149985600.jpg?w=1060&t=st=1685773285~exp=1685773885~hmac=45ca2974226e495e8240e29a3014d9becd1b6a1abb62c7a0b1169806efbe57bf"
                      }
                      alt=""
                      className="img-fluid"
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <p className="my-1">{element.content}</p>
                  <p className="card-text"><small className="text-muted">Published At: {new Date(element.publishedAt).toGMTString()}</small></p>
                  <a href={element.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">View more</a>
                </div>
              );
            })
          : <Spinner/>}
      </div>
      <div className="container d-flex justify-content-between my-3">
      <button type="button" disabled={page<=1} onClick={handlePrev} className="btn btn-dark">&larr; Previous</button>
      <button type="button" onClick={handleNext} className="btn btn-dark">Next &rarr;</button>
      </div>
    </>
  );
}
