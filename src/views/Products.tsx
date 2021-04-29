import * as React from "react";
import { ChangeEvent, useState } from "react";

import { useMutation, useQuery } from "@apollo/client";

import { useGetProductsQuery } from "generated/graphql";

import gql from "graphql-tag";
import { myReactiveVariable } from "state/apolloClient";

const CREATE_PRODUCT = gql`
  mutation AddProduct($name: String!, $productID: Float!) {
    createProduct(record: { name: $name, productID: $productID }) {
      record {
        _id
        name
        productID
        exampleVar @client
      }
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($name: String!, $id: MongoID!) {
    updateProduct(record: { name: $name, _id: $id }) {
      record {
        _id
        name
        productID
        exampleVar @client
      }
    }
  }
`;

export const GET_REACTIVE_VARIABLE = gql`
  query getReactiveVariable {
    myReactiveVariable @client
  }
`;

function Products(): JSX.Element {
  const { loading, error, data } = useGetProductsQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      {data?.viewer?.productList?.map((product) => (
        <Product key={product?.name} product={product} />
      ))}
    </>
  );
}

function Product(props: any): JSX.Element {
  const { product } = props;

  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const [name, setName] = useState(product.name);

  const save = (e: any): void => {
    e.preventDefault();
    updateProduct({ variables: { id: product._id, name } });
  };

  return (
    <p>
      {product.name} <input name="name" value={name} onChange={(e): void => setName(e.target.value)} />{" "}
      <button onClick={save}>Save</button>- ex: {product.exampleVar}
    </p>
  );
}

function View(): JSX.Element {
  const { data } = useQuery(GET_REACTIVE_VARIABLE);

  const [createProduct] = useMutation(CREATE_PRODUCT, {
    refetchQueries: ["GetProducts"],
  });

  const [form, setForm] = useState({
    name: "",
    productID: 1234567811231,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.type === "number" ? e.target.valueAsNumber : e.target.value;
    setForm({
      ...form,
      [e.target.name]: value,
    });
  };

  const submit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    createProduct({ variables: form });
    setForm({
      ...form,
      name: "",
    });
  };

  const varChange = (e: ChangeEvent<HTMLInputElement>): void => {
    myReactiveVariable(e.target.value);
  };

  const reactiveVariable = data ? data.myReactiveVariable : "";

  return (
    <div>
      GQL Reactive variable <input type="text" name="exampleVar" value={reactiveVariable} onChange={varChange} />
      <p>---</p>
      <div>
        Name: <input name="name" value={form.name} onChange={handleChange} />
      </div>
      <div>
        ProductID: <input type="number" name="productID" value={form.productID} onChange={handleChange} />
      </div>
      <div>
        <button onClick={submit}>Submit</button>
      </div>
      <p>---</p>
      <Products />
    </div>
  );
}

export default View;
