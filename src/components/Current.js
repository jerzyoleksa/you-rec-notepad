import React, { Component } from 'react';
import axios from 'axios';
import urlFor from '../helpers/urlFor';
import NoteCard from './NoteCard';
import ContentEditable from 'react-contenteditable'
import CryptoJS from "crypto-js";

class Current extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      value: this.props.prop1.content,
      typing: false,
      typingTimeout: 0,
      html: "<b>Hello <i>World</i></b>"
    };
    this.handleChange = this.handleChange.bind(this);
    
    //for content editable
    this.contentEditable = React.createRef();
    
  }

  encodePass = (password) =>{
    const encodedWord = CryptoJS.enc.Utf8.parse(password); // encodedWord Array object
    const encoded = CryptoJS.enc.Base64.stringify(encodedWord); // string: 'NzUzMjI1NDE='
    return encoded;
  };

  encryptTextWithAES = (plaintText, myPass) => {
      //var myPass="0123456789123456" //must have 16 chars
      var encryptedBase64Key = this.encodePass(myPass);
      console.log('encryptedBase64Key::'+encryptedBase64Key);
      var parsedBase64Key = CryptoJS.enc.Base64.parse(encryptedBase64Key);
      console.log('parsedBase64Key::'+parsedBase64Key);
      var encryptedData = null;
      

      // this is Base64-encoded encrypted data
      encryptedData = CryptoJS.AES.encrypt(plaintText, parsedBase64Key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });

      return encryptedData.toString();
      
  }

  //If you use NoPadding, then you must implement your own padding for encryption, 
  //and make sure to remove it from the resulting string in decryption.
  /*
  encryptWithAES = (text) => {
    const passphrase = '123';
    //If you use a passphrase without a salt key, then it will generate a 256-bit AES key.
    return CryptoJS.AES.encrypt(text, passphrase, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString();
  };*/

  /*
  decryptWithAES = (ciphertext) => {
    const passphrase = '123';
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  };*/




  updateNote = () => {
    
    this.props.updateSaviStatus("saving ..."); //in async methods must be setState, not just this.state.status = ...
    let noteToUpdate = this.props.prop1;
    console.log('updating:'+noteToUpdate);
    console.log('key from parent:'+this.props.authKee);
    
    noteToUpdate["authKey"] = this.props.authKee;

    noteToUpdate["name"] = "content"; 
    noteToUpdate["value"] = noteToUpdate["content"];

    
    //1st to update standard content or other param
    axios.put('https://frengly.com/ai/notes', noteToUpdate)
    .then((res) => {
      this.props.updateSaviStatus("");
    })
    .catch((err) => console.log("Error updating!!!",err) );



    
    //2nd update to send encrypted text
    let encrypted = this.encryptTextWithAES(noteToUpdate["content"], '0123456789123456');
    console.log('just encrypted::');
    console.log(encrypted);

    noteToUpdate["name"] = "encrypted"; 
    noteToUpdate["value"] = encrypted;

    axios.put('https://frengly.com/ai/notes', noteToUpdate)
    .then((res) => {
      this.props.updateSaviStatus("");
    })
    .catch((err) => console.log("Error updating!!!",err) );




    /*
    console.log('---------------------------------------');
    
    console.log(this.encodePass('mustbe16byteskey'));


    var encryptedBase64Key = 'bXVzdGJlMTZieXRlc2tleQ==';
    var parsedBase64Key = CryptoJS.enc.Base64.parse(encryptedBase64Key);

    var encryptedData = null;
 
    // Encryption process
    var plaintText = 'Please encrypt this message!';
    // console.log( “plaintText = “ + plaintText );

    // this is Base64-encoded encrypted data
    encryptedData = CryptoJS.AES.encrypt(plaintText, parsedBase64Key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
    });
    console.log( 'encryptedData = ' + encryptedData );
    


    var encryptedCipherText = 'U2WvSc8oTur1KkrB6VGNDmA3XxJb9cC+T9RnqT4kD90=' ; // or encryptedData;
    var decryptedData = CryptoJS.AES.decrypt( encryptedCipherText, parsedBase64Key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
    } );
    // console.log( “DecryptedData = “ + decryptedData );

    // this is the decrypted data as a string
    var decryptedText = decryptedData.toString( CryptoJS.enc.Utf8 );
    console.log( 'DecryptedText = ' + decryptedText );
    console.log('---------------------------------------');
    */


  }

  //TODO: call parent method to update prent state of selectedNote
  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.updateNoteContent(event.target.value);

    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    
    this.state.typing = false;
    this.state.typingTimeout = setTimeout(() => {
      this.updateNote();  
    }, 1500);


  }

  handleChange2 = evt => {
    console.log('handleChange2');
    this.setState({html: evt.target.value});
  };

  handleLineFocus = evt => {
    console.log('focus');
  };

  //update state of Current based on prop1 that holds selectedNote in parent
  componentWillReceiveProps(nextProps) {
    // This will erase any local state updates!
    // Do not do this.
    try {
    this.setState({ value: nextProps.prop1.content });
    }catch(ex){console.log(ex);}
  }

  componentDidMount(){
    this.nameInput.focus();
  }


  render() {
  
  

    return (
  
      <div className="textarea-container">

      {/*<ContentEditable
              innerRef={this.contentEditable}
              html={this.state.html} // innerHTML of the editable div
              disabled={false}       // use true to disable editing
              onChange={this.handleChange2} // handle innerHTML change
              onMouseDown={e => this.handleLineFocus(e)}
              onKeyUp={e => this.handleLineFocus(e)}
              tagName='article' // Use a custom HTML tag (uses a div by default)
              className='contentEditablo'
            />*/}

        {/*<span>{this.state.status}</span>*/}
        <textarea value={this.state.value} onChange={this.handleChange} ref={(input) => { this.nameInput = input; }} />
        

        
      </div>

    );
  }
}

export default Current;