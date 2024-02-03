import { gql } from '@apollo/client';

export const LOG_IN_QUERY = gql`
query LogInQuery($account: String!, $password: String!){
    LogInQuery(account: $account, password: $password){
        id
        name
        account
        password
    }
}
`;

export const SEARCH_RESTAURANT_BY_NAME_QUERY = gql`
query SearchRestaurantByName($name: String!){
    SearchRestaurantByName(name: $name){
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
export const SEARCH_RESTAURANT_BY_NAME_QUERY_SHORT = gql`
query SearchRestaurantByName($name: String!){
    SearchRestaurantByName(name: $name){
        id
        name
    }
}
`;
export const GET_RESTAURANT_BY_ID_QUERY = gql`
query GetRestaurantById($id: ID!){
    GetRestaurantById(id: $id){
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