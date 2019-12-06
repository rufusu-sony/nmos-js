import React from 'react';
import {
    Button,
    ListButton,
    ShowView,
    SimpleShowLayout,
    TextField,
    TopToolbar,
    useShowController,
} from 'react-admin';
import NavLink from 'react-router-dom/NavLink';
import Cookies from 'universal-cookie';
import EditIcon from '@material-ui/icons/Edit';
import JsonIcon from '../../icons/JsonIcon';

const cookies = new Cookies();

const NetworkEndpointsTitle = ({ record }) => {
    return (
        <span>
            Network Endpoint:{' '}
            {record
                ? record.label
                    ? `${record.label}`
                    : `${record.id}`
                : 'Unknown'}
        </span>
    );
};

const NetworkEndpointsShowActions = ({ basePath, data, resource }) => (
    <TopToolbar title={<NetworkEndpointsTitle />}>
        {data ? (
            <Button
                label={'Raw'}
                onClick={() =>
                    window.open(
                        cookies.get('Network Control API') +
                            '/' +
                            resource +
                            '/' +
                            data.id,
                        '_blank'
                    )
                }
                rel="noopener noreferrer"
                title={'View raw'}
            >
                <JsonIcon />
            </Button>
        ) : null}
        <ListButton title={'Return to ' + basePath} basePath={basePath} />
        {data && (
            <Button
                label={'Edit'}
                component={NavLink}
                to={`${basePath}/${data.id}`}
            >
                <EditIcon />
            </Button>
        )}
    </TopToolbar>
);

export const NetworkEndpointsShow = props => {
    const controllerProps = useShowController(props);
    return (
        <ShowView
            {...props}
            {...controllerProps}
            title={<NetworkEndpointsTitle />}
            actions={<NetworkEndpointsShowActions />}
        >
            <SimpleShowLayout>
                <TextField label="ID" source="id" />
                <TextField source="label" />
                <TextField source="ip_address" label="IP Address" />
                <TextField source="chassis_id" label="Local Chassis ID" />
                <TextField source="port_id" label="Local Port ID" />
                <TextField
                    source="attached_network_device.chassis_id"
                    label="Remote Chassis ID"
                />
                <TextField
                    source="attached_network_device.port_id"
                    label="Remote Port ID"
                />
                <TextField source="max_bandwidth" label="Max Bandwidth" />
                <TextField source="role" />
            </SimpleShowLayout>
        </ShowView>
    );
};

export default NetworkEndpointsShow;
