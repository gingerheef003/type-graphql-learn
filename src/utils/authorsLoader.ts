import { In } from "typeorm";
import { AuthorBook } from "../entities/AuthorBook";
import { Author } from "../entities/Author";
import DataLoader from "dataloader";

const batchAuthors = async (bookIds: readonly number[]) => {
  const authorBooks = await AuthorBook.find({
    join: {
      alias: "authorBook",
      innerJoinAndSelect: {
        author: "authorBook.author",
      },
    },
    where: {
      bookId: In(bookIds),
    },
  });

  const bookIdToAuthors: { [key: number]: Author[] } = {};

  authorBooks.forEach((ab) => {
    if (ab.bookId in bookIdToAuthors) {
      bookIdToAuthors[ab.bookId].push((ab as any).__author__);
    } else {
      bookIdToAuthors[ab.bookId] = [(ab as any).__author__];
    }
  });

  return bookIds.map(bookId => bookIdToAuthors[bookId])
};

export const createAuthorsLoader = () => new DataLoader(batchAuthors);
