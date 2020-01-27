import React from 'react';
import {
    ArrayInput,
    BooleanInput,
    Edit,
    SimpleForm,
    SimpleFormIterator,
    TextInput,
} from 'react-admin';

const NetworkFlowsTitle = ({ record }) => {
    return (
        <span>
            Network Flow:{' '}
            {record
                ? record.label
                    ? `${record.label}`
                    : `${record.id}`
                : 'Unknown'}
        </span>
    );
};

const NetworkFlowsEdit = props => (
    <Edit {...props} undoable={false} title={<NetworkFlowsTitle />}>
        <SimpleForm>
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
    </Edit>
);

export default NetworkFlowsEdit;
