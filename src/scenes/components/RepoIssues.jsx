// @flow
import React, { Component } from 'react';
import {
    Rail,
    Sticky
} from 'semantic-ui-react';
import glamorous from 'glamorous';

import IssueCard from './IssueCard';
import RepoCard from './RepoCard';

type Props = {
    repo: Object,
    repoIssues: Array<Object>
};

const Wrapper = glamorous.div({
    position: 'relative',
    marginBottom: '6em'
});

class RepoIssues extends Component<Props, any>{
    state = {
        ref: null
    };

    handleContextRef = (ref: any) => {
        this.setState({ ref });
    }

    render(): any{
        const { repoIssues } = this.props;

        return (
            <Wrapper id={ this.props.repo.full_name.replace('/', '_') }>
                <div ref={ this.handleContextRef }>
                    {
                        repoIssues.map( (issue: Object) => (
                            <IssueCard key={issue.id} issue={ issue } />
                        ))
                    }

                    <Rail position='right' close="very">
                        <Sticky offset={ 16 } context={ this.state.ref }>
                            <RepoCard repo={ this.props.repo } />
                        </Sticky>
                    </Rail>
                </div>
            </Wrapper>
        );
    }
}

export default RepoIssues;
