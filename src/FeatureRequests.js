import { useState, useEffect, Fragment } from "react";
import useSWRInfinite from 'swr/infinite'

/*
export async function getServerSideProps() {
    console.log(process.env.AIRTABLE_API_KEY)
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);
    var results = await base('Feature Requests').select({
        view: "Grid view"
    })
    // .eachPage(function page(records, fetchNextPage) {
    //     // This function (`page`) will get called for each page of records.

    //     records.forEach(function(record) {
    //         console.log('Retrieved', record.get('Title'));
    //     });

    //     // To fetch the next page of records, call `fetchNextPage`.
    //     // If there are more records, `page` will get called again.
    //     // If there are no more records, `done` will get called.
    //     fetchNextPage();

    // }, function done(err) {
    //     if (err) { console.error(err); return; }
    // });
    .all();

    let records = [];
    for(let i=0; i<results.length; i++){
        records.push(JSON.parse(JSON.stringify(results[i])));
    }

    return {
      props: { records }, // will be passed to the page component as props
    }
}
*/

export default function FeatureRequests(props) {
  //   const [records, setRecords] = useState(props.records || []);
  //   const [error, setError] = useState(props.error || null);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const PAGE_SIZE = 6;

  const url =
    "https://api.airtable.com/v0/" +
    process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID +
    "/Feature%20Requests" +
    "?view=Grid%20view" +
    "&api_key=" +
    process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) => url,
    fetcher
  );
  //const blah = data ? [].concat(...data) : [];
  const records = data ? [].concat(...data[0].records) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  const Column = ({ record }) => (
    <div className="col-12 col-md-4">
      <div className="card mb-5">
        <div className="card-header">Feature Request</div>
        <img
          src="https://www.google.com/logos/doodles/2022/memorial-day-2022-united-states-6753651837109423-l.png"
          className="card-img-top"
          alt="blah"
        />
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="floatingCreated">Date Created</label>
            <input
              type="datetime-local"
              disabled
              className="form-control-plaintext"
              id="floatingCreated"
              step="1"
              defaultValue={record.fields.Created.toString().substring(0, 19)}
            />
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingTitle"
              placeholder="Title"
              defaultValue={record.fields.Title}
            />
            <label htmlFor="floatingTitle">Title</label>
          </div>
          <div className="form-floating">
            <textarea
              type="text"
              className="form-control"
              id="floatingPassword"
              placeholder="Description"
              defaultValue={record.fields.Description}
            />
            <label htmlFor="floatingDescription">Description</label>
          </div>

          <h5 className="card-title"></h5>
          <p className="card-text"></p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {error && JSON.stringify(error)}
      <br />
      <div className="row">
        {records.map((record, index, array) => {
          return <Column key={record.id} record={record} />;
        })}
      </div>
      <button type="button" className="btn btn-primary">
        Add Card
      </button>
    </>
  );
}