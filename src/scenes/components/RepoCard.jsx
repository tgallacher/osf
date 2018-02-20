// @flow
import React from 'react';
import {
    Card,
    Image,
    Header,
    Statistic,
    Icon
} from 'semantic-ui-react';
import glamorous from 'glamorous';
import moment from 'moment';

type Props = {
    repo: Object
};

const IconWithText = glamorous(Icon)({
    marginRight: '0.1em!important'
});

const UpdatedIcon = glamorous(IconWithText)({
    marginLeft: '.5em!important'
});

const RepoCard = ({ repo = {} }: Props) => (
    <Card fluid>
        <Card.Content>
            <Header as='h4'>
                {
                    repo.owner.avatar_url
                        && <Image circular src={ repo.owner.avatar_url } />
                }
                <Header.Content>
                    <a href={ repo.html_url } title={ repo.name } target="_blank">
                        { repo.name.length > 30
                            ? repo.name.slice(0, 27) + '...'
                            : repo.name
                        }
                    </a>
                    <Header.Subheader as="span">
                        <span title="Repository Owner">
                            <IconWithText name="user circle" />{ repo.owner.login }
                        </span>
                        <span title="Last Updated">
                            <UpdatedIcon name="time" />{ moment(repo.updated_at).fromNow() }
                        </span>
                    </Header.Subheader>
                </Header.Content>
            </Header>
        </Card.Content>

        <Card.Content extra>
            <Statistic.Group widths={3} size="mini">
                <Statistic>
                    <Statistic.Value>{ repo.open_issues }</Statistic.Value>
                    <Statistic.Label>Issues</Statistic.Label>
                </Statistic>

                <Statistic size="tiny">
                    <Statistic.Value>{ repo.stargazers_count }</Statistic.Value>
                    <Statistic.Label>Stars</Statistic.Label>
                </Statistic>

                <Statistic>
                    <Statistic.Value>{ repo.forks }</Statistic.Value>
                    <Statistic.Label>Forks</Statistic.Label>
                </Statistic>
            </Statistic.Group>
        </Card.Content>
    </Card>
);

export default RepoCard;
