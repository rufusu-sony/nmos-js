import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

const NetworkEndpointsCreate = props => (
    <Create {...props}>
        <SimpleForm redirect="show">
            <TextInput source="id" label="ID" />
            <TextInput source="label" />
            <TextInput source="ip_address" label="IP Address" />
            <TextInput source="chassis_id" label="Local Chassis ID" />
            <TextInput source="port_id" label="Local Port ID" />
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
    </Create>
);

export default NetworkEndpointsCreate;
