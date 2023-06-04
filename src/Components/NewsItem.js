import React from 'react'

export default function NewsItem(props) {
  const {title, description,imageUrl,Url,date,source} =props;
  return (
    <div className="card" style={{width: "18rem"}}>
      <img src={imageUrl} className="card-img-top" alt="..."/>
      <span className="badge bg-dark my-2">{source}</span>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text"><small className="text-muted">Published: {new Date(date).toGMTString()}</small></p>
        <a href={Url} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">View more</a>
      </div>
    </div>
  )
}
