export async function getCategory(title) {
  const response = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query getCategory($input: CategoryInput){
          category(input: $input){
            name
            products{
              id
              name
              inStock
              gallery
              prices{
                currency{
                  symbol
                }
                amount
              }
              attributes{
                name
                items{
                  id
                  displayValue
                }
              }
              brand
            }
          }
        }`,
      variables: {
        input: {
          title: title,
        },
      },
    }),
  });
  if (response.ok) {
    const { data } = await response.json();
    return data;
  } else {
    throw new Error(response);
  }
}
export async function getProduct(id) {
  const response = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query getProduct($id: String!){
            product(id: $id){
              id
              name
              inStock
              gallery
              attributes{
                name
                items{
                  id
                  displayValue
                }
              }
              prices{
                currency{
                  symbol
                }
                amount
              }
              description
              brand
            }
          }`,
      variables: {
        id: id,
      },
    }),
  });
  if (response.ok) {
    const { data } = await response.json();
    return data;
  } else {
    throw new Error(response);
  }
}
export async function getCurrencies() {
  const response = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query getCurrencies{
        currencies{
          label
          symbol
        }
      }`,
    }),
  });
  if (response.ok) {
    const { data } = await response.json();
    return data;
  } else {
    throw new Error(response);
  }
}

export async function getCategories() {
  const response = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query getCategories{
        categories{
          name
        }
      }`,
    }),
  });
  if (response.ok) {
    const { data } = await response.json();
    return data;
  } else {
    throw new Error(response);
  }
}