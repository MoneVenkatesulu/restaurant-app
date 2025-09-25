const FailureView = props => {
  const {reFetchData} = props
  return (
    <div className="no-dishes-container">
      <img
        src="https://res.cloudinary.com/dmlk7cxkm/image/upload/v1758691571/Screenshot_2025-09-24_105521_fie2v9.png"
        alt="failure view"
        className="no-dishes-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to completing your request. Please try again.
      </p>
      <button type="button" className="retry-button" onClick={reFetchData}>
        Retry
      </button>
    </div>
  )
}

export default FailureView
