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
import { Loading, ShowButton, Title } from 'react-admin';
import FilterPanel, { StringFilter } from '../../components/FilterPanel';
import ListActions from '../../components/ListActions';
import PaginationButtons from '../../components/PaginationButtons';
import useDebounce from '../../components/useDebounce';
import useGetList from '../../components/useGetList';

const NetworkFlowsList = props => {
    const [filter, setFilter] = useState({});
    const debouncedFilter = useDebounce(filter, 250);
    const [paginationURL, setPaginationURL] = useState(null);
    const { data, loaded, pagination, url } = useGetList({
        ...props,
        filter: debouncedFilter,
        paginationURL,
    });
    if (!loaded) return <Loading />;

    const nextPage = label => {
        setPaginationURL(pagination[label]);
    };

    return (
        <Fragment>
            <div style={{ display: 'flex' }}>
                <span style={{ flexGrow: 1 }} />
                <ListActions url={url} {...props} />
            </div>
            <Card>
                <Title title={'Network Flows'} />
                <CardContent>
                    <FilterPanel filter={filter} setFilter={setFilter}>
                        <StringFilter source="label" />
                        <StringFilter
                            source="multicast_address"
                            label="Multicast Address"
                        />
                        <StringFilter
                            source="sender_endpoint_id"
                            label="Sender Endpoint ID"
                        />
                        <StringFilter source="port_id" label="Port ID" />
                        <StringFilter source="bandwidth" />
                    </FilterPanel>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    style={{
                                        paddingLeft: '32px',
                                    }}
                                >
                                    Label
                                </TableCell>
                                <TableCell>IP Address</TableCell>
                                <TableCell>Local Chassis ID</TableCell>
                                <TableCell>Local Port ID</TableCell>
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
                                            basePath="/network-flows"
                                            record={item}
                                            label={item.label}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {item.multicast_address}
                                    </TableCell>
                                    <TableCell>
                                        {item.sender_endpoint_id}
                                    </TableCell>
                                    <TableCell>{item.bandwidth}</TableCell>
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

export default NetworkFlowsList;
