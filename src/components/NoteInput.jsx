import React from 'react';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      isSubmitted: false,
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const titleValue = event.target.value;

    if (titleValue.length <= 50) {
      this.setState(() => {
        return {
          title: titleValue,
        };
      });
    }
    console.warn('[TODO] Handle title change', event.target.value);
  }

  onBodyChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      };
    });

    console.warn('[TODO] Handle body change', event.target.value);
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    this.setState({ isSubmitted: true }, () => {
      if (this.state.body.length < 10) return;

      this.props.addNote({
        title: this.state.title,
        body: this.state.body,
      });

      this.setState({
        title: '',
        body: '',
        isSubmitted: false,
      });

      console.warn('[TODO] Submit note', this.state);
    });
  }

  render() {
    const remainingChars = 50 - this.state.title.length;
    const isBodyLengthValid = this.state.body.length > 0 && this.state.body.length < 10;

    return (
      <div className="note-input" data-testid="note-input">
        <h2>Buat catatan</h2>

        {this.state.isSubmitted && isBodyLengthValid && <p className="note-input__feedback--error">Isi catatan minimal harus 10 karakter</p>}

        <form onSubmit={this.onSubmitEventHandler} data-testid="note-input-form">
          <p className={`note-input__title__char-limit ${remainingChars <= 10 ? 'note-input__title__char-limit--warn' : ''}`} data-testid="note-input-title-remaining">
            Sisa karakter: {remainingChars}
          </p>
          <input className="note-input__title" type="text" placeholder="Ini adalah judul ..." value={this.state.title} onChange={this.onTitleChangeEventHandler} required data-testid="note-input-title-field" />
          <textarea className="note-input__body" placeholder="Tuliskan catatanmu di sini ..." value={this.state.body} onChange={this.onBodyChangeEventHandler} required data-testid="note-input-body-field" />

          <button type="submit" data-testid="note-input-submit-button">
            Buat
          </button>
        </form>
      </div>
    );
  }
}

export default NoteInput;
