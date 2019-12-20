import React, { Fragment, useState } from 'react';
import {
    Card,
    CardContent,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    makeStyles,
    useTheme,
} from '@material-ui/core';
import {
    Loading,
    ReferenceField,
    TextField,
    Title,
    TopToolbar,
    useNotify,
    useRefresh,
} from 'react-admin';
import get from 'lodash/get';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import ChipConditionalLabel from '../components/ChipConditionalLabel';
import ListActions from '../components/ListActions';

import makeConnection from '../components/makeConnection';
import PaginationButtons, {
    PaginationButton,
} from '../components/PaginationButtons';
import useGetList from '../components/useGetList';
import JsonIcon from '../icons/JsonIcon';

const useStyles = makeStyles({
    column_header: { height: '120px', whiteSpace: 'nowrap' },
    column_header_text: {
        transform: 'rotate(315deg) translate(-25px, 25px)',
        width: '48px',
    },
    row_header: {},
    row_header_text: { whiteSpace: 'nowrap' },
    cell: { width: '48px' },
    cell_text: {},
});

const ConnectionIcon = ({ receiver, sender, connect }) => {
    if (get(receiver, 'transport') !== get(sender, 'transport')) {
        return null;
    }

    if (get(receiver, 'subscription.sender_id') === get(sender, 'id')) {
        return (
            <IconButton>
                <CheckIcon style={{ color: 'green' }} />
            </IconButton>
        );
    } else {
        return (
            <IconButton
                onClick={() =>
                    connect(
                        get(sender, 'id'),
                        get(receiver, 'id'),
                        'active'
                    )
                }
            >
                <ClearIcon style={{ color: 'red' }} />
            </IconButton>
        );
    }
};

const ConnectionsTable = props => {
    const refresh = useRefresh();
    const notify = useNotify();
    const classes = useStyles();
    const [filters, setFilters] = useState({ receivers: {}, senders: {} });

    const [paginationURL, setPaginationURL] = useState({
        receivers: null,
        senders: null,
    });

    const {
        data: receiversData,
        loaded: receiversLoaded,
        pagination: receiversPagination,
    } = useGetList({
        ...props,
        filter: filters.receivers,
        paginationURL: paginationURL.receivers,
        pagingLimit: 5,
        resource: 'receivers',
    });
    const {
        data: sendersData,
        loaded: sendersLoaded,
        pagination: sendersPagination,
    } = useGetList({
        ...props,
        filter: filters.senders,
        paginationURL: paginationURL.senders,
        pagingLimit: 5,
        resource: 'senders',
    });

    const nextReceiverPage = label => {
        setPaginationURL({
            receivers: receiversPagination[label],
            senders: paginationURL.senders,
        });
    };

    const nextSenderPage = label => {
        setPaginationURL({
            receivers: paginationURL.receivers,
            senders: sendersPagination[label],
        });
    };

    const connect = (senderID, receiverID, endpoint) => {
        makeConnection(senderID, receiverID, endpoint)
            .then(() => {
                notify('Element updated', 'info');
                refresh();
                props.history.push(
                    `${props.basePath}/${props.id}/show/${endpoint}`
                );
            })
            .catch(error => {
                if (error && error.hasOwnProperty('body'))
                    notify(
                        get(error.body, 'error') +
                            ' - ' +
                            get(error.body, 'code') +
                            ' - ' +
                            get(error.body, 'debug'),
                        'warning'
                    );
                notify(error.toString(), 'warning');
            });
    };

    if (!(receiversLoaded && sendersLoaded)) return <Loading />;
    return (
        <Card>
            <Title title={'Connection Matrix'} />
            <CardContent>
                <Table style={{ width: 'auto' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            {receiversData.slice(0, 5).map(receiver => (
                                <TableCell
                                    key={receiver.id}
                                    className={classes.column_header}
                                >
                                    <div className={classes.column_header_text}>
                                        <ReferenceField
                                            record={receiver}
                                            basePath="/receivers"
                                            source="id"
                                            reference="receivers"
                                            link="show"
                                        >
                                            <TextField source="label" />
                                        </ReferenceField>
                                        <br />
                                        <Typography variant="caption">
                                            ({get(receiver, 'transport')})
                                        </Typography>
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sendersData.slice(0, 5).map(sender => (
                            <TableRow key={sender.id}>
                                <TableCell
                                    component="th"
                                    scope="sender"
                                    className={classes.row_header}
                                >
                                    <ReferenceField
                                        record={sender}
                                        basePath="/senders"
                                        source="id"
                                        reference="senders"
                                        link="show"
                                    >
                                        <TextField source="label" />
                                    </ReferenceField>
                                    <br />
                                    <Typography variant="caption">
                                        ({get(sender, 'transport')})
                                    </Typography>
                                </TableCell>
                                {receiversData.slice(0, 5).map(receiver => (
                                    <TableCell
                                        key={receiver.id}
                                        className={classes.cell}
                                    >
                                        <ConnectionIcon
                                            receiver={receiver}
                                            sender={sender}
                                            connect={connect}
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <br />
                <PaginationButtons
                    disabled={!sendersPagination}
                    nextPage={nextSenderPage}
                    {...props}
                />
                <br />
                <PaginationButtons
                    disabled={!receiversPagination}
                    nextPage={nextReceiverPage}
                    {...props}
                />
            </CardContent>
        </Card>
    );
};

const Connections = props => {
    const theme = useTheme();
    return (
        <Fragment>
            <div style={{ display: 'flex' }}>
                <span style={{ flexGrow: 1 }} />
                <TopToolbar
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start',
                        paddingTop: theme.spacing(4),
                        paddingBottom: 0,
                        paddingRight: theme.spacing(2),
                        minHeight: theme.spacing(5),
                    }}
                />
            </div>
            <ConnectionsTable {...props} />
        </Fragment>
    );
};

export default Connections;
