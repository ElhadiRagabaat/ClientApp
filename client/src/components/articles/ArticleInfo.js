import React, {useState, useEffect}from 'react';
import axios from 'axios';
import {Link}from 'react-router-dom';

function ArticleInfo(props) {
    const [article, setArticle] = useState({})

    useEffect(function() { 
        async function getArticle() {
            try {
                  
                const response = await axios.get(`http://localhost:3001/api/articles/${props.match.params._id}`);
                console.log(response.data)
                setArticle(response.data);

            }catch(error){
                console.log('error', error)
            }
        }
        getArticle();
    },[props]);
    async function handleDelete(){
        try {
            await axios.delete(`http://localhost:3001/api/articles/${props.match.params._id}`);
            props.history.push("/articles");
        }catch(error){
            console.log('error', error);
        }
        }
    
    return(
        <div>
            <h2>{article.title}</h2> 
            <small> {article._id}</small>
            <p>{article.content}</p>
            <div className = "btn-group">
                <Link to ={`/articles/${article._id}/edit`} className ="btn-primary m-2">Edit</Link>
                <botton onClick={handleDelete} className ="btn btn-danger m-2">Delete</botton>
                <Link to="/artcles" className ="btn btn-secondary m-2">Close</Link>
                </div>
                <hr />
        </div>
    );
};

export default ArticleInfo;