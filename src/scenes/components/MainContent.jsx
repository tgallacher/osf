// @flow
import React from 'react';
import {
    Card,
    Feed,
    Image,
    Header,
    Grid,
    Statistic,
    Icon
} from 'semantic-ui-react';
import glamorous from 'glamorous';
import { connect } from 'react-redux';
import moment from 'moment';

type Props = {
    repos: Array<Object>
};

const UpdatedIcon = glamorous(Icon)({
    marginLeft: '.5em!important'
});

const Container = glamorous(Grid)({
    marginTop: '1em!important'
});

const MainContent = ({ repos = [] }: Props) => (
    <main id="main-content">
        <Container container doubling stackable columns={3}>
            {
                repos.map(
                    (repo: Object) => (
                        <Grid.Column key={repo.id}>
                            <Card fluid color="red">
                                <Card.Content>
                                    <Header as='h4' title={ repo.name }>
                                        {
                                            repo.owner.avatar_url
                                                && <Image circular src={ repo.owner.avatar_url } />
                                        }
                                        <Header.Content>
                                            { repo.name.length > 30
                                                ? repo.name.slice(0, 27) + '...'
                                                : repo.name
                                            }
                                            <Header.Subheader as="span">
                                                <Icon name="user circle" />{ repo.owner.login }
                                                <UpdatedIcon name="calendar" />{ moment(repo.updated_at).fromNow() }
                                            </Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </Card.Content>

                                <Card.Content>
                                    <Feed>
                                        <Feed.Event>
                                            <Feed.Content>
                                                <Feed.Date content='1 day ago' />
                                                <Feed.Summary>
                                                    You added <a>Jenny Hess</a> to your <a>coworker</a> group.
                                                </Feed.Summary>
                                            </Feed.Content>
                                        </Feed.Event>

                                        <Feed.Event>
                                            <Feed.Content>
                                                <Feed.Date content='3 days ago' />
                                                <Feed.Summary>
                                                    You added <a>Molly Malone</a> as a friend.
                                                </Feed.Summary>
                                            </Feed.Content>
                                        </Feed.Event>

                                        <Feed.Event>
                                            <Feed.Content>
                                                <Feed.Date content='4 days ago' />
                                                <Feed.Summary>
                                                    You added <a>Elliot Baker</a> to your <a>musicians</a> group.
                                                </Feed.Summary>
                                            </Feed.Content>
                                        </Feed.Event>
                                    </Feed>
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
                        </Grid.Column>
                    )
                )
            }
        </Container>
    </main>
);

const mapStateToProps = (state: Object) => ({
    repos: state.repos
});

export default connect(mapStateToProps)(MainContent);
