// import React from 'react'
import React, { useEffect, useState, } from 'react'
import { Table } from "flowbite-react";
import { Link } from 'react-router-dom'
const MangeBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/all-books").then(res => res.json()).then(data => setAllBooks(data));
  },[])

  const handleDelete = (id) =>{
    console.log(id);
    fetch(`http://localhost:5000/book/${id}`, {
      method: "DELETE",
    }).then(res => res.json()).then(data => {
      alert("Book is deleted sucessfully")
    setAllBooks(data);
    }
    )
    
  }




return (
  <div className="relative">
    <div className="absolute left-0 top-0 -z-10 h-full w-full rounded-lg drop-shadow-md bg-white dark:bg-black lg:w-[1105px]"></div>
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Manage Your Books</h2>

      <Table className="bg-white dark:bg-black lg:w-[1105px]">
        <Table.Head>
          <Table.HeadCell>No. Books</Table.HeadCell>
          <Table.HeadCell>Book Name</Table.HeadCell>
          <Table.HeadCell>Author Name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            <span>Edit</span>
          </Table.HeadCell>
        </Table.Head>

        {allBooks.map((book, index) => (
          <Table.Body className="divide-y" key={book._id}>
            <Table.Row className="bg-white dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index + 1}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {book.bookTitle}
              </Table.Cell>
              <Table.Cell>{book.authorName}</Table.Cell>
              <Table.Cell>{book.category}</Table.Cell>
              <Table.Cell>$20</Table.Cell>
              <Table.Cell>
                <Link
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  to={`/admin/dashboard/edit-books/${book._id}`}
                >
                  Edit
                </Link>
                <button onClick={() => handleDelete(book._id)} className="bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600 ml-2">
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
    </div>
  </div>
)
}

export default MangeBooks