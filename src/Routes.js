import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateListing from "./container/CreateListing";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/create">
        <CreateListing />
      </Route>
    </Switch>
  );
}