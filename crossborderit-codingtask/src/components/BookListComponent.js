import React, { useState, useEffect } from "react";
import "./BookListComponent.scss";

function BookListComponent() {
  const [authors, setAuthors] = useState([]);
  const [titles, setTitles] = useState(null);
  useEffect(() => {
    fetch(
      `https://reststop.randomhouse.com/resources/authors?firstName=Joanne`,
      {
        headers: {
          accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then(
        (result) => {
          setAuthors(result.author);
          // console.log("result: ", result.author);
          // const authors = result.author;
          // console.log("authors: ", authors);

          ///loopa ut alla id'n m. for each: console.log(author.authorid)
          const ids = [];
          result.author.forEach((author) => ids.push(author.authorid));
          console.log("ID's :", ids);

          // const filteredIds = ids.filter((res) => res.status === 200);

          ids.forEach((id) =>
            fetch(`https://reststop.randomhouse.com/resources/works/${id}`, {
              headers: {
                accept: "application/json",
              },
            })
              // .then((response) => response.status === 200)
              .then((response) => response.json())
              .then(
                (result) => {
                  setTitles(result.titleshort);
                  console.log("result2: ", result);
                },
                (error) => {
                  console.error(error);
                }
              )
          );
        },
        (error) => {
          console.error(error);
        }
      );
  }, []);
  // console.log("fetch körs på TestApiFetching");

  return (
    <div>
      {authors.map((author, id) => (
        <h5 key={id}>
          Name: {author.authorfirst} {author.authorlast}
          Title:
          {/* {titles.map((title, id ) => (
          <h5 key={id}> {title}</h5>
          ))} */}
        </h5>
      ))}
    </div>
  );
}

export default BookListComponent;
