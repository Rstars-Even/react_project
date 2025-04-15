import { db } from "./connect"

db.exec(`
    create table if not exists categories (
        id integer primary key autoincrement not null,
        name text not null,
        created_at text not null
    );
`)

db.exec(`
    create table if not exists contents (
        id integer primary key autoincrement not null,
        title text not null,
        content text not null,
        category_id integer,
        created_at text not null
    );
`)