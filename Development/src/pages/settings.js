import React from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    FormControlLabel,
    List,
    ListItem,
    MenuItem,
    Snackbar,
    Switch,
    TextField,
    makeStyles,
} from '@material-ui/core';
import Cookies from 'universal-cookie';
import SaveIcon from '@material-ui/icons/Save';

import sealion from '../assets/sea-lion.png';
import { changeAPIEndpoint, changePaging } from '../dataProvider';

const cookies = new Cookies();

const useStyles = makeStyles(theme => ({
    container: {
        justifyContent: 'center',
        display: 'flex',
        flexWrap: 'wrap',
    },
    listItem: {
        justifyContent: 'center',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 350,
    },
}));

const paging = [
    {
        value: 5,
        label: '5',
    },
    {
        value: 10,
        label: '10',
    },
    {
        value: 20,
        label: '20',
    },
    {
        value: 50,
        label: '50',
    },
    {
        value: 100,
        label: '100',
    },
];

function getBool(cookie) {
    return cookie !== 'false';
}

const Settings = () => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        queryAPI: changeAPIEndpoint('Query API', ''),
        loggingAPI: changeAPIEndpoint('Logging API', ''),
        dnssdAPI: changeAPIEndpoint('DNS-SD API', ''),
        networkControlAPI: changeAPIEndpoint('Network Control API', ''),
        paging: parseInt(changePaging('valueRequest'), 10),
        rql: getBool(cookies.get('RQL')),
    });

    const handleInputChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };
    const handleSwitchChange = name => () => {
        setValues({ ...values, [name]: !values[name] });
    };

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        changeAPIEndpoint('Query API', values.queryAPI);
        changeAPIEndpoint('Logging API', values.loggingAPI);
        changeAPIEndpoint('DNS-SD API', values.dnssdAPI);
        changeAPIEndpoint('Network Control API', values.networkControlAPI);
        if (values.paging) {
            changePaging(values.paging);
        }
        cookies.set('RQL', values.rql, { path: '/' });
        setOpen(true);
    };

    return (
        <div style={{ paddingTop: '24px' }}>
            <Card>
                <CardHeader
                    title="Welcome to the nmos&#8209;js Client"
                    titleTypographyProps={{ variant: 'h2', align: 'center' }}
                />
                <CardContent align="center">
                    <img
                        id="sealion"
                        src={sealion}
                        style={{
                            border: '1px solid lightgray',
                            borderRadius: '50%',
                            padding: '4px',
                            width: '20%',
                        }}
                        alt="sea-lion logo"
                    />
                </CardContent>
            </Card>
            <Card align="center" title="Change Query">
                <CardHeader title="Settings" />
                <CardContent>
                    <form
                        className={classes.container}
                        noValidate
                        autoComplete="off"
                        title=""
                    >
                        <List>
                            <ListItem>
                                <TextField
                                    label="Query API"
                                    variant="filled"
                                    value={values.queryAPI}
                                    onChange={handleInputChange('queryAPI')}
                                    className={classes.textField}
                                />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    label="Logging API"
                                    variant="filled"
                                    value={values.loggingAPI}
                                    onChange={handleInputChange('loggingAPI')}
                                    className={classes.textField}
                                />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    label="DNS-SD API"
                                    variant="filled"
                                    value={values.dnssdAPI}
                                    onChange={handleInputChange('dnssdAPI')}
                                    className={classes.textField}
                                />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    label="Network Control API"
                                    variant="filled"
                                    value={values.networkControlAPI}
                                    onChange={handleInputChange(
                                        'networkControlAPI'
                                    )}
                                    className={classes.textField}
                                />
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <TextField
                                    select
                                    label="Paging Limit"
                                    variant="filled"
                                    placeholder=""
                                    className={classes.textField}
                                    value={values.paging}
                                    onChange={handleInputChange('paging')}
                                    margin="normal"
                                >
                                    {paging.map(option => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={values.rql}
                                            onChange={handleSwitchChange('rql')}
                                            color="primary"
                                        />
                                    }
                                    label="RQL"
                                />
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSave}
                                    startIcon={<SaveIcon />}
                                >
                                    Save
                                </Button>
                            </ListItem>
                        </List>
                        <Snackbar
                            open={open}
                            onClose={handleClose}
                            autoHideDuration={3000}
                            message={<span>Saved</span>}
                        />
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Settings;
