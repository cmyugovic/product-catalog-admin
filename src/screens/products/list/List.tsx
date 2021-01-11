import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DynamicList, SearchBar } from "../../../components";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {
  Button,
  IconButton,
  colors,
  ButtonGroup,
  Tooltip,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Product } from "../model/product.model";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../reducers/root.interface";
import moment from "moment";
import { PRODUCTS } from "../reducer";

const useStyles = makeStyles(() => ({
  root: {},
  deleteButton: { color: colors.red[600] },
  editButton: { color: colors.yellow[800] },
}));

const ProductList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState<Product | null>(null);
  const productsState = useSelector((state: RootState) => state.products);
  const { initialLoading, actionLoading, list } = productsState;

  const searchProducts = (filterValue: string, filterField: string) => {
    dispatch({
      type: PRODUCTS.GET_LIST_REQUEST,
      payload: { filterField, filterValue },
    });
  };

  useEffect(() => {
    dispatch({
      type: PRODUCTS.GET_LIST_REQUEST,
      payload: {},
    });
  }, [dispatch]);

  useEffect(() => {
    if (selected) {
      Swal.fire({
        title: "Are you sure?",
        text: `You won't be able to revert this!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.value) {
          Swal.showLoading();
          dispatch({
            type: PRODUCTS.DELETE_REQUEST,
            payload: { productId: selected._id },
          });
        }
        setSelected(null);
      });
    }
  }, [selected, dispatch]);

  return (
    <div className={classes.root}>
      <SearchBar
        search={searchProducts}
        fields={[
          { label: "Brand", value: "brand" },
          { label: "ID", value: "_id" },
          { label: "Description", value: "description" },
        ]}
      />
      <DynamicList
        loading={initialLoading}
        actions={
          <Button
            component={Link}
            to={"/admin/products/create"}
            variant='contained'
            color='primary'
            size='large'
            startIcon={<AddCircleIcon />}
          >
            {"create"}
          </Button>
        }
        objectList={list}
        columns={[
          {
            label: "Name",
            renderFn: (e: Product) => e.name,
          },
          {
            label: "Description",
            renderFn: (e: Product) => e.description,
          },
          {
            label: "Brand",
            renderFn: (e: Product) => e.brand,
          },
          {
            label: "Price",
            renderFn: (e: Product) => `$${e.price}`,
          },
          {
            label: "Created at",
            renderFn: (e: Product) => moment(e.createdAt).format("DD/MM/YYYY"),
          },
          {
            label: "Updated at",
            renderFn: (e: Product) => moment(e.updatedAt).format("DD/MM/YYYY"),
          },
          {
            label: "actions",
            renderFn: (e: any) => (
              <ButtonGroup>
                <Tooltip title={"update"}>
                  <IconButton
                    className={classes.editButton}
                    onClick={() => navigate(`/admin/products/${e._id}/update`)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={"delete"}>
                  <IconButton
                    className={classes.deleteButton}
                    onClick={() => setSelected(e)}
                  >
                    {actionLoading ? <CircularProgress /> : <DeleteIcon />}
                  </IconButton>
                </Tooltip>
              </ButtonGroup>
            ),
          },
        ]}
      />
    </div>
  );
};

export default ProductList;
