import { useQuery } from "@tanstack/react-query";
import { GraphQLClient, gql } from "graphql-request";

const GRAPHQL_URL = "https://api.dreamprovider.in/graphql";
const graphQLClient = new GraphQLClient(GRAPHQL_URL, {});

export function useFetchColleges() {
  return useQuery({
    queryKey: ["fetch-colleges"],
    queryFn: async () => {
      const data = await graphQLClient.request(
        gql`
          query {
            collages(pagination: { limit: 100 }) {
              data {
                id
                attributes {
                  name
                  slug
                  locationName
                  description
                  videoLink
                  year
                  ratings
                  area
                  grade
                  hostelArea
                  courses
                  ranking
                  imgLink
                  tag
                  published
                  companies
                  mapLink
                  placements
                  FeeMatrix
                  gallery
                  faqs
                  reviews
                  banner {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                  # Add other relation fields if needed like city or location relation
                }
              }
            }
          }
        `
      );
      return data;
    },
    staleTime: 1000 * 60 * 60, // Data is fresh for 1 hour (caching)
    cacheTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours
  });
}
