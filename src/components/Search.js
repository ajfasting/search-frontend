import React from 'react';
import '../Style.css';
import axios from 'axios';

class Search extends React.Component {

    //initialize the state
    constructor(props) {    
        super(props);
    
    //define properites for the state
        this.state = {
                query: '',
                results: {},
                isLoading: false,
                message: '',
        };
        this.cancel = '';
    }

    //sets the query property of state to whatever text the User inputs
    handleOnInputChange = (event) => {
        const query = event.target.value;

            if (!query) {
                this.setState({ query, loading: true, message: ''  });
            } else {
                this.setState({ query, loading: true, message: ''  }, () => {
                    this.getSearchResults(query);
                });
            }

    };

    
    getSearchResults = (query) => {
        
        const searchUrl = `localhost:8080`;
        console.log(searchUrl);
        // prevent multiple API calls
        if (this.cancel) {
            this.cancel.cancel();
        }

        this.cancel = axios.CancelToken.source();

        axios.get(searchUrl, {cancelToken: this.cancel.token})

            .then(res => {

                const resultNotFoundMsg = !res.data.hits.length
                ? 'There are no more search results. Please try a new search.' : '';
                
                    this.setState({
                        results: res.data.hits,
                        message: resultNotFoundMsg,
                        isLoading: false,
                    });
            })
            .catch(error => {

                if (axios.isCancel(error) || error) {
                    this.setState({
                        isLoading: false,
                        message: 'Failed to fetch results',
                    });
                }       
            });
    };


    renderSearchResults = () => {
        const { results } = this.state;
        console.log(results);


        if (Object.keys(results).length && results.length) {
            return (
                <div className="results-container">
                    { results.map( result => {
                        return (
                            <div className="brewery" key={result.id}>
                                <div className="details">
                                    <p>{result.id}</p>
                                    <p>{result.name}</p>
                                    <p>{result.street}</p>
                                    <p>{result.city}</p>
                                    <p>{result.state}</p>
                                    <p>{result.postal_code}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )
        }
    };

    //update the UI
    render() {
        const { query, message } = this.state;
        return (
            <div className="container">
                {/*	Heading*/}
                <h2 className="heading">Brewery Search</h2>
                {/* Search Input*/}
                <label className="search-label" htmlFor="search-input">
                    <input type="text"
                           name="query"
                           value={ query }
                           id="search-input"
                           placeholder="Search..."
                           onChange={this.handleOnInputChange}
                    />

                    <i className="fa fa-search search-icon"/>

                </label>

                {/*	Error Message*/}
				{message && <p className="message">{ message }</p>}

                {/*Result*/}
                { this.renderSearchResults() }

            </div>
        )
    }



     // .then(response =>
            //     response.data.results.map(results => ({
            //         id: `${results.id}`,
            //         name: `${results.name}`,
            //         street: `${results.street}`,
            //         city: `${results.city}`,
            //         state: `${results.state}`,
            //         postal_code: `${results.postal_code}`
            //     }))
            // )





    
    // renderSearchResults = () => {
    //     const {results} = this.state;

    //     if (Object.keys(results).length && results.length) {
    //         return (

    //             <div className="results-container">
    //                 {results.map((result) => (
    //                     return (

    //                         <div key={result.id}>{result.name}</div>

    //                     )                     
    //                 ))}
    //             </div>
                
    //             // <div>
    //             //     {props.items.map((item, index) => (
    //             //         <Item key={index} item={item} />
    //             //     ))}
    //             // </div>
    //             // <div className="results-container">
    //             //     {results.map((result) => {
    //             //         return (
                           
    //             //         );
    //             //     })}
    //             // </div>

    //             // <div className="results-container">
    //             // {results.map((result) => {
    //                 // return (
    //                 //     <a key={result.id} href={result.previewURL} className="result-items">
    //                 //         <h6 className="image-username">{result.user}</h6>
    //                 //         <div className="image-wrapper">
    //                 //             <img className="image" src={result.previewURL} alt={result.user}/>
    //                 //         </div>
    //                 //     </a>
    //                 // );
    //             // })}
    //             // </div>
    //         )}          
    //     }
 }


export default Search