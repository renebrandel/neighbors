import React, { useEffect, useState } from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { Listing } from '../models';
import '../index.css';

function CreateListing() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
export default CreateListing