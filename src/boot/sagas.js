import { spawn } from 'redux-saga/effects';

import issuesSaga from 'issues/sagas';
import reposSaga from 'repos/sagas';

export default function* (){
    yield spawn(issuesSaga);
    yield spawn(reposSaga);
}
