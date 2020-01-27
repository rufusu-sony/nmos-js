import React from 'react';
import {
    BooleanField,
    Button,
    ListButton,
    ReferenceArrayField,
    ReferenceField,
    ShowView,
    SimpleShowLayout,
    SingleFieldList,
    TextField,
    TopToolbar,
    useShowController,
} from 'react-admin';
import NavLink from 'react-router-dom/NavLink';
import Cookies from 'universal-cookie';
import EditIcon from '@material-ui/icons/Edit';
import ChipConditionalLabel from '../../components/ChipConditionalLabel';
import JsonIcon from '../../icons/JsonIcon';

const cookies = new Cookies();

const NetworkFlowsTitle = ({ record }) => {
    return (
        <span>
            Network Flows:{' '}
            {record
                ? record.label
                    ? `${record.label}`
                    : `${record.id}`
                : 'Unknown'}
        </span>
    );
};

const NetworkFlowsShowActions = ({ basePath, data, resource }) => (
    <TopToolbar title={<NetworkFlowsTitle />}>
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

const NetworkFlowsShow = props => {
    const controllerProps = useShowController(props);
    return (
        <ShowView
            {...props}
            {...controllerProps}
            title={<NetworkFlowsTitle />}
            actions={<NetworkFlowsShowActions />}
        >
            <SimpleShowLayout>
                <TextField label="ID" source="id" />
                <TextField source="label" />
                <TextField
                    source="multicast_address"
                    label="Multicast Address"
                />
                <ReferenceField
                    label="Sender Endpoint"
                    source="sender_endpoint_id"
                    reference="endpoints"
                    link="show"
                >
                    <ChipConditionalLabel source="label" />
                </ReferenceField>
                <ReferenceArrayField
                    label="Receiver Endpoints"
                    source="receiver_endpoint_ids"
                    reference="endpoints"
                >
                    <SingleFieldList linkType="show">
                        <ChipConditionalLabel source="label" />
                    </SingleFieldList>
                </ReferenceArrayField>
                <TextField source="bandwidth" />
                <TextField source="profile" />
                <BooleanField source="forward_flow" label="Forward Flow" />
                <TextField source="dscp" label="DSCP" />
            </SimpleShowLayout>
        </ShowView>
    );
};

export default NetworkFlowsShow;
