import { useState, useEffect, Fragment } from 'react';

function FeatureRequests() {
    const [records, setRecords] = useState([]);
    const [error, setError] = useState(null);

    const Column = ({ record }) => (
        <div className="col-12 col-md-4">
            <div className="card mb-5">
                <div class="card-header">Feature Request</div>
                <img src="https://www.google.com/logos/doodles/2022/memorial-day-2022-united-states-6753651837109423-l.png" className="card-img-top" alt="blah" />
                <div className="card-body">
                    <div class="mb-3">
                        <label for="floatingCreated">Date Created</label>
                        <input type="datetime-local" disabled class="form-control-plaintext" id="floatingCreated" step="1" defaultValue={record.fields.Created.toString().substring(0, 19)} />
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingTitle" placeholder="Title" value={record.fields.Title} />
                        <label for="floatingTitle">Title</label>
                    </div>
                    <div class="form-floating">
                        <textarea type="text" class="form-control" id="floatingPassword" placeholder="Description" value={record.fields.Description} />
                        <label for="floatingDescription">Description</label>
                    </div>

                    <h5 className="card-title"></h5>
                    <p className="card-text"></p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>

    );

    useEffect(() => {
        fetch('https://api.airtable.com/v0/appWpfGBjwdcqGcJF/tblcQXJgPPXKVbBia'
            + '?api_key=keyY99GmetGQT2rHG'
            + '&sort%5B0%5D%5Bfield%5D=ID'
            + '&sort%5B0%5D%5Bdirection%5D=asc')
            //feature requests
            .then((resp) => resp.json())
            .then(data => {
                console.log(data);
                setRecords(data.records);
            }).catch(err => {
                setError(err);
            });


        // fetch('https://api.airtable.com/v0/appgOPm5an5ZzNvkk/favorites?api_key=YOUR_API_KEY')
        // .then((resp) => resp.json())
        // .then(data => {
        //    this.setState({ movies: data.records });
        // }).catch(err => {
        //   // Error :(
        // });
    }, []);

    return (
        <>
            {error && JSON.stringify(error)}
            <br />
            <div className="row">
                {records.map((record, index, array) => {
                    return <Column key={record.id} record={record} />
                })}
            </div>
            <button type="button" className="btn btn-primary">Add Card</button>
        </>
    );
}

export default FeatureRequests;