import { assert } from 'chai';

import { defaultState } from '../ducks';
import { isLoading } from '../selectors';

describe('ui.selectors', () => {
    it('correctly determines when we are NOT waiting for outstanding http requests', () => {
        const loading = isLoading({
            ui: defaultState
        });

        assert.isBoolean(loading);
        assert.isFalse(loading, 'We should not be in a loading state at app load');
    });

    it('correctly determines when we are waiting for outstanding http requests', () => {
        const loading = isLoading({
            ui: {
                ...defaultState,
                requesting: 3
            }
        });

        assert.isBoolean(loading);
        assert.isTrue(loading, 'We should be in a loading state when we have outstanding http requests');
    });
});
