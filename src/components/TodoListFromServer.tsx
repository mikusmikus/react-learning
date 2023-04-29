import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";

// Pieprasījums uz serveri
// piehglabajam datus iekš state
// renderējam datus no state

type Article = {
  title: string;
  id: string;
  description: string;
};

const delay = (ms: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
};

const API_URL = "http://localhost:3004/articles";

export const TodoListFromServer = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // GET
    // POST
    // DELETE
    // PUT

    // const fetchData = () => {
    //   fetch(API_URL, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((articles) => {
    //       setArticles(articles);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // };

    // fetchData();

    const fetchData2 = async () => {
      try {
        setIsLoading(true);
        await delay(1000);
        const data = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const articles = await data.json();
        setArticles(articles);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("error", error);
      }
    };

    fetchData2();
  }, []);

  const addArticle = async () => {
    const newArticle = {
      title: `New article ${count}`,
      description: `New article description ${count}`,
    };

    try {
      // post pieprasijums
      setIsLoading(true);
      await delay(1000);
      // const response = await fetch(API_URL, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(newArticle),
      // });

      // const article = await response.json();

      const { data } = await axios.post(API_URL, newArticle);
      console.log("data", data);

      setArticles([...articles, data]);
      setIsLoading(false);
      setCount(count + 1);
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  };

  // Izdzēst article
  // Izveidot formu, no kuras var paņemt datus, lai pievienotu jauno article.
  // Edit opciju.
  // Axios  npm i axios
  // Nostilojam
  // Pievienojam loading

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Button onButtonClick={addArticle}>Add new Article</Button>
      {articles.length > 0
        ? articles.map((article) => {
            return (
              <div key={article.id}>
                <h3>{article.title}</h3>
                {/* <p>{article.description}</p> */}
              </div>
            );
          })
        : null}
    </div>
  );
};
