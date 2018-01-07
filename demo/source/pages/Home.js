import React, { Fragment } from "react";
import { compose } from "recompact";
import { connect } from "react-redux";
import stranded from "stranded";

import { login } from "../login/strands";

const LoginForm = ({ username, password, onSubmit, errors }) => (
    <Fragment>
        <header>
            <h1 data-test="header">Login</h1>
        </header>
        <div>
            <input type="text" placeholder="Username" value={username} />
            <input type="text" placeholder="Password" value={password} />
            <button type="button" onClick={handleClick}>
                Login
            </button>
        </div>
    </Fragment>
);

export default compose(
    connect(({ login }) => ({ login })),
    stranded({ login })
)(LoginForm);
