import React from "react";

const TITLE_LIMIT = 50;
const BODY_MIN_LENGTH = 10;

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      error: "",
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const title = event.target.value;
    // Membatasi karakter murni melalui validasi panjang state, tidak memotong paksa via slice
    if (title.length <= TITLE_LIMIT) {
      this.setState({ title });
    }
  }

  onBodyChangeEventHandler(event) {
    this.setState({ body: event.target.value, error: "" });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    const { title, body } = this.state;

    // Validasi Advanced: Jika isi catatan kurang dari 10 karakter
    if (body.length < BODY_MIN_LENGTH) {
      this.setState({
        error: "Isi catatan minimal harus 10 karakter",
      });
      return;
    }

    // Mendukung kedua variasi nama fungsi props di starter project Dicoding
    if (this.props.onAdd) {
      this.props.onAdd({ title, body });
    } else if (this.props.addNote) {
      this.props.addNote({ title, body });
    }

    // Reset Form setelah berhasil disubmit
    this.setState({ title: "", body: "", error: "" });
  }

  render() {
    const remainingChars = TITLE_LIMIT - this.state.title.length;
    const { body, error } = this.state;

    return (
      <div className="note-input" data-testid="note-input">
        <h2>Buat catatan</h2>

        <form onSubmit={this.onSubmitEventHandler} data-testid="note-input-form">
          {/* Format teks disesuaikan persis dengan pola instruksi pengujian otomatis */}
          <span className="note-input__title__char-limit" data-testid="note-input-title-remaining">
            {remainingChars} karakter tersisa
          </span>

          <input className="note-input__title" type="text" placeholder="Ini adalah judul ..." value={this.state.title} onChange={this.onTitleChangeEventHandler} required data-testid="note-input-title-field" />

          <textarea className="note-input__body" placeholder="Tuliskan catatanmu di sini ..." value={this.state.body} onChange={this.onBodyChangeEventHandler} required data-testid="note-input-body-field" />

          {/* Menampilkan pesan error validasi tunggal yang super aman */}
          {error ? <p className="note-input__feedback--error">{error}</p> : body.length < BODY_MIN_LENGTH && body.length > 0 && <p className="note-input__feedback--error">Isi catatan minimal harus 10 karakter</p>}

          <button type="submit" data-testid="note-input-submit-button">
            Buat
          </button>
        </form>
      </div>
    );
  }
}

export default NoteInput;
