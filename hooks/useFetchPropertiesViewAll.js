import { useInfiniteQuery } from "@tanstack/react-query";
import { GraphQLClient, gql } from "graphql-request";

const GRAPHQL_URL = "https://api.dreamprovider.in/graphql";

const useFetchPropertiesViewAll = ({ filters }) => {
  const graphQLClient = new GraphQLClient(GRAPHQL_URL, {
    headers: {
      Authorization: `Authorization: Bearer d0072a178bc47174896c19a2fa228a4e0f7d3a733485fbc6aff4e3e5c98200a4e27f37c8cac951991afeac01f9cc78848285d81acd1aabe474995a7a8feb96dfd8982963726c88b708777b12a93d8c9906863c76f39368c6958825e756d476589c30fec873c0fb8b970508b31a9fb4159a7b8732d90e3a53bc897cfdbfd8fa2f`,
    },
  });

  return useInfiniteQuery({
    queryKey: ["fetch-properties-viewall", filters],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await graphQLClient.request(
        gql`
          query properties(
            $page: Int!
            $location: String
            $property_type: String
            $gender: String
            $seater: String
            $city_id: ID
            $sort: [String]
          ) {
            properties(
              sort: $sort
              pagination: { page: $page, pageSize: 20 }
              filters: {
                location: { name: { eq: $location } }
                city: { id: { eq: $city_id } }
                property_types: { containsi: $property_type }
                genders: { name: { containsi: $gender } }
                seaters: { value: { containsi: $seater } }
              }
            ) {
              meta {
                pagination {
                  total
                  page
                  pageSize
                  pageCount
                }
              }
              data {
                id
                attributes {
                  ranking_id
                  name
                  property_types
                  description
                  verification_type
                  price
                  genders {
                    data { attributes { name } }
                  }
                  status
                  address
                  main_image { data { attributes { url previewUrl caption } } }
                  seaters { data { attributes { value } } }
                }
              }
            }
          }`,
        {
          page: pageParam,
          location: filters.location,
          property_type: filters.property_type,
          gender: filters.gender,
          seater: filters.seater,
          city_id: filters.city,
          sort: ["ranking_id:desc"],
        }
      );

      return {
        properties: data.properties.data,
        meta: data.properties.meta.pagination,
      };
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page === lastPage.meta.pageCount) return undefined;
      return lastPage.meta.page + 1;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};

export default useFetchPropertiesViewAll;
