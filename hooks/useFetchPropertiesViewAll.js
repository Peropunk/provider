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
      // First, get the first page to know total pages
      const firstPageData = await graphQLClient.request(
        gql`
          query properties(
            $page: Int!
            $location: String
            $property_type: String
            $gender: String
            $seater: String
            $city_id: ID
          ) {
            properties(
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
                  viewsCount { count }
                  tag_value
                  tag_color
                  saved
                  name
                  property_types
                  description
                  verification_type
                  price
                  genders {
                    data { attributes { name } }
                  }
                  approved
                  full
                  owner_number
                  property_chips_banner {
                    data {
                      attributes {
                        type
                        text_value
                        image_banner { data { attributes { url } } }
                      }
                    }
                  }
                  address
                  latlng
                  images { data { attributes { url previewUrl caption } } }
                  main_image { data { attributes { url previewUrl caption } } }
                  city { data { attributes { name } } }
                  location { data { attributes { name } } }
                  facilities {
                    data {
                      attributes {
                        value
                        image { data { attributes { url caption } } }
                      }
                    }
                  }
                  seaters { data { attributes { value } } }
                }
              }
            }
          }`,
        {
          page: 1,
          location: filters.location,
          property_type: filters.property_type,
          gender: filters.gender,
          seater: filters.seater,
          city_id: filters.city,
        }
      );

      const totalPages = firstPageData.properties.meta.pagination.pageCount;
      
      // If there's only one page, return the sorted first page
      if (totalPages === 1) {
        const sorted = [...firstPageData.properties.data].sort((a, b) => {
          const aRank = a.attributes.ranking_id || "0";
          const bRank = b.attributes.ranking_id || "0";
          return bRank.localeCompare(aRank, undefined, { numeric: true });
        });

        return {
          properties: sorted,
          meta: firstPageData.properties.meta.pagination,
        };
      }

      // Fetch all remaining pages
      const allPagesPromises = [];
      
      // Add first page data
      let allProperties = [...firstPageData.properties.data];
      
      // Fetch remaining pages (starting from page 2)
      for (let page = 2; page <= totalPages; page++) {
        allPagesPromises.push(
          graphQLClient.request(
            gql`
              query properties(
                $page: Int!
                $location: String
                $property_type: String
                $gender: String
                $seater: String
                $city_id: ID
              ) {
                properties(
                  pagination: { page: $page, pageSize: 20 }
                  filters: {
                    location: { name: { eq: $location } }
                    city: { id: { eq: $city_id } }
                    property_types: { containsi: $property_type }
                    genders: { name: { containsi: $gender } }
                    seaters: { value: { containsi: $seater } }
                  }
                ) {
                  data {
                    id
                    attributes {
                      ranking_id
                      viewsCount { count }
                      tag_value
                      tag_color
                      saved
                      name
                      property_types
                      description
                      verification_type
                      price
                      genders {
                        data { attributes { name } }
                      }
                      approved
                      full
                      owner_number
                      property_chips_banner {
                        data {
                          attributes {
                            type
                            text_value
                            image_banner { data { attributes { url } } }
                          }
                        }
                      }
                      address
                      latlng
                      images { data { attributes { url previewUrl caption } } }
                      main_image { data { attributes { url previewUrl caption } } }
                      city { data { attributes { name } } }
                      location { data { attributes { name } } }
                      facilities {
                        data {
                          attributes {
                            value
                            image { data { attributes { url caption } } }
                          }
                        }
                      }
                      seaters { data { attributes { value } } }
                    }
                  }
                }
              }`,
            {
              page,
              location: filters.location,
              property_type: filters.property_type,
              gender: filters.gender,
              seater: filters.seater,
              city_id: filters.city,
            }
          )
        );
      }

      // Wait for all pages to be fetched
      const remainingPagesData = await Promise.all(allPagesPromises);
      
      // Combine all properties from all pages
      remainingPagesData.forEach(pageData => {
        allProperties = [...allProperties, ...pageData.properties.data];
      });

      // Sort ALL properties by ranking_id (numeric-aware, descending)
      const globalSorted = allProperties.sort((a, b) => {
        const aRank = a.attributes.ranking_id || "0";
        const bRank = b.attributes.ranking_id || "0";
        return bRank.localeCompare(aRank, undefined, { numeric: true });
      });

      // Return paginated results from the globally sorted array
      const startIndex = (pageParam - 1) * 20;
      const endIndex = startIndex + 20;
      const paginatedProperties = globalSorted.slice(startIndex, endIndex);

      return {
        properties: paginatedProperties,
        meta: firstPageData.properties.meta.pagination,
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
