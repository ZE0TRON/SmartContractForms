// TODO add foreign key
// TABLE CREATE QUERIES
export const CREATE_USER_TABLE_QUERY = `
  create table users (
  	user_id serial primary key,
    email varchar(30) unique not null,
    password varchar(100) not null,
    session_id varchar(70)
  );
`;
export const CREATE_INTEGRATION_TABLE_QUERY = `
  create table integrations (
    integration_id serial primary key,
    user_id int not null,
    contract_address varchar(42) not null,
    contract_abi text not null,
    contract_method varchar(20)  not null
  );
`;
export const CREATE_MATCHING_TABLE_QUERY = `
  create table matchings (
    matching_id serial primary key,
    integration_id int not null,
    form_field varchar(30) not null,
    contract_parameter varchar(20) not null
  );
`;

export const CREATE_FORM_TABLE_QUERY = `
  create table forms (
    form_id serial primary key,
    integration_id int not null,
    user_id int not null,
    page text not null
  );
`;

// DROP QUERIES
export const DROP_USERS_QUERY = `drop table if exists users;`;
export const DROP_INTEGRATIONS_QUERY = `drop table if exists integrations;`;
export const DROP_FORMS_QUERY = `drop table if exists forms;`;
export const DROP_MATCHINGS_QUERY = `drop table if exists matchings;`;

// SELECTION QUERIES
export const GET_ALL_USERS_QUERY = `
  select * from users;
`;
export const GET_ALL_FORMS_QUERY = `
  select * from forms;
`;
export const GET_ALL_INTEGRATIONS_QUERY = `
  select * from integrations;
`;

// QUERIES WITH PARAMETERS
export const GET_USER_BY_EMAIL_QUERY = `
  select * from users where email = $1;
`;
export const GET_USER_BY_SESSION_ID_QUERY = `
  select * from users where session_id = $1;
`;
export const GET_INTEGRATION_OF_USER_QUERY = `
  select * from integrations where user_id = $1;
`;
export const GET_FORMS_OF_USER_QUERY = `
  select * from forms where user_id = $1;
`;
export const GET_INTEGRATIONS_OF_FORM_QUERY = `
  select * from integrations where form_id = $1;
`;
export const GET_MATCHINGS_OF_INTEGRATION_QUERY = `
  select * from matchings where integration_id = $1;
`;
export const GET_INTEGRATIONS_BY_ID_QUERY = `
  select * from integrations where integration_id = $1; 
`;
export const GET_MATCHINGS_BY_ID_QUERY = `
  select * from matchings where matching_id = $1; 
`;
// INSERTION QUERIES
// Parameters : email,password
export const CREATE_USER_QUERY = `
  insert into users (email,password,session_id)
  values ($1, $2, $3)
  returning user_id;
`;
export const CREATE_INTEGRATION_QUERY = `
  insert into integrations (user_id,contract_address,contract_abi,contract_method)
  values ($1, $2, $3, $4)
  returning integration_id;
`;
export const CREATE_MATCHING_QUERY = `
  insert into matchings (integration_id,form_field,contract_parameter)
  values ($1, $2, $3)
  returning matching_id;
`;
export const CREATE_FORM_QUERY = `
  insert into forms (integration_id,user_id,page)
  values ($1, $2, $3)
  returning form_id;
`;
// UPDATE QUERIES
export const UPDATE_SESSION_ID_QUERY = `
 update users set session_id = $2 where email = $1;
`;
