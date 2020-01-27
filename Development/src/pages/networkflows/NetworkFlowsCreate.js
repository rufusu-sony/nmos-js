import React from 'react';
import {
    ArrayInput,
    BooleanInput,
    Create,
    SimpleForm,
    SimpleFormIterator,
    TextInput,
} from 'react-admin';

const NetworkFlowsCreate = props => (
    <Create {...props}>
        <SimpleForm redirect="show">
            <TextInput source="id" label="ID" />
            <TextInput source="label" />
            <TextInput source="multicast_address" label="Multicast Address" />
            <TextInput source="sender_endpoint_id" label="Sender Endpoint" />
            <ArrayInput
                source="receiver_endpoint_ids"
                label="Receiver Endpoints"
            >
                <SimpleFormIterator>
                    <TextInput label="Endpoint ID" />
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput source="bandwidth" />
            <TextInput source="profile" />
            <BooleanInput source="forward_flow" label="Forward Flow" />
            <TextInput source="dscp" label="DSCP" />
        </SimpleForm>
    </Create>
);

export default NetworkFlowsCreate;
