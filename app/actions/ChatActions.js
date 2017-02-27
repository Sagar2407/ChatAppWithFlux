'use strict';

import alt from '../altInstance';
import http from 'superagent';
import AlertActions from './AlertActions';
import { ServerError } from '../helpers';

class ChatActions {
  insertMessage(payload) {
    return (dispatch) => {
      http
        .post('/api/chats/insert')
        .send(payload)
        .end((err, res) => {
          const error = err || res.error ? ServerError(res) : null;

          dispatch({
            error: error,
            data: res.body
          });

          if (error) AlertActions.error({ message: error.message });
        });
    }
  };

}
export default alt.createActions(ChatActions);
