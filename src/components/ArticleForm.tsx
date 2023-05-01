import React, { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { Article } from "../types/article";
import "../styles/components/article-form.scss";

type ArticleFormProps = {
  onSubmit: (body: Article) => void;
  onCancel: () => void;
  initialValues?: Article;
};

export const ArticleForm = ({
  onSubmit,
  onCancel,
  initialValues,
}: ArticleFormProps) => {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [description, setDescription] = useState(
    initialValues?.description || ""
  );
  const [category, setCategory] = useState(
    initialValues?.category || "Category 1"
  );
  const input = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    input.current && input.current.focus();
  }, []);

  return (
    <form
      className="article-form"
      onSubmit={(e) => {
        e.preventDefault();
        const body = {
          id: initialValues?.id,
          title,
          description,
          category,
        };

        onSubmit(body);
      }}
    >
      <label htmlFor="article-title">Article title</label>
      <input
        ref={input}
        type="text"
        id="article-title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <label htmlFor="article-description">Article description</label>
      <textarea
        id="article-description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />

      <label htmlFor="article-category">Article category</label>
      <select
        id="article-category"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        value={category}
      >
        <option value="Category 1">Category 1</option>
        <option value="Category 2">Category 2</option>
        <option value="Category 3">Category 3</option>
        <option value="Category 4">Category 4</option>
      </select>

      <Button type="submit">Save</Button>

      <Button variant="secondary" onButtonClick={onCancel}>
        Cancel
      </Button>
    </form>
  );
};
