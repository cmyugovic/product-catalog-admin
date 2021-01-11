import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import SendIcon from "@material-ui/icons/Send";
import {
  Card,
  Input,
  IconButton,
  Radio,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: "1em",
  },
  search: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    width: "100%",
  },
  searchIcon: {
    color: "white",
    marginRight: "2em",
  },
  horizontal: {
    display: "block",
  },
  radio: {
    "&$checked": {
      color: "#3F51B5",
    },
  },
  checked: {},
}));

interface props {
  search: (filterValue: string, filterField: string) => void;
  fields: {
    value: string;
    label: string;
  }[];
}

const SearchBar = (props: props) => {
  const { search, fields } = props;
  const classes = useStyles();
  const [filterField, setFilterField] = useState("brand");
  const [filterValue, setFilterValue] = useState("");

  const searchAction = () => {
    search(filterValue, filterField);
  };

  useEffect(() => {
    if (filterValue === "") {
      searchAction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValue]);

  return (
    <Card className={classes.root}>
      <FormControl className={classes.horizontal}>
        {fields.map((field) => (
          <FormControlLabel
            key={field.value}
            control={
              <Radio
                classes={{ root: classes.radio, checked: classes.checked }}
                checked={Boolean(filterField === field.value)}
                onChange={() => setFilterField(field.value)}
                value={field.value}
              />
            }
            label={field.label}
          />
        ))}
      </FormControl>

      <div className={classes.search}>
        <SearchIcon className={classes.searchIcon} />
        <Input
          disableUnderline
          className={classes.input}
          onChange={({ target }) => setFilterValue(target.value)}
          placeholder={"Search by field"}
          value={filterValue}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              searchAction();
            }
          }}
        />
        <IconButton
          aria-label='delete'
          size='small'
          onClick={() => searchAction()}
        >
          <SendIcon />
        </IconButton>
      </div>
    </Card>
  );
};

export default SearchBar;
