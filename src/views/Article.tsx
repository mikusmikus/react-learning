import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Article as ArticleType } from "../types/article";
import axios from "axios";
import { delay } from "../helpers/delay";
import { SERVER_URL } from "../constants/url";


// Pielikt ekstra datus datubazei 
// Formā pielikt link field uz image
// Nostilot single article page

const useFetchArticle = (articleId: string) => {
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState<null | ArticleType>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await delay(1000);
        const { data } = await axios.get(`${SERVER_URL}${articleId}`);
        setArticle(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [articleId]);

  return { isLoading: loading, article };
};

export const Article = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { isLoading, article } = useFetchArticle(articleId || "");
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <article>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Go back
      </button>

      <h1>{article.title}</h1>

      <p>{article.description}</p>

      <p>{article.category}</p>
    </article>
  );
};
