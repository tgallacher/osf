// @flow
import React, { Component, type Element } from 'react';
import {
    Container,
    Header,
    Icon,
    Menu,
    Segment,
    Input
} from 'semantic-ui-react';
import glamorous from 'glamorous';
import { connect } from 'react-redux';

import { hasUser } from 'user/selectors';
import { getStarredRepos } from 'repos/ducks';
import { isLoading } from 'ui/selectors';
import UserInfoBar from './UserInfoBar';

const StyledSegment = glamorous(Segment)({
    minHeight: '15em',
    padding: '0em 0em',
    margin: '0 0 0 0'
});

type Props = {
    title: string,
    placeholder?: string,
    dispatch: Dispatch,
    loading: boolean,
    hasUser: boolean
};

type State = {
    username: ?string
};

class AppHeader extends Component<Props, State>{
    static defaultProps = {
        placeholder: null
    };

    state = {
        username: null
    }

    handleKeyPress = (event: Event) => {
        const { username } = this.state;

        if(event.key !== 'Enter' || ! username)
            return;

        this.props.dispatch(getStarredRepos(username));
    }

    handleChange = (_: any, data: Object) => {
        this.setState(
            // @todo: sanitize username to alphanumeric
            () => ({ username: data.value })
        );
    }

    render(): Element<'header'>{
        const { title, placeholder, loading } = this.props;

        return (
            <header>
                <StyledSegment inverted textAlign='center' vertical>
                    <Menu inverted secondary fixed={null} size='small'>
                        <Container>
                            <Menu.Item>OSF</Menu.Item>
                            <Menu.Item position='right'>
                                <a href="#" title="View on GitHub"><Icon name="github" size="big" /></a>
                            </Menu.Item>
                        </Container>
                    </Menu>

                    <Container text>
                        <Header inverted as="h2">{ title }</Header>
                        <Input
                            fluid
                            icon="users"
                            action='Go'
                            inverted
                            loading={loading}
                            onChange={ this.handleChange }
                            onKeyPress={ this.handleKeyPress }
                            placeholder={ placeholder }
                            iconPosition='left'
                        />
                    </Container>
                </StyledSegment>

                {
                    this.props.hasUser
                        ? <UserInfoBar />
                        : null
                }
            </header>
        );
    }
}

const mapStateToProps = (state: Object) => ({
    loading: isLoading(state),
    hasUser: hasUser(state)
});

// $FlowFixMe
export default connect(mapStateToProps)(AppHeader);
