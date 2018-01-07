import React from "react";

import createHistory from "history/createBrowserHistory";

import { Provider as RoutingProvider } from "jarl-react-redux";
import { Provider as ReduxProvider } from "react-redux";
import { Provider as StrandProvider } from "stranded";

import routes from "./routes";
import Pages from "./Pages";

const history = createHistory();

const Root = () => (
    <ReduxProvider store={store}>
        <RoutingProvider history={history} routes={routes}>
            <StrandProvider>
                <Pages />
            </StrandProvider>
        </RoutingProvider>
    </ReduxProvider>
);

export default Root;
