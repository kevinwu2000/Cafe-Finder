import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
mutation CreateUser($name: String!, $account: String!, $password: String!) {
    createUser(name: $name, account: $account, password: $password) {
        id
        name
        account
        password
    }
}
`;
export const CREATE_RESTAURANT_MUTATION = gql`
mutation CreateRestaurant($name: String!, $information: [InputInformation]!){
    createRestaurant(name: $name, information: $information){
        id
        name
        comments{
            name
            person_id
            body
            star
            time
        }
        information{
            name
            body
        }
        sprate{
            name
            average_star
            people{
              person_name
              person_id
              star
            }
        }
        spTFrate{
            name
            Tnum{
              person_name
              person_id
            }
            Fnum{
              person_name
              person_id
            }
        }
        graph
    }
}
`;
export const CREATE_COMMENT_MUTATION = gql`
mutation createComment(
    $name: String!,
    $userid: ID!,
    $restaurantid: ID!,
    $body: String!,
    $star: Int!,
    $time: String!
){
    createComment(
        name: $name,
        userid: $userid,
        restaurantid: $restaurantid,
        body: $body,
        star: $star,
        time: $time
    ){
        name
        person_id
        body
        star
        time
    }
}
`;
export const CREATE_RATE_MUTATION = gql`
mutation CreateRate(
    $name: String!,
    $userid: ID!,
    $restaurantid: ID!,
    $ratewhat: String!,
    $star: Int!
){
    createRate(
        name: $name,
        userid: $userid,
        restaurantid: $restaurantid,
        ratewhat: $ratewhat,
        star: $star
    ){
        name
        average_star
        people{
          person_name
          person_id
          star
        }
    }
}
`;

export const CREATE_TF_RATE_MUTATION = gql`
mutation CreateTFRate(
    $name: String!,
    $userid: ID!,
    $restaurantid: ID!,
    $ratewhat: String!,
    $TF: Boolean!
){
    createTFRate(
        name: $name,
        userid: $userid,
        restaurantid: $restaurantid,
        ratewhat: $ratewhat,
        TF: $TF
    ){
        name
        Tnum{
            person_name
            person_id
        }
        Fnum{
            person_name
            person_id
        }
    }
}
`;
export const CREATE_GRAPH_MUTATION = gql`
mutation CreateGraph(
    $name: String!,
    $userid: ID!,
    $restaurantid: ID!,
    $graph: [[String!]]
){
    createGraph(
        name: $name,
        userid: $userid,
        restaurantid: $restaurantid,
        graph: $graph
    )
}
`;
