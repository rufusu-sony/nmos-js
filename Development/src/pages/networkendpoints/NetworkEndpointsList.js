import React, { Fragment, useState } from 'react';
import {
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';
import { Loading, ShowButton, Title, useRefresh } from 'react-admin';
import FilterField from '../../components/FilterField';
import ListActions from '../../components/ListActions';
import PaginationButtons from '../../components/PaginationButtons';
import useGetList from '../../components/useGetList';

const NetworkEndpointsList = props => {
    const refresh = useRefresh();
    const [filter, setFilter] = useState({});
    const [paginationURL, setPaginationURL] = useState(null);
    const { data, loaded, pagination, url } = useGetList({
        ...props,
        filter,
        paginationURL,
    });
    if (!loaded) return <Loading />;
    if (!data) return null;

    const nextPage = label => {
        setPaginationURL(pagination[label]);
    };

    const changeFilter = (filterValue, name) => {
        let currentFilter = filter;
        if (filterValue) {
            currentFilter[name] = filterValue;
        } else {
            delete currentFilter[name];
        }
        setPaginationURL(null);
        setFilter(currentFilter);
        refresh();
    };

    return (
        <Fragment>
            <div style={{ display: 'flex' }}>
                <span style={{ flexGrow: 1 }} />
                <ListActions url={url} {...props} />
            </div>
            <Card>
                <Title title={'Logs'} />
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    style={{
                                        paddingLeft: '32px',
                                    }}
                                >
                                    Label{' '}
                                    <FilterField
                                        name="label"
                                        setFilter={changeFilter}
                                    />
                                </TableCell>
                                <TableCell>
                                    IP Address{' '}
                                    <FilterField
                                        name="ip_address"
                                        setFilter={changeFilter}
                                    />
                                </TableCell>
                                <TableCell>
                                    Local Chassis ID{' '}
                                    <FilterField
                                        name="chassis_id"
                                        setFilter={changeFilter}
                                    />
                                </TableCell>
                                <TableCell>
                                    Local Port ID{' '}
                                    <FilterField
                                        name="port_id"
                                        setFilter={changeFilter}
                                    />
                                </TableCell>
                                <TableCell>
                                    Remote Chassis ID{' '}
                                    <FilterField
                                        name="attached_network_device.chassis_id"
                                        setFilter={changeFilter}
                                    />
                                </TableCell>
                                <TableCell>
                                    Remote Port ID{' '}
                                    <FilterField
                                        name="attached_network_device.port_id"
                                        setFilter={changeFilter}
                                    />
                                </TableCell>
                                <TableCell>
                                    Role{' '}
                                    <FilterField
                                        name="role"
                                        setFilter={changeFilter}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell component="th" scope="row">
                                        <ShowButton
                                            style={{
                                                textTransform: 'none',
                                            }}
                                            basePath="/endpoints"
                                            record={item}
                                            label={item.label}
                                        />
                                    </TableCell>
                                    <TableCell>{item.ip_address}</TableCell>
                                    <TableCell>{item.chassis_id}</TableCell>
                                    <TableCell>{item.port_id}</TableCell>
                                    <TableCell>
                                        {
                                            item.attached_network_device
                                                .chassis_id
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {item.attached_network_device.port_id}
                                    </TableCell>
                                    <TableCell>{item.role}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <br />
                    <PaginationButtons
                        disabled={!pagination}
                        nextPage={nextPage}
                        {...props}
                    />
                </CardContent>
            </Card>
        </Fragment>
    );
};

export default NetworkEndpointsList;
