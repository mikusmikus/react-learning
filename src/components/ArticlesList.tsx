import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { Article } from "../types/article";
import { delay } from "../helpers/delay";
import { ArticleForm } from "./ArticleForm";
import "../styles/components/articles-list.scss";
import { Link } from "react-router-dom";
import { Select } from "./Select";
import Modal from "./Modal";

// Pieprasījums uz serveri
// piehglabajam datus iekš state
// renderējam datus no state

const API_URL =
  process.env.NODE_ENV === "production"
    ? "http://localhost:3004/articles"
    : process.env.REACT_APP_LOCAL_SERVER!;

export const ArticlesList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewArticle, setIsNewArticle] = useState(false);
  const [editedArticle, setEditedArticle] = useState<null | Article>(null);

  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  const addNewArticle = async (article: Article) => {
    const newArticle = {
      ...article,
    };

    try {
      // post pieprasijums
      setIsLoading(true);
      await delay(1000);
      const { data } = await axios.post(API_URL, newArticle);
      console.log("data", data);

      setArticles([...articles, data]);
      setIsLoading(false);
      setIsNewArticle(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  };

  const deleteArticle = async (id?: string) => {
    if (!id) {
      return;
    }

    try {
      setIsLoading(true);
      await delay(1000);
      await axios.delete(`${API_URL}/${id}`);
      const newArticles = articles.filter((article) => article.id !== id);
      setArticles(newArticles);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  };

  const filtereArticles = articles.filter((article) => {
    if (selectedCategory === "all") {
      return true;
    }
    return article.category === selectedCategory;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const getOptions = (articles: Article[]): string[] => {
    let options: string[] = ["all"];
    articles.forEach((article) => {
      if (!options.includes(article.category)) {
        options.push(article.category);
      }
    });
    return options;
  };

  return (
    <>
      <div>
        {/* Pievienot filtru, lai varētu filtrēt pēc kategorijas */}
        {/* Parādam category button un uzspiežot uz kādu no tām tiek izfiltrēi articles */}

        <ArticleForm
          onCancel={() => {
            // setIsNewArticle(false);
          }}
          onSubmit={(body) => {}}
        />

        <Select
          label="Filter by category"
          options={getOptions(articles)}
          selectedValue={selectedCategory}
          onChange={(value) => {
            setSelectedCategory(value);
          }}
        />
        {filtereArticles.length > 0 ? (
          <ul className="article-list">
            {filtereArticles.map((article) => {
              return (
                <li key={article.id}>
                  <article className="article-card">
                    <Link to={`/articles/${article.id}`} title="Go to article">
                      <img
                        src="https://picsum.photos/200/300"
                        alt={article.title}
                      />
                    </Link>
                    <div className="article-content">
                      <div className="article-text">
                        <h3>{article.title}</h3>
                        <p>{article.category}</p>
                      </div>

                      <div className="article-buttons">
                        <Button
                          onButtonClick={() => {
                            deleteArticle(article.id);
                          }}
                        >
                          Delete
                        </Button>

                        <Button
                          onButtonClick={() => {
                            setEditedArticle(article);
                          }}
                        >
                          Edit Article
                        </Button>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        ) : (
          <div>No articles found by category:{selectedCategory}</div>
        )}
        {!isNewArticle && (
          <Button
            onButtonClick={() => {
              setIsNewArticle(true);
            }}
          >
            Add new Article
          </Button>
        )}
      </div>
      <Modal isOpen={isNewArticle || !!editedArticle} onClose={() => {}}>
        <>
          {isNewArticle && (
            <ArticleForm
              onCancel={() => {
                setIsNewArticle(false);
              }}
              onSubmit={(body) => {
                addNewArticle(body);
              }}
            />
          )}

          {editedArticle && (
            <ArticleForm
              onCancel={() => {
                setEditedArticle(null);
              }}
              onSubmit={async (body) => {
                try {
                  setIsLoading(true);
                  await delay(1000);
                  const { data } = await axios.put(
                    `${API_URL}/${body.id}`,
                    body
                  );
                  const newArticle = articles.map((article) => {
                    if (article.id === data.id) {
                      return data;
                    }
                    return article;
                  });
                  setArticles(newArticle);
                  setIsLoading(false);
                  setEditedArticle(null);
                } catch (error) {}
              }}
              initialValues={editedArticle}
            />
          )}
        </>
      </Modal>
    </>
  );
};
