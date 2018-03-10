// @flow
import React, { Component, type Element } from 'react';
import glamorous from 'glamorous';
import { connect } from 'react-redux';
import {
    Segment,
    Grid,
    Image,
    Statistic
} from 'semantic-ui-react';

import { getUser } from 'user/selectors';
import { type State as UserState } from 'user/ducks';

type Props = {
    user: UserState
};

const UserMetaContainer = glamorous(Segment)({
    backgroundColor: '#e0e1e2 !important',
    height: '5.5em'
});

const UserAvatar = glamorous(Image)({
    margin: 'auto' // center image
});

class UserInfoBar extends Component<Props>{
    render(): Element<*>{
        const { user } = this.props;

        return (
            <UserMetaContainer basic vertical textAlign="center">
                <Grid verticalAlign="middle" container>
                    <Grid.Column width={7}>
                        <Statistic.Group widths={2} size="mini">
                            <Statistic label="Repos" value={user.public_repos} />
                            <Statistic value={user.public_gists} label="Gists" />
                        </Statistic.Group>
                    </Grid.Column>

                    <Grid.Column width={2} textAlign="center">
                        <a href={user.html_url} target="_blank" title={`View ${user.login}'s profile on GitHub`}>
                            <UserAvatar src={user.avatar_url} alt={user.name} height="50" rounded />
                        </a>
                    </Grid.Column>

                    <Grid.Column width={7}>
                        <Statistic.Group widths={2} size="mini">
                            <Statistic value={user.following} label="Following" />
                            <Statistic label="Followers" value={user.followers} />
                        </Statistic.Group>
                    </Grid.Column>
                </Grid>
            </UserMetaContainer>
        );
    }
}

const mapStateToProps = (state: Object): Props => ({
    user: getUser(state)
});

export default connect(mapStateToProps)(UserInfoBar);
