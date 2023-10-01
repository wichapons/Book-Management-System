let books = [];

const addBook = () => {
    //get book infomation
  const bookTitle = prompt('Enter a book title or press "cancel" to stop.');
  const bookAuthor = prompt("Enter the book author.");
  const yearPublished = prompt("Enter the year the book was published.");
  const price = prompt("Enter the price of the book.");

  //check invalid input
  if (
    bookTitle === null ||
    bookAuthor === null ||
    yearPublished === null ||
    price === null
  ) {
    return;
  }

  const book = {
    title: bookTitle,
    bookAuthor: bookAuthor,
    yearPublished: yearPublished,
    price: price,
  };
    //add book to array
  books.push(book);
  //show all book infomation
  alert(
    `Book added successfully!\nBook title: ${book.title}\nBook author: ${book.bookAuthor}\nYear published: ${book.yearPublished}\nPrice: ${book.price}`
  );
  return;
};

const getBookByTitle = () => {
  let bookTitle = prompt("Enter the book title you want to search for.");
  if (bookTitle === null) {
    alert("Book title cannot be empty!");
    return;
  }
  //convert to lowercase
  bookTitle = bookTitle.toLowerCase();
  //find book
  const book = books.find((book) => book.title.toLowerCase() === bookTitle);
    if (book === undefined) {
        alert("Book not found!");
    }else{
        alert(
            `Book found!\nBook title: ${book.title}\nBook author: ${book.bookAuthor}\nYear published: ${book.yearPublished}\nPrice: ${book.price}`
          );
    }
  return;
};

const editBook = () => {
    let bookTitle = prompt("Enter the book title you want to edit.");
    if (bookTitle === null) {
        alert("Book title cannot be empty!");
        return;
    }
    bookTitle = bookTitle.toLowerCase();
    const book = books.find((book) => book.title.toLowerCase() === bookTitle);
    //check book
    if (book === undefined) {
        alert("Book not found!");
    //edit book
    } else {
        const newTitle = prompt("Enter the new title.");
        const newAuthor = prompt("Enter the new author.");
        const newYearPublished = prompt("Enter the new year published.");
        const newPrice = prompt("Enter the new price.");
        book.title = newTitle;
        book.bookAuthor = newAuthor;
        book.yearPublished = newYearPublished;
        book.price = newPrice;
        alert("Book edited successfully!");
    }
    return;
};

const deleteBook = (title) => {
  books = books.filter((book) => book.title !== title);
  alert("Book deleted successfully!");
  return;
};

//Main menu
while (true) {
  const option = prompt(
    "Enter your option: 1 - Add a book, 2 - Edit a book, 3 - Delete a book, 4 - Search a books, 5 - Quit"
  );
  switch (option) {
    case "1":
      addBook();
      break;
    case "2":
        editBook();
        break;
    case "3":
        deleteBook();
        break;
    case "4":
        getBookByTitle();
        break;
    case "5":
        alert("Goodbye!");
        break;
  }
}
