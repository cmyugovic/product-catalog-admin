import React, { useState } from "react";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

const DynamicList = (props: any) => {
  const { className, objectList, loading, columns, actions } = props;
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageChange = (event: any, page: any) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(event.target.value);
  };
  return (
    <Card className={clsx(classes.root, className)}>
      <CardActions>{actions}</CardActions>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column: any) => (
                    <TableCell key={column.label}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading || !objectList ? (
                  <TableRow>
                    {columns.map((column: any) => (
                      <TableCell key={`skeleton_${column.label}`}>
                        <Skeleton variant='text' width='80%' />
                        <Skeleton variant='text' width='40%' />
                      </TableCell>
                    ))}
                  </TableRow>
                ) : (
                  objectList
                    .slice(
                      rowsPerPage * page,
                      objectList.length < rowsPerPage * (page + 1)
                        ? objectList.length
                        : rowsPerPage * (page + 1)
                    )
                    .map((object: any) => (
                      <TableRow hover key={object._id}>
                        {columns.map((column: any) => (
                          <TableCell key={`${object._id}_${column.label}`}>
                            {column.renderFn(object)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component='div'
          count={objectList?.length || 0}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

export default DynamicList;
