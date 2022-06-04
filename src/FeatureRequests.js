import { useState, useEffect } from 'react';

function FeatureRequests() {
    const [records, setRecords] = useState([]);
    const [error, setError] = useState(null);

    const Column = ({ record }) => (
        <div className="col">
            <div className="card">
                <img src="https://www.google.com/logos/doodles/2022/memorial-day-2022-united-states-6753651837109423-l.png" className="card-img-top" alt="blah" />
                <div className="card-body">
                    <h5 className="card-title">{record.fields.Title}</h5>
                    <p className="card-text">{record.fields.Description}</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>

    );

    useEffect(() => {
        fetch('https://api.airtable.com/v0/appWpfGBjwdcqGcJF/tblcQXJgPPXKVbBia?api_key=keyY99GmetGQT2rHG&sort%5B0%5D%5Bfield%5D=Created&sort%5B0%5D%5Bdirection%5D=asc')
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
            {records && JSON.stringify(records)}
            <br />
            {error && JSON.stringify(error)}
            <br />
            <div className="row">
                {records.map((record, index) => {
                    if ((index % 3) == 0 && index !== 0) {
                        return (
                            <div key={record.id}>
                                <div className="w-100"></div>
                                <Column  record={record} />
                            </div>
                        )
                    } else {
                        return <Column key={record.id} record={record} />
                    }
                })}
            </div>
            <button type="button" className="btn btn-primary">Add Card</button>
        </>
    );
}

export default FeatureRequests;