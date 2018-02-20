// @flow
import React, { Component } from 'react';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import glamorous from 'glamorous';
import { connect } from 'react-redux';

import RepoIssues from './RepoIssues';
import { isLoading } from 'ui/selectors';

type Props = {
    repos: Array<Object>,
    issues: Object,
    loading: boolean
};

const Container = glamorous(Grid)({
    marginTop: '1em!important'
});

class MainContent extends Component<Props, any>{
    render(): any{
        return (
            <main id="main-content">
                <Dimmer active={ this.props.loading }>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
                <Container container doubling columns={2}>
                    <Grid.Column width={12}>
                        {
                            this.props.repos.map(
                                (repo: Object): any => {
                                    if( ! (repo.full_name in this.props.issues)){
                                        return null;
                                    }

                                    return (
                                        <RepoIssues key={repo.id} repo={ repo } repoIssues={ this.props.issues[repo.full_name] || [] } />
                                    );
                                }
                            )
                        }
                    </Grid.Column>
                </Container>
            </main>
        );
    }
}

const mapStateToProps = (state: Object) => ({
    repos: state.repos,
    issues: state.issues,
    loading: isLoading(state)
});

// $FlowFixMe
export default connect(mapStateToProps)(MainContent);
