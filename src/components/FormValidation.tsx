import React, { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import "../styles/components/article-form.scss";

export const FormValidation = () => {
  const [form, setForm] = useState({
    email: {
      value: "",
      error: "",
    },
    password: {
      value: "",
      error: "",
    },
  });

  const changeInput = (value: string, key: string) => {
    setForm({
      ...form,
      [key]: {
        ...form[key as keyof typeof form],
        value,
      },
    });
  };

  const isEmpty = (value: string) => {
    return value === "";
  };

  const isValidEmail = (value: string) => {
    return value.includes("@");
  };

  const haAtleast8characters = (value: string) => {
    return value.length >= 8;
  };

  return (
    <form
      noValidate
      className="article-form"
      onSubmit={(e) => {
        e.preventDefault();
        // start validate
        const email = form.email.value;
        const password = form.password.value;

        let emailError = "";
        let passwordError = "";
        emailError = isEmpty(email) ? "Email is required" : "";

        if (!emailError) {
          emailError = isValidEmail(email)
            ? ""
            : "Email is should include @ sing";
        }

        if (!emailError) {
          const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            email
          );

          emailError = isValid ? "" : "Email is not valid";
        }

        passwordError = isEmpty(password) ? "Password is required" : "";

        if (!passwordError) {
          passwordError = haAtleast8characters(password)
            ? ""
            : "Password must at be 8 characters long";
        }

        setForm({
          ...form,
          email: {
            ...form.email,
            error: emailError,
          },
          password: {
            ...form.password,
            error: passwordError,
          },
        });

        if (!emailError && !passwordError) {
          alert("Form is valid");
          // handle submit
        }

        return;
      }}
    >
      <div className="mb-3">
        <div>Email address</div>
        <label htmlFor="floatingInput">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            value={form.email.value}
            onChange={(e) => {
              changeInput(e.target.value, "email");
            }}
            placeholder="name@example.com"
          />
        </label>
        {form.email.error && <div>{form.email.error}</div>}
      </div>
      <div className="mb-3">
        <div>Password address</div>
        <label htmlFor="password">
          <input
            type="password"
            className="form-control"
            id="password"
            value={form.password.value}
            onChange={(e) => {
              changeInput(e.target.value, "password");
            }}
          />
        </label>
        {form.password.error && <div>{form.password.error}</div>}
      </div>

      <Button type="submit">Save</Button>
    </form>
  );
};
