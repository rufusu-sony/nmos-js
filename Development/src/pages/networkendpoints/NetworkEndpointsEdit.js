import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

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

const NetworkEndpointsEdit = props => (
    <Edit {...props} undoable={false} title={<NetworkEndpointsTitle />}>
        <SimpleForm>
            <TextInput source="label" />
            <TextInput source="ip_address" label="IP Address" />
            <TextInput
                source="attached_network_device.chassis_id"
                label="Remote Chassis ID"
            />
            <TextInput
                source="attached_network_device.port_id"
                label="Remote Port ID"
            />
            <TextInput source="max_bandwidth" label="Max Bandwidth" />
            <TextInput source="role" />
        </SimpleForm>
    </Edit>
);

export default NetworkEndpointsEdit;
