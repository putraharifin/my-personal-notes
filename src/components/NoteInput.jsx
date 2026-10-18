import React from "react";

const TITLE_LIMIT = 50;

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const title = event.target.value;
    if (title.length <= TITLE_LIMIT) {
      this.setState({ title });
    }
  }

  onBodyChangeEventHandler(event) {
    this.setState({ body: event.target.value });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    const { title, body } = this.state;

    // Tambahkan pengaman logika di sini: submit hanya diteruskan jika panjang teks memadai
    if (body.length >= 10) {
      if (this.props.onAdd) {
        this.props.onAdd({ title, body });
      } else if (this.props.addNote) {
        this.props.addNote({ title, body });
      }

      // Form hanya di-reset jika submit berhasil menambahkan catatan
      this.setState({ title: "", body: "" });
    }
  }

  render() {
    const { title, body } = this.state;
    const remainingChars = TITLE_LIMIT - title.length;
    const isBodyTooShort = body.length > 0 && body.length < 10;

    return (
      <div className="note-input" data-testid="note-input">
        <h2>Buat catatan</h2>

        <form onSubmit={this.onSubmitEventHandler} data-testid="note-input-form">
          <span className="note-input__title__char-limit" data-testid="note-input-title-remaining">
            {remainingChars} karakter tersisa
          </span>

          <input className="note-input__title" type="text" placeholder="Ini adalah judul ..." value={title} onChange={this.onTitleChangeEventHandler} required data-testid="note-input-title-field" />

          <textarea
            className="note-input__body"
            placeholder="Tuliskan catatanmu di sini ..."
            value={body}
            onChange={this.onBodyChangeEventHandler}
            required
            minLength={10} /* Validasi HTML bawaan: menolak submit jika karakter di bawah 10 */
            data-testid="note-input-body-field"
          />

          {/* Menampilkan pesan error validasi menggunakan elemen dengan class name yang wajib sesuai instruksi */}
          {isBodyTooShort && <p className="note-input__feedback--error">Isi catatan minimal harus 10 karakter</p>}

          <button type="submit" data-testid="note-input-submit-button">
            Buat
          </button>
        </form>
      </div>
    );
  }
}

export default NoteInput;
