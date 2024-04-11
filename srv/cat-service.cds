using my.bookshop as my from '../db/data-model';

service CatalogService {
    entity Employees as projection on my.Employees;
     entity Departments as projection on my.Departments;
}
