import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import LoadingBar from 'react-top-loading-bar';

export default function News(props) {
  //Fetching data from news api
    const [articles, setarticles] = useState("")
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const [progress, setProgress] = useState(10);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?country=in&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
          );
          setProgress(60)
          setarticles(response.data.articles);
          setTotalResults(response.data.totalResults)
          document.title = "News Hub"
          setProgress(100)
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, [page,props.pageSize,props.apiKey]);
    
    const updateNews = async ()=> {
        setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${props.apiKey}page=${page}&pageSize=${props.pageSize}`; 
        let data = await fetch(url);
        setProgress(60);
        let parsedData = await data.json()
        setarticles(parsedData.articles)
        setProgress(100);
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

  //Using infinite scroll


  return (
    <>
    <LoadingBar
        height={2}
        color="rgb(187 246 96)"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    <div className="container d-flex justify-content-center align-items-center flex-column">
      <h2 className="my-4">
        <u>TOP HEADLINES</u>
      </h2>
      
      <div className="row" style={{minHeight:"100vh"}}>
        {articles? articles.map((element,index)=>{
            return(
                <div className=" my-4 col-md-3 my-3" key={element.url}>
                <NewsItem title={element.title} description={element.description} imageUrl = {element.urlToImage?element.urlToImage:"https://img.freepik.com/free-vector/realistic-news-studio-background_23-2149985600.jpg?w=1060&t=st=1685773285~exp=1685773885~hmac=45ca2974226e495e8240e29a3014d9becd1b6a1abb62c7a0b1169806efbe57bf"}
                Url = {element.url}
                author = {element.author}
                date = {element.publishedAt}
                source = {element.source.name} />
                </div>
            )
        }):<Spinner/>}
      </div>
      <div className="container d-flex justify-content-between my-3">
      <button type="button" disabled={page<=1} onClick={handlePrev} className="btn btn-dark">&larr; Previous</button>
      <button type="button" disabled={page+1 > Math.ceil(totalResults/props.pageSize)} onClick={handleNext} className="btn btn-dark">Next &rarr;</button>
      </div>
    </div>
    </>
  );
}
