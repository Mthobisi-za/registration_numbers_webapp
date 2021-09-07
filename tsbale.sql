CREATE TABLE reg_tows(id serial primary key,towns text not null,strTown text not null);
CREATE TABLE reg_numbers(regnumber text not null, refId int, foreign key (refId) references reg_tows(id));