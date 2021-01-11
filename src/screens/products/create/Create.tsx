import React from "react";
import { useNavigate } from "react-router-dom";
import { ProductForm } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../reducers/root.interface";
import { Product } from "../model/product.model";
import { PRODUCTS } from "../reducer";

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productsState = useSelector((state: RootState) => state.products);
  const { actionLoading, shouldRedirect } = productsState;

  if (shouldRedirect) {
    navigate("/admin/products");
  }

  const onSubmit = (dataToSubmit: Product) => {
    dispatch({
      type: PRODUCTS.CREATE_REQUEST,
      payload: { body: dataToSubmit },
    });
  };
  return (
    <>
      <ProductForm
        onSubmit={onSubmit}
        loading={actionLoading}
        title={"Create product"}
      />
    </>
  );
};
export default Create;
