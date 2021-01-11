import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductForm } from "../components";
import { Product } from "../model/product.model";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../reducers/root.interface";
import { PRODUCTS } from "../reducer/product.actions";

const Update = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productsState = useSelector((state: RootState) => state.products);
  const {
    initialLoading,
    selected,
    actionLoading,
    shouldRedirect,
  } = productsState;

  if (shouldRedirect) {
    navigate("/admin/products");
  }

  useEffect(() => {
    dispatch({
      type: PRODUCTS.GET_REQUEST,
      payload: { productId },
    });
  }, [dispatch, productId]);

  const onSubmit = (dataToSubmit: Product) => {
    dispatch({
      type: PRODUCTS.UPDATE_REQUEST,
      payload: { body: dataToSubmit, productId },
    });
  };

  if (initialLoading) {
    return <></>;
  }
  return (
    <>
      <ProductForm
        onSubmit={onSubmit}
        loading={actionLoading}
        title={"Update product"}
        defaultValues={selected}
      />
    </>
  );
};
export default Update;
