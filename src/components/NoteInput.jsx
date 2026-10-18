import React from 'react';

const TITLE_LIMIT = 50;
const BODY_MIN_LENGTH = 10;

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      error: '',
    };

    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onTitleChangeHandler(event) {
    const title = event.target.value.slice(0, TITLE_LIMIT);
    this.setState({ title });
  }

  onBodyChangeHandler(event) {
    this.setState({ body: event.target.value, error: '' });
  }

  onSubmitHandler(event) {
    event.preventDefault();

    const { title, body } = this.state;

    if (body.trim().length < BODY_MIN_LENGTH) {
      this.setState({
        error: `Isi catatan minimal ${BODY_MIN_LENGTH} karakter.`,
      });
      return;
    }

    this.props.addNote({ title, body });
    this.setState({ title: '', body: '', error: '' });
  }

  render() {
    const { title, body, error } = this.state;
    const remaining = TITLE_LIMIT - title.length;

    return (
      <div className="note-input" data-testid="note-input">
        <h2>Buat catatan</h2>
        <form
          onSubmit={this.onSubmitHandler}
          data-testid="note-input-form"
        >
          <p className="note-input__title__char-limit-wrapper">
            <span
              className="note-input__title__char-limit"
              data-testid="note-input-title-remaining"
            >
              {remaining} karakter tersisa
            </span>
          </p>
          <input
            className="note-input__title"
            type="text"
            placeholder="Ini adalah judul ..."
            value={title}
            onChange={this.onTitleChangeHandler}
            data-testid="note-input-title-field"
          />
          <textarea
            className="note-input__body"
            placeholder="Tuliskan catatanmu di sini ..."
            value={body}
            onChange={this.onBodyChangeHandler}
            data-testid="note-input-body-field"
          />
          {error && (
            <p
              className="note-input__feedback--error"
              data-testid="note-input-feedback-error"
            >
              {error}
            </p>
          )}
          <button type="submit" data-testid="note-input-submit-button">
            Buat
          </button>
        </form>
      </div>
    );
  }
}

export default NoteInput;