import React, { Component, Fragment } from 'react';

class Results extends Component {
    constructor() {
        super();
        this.state = {
            faveIDs: []
        }
    }
    handleClick = (e) => {
        this.props.addFave(e.target.id);
    }
    idCheck = (idToCheck) => {
        let faveIDs = [];
        this.props.faveList.map((fave) => {
            faveIDs.push(fave.id);
        })
        return faveIDs.indexOf(idToCheck);
    }
    render() {
        return (
            <div className="resultsGrid">
                <h3>Name</h3>
                <h3>Language</h3>
                <h3>Latest Tag</h3>
                <h3 className="buttonHeader">Add Button</h3>
                {this.props.renderResults ? 
                    this.props.resultsList.map((result) => {
                        return (
                            <Fragment key={result.name}>
                                <a href={`https://github.com/${result.name}`} target="blank"><p>{result.name}</p></a>
                                <p>{result.language}</p>
                                <p>{result.tag}</p>
                                {this.idCheck(result.id) === -1 ? <button id={result.id} className="faveButton" onClick={this.handleClick}>Add</button> : <p></p>}
                            </Fragment>
                        )
                    }) : ''}
            </div>
        );
    }
};

export default Results;