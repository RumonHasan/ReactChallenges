import { gql, useQuery } from '@apollo/client';

// basic graphql query for starwards film
export const GET_LOCATIONS = gql`
  query Query {
    allFilms {
      films {
        title
        director
        releaseDate
        speciesConnection {
          species {
            name
            classification
            homeworld {
              name
            }
          }
        }
      }
    }
  }
`;
const Database = () => {
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  console.log(data);
  if (error) {
    return (
      <>
        <span>Data is not coming </span>
      </>
    );
  }
  if (loading) {
    return (
      <div>
        <span>Data is being loaded</span>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>
        Basic Apollo GraphQL App: Movie name fetched using a graph ql client
      </span>
      <div>
        {data?.allFilms.films.map((movie, index) => {
          return (
            <div
              style={{ border: '2px solid gray', margin: 10, padding: 10 }}
              index={index}
            >
              <span>{movie.title}:</span>
              <span>{movie.director}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Database;
