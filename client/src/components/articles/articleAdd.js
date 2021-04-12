import React, {useState}from 'react';
//import axios from 'axios';
import axios, { post } from 'axios';
//import { PromiseProvider } from 'mongoose';

function ArticleAdd(props){
    const initialState = {title:'',content: ''}
    const [article, setArticle] = useState(initialState)

    function handleChange(event) {
        setArticle({...article,[event.target.name]:event.target.value})
    }
    function handleSubmit(event){
        event.preventDefault();
        if(!article.title || !article.content)
        return
            async function postArticle(){
                try{
                    axios.post('http://localhost:3001/api/articles/', article)
                    .then(function(res){
                       // const res=await post('/api/articles', article);
                        props.history.push(`/articles/${res.data._id}`);
                        
    

                    })
                    //const res=await post('/api/articles', article);
                    //props.history.push(`/articles/${res.data._id}`);

                }catch(error){
                    console.log('error', error);
                }
            }
             postArticle();
         }
         function handleCancel(){
             props.history.push("/articles");
         }
         return(
             <div>
                 <h1>Create Article</h1>
                 <hr/>
                 <form onSubmit={handleSubmit}>
                     <div className = "form-group">
                         <label>Title</label>
                         <input name ="title" type ="text" value={article.title}onChange={handleChange} className="form-control" />
                     </div>
                     <div className = "formgroup">
                         <label>content</label>
                         <textarea name ="content" rows="5" value={article.content} onChange={handleChange} className="form-control" />
                        </div>

                        <div className = "btn-group">
                          <input type ="submit" value ="Submit" className="btn btn-primary" />
                          <button type ="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
                     </div>
                 </form>
             </div>
         );
        }
        export default ArticleAdd;