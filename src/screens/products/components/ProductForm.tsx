import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Card,
  CardHeader,
  CardContent,
  Grid,
  CardActions,
  CircularProgress,
} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
    },
    wrapper: {
      margin: theme.spacing(1),
      position: "relative",
    },
    buttonProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
    grid: {
      width: "100%",
    },
  })
);

const ProductForm = (props: {
  onSubmit: any;
  loading: boolean;
  title: string;
  defaultValues?: any;
}) => {
  const schema = yup.object().shape({
    name: yup.string().max(255).required("Name is required"),
    description: yup.string().max(10000).required("Description is required"),
    brand: yup.string().max(255).required("Brand is required"),
    image: yup.string().url().max(255).required("Image is required"),
    price: yup.number().min(0).required("Price is required"),
  });

  const { onSubmit, loading, title, defaultValues } = props;
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const classes = useStyles();

  return (
    <form
      onSubmit={handleSubmit((data: any) => {
        onSubmit(data);
      })}
    >
      <Card>
        <CardHeader title={title} />
        <CardContent>
          <Grid
            container
            spacing={1}
            direction='column'
            className={classes.grid}
          >
            <Grid item md={12} xs={12} className={classes.grid}>
              <TextField
                fullWidth
                label='Name'
                name='name'
                type='text'
                variant='outlined'
                inputRef={register}
                error={Boolean(errors.name)}
                helperText={errors.name?.message || " "}
              />
            </Grid>
            <Grid item md={12} xs={12} className={classes.grid}>
              <TextField
                fullWidth
                label='Description'
                name='description'
                type='text'
                variant='outlined'
                inputRef={register}
                error={Boolean(errors.description)}
                helperText={errors.description?.message || " "}
              />
            </Grid>
            <Grid item md={12} xs={12} className={classes.grid}>
              <TextField
                fullWidth
                label='Brand'
                name='brand'
                type='text'
                variant='outlined'
                inputRef={register}
                error={Boolean(errors.brand)}
                helperText={errors.brand?.message || " "}
              />
            </Grid>
            <Grid item md={12} xs={12} className={classes.grid}>
              <TextField
                fullWidth
                label='Image'
                name='image'
                type='text'
                variant='outlined'
                inputRef={register}
                error={Boolean(errors.image)}
                helperText={errors.image?.message || " "}
              />
            </Grid>
            <Grid item md={12} xs={12} className={classes.grid}>
              <TextField
                fullWidth
                label='Price'
                name='price'
                type='number'
                variant='outlined'
                inputRef={register}
                error={Boolean(errors.price)}
                helperText={errors.price?.message || " "}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <div className={classes.wrapper}>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={loading}
            >
              Submit
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </CardActions>
      </Card>
    </form>
  );
};
export default ProductForm;
