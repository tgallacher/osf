// @flow
import React, { Component } from 'react';
import {
    Card,
    Image,
    Header,
    Icon
} from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';
import glamorous from 'glamorous';
import moment from 'moment';

type Props = {
    issue: Object
};

const UpdatedIcon = glamorous(Icon)({
    marginLeft: '.5em!important'
});

const StyledCard = glamorous(Card)({
    wordWrap: 'break-word',
    ' img': {
        maxWidth: '100%'
    }
});

const Title = glamorous.h5({
    textDecoration: 'underline',
    padding: '0.45em 0'
});

class MainContent extends Component<Props, any>{
    render(): any{
        const { issue } = this.props;

        return (
            <StyledCard fluid color="blue">
                <Card.Content>
                    <Header as='h4' title={ issue.title }>
                        {
                            issue.user.avatar_url
                                && <Image circular src={ issue.user.avatar_url } />
                        }
                        <Header.Content>
                            <a href={ issue.html_url } tite={ issue.title } target="_blank">
                                { issue.title }
                            </a>
                            <Header.Subheader as="span">
                                <Icon name="user circle" />{ issue.user.login }
                                <UpdatedIcon name="calendar" />{ moment(issue.created_at).format('Do MMM[,] YYYY') }
                                <UpdatedIcon name="time" />{ moment(issue.updated_at).fromNow() }
                            </Header.Subheader>
                        </Header.Content>
                    </Header>
                </Card.Content>

                <Card.Content>
                    <Title>Description</Title>
                    <ReactMarkdown source={ issue.body || '*No description provided*' } />
                </Card.Content>
            </StyledCard>
        );
    }
}

export default MainContent;
