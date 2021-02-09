import React, { useState } from 'react'
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import './BasicInfo.css'
import { providerData, resourcesData } from './data'
import CustomSelect from './select'


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function BasicInfo() {
  const classes = useStyles();
  const [resourceName, setResourceName] = useState('')
  const [provider, setProvider] = useState('')
  const [isOpenSelect, setIsOpenSelect] = useState(false)
  const [listSelected, setListSelected] = useState([]);

  console.log('provider', provider)

  const resourceFiltered = resourcesData.filter(el => el.associated_providers[0] === provider)
    .map(e => ({ ...e, label: e.name, value: e.id }))

  const onChangeResource = (e) => setResourceName(e.target.value)

  const handleChangeProvider = (e) => setProvider(e.target.value)

  const onSelectResource = () => {
    setIsOpenSelect(true)
  }

  const onAddSelect = (listData) => {
    setIsOpenSelect(false)
    setListSelected(listData)
  }

  const onRemoveItemFromResource = (item) => () => {
    setListSelected(prev => prev.filter(el => el.id !== item.id))
  }

  return (
    <div>
      <Grid container >
        <Grid container item >
          <TextField
            label="Resource name"
            value={resourceName}
            onChange={onChangeResource}
          />
        </Grid>
        <Grid container item>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Provider</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={provider}
              onChange={handleChangeProvider}
            >
              {providerData.map((e, i) => <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid container item>
          <div onClick={onSelectResource} className={`${provider ? 'text-add-src-active' : 'text-add-src-disable '}`}>Add resource</div>
        </Grid>
        {provider && isOpenSelect ?
          <Grid container item>
            <CustomSelect
              // defaultText={this.state.defaultSelectText}
              optionsList={resourceFiltered}
              onAddSelect={onAddSelect}
            />
          </Grid> : null}

        <Grid container item>
          {listSelected.map((item, i) => (
            <div key={item.id} style={{ marginRight: 10 }}>
              <div style={{ color: 'red' }} onClick={onRemoveItemFromResource(item)}>X</div>
              <div>{item.name}</div>
              <div>required</div>
            </div>
          ))}
        </Grid>
      </Grid>


    </div>
  )
}
