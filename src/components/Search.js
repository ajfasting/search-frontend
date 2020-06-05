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
            loading: false,
            message: '',
        };
        this.cancel = '';
    }

    //update the UI
    render() {
        //const { query } = this.state;
        return (
            <div className="container">

                <h2 className="heading">Brewery Search</h2>

                <label className="search-label" htmlFor="search-input">
                    <input type="text"
                           defaultValue=""
                           id="search-input"
                           placeholder="Search..."
                           onChange={this.handleOnInputChange}
                    />

                    <i className="fa fa-search search-icon"/>

                </label>

                { this.renderSearchResults() }

            </div>
        )
    }

    //sets the query property of state to whatever text the User inputs
    handleOnInputChange = (event) => {
        const query = event.target.value;

            if (!query) {
                this.setState({ query, loading: true, message: ''  });
            } else {
                this.setState({ query, loading: true, message: ''  }, () => {
                    this.getSearchResults(1, query);
                });
            }

    };

    
    getSearchResults = (query) => {
        
        const searchUrl = `https://api.openbrewerydb.org/breweries/search?query=${query}`;

        // prevent multiple API calls
        if (this.cancel) {
            this.cancel.cancel();
        }

        this.cancel = axios.CancelToken.source();

        axios.get(searchUrl, {cancelToken: this.cancel.token})

            .then((res) => {
                const resultNotFoundMsg = !res.data.hits.length ? 'No more results' : '';
        
            this.setState({
                    results: res.data.hits,
                    message: resultNotFoundMsg,
                    loading: false,
            });             
        })
        .catch((error) => {

            if (axios.isCancel(error) || error) {
				this.setState({
					loading: false,
					message: 'Failed to fetch results',
                });
            }       
        });
    };
    
    renderSearchResults = () => {
        const {results} = this.state;

        if (Object.keys(results).length && results.length) {
            return (
                <div className="results-container">
                    {results.map((result) => {
                        return (
                           
                        );
                    })}
                </div>
            )}          
        }
    };


export default Search;