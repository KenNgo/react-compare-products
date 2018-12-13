import React, { Component } from 'react';
import {FormGroup, FormControl, Button} from 'react-bootstrap';
import './style.scss';

class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
      inputField1: 'https://cellphones.com.vn/apple-iphone-x-64-gb.html',
      inputField2: 'https://cellphones.com.vn/apple-iphone-xs-64-gb.html',
      valid: true
		}
    this.inputFiel1HandleChange = this.inputFiel1HandleChange.bind(this);
    this.inputFiel2HandleChange = this.inputFiel2HandleChange.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	inputFiel1HandleChange(e) {
		this.setState({
			inputField1: e.target.value,
		})
  }
  
  inputFiel2HandleChange(e) {
		this.setState({
			inputField2: e.target.value,
		})
	}

	getValidationState(input) {
		if (!input.length) {
      return 'error';
    }
    if (input.match(/((http|https):\/\/www\.)?.+\..+/) ) {
      return 'success';
    } else {
      return 'error';
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let title = '';
    let imageField = '';
    let infoDetail = '';
    let render = '';
    if (this.getValidationState(this.state.inputField1) === 'error' ||
    this.getValidationState(this.state.inputField2) === 'error') {
      return;
    } else {
      this._getHTML( this.state.inputField1, function (response) {
        render = document.querySelector( '#title-crawl1' );
        response.querySelector('.product-view .topview') !== null ? title = response.querySelector('.product-view .topview') : title = '';
        response.querySelector('.product-img-box') !== null ? imageField = response.querySelector('.product-img-box') : imageField = '';
        response.querySelector('.technical-info') !== null ? infoDetail = response.querySelector('.technical-info') : infoDetail = '';
        render.innerHTML = title.innerHTML + imageField.innerHTML + `<div class="technical-info">${infoDetail.innerHTML}</div>`;
      });
      this._getHTML( this.state.inputField2, function (response) {
        render = document.querySelector( '#title-crawl2' );
        response.querySelector('.product-view .topview') !== null ? title = response.querySelector('.product-view .topview') : title = '';
        response.querySelector('.product-img-box') !== null ? imageField = response.querySelector('.product-img-box') : imageField = '';
        response.querySelector('.technical-info') !== null ? infoDetail = response.querySelector('.technical-info') : infoDetail = '';
        render.innerHTML = title.innerHTML + imageField.innerHTML + `<div class="technical-info">${infoDetail.innerHTML}</div>`;
      });
    }
  }

  _getHTML = (url, callback ) => {
    if ( !window.XMLHttpRequest ) {
      return;
    }
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if ( callback && typeof( callback ) === 'function' ) {
        callback( this.responseXML );
      }
    }
    xhr.open( 'GET', url );
    xhr.responseType = 'document';
    xhr.send();
  }

	render() {
		return (
			<div className="app">
				<div className="app-title">
					<h2>App Compare Products</h2>
				</div>
				<div className="app-heading">
					<form onSubmit={this.handleSubmit}>
            <div className="app-heading-field">
              <div className="field-input">
                <FormGroup bsSize="large" validationState={this.getValidationState(this.state.inputField1)}>
                  <FormControl 
                    type="text"
                    value={this.state.inputField1}
                    placeholder="e.g. google.com"
                    onChange={this.inputFiel1HandleChange} />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup bsSize="large" validationState={this.getValidationState(this.state.inputField2)}>
                  <FormControl 
                    type="text"
                    value={this.state.inputField2}
                    placeholder="e.g. google.com"
                    onChange={this.inputFiel2HandleChange} />
                  <FormControl.Feedback />
                </FormGroup>
              </div>
              <div className="field-button">
                <div className="button-align">
                  <Button bsSize="large" bsStyle="primary" type="submit" onClick={this.handleSubmit} disabled={!this.state.valid}>
                    Compare
                  </Button>
                </div>
              </div>
            </div>
					</form>
				</div>
        <div className="app-compare-result">
          <div id="title-crawl1" className="result-render"></div>
          <div id="title-crawl2" className="result-render"></div>
        </div>
			</div>
		)
	}
}

export default App;
