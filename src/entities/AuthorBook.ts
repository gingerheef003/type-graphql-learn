import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Book } from "./Book";
import { Author } from "./Author";

@Entity()
export class AuthorBook extends BaseEntity {
  @PrimaryColumn()
  authorId!: number;

  @PrimaryColumn()
  bookId!: number;

  @ManyToOne(() => Author, (author) => author.bookConnection)
  @JoinColumn({ name: "authorId" })
  author!: Promise<Author>;

  @ManyToOne(() => Book, (book) => book.authorConnection)
  @JoinColumn({ name: "bookId" })
  book!: Promise<Book>;
}
