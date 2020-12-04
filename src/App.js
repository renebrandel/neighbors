import React, { useEffect, useState } from "react";
import logo from "./images/neighbors.svg";
import Routes from "./Routes";
import {AmplifyAuthenticator, AmplifySignOut} from "@aws-amplify/ui-react";

import "./App.css";
import { Predicates } from "aws-amplify";
import { DataStore } from '@aws-amplify/datastore';
import { Listing } from './models';
import { Comment } from './models';
import './index.css';
import Modal from "./modal";

// async function onCreate() {
//   await DataStore.save(
//     new Listing({
//       "title": "My app",
//       "description": "My app",
//       "price": 1020
//     })
//   );
// }

function onDeleteAll() {
  DataStore.delete(Listing, Predicates.ALL);
}


async function listListings(setListings) {
  const listings = await DataStore.query(Listing, Predicates.ALL);
  setListings(listings)
}
async function getCommentsForListing(postid) {
  const comments = (await DataStore.query(Comment))                    
                    .filter(a => a.postID === postid);
  console.log(comments);
}

const initialState = { title: '', description: '', price: '' }

function App() {
  const [formState, setFormState] = useState(initialState)
  const [listings, setListings] = useState([]);
  const [comments, setComments] = useState([]);
  const [isModalOpen, toggleModal] = useState(false);
  


  async function addListing() {
    await DataStore.save(
      new Listing({
        title: formState.title,
        description: formState.description,
        price: parseInt(formState.price),
      })
    );
    setFormState(initialState)
  }
  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }
  useEffect(() => {

    listListings(setListings);

    const subscription = DataStore.observe(Listing).subscribe(msg => {
      console.log(msg.model, msg.opType, msg.element);
      listListings(setListings);
    });

    const handleConnectionChange = () => {
      const condition = navigator.onLine ? 'online' : 'offline';
      console.log(condition);
      if (condition === 'online') { listListings(setListings); }
    }

    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    return () => subscription.unsubscribe();
  }, []);

  return (

    <AmplifyAuthenticator>

    <div className="App">
      
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <img className="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
                <img className="hidden lg:block h-8 w-auto" src={logo} alt="Workflow" />
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <a href="#" className="mx-6 px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900">Listings</a>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div class="ml-3 relative">
                <div>

                 <AmplifySignOut />
                </div>
              </div>
            </div>
          </div></div>
        <div className="hidden sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900">Listings</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Neighbors</a>
          </div>
        </div>
      </nav>
      <header className="App-header">
        <div className="flex flex-col p-5">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Title</label>
            <div class="mt-1">
              <input type="text" name="email" id="email" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Title of your listing" onChange={event => setInput('title', event.target.value)}
                value={formState.title}
                placeholder="Title" />
            </div>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Description</label>
            <div class="mt-1">
              <input type="text" name="email" id="email" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Title of your listing" onChange={event => setInput('description', event.target.value)}
                value={formState.description}
                placeholder="Description" />
            </div>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Price</label>
            <div class="mt-1">
              <input type="number" name="price" id="price" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="$0" onChange={event => setInput('price', event.target.value)}
                value={formState.price}
                placeholder="Price" />
            </div>
          </div>
          <div className="py-2 align-middle inline-block min-w-min sm:px-4 lg:px-8">
            <button type="submit" className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => { addListing(); listListings(setListings) }} >
              Add listing
            </button>
            <button type="button" className="inline-flex items-center mx-4 px-2.5 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => { onDeleteAll(); listListings(setListings) }} >
              Delete all
            </button>
          </div>
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-min sm:px-4 lg:px-8">
              <div className="shadow overflow-auto border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-min divide-y divide-gray-200"></table>
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                  </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                  </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                  </th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((item, i) => {
                    return <tr className="bg-white" key={i}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {listings[i].title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {listings[i].description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${listings[i].price}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a onClick={() => toggleModal(!isModalOpen)} class="text-indigo-600 hover:text-indigo-900">View comments</a>
                      </td></tr>
                  })}
                </tbody>

              </div>
            </div>
          </div>
        </div>
      </header>
    <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <h1>test</h1>
        <p>Other text that describes what is happening</p>
         
        <button onClick={() => toggleModal(false)}>toggle</button>
      </Modal>
    </div>
    </AmplifyAuthenticator>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <div>
    //       <input type="button" value="NEW" onClick={() => { onCreate(); listListings(setListings) }} />
    //       <input type="button" value="DELETE ALL" onClick={() => { onDeleteAll(); listListings(setListings) }} />
    //       {/* <input type="button" value="QUERY rating > 4" onClick={() => { onQuery(setPolls)} } /> */}
    //       <input type="button" value="ALL LISTINGS" onClick={() => { listListings(setListings) }} />
    //     </div>
    //     <table border="1">
    //       <thead>
    //         <tr><td>Id</td><td>Title</td></tr>
    //       </thead>
    //       <tbody>
    //         {listings.map((item, i) => {
    //           return <tr key={i}><td>{listings[i].title}...</td><td>{listings[i].price}</td></tr>
    //         })}
    //       </tbody>
    //     </table>
    //   </header>
    // </div>
  );
}

export default App;
