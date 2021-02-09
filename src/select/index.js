import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
// import providerData from "./provider-data.json";
import "./styles.css";

export default function Select(props) {

  const { onAddSelect } = props
  const GreenCheckbox = withStyles({
    root: {
      color: "#67DCBA",
      "&$checked": {
        color: "#4BE8BC",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);


  const [state, setState] = useState({ checkedValue: true, });
  const [search, setSearch] = useState();
  const [listSelected, setListSelected] = useState([]);
  // const [findList, setFindList] = useState([]);

  const findList = search ? props.optionsList.filter(e => e.label.toLowerCase()?.includes(search.toLowerCase())) : props.optionsList


  const handleAddSelect = () => {
    onAddSelect(listSelected);
  };

  const onSearch = (ev) => setSearch(ev.target.value)

  const onSelectItem = (item) => () => {
    const isExist = listSelected.find(e => e.id === item.id)
    setListSelected(prev => isExist ? listSelected.filter(e => e.id !== item.id) : [...prev, item])
  }

  return (
    <div>
      <TextField
        id="standard-basic"
        label="search for a resource"
        type="search"
        value={search}
        onChange={onSearch}
      />
      <List className="addResource__list">
        {findList.map((data, index) => (
          <ListItem button key={index} onClick={onSelectItem(data)}>
            <FormControlLabel
              control={
                <GreenCheckbox
                  checked={listSelected.some(e => e.id === data.id)}
                  // onChange={handleChange}
                  name="checkedValue"
                // checked={ids.indexOf(data.id) !== -1 ? checkedValue : false}
                />
              }
            />
            <div>{data.name}</div>
          </ListItem>
        ))}
        <button className="addResource__button" onClick={handleAddSelect}>
          ADD SELECTED
				</button>
      </List>
    </div>
  )
}
